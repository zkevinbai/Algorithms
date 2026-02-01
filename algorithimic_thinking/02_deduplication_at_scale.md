# Problem 2: Deduplication at Scale

## Prompt

Ensure each unique event is processed once in a high-throughput system.

---

## Key Concepts

- Idempotency
- Memory vs correctness
- False positives

## Variations

- Time-bounded dedupe
- Distributed dedupe
- Eventual consistency

---

## Practice: 30-Minute Drill

### 1. Problem Framing (5 min)

**Restate the problem:**
- Events arrive in a high-throughput system (could be messages, transactions, API calls)
- We need to ensure each unique event is processed exactly once
- Duplicate events should be detected and rejected/ignored
- System must handle millions of events per second

**Clarify constraints:**
- What makes an event "unique"? (ID, content hash, combination of fields?)
- How long do we need to remember events? (Forever? Time-bounded?)
- What is the event space size? (Bounded or unbounded?)
- What happens on false positives? (Reject valid event? Accept duplicate?)
- Is eventual consistency acceptable? (For distributed systems)

**Bounded vs Unbounded:**
- **Unbounded**: Event IDs could be infinite (e.g., UUIDs)
- **Online**: Must check duplicates as events arrive, cannot batch

**Key Questions:**
- Can we accept false positives? (Usually yes - reject some valid events)
- Can we accept false negatives? (Usually no - must catch duplicates)
- What is the acceptable memory footprint?
- Do we need exact deduplication or probabilistic?

---

### 2. Candidate Approaches (10 min)

#### Approach 1: In-Memory Hash Set

**Description:**
- Maintain a hash set of seen event IDs
- Check membership before processing
- Add ID after processing

**Pros:**
- Exact deduplication (no false positives/negatives)
- O(1) lookup and insertion
- Simple implementation

**Cons:**
- Memory grows unbounded (O(unique_events))
- Cannot handle truly unbounded streams
- Single machine limitation

#### Approach 2: Bloom Filter

**Description:**
- Use Bloom filter to track seen events
- If filter says "not seen": definitely new, process it
- If filter says "seen": might be duplicate, check further (or reject)

**Pros:**
- Bounded memory (fixed size regardless of items)
- Fast O(k) where k = number of hash functions
- No false negatives (if seen, definitely seen)
- Space efficient

**Cons:**
- False positives (may reject valid new events)
- Cannot delete items (without counting Bloom filter variant)
- Tuning parameters (size, hash functions) affects false positive rate

#### Approach 3: Counting Bloom Filter

**Description:**
- Like Bloom filter, but counters instead of bits
- Can support deletion (decrement counters)
- Enables time-bounded deduplication

**Pros:**
- Bounded memory
- Supports deletion (for time windows)
- Better than standard Bloom filter for eviction

**Cons:**
- More memory than standard Bloom filter
- Still has false positives
- Overflow risk if counters are small

#### Approach 4: Distributed Deduplication

**Description:**
- Shard events by ID hash across multiple nodes
- Each node maintains its own deduplication store (Bloom filter or hash set)
- Consistent hashing for shard assignment

**Pros:**
- Scales horizontally
- Can use exact hash sets per shard (if shard size bounded)
- Handles high throughput

**Cons:**
- Network overhead for coordination
- Consistency challenges (what if event goes to wrong shard?)
- More complex failure handling

#### Approach 5: Time-Bounded Deduplication

**Description:**
- Only remember events within time window (e.g., last 24 hours)
- Use sliding window or TTL-based eviction
- Combine with Bloom filter or hash set

**Pros:**
- Bounded memory (window size)
- Reflects practical needs (duplicates usually arrive close in time)
- Can use exact methods within window

**Cons:**
- May miss duplicates outside window
- Window management complexity
- Clock skew issues in distributed systems

---

### 3. Tradeoffs & Scaling (10 min)

#### Time Complexity

| Approach | Check | Insert | Delete |
|----------|-------|--------|--------|
| Hash Set | O(1) | O(1) | O(1) |
| Bloom Filter | O(k) | O(k) | N/A |
| Counting Bloom Filter | O(k) | O(k) | O(k) |
| Distributed (per shard) | O(1) | O(1) | O(1) |
| Time-Bounded | O(1) | O(1) | O(1) |

#### Space Complexity

| Approach | Space |
|----------|-------|
| Hash Set | O(unique_events) - **unbounded** |
| Bloom Filter | O(m) where m = filter size - **bounded** |
| Counting Bloom Filter | O(m × counter_size) - **bounded** |
| Distributed (per shard) | O(unique_events / num_shards) |
| Time-Bounded | O(events_in_window) - **bounded** |

#### False Positive/Negative Rates

| Approach | False Positives | False Negatives |
|----------|----------------|-----------------|
| Hash Set | 0% | 0% |
| Bloom Filter | >0% (tunable) | 0% |
| Counting Bloom Filter | >0% (tunable) | 0% |
| Time-Bounded | 0% (if exact) | >0% (outside window) |

#### What Breaks at 10× / 100×?

**10× more events:**
- Hash Set: Memory grows 10× (may exceed capacity)
- Bloom Filter: False positive rate increases (if filter size fixed)
- Counting Bloom Filter: Counter overflow risk increases
- Distributed: Need more shards or larger per-shard stores

**100× more events:**
- Hash Set: **Fails** - runs out of memory
- Bloom Filter: **Fails** - false positive rate becomes unacceptable
- Counting Bloom Filter: **Fails** - counters overflow
- Distributed: Must scale horizontally (add shards)
- Time-Bounded: May need larger window or accept more false negatives

**High throughput (events/sec):**
- All approaches: May need async processing, batching
- Distributed: Network becomes bottleneck
- Bloom Filter: May need multiple filters (sharding) to reduce contention

---

### 4. Failure & Evolution (5 min)

#### How Does This Fail?

**Hash Set:**
- **Memory exhaustion**: Unbounded growth
- **Single point of failure**: One machine limitation
- **No time decay**: Old events never forgotten

**Bloom Filter:**
- **False positives**: Valid events rejected (user impact)
- **Parameter tuning**: Wrong size/hash functions = poor performance
- **No deletion**: Cannot forget old events (without counting variant)
- **Saturation**: As filter fills, false positive rate increases

**Counting Bloom Filter:**
- **Counter overflow**: If event seen many times, counter may overflow
- **False positives**: Still present, though tunable
- **Memory**: Larger than standard Bloom filter

**Distributed:**
- **Consistency**: Event may be routed to different shards (network issues)
- **Split-brain**: Partition tolerance challenges
- **Coordination overhead**: Network latency for cross-shard checks

**Time-Bounded:**
- **Missed duplicates**: Duplicates outside window not caught
- **Clock skew**: In distributed systems, time windows may be inconsistent
- **Eviction complexity**: Need efficient TTL or sliding window management

#### How Would You Evolve It?

**Hybrid approach:**
- Use Bloom filter for fast path (reject likely duplicates)
- For events that pass filter, check exact store (hash set) for certainty
- Only add to exact store if truly new (reduces exact store size)

**Multi-layer:**
- L1: Small in-memory Bloom filter (hot path)
- L2: Larger persistent Bloom filter (warm path)
- L3: Exact store for recent events (cold path, time-bounded)

**Probabilistic + Exact:**
- Use Bloom filter for initial check
- If Bloom filter says "seen", check exact store (Redis, database)
- Only query exact store for small fraction of events

**Distributed with coordination:**
- Use consistent hashing for shard assignment
- Implement quorum reads for critical events
- Use eventual consistency for non-critical paths

**Adaptive Bloom filter:**
- Monitor false positive rate
- Dynamically resize or add hash functions
- Use cascading Bloom filters (small → large)

---

## Knowledge Deep Dive

### Bloom Filter

Probabilistic data structure for membership testing:

- **Structure**: Bit array of size m, k independent hash functions
- **Insert**: Set bits at positions `hash_i(x) % m` for all i
- **Query**: Check if all bits at `hash_i(x) % m` are set
  - If all set: "possibly seen" (may be false positive)
  - If any not set: "definitely not seen" (no false negatives)
- **False positive rate**: ≈ (1 - e^(-kn/m))^k where n = items inserted
- **Optimal k**: m/n × ln(2) for minimum false positives
- **Memory**: O(m) - fixed size

### Counting Bloom Filter

Extension of Bloom filter with deletion support:

- **Structure**: Array of counters (instead of bits) of size m
- **Insert**: Increment counters at hash positions
- **Delete**: Decrement counters at hash positions
- **Query**: Check if all counters > 0
- **Memory**: O(m × counter_bits) - typically 4-8 bits per counter

### Idempotency Keys

Best practices for event deduplication:

- **Deterministic IDs**: Use content hash (SHA-256) if event content is unique
- **Client-provided IDs**: Let clients provide idempotency keys (UUIDs)
- **Composite keys**: Combine multiple fields (user_id + timestamp + action)
- **Time component**: Include timestamp to enable time-bounded dedupe

### When to Use What

- **Exact required + bounded space**: Hash set with TTL
- **Unbounded space + approximate OK**: Bloom filter
- **Time-bounded + exact**: Hash set with sliding window
- **Distributed + high throughput**: Sharded Bloom filters
- **Critical correctness**: Multi-layer (Bloom filter + exact store)

---

## Listen For Yourself Saying

✅ "We can accept false positives (reject some valid events) but not false negatives (miss duplicates)"
✅ "Bloom filter gives us bounded memory with no false negatives"
✅ "For time-bounded deduplication, we can use a counting Bloom filter or hash set with TTL"
✅ "In distributed systems, we'll need consistent hashing and handle partition tolerance"
