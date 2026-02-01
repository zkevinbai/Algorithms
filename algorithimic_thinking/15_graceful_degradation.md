# Problem 15: Graceful Degradation

## Prompt

The system can't keep up. What happens?

---

## Key Concepts

- Backpressure
- Dropping data
- Approximation

## Variations

- Rate limiting
- Circuit breakers
- Load shedding

---

## Practice: 30-Minute Drill

### 1. Problem Framing (5 min)

**Restate the problem:**
- System is overloaded (cannot process all requests/data)
- We need to decide what to do when system cannot keep up
- Options: reject requests, drop data, degrade quality, slow down
- Goal: Keep system running (degraded) rather than failing completely

**Clarify constraints:**
- What is the system? (API? Data pipeline? Cache?)
- What causes overload? (Too many requests? Too much data? Slow processing?)
- What is acceptable degradation? (Reject some requests? Approximate results? Delay?)
- What must be preserved? (Critical requests? Data integrity? User experience?)

**Bounded vs Unbounded:**
- **Unbounded**: Request/data rate may be unbounded
- **Online**: Must handle overload as it occurs, cannot prevent it

**Key Questions:**
- What happens when overloaded?
- How do we prioritize? (Critical vs non-critical?)
- How do we detect overload?
- What is the degradation strategy?

---

### 2. Candidate Approaches (10 min)

#### Approach 1: Reject Requests (Fail Fast)

**Description:**
- When overloaded, reject new requests immediately
- Return error (503 Service Unavailable, 429 Too Many Requests)
- Don't queue requests (avoid cascading failures)

**Pros:**
- **Simple**: Easy to implement
- **Fast**: Immediate rejection (no wasted resources)
- **Prevents cascading**: Doesn't queue requests (avoids memory exhaustion)

**Cons:**
- **User impact**: Users see errors
- **Lost work**: Rejected requests are lost
- **Not graceful**: Abrupt failure (not degradation)

#### Approach 2: Queue with Backpressure

**Description:**
- Queue requests when overloaded
- When queue full, reject new requests (backpressure)
- Process queue as capacity allows

**Pros:**
- **Smooth**: Handles bursts (queues temporarily)
- **Preserves work**: Queued requests are processed (eventually)

**Cons:**
- **Memory**: Queue consumes memory (may exhaust memory)
- **Latency**: Queued requests have high latency
- **Cascading failures**: Long queues may cause timeouts downstream

#### Approach 3: Load Shedding (Drop Low Priority)

**Description:**
- Classify requests by priority
- When overloaded, drop low-priority requests
- Process high-priority requests normally

**Pros:**
- **Preserves critical**: Critical requests still processed
- **Graceful**: Degrades gracefully (not all-or-nothing)

**Cons:**
- **Priority classification**: Must classify requests (complexity)
- **Lost work**: Dropped requests are lost
- **Fairness**: May be unfair (some users always low priority)

#### Approach 4: Approximate Processing

**Description:**
- When overloaded, switch to approximate/faster processing
- Trade accuracy for throughput
- Examples: sampling, sketches, cached results

**Pros:**
- **Preserves throughput**: Still processes requests (approximately)
- **Graceful**: Degrades quality, not availability

**Cons:**
- **Accuracy loss**: Results may be inaccurate
- **Complexity**: Must implement approximate processing
- **User impact**: Users may notice quality degradation

#### Approach 5: Rate Limiting / Throttling

**Description:**
- Limit request rate (per user, per IP, global)
- Reject requests exceeding limit
- Process requests within limit normally

**Pros:**
- **Prevents overload**: Limits load before overload
- **Fair**: Distributes capacity fairly
- **Predictable**: Known limits

**Cons:**
- **Rejection**: Still rejects requests (user impact)
- **Tuning**: Must tune limits (too low = underutilized, too high = overloaded)

---

### 3. Tradeoffs & Scaling (10 min)

#### User Impact

| Approach | User Experience | Data Loss |
|----------|----------------|-----------|
| Reject Requests | Errors (poor) | High (rejected requests) |
| Queue with Backpressure | High latency (poor) | Low (queued, processed) |
| Load Shedding | Some errors (medium) | Medium (low priority dropped) |
| Approximate Processing | Degraded quality (medium) | Low (processed approximately) |
| Rate Limiting | Some errors (medium) | High (rejected requests) |

#### System Health

| Approach | Memory Usage | CPU Usage | Cascading Failures |
|----------|--------------|-----------|-------------------|
| Reject Requests | Low | Low | Low (fails fast) |
| Queue with Backpressure | High (queue) | Normal | High (long queues) |
| Load Shedding | Normal | Normal | Low (critical preserved) |
| Approximate Processing | Normal | Lower (faster) | Low |
| Rate Limiting | Normal | Normal | Low (load limited) |

#### Complexity

| Approach | Implementation | Operations |
|----------|----------------|------------|
| Reject Requests | Low | Low |
| Queue with Backpressure | Medium | Medium (queue management) |
| Load Shedding | High | Medium (priority classification) |
| Approximate Processing | High | Medium (approximate logic) |
| Rate Limiting | Medium | Medium (limit management) |

#### What Breaks at 10× / 100×?

**10× more requests:**
- Reject Requests: **10× more rejections** (poor user experience)
- Queue with Backpressure: **Queue grows 10×** (memory exhaustion)
- Load Shedding: More low-priority requests dropped
- Approximate Processing: Still works (processes approximately)
- Rate Limiting: More requests rejected (but predictable)

**10× slower processing:**
- Reject Requests: More rejections (system slower)
- Queue with Backpressure: **Queue grows 10×** (cannot drain)
- Load Shedding: More requests dropped
- Approximate Processing: Switch to even more approximate (lower quality)
- Rate Limiting: Lower limits needed (more rejections)

**10× longer overload:**
- Reject Requests: Extended errors (poor experience)
- Queue with Backpressure: **Fails** - queue grows unbounded
- Load Shedding: Extended degradation
- Approximate Processing: Extended quality degradation
- Rate Limiting: Extended rejections

---

### 4. Failure & Evolution (5 min)

#### How Does This Fail?

**Reject Requests:**
- **Poor user experience**: Users see errors
- **Lost work**: Rejected requests are lost
- **Not graceful**: Abrupt failure (not degradation)

**Queue with Backpressure:**
- **Memory exhaustion**: Queue grows unbounded
- **High latency**: Queued requests have very high latency
- **Cascading failures**: Long queues cause timeouts downstream
- **Not scalable**: Fails for sustained overload

**Load Shedding:**
- **Priority classification**: Hard to classify requests accurately
- **Fairness**: May be unfair (some users always low priority)
- **Lost work**: Dropped requests are lost

**Approximate Processing:**
- **Accuracy loss**: Results may be too inaccurate
- **Complexity**: Must implement approximate processing
- **User impact**: Users may notice quality degradation

**Rate Limiting:**
- **Rejection**: Still rejects requests (user impact)
- **Tuning**: Hard to tune limits (too low = underutilized, too high = overloaded)
- **Fairness**: May be unfair (first-come-first-served)

#### How Would You Evolve It?

**Multi-tier degradation:**
- Tier 1: Normal processing
- Tier 2: Approximate processing (when slightly overloaded)
- Tier 3: Load shedding (when moderately overloaded)
- Tier 4: Reject requests (when severely overloaded)

**Adaptive strategies:**
- Monitor system load
- Automatically switch strategies based on load
- Start with approximation, escalate to rejection if needed

**Circuit breakers:**
- Open circuit when overloaded (reject requests)
- Close circuit when load decreases (accept requests)
- Prevents cascading failures

**Quality of Service (QoS):**
- Guarantee capacity for high-priority requests
- Use remaining capacity for low-priority requests
- Degrade low-priority when overloaded

**Proactive scaling:**
- Monitor load, scale up before overload
- Auto-scaling based on metrics
- Prevent overload rather than handle it

---

## Knowledge Deep Dive

### Backpressure

**Definition**: Mechanism to slow down producers when consumers cannot keep up.

**How it works:**
- Consumer signals when it cannot process more
- Producer slows down or stops producing
- Prevents queue growth and memory exhaustion

**Implementation:**
- **Pull-based**: Consumer pulls when ready (natural backpressure)
- **Push-based**: Consumer signals "not ready" (explicit backpressure)
- **Queue limits**: Queue full = backpressure signal

### Circuit Breakers

**States:**
- **Closed**: Normal operation (requests processed)
- **Open**: Overloaded (requests rejected immediately)
- **Half-open**: Testing (allow some requests, close if successful)

**Benefits:**
- Fails fast (no wasted resources)
- Prevents cascading failures
- Auto-recovers when load decreases

### Load Shedding Strategies

**Priority-based:**
- Classify requests by priority
- Drop low-priority when overloaded

**Random:**
- Randomly drop requests (fair but not optimal)

**User-based:**
- Drop requests from certain users (free tier, etc.)

**Feature-based:**
- Drop non-critical features (keep core features)

### When to Use What

- **Simple, need to fail fast**: Reject requests
- **Bursty load, can queue**: Queue with backpressure
- **Have priorities**: Load shedding
- **Can approximate**: Approximate processing
- **Preventive**: Rate limiting
- **Complex requirements**: Multi-tier degradation

---

## Listen For Yourself Saying

✅ "When overloaded, we need to degrade gracefully - reject, approximate, or prioritize"
✅ "Backpressure prevents queue growth and memory exhaustion"
✅ "Load shedding preserves critical requests while dropping low-priority ones"
✅ "We need to balance user experience with system health"
