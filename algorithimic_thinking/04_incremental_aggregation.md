# Problem 4: Incremental Aggregation

## Prompt

You compute metrics over a dataset that updates continuously.

---

## Key Concepts

- What state must be stored?
- Recompute vs update
- Rollbacks

## Variations

- Late-arriving data
- Deletes
- Corrections

---

## Practice: 30-Minute Drill

### 1. Problem Framing (5 min)

**Restate the problem:**
- We have a dataset that receives continuous updates (inserts, updates, deletes)
- We need to maintain aggregated metrics (sum, average, count, min, max, etc.)
- Metrics must be kept up-to-date as data changes
- System must handle high update rates efficiently

**Clarify constraints:**
- What metrics? (Sum, average, count, percentiles, etc.)
- What is the update pattern? (Inserts only? Updates? Deletes?)
- What is the query pattern? (Continuous? On-demand?)
- What is acceptable latency? (Real-time? Near real-time?)
- Do we need exact or approximate metrics?

**Bounded vs Unbounded:**
- **Bounded**: Dataset size may be bounded (though large)
- **Online**: Must update metrics as data arrives, cannot recompute from scratch

**Key Questions:**
- Can we recompute from scratch? (Usually too expensive)
- What state must we maintain? (Minimal vs full dataset)
- How do we handle corrections? (Updates to old data)
- What about late-arriving data? (Out-of-order updates)

---

### 2. Candidate Approaches (10 min)

#### Approach 1: Full Recompute

**Description:**
- Store full dataset
- On query, recompute metrics from scratch
- No incremental state maintained

**Pros:**
- Always accurate
- Simple logic
- No state management

**Cons:**
- **Slow**: O(n) for each query
- **Expensive**: Recomputes everything repeatedly
- **Not scalable**: Fails for large datasets or high query rates

#### Approach 2: Incremental State (Simple Aggregates)

**Description:**
- Maintain aggregated state (sum, count, min, max)
- On insert: update aggregates
- On update: adjust aggregates (new_value - old_value)
- On delete: adjust aggregates (subtract deleted value)

**Pros:**
- Fast queries: O(1) to return precomputed aggregates
- Efficient updates: O(1) per update
- Bounded state: O(1) regardless of dataset size

**Cons:**
- Limited to simple aggregates (sum, count, min, max)
- Cannot handle complex metrics (percentiles, median, etc.)
- Requires tracking old values for updates

#### Approach 3: Materialized View with Incremental Updates

**Description:**
- Maintain materialized view of aggregated data
- On data change, incrementally update view
- Query materialized view instead of base data

**Pros:**
- Fast queries (precomputed)
- Can handle complex aggregations (with appropriate state)
- Flexible (can materialize multiple views)

**Cons:**
- State management complexity
- Update logic must handle all cases (insert, update, delete)
- Consistency challenges

#### Approach 4: Delta-Based Updates

**Description:**
- Maintain current aggregates
- Store deltas (changes) in a log
- Periodically apply deltas to aggregates
- Can replay deltas for corrections

**Pros:**
- Supports corrections (replay deltas)
- Audit trail (delta log)
- Can handle late-arriving data (apply deltas in order)

**Cons:**
- Delta log grows (need compaction)
- More complex than direct updates
- Ordering matters (must apply deltas correctly)

#### Approach 5: Approximate Aggregates (Sketch-Based)

**Description:**
- Use probabilistic data structures (Count-Min Sketch, HyperLogLog, etc.)
- Update sketches incrementally
- Query sketches for approximate results

**Pros:**
- Bounded memory (fixed size sketches)
- Fast updates and queries
- Handles very large datasets

**Cons:**
- Approximate (not exact)
- Limited to certain metrics (frequency, distinct count, etc.)
- Error bounds depend on sketch parameters

---

### 3. Tradeoffs & Scaling (10 min)

#### Time Complexity

| Approach | Update | Query |
|----------|--------|-------|
| Full Recompute | O(1) insert | O(n) |
| Incremental State | O(1) | O(1) |
| Materialized View | O(1) to O(k) where k = view complexity | O(1) |
| Delta-Based | O(1) append delta | O(1) query, O(deltas) apply |
| Sketch-Based | O(1) | O(1) |

#### Space Complexity

| Approach | Space |
|----------|-------|
| Full Recompute | O(n) - full dataset |
| Incremental State | O(1) - just aggregates |
| Materialized View | O(view_size) - depends on view |
| Delta-Based | O(n + deltas) - dataset + log |
| Sketch-Based | O(sketch_size) - **bounded** |

#### What Breaks at 10× / 100×?

**10× more data:**
- Full Recompute: Query time 10× slower (becomes unacceptable)
- Incremental State: Still O(1), but may need more precision (overflow)
- Materialized View: View size may grow
- Delta-Based: Delta log grows 10× (need compaction)
- Sketch-Based: Same memory, but error may increase

**10× higher update rate:**
- Full Recompute: Queries become even slower (more data to process)
- Incremental State: Still O(1) per update, but contention may increase
- Materialized View: Update overhead may become bottleneck
- Delta-Based: Delta log grows faster (need more frequent compaction)
- Sketch-Based: Still O(1), handles well

**100× more data:**
- Full Recompute: **Fails** - queries too slow
- Incremental State: May need larger data types (overflow)
- Materialized View: May need to partition views
- Delta-Based: **Fails** - delta log too large
- Sketch-Based: Still bounded, but may need larger sketches

**Complex metrics (percentiles, median):**
- Incremental State: **Cannot handle** - need full data or samples
- Materialized View: May need to store more state (sorted data, samples)
- Sketch-Based: Limited support (some sketches support quantiles)

---

### 4. Failure & Evolution (5 min)

#### How Does This Fail?

**Full Recompute:**
- **Slow queries**: O(n) becomes unacceptable for large n
- **Wasted computation**: Recomputes same values repeatedly
- **Not real-time**: Cannot provide low-latency metrics

**Incremental State:**
- **Limited metrics**: Only simple aggregates (sum, count, min, max)
- **Update complexity**: Must track old values for updates
- **Overflow**: May need larger data types for large sums
- **Cannot handle deletes easily**: Need to know what was deleted

**Materialized View:**
- **State explosion**: Complex views may require large state
- **Update logic**: Must handle all update cases correctly
- **Consistency**: Updates may be inconsistent if not atomic
- **Complexity**: More moving parts = more failure modes

**Delta-Based:**
- **Log growth**: Delta log grows unbounded (need compaction)
- **Ordering**: Must apply deltas in correct order
- **Complexity**: More complex than direct updates
- **Storage**: Need to store both dataset and deltas

**Sketch-Based:**
- **Approximation error**: Not exact, may be unacceptable
- **Limited metrics**: Only certain types of metrics supported
- **Parameter tuning**: Sketch size affects accuracy
- **User impact**: Approximate results may confuse users

#### How Would You Evolve It?

**Hybrid approach:**
- Use incremental state for simple aggregates (sum, count)
- Use sketches for approximate metrics (distinct count, top-K)
- Use materialized views for complex but bounded metrics
- Fall back to full recompute for rare complex queries

**Layered aggregation:**
- L1: Hot data - incremental state (exact, fast)
- L2: Warm data - materialized views (exact, moderate speed)
- L3: Cold data - sketches or archived (approximate or slower)

**Streaming aggregation:**
- Use stream processing framework (Kafka Streams, Flink)
- Maintain incremental state in stream processor
- Handle late-arriving data with watermarks
- Automatic state management and fault tolerance

**Time-windowed aggregation:**
- Maintain aggregates per time window (hour, day)
- Query aggregates across windows
- Evict old windows to bound memory
- Handles corrections by recomputing affected windows

**Sampling for complex metrics:**
- Maintain full incremental state for simple metrics
- Use samples (reservoir sampling) for complex metrics (percentiles)
- Trade accuracy for memory
- Can provide approximate percentiles with bounded memory

---

## Knowledge Deep Dive

### Incremental Aggregation Formulas

**Sum:**
- Insert: `sum += value`
- Update: `sum = sum - old_value + new_value`
- Delete: `sum -= value`

**Count:**
- Insert: `count += 1`
- Delete: `count -= 1`
- Update: `count` unchanged

**Average:**
- Maintain `sum` and `count`
- `average = sum / count`
- On update: adjust sum, count unchanged

**Min/Max:**
- Insert: `min = min(current_min, value)`
- Update: Need to know if old value was min/max
- Delete: Need to recompute if deleted value was min/max (or maintain heap)

**Variance/StdDev:**
- Maintain `sum`, `sum_squares`, `count`
- `variance = (sum_squares / count) - (sum / count)^2`
- More complex for updates (need old values)

### Handling Updates

**Challenge**: When updating a value, we need the old value to adjust aggregates.

**Solutions:**
1. **Store old values**: Keep previous value alongside new value
2. **Query before update**: Fetch old value before updating
3. **Event sourcing**: Store all changes, replay to get current state
4. **Two-phase update**: Read old value, compute delta, apply update

### Handling Deletes

**Challenge**: When deleting, we need to know what was deleted to adjust aggregates.

**Solutions:**
1. **Soft delete**: Mark as deleted, don't actually remove (adjust aggregates)
2. **Query before delete**: Fetch value before deleting
3. **Maintain full dataset**: Keep all data to recompute on delete (defeats purpose)
4. **Tombstones**: Store deleted values temporarily to adjust aggregates

### Late-Arriving Data

**Problem**: Data arrives out of order (event time vs processing time).

**Solutions:**
1. **Watermarks**: Define cutoff time, process late data separately
2. **Buffering**: Buffer recent data, allow updates within window
3. **Correction stream**: Maintain correction stream for late data
4. **Time-windowed**: Only aggregate within time windows, handle late data per window

### When to Use What

- **Simple aggregates (sum, count, avg)**: Incremental state
- **Complex aggregates (percentiles)**: Materialized view with samples or sketches
- **Very large datasets**: Sketch-based approximate
- **High update rate**: Incremental state
- **Need corrections**: Delta-based or event sourcing
- **Late-arriving data**: Time-windowed with watermarks

---

## Listen For Yourself Saying

✅ "We need to maintain minimal state - just the aggregates, not the full dataset"
✅ "For updates, we need the old value to adjust aggregates correctly"
✅ "Deletes are tricky - we need to know what was deleted"
✅ "Late-arriving data requires us to handle corrections or use time windows"
