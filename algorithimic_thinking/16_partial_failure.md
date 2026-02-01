# Problem 16: Partial Failure

## Prompt

Some components fail, others don't.

---

## Key Concepts

- Isolation
- Consistency tradeoffs
- Retry semantics

## Variations

- Network partitions
- Node failures
- Service degradation

---

## Practice: 30-Minute Drill

### 1. Problem Framing (5 min)

**Restate the problem:**
- In distributed systems, some components may fail while others continue working
- Failures may be partial (some nodes fail, some succeed)
- We need to handle partial failures gracefully
- System must continue operating despite partial failures

**Clarify constraints:**
- What is the system? (Distributed database? Microservices? Cache cluster?)
- What types of failures? (Node failures? Network partitions? Service degradation?)
- What is the failure model? (Fail-stop? Byzantine? Crash-recovery?)
- What is the consistency requirement? (Strong? Eventual? Best-effort?)

**Bounded vs Unbounded:**
- **Bounded**: Number of components is typically bounded
- **Online**: Must handle failures as they occur, cannot prevent them

**Key Questions:**
- How do we detect failures?
- How do we isolate failures?
- How do we maintain consistency during failures?
- How do we recover from failures?

---

### 2. Candidate Approaches (10 min)

#### Approach 1: Fail-Stop (Stop on Any Failure)

**Description:**
- If any component fails, stop entire system
- Wait for all components to be healthy before resuming
- Strong consistency (all-or-nothing)

**Pros:**
- **Simple**: Easy to reason about
- **Consistent**: No partial state (strong consistency)
- **Correct**: No risk of inconsistent data

**Cons:**
- **Availability**: System unavailable during any failure
- **Not fault-tolerant**: Single point of failure
- **Poor user experience**: Users see errors during failures

#### Approach 2: Best-Effort (Continue Despite Failures)

**Description:**
- Continue operating with available components
- Ignore failed components
- Accept eventual consistency or data loss

**Pros:**
- **High availability**: System continues operating
- **Fault-tolerant**: Handles partial failures
- **Better user experience**: Users see degraded service, not errors

**Cons:**
- **Consistency**: May have inconsistent data
- **Data loss**: May lose data from failed components
- **Complexity**: Must handle inconsistent state

#### Approach 3: Quorum-Based (Majority Consensus)

**Description:**
- Require majority of components to agree
- Operations succeed if majority succeed
- Failed minority is ignored

**Pros:**
- **Fault-tolerant**: Handles minority failures
- **Consistent**: Majority ensures consistency
- **Available**: System available if majority healthy

**Cons:**
- **Latency**: Must wait for majority (adds latency)
- **Not available if majority fails**: System unavailable if >50% fail
- **Split-brain risk**: Network partition may create two majorities

#### Approach 4: Retry with Exponential Backoff

**Description:**
- Retry failed operations with exponential backoff
- Eventually succeed when component recovers
- Give up after max retries

**Pros:**
- **Resilient**: Handles transient failures
- **Simple**: Standard retry pattern
- **Self-healing**: Automatically recovers when component recovers

**Cons:**
- **Latency**: Retries add latency
- **Resource usage**: Retries consume resources
- **Not suitable for permanent failures**: Wastes resources if component permanently failed

#### Approach 5: Circuit Breaker Pattern

**Description:**
- Open circuit when component fails (stop sending requests)
- Close circuit when component recovers (resume requests)
- Half-open state to test recovery

**Pros:**
- **Fails fast**: Doesn't waste resources on failed components
- **Auto-recovers**: Automatically resumes when component recovers
- **Prevents cascading**: Stops sending requests to failed components

**Cons:**
- **Temporary unavailability**: Component unavailable during circuit open
- **Tuning**: Must tune thresholds (when to open/close)
- **Complexity**: More complex than simple retry

---

### 3. Tradeoffs & Scaling (10 min)

#### Availability

| Approach | Availability | Consistency |
|----------|-------------|-------------|
| Fail-Stop | Low (stops on any failure) | Strong (all-or-nothing) |
| Best-Effort | High (continues with failures) | Eventual or weak |
| Quorum-Based | Medium (available if majority healthy) | Strong (majority consensus) |
| Retry with Backoff | High (eventually succeeds) | Eventual (when recovers) |
| Circuit Breaker | High (fails fast, recovers) | Eventual (when circuit closed) |

#### Complexity

| Approach | Implementation | Operations |
|----------|----------------|------------|
| Fail-Stop | Low | Low |
| Best-Effort | Medium | Medium (handle inconsistency) |
| Quorum-Based | High | High (consensus protocol) |
| Retry with Backoff | Low | Low |
| Circuit Breaker | Medium | Medium (monitoring, thresholds) |

#### Failure Handling

| Approach | Transient Failures | Permanent Failures | Network Partitions |
|---------|-------------------|-------------------|-------------------|
| Fail-Stop | Stops (poor) | Stops (poor) | Stops (poor) |
| Best-Effort | Continues (good) | Continues (may lose data) | Continues (split-brain risk) |
| Quorum-Based | Handles (good) | Handles (good) | Split-brain risk |
| Retry with Backoff | Handles (good) | Wastes resources (poor) | May timeout |
| Circuit Breaker | Handles (good) | Fails fast (good) | Handles (good) |

#### What Breaks at 10× / 100×?

**10× more components:**
- Fail-Stop: **10× more failure points** (system fails more often)
- Best-Effort: More components to handle (more complexity)
- Quorum-Based: **10× more consensus overhead** (slower)
- Retry with Backoff: More retries (more resource usage)
- Circuit Breaker: More circuits to manage (more complexity)

**10× higher failure rate:**
- Fail-Stop: **System fails 10× more often** (poor availability)
- Best-Effort: More failures to handle (more inconsistency)
- Quorum-Based: More consensus needed (slower)
- Retry with Backoff: More retries (more resource usage)
- Circuit Breaker: More circuits open (more degradation)

**10× longer recovery time:**
- Fail-Stop: **System down 10× longer** (poor availability)
- Best-Effort: More data loss (components down longer)
- Quorum-Based: System unavailable longer (if majority down)
- Retry with Backoff: **10× more retries** (wastes resources)
- Circuit Breaker: Circuits open longer (more degradation)

---

### 4. Failure & Evolution (5 min)

#### How Does This Fail?

**Fail-Stop:**
- **Poor availability**: System unavailable during any failure
- **Not fault-tolerant**: Single point of failure
- **Poor user experience**: Users see errors

**Best-Effort:**
- **Inconsistency**: May have inconsistent data
- **Data loss**: May lose data from failed components
- **Split-brain**: Network partition may create inconsistent state

**Quorum-Based:**
- **Latency**: Consensus adds latency
- **Not available if majority fails**: System unavailable if >50% fail
- **Split-brain**: Network partition may create two majorities

**Retry with Backoff:**
- **Latency**: Retries add latency
- **Resource waste**: Wastes resources on permanent failures
- **Timeout**: May timeout if component never recovers

**Circuit Breaker:**
- **Temporary unavailability**: Component unavailable during circuit open
- **Tuning**: Must tune thresholds (may be wrong)
- **False positives**: May open circuit unnecessarily

#### How Would You Evolve It?

**Hybrid approach:**
- Use circuit breaker for failed components (fails fast)
- Use retry for transient failures (resilient)
- Use quorum for critical operations (consistent)
- Combine: Fast failure + resilience + consistency

**Failure isolation:**
- Isolate failures to affected components
- Other components continue operating
- Prevents cascading failures

**Graceful degradation:**
- Degrade functionality when components fail
- Keep core functionality available
- Better than complete failure

**Health checks and monitoring:**
- Monitor component health
- Detect failures quickly
- Proactively handle failures

**Automatic recovery:**
- Automatically recover when components heal
- Resume normal operation
- Self-healing system

---

## Knowledge Deep Dive

### Failure Models

**Fail-stop:**
- Component fails by stopping (no malicious behavior)
- Simplest model, but not realistic (components may behave incorrectly)

**Crash-recovery:**
- Component may crash and recover
- Must handle state recovery

**Byzantine:**
- Component may behave arbitrarily (malicious or buggy)
- Most complex, requires Byzantine fault tolerance

### Network Partitions

**Problem**: Network split creates two partitions, each thinks it's the majority.

**Solutions:**
1. **Paxos/Raft**: Consensus protocol prevents split-brain
2. **Quorum with fencing**: Use fencing tokens to prevent split-brain
3. **Last-write-wins**: Accept that partitions may diverge, merge later

### Retry Strategies

**Exponential backoff:**
- Wait 2^attempt seconds before retry
- Prevents overwhelming failed component
- Example: 1s, 2s, 4s, 8s, 16s, ...

**Jitter:**
- Add randomness to backoff (prevents thundering herd)
- Example: backoff + random(0, jitter)

**Max retries:**
- Give up after N retries
- Prevents infinite retries

### When to Use What

- **Need strong consistency**: Quorum-based or fail-stop
- **Need high availability**: Best-effort or circuit breaker
- **Transient failures**: Retry with backoff
- **Permanent failures**: Circuit breaker
- **Complex requirements**: Hybrid (circuit breaker + retry + quorum)
- **Simple case**: Retry with exponential backoff

---

## Listen For Yourself Saying

✅ "Partial failures require us to balance availability and consistency"
✅ "Circuit breakers fail fast and prevent cascading failures"
✅ "Quorum-based systems handle minority failures but not majority failures"
✅ "We need to isolate failures to prevent them from affecting the entire system"
