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
