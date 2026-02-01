# Problem 6: Materialized Views

## Prompt

Precompute derived data for fast reads.

---

## Key Concepts

- Storage vs compute
- Update cost
- Consistency

## Variations

- Incremental updates
- Full recomputation
- Partial materialization

---

## Practice: 30-Minute Drill

### 1. Problem Framing (5 min)

**Restate the problem:**
- We have base data (source of truth)
- We need to answer queries that require expensive computation over base data
- We precompute and store results (materialized view) for fast reads
- When base data changes, materialized view must be updated

**Clarify constraints:**
- What queries? (Aggregations, joins, transformations?)
- What is the read/write ratio? (Read-heavy? Write-heavy?)
- What is acceptable staleness? (Real-time? Near real-time? Eventually consistent?)
- How expensive is recomputation? (Seconds? Minutes? Hours?)
- What is the update pattern? (Frequent small updates? Batch updates?)

**Bounded vs Unbounded:**
- **Bounded**: Materialized view size is typically bounded (though may be large)
- **Online**: Must update view as base data changes (or periodically)

**Key Questions:**
- Can we recompute from scratch? (May be too expensive)
- Can we update incrementally? (More complex but faster)
- What is the storage cost? (View may be large)
- What is the consistency requirement? (Strong? Eventual?)

---

### 2. Candidate Approaches (10 min)

#### Approach 1: Full Recompute

**Description:**
- On base data change, recompute entire materialized view from scratch
- Replace old view with new view atomically

**Pros:**
- Simple: No incremental logic needed
- Always correct: No risk of incremental update bugs
- Easy to reason about: Clear semantics

**Cons:**
- **Slow**: O(n) where n = base data size
- **Expensive**: Recomputes everything even for small changes
- **Downtime**: View unavailable during recomputation (or serve stale)
- **Not scalable**: Fails for large datasets or frequent updates

#### Approach 2: Incremental Updates

**Description:**
- On base data change, update only affected parts of materialized view
- Maintain state to enable incremental updates

**Pros:**
- **Fast**: O(1) or O(log n) per update (vs O(n) for full recompute)
- **Efficient**: Only updates what changed
- **Scalable**: Handles frequent updates

**Cons:**
- **Complex**: Must handle all update cases (insert, update, delete)
- **Error-prone**: Incremental logic may have bugs
- **State management**: Must maintain additional state for incremental updates
- **Edge cases**: Complex scenarios (corrections, late data) are hard

#### Approach 3: Periodic Batch Recompute

**Description:**
- Recompute materialized view periodically (e.g., every hour, daily)
- Serve stale view between recomputations
- Use batch processing for recomputation

**Pros:**
- Simple: Full recompute, but scheduled
- Efficient: Batch processing is optimized
- Predictable: Know when view is fresh

**Cons:**
- **Staleness**: View may be stale for up to batch interval
- **Resource spikes**: Recompute consumes resources periodically
- **Not real-time**: Cannot provide immediate freshness

#### Approach 4: Stream Processing

**Description:**
- Use stream processing framework (Kafka Streams, Flink, Spark Streaming)
- Maintain materialized view as stream state
- Updates happen automatically as events stream through

**Pros:**
- **Real-time**: Updates as data arrives
- **Automatic**: Framework handles state management
- **Scalable**: Stream processing scales horizontally
- **Fault-tolerant**: Framework handles failures

**Cons:**
- **Complexity**: Need stream processing infrastructure
- **Learning curve**: Different paradigm
- **Latency**: Stream processing adds some latency
- **Ordering**: Must handle out-of-order events

#### Approach 5: Hybrid: Incremental + Periodic Recompute

**Description:**
- Use incremental updates for fast path
- Periodically do full recompute to correct any drift/errors
- Combines speed of incremental with correctness of full recompute

**Pros:**
- Best of both: Fast updates + correctness guarantee
- Resilient: Full recompute corrects incremental errors
- Flexible: Can tune recompute frequency

**Cons:**
- More complex: Two mechanisms
- Resource usage: Periodic full recompute still expensive
- May serve inconsistent view during recompute

---

### 3. Tradeoffs & Scaling (10 min)

#### Time Complexity

| Approach | Update | Query |
|----------|--------|-------|
| Full Recompute | O(n) | O(1) |
| Incremental | O(1) to O(log n) | O(1) |
| Periodic Batch | O(n) per batch | O(1) |
| Stream Processing | O(1) per event | O(1) |
| Hybrid | O(1) incremental, O(n) periodic | O(1) |

#### Space Complexity

| Approach | Space |
|----------|-------|
| Full Recompute | O(view_size) |
| Incremental | O(view_size + incremental_state) |
| Periodic Batch | O(view_size) |
| Stream Processing | O(view_size + stream_state) |
| Hybrid | O(view_size + incremental_state) |

#### Update Latency

| Approach | Latency |
|----------|---------|
| Full Recompute | O(n) - seconds to hours |
| Incremental | O(1) - milliseconds |
| Periodic Batch | Batch interval (minutes to hours) |
| Stream Processing | Stream latency (milliseconds to seconds) |
| Hybrid | O(1) incremental, batch for correction |

#### What Breaks at 10× / 100×?

**10× more base data:**
- Full Recompute: **10× slower** - may become unacceptable
- Incremental: Still O(1) per update, but state may grow
- Periodic Batch: **10× slower** recompute, longer staleness
- Stream Processing: Still O(1) per event, but state grows
- Hybrid: Incremental still fast, but periodic recompute 10× slower

**10× higher update rate:**
- Full Recompute: **Fails** - cannot keep up with updates
- Incremental: Still O(1) per update, but more updates to process
- Periodic Batch: Still works, but view more stale (more updates between batches)
- Stream Processing: Handles well (designed for high throughput)
- Hybrid: Incremental handles updates, but periodic recompute may lag

**10× larger materialized view:**
- All approaches: More storage needed
- Full Recompute: **10× slower** to rebuild
- Incremental: Update logic may become more complex
- Stream Processing: State management becomes more expensive

**Complex queries (joins, aggregations):**
- Full Recompute: Still works, just slower
- Incremental: **Complex** - hard to incrementally update joins
- Periodic Batch: Still works, batch processing handles complexity
- Stream Processing: Framework handles complexity, but may be limited

---

### 4. Failure & Evolution (5 min)

#### How Does This Fail?

**Full Recompute:**
- **Slow**: O(n) becomes unacceptable for large n
- **Downtime**: View unavailable during recompute (or serve stale)
- **Resource spikes**: Recompute consumes CPU/memory/IO
- **Not real-time**: Cannot provide immediate freshness

**Incremental:**
- **Complexity**: Hard to get right for all cases
- **Bugs**: Incremental logic may have edge cases
- **State drift**: Errors accumulate over time
- **Limited queries**: Cannot incrementally update all query types (e.g., complex joins)

**Periodic Batch:**
- **Staleness**: View stale for up to batch interval
- **Resource spikes**: Periodic recompute causes spikes
- **Not real-time**: Cannot provide immediate freshness
- **Scheduling**: Must schedule recomputes (may conflict with other jobs)

**Stream Processing:**
- **Infrastructure**: Need stream processing infrastructure
- **Complexity**: Different paradigm, learning curve
- **Ordering**: Out-of-order events complicate logic
- **State management**: Stream state may grow large

**Hybrid:**
- **Complexity**: Two mechanisms to maintain
- **Inconsistency**: View may be inconsistent during periodic recompute
- **Resource usage**: Still need periodic full recompute

#### How Would You Evolve It?

**Layered materialization:**
- L1: Hot data - incremental updates (real-time)
- L2: Warm data - periodic batch (near real-time)
- L3: Cold data - full recompute on-demand (eventually consistent)

**Query-specific materialization:**
- Materialize only frequently-accessed queries
- Use full recompute for rare queries
- Balance storage cost vs compute cost

**Approximate materialization:**
- Use sketches or samples for approximate views
- Much smaller storage, faster updates
- Acceptable if approximation error is acceptable

**Delta materialization:**
- Store deltas (changes) instead of full view
- Recompute view from deltas on query (or periodically)
- Reduces storage, but adds query-time computation

**Partitioned materialization:**
- Partition base data and materialize per partition
- Update only affected partitions incrementally
- Recompute partitions independently
- Scales horizontally

---

## Knowledge Deep Dive

### Materialized View Types

**Aggregation views:**
- Precompute sums, counts, averages, etc.
- Incremental updates: Adjust aggregates on base data changes
- Example: `SELECT user_id, SUM(amount) FROM transactions GROUP BY user_id`

**Join views:**
- Precompute joins between tables
- Incremental updates: Complex (must handle inserts/updates/deletes in both tables)
- Example: `SELECT u.name, o.total FROM users u JOIN orders o ON u.id = o.user_id`

**Transformation views:**
- Precompute data transformations (filtering, mapping, etc.)
- Incremental updates: Apply transformation to new/changed data
- Example: `SELECT * FROM events WHERE type = 'purchase' AND amount > 100`

### Incremental Update Strategies

**For aggregations:**
- Maintain aggregate state (sum, count, etc.)
- On insert: Add to aggregates
- On update: Adjust aggregates (new - old)
- On delete: Subtract from aggregates

**For joins:**
- More complex - changes in either table affect view
- Must track which base rows contribute to which view rows
- May need to maintain join index or dependency graph

**For transformations:**
- Apply transformation to new/changed data
- Add/update/remove view rows based on transformation result
- May need to check if old data still matches transformation

### Consistency Models

**Strong consistency:**
- View always reflects current base data
- Requires synchronous updates (slow)
- Use for critical queries

**Eventual consistency:**
- View may be temporarily stale
- Updates happen asynchronously (fast)
- Use for non-critical queries

**Bounded staleness:**
- View is stale for at most T time
- Periodic updates ensure bounded staleness
- Balance between consistency and performance

### When to Use What

- **Simple aggregations, frequent updates**: Incremental updates
- **Complex queries, infrequent updates**: Full recompute
- **Read-heavy, moderate staleness OK**: Periodic batch recompute
- **Real-time requirements**: Stream processing
- **Need correctness guarantee**: Hybrid (incremental + periodic recompute)
- **Very large datasets**: Partitioned materialization
- **Approximate OK**: Sketch-based approximate views

---

## Listen For Yourself Saying

✅ "We trade storage for compute - precompute expensive queries"
✅ "Incremental updates are fast but complex - full recompute is simple but slow"
✅ "We need to balance update cost with query performance"
✅ "Consistency requirements determine update strategy"
