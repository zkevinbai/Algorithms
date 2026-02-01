# Problem 3: Rate Limiting

## Prompt

Design an algorithm to limit requests per user.

---

## Key Concepts

- Sliding vs fixed windows
- Bursts
- Distributed enforcement

## Variations

- Per-IP vs per-user
- Global vs local limits

---

## Practice: 30-Minute Drill

### 1. Problem Framing (5 min)

**Restate the problem:**
- We need to limit the number of requests a user (or IP, or API key) can make
- Requests exceeding the limit should be rejected or throttled
- System must handle high throughput and many users
- Limits should be enforced fairly and consistently

**Clarify constraints:**
- What is the limit? (e.g., 100 requests per minute)
- What is the time window? (per second, minute, hour, day?)
- What happens when limit exceeded? (Reject? Queue? Throttle?)
- Per-user or per-IP? (Different enforcement strategies)
- Global limit or per-endpoint? (Different scoping)
- Is distributed enforcement required? (Multiple servers)

**Bounded vs Unbounded:**
- **Bounded**: Number of users is typically bounded (though large)
- **Online**: Must check and update limits as requests arrive

**Key Questions:**
- Do we need exact limits or approximate?
- How important is preventing bursts?
- Do we need distributed coordination?
- What is the acceptable memory per user?

---

### 2. Candidate Approaches (10 min)

#### Approach 1: Fixed Window Counter

**Description:**
- Maintain counter per user for current time window
- Reset counter at window boundary (e.g., every minute)
- Increment on request, reject if counter >= limit

**Pros:**
- Simple to implement
- Low memory (one counter per user)
- Fast O(1) check

**Cons:**
- **Burst problem**: User can make all requests at start of window, then again at start of next window
- Boundary effects: Double the limit at window boundaries
- Memory: Still O(users) - may be large

#### Approach 2: Sliding Window Log

**Description:**
- Store timestamp of each request per user
- On request, count requests in last window (e.g., last 60 seconds)
- Reject if count >= limit
- Evict old timestamps outside window

**Pros:**
- Exact rate limiting
- Smooth distribution (no bursts at boundaries)
- Accurate within window

**Cons:**
- High memory: O(requests_per_user) - stores all timestamps
- Slower: O(n) to count timestamps in window
- Cleanup complexity: Need to evict old timestamps

#### Approach 3: Sliding Window Counter (Approximate)

**Description:**
- Divide time into sub-windows (e.g., 1-minute window = 6 × 10-second sub-windows)
- Maintain counter per sub-window per user
- On request, sum counts of sub-windows in sliding window
- Reject if sum >= limit

**Pros:**
- Bounded memory: O(sub_windows) per user
- Approximates sliding window
- Faster than log approach

**Cons:**
- Approximate (granularity depends on sub-window size)
- Still O(sub_windows) memory per user
- May allow slight bursts between sub-windows

#### Approach 4: Token Bucket

**Description:**
- Each user has a bucket with capacity = limit
- Tokens refill at constant rate (e.g., limit/60 tokens per second)
- On request, consume one token
- Reject if bucket empty

**Pros:**
- Smooth rate limiting (handles bursts naturally)
- Bounded memory: O(1) per user (just token count)
- Allows short bursts (if tokens available)
- Natural throttling behavior

**Cons:**
- More complex than fixed window
- Need to track last refill time per user
- Clock synchronization issues in distributed systems

#### Approach 5: Leaky Bucket

**Description:**
- Similar to token bucket, but different model
- Requests enter queue at variable rate
- Requests exit queue at constant rate (limit/window)
- Reject if queue full

**Pros:**
- Smooth output rate (constant)
- Natural queuing behavior
- Handles bursts by queuing

**Cons:**
- Memory: O(queued_requests) per user (unbounded if not limited)
- More complex (queue management)
- May delay requests (queuing)

---

### 3. Tradeoffs & Scaling (10 min)

#### Time Complexity

| Approach | Check | Update |
|----------|-------|--------|
| Fixed Window | O(1) | O(1) |
| Sliding Window Log | O(n) | O(1) |
| Sliding Window Counter | O(sub_windows) | O(1) |
| Token Bucket | O(1) | O(1) |
| Leaky Bucket | O(1) | O(1) |

#### Space Complexity

| Approach | Space per User |
|----------|----------------|
| Fixed Window | O(1) - counter + window start |
| Sliding Window Log | O(requests_in_window) - **unbounded** |
| Sliding Window Counter | O(sub_windows) - **bounded** |
| Token Bucket | O(1) - tokens + last_refill |
| Leaky Bucket | O(queued_requests) - **unbounded** |

#### Accuracy & Burst Handling

| Approach | Accuracy | Burst Handling |
|----------|----------|----------------|
| Fixed Window | Exact per window | Poor (2× limit at boundaries) |
| Sliding Window Log | Exact | Good (smooth) |
| Sliding Window Counter | Approximate | Good (smooth) |
| Token Bucket | Exact (token-based) | Good (allows bursts if tokens available) |
| Leaky Bucket | Exact (queue-based) | Good (queues bursts) |

#### What Breaks at 10× / 100×?

**10× more users:**
- All approaches: Memory grows 10× (may need distributed storage)
- Fixed Window: Still O(1) per user, but total memory 10×
- Sliding Window Log: **Fails** - memory per user also grows with request rate
- Token Bucket: Still O(1) per user, manageable

**10× higher request rate:**
- Fixed Window: Still works, but boundary bursts more noticeable
- Sliding Window Log: **Fails** - memory per user grows 10×
- Token Bucket: Still works, tokens refill faster
- All: May need distributed enforcement (multiple servers)

**100× more users:**
- Fixed Window: Need distributed storage (Redis, database)
- Sliding Window Log: **Fails** - memory explosion
- Token Bucket: Need distributed storage, but still O(1) per user
- All: Network coordination becomes bottleneck

**Distributed scenario:**
- **Problem**: Multiple servers, each may see different request counts
- **Solution**: Centralized store (Redis) or distributed coordination
- **Challenge**: Network latency, consistency, single point of failure

---

### 4. Failure & Evolution (5 min)

#### How Does This Fail?

**Fixed Window:**
- **Burst problem**: User makes limit requests at 00:00, then limit more at 00:01 (2× limit in 1 second)
- **Boundary effects**: Double limit at window transitions
- **Memory**: O(users) - may be large for many users
- **No smoothness**: All-or-nothing within window

**Sliding Window Log:**
- **Memory explosion**: High-rate users store many timestamps
- **Slow queries**: Counting timestamps is O(n)
- **Cleanup overhead**: Evicting old timestamps adds complexity
- **Not scalable**: Fails for high-throughput users

**Sliding Window Counter:**
- **Approximation error**: Granularity depends on sub-window size
- **Memory**: Still O(sub_windows × users)
- **Bursts**: Small bursts possible between sub-windows
- **Tuning**: Sub-window size affects accuracy vs memory

**Token Bucket:**
- **Clock synchronization**: In distributed systems, clocks may drift
- **Burst allowance**: May allow larger bursts than desired (if tokens accumulate)
- **Memory**: O(users) for token counts
- **Refill calculation**: Need to handle time-based refills correctly

**Leaky Bucket:**
- **Queue growth**: Unbounded if requests exceed drain rate
- **Memory**: O(queued_requests) per user
- **Latency**: Requests may be delayed (queued)
- **Complexity**: Queue management adds overhead

#### How Would You Evolve It?

**Hybrid approach:**
- Use token bucket for smooth rate limiting
- Add fixed window as hard cap (prevent token accumulation abuse)
- Combine: `min(token_bucket_limit, fixed_window_limit)`

**Distributed with Redis:**
- Store counters/tokens in Redis (centralized)
- Use Redis atomic operations (INCR, EXPIRE)
- Handle Redis failures gracefully (fail open? fail closed?)

**Hierarchical limits:**
- Global limit (all users combined)
- Per-user limit
- Per-endpoint limit
- Enforce all levels (most restrictive wins)

**Adaptive rate limiting:**
- Monitor user behavior
- Adjust limits based on user tier (free vs paid)
- Dynamic limits based on system load

**Probabilistic rate limiting:**
- For very high throughput, use approximate methods
- Sample requests instead of counting all
- Trade accuracy for performance

---

## Knowledge Deep Dive

### Token Bucket Algorithm

**Structure:**
- Bucket capacity: C (maximum tokens)
- Refill rate: R tokens per second
- Current tokens: T
- Last refill time: L

**On request:**
1. Calculate time since last refill: `elapsed = now - L`
2. Refill tokens: `T = min(C, T + elapsed × R)`
3. Update last refill time: `L = now`
4. If `T >= 1`: consume token, allow request
5. Else: reject request

**Properties:**
- Allows bursts up to capacity C
- Smooth long-term rate of R requests/second
- Bounded memory: O(1) per user

### Leaky Bucket Algorithm

**Structure:**
- Queue with maximum size Q
- Drain rate: D requests per second
- Current queue size: S

**On request:**
1. If `S < Q`: add to queue, allow request
2. Else: reject request (queue full)

**Draining (background):**
- Remove requests from queue at rate D
- Process/forward requests as drained

**Properties:**
- Smooth output rate (constant D)
- Queues bursts
- Memory: O(queued_requests) - may be unbounded

### Distributed Rate Limiting

**Challenges:**
- Multiple servers see different request counts
- Need coordination to enforce global limits
- Network latency for coordination

**Solutions:**

1. **Centralized store (Redis):**
   - All servers check/update same Redis key
   - Use atomic operations (INCR with EXPIRE)
   - Single point of failure, but simple

2. **Distributed coordination:**
   - Each server maintains local count
   - Periodically sync with other servers
   - Eventual consistency (may allow slight overage)

3. **Sharding:**
   - Shard users across servers
   - Each server enforces limits for its shard
   - No coordination needed (if user always goes to same server)

### When to Use What

- **Simple + acceptable bursts**: Fixed window
- **Exact + low rate**: Sliding window log
- **Exact + high rate**: Token bucket
- **Smooth output**: Leaky bucket
- **Distributed**: Token bucket + Redis
- **Per-IP**: Fixed window (simple, IPs are bounded)
- **Per-user**: Token bucket (smooth, handles bursts)

---

## Listen For Yourself Saying

✅ "Fixed window is simple but allows bursts at boundaries"
✅ "Token bucket gives smooth rate limiting with bounded memory"
✅ "For distributed systems, we'll use Redis for coordination"
✅ "We need to handle the tradeoff between accuracy and memory"
