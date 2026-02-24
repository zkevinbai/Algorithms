# Algorithmic Thinking Cheat Sheet

Quick reference - updated as topics are covered.

**Decision Framework** in each section = quick decision flow for that topic (use branching flow when it helps).

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
Only care about recent window? → Sliding Window
Need top-K over full stream (so far)?
├─ Only need exact counts for top-K (no "query any item")? → Space-Saving
├─ Need to query arbitrary items (huge space)? → Count-Min Sketch
└─ Need both exact top-K and query-any? → Hybrid (Space-Saving + Count-Min)
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
Is event space bounded (small, known)?
├─ Yes → Hash Set
└─ No (unbounded) → Need to forget events (e.g. time window)?
                    ├─ Yes → Counting Bloom Filter
                    └─ No → Need exact (zero false positives)?
                             ├─ Yes → Hybrid (Bloom Filter + Redis/DB)
                             └─ No (false positives OK) → Bloom Filter
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
Distributed system? → Token Bucket + Redis
Otherwise (single-node / algorithm)?
├─ Simple + 2× bursts at boundary OK? → Fixed Window
├─ Exact + low request rate? → Sliding Window Log
├─ Approximate OK + bounded memory? → Sliding Window Counter
└─ Need smooth limiting (no boundary burst)?
    ├─ Allow bursts when tokens available? → Token Bucket
    └─ Smooth output rate (queue + drain)? → Leaky Bucket
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
Need corrections / late-arriving data? → Delta-Based
Simple aggregates (sum, count, avg, min, max)? → Incremental State
Complex metrics (percentiles, median)?
├─ Small dataset (< 1M)? → Materialized View (exact, full sorted data)
├─ Huge dataset (billions)? → Sketch-Based (approximate, bounded)
└─ Medium dataset? → Materialized View (sorted samples, approximate)
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
Read-heavy + staleness acceptable? → TTL
Need exact freshness + low write rate? → Write-Through
Write-heavy + need freshness?
├─ High write rate? → Event-Driven (or Hybrid for safety)
├─ Low write rate? → Write-Through
└─ Need resilience (handle lost events)? → Hybrid (TTL + Event)
High write rate + can accept async delay? → Write-Behind
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
Staleness acceptable (hours/days)? → Periodic Batch Recompute
Small dataset + simple queries + infrequent updates? → Full Recompute
Need real-time freshness?
├─ Have stream infrastructure? → Stream Processing
├─ Traditional app/database? → Hybrid (Incremental + Periodic)
└─ Correctness critical (financial etc.)? → Hybrid (incremental + periodic safety net)
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
Discrete window boundaries OK + high event rate? → Fixed Window (buckets)
Need true sliding + bounded memory?
├─ Approximate OK (slice granularity)? → Circular Buffer (slices)
└─ Exact needed + low event rate? → Store Events (queue + evict)
Very high event rate + approximate OK? → Probabilistic (sketch + time decay)
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
Correctness of "when it happened" doesn't matter (dashboards, approx)? → Processing time
Correctness matters (analytics, billing)?
├─ Bounded delay OK (e.g. 5–15 min)? → Event time + watermarks
├─ Need both fast preview and correct report? → Reprocessing (two views)
├─ Messy or missing event times? → Hybrid (event + proc fallback)
└─ Late events rare, latency less critical? → Event time only
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
What's the context?
├─ File-based builds, simple env? → Make-like (timestamps; accept quirks)
├─ Explicit "this changed" events (UI, triggers)? → Dirty Tracking
├─ Need accuracy + cache (builds, pipelines)? → Content Hash (Bazel-like)
└─ Small graph, few changes? → Full Recompute (baseline)
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
What's the constraint?
├─ Few dependents + immediate? → Direct Push
├─ Many / distributed / decouple? → Event-Driven (Pub/Sub)
├─ Heavy compute per update, infrequent reads? → Pull-based (lazy)
├─ Complex DAG, minimize recompute? → Incremental (graph)
└─ High change rate, latency OK? → Batch
```

### Key Reminders
- **Blast radius**: One change → how many updates? Minimize via event-driven or pull
- **Event-driven**: Decouples source from dependents; trade ordering + eventual consistency
- **Pull-based**: No propagation; pay on read; cache + invalidation brings back propagation concerns

---

## 11. Approximate Counting

**Problem:** Count item frequencies with bounded memory; item space large or unbounded  
**Why naive fails:** Hash map = one entry per unique item → unbounded memory → OOM

### Solutions

| Approach | Memory | Bias | Query Any? | Use When |
|----------|--------|------|------------|----------|
| Exact Hash Map | O(unique) | None | ✅ | Small/bounded item space only |
| Count-Min Sketch | Fixed (w×d) | Overestimates | ✅ | Unbounded space, "never underestimate" OK |
| Count Sketch | Fixed (w×d) | Unbiased | ✅ | Unbounded space, want unbiased estimate |
| HyperLogLog | O(log log n) | ~Unbiased | N/A (distinct only) | Distinct count only, not frequency |
| Space-Saving | O(K+ε) | None (tracked) | ❌ (top-K only) | Heavy hitters / top-K with exact counts |

### Decision Framework
```
Counting what?
├─ Distinct count only (how many unique)? → HyperLogLog
└─ Per-item frequency?
    ├─ Item space small/bounded? → Exact Hash Map
    ├─ Need exact for top-K / heavy hitters? → Space-Saving
    └─ Need to query any item later?
        ├─ Overestimate OK (e.g. safety)? → Count-Min Sketch
        └─ Unbiased estimate? → Count Sketch
```

### Key Reminders
- **CMS**: Min over rows → never underestimates; error grows with stream size (tune or window/reset)
- **Count Sketch**: Signed hashes + median → unbiased; can underestimate
- **Space-Saving**: Bounded (item, count) slots; evict min → exact counts for tracked items only
- **HyperLogLog**: Cardinality only — "how many distinct," not "how many times"

---

## 12. Ranking Under Uncertainty

**Problem:** Rank items when signals are noisy, incomplete, or changing over time  
**Why naive fails:** Simple score aggregation → unstable rankings, can't handle missing signals, small signal changes cause large rank swings

### Solutions

| Approach | Stability | Best For |
|----------|-----------|----------|
| Simple Aggregation | Low (noise-sensitive) | Low noise, simple case |
| Bayesian | High (prior smooths) | Noisy/sparse signals, need stability |
| Confidence-Weighted | High (conservative) | Interpretable, conservative ranking |
| Time-Decay | Medium (recent stable) | Drift, trending, "what's hot now" |
| Multi-Armed Bandit | Medium (exploration) | Learning from feedback, explore vs exploit |

### Decision Framework
```
What's the need?
├─ Simple case, low noise? → Simple aggregation
├─ Noisy/sparse signals, need stability? → Bayesian (prior + posterior)
├─ Conservative, interpretable? → Confidence-Weighted (e.g. lower bound)
├─ Signals drift / trending? → Time-Decay
└─ Learning from feedback (explore vs exploit)? → Multi-Armed Bandit
```

### Key Reminders
- **Bayesian**: Same prior for every item; prior dominates when data is sparse, data dominates when data is abundant
- **Confidence-Weighted**: Rank by conservative estimate (e.g. lower bound) so uncertain items don't shoot to top
- **Time-Decay**: Weight recent signals more; tune decay rate (too fast = jittery, too slow = stale)
- **Bandit**: Balance exploit (show best) vs explore (learn); requires user feedback

---

## 13. Batch vs Real-Time

**Problem:** Same data processing (aggregation, transformation, analysis) — choose batch or streaming (or both)  
**Why naive fails:** Only batch → high latency, stale data for use cases that need freshness; only real-time → unnecessary cost when results only needed periodically

### Solutions

| Approach | Latency | Cost | Complexity | Use When |
|----------|---------|------|------------|----------|
| Pure Batch | Hours–days | Low | Low | Periodic reports, ETL, exact + staleness OK |
| Pure Streaming | Seconds–minutes | High | High | Real-time dashboards, alerts, need freshness |
| Lambda | Batch: hours; Stream: sec | Very High | Very High | Need both correctness (batch) + real-time view |
| Kappa | Real-time: sec; Reprocess: hours | High | High | Single pipeline; reprocess history through same stream |
| Hybrid | Recent: sec; Historical: hours | Medium | Medium | Large history (batch) + fresh recent (stream); query combines |

### Decision Framework
```
Latency requirement?
├─ Hours/days OK + exact? → Pure Batch
├─ Seconds/minutes (real-time)? → Pure Streaming or Hybrid
└─ Need both real-time view and exact correctness?
    ├─ Two pipelines OK (batch = truth, stream = fresh)? → Lambda
    └─ Single pipeline, reprocess for exact? → Kappa
Large historical data + fresh recent? → Hybrid (batch historical + stream recent, query merge)
Start simple: Batch first; add streaming when latency requirement appears
```

### Key Reminders
- **Batch**: Simple, cheap, exact — but stale until run completes
- **Streaming**: Fresh, low latency — but complex, expensive, may be approximate
- **Lambda**: Two pipelines (batch + speed) + merge; double cost/complexity; batch corrects stream
- **Kappa**: One streaming pipeline; reprocess history through same pipeline for exact (no separate batch)
- **Lambda (architecture)** ≠ **Lambda (AWS/serverless functions)** — same name, different concepts

---

## 14. Hot Keys & Skew

**Problem:** One key (or few keys) gets disproportionate traffic → hot spot, load imbalance, single point of failure  
**Why naive fails:** Hash-to-shard or over-provision → one shard overloaded or wasted capacity + SPOF

### Decision Framework
```
Is the hot key mostly READS?
├─ Yes → Can you tolerate stale reads?
│         ├─ Yes → Local caching (simpler) or Replication (fresher)
│         └─ No  → Replication (tighter consistency)
└─ No (writes matter a lot) → Key splitting (or hybrid: cache + split)

Can you change how keys are designed? → Add randomness / composite keys to prevent future hot keys.
```

### Key Reminders
- **Key splitting**: One logical key → many virtual keys → load spread; adds routing + aggregation
- **Replication / caching**: Help read load only; writes still hit primary/hot shard
- **Write-heavy hot key**: Key splitting (or hybrid: cache reads + split writes)
- **Preventive**: Key design (e.g. user_id + shard_id, or time bucket) to avoid hot spots

---

## 15. Graceful Degradation

**Problem:** System can't keep up with load → what do we do?  
**Why naive fails:** Process everything or queue everything → system collapses (OOM, timeouts); queue lost when process dies

### Solutions

| Strategy | User impact | Data loss | Memory | Cascading risk | Use when |
|----------|-------------|-----------|--------|----------------|----------|
| Reject requests | Errors | High | Low | Low | Simple fail-fast; last resort |
| Queue + backpressure | High latency | Low (done later) | High (queue) | High if long queue | Short bursts; bounded delay OK |
| Load shedding | Some errors (low-pri) | Medium (low-pri dropped) | Normal | Low | Clear priorities; protect critical |
| Approximate processing | Degraded quality | Low (served, less accurate) | Normal | Low | Throughput > exactness |
| Rate limiting | Some errors (over limit) | High (rejected) | Normal | Low | Prevent overload; fair cap |

### Decision Framework
```
Can you prevent overload before it happens?
├─ Yes → RATE LIMITING (cap incoming load)
└─ No → Do you have clear priorities (critical vs best-effort)?
         ├─ Yes → LOAD SHEDDING (drop low-priority; protect critical)
         └─ No → Can you absorb short bursts with a bounded queue?
                  ├─ Yes → QUEUE + BACKPRESSURE (bounded queue; reject when full)
                  └─ No → Can you serve with lower quality instead of rejecting?
                           ├─ Yes → APPROXIMATE PROCESSING (sampling, cache, sketches)
                           └─ No → REJECT REQUESTS (fail fast; 503/429)
```

**One-line:** Prevent → Rate limiting | Prioritize → Load shedding | Smooth bursts → Queue + backpressure | Trade quality → Approximate | Simple/last resort → Reject

### Key Reminders
- **Reject**: Stops collapse, no unbounded queue; user sees errors
- **Queue + backpressure**: Bounded queue only; when full, reject (backpressure)
- **Load shedding**: Priority queue or drop low-pri so critical requests succeed
- **Approximate**: Keep serving with lower accuracy when exact would overload
- **Rate limiting**: Tiered limits (e.g. reserved capacity for critical) when you have priorities
- **Combine**: Rate limit at edge → bounded queue → load shed when full → reject as last resort

---

## 16. Partial Failure

**Problem:** Some components fail, others don't; system must keep operating.  
**Why naive fails:** "Nothing fails" is false; "stop on any failure" → system down whenever any component fails

### Solutions

| Approach | Availability | Consistency | Use When |
|----------|-------------|-------------|----------|
| Fail-Stop | Low (stops on any failure) | Strong (all-or-nothing) | Critical tx; accept downtime |
| Best-Effort | High (continues with failures) | Eventual or weak | Max availability, inconsistency OK |
| Quorum-Based | Medium (majority healthy) | Strong (majority consensus) | Strong consistency + fault tolerance |
| Retry + Backoff | High (eventually succeeds) | Eventual (when recovers) | Transient failures (blips, restarts) |
| Circuit Breaker | High (fails fast, recovers) | Eventual (when closed) | Avoid hammering broken dependency |

### Decision Framework
```
Need strong consistency (all-or-nothing)?
├─ Yes → Can you afford downtime on any failure?
│         ├─ Yes → Fail-Stop
│         └─ No  → Quorum-Based (available if majority healthy)
└─ No (tolerate inconsistency) →
      Failure likely transient? → Retry + exponential backoff
      Avoid hammering broken dependency? → Circuit Breaker
      Just keep serving with what works? → Best-Effort
```

**One-line:** Strong + accept downtime → Fail-Stop | Strong + stay up → Quorum | Transient → Retry+backoff | Don't hammer failed dep → Circuit Breaker | Max availability → Best-Effort

### Key Reminders
- **Fail-Stop**: Simple, consistent; system down on any failure
- **Quorum-Based**: Majority must agree; handles minority failures, split-brain risk on partition
- **Circuit Breaker**: Open = stop sending; half-open = test; close = resume (fails fast, auto-recovers)
- **Retry + backoff**: For transient failures; add jitter to avoid thundering herd
- **Hybrid**: Circuit breaker + retry + quorum for critical ops (common in practice)

---
