# Problem 13: Batch vs Real-Time

## Prompt

Same problem, batch or streaming?

---

## Key Concepts

- Cost
- Complexity
- Latency requirements

## Variations

- Lambda architecture
- Kappa architecture
- Hybrid approaches

---

## Practice: 30-Minute Drill

### 1. Problem Framing (5 min)

**Restate the problem:**
- We have a data processing problem (aggregation, transformation, analysis)
- We can solve it with batch processing (process data in batches) or real-time/streaming (process data as it arrives)
- Each approach has different tradeoffs in cost, complexity, and latency
- We need to choose the right approach for the use case

**Clarify constraints:**
- What is the problem? (Aggregation? Transformation? Analysis?)
- What is the data volume? (Small? Large? Very large?)
- What is the data velocity? (Low? High? Very high?)
- What is the latency requirement? (Seconds? Minutes? Hours? Days?)
- What is the correctness requirement? (Exact? Approximate? Eventually consistent?)

**Bounded vs Unbounded:**
- **Batch**: Typically bounded (process finite dataset)
- **Streaming**: Unbounded (process continuous stream)

**Key Questions:**
- What latency is acceptable?
- What is the cost difference?
- What is the complexity difference?
- Can we accept eventual consistency?
- Do we need both (Lambda architecture)?

---

### 2. Candidate Approaches (10 min)

#### Approach 1: Pure Batch Processing

**Description:**
- Collect data over time window (e.g., hourly, daily)
- Process entire batch at once
- Store results, serve queries from stored results

**Pros:**
- **Simple**: Well-understood, mature tooling (Hadoop, Spark)
- **Cost-effective**: Can use cheaper resources (spot instances, scheduled)
- **Exact**: Can process entire dataset, exact results
- **Debuggable**: Easier to debug (reprocess batch, inspect intermediate results)

**Cons:**
- **High latency**: Results delayed until batch completes (hours, days)
- **Not real-time**: Cannot provide immediate results
- **Resource spikes**: Batch jobs consume resources in bursts
- **Staleness**: Data may be stale until next batch

#### Approach 2: Pure Streaming/Real-Time

**Description:**
- Process data as it arrives (stream processing)
- Maintain state for aggregations
- Results available immediately (low latency)

**Pros:**
- **Low latency**: Results available in seconds or minutes
- **Real-time**: Can react to events immediately
- **Continuous**: Always processing, no batch boundaries
- **Fresh**: Data is always fresh

**Cons:**
- **Complex**: More complex than batch (state management, fault tolerance)
- **Expensive**: Requires always-on infrastructure
- **Approximate**: May need approximations for unbounded streams
- **Harder to debug**: Streaming systems harder to debug

#### Approach 3: Lambda Architecture

**Description:**
- Maintain both batch and streaming pipelines
- Batch: Process all data, exact results (serves as source of truth)
- Streaming: Process recent data, approximate results (serves real-time views)
- Merge: Combine batch and streaming results

**Pros:**
- **Best of both**: Real-time freshness + batch correctness
- **Flexible**: Users can choose batch (correct) or streaming (fresh) view
- **Resilient**: Batch corrects streaming approximations

**Cons:**
- **Complex**: Two pipelines to maintain
- **Expensive**: Double the infrastructure
- **Consistency**: Two views may be inconsistent (confusing)
- **Complexity**: Merge logic is complex

#### Approach 4: Kappa Architecture

**Description:**
- Single streaming pipeline for all data
- Reprocess historical data through same streaming pipeline when needed
- No separate batch pipeline

**Pros:**
- **Simpler**: Single pipeline (vs Lambda's two)
- **Consistent**: Same logic for real-time and historical
- **Flexible**: Can reprocess any time range

**Cons:**
- **Reprocessing cost**: Reprocessing historical data is expensive
- **State management**: Must manage state for reprocessing
- **Complexity**: Streaming pipeline must handle both real-time and batch-like reprocessing

#### Approach 5: Hybrid: Batch for Historical, Streaming for Recent

**Description:**
- Use batch for historical data (cheap, exact)
- Use streaming for recent data (real-time, approximate)
- Query layer combines historical (batch) + recent (streaming)

**Pros:**
- **Cost-effective**: Batch for large historical data (cheap)
- **Real-time**: Streaming for recent data (fresh)
- **Simpler than Lambda**: No merge, just query-time combination

**Cons:**
- **Query complexity**: Query layer must combine two sources
- **Consistency**: Historical (exact) vs recent (approximate) may be inconsistent
- **Boundary**: Must define boundary between historical and recent

---

### 3. Tradeoffs & Scaling (10 min)

#### Latency

| Approach | Latency | Freshness |
|----------|---------|-----------|
| Pure Batch | Hours to days | Stale until batch completes |
| Pure Streaming | Seconds to minutes | Real-time |
| Lambda | Seconds (streaming) or hours (batch) | Fresh (streaming) or stale (batch) |
| Kappa | Seconds (real-time) or hours (reprocess) | Fresh (real-time) |
| Hybrid | Seconds (recent) or hours (historical) | Fresh (recent) |

#### Cost

| Approach | Infrastructure Cost | Processing Cost |
|----------|-------------------|----------------|
| Pure Batch | Low (scheduled, spot instances) | Low (batch processing is cheaper) |
| Pure Streaming | High (always-on) | High (continuous processing) |
| Lambda | Very High (two pipelines) | Very High (double processing) |
| Kappa | High (always-on streaming) | Medium (reprocessing on-demand) |
| Hybrid | Medium (batch + streaming) | Medium |

#### Complexity

| Approach | Development | Operations | Debugging |
|----------|-------------|------------|-----------|
| Pure Batch | Low | Low | Low |
| Pure Streaming | High | High | High |
| Lambda | Very High | Very High | Very High |
| Kappa | High | High | Medium |
| Hybrid | Medium | Medium | Medium |

#### Correctness

| Approach | Correctness | Consistency |
|----------|-------------|-------------|
| Pure Batch | Exact | Strong (after batch) |
| Pure Streaming | Approximate (may be exact) | Eventual |
| Lambda | Exact (batch) or Approximate (streaming) | Eventual (streaming) or Strong (batch) |
| Kappa | Exact (if reprocessed) | Eventual (real-time) or Strong (reprocessed) |
| Hybrid | Exact (historical) or Approximate (recent) | Mixed |

#### What Breaks at 10× / 100×?

**10× more data:**
- Pure Batch: **10× longer** to process (may exceed batch window)
- Pure Streaming: Still handles (designed for continuous)
- Lambda: Batch 10× longer, streaming still works
- Kappa: Reprocessing 10× more expensive
- Hybrid: Historical batch 10× longer, streaming still works

**10× higher velocity:**
- Pure Batch: **Fails** - cannot keep up (batch window too large)
- Pure Streaming: Handles well (designed for high velocity)
- Lambda: Streaming handles, batch may lag
- Kappa: Streaming handles, reprocessing more expensive
- Hybrid: Streaming handles, batch may need smaller windows

**10× lower latency requirement:**
- Pure Batch: **Fails** - cannot meet latency requirement
- Pure Streaming: Still works (low latency)
- Lambda: Streaming still works
- Kappa: Streaming still works
- Hybrid: Streaming for recent still works

**10× tighter correctness requirement:**
- Pure Batch: Still works (exact)
- Pure Streaming: **May fail** - approximations may not be acceptable
- Lambda: Batch still works (exact)
- Kappa: Reprocessing still works (exact)
- Hybrid: Historical batch still works (exact)

---

### 4. Failure & Evolution (5 min)

#### How Does This Fail?

**Pure Batch:**
- **High latency**: Cannot meet real-time requirements
- **Staleness**: Data stale until batch completes
- **Not reactive**: Cannot react to events immediately
- **Resource spikes**: Batch jobs cause resource spikes

**Pure Streaming:**
- **Complexity**: More complex than batch (state, fault tolerance)
- **Cost**: Always-on infrastructure is expensive
- **Approximations**: May need approximations (unacceptable for some use cases)
- **Harder to debug**: Streaming systems harder to debug and test

**Lambda:**
- **Complexity**: Two pipelines to maintain (very complex)
- **Cost**: Double the infrastructure (very expensive)
- **Consistency**: Two views may be inconsistent (confusing for users)
- **Merge complexity**: Merging batch and streaming results is complex

**Kappa:**
- **Reprocessing cost**: Reprocessing historical data is expensive
- **State management**: Must manage state for reprocessing (complex)
- **Complexity**: Streaming pipeline must handle both real-time and batch-like
- **Not simpler**: May not be simpler than Lambda in practice

**Hybrid:**
- **Query complexity**: Query layer must combine two sources (complex)
- **Consistency**: Historical (exact) vs recent (approximate) inconsistency
- **Boundary definition**: Must define boundary (arbitrary?)
- **Maintenance**: Two systems to maintain

#### How Would You Evolve It?

**Start simple, evolve:**
- Start with batch (simple, cheap)
- Add streaming when latency requirement emerges
- Evolve to Lambda or Kappa only if needed

**Unified query layer:**
- Abstract away batch vs streaming
- Query layer routes to appropriate source
- Users don't need to know which source

**Progressive enhancement:**
- Batch provides base (correct, but stale)
- Streaming provides deltas (fresh, but approximate)
- Combine: Base + deltas = correct + fresh

**Cost optimization:**
- Use batch for cold data (rarely accessed)
- Use streaming for hot data (frequently accessed)
- Tiered storage and processing

**Event-driven batch:**
- Trigger batch jobs on events (not just time)
- Smaller batches, lower latency
- Still batch (simpler than streaming), but more reactive

---

## Knowledge Deep Dive

### Batch Processing

**Characteristics:**
- Process finite dataset
- Scheduled (hourly, daily, etc.)
- Can use cheaper resources (spot instances)
- Easier to scale (horizontal scaling)

**Use cases:**
- ETL (Extract, Transform, Load)
- Reporting (daily, weekly reports)
- Analytics (historical analysis)
- Data warehousing

**Tools**: Hadoop, Spark, Airflow, etc.

### Streaming Processing

**Characteristics:**
- Process continuous stream
- Always-on processing
- Low latency (seconds to minutes)
- Stateful processing

**Use cases:**
- Real-time dashboards
- Alerting
- Real-time recommendations
- Fraud detection

**Tools**: Kafka Streams, Flink, Spark Streaming, etc.

### Lambda Architecture

**Components:**
1. **Batch layer**: Processes all data, exact results
2. **Speed layer**: Processes recent data, approximate results
3. **Serving layer**: Merges batch and speed layer results

**Challenges:**
- Code duplication (same logic in batch and streaming)
- Merge complexity (combining exact and approximate)
- Two systems to maintain

### Kappa Architecture

**Idea**: Single streaming pipeline for all data.

**How it works:**
- Process real-time data through streaming pipeline
- When need historical reprocessing, replay historical data through same pipeline
- No separate batch pipeline

**Benefits:**
- Single codebase (no duplication)
- Consistent logic (real-time and historical use same code)
- Simpler than Lambda (one pipeline)

**Challenges:**
- Reprocessing is expensive
- Must manage state for reprocessing
- May not be simpler in practice

### When to Use What

- **Low latency not required, exact needed**: Pure batch
- **Low latency required, approximate OK**: Pure streaming
- **Need both real-time and correctness**: Lambda or Kappa
- **Large historical data, recent real-time**: Hybrid
- **Start simple**: Batch, add streaming when needed
- **Cost-sensitive**: Batch for most, streaming for critical paths

---

## Listen For Yourself Saying

✅ "Batch is simple and cheap but has high latency - streaming is complex and expensive but has low latency"
✅ "We need to understand latency requirements to choose between batch and streaming"
✅ "Lambda gives us both but at the cost of complexity - Kappa simplifies but reprocessing is expensive"
✅ "We can start with batch and add streaming when latency requirements emerge"
