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
