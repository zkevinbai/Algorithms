# Problem 14: Hot Keys & Skew

## Prompt

One key dominates traffic.

---

## Key Concepts

- Detection
- Mitigation
- Load balancing

## Variations

- Cache hot keys
- Database hot keys
- Distributed system hot keys

---

## Practice: 30-Minute Drill

### 1. Problem Framing (5 min)

**Restate the problem:**
- In a distributed system, one key (or small set of keys) receives disproportionately high traffic
- This creates a "hot spot" - one server/node handles most of the load
- Other servers are underutilized (load imbalance)
- System performance degrades due to the hot spot

**Clarify constraints:**
- What is the system? (Cache? Database? API?)
- How is data sharded? (Hash-based? Range-based? Consistent hashing?)
- What is the traffic pattern? (One key? Few keys? Many keys?)
- What is the load imbalance? (10:1? 100:1? 1000:1?)
- Can we change the key? (Yes? No?)

**Bounded vs Unbounded:**
- **Bounded**: Number of keys is typically bounded (though may be very large)
- **Online**: Must handle hot keys as they occur, cannot prevent them

**Key Questions:**
- How do we detect hot keys?
- How do we mitigate hot keys?
- Can we prevent hot keys (key design)?
- What is the acceptable load imbalance?

---

### 2. Candidate Approaches (10 min)

#### Approach 1: Do Nothing (Accept Skew)

**Description:**
- Accept that some keys will be hot
- Over-provision the system to handle hot keys
- Use vertical scaling (larger servers) for hot shards

**Pros:**
- Simple: No mitigation logic needed
- Works: If system can handle hot keys

**Cons:**
- **Inefficient**: Over-provisioning wastes resources
- **Not scalable**: Hot keys may exceed server capacity
- **Cost**: Larger servers are more expensive
- **Single point of failure**: Hot shard is critical path

#### Approach 2: Key Splitting / Virtual Sharding

**Description:**
- Split hot key into multiple virtual keys
- Distribute virtual keys across shards
- Route requests to virtual keys (round-robin, hash, etc.)

**Pros:**
- **Distributes load**: Hot key load spread across multiple shards
- **Transparent**: Can be transparent to clients (if key mapping hidden)

**Cons:**
- **Complexity**: Must manage key splitting and routing
- **Consistency**: Virtual keys may be inconsistent (if not coordinated)
- **Query complexity**: Queries may need to aggregate across virtual keys

#### Approach 3: Replication / Read Replicas

**Description:**
- Replicate hot key data to multiple shards
- Route reads to replicas (load balance)
- Writes go to primary, propagate to replicas

**Pros:**
- **Distributes reads**: Read load spread across replicas
- **Fault tolerance**: Replicas provide redundancy

**Cons:**
- **Write bottleneck**: Writes still go to primary (may be bottleneck)
- **Consistency**: Replication lag may cause inconsistencies
- **Storage cost**: Replicas consume storage

#### Approach 4: Local Caching

**Description:**
- Cache hot keys locally (in application servers)
- Serve from cache, reduce load on hot shard
- Invalidate cache on updates

**Pros:**
- **Reduces load**: Cache absorbs read load
- **Fast**: Local cache is very fast
- **Simple**: Standard caching pattern

**Cons:**
- **Memory**: Cache consumes memory
- **Consistency**: Cache may be stale
- **Write load**: Writes still hit hot shard

#### Approach 5: Request Coalescing / Batching

**Description:**
- Coalesce multiple requests for same key
- Batch requests, serve from single fetch
- Reduce number of requests to hot shard

**Pros:**
- **Reduces load**: Fewer requests to hot shard
- **Efficient**: Batch operations are more efficient

**Cons:**
- **Latency**: Coalescing adds latency (wait for batch)
- **Complexity**: Must implement coalescing logic

---

### 3. Tradeoffs & Scaling (10 min)

#### Load Distribution

| Approach | Load Distribution | Write Handling |
|----------|------------------|----------------|
| Do Nothing | Skewed (hot shard overloaded) | All writes to hot shard |
| Key Splitting | Distributed (load spread) | Writes distributed |
| Replication | Read load distributed | Writes to primary |
| Local Caching | Read load reduced | Writes to hot shard |
| Request Coalescing | Request count reduced | Still all to hot shard |

#### Complexity

| Approach | Implementation | Operations |
|----------|----------------|------------|
| Do Nothing | Low | Low (just over-provision) |
| Key Splitting | High | Medium (key management) |
| Replication | Medium | High (replication management) |
| Local Caching | Low | Medium (cache invalidation) |
| Request Coalescing | Medium | Low |

#### Cost

| Approach | Infrastructure | Storage |
|----------|---------------|---------|
| Do Nothing | High (over-provisioning) | Normal |
| Key Splitting | Normal | Normal |
| Replication | Normal | High (replicas) |
| Local Caching | Normal | Normal (cache memory) |
| Request Coalescing | Normal | Normal |

#### What Breaks at 10× / 100×?

**10× hotter key:**
- Do Nothing: **Fails** - server cannot handle 10× load
- Key Splitting: Need 10× more virtual keys (more shards)
- Replication: Need 10× more replicas (expensive)
- Local Caching: Cache hit rate may decrease (cache eviction)
- Request Coalescing: Still works, but batching may be larger

**10× more hot keys:**
- Do Nothing: **Fails** - multiple hot shards
- Key Splitting: More keys to split (more complexity)
- Replication: More keys to replicate (more storage)
- Local Caching: More cache memory needed
- Request Coalescing: More coalescing logic needed

**10× higher write rate:**
- Do Nothing: **Fails** - write bottleneck
- Key Splitting: Writes distributed (helps)
- Replication: **Still bottleneck** - writes to primary
- Local Caching: **No help** - writes still hit hot shard
- Request Coalescing: **No help** - writes not coalesced

---

### 4. Failure & Evolution (5 min)

#### How Does This Fail?

**Do Nothing:**
- **Server overload**: Hot shard cannot handle load
- **Single point of failure**: Hot shard is critical path
- **Inefficient**: Over-provisioning wastes resources

**Key Splitting:**
- **Complexity**: Key splitting and routing is complex
- **Consistency**: Virtual keys may be inconsistent
- **Query complexity**: Queries may need aggregation
- **Not transparent**: Clients may need to know about splitting

**Replication:**
- **Write bottleneck**: Writes still go to primary
- **Replication lag**: Replicas may be stale
- **Storage cost**: Replicas consume storage
- **Consistency**: Eventual consistency challenges

**Local Caching:**
- **Write load**: Writes still hit hot shard
- **Cache invalidation**: Must invalidate on updates (complexity)
- **Memory**: Cache consumes memory
- **Staleness**: Cache may be stale

**Request Coalescing:**
- **Latency**: Coalescing adds latency
- **Write load**: Writes not coalesced (still hit hot shard)
- **Complexity**: Coalescing logic is complex

#### How Would You Evolve It?

**Hybrid approach:**
- Use local caching for reads (reduce read load)
- Use key splitting for writes (distribute write load)
- Combine: Cache reads, split writes

**Adaptive mitigation:**
- Detect hot keys automatically
- Apply mitigation automatically (cache, split, replicate)
- Remove mitigation when key cools down

**Write splitting:**
- Split writes across multiple shards (like key splitting)
- Aggregate writes on read (merge)
- Distributes write load

**Consistent hashing with virtual nodes:**
- Use consistent hashing with many virtual nodes
- Hot keys naturally distribute across virtual nodes
- Transparent to clients

**Preventive design:**
- Design keys to avoid hot spots (add randomness, time component)
- Use composite keys (user_id + timestamp)
- Distribute keys more evenly

---

## Knowledge Deep Dive

### Hot Key Detection

**Methods:**
1. **Monitoring**: Track request rates per key (counters, metrics)
2. **Sampling**: Sample requests, identify frequently accessed keys
3. **Heuristics**: Keys with request rate > threshold are hot
4. **Machine learning**: Learn patterns, predict hot keys

**Challenges:**
- **Memory**: Tracking all keys may be expensive
- **Accuracy**: Sampling may miss some hot keys
- **Real-time**: Detection must be fast enough to react

### Consistent Hashing

**Problem**: Hash-based sharding creates hot spots if key distribution is skewed.

**Solution**: Consistent hashing with virtual nodes
- Map keys to virtual nodes (many virtual nodes per physical node)
- Virtual nodes distributed across physical nodes
- Hot keys distribute across virtual nodes (reduces hot spots)

### When to Use What

- **Acceptable skew, can over-provision**: Do nothing
- **Read-heavy hot keys**: Local caching or replication
- **Write-heavy hot keys**: Key splitting or write splitting
- **Both read and write hot**: Hybrid (cache + split)
- **Preventive**: Key design (add randomness, composite keys)
- **Automatic**: Adaptive mitigation (detect and mitigate automatically)

---

## Listen For Yourself Saying

✅ "Hot keys create load imbalance - we need to detect and mitigate them"
✅ "Read-heavy hot keys can use caching or replication - write-heavy need splitting"
✅ "Key design can prevent hot spots - add randomness or composite keys"
✅ "We need to balance mitigation complexity with load distribution"
