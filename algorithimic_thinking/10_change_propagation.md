# Problem 10: Change Propagation

## Prompt

A value changes; many downstream values depend on it.

---

## Key Concepts

- Blast radius
- Caching
- Ordering guarantees

## Variations

- Incremental updates
- Batch updates
- Eventual consistency

---

## Practice: 30-Minute Drill

### 1. Problem Framing (5 min)

**Restate the problem:**
- We have a value (source) that many other values depend on
- When the source value changes, all dependent values must be updated
- We need to propagate the change efficiently to all dependents
- System must handle high change rates and many dependents

**Clarify constraints:**
- What is the dependency structure? (Tree? DAG? May have cycles?)
- How many dependents? (Few? Many? Millions?)
- What is the change rate? (Low? High? Very high?)
- What is the update cost? (Cheap? Expensive?)
- Do we need immediate consistency or eventual consistency?

**Bounded vs Unbounded:**
- **Bounded**: Number of dependents is typically bounded (though may be very large)
- **Online**: Must propagate changes as they occur, cannot wait

**Key Questions:**
- How do we represent dependencies? (Graph? Explicit list? Implicit?)
- How do we minimize updates? (Only update what changed? Batch updates?)
- How do we handle failures? (Retry? Best effort? Guaranteed delivery?)
- What is the blast radius? (How many values are affected?)

---

### 2. Candidate Approaches (10 min)

#### Approach 1: Direct Updates (Push)

**Description:**
- Maintain list of dependents
- On source change, directly update all dependents
- Synchronous or asynchronous updates

**Pros:**
- **Immediate**: Updates happen immediately
- **Simple**: Straightforward to implement
- **Guaranteed**: Can ensure all dependents are updated

**Cons:**
- **Fanout**: One change triggers many updates (O(dependents))
- **Slow**: If many dependents, updates take long
- **Failure handling**: If one update fails, what to do?
- **Coupling**: Source must know all dependents

#### Approach 2: Event-Driven (Pub/Sub)

**Description:**
- Source publishes change event
- Dependents subscribe to events
- Dependents update themselves on receiving event

**Pros:**
- **Decoupled**: Source doesn't need to know dependents
- **Scalable**: Can have many subscribers
- **Flexible**: Easy to add/remove dependents

**Cons:**
- **Eventual consistency**: Updates may be delayed (event processing)
- **Lost events**: Events may be lost (need retry logic)
- **Ordering**: Events may arrive out of order
- **Infrastructure**: Need event infrastructure (message queue, etc.)

#### Approach 3: Pull-Based (Lazy Evaluation)

**Description:**
- Dependents don't store computed values
- On read, compute value from source (lazy)
- Cache computed value until source changes

**Pros:**
- **No propagation**: No need to update dependents
- **Simple**: Source doesn't need to know dependents
- **Always correct**: Computed on-demand from current source

**Cons:**
- **Slow reads**: Must compute on every read (if not cached)
- **Cache invalidation**: Must invalidate cache when source changes
- **Not suitable for expensive computations**: Too slow if computation is expensive

#### Approach 4: Incremental Updates with Dependency Graph

**Description:**
- Maintain dependency graph
- On source change, traverse graph to find all dependents
- Update dependents incrementally (only what changed)

**Pros:**
- **Efficient**: Only updates what's needed
- **Minimal computation**: Incremental updates are cheaper than full recompute
- **Scalable**: Handles large dependency graphs

**Cons:**
- **Complexity**: Must maintain dependency graph
- **Graph traversal**: Must traverse graph to find dependents (O(V + E))
- **Incremental logic**: Must implement incremental updates (complex)

#### Approach 5: Batch Updates

**Description:**
- Collect changes over time window
- Batch update all dependents together
- More efficient than individual updates

**Pros:**
- **Efficient**: Batch operations are more efficient
- **Reduced overhead**: Less overhead per update
- **Can optimize**: Can optimize batch (deduplicate, order, etc.)

**Cons:**
- **Latency**: Updates delayed until batch window
- **Staleness**: Dependents may be stale during batch window
- **Batching logic**: Must implement batching (window, size, etc.)

---

### 3. Tradeoffs & Scaling (10 min)

#### Time Complexity

| Approach | Change | Update Propagation | Read |
|----------|--------|-------------------|------|
| Direct Push | O(1) | O(dependents) | O(1) |
| Event-Driven | O(1) publish | O(1) per event | O(1) |
| Pull-Based | O(1) | O(0) - no propagation | O(computation) |
| Incremental | O(1) | O(V + E) graph traversal | O(1) |
| Batch | O(1) collect | O(dependents) per batch | O(1) |

#### Space Complexity

| Approach | Space |
|----------|-------|
| Direct Push | O(dependents) - list of dependents |
| Event-Driven | O(events_in_queue) - event queue |
| Pull-Based | O(0) - no stored dependents |
| Incremental | O(V + E) - dependency graph |
| Batch | O(changes_in_batch) - batch buffer |

#### Consistency & Latency

| Approach | Consistency | Latency |
|----------|-------------|---------|
| Direct Push | Strong (synchronous) or eventual (async) | Low (immediate) |
| Event-Driven | Eventual | Medium (event processing delay) |
| Pull-Based | Strong (computed on-demand) | High (computation on read) |
| Incremental | Strong (if synchronous) | Low to Medium |
| Batch | Eventual | High (batch window) |

#### What Breaks at 10× / 100×?

**10× more dependents:**
- Direct Push: **10× slower** - updates take 10× longer
- Event-Driven: Still O(1) per event, but more events to process
- Pull-Based: Still O(0) propagation, but more reads (if cached)
- Incremental: Graph traversal 10× larger, but still manageable
- Batch: Batch size 10× larger, but still efficient

**10× higher change rate:**
- Direct Push: **Fails** - cannot keep up with updates
- Event-Driven: More events, but handles well (designed for high throughput)
- Pull-Based: More cache invalidations, but still works
- Incremental: More graph traversals, but still manageable
- Batch: More changes per batch, but still efficient

**10× deeper dependency chain:**
- All approaches: Must propagate through longer chains
- Direct Push: Updates propagate through chain (sequential, slow)
- Event-Driven: Events propagate through chain (parallel, faster)
- Incremental: Graph traversal longer, but still O(V + E)

**Distributed systems:**
- **Problem**: Dependents may be on different machines
- **Solution**: Use event-driven (pub/sub) or pull-based
- **Challenge**: Network latency, failures, ordering

---

### 4. Failure & Evolution (5 min)

#### How Does This Fail?

**Direct Push:**
- **Fanout explosion**: Too many dependents = slow updates
- **Failure handling**: If one update fails, what to do? (Retry all? Some?)
- **Coupling**: Source must know all dependents (tight coupling)
- **Not scalable**: Fails for many dependents

**Event-Driven:**
- **Lost events**: Events may be lost (network issues, queue full)
- **Ordering**: Events may arrive out of order (must handle)
- **Eventual consistency**: Updates delayed (may be unacceptable)
- **Infrastructure**: Need reliable event infrastructure

**Pull-Based:**
- **Slow reads**: Computation on every read (if not cached)
- **Cache invalidation**: Must invalidate cache (back to propagation problem)
- **Expensive computations**: Not suitable if computation is expensive
- **Staleness**: Cache may be stale until invalidated

**Incremental:**
- **Complexity**: Incremental update logic is complex
- **Graph maintenance**: Must maintain dependency graph
- **Graph traversal**: Traversal may be expensive for large graphs
- **Incremental bugs**: Hard to get incremental logic right

**Batch:**
- **Latency**: Updates delayed until batch window
- **Staleness**: Dependents stale during batch window
- **Batching logic**: Must implement batching (window, size, triggers)
- **Memory**: Batch buffer grows with change rate

#### How Would You Evolve It?

**Hybrid approach:**
- Use event-driven for decoupling
- Use batching for efficiency
- Combine: Batch events, then publish batched updates

**Hierarchical propagation:**
- Group dependents (e.g., by region, by type)
- Propagate to groups, then within groups
- Reduces fanout (tree instead of star)

**Smart caching:**
- Cache computed values
- Invalidate cache on source change (event-driven)
- Pull-based with smart invalidation

**Incremental + Event-driven:**
- Use dependency graph to find dependents
- Use events to propagate updates
- Combine: Graph for discovery, events for propagation

**Adaptive batching:**
- Monitor change rate
- Dynamically adjust batch window (high rate = larger batches)
- Balance latency vs efficiency

---

## Knowledge Deep Dive

### Blast Radius

**Definition**: The number of values affected by a single change.

**Minimization strategies:**
1. **Dependency minimization**: Reduce dependencies (fewer dependents)
2. **Lazy propagation**: Only update when value is read (pull-based)
3. **Batching**: Batch updates to reduce overhead
4. **Hierarchical**: Group dependents, propagate hierarchically

### Ordering Guarantees

**Problem**: Updates may arrive out of order (network, async processing).

**Solutions:**
1. **Sequence numbers**: Assign sequence numbers, process in order
2. **Vector clocks**: Track causality, process causally before
3. **Idempotency**: Make updates idempotent (safe to apply multiple times)
4. **Last-write-wins**: Accept that order may be wrong, use latest value

### Caching Strategies

**Cache invalidation:**
- **Time-based (TTL)**: Cache expires after time
- **Event-based**: Invalidate on source change event
- **Version-based**: Cache includes version, check version on read
- **Pull-based**: No cache, compute on-demand

**Cache warming:**
- Pre-populate cache with likely-needed values
- Reduces cache misses
- Can warm after invalidation

### When to Use What

- **Few dependents, need immediate updates**: Direct push
- **Many dependents, eventual consistency OK**: Event-driven (pub/sub)
- **Expensive computation, infrequent reads**: Pull-based (lazy)
- **Complex dependencies, need efficiency**: Incremental updates
- **High change rate, latency OK**: Batch updates
- **Distributed systems**: Event-driven or pull-based
- **Need strong consistency**: Direct push (synchronous) or pull-based

---

## Listen For Yourself Saying

✅ "We need to minimize blast radius - one change shouldn't trigger too many updates"
✅ "Event-driven decouples source from dependents, but adds eventual consistency"
✅ "Pull-based avoids propagation but may be slow if computation is expensive"
✅ "Batching reduces overhead but adds latency - we need to balance"
