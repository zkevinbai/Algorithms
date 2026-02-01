# Problem 11: Approximate Counting

## Prompt

Count high-frequency items under memory constraints.

---

## Key Concepts

- Error bounds
- Bias
- User impact

## Variations

- Frequency estimation
- Distinct count
- Heavy hitters

---

## Practice: 30-Minute Drill

### 1. Problem Framing (5 min)

**Restate the problem:**
- We need to count occurrences of items (events, users, etc.)
- Item space may be very large or unbounded
- Memory is constrained (cannot store exact counts for all items)
- We need approximate counts with bounded memory

**Clarify constraints:**
- What are we counting? (Event types? User actions? Distinct items?)
- What is the item space size? (Bounded? Unbounded?)
- What is acceptable error? (5%? 10%? Order of magnitude?)
- What is the memory constraint? (MB? GB? Fixed size?)
- Do we need exact counts for some items? (Top-K? All above threshold?)

**Bounded vs Unbounded:**
- **Unbounded**: Item space may be infinite (e.g., unique user IDs)
- **Online**: Must count as items arrive, cannot wait

**Key Questions:**
- Can we approximate? (Usually yes for large-scale systems)
- What error bounds are acceptable?
- Do we need bias (overestimate vs underestimate)?
- What is the user impact of errors?

---

### 2. Candidate Approaches (10 min)

#### Approach 1: Exact Counting (Hash Map)

**Description:**
- Maintain hash map: `item -> count`
- Increment count on each occurrence
- Return exact count on query

**Pros:**
- **Exact**: No error
- **Simple**: Easy to implement
- **Fast**: O(1) updates and queries

**Cons:**
- **Unbounded memory**: O(unique_items) - grows with item space
- **Not scalable**: Fails for unbounded item spaces
- **Memory exhaustion**: Will run out of memory for large item spaces

#### Approach 2: Count-Min Sketch

**Description:**
- Use Count-Min Sketch (probabilistic data structure)
- Fixed-size 2D array of counters
- Hash item to multiple positions, increment counters
- Query: return minimum of counters (never underestimates)

**Pros:**
- **Bounded memory**: O(width × depth) - fixed size
- **No false negatives**: Never underestimates (important for some use cases)
- **Fast**: O(1) updates, O(depth) queries
- **Tunable**: Can tune width/depth for error vs memory

**Cons:**
- **Overestimates**: May overestimate (hash collisions)
- **Error bounds**: Error depends on sketch parameters and item distribution
- **No deletion**: Cannot easily delete items (without counting variant)

#### Approach 3: Count Sketch

**Description:**
- Similar to Count-Min Sketch, but uses signed counters
- Hash item to positions, increment/decrement based on hash sign
- Query: return median of counters (reduces overestimation)

**Pros:**
- **Bounded memory**: O(width × depth) - fixed size
- **Less bias**: Median reduces overestimation (unbiased estimate)
- **Fast**: O(1) updates, O(depth) queries

**Cons:**
- **May underestimate**: Can underestimate (unlike Count-Min)
- **More complex**: Median calculation adds complexity
- **Error bounds**: Still has error, but less biased

#### Approach 4: HyperLogLog (Distinct Count)

**Description:**
- Count distinct items (not frequency)
- Uses hash-based probabilistic counting
- Estimates cardinality with small memory

**Pros:**
- **Very memory efficient**: O(log log n) memory for n distinct items
- **Accurate**: Low error rate (~1% with standard parameters)
- **Fast**: O(1) updates and queries

**Cons:**
- **Distinct only**: Only counts distinct items, not frequency
- **Approximate**: Not exact
- **Limited use cases**: Only for distinct count, not frequency

#### Approach 5: Space-Saving (Heavy Hitters)

**Description:**
- Maintain K+ε counters for top-K items
- Track frequent items with bounded memory
- Evict least frequent when full

**Pros:**
- **Bounded memory**: O(K + ε) - fixed size
- **Guarantees**: All items with frequency > threshold are tracked
- **Exact for top-K**: Exact counts for tracked items

**Cons:**
- **Limited to top-K**: Only tracks top-K items
- **Approximate for others**: Items not in top-K are not tracked
- **Eviction complexity**: Must manage eviction

---

### 3. Tradeoffs & Scaling (10 min)

#### Time Complexity

| Approach | Update | Query |
|----------|--------|-------|
| Exact Hash Map | O(1) | O(1) |
| Count-Min Sketch | O(depth) | O(depth) |
| Count Sketch | O(depth) | O(depth) |
| HyperLogLog | O(1) | O(1) |
| Space-Saving | O(1) amortized | O(1) |

#### Space Complexity

| Approach | Space | Bounded? |
|----------|-------|----------|
| Exact Hash Map | O(unique_items) | No |
| Count-Min Sketch | O(width × depth) | Yes |
| Count Sketch | O(width × depth) | Yes |
| HyperLogLog | O(log log n) | Yes (grows slowly) |
| Space-Saving | O(K + ε) | Yes |

#### Error Characteristics

| Approach | Error Type | Bias | Error Bound |
|----------|-----------|------|-------------|
| Exact Hash Map | None | None | 0% |
| Count-Min Sketch | Overestimate | Overestimates | Depends on sketch size |
| Count Sketch | Over/Under | Unbiased | Depends on sketch size |
| HyperLogLog | Over/Under | Slight overestimate | ~1% (distinct count) |
| Space-Saving | Miss items | None for top-K | Items below threshold missed |

#### What Breaks at 10× / 100×?

**10× more unique items:**
- Exact Hash Map: **Memory grows 10×** - may exceed capacity
- Count-Min Sketch: Same memory, but error increases (more collisions)
- Count Sketch: Same memory, but error increases
- HyperLogLog: Memory grows slowly (log log), still manageable
- Space-Saving: Same memory, but may miss more items (eviction)

**10× higher frequency:**
- Exact Hash Map: Still O(1), but counters may overflow (need larger types)
- Count-Min Sketch: Same memory, but overestimation may increase
- Count Sketch: Same memory, but error may increase
- HyperLogLog: Not affected (distinct count, not frequency)
- Space-Saving: Still works, but eviction more frequent

**10× tighter memory constraint:**
- Exact Hash Map: **Fails** - cannot reduce memory
- Count-Min Sketch: Must reduce width/depth (error increases)
- Count Sketch: Must reduce width/depth (error increases)
- HyperLogLog: Can reduce precision (error increases slightly)
- Space-Saving: Must reduce K (track fewer items)

**Skewed distribution (few items dominate):**
- Exact Hash Map: Still works, but many items with count 1 (wasteful)
- Count-Min Sketch: Overestimation for frequent items (collisions)
- Count Sketch: Better (median reduces bias)
- HyperLogLog: Not affected (distinct count)
- Space-Saving: **Excellent** - designed for this (heavy hitters)

---

### 4. Failure & Evolution (5 min)

#### How Does This Fail?

**Exact Hash Map:**
- **Memory exhaustion**: Unbounded memory growth
- **Not scalable**: Fails for unbounded item spaces
- **Overflow**: Counters may overflow (need larger data types)

**Count-Min Sketch:**
- **Overestimation**: Hash collisions cause overestimation
- **Error increases**: As sketch fills, error increases
- **Parameter tuning**: Wrong width/depth = poor accuracy
- **No deletion**: Cannot easily remove items

**Count Sketch:**
- **May underestimate**: Unlike Count-Min, can underestimate
- **Error**: Still has error (though less biased)
- **Complexity**: Median calculation adds complexity
- **Parameter tuning**: Still need to tune parameters

**HyperLogLog:**
- **Distinct only**: Only for distinct count, not frequency
- **Approximation**: Not exact (though very accurate)
- **Limited use cases**: Only applicable to distinct count problems

**Space-Saving:**
- **Limited scope**: Only tracks top-K items
- **Misses items**: Items below threshold are not tracked
- **Eviction**: Eviction logic adds complexity
- **Parameter tuning**: K and ε must be tuned

#### How Would You Evolve It?

**Hybrid approach:**
- Use exact hash map for frequent items (top-K)
- Use Count-Min Sketch for infrequent items
- Combine: Exact for important, approximate for rest

**Adaptive sketching:**
- Monitor error rates
- Dynamically adjust sketch size based on observed error
- Balance memory vs accuracy

**Hierarchical counting:**
- Maintain multiple sketches at different resolutions
- Use fine-grained sketch for recent data
- Use coarse-grained sketch for historical data
- Combine for different time windows

**Sampling + exact:**
- Sample items (reservoir sampling)
- Count exactly in sample
- Extrapolate to full population
- Trade accuracy for memory

**Distributed counting:**
- Shard items across multiple sketches
- Each shard maintains its own sketch
- Merge results from all shards
- Scales horizontally

---

## Knowledge Deep Dive

### Count-Min Sketch

**Structure**: 2D array of counters (width × depth)

**Update (item x, count c):**
- For each hash function i (1 to depth):
  - Increment `sketch[hash_i(x) % width][i]` by c

**Query (item x):**
- Return `min(sketch[hash_i(x) % width][i])` for all i

**Properties:**
- Never underestimates (important for some use cases)
- Overestimates with probability based on sketch size
- Error bound: With probability 1-δ, error ≤ ε × total_count
  - Where width = e/ε, depth = ln(1/δ)

### Count Sketch

**Structure**: Similar to Count-Min, but uses signed hash functions

**Update (item x, count c):**
- For each hash function i:
  - If sign_i(x) == +1: increment counter
  - If sign_i(x) == -1: decrement counter

**Query (item x):**
- Return median of counters (reduces bias from collisions)

**Properties:**
- Unbiased estimate (median cancels out collisions)
- Can underestimate or overestimate
- Generally more accurate than Count-Min for same memory

### Error Bounds

**Count-Min Sketch:**
- Error ≤ (e × total_count) / width with probability 1 - (1/2)^depth
- Example: width=272, depth=5 gives error ≤ 1% with probability 99.97%

**Count Sketch:**
- Similar error bounds, but less biased
- Median reduces impact of collisions

**HyperLogLog:**
- Standard error: ~1.04/√m where m = number of registers
- Example: 16384 registers gives ~0.81% error

### When to Use What

- **Exact needed + bounded space**: Exact hash map
- **Unbounded space + overestimate OK**: Count-Min Sketch
- **Unbounded space + unbiased needed**: Count Sketch
- **Distinct count only**: HyperLogLog
- **Heavy hitters (top-K)**: Space-Saving
- **Mixed requirements**: Hybrid (exact + approximate)

---

## Listen For Yourself Saying

✅ "Exact counting requires unbounded memory - we need approximation for large item spaces"
✅ "Count-Min Sketch never underestimates, which is important for some use cases"
✅ "Error bounds depend on sketch parameters - we can tune memory vs accuracy"
✅ "We need to understand user impact of approximation errors"
