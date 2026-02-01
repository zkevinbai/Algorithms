# Algorithms & Systems Thinking — 2-Week Drill Manual

https://chatgpt.com/g/g-p-692a9455613081918f41388330d826a4/c/697ed87d-2e7c-832d-b986-1bb32ddf6ea9

## Goal

Become calm, structured, and decisive in **live, discussion-based algorithms interviews**.

Specifically:
- Demonstrate strong **algorithmic judgment**
- Reason clearly about **constraints, state, time, and tradeoffs**
- Communicate decisions the way a senior systems engineer would
- Avoid trivia, LeetCode reflexes, or over-design

Success is **not** finding the "right" algorithm.
Success is making good decisions under ambiguity and defending them clearly.

> **For AI Assistants:** See [AGENTS.md](./AGENTS.md) for instructions on how to teach using this curriculum.

---

## What This Is (and Is Not)

**This is:**
- A practical training guide
- A set of mental primitives + drills
- A finite curriculum for ~2 weeks of prep

**This is NOT:**
- A list of algorithms to memorize
- A coding exercise book
- A system design interview guide

---

## Core Methodology

Every drill uses the same structure. This is intentional.

### The 30-Minute Algorithm Drill Loop

For any problem:

1. **Problem Framing (5 min)**
   - Restate the problem
   - Clarify constraints
   - Ask: bounded vs unbounded? online vs offline?

2. **Candidate Approaches (10 min)**
   - Propose 1–3 viable approaches
   - Do NOT optimize yet

3. **Tradeoffs & Scaling (10 min)**
   - Time complexity
   - Space complexity
   - What breaks at 10× / 100×?

4. **Failure & Evolution (5 min)**
   - How does this fail?
   - How would you evolve it?

> If you can do this calmly, you pass.

---

## The Mental Spine (Read This Often)

Every strong algorithms systems thinker reasons across these axes:

1. **Constraints First**
2. **Exact vs Approximate**
3. **State Management**
4. **Time as a Variable**
5. **Dependency Graphs**
6. **Tradeoffs as Output**
7. **Failure as a Feature**

Every example below maps to *multiple* of these. That’s the point.

---

## DRILL SET

The goal is **breadth + repetition**, not mastery of each.

You can realistically drill:
- ~10–12 problems deeply
- ~6–8 problems lightly

Over 2 weeks, that’s perfect.

---

## SECTION 1: Streaming & Online Algorithms (High Yield)

### 1. Top-K in a Stream
**Prompt:**  
You receive an unbounded stream of events. At any moment, return the top K most frequent items.

**Key Concepts:**
- Unbounded data
- State size
- Approximation

**Variations:**
- Sliding window
- Memory limits
- Distributed shards

**Listen For Yourself Saying:**
- “Exact requires unbounded memory…”
- “Approximation is acceptable if…”

---

### 2. Deduplication at Scale
**Prompt:**  
Ensure each unique event is processed once in a high-throughput system.

**Key Concepts:**
- Idempotency
- Memory vs correctness
- False positives

**Variations:**
- Time-bounded dedupe
- Distributed dedupe
- Eventual consistency

---

### 3. Rate Limiting
**Prompt:**  
Design an algorithm to limit requests per user.

**Key Concepts:**
- Sliding vs fixed windows
- Bursts
- Distributed enforcement

**Variations:**
- Per-IP vs per-user
- Global vs local limits

---

## SECTION 2: State & Incremental Computation

### 4. Incremental Aggregation
**Prompt:**  
You compute metrics over a dataset that updates continuously.

**Key Concepts:**
- What state must be stored?
- Recompute vs update
- Rollbacks

**Variations:**
- Late-arriving data
- Deletes
- Corrections

---

### 5. Cache Invalidation
**Prompt:**  
Cache expensive query results while keeping correctness acceptable.

**Key Concepts:**
- TTL vs event-driven invalidation
- Staleness tolerance
- Invalidation fanout

**Variations:**
- Partial invalidation
- Multi-layer caches

---

### 6. Materialized Views
**Prompt:**  
Precompute derived data for fast reads.

**Key Concepts:**
- Storage vs compute
- Update cost
- Consistency

---

## SECTION 3: Time & Windows

### 7. Sliding Window Metrics
**Prompt:**  
Compute metrics over the last N minutes of events.

**Key Concepts:**
- Windowing
- Eviction
- Ordering

**Variations:**
- Fixed vs sliding
- Late data handling

---

### 8. Event Time vs Processing Time
**Prompt:**  
Events arrive out of order. What do you trust?

**Key Concepts:**
- Correctness vs freshness
- Reprocessing
- Watermarks

---

## SECTION 4: Graphs & Dependencies

### 9. Dependency Resolution
**Prompt:**  
Tasks depend on other tasks. Determine execution order and recomputation on change.

**Key Concepts:**
- DAGs
- Cycle detection
- Partial recomputation

**Variations:**
- Incremental updates
- Failure isolation

---

### 10. Change Propagation
**Prompt:**  
A value changes; many downstream values depend on it.

**Key Concepts:**
- Blast radius
- Caching
- Ordering guarantees

---

## SECTION 5: Exact vs Approximate (Conceptual Core)

### 11. Approximate Counting
**Prompt:**  
Count high-frequency items under memory constraints.

**Key Concepts:**
- Error bounds
- Bias
- User impact

---

### 12. Ranking Under Uncertainty
**Prompt:**  
Rank items when signals are noisy or incomplete.

**Key Concepts:**
- Stability
- Drift
- Feedback loops

---

## SECTION 6: Tradeoff-Driven Questions (Senior Signal)

### 13. Batch vs Real-Time
**Prompt:**  
Same problem, batch or streaming?

**Key Concepts:**
- Cost
- Complexity
- Latency requirements

---

### 14. Hot Keys & Skew
**Prompt:**  
One key dominates traffic.

**Key Concepts:**
- Detection
- Mitigation
- Load balancing

---

## SECTION 7: Failure & Degradation (Very High Signal)

### 15. Graceful Degradation
**Prompt:**  
The system can’t keep up. What happens?

**Key Concepts:**
- Backpressure
- Dropping data
- Approximation

---

### 16. Partial Failure
**Prompt:**  
Some components fail, others don’t.

**Key Concepts:**
- Isolation
- Consistency tradeoffs
- Retry semantics

---

## Suggested 2-Week Usage Plan (Loose)

You do NOT need to do all of these.

**Minimum viable prep:**
- Deep drill: 8–10 problems
- Light drill: 6–8 problems

**High-priority set:**
1. Top-K stream
2. Deduplication
3. Rate limiting
4. Incremental aggregation
5. Sliding windows
6. Dependency resolution
7. Batch vs real-time
8. Graceful degradation

Everything else is bonus.

---

## Readiness Checklist

You are ready when you can:
- Restate problems clearly
- Ask constraint questions naturally
- Compare approaches calmly
- Say how your solution fails
- Adjust when challenged

If you do that, the interview becomes a conversation — not a test.

---

## Final Note

This document is meant to **shrink the problem space**.

You are not learning algorithms.
You are learning how to *think visibly* about systems.

That’s the skill they’re actually hiring for.
