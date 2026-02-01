# Problem 8: Event Time vs Processing Time

## Prompt

Events arrive out of order. What do you trust?

---

## Key Concepts

- Correctness vs freshness
- Reprocessing
- Watermarks

## Variations

- Late data handling
- Exactly-once processing
- At-least-once processing

---

## Practice: 30-Minute Drill

### 1. Problem Framing (5 min)

**Restate the problem:**
- Events have two timestamps: event time (when event occurred) and processing time (when system processed it)
- Events may arrive out of order (network delays, retries, distributed systems)
- We need to decide which time to use for processing, ordering, and windowing
- Different choices lead to different tradeoffs between correctness and freshness

**Clarify constraints:**
- What is the use case? (Analytics? Real-time dashboards? Billing?)
- What is acceptable latency? (Real-time? Near real-time? Batch?)
- What is acceptable correctness? (Exact? Approximate? Eventually consistent?)
- How out-of-order can events be? (Seconds? Minutes? Hours?)
- Do we need to handle late events? (Yes? No? Best effort?)

**Bounded vs Unbounded:**
- **Unbounded**: Stream continues indefinitely
- **Online**: Must process events as they arrive, cannot wait for all events

**Key Questions:**
- Use event time (correct but may delay results)?
- Use processing time (fast but may be incorrect)?
- How do we handle late-arriving events?
- What is the acceptable staleness vs correctness tradeoff?

---

### 2. Candidate Approaches (10 min)

#### Approach 1: Processing Time Only

**Description:**
- Ignore event time, use processing time for all operations
- Process events in arrival order
- Window based on when events are processed, not when they occurred

**Pros:**
- **Simple**: No need to handle out-of-order events
- **Fast**: No buffering, process immediately
- **Low latency**: Results available as soon as events arrive

**Cons:**
- **Incorrect**: Results don't reflect when events actually occurred
- **Non-deterministic**: Results depend on processing order, not event order
- **Reprocessing issues**: Reprocessing same events gives different results
- **Not suitable for analytics**: Wrong for time-based analysis

#### Approach 2: Event Time Only

**Description:**
- Use event time for all operations
- Buffer events, sort by event time, process in order
- Window based on event time

**Pros:**
- **Correct**: Results reflect when events actually occurred
- **Deterministic**: Same events always give same results
- **Suitable for analytics**: Correct time-based analysis

**Cons:**
- **Latency**: Must buffer and wait for out-of-order events
- **Memory**: Buffering requires memory
- **Complexity**: Must handle late-arriving events
- **Staleness**: Results delayed until we're confident all events arrived

#### Approach 3: Event Time with Watermarks

**Description:**
- Use event time for processing
- Define watermarks: "we're confident no events with event time < watermark will arrive"
- Process events with event time < watermark
- Handle late events (event time < watermark) separately

**Pros:**
- **Correct**: Uses event time for correctness
- **Bounded latency**: Watermarks provide progress guarantee
- **Handles late events**: Can process late events separately (corrections)

**Cons:**
- **Complexity**: Watermark logic is complex
- **Tuning**: Watermark delay must be tuned (too early = miss events, too late = high latency)
- **Late events**: Must handle late events (corrections, separate stream)

#### Approach 4: Hybrid: Event Time with Processing Time Fallback

**Description:**
- Prefer event time when available and reasonable
- Fall back to processing time for very late events or missing event time
- Use heuristics to detect and handle out-of-order events

**Pros:**
- **Balanced**: Correct when possible, fast when needed
- **Flexible**: Adapts to data characteristics

**Cons:**
- **Complexity**: Two time systems to manage
- **Inconsistency**: Mix of event time and processing time in results
- **Heuristics**: May make wrong decisions about which time to use

#### Approach 5: Reprocessing with Event Time

**Description:**
- Process events in processing time for real-time results (low latency)
- Periodically reprocess with event time for correct results (high correctness)
- Maintain both real-time (processing time) and corrected (event time) views

**Pros:**
- **Best of both**: Real-time freshness + eventual correctness
- **Flexible**: Users can choose which view to use

**Cons:**
- **Complexity**: Two processing pipelines
- **Storage**: Must store both views
- **Consistency**: Two views may be inconsistent
- **Cost**: Double the processing

---

### 3. Tradeoffs & Scaling (10 min)

#### Latency

| Approach | Latency | Freshness |
|----------|---------|-----------|
| Processing Time | Low (immediate) | High (real-time) |
| Event Time | High (must buffer) | Low (delayed) |
| Watermarks | Medium (watermark delay) | Medium (bounded delay) |
| Hybrid | Low to Medium | Medium to High |
| Reprocessing | Low (real-time) + High (corrected) | High (both views) |

#### Correctness

| Approach | Correctness | Deterministic |
|----------|-------------|---------------|
| Processing Time | Low (incorrect) | No (depends on processing order) |
| Event Time | High (correct) | Yes (same events = same results) |
| Watermarks | High (correct for on-time events) | Yes (for on-time events) |
| Hybrid | Medium (varies) | No (mixed) |
| Reprocessing | High (corrected view) | Yes (corrected view) |

#### Memory & Complexity

| Approach | Memory | Complexity |
|----------|--------|------------|
| Processing Time | Low (no buffering) | Low |
| Event Time | High (must buffer all) | Medium |
| Watermarks | Medium (buffer until watermark) | High |
| Hybrid | Medium | High |
| Reprocessing | High (two views) | Very High |

#### What Breaks at 10× / 100×?

**10× more out-of-order events:**
- Processing Time: Still works, but results more incorrect
- Event Time: **Memory grows 10×** (must buffer more events)
- Watermarks: Must increase watermark delay (higher latency)
- Hybrid: More events fall back to processing time (less correct)
- Reprocessing: More corrections needed (higher cost)

**10× higher event rate:**
- Processing Time: Still works (no buffering)
- Event Time: **Memory grows 10×** (more events to buffer)
- Watermarks: Buffer grows, but bounded by watermark delay
- All: May need to process faster or increase parallelism

**10× longer out-of-order window:**
- Processing Time: Still works, but results even more incorrect
- Event Time: **Memory grows 10×** (must buffer 10× longer)
- Watermarks: Must increase watermark delay 10× (10× higher latency)
- Hybrid: More events use processing time (less correct)
- Reprocessing: Larger correction window (more reprocessing needed)

**Distributed systems:**
- **Problem**: Events from different sources arrive at different times
- **Solution**: Use watermarks across all sources (global watermark = min of all source watermarks)
- **Challenge**: One slow source delays entire pipeline (straggler problem)

---

### 4. Failure & Evolution (5 min)

#### How Does This Fail?

**Processing Time:**
- **Incorrect results**: Doesn't reflect when events actually occurred
- **Non-deterministic**: Reprocessing gives different results
- **Analytics wrong**: Time-based analysis is incorrect
- **Not suitable for billing/auditing**: Wrong timestamps

**Event Time:**
- **High latency**: Must wait for all events to arrive
- **Memory**: Unbounded buffering (if events can be very late)
- **Staleness**: Results delayed until confident all events arrived
- **Complexity**: Must handle late events, ordering, buffering

**Watermarks:**
- **Tuning**: Watermark delay must be tuned (too early = miss events, too late = high latency)
- **Stragglers**: One slow source delays entire pipeline
- **Late events**: Must handle late events separately (corrections)
- **Complexity**: Watermark logic is complex, error-prone

**Hybrid:**
- **Inconsistency**: Mix of event time and processing time in results
- **Complexity**: Two time systems to manage
- **Heuristics**: May make wrong decisions
- **Hard to reason about**: Unclear which time was used when

**Reprocessing:**
- **Cost**: Double the processing (real-time + corrected)
- **Storage**: Must store both views
- **Complexity**: Two pipelines to maintain
- **Consistency**: Two views may be inconsistent (confusing for users)

#### How Would You Evolve It?

**Adaptive watermarks:**
- Monitor event lateness distribution
- Dynamically adjust watermark delay based on observed lateness
- Balance latency vs completeness

**Speculative execution:**
- Process events optimistically (assume no late events)
- Maintain correction stream for late events
- Combine: Fast results + corrections

**Time-bounded correctness:**
- Use event time for recent events (e.g., last hour)
- Use processing time for older events (acceptable staleness)
- Balance: Correct for recent, fast for old

**Multi-level watermarks:**
- Maintain multiple watermarks (pessimistic, optimistic)
- Process events up to optimistic watermark (low latency)
- Reprocess up to pessimistic watermark (correctness)
- Balance latency vs correctness

**Event sourcing with snapshots:**
- Store all events with event time
- Process in processing time for real-time (snapshots)
- Reprocess from events for correctness (rebuild from events)
- Best of both: Fast snapshots + correct rebuilds

---

## Knowledge Deep Dive

### Watermarks

**Definition**: A watermark is a timestamp that indicates "we're confident no events with event time < watermark will arrive."

**Types:**
- **Punctuated**: Based on data (e.g., "end of day" marker)
- **Periodic**: Based on processing time (e.g., "current processing time - 5 minutes")

**Calculation:**
- **Per-source watermark**: Min event time seen from source - max observed lateness
- **Global watermark**: Min of all per-source watermarks
- **Challenge**: One slow source delays global watermark (straggler)

### Late Events

**Definition**: Events with event time < current watermark (should have arrived earlier).

**Handling strategies:**
1. **Drop**: Ignore late events (acceptable if rare)
2. **Side output**: Send to separate stream for corrections
3. **Buffer**: Keep buffer for late events, process separately
4. **Allow**: Allow late events in current window (if within tolerance)

### Exactly-Once vs At-Least-Once

**At-Least-Once:**
- Events may be processed multiple times (retries, failures)
- Simpler, but may cause duplicates
- Use idempotent operations

**Exactly-Once:**
- Events processed exactly once
- More complex (requires deduplication, transactions)
- Needed for correctness (billing, counting)

**Event time helps**: With event time, reprocessing gives same results (deterministic), making exactly-once easier.

### When to Use What

- **Real-time dashboards, approximate OK**: Processing time
- **Analytics, billing, auditing**: Event time with watermarks
- **Balanced requirements**: Hybrid or reprocessing
- **Very late events possible**: Event time with large watermark delay or reprocessing
- **Low latency critical**: Processing time or speculative execution
- **Correctness critical**: Event time with watermarks

---

## Listen For Yourself Saying

✅ "Processing time is fast but incorrect - event time is correct but slow"
✅ "Watermarks let us balance correctness and latency"
✅ "Late-arriving events require us to handle corrections or use larger watermarks"
✅ "We need to choose based on use case - real-time dashboards vs analytics"
