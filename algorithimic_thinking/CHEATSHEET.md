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

*Add new topics below as you learn them*
