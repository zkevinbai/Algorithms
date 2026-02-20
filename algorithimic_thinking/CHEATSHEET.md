# Algorithmic Thinking Cheat Sheet

Quick reference - updated as topics are covered.

---

## 1. Top-K in a Stream

**Problem:** Unbounded stream → top K most frequent items  
**Why naive fails:** Hashmap memory grows unbounded → OOM

### Solutions

| Approach | Memory | Accuracy | Query Any? | Use When |
|----------|--------|----------|------------|----------|
| Count-Min Sketch | Fixed | Approximate | ✅ Yes | Query arbitrary items, huge item space |
| Space-Saving | Fixed | Exact (tracked) | ❌ No | Top-K with exact counts |
| Sliding Window | Fixed | Exact (window) | ✅ (in window) | Recent items only |

### Decision Framework
```
Exact counts for top-K? → Space-Saving
Query arbitrary items? → Count-Min Sketch
Both? → Hybrid
Recent only? → Sliding Window
```

### Key Reminders
- **Count-Min Sketch**: Deterministic hashing → can query unseen items (but may be wrong)
- **Space-Saving**: Evicts min count → preserves heavy hitters (not just bounded hashmap)
- **"Sketch"** = Probabilistic data structure with fixed memory

---

## 2. Deduplication at Scale

**Problem:** Ensure each unique event is processed once in high-throughput system  
**Why naive fails:** Hashmap memory grows unbounded → OOM

### Solutions

| Approach | Memory | False Positives | Use When |
|----------|--------|----------------|----------|
| Hash Set | Unbounded | 0% | Bounded event space |
| Bloom Filter | Fixed | >0% (tunable) | Unbounded space, false positives OK |
| Counting Bloom Filter | Fixed | >0% (tunable) | Unbounded space + need to forget events |
| Hybrid (Bloom + Exact) | Fixed + Bounded | 0% | Unbounded space + need exact |

### Decision Framework
```
Bounded event space? → Hash Set
Unbounded + false positives OK? → Bloom Filter
Unbounded + need to forget? → Counting Bloom Filter
Unbounded + need exact? → Hybrid (Bloom Filter + Redis/DB)
```

### Key Reminders
- **Bloom Filter**: Fixed bit array → bounded memory, false positives increase as it fills
- **Counting Bloom Filter**: Counters instead of bits → supports deletion
- **Hybrid**: Bloom Filter (fast) + Exact Store (slow) → only ~1% hit exact store
- **False positives OK, false negatives bad**: Better to reject valid than process duplicate

---

## 3. Rate Limiting

**Problem:** Limit requests per user (e.g., 100 requests/minute)  
**Why naive fails:** Fixed window allows 2× bursts at boundaries, sliding window log has unbounded memory

### Solutions

| Approach | Memory | Accuracy | Burst Handling | Use When |
|----------|--------|----------|----------------|----------|
| Fixed Window | O(1) per user | Exact per window | Poor (2× at boundaries) | Simple, bursts acceptable |
| Sliding Window Log | O(requests) | Exact | Good (smooth) | Low rate, exact needed |
| Sliding Window Counter | O(sub_windows) | Approximate | Good (smooth) | Approximate OK, bounded memory |
| Token Bucket | O(1) | Exact (token-based) | Good (allows bursts if tokens) | High rate, smooth limiting |
| Leaky Bucket | O(queue_size) | Exact (queue-based) | Good (queues bursts) | Smooth output rate needed |

### Decision Framework
```
Simple + acceptable bursts? → Fixed Window
Exact + low request rate? → Sliding Window Log
Approximate OK + bounded memory? → Sliding Window Counter
High rate + smooth limiting? → Token Bucket
Smooth output rate (can queue)? → Leaky Bucket
Distributed system? → Token Bucket + Redis
```

### Key Reminders
- **Fixed Window**: Count up, reset at boundary → allows 2× limit in 2 seconds at boundary
- **Token Bucket**: Count down, refill continuously → smooth rate limiting with O(1) memory
- **Leaky Bucket**: Queue requests, drain at constant rate → smooths output but may delay
- **Token vs Leaky**: Token allows bursts and rejects immediately; Leaky queues and processes smoothly

---

## 4. Incremental Aggregation

**Problem:** Compute metrics over dataset that updates continuously  
**Why naive fails:** Full recompute is O(n) per query → too slow at scale

### Solutions

| Approach | Memory | Update | Query | Use When |
|----------|--------|--------|-------|----------|
| Full Recompute | O(n) | O(1) insert | O(n) | Nothing (too slow) |
| Incremental State | O(1) | O(1) | O(1) | Simple aggregates (sum, count, avg, min, max) |
| Materialized View | O(view_size) | O(1) to O(k) | O(1) | Complex metrics (with appropriate state) |
| Delta-Based | O(n + deltas) | O(1) append | O(1) | Need corrections/late-arriving data |
| Sketch-Based | O(sketch_size) | O(1) | O(1) | Very large datasets, approximate OK |

### Decision Framework
```
Simple aggregates (sum, count, avg)? → Incremental State
Complex metrics (percentiles, median)?
  → Small dataset (< 1M)? → Materialized View (exact, full sorted data)
  → Huge dataset (billions)? → Sketch-Based (approximate, bounded)
  → Medium dataset? → Materialized View (sorted samples, approximate)
Need corrections/late-arriving data? → Delta-Based
```

### Key Reminders
- **Incremental State**: Maintain sum, count, etc. → O(1) memory, fast updates
- **Materialized View**: Precomputed aggregates stored separately → fast queries, but need to maintain
- **Delta-Based**: Store changes in log → can replay for corrections/late data
- **Sketch-Based**: T-Digest/KLL for percentiles → bounded memory, approximate results
- **Median/Percentiles**: Require distribution info → can't use simple aggregates, need sorted data or sketches

---

## 5. Cache Invalidation

**Problem:** Cache expensive query results while keeping correctness acceptable  
**Why naive fails:** Caching forever → stale data when source changes

### Solutions

| Approach | Staleness | Complexity | Use When |
|----------|-----------|------------|----------|
| TTL | Up to TTL duration | Low | Read-heavy, staleness acceptable |
| Event-Driven | Event processing delay | Medium | Write-heavy, need freshness |
| Hybrid (TTL + Event) | min(TTL, event_delay) | Medium-High | Need freshness + resilience |
| Write-Through | 0 (always fresh) | Medium | Low write rate, exact freshness |
| Write-Behind | Async write delay | Medium-High | High write rate, can accept async |

### Decision Framework
```
Read-heavy + staleness OK? → TTL
Write-heavy + need freshness?
  → High write rate? → Event-Driven (or Hybrid for safety)
  → Low write rate? → Write-Through
Need resilience (handle lost events)? → Hybrid
Need exact freshness, low write rate? → Write-Through
```

### Key Reminders
- **TTL**: Simple, predictable staleness, but may serve stale data even after source updates
- **Event-Driven**: Fresh data, but needs infrastructure and handles lost events (use TTL safety net)
- **Hybrid**: Best of both - event-driven freshness + TTL resilience
- **Write-Through**: Always fresh, but slow writes (waits for source)
- **Write-Behind**: Fast writes (async), but risk of data loss if cache fails
- **Staleness tolerance** determines strategy: financial (low) → event-driven, catalog (high) → TTL

---

## 6. Materialized Views

**Problem:** Precompute derived data for fast reads  
**Why naive fails:** Full recompute is O(n) → too slow at scale, view unavailable during recompute

### Solutions

| Approach | Update Speed | Complexity | Staleness | Use When |
|----------|--------------|------------|-----------|----------|
| Full Recompute | O(n) - slow | Simple | 0 | Small datasets only |
| Incremental | O(1) - fast | Complex | 0 | Real-time, traditional system |
| Periodic Batch | O(n) per batch | Simple | Up to batch interval | Staleness OK, read-heavy |
| Stream Processing | O(1) - fast | Medium (infrastructure) | Milliseconds | Real-time, have stream infrastructure |
| Hybrid | O(1) incremental | Complex | 0 (with correction) | Real-time + correctness critical |

### Decision Framework
```
Need real-time freshness?
  → Have stream infrastructure? → Stream Processing
  → Traditional app/database? → Hybrid (Incremental + Periodic)
  → Need correctness guarantee? → Hybrid (safety net)

Staleness acceptable (hours/days)? → Periodic Batch Recompute
Simple queries, infrequent updates? → Full Recompute (if small enough)
```

### Key Reminders
- **Trade storage for compute**: Precompute expensive queries, but must update efficiently
- **Incremental**: Fast (O(1)) but complex - must handle all update cases, edge cases, failures
- **Periodic Batch**: Simple but stale - works when staleness acceptable
- **Stream Processing**: Framework handles state management - good if you have stream infrastructure
- **Hybrid**: Best of both - incremental speed + periodic recompute for correctness guarantee
- **Financial/correctness critical**: Use Hybrid - periodic recompute catches incremental errors

---

## 7. Sliding Window Metrics

**Problem:** Compute metrics (count, sum, avg, etc.) over the last N minutes of events  
**Why naive fails:** Store-every-event → memory = events in window → no infinite storage; high event rate blows up

### Solutions

| Approach | Memory | Accuracy | Use When |
|----------|--------|----------|----------|
| Fixed Window (buckets) | O(buckets) | Exact per bucket, discrete boundaries | Simple, boundaries OK, high event rate |
| Circular Buffer (slices) | O(slices) | Approximate (slice granularity) | Sliding + bounded memory; tune granularity vs memory |
| Store Events (queue + evict) | O(events in window) | Exact, true sliding | Low event rate, need exact + true sliding |
| Probabilistic (sketch + decay) | O(sketch_size) | Approximate | Very high event rate, approximate OK |

### Decision Framework
```
Discrete boundaries OK + high event rate? → Fixed Window
Sliding + bounded memory + approximate OK? → Circular Buffer (slices)
Low event rate + exact + true sliding? → Store Events (queue, incremental eviction)
Very high rate + approximate OK? → Probabilistic (sketch + time decay)
```

### Key Reminders
- **Fixed window**: More granularity = more buckets → limit is bucket count; use when event rate is high (e.g. 100k req/s → 60 buckets for 1 min, not 6M events)
- **Circular buffer**: Bounded slices; finer granularity = more slices = more memory
- **Store events**: True sliding + exact, but memory = event rate × window → fails at high rate
- **No infinite storage** → trade off: granularity vs memory (fixed/circular) or exact vs event rate (store events vs approximate)

---

## 8. Event Time vs Processing Time

**Problem:** Events arrive out of order; need to choose which time to trust for windows/ordering  
**Why naive fails:** Processing-time-only is fast but wrong for analytics/billing; event-time-only is correct but unbounded wait/memory

### Solutions

| Approach | Latency | Correctness | Use When |
|----------|---------|-------------|----------|
| Processing time | Low | Low (wrong for real time) | Real-time dashboards, approximate OK |
| Event time only | High (buffer) | High | Late events rare, latency less critical |
| Event time + watermarks | Medium (bounded) | High (on-time events) | Analytics, billing, compliance |
| Hybrid (event + proc fallback) | Low–Medium | Medium (mixed) | Missing/very late event times |
| Reprocessing (two views) | Low + High | High (corrected view) | Need both fast preview and correct report |

### Decision Framework
```
Correctness of "when it happened" doesn't matter? → Processing time
Correctness matters:
  → Bounded delay OK (e.g. 5–15 min)? → Event time + watermarks
  → Need fast + correct? → Reprocessing (real-time + corrected)
  → Messy/missing event times? → Hybrid
  → Late events rare? → Event time only
```

### Key Reminders
- **Processing time**: Fast, simple, wrong for analytics/billing
- **Watermarks**: "No events with event time < T will arrive" → close windows, handle late separately
- **Reprocessing**: Two pipelines — processing time (fresh) + event time (correct)

---

## 9. Dependency Resolution

**Problem:** Tasks depend on other tasks; determine execution order and what to recompute on change  
**Why naive fails:** Full recompute every time = O(all tasks) → too expensive at scale

### Solutions

| Approach | Change detection | Correctness | Use When |
|----------|------------------|-------------|----------|
| Full Recompute | N/A | Always correct | Small graphs, never (baseline) |
| Dirty Tracking | Mark + propagate | Only if marking correct | Explicit "this changed" (events, UI) |
| Make-like (timestamps) | Input newer than output? | Can miss or over-rebuild | File-based builds, simple env |
| Content Hash (Bazel-like) | Input hash ≠ stored hash | Accurate | Builds/pipelines, correctness + cache matter |

### Decision Framework
```
Small graph, few changes? → Full Recompute (or still avoid; use dirty/hash)
File-based, simple? → Make-like (accept timestamp quirks)
Need accuracy + cache? → Content Hash
Have explicit change events? → Dirty Tracking
```

### Key Reminders
- **Topological order**: Run only after dependencies — required for correct outputs
- **Parallel**: Tasks with no dependency between them can run in parallel (same "level" in topo order)
- **Dirty wrong** → stale outputs; full recompute is the fix after you discover it
- **Make**: Cheap (stat) but timestamps lie; content hash: accurate but hash + storage cost

---

## 10. Change Propagation

**Problem:** A value changes; many downstream values depend on it → propagate efficiently  
**Why naive fails:** Direct push to all dependents = O(dependents) per change, slow + tight coupling

### Solutions

| Approach | Propagation | Consistency | Use When |
|----------|-------------|-------------|----------|
| Direct Push | O(dependents) | Strong (sync) or eventual | Few dependents, need immediate |
| Event-Driven (Pub/Sub) | O(1) publish | Eventual | Many dependents, distributed, decoupling |
| Pull-Based (Lazy) | None | Strong on read | Expensive compute, infrequent reads |
| Incremental (Graph) | O(V+E) | Strong if sync | Complex DAG, minimize recompute |
| Batch | Per batch | Eventual | High change rate, latency OK |

### Decision Framework
```
Few dependents + immediate? → Direct Push
Many / distributed / decouple? → Event-Driven
Heavy compute, few reads? → Pull-based (lazy)
Complex DAG, minimal work? → Incremental
High change rate, latency OK? → Batch
```

### Key Reminders
- **Blast radius**: One change → how many updates? Minimize via event-driven or pull
- **Event-driven**: Decouples source from dependents; trade ordering + eventual consistency
- **Pull-based**: No propagation; pay on read; cache + invalidation brings back propagation concerns

---
