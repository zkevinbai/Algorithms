# Problem 5: Cache Invalidation

## Prompt

Cache expensive query results while keeping correctness acceptable.

---

## Key Concepts

- TTL vs event-driven invalidation
- Staleness tolerance
- Invalidation fanout

## Variations

- Partial invalidation
- Multi-layer caches

---

## Practice: 30-Minute Drill

### 1. Problem Framing (5 min)

**Restate the problem:**
- We cache results of expensive queries (database queries, API calls, computations)
- When underlying data changes, cached results may become stale
- We need to invalidate or update caches to maintain acceptable correctness
- System must balance performance (cache hits) with correctness (fresh data)

**Clarify constraints:**
- What is the query pattern? (Read-heavy? Write-heavy?)
- What is acceptable staleness? (Seconds? Minutes? Eventually consistent?)
- What triggers invalidation? (Data changes? Time? Both?)
- How expensive is invalidation? (Single key? Many keys? Cascade?)
- What is the cache scope? (Single server? Distributed?)

**Bounded vs Unbounded:**
- **Bounded**: Cache size is typically bounded (memory limits)
- **Online**: Must handle invalidations as data changes, cannot wait

**Key Questions:**
- Can we accept stale data temporarily? (Usually yes, with TTL)
- How do we know when data changes? (Event stream? Polling? TTL?)
- What is the invalidation scope? (Single key? Pattern? Cascade?)
- How do we handle invalidation failures? (Retry? Best effort?)

---

### 2. Candidate Approaches (10 min)

#### Approach 1: Time-To-Live (TTL)

**Description:**
- Each cache entry has expiration time
- On query, check if expired; if so, fetch fresh data
- No explicit invalidation needed

**Pros:**
- Simple: No invalidation logic needed
- Predictable: Know maximum staleness (TTL duration)
- Resilient: Works even if invalidation events are lost

**Cons:**
- **Stale data**: Data may be stale for up to TTL duration
- **Wasted cache**: May serve stale data even after source updates
- **No immediate freshness**: Cannot get fresh data until TTL expires
- **Tuning**: TTL must be tuned per use case

#### Approach 2: Event-Driven Invalidation

**Description:**
- Listen to data change events (database triggers, message queue, etc.)
- On change event, invalidate corresponding cache entries
- Cache entries have no TTL (or very long TTL)

**Pros:**
- **Fresh data**: Cache invalidated immediately on change
- **Efficient**: No wasted cache serving stale data
- **Precise**: Only invalidate what changed

**Cons:**
- **Complexity**: Need event infrastructure
- **Failure handling**: What if invalidation event is lost?
- **Fanout**: One data change may invalidate many cache keys
- **Ordering**: Events may arrive out of order

#### Approach 3: TTL + Event-Driven (Hybrid)

**Description:**
- Use TTL as safety net (e.g., 1 hour)
- Use event-driven invalidation for immediate freshness
- Cache entry expires at min(TTL, invalidation_time)

**Pros:**
- Best of both: Fresh when possible, bounded staleness always
- Resilient: TTL handles lost invalidation events
- Flexible: Can tune TTL per use case

**Cons:**
- More complex: Two mechanisms to maintain
- Still need event infrastructure
- TTL may still cause some staleness

#### Approach 4: Version-Based Invalidation

**Description:**
- Each data entity has version number
- Cache entries include version
- On query, check if cached version matches current version
- If mismatch, fetch fresh data and update cache

**Pros:**
- Precise: Know exactly if cache is stale
- Can check version cheaply (separate version store)
- Supports conditional updates

**Cons:**
- **Version store**: Need to maintain versions (overhead)
- **Version checks**: Extra lookup on each cache read
- **Version updates**: Must update versions on data changes

#### Approach 5: Write-Through / Write-Behind Cache

**Description:**
- **Write-Through**: On write, update both cache and source, then return
- **Write-Behind**: On write, update cache immediately, write to source asynchronously

**Pros:**
- Cache always consistent (write-through)
- Fast writes (write-behind, async to source)
- No invalidation needed (cache updated on writes)

**Cons:**
- **Write-through**: Slower writes (must wait for source)
- **Write-behind**: Risk of data loss if cache fails before source write
- **Complexity**: Must handle write failures, retries

---

### 3. Tradeoffs & Scaling (10 min)

#### Time Complexity

| Approach | Read (Cache Hit) | Read (Cache Miss) | Write |
|----------|------------------|-------------------|-------|
| TTL | O(1) | O(query_cost) | O(1) |
| Event-Driven | O(1) | O(query_cost) | O(1) + O(invalidation_cost) |
| TTL + Event | O(1) | O(query_cost) | O(1) + O(invalidation_cost) |
| Version-Based | O(1) + O(version_check) | O(query_cost) | O(1) + O(version_update) |
| Write-Through | O(1) | O(query_cost) | O(source_write) |
| Write-Behind | O(1) | O(query_cost) | O(1) async |

#### Staleness Guarantees

| Approach | Maximum Staleness | Average Staleness |
|----------|-------------------|-------------------|
| TTL | TTL duration | TTL / 2 (on average) |
| Event-Driven | Event processing delay | Event processing delay |
| TTL + Event | min(TTL, event_delay) | min(TTL/2, event_delay) |
| Version-Based | Version check delay | Version check delay |
| Write-Through | 0 (always fresh) | 0 |
| Write-Behind | Async write delay | Async write delay |

#### What Breaks at 10× / 100×?

**10× more cache keys:**
- TTL: Still works, but more memory
- Event-Driven: Invalidation fanout may be 10× (one change invalidates many keys)
- Version-Based: Version store grows 10×
- All: May need distributed cache (Redis, Memcached)

**10× higher write rate:**
- TTL: Still works (no invalidation overhead)
- Event-Driven: **Fails** - invalidation events become bottleneck
- Version-Based: Version updates become bottleneck
- Write-Through: **Fails** - source writes become bottleneck
- Write-Behind: Still works (async), but risk of data loss increases

**10× more invalidation events:**
- Event-Driven: **Fails** - event processing becomes bottleneck
- TTL + Event: Event processing still bottleneck, but TTL provides safety
- Version-Based: Version checks become bottleneck
- All: May need to batch invalidations or use patterns

**Distributed cache:**
- **Problem**: Multiple cache servers, invalidation must reach all
- **Solution**: Broadcast invalidation events, or use cache tags/patterns
- **Challenge**: Network overhead, consistency (some servers may miss invalidation)

---

### 4. Failure & Evolution (5 min)

#### How Does This Fail?

**TTL:**
- **Staleness**: Data may be stale for full TTL duration
- **Wasted cache**: Serving stale data even after source updates
- **Tuning**: Wrong TTL = poor performance or poor correctness
- **No immediate freshness**: Cannot force refresh until TTL expires

**Event-Driven:**
- **Lost events**: If invalidation event is lost, cache stays stale forever
- **Fanout explosion**: One change invalidates many keys (performance issue)
- **Ordering**: Events may arrive out of order (race conditions)
- **Complexity**: Need reliable event infrastructure

**TTL + Event:**
- **Still has TTL issues**: Some staleness from TTL
- **Still has event issues**: Lost events, fanout, ordering
- **More complexity**: Two mechanisms to maintain and debug

**Version-Based:**
- **Version store overhead**: Extra storage and lookups
- **Version check cost**: Extra latency on each read
- **Version updates**: Must update versions atomically with data
- **Complexity**: More moving parts

**Write-Through:**
- **Slow writes**: Must wait for source (database, API)
- **Source failures**: If source fails, write fails (no cache update)
- **Not for all use cases**: Some writes don't need cache updates

**Write-Behind:**
- **Data loss risk**: If cache fails before source write completes
- **Consistency**: Cache and source may be temporarily inconsistent
- **Complexity**: Must handle retries, failures, ordering

#### How Would You Evolve It?

**Multi-layer cache:**
- L1: In-memory cache with TTL (fast, small)
- L2: Distributed cache (Redis) with event-driven invalidation
- L3: Database (source of truth)
- Invalidate L1 on L2 invalidation events

**Cache tags/patterns:**
- Tag cache entries with related entities (e.g., `user:123`, `product:456`)
- On entity change, invalidate all entries with that tag
- Reduces fanout (invalidate by tag, not individual keys)
- Example: `user:123:profile` tagged with `user:123`, invalidate all `user:123:*` on user update

**Probabilistic invalidation:**
- For very high write rates, use probabilistic invalidation
- Invalidate random sample of related cache entries
- Trade some correctness for performance
- Combine with TTL for safety

**Stale-while-revalidate:**
- Serve stale cache entry immediately
- Asynchronously fetch fresh data in background
- Update cache for next request
- Best of both: Fast response + eventual freshness

**Cache warming:**
- Pre-populate cache with likely-needed data
- Reduces cache misses
- Can warm after invalidation (predictive)

---

## Knowledge Deep Dive

### Cache Invalidation Patterns

**Exact key invalidation:**
- Invalidate specific cache key
- Simple, but requires knowing exact key
- Problem: One data change may affect many keys

**Pattern-based invalidation:**
- Invalidate all keys matching pattern (e.g., `user:*`)
- More powerful, but may invalidate too much
- Requires pattern matching in cache (Redis supports this)

**Tag-based invalidation:**
- Tag cache entries with entity IDs
- On entity change, invalidate all entries with that tag
- Balance between exact and pattern-based
- Example: Cache key `user:123:profile` tagged with `user:123`

### Invalidation Fanout

**Problem**: One data change may invalidate many cache entries.

**Example**: User profile update invalidates:
- `user:123:profile`
- `user:123:settings`
- `dashboard:user:123`
- `recommendations:user:123`
- etc.

**Solutions:**
1. **Tags**: Group related keys by tag, invalidate by tag
2. **Dependency graph**: Maintain graph of dependencies, invalidate transitively
3. **Lazy invalidation**: Don't invalidate immediately, check on read (version-based)
4. **Batching**: Batch invalidations, process together

### Staleness Tolerance

Different use cases have different staleness requirements:

- **Financial data**: Very low tolerance (seconds)
- **User profiles**: Moderate tolerance (minutes)
- **Product catalog**: High tolerance (hours)
- **Analytics**: Very high tolerance (eventually consistent)

**Strategy**: Match invalidation strategy to staleness requirements:
- Low tolerance: Event-driven or write-through
- Moderate: TTL + Event-driven
- High tolerance: TTL only

### When to Use What

- **Read-heavy, moderate staleness OK**: TTL
- **Write-heavy, need freshness**: Event-driven or write-through
- **Balanced, need resilience**: TTL + Event-driven
- **Need exact freshness**: Write-through or version-based
- **Very high write rate**: Write-behind or probabilistic invalidation
- **Complex dependencies**: Tag-based or dependency graph

---

## Listen For Yourself Saying

✅ "TTL is simple but may serve stale data - acceptable if staleness tolerance allows"
✅ "Event-driven gives freshness but needs reliable event infrastructure"
✅ "We can use tags to reduce invalidation fanout"
✅ "Staleness tolerance determines which strategy to use"
