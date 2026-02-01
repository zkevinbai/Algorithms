# Algorithmic Thinking Cheat Sheet

Quick reference - updated as topics are covered.

---

## Top-K in a Stream

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

## Deduplication at Scale

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
