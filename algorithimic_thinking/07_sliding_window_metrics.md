# Problem 7: Sliding Window Metrics

## Prompt

Compute metrics over the last N minutes of events.

---

## Key Concepts

- Windowing
- Eviction
- Ordering

## Variations

- Fixed vs sliding
- Late data handling

---

## Practice: 30-Minute Drill

### 1. Problem Framing (5 min)

**Restate the problem:**
- We have a stream of events with timestamps
- We need to compute metrics (sum, count, average, etc.) over events in the last N minutes
- As time progresses, old events fall out of the window
- Metrics must be updated continuously as new events arrive and old events expire

**Clarify constraints:**
- What metrics? (Sum, count, average, percentiles, etc.)
- What is the window size? (Last 1 minute? 1 hour? 1 day?)
- What is the event rate? (Low? High? Very high?)
- Do events arrive in order? (In-order? Out-of-order?)
- What is the query pattern? (Continuous? On-demand?)

**Bounded vs Unbounded:**
- **Bounded**: Window size is bounded (last N minutes)
- **Online**: Must process events as they arrive, cannot wait

**Key Questions:**
- Fixed window (discrete buckets) or sliding window (continuous)?
- How do we handle out-of-order events?
- How do we evict old events efficiently?
- What state must we maintain?

---

### 2. Candidate Approaches (10 min)

#### Approach 1: Fixed Window (Time Buckets)

**Description:**
- Divide time into fixed buckets (e.g., 1-minute buckets)
- Maintain metrics per bucket
- On query, sum metrics from buckets in window (e.g., last 10 buckets for 10-minute window)

**Pros:**
- Simple: Easy to implement
- Efficient: O(1) updates per bucket, O(buckets) query
- Bounded state: O(buckets) regardless of event rate

**Cons:**
- **Discrete**: Window boundaries are fixed (not truly sliding)
- **Boundary effects**: Events at bucket boundaries may be inconsistently counted
- **Granularity**: Window size must be multiple of bucket size

#### Approach 2: Sliding Window with Timestamp List

**Description:**
- Store all events with timestamps in the window
- On query, filter events within window, compute metrics
- Periodically evict old events (or on each query)

**Pros:**
- **Exact**: True sliding window, no boundary effects
- **Flexible**: Any window size, any metrics

**Cons:**
- **Memory**: O(events_in_window) - grows with event rate
- **Slow queries**: O(n) to filter and compute (where n = events in window)
- **Eviction**: Must scan to find old events

#### Approach 3: Sliding Window with Circular Buffer

**Description:**
- Divide time into small time slices (e.g., 1 second)
- Maintain circular buffer of time slices
- Each slice stores aggregated metrics for that time period
- On query, sum metrics from slices in window

**Pros:**
- Bounded memory: O(time_slices) - fixed size
- Fast queries: O(time_slices_in_window) - typically small
- True sliding window (with slice granularity)

**Cons:**
- **Approximate**: Granularity depends on slice size
- **Memory**: Still O(time_slices) - may be large for long windows with fine slices
- **Slice management**: Must manage circular buffer

#### Approach 4: Incremental Aggregation with Eviction

**Description:**
- Maintain aggregated metrics (sum, count, etc.)
- Maintain queue of events with timestamps (or just timestamps)
- On new event: add to metrics, add to queue
- Periodically: evict old events from queue, subtract from metrics

**Pros:**
- Fast updates: O(1) per event
- Fast queries: O(1) - metrics precomputed
- Bounded memory: O(events_in_window) - but window is bounded

**Cons:**
- **Eviction complexity**: Must track what to subtract
- **Memory**: Still O(events_in_window) - may be large for high event rates
- **Eviction timing**: When to evict? (Periodic? On query? On insert?)

#### Approach 5: Probabilistic Sliding Window (Count-Min Sketch)

**Description:**
- Use Count-Min Sketch with time decay
- Apply exponential decay to counts based on age
- Query sketch for approximate metrics

**Pros:**
- Bounded memory: O(sketch_size) - fixed
- Fast: O(1) updates and queries
- Handles very high event rates

**Cons:**
- **Approximate**: Not exact
- **Time decay**: Decay calculation adds complexity
- **Limited metrics**: Only frequency-based metrics

---

### 3. Tradeoffs & Scaling (10 min)

#### Time Complexity

| Approach | Update | Query | Eviction |
|----------|--------|-------|----------|
| Fixed Window | O(1) | O(buckets) | O(1) per bucket |
| Timestamp List | O(1) | O(events) | O(events) |
| Circular Buffer | O(1) | O(slices) | O(1) |
| Incremental | O(1) | O(1) | O(events) periodic |
| Probabilistic | O(1) | O(1) | O(1) decay |

#### Space Complexity

| Approach | Space |
|----------|-------|
| Fixed Window | O(buckets) - **bounded** |
| Timestamp List | O(events_in_window) - **bounded by window** |
| Circular Buffer | O(slices) - **bounded** |
| Incremental | O(events_in_window) - **bounded by window** |
| Probabilistic | O(sketch_size) - **bounded** |

#### Accuracy

| Approach | Accuracy | Window Type |
|----------|----------|-------------|
| Fixed Window | Exact per bucket | Discrete (fixed boundaries) |
| Timestamp List | Exact | True sliding |
| Circular Buffer | Approximate (slice granularity) | Sliding (with granularity) |
| Incremental | Exact | True sliding |
| Probabilistic | Approximate | Sliding (with decay) |

#### What Breaks at 10× / 100×?

**10× higher event rate:**
- Fixed Window: Still O(1) per event, but buckets get more events
- Timestamp List: **Memory grows 10×** (more events in window)
- Circular Buffer: Still bounded, but slices get more events
- Incremental: **Memory grows 10×** (more events to track)
- Probabilistic: Still bounded, handles well

**10× longer window:**
- Fixed Window: **10× more buckets** (more memory, slower queries)
- Timestamp List: **10× more events** (more memory, slower queries)
- Circular Buffer: **10× more slices** (more memory, slower queries)
- Incremental: **10× more events** (more memory, slower eviction)
- Probabilistic: Still bounded, but decay calculation more complex

**100× higher event rate:**
- Timestamp List: **Fails** - memory explosion
- Incremental: **Fails** - memory explosion, eviction too slow
- Fixed Window: Still works, but queries slower (more buckets)
- Circular Buffer: Still bounded, but may need larger slices
- Probabilistic: Still bounded, best for very high rates

**Out-of-order events:**
- All approaches: **Complex** - must buffer and reorder
- Timestamp List: Can handle (store all, sort on query)
- Incremental: Hard to handle (eviction assumes order)
- Fixed Window: Can handle (assign to correct bucket)
- Circular Buffer: Can handle (assign to correct slice)

---

### 4. Failure & Evolution (5 min)

#### How Does This Fail?

**Fixed Window:**
- **Boundary effects**: Events at bucket boundaries inconsistently counted
- **Discrete windows**: Not truly sliding (jumps at bucket boundaries)
- **Memory**: Grows with window size (more buckets)
- **Query time**: Grows with window size (more buckets to sum)

**Timestamp List:**
- **Memory explosion**: High event rates = many events in window
- **Slow queries**: O(n) to filter and compute
- **Eviction overhead**: Must scan to find old events
- **Not scalable**: Fails for high event rates

**Circular Buffer:**
- **Granularity tradeoff**: Fine slices = more memory, coarse slices = less accurate
- **Memory**: Still O(slices) - may be large for long windows with fine slices
- **Approximation**: Not exact (slice granularity)
- **Slice management**: Circular buffer logic adds complexity

**Incremental:**
- **Memory**: O(events_in_window) - grows with event rate
- **Eviction complexity**: Must track what to subtract (for complex metrics)
- **Eviction timing**: When to evict? Too frequent = overhead, too rare = memory growth
- **Out-of-order**: Hard to handle (eviction assumes ordered events)

**Probabilistic:**
- **Approximation error**: Not exact, may be unacceptable
- **Limited metrics**: Only frequency-based (count, sum with weights)
- **Decay calculation**: Time-based decay adds complexity
- **Parameter tuning**: Sketch size and decay rate affect accuracy

#### How Would You Evolve It?

**Hybrid approach:**
- Use circular buffer for bounded memory
- Use incremental aggregation within slices
- Combine: Fast updates + bounded memory + sliding window

**Multi-resolution windows:**
- Maintain multiple windows (1 min, 5 min, 1 hour)
- Use appropriate window for query
- Share computation where possible

**Sampling for high rates:**
- For very high event rates, sample events
- Maintain metrics on samples
- Trade accuracy for memory/performance

**Stream processing framework:**
- Use Kafka Streams, Flink, etc.
- Framework handles windowing, eviction, out-of-order
- Automatic state management and fault tolerance

**Time-decay with incremental:**
- Apply exponential decay to incremental aggregates
- Decay based on time, not event count
- Bounded memory (don't store individual events)
- Approximate but efficient

---

## Knowledge Deep Dive

### Fixed vs Sliding Windows

**Fixed Window (Tumbling):**
- Discrete, non-overlapping windows
- Example: [0:00-1:00), [1:00-2:00), [2:00-3:00)
- Simple, but boundaries are arbitrary
- Events at boundaries may be inconsistently assigned

**Sliding Window:**
- Continuous, overlapping windows
- Example: At 1:30, window is [0:30-1:30]
- More natural, but more complex
- True sliding requires storing individual events or using approximations

### Eviction Strategies

**Time-based eviction:**
- Evict events older than window
- Can evict on insert (check age of oldest)
- Can evict periodically (background thread)
- Can evict on query (lazy eviction)

**Lazy vs Eager:**
- **Lazy**: Evict on query (simpler, but query may be slow)
- **Eager**: Evict on insert or periodically (faster queries, but more overhead)

### Out-of-Order Events

**Problem**: Events may arrive out of order (network delays, processing delays).

**Solutions:**
1. **Buffering**: Buffer events, sort by timestamp, process in order
2. **Watermarks**: Define cutoff time, process late events separately
3. **Best-effort**: Process in arrival order, accept some inaccuracy
4. **Correction stream**: Maintain correction stream for late events

### When to Use What

- **Low event rate, exact needed**: Timestamp list or incremental
- **High event rate, exact needed**: Circular buffer with fine slices
- **Very high event rate, approximate OK**: Probabilistic (sketch-based)
- **Simple metrics (sum, count)**: Incremental aggregation
- **Complex metrics (percentiles)**: Timestamp list or samples
- **Out-of-order events**: Stream processing framework or buffering

---

## Listen For Yourself Saying

✅ "Fixed windows are simple but have boundary effects - sliding windows are more natural"
✅ "We need to balance memory (storing events) with query performance (precomputed metrics)"
✅ "For high event rates, we may need to approximate or use probabilistic methods"
✅ "Out-of-order events complicate windowing - we may need buffering or watermarks"
