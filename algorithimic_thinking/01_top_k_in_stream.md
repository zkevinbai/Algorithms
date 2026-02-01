# Problem 1: Top-K in a Stream

## Prompt

You receive an unbounded stream of events. At any moment, return the top K most frequent items.

---

## Key Concepts

- Unbounded data
- State size
- Approximation

## Variations

- Sliding window
- Memory limits
- Distributed shards

---

## Practice: 30-Minute Drill

### 1. Problem Framing (5 min)

**Restate the problem:**
- We have a continuous, unbounded stream of events (could be user actions, log entries, etc.)
- At any point, we need to return the K most frequently occurring items seen so far
- The stream is potentially infinite, so we cannot store everything

**Clarify constraints:**
- Is K fixed or variable? (Assume fixed for now)
- What is the expected item space? (Could be unbounded)
- What is the query pattern? (Continuous queries vs on-demand)
- What is acceptable accuracy? (Exact vs approximate)
- Are there memory constraints? (Almost certainly yes for unbounded streams)

**Bounded vs Unbounded:**
- **Unbounded**: Stream continues indefinitely
- **Online**: Must process items as they arrive, cannot wait for full dataset

**Key Questions:**
- Can we approximate? (Usually yes for large-scale systems)
- Do we need exact counts? (Rarely for top-K)
- What happens to old items? (Decay? Sliding window? All-time?)

---

### 2. Candidate Approaches (10 min)

#### Approach 1: Exact Counting with Hash Map + Heap

**Description:**
- Maintain a hash map: `item -> count`
- For top-K query: sort by count, return top K
- Or maintain a min-heap of size K

**Pros:**
- Exact results
- Simple to understand

**Cons:**
- Memory grows unbounded (O(unique_items))
- Query time O(n log n) or O(n log K) for sorting
- Cannot handle truly unbounded streams

#### Approach 2: Count-Min Sketch + Heap

**Description:**
- Use Count-Min Sketch (probabilistic data structure) to estimate frequencies
- Maintain a min-heap of size K for top-K candidates
- Periodically update heap based on sketch estimates

**Pros:**
- Bounded memory (O(width × depth) for sketch)
- Handles unbounded streams
- Fast updates O(1)

**Cons:**
- Approximate (overestimates, never underestimates)
- Error bounds depend on sketch parameters
- May include false positives in top-K

#### Approach 3: Lossy Counting / Space-Saving

**Description:**
- Maintain a data structure that tracks frequent items with bounded memory
- Space-Saving algorithm: maintain K+ε counters, evict least frequent when full
- Or use Lossy Counting with error parameter ε

**Pros:**
- Bounded memory
- Can provide guarantees (e.g., all items with frequency > threshold are included)
- Good for heavy hitters

**Cons:**
- Still approximate
- More complex than simple counting
- Tuning parameters (ε) affects accuracy vs memory

#### Approach 4: Sliding Window Top-K

**Description:**
- If we only care about recent items, use a sliding window
- Maintain counts only for items in the current window
- Evict old items as window slides

**Pros:**
- Bounded memory (window size)
- Reflects recent trends
- Can use exact counting within window

**Cons:**
- Loses historical information
- Window management complexity
- May miss long-term patterns

---

### 3. Tradeoffs & Scaling (10 min)

#### Time Complexity

| Approach | Update | Query |
|----------|--------|-------|
| Exact Hash Map | O(1) | O(n log K) |
| Count-Min Sketch | O(1) | O(K log K) |
| Space-Saving | O(1) amortized | O(K) |
| Sliding Window | O(1) | O(W log K) where W = window size |

#### Space Complexity

| Approach | Space |
|----------|-------|
| Exact Hash Map | O(unique_items) - **unbounded** |
| Count-Min Sketch | O(width × depth) - **bounded** |
| Space-Saving | O(K + ε) - **bounded** |
| Sliding Window | O(window_size) - **bounded** |

#### What Breaks at 10× / 100×?

**10× more items:**
- Exact hash map: Memory grows 10× (problematic)
- Count-Min Sketch: Same memory, but error may increase
- Space-Saving: Same memory, may lose some accuracy
- Sliding Window: Same memory if window size fixed

**100× more items:**
- Exact hash map: **Fails** - runs out of memory
- Count-Min Sketch: May need to resize sketch (increase width/depth)
- Space-Saving: May need to increase ε
- Sliding Window: Still bounded, but may need larger window

**Distributed scenario:**
- Shard by item hash
- Each shard maintains its own top-K
- Merge results from all shards (take top-K of merged)
- Challenge: Global top-K may differ from sum of local top-Ks

---

### 4. Failure & Evolution (5 min)

#### How Does This Fail?

**Exact Hash Map:**
- **Memory exhaustion**: Truly unbounded streams will eventually OOM
- **Slow queries**: If unique items grow large, sorting becomes expensive
- **No decay**: Old items never forgotten, even if irrelevant

**Count-Min Sketch:**
- **False positives**: Items with low true frequency may appear in top-K
- **Collision errors**: Hash collisions cause overestimation
- **Parameter tuning**: Wrong width/depth leads to poor accuracy

**Space-Saving:**
- **Missed items**: Items just below threshold may be evicted
- **Parameter sensitivity**: ε must be tuned for workload
- **No temporal decay**: All-time counts, not recent trends

**Sliding Window:**
- **Lost history**: Cannot answer "all-time top-K"
- **Window boundary effects**: Items at window edges may be inconsistently counted
- **Late arrivals**: Out-of-order events complicate windowing

#### How Would You Evolve It?

**Hybrid approach:**
- Use Count-Min Sketch for candidate generation
- Maintain exact counts for top-K candidates only
- Periodically refresh candidates from sketch

**Time-decay:**
- Apply exponential decay to counts
- Recent items weighted more heavily
- Naturally handles concept drift

**Distributed optimization:**
- Use consistent hashing for sharding
- Implement merge algorithm that handles approximate counts
- Consider hierarchical aggregation (local → regional → global)

**Adaptive parameters:**
- Monitor error rates
- Dynamically adjust sketch size or ε based on workload
- Use feedback to improve accuracy

---

## Knowledge Deep Dive

### Count-Min Sketch

A probabilistic data structure for frequency estimation:

- **Structure**: 2D array of counters (width × depth)
- **Hash functions**: depth independent hash functions
- **Update**: For item x, increment `sketch[hash_i(x) % width][i]` for all i
- **Query**: Return `min(sketch[hash_i(x) % width][i])` for all i
- **Guarantee**: Never underestimates, overestimates with probability based on width/depth
- **Memory**: O(width × depth) - fixed regardless of stream size

### Space-Saving Algorithm

Tracks frequent items with bounded memory:

- Maintain K+ε counters
- When new item arrives:
  - If already tracked: increment
  - If not tracked and space available: add with count 1
  - If not tracked and full: evict item with minimum count, add new with count = min_count + 1
- Guarantee: All items with frequency > (total_count / (K+ε)) are tracked

### When to Use What

- **Exact required + bounded item space**: Hash map + heap
- **Unbounded stream + approximate OK**: Count-Min Sketch or Space-Saving
- **Recent trends matter**: Sliding window
- **Distributed system**: Sharded Count-Min Sketch with merge
- **Heavy hitters (items > threshold)**: Space-Saving with guarantees

---

## Listen For Yourself Saying

✅ "Exact requires unbounded memory, so we need approximation"
✅ "Approximation is acceptable if error bounds are acceptable for the use case"
✅ "We can tune the sketch parameters to balance memory vs accuracy"
✅ "For distributed systems, we'll need to merge approximate counts"
