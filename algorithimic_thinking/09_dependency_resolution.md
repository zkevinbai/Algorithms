# Problem 9: Dependency Resolution

## Prompt

Tasks depend on other tasks. Determine execution order and recomputation on change.

---

## Key Concepts

- DAGs
- Cycle detection
- Partial recomputation

## Variations

- Incremental updates
- Failure isolation

---

## Practice: 30-Minute Drill

### 1. Problem Framing (5 min)

**Restate the problem:**
- We have tasks that depend on other tasks (dependency graph)
- Tasks must be executed in an order that respects dependencies (topological order)
- When a task changes, dependent tasks must be recomputed
- We need to determine what to recompute and in what order

**Clarify constraints:**
- What are tasks? (Build steps? Data processing? Computations?)
- What is the dependency structure? (DAG? May have cycles?)
- What triggers recomputation? (Source change? Manual trigger?)
- What is the cost of recomputation? (Some tasks expensive?)
- Do we need to detect cycles? (Yes? No? Assume DAG?)

**Bounded vs Unbounded:**
- **Bounded**: Number of tasks is typically bounded (though may be large)
- **Online**: Must handle changes as they occur, cannot wait

**Key Questions:**
- How do we represent dependencies? (Graph? Explicit list?)
- How do we detect what changed? (Dirty tracking? Event-driven?)
- How do we minimize recomputation? (Only recompute what's needed?)
- How do we handle failures? (Retry? Skip? Isolate?)

---

### 2. Candidate Approaches (10 min)

#### Approach 1: Full Recompute

**Description:**
- On any change, recompute all tasks
- Use topological sort to determine execution order
- Execute all tasks in dependency order

**Pros:**
- Simple: No need to track what changed
- Always correct: No risk of missing dependencies
- Easy to reason about: Clear semantics

**Cons:**
- **Expensive**: Recomputes everything even if only one task changed
- **Slow**: O(n) where n = number of tasks
- **Wasteful**: Recomputes unchanged tasks

#### Approach 2: Dirty Tracking with Topological Sort

**Description:**
- Mark tasks as "dirty" when they or their dependencies change
- Use topological sort to find execution order
- Only execute dirty tasks and their dependents

**Pros:**
- **Efficient**: Only recomputes what's needed
- **Fast**: O(dirty_tasks + dependents) instead of O(all_tasks)
- **Scalable**: Handles large dependency graphs

**Cons:**
- **Complexity**: Must track dependencies and dirty state
- **Dependency tracking**: Must maintain dependency graph
- **Cycle detection**: Must detect cycles (if not assuming DAG)

#### Approach 3: Event-Driven with Dependency Graph

**Description:**
- Maintain dependency graph (adjacency list or matrix)
- On task change, emit event
- Listeners (dependent tasks) react to events
- Execute tasks as events propagate

**Pros:**
- **Decoupled**: Tasks don't need to know dependents
- **Reactive**: Automatically propagates changes
- **Flexible**: Easy to add/remove dependencies

**Cons:**
- **Complexity**: Event infrastructure needed
- **Ordering**: Must ensure tasks execute in correct order
- **Cycles**: Must detect and handle cycles

#### Approach 4: Incremental Build System (Make-like)

**Description:**
- Like Make: track file timestamps, compare with outputs
- Only rebuild if input is newer than output
- Use dependency graph to determine what to rebuild

**Pros:**
- **Efficient**: Only rebuilds what's needed
- **Proven**: Make has been used for decades
- **Timestamp-based**: Simple change detection

**Cons:**
- **Timestamp issues**: Clock skew, file system limitations
- **Not perfect**: May miss some changes (content change, same timestamp)
- **File-based**: Assumes file-based tasks

#### Approach 5: Content-Based Hashing (Bazel-like)

**Description:**
- Compute hash of task inputs (content, not timestamp)
- Compare hash with stored hash
- Only recompute if hash changed
- Use dependency graph for execution order

**Pros:**
- **Accurate**: Detects all changes (content-based)
- **Deterministic**: Same inputs = same hash = skip recomputation
- **Efficient**: Only recomputes when inputs actually changed

**Cons:**
- **Hash computation**: Must hash all inputs (may be expensive)
- **Storage**: Must store hashes for all tasks
- **Complexity**: More complex than timestamp-based

---

### 3. Tradeoffs & Scaling (10 min)

#### Time Complexity

| Approach | Change Detection | Execution Order | Execution |
|----------|------------------|-----------------|-----------|
| Full Recompute | O(1) | O(V + E) topological sort | O(n) all tasks |
| Dirty Tracking | O(1) mark dirty | O(V + E) for dirty subgraph | O(dirty + dependents) |
| Event-Driven | O(1) emit event | O(V + E) event propagation | O(dirty + dependents) |
| Make-like | O(1) check timestamp | O(V + E) topological sort | O(changed + dependents) |
| Content Hash | O(inputs) hash | O(V + E) topological sort | O(changed + dependents) |

Where V = vertices (tasks), E = edges (dependencies)

#### Space Complexity

| Approach | Space |
|----------|-------|
| Full Recompute | O(V + E) - dependency graph |
| Dirty Tracking | O(V + E) - graph + dirty flags |
| Event-Driven | O(V + E) - graph + event queue |
| Make-like | O(V + E) - graph + timestamps |
| Content Hash | O(V + E) - graph + hashes |

#### Accuracy

| Approach | Change Detection | Missed Changes |
|----------|------------------|----------------|
| Full Recompute | N/A (always recomputes) | None |
| Dirty Tracking | Manual/event-based | If not marked dirty |
| Event-Driven | Event-based | If event lost |
| Make-like | Timestamp-based | Content change, same timestamp |
| Content Hash | Content-based | None (if hash correct) |

#### What Breaks at 10× / 100×?

**10× more tasks:**
- Full Recompute: **10× slower** - becomes unacceptable
- Dirty Tracking: Still efficient (only recomputes dirty)
- Event-Driven: Event queue may grow, but still efficient
- Make-like: Timestamp checks 10× more, but still O(1) per task
- Content Hash: Hash computation 10× more, but still manageable

**10× more dependencies:**
- All approaches: Graph larger, topological sort slower
- Full Recompute: Still recomputes all (wasteful)
- Dirty Tracking: Still only recomputes dirty (efficient)
- Event-Driven: More events to propagate (but still efficient)

**10× higher change rate:**
- Full Recompute: **Fails** - recomputes everything too frequently
- Dirty Tracking: Still efficient (only recomputes what changed)
- Event-Driven: More events, but still handles well
- Make-like: More timestamp checks, but still O(1) per check
- Content Hash: More hash computations, but still manageable

**Deep dependency chains:**
- All approaches: Must traverse long chains
- Full Recompute: Recomputes entire chain (wasteful)
- Dirty Tracking: Only recomputes chain from changed task (efficient)
- Event-Driven: Events propagate along chain (efficient)

---

### 4. Failure & Evolution (5 min)

#### How Does This Fail?

**Full Recompute:**
- **Slow**: O(n) becomes unacceptable for large n
- **Wasteful**: Recomputes unchanged tasks
- **Not scalable**: Fails for large dependency graphs or frequent changes

**Dirty Tracking:**
- **Complexity**: Must maintain dependency graph and dirty state
- **Missed updates**: If task not marked dirty, dependents won't recompute
- **Cycle detection**: Must detect cycles (if not assuming DAG)
- **State management**: Dirty state must be persistent (survive restarts)

**Event-Driven:**
- **Lost events**: If event is lost, dependents won't recompute
- **Ordering**: Events may arrive out of order (must handle)
- **Complexity**: Event infrastructure adds complexity
- **Cycles**: Must detect and handle cycles

**Make-like:**
- **Timestamp issues**: Clock skew, file system limitations
- **Missed changes**: Content change with same timestamp not detected
- **File-based**: Assumes file-based tasks (not general)
- **Not perfect**: May rebuild unnecessarily or miss changes

**Content Hash:**
- **Hash cost**: Computing hashes for all inputs may be expensive
- **Storage**: Must store hashes (overhead)
- **Complexity**: More complex than timestamp-based
- **Input tracking**: Must track all inputs (may be hard for some tasks)

#### How Would You Evolve It?

**Hybrid approach:**
- Use content hash for accuracy
- Use dirty tracking for efficiency
- Combine: Hash to detect changes, dirty tracking to minimize recomputation

**Parallel execution:**
- Identify independent tasks (no dependencies between them)
- Execute independent tasks in parallel
- Use topological sort to find parallel execution order
- Significantly faster for large graphs

**Incremental state:**
- For tasks that support it, use incremental updates
- Only recompute changed parts of task output
- Reduces recomputation cost even further

**Caching:**
- Cache task outputs (content-addressed)
- Skip recomputation if inputs haven't changed (hash match)
- Combine with content hashing for perfect caching

**Failure isolation:**
- If task fails, don't fail entire build
- Mark failed task and dependents as failed
- Continue with other independent tasks
- Retry failed tasks

---

## Knowledge Deep Dive

### Topological Sort

**Algorithm**: Kahn's algorithm or DFS-based

**Kahn's algorithm:**
1. Find all nodes with no incoming edges (sources)
2. Remove sources and their outgoing edges
3. Repeat until no nodes left
4. If nodes remain, cycle exists

**Time complexity**: O(V + E) where V = vertices, E = edges

### Cycle Detection

**Problem**: Dependency graph may have cycles (A depends on B, B depends on A).

**Detection:**
- **DFS with coloring**: Mark nodes as white (unvisited), gray (visiting), black (visited)
- If we encounter gray node during DFS, cycle exists
- **Topological sort**: If topological sort fails (nodes remain), cycle exists

**Handling:**
- **Error**: Report cycle as error (invalid dependency graph)
- **Break cycle**: Remove one dependency to break cycle (may be incorrect)
- **Strongly connected components**: Treat cycles as single unit

### Dirty Tracking

**Marking dirty:**
- When task changes, mark task as dirty
- Propagate dirty to all dependents (transitive closure)
- Use DFS or BFS to mark all reachable nodes

**Execution:**
- Topological sort of dirty subgraph
- Execute only dirty tasks
- Clear dirty flags after execution

### When to Use What

- **Small graphs, infrequent changes**: Full recompute
- **Large graphs, frequent changes**: Dirty tracking or content hash
- **File-based tasks**: Make-like (timestamp-based)
- **Need perfect accuracy**: Content hash
- **Event-driven architecture**: Event-driven with dependency graph
- **Build systems**: Content hash (Bazel) or timestamp (Make)

---

## Listen For Yourself Saying

✅ "We need to find the transitive closure of dependencies to know what to recompute"
✅ "Topological sort gives us the execution order that respects dependencies"
✅ "Dirty tracking lets us only recompute what changed, not everything"
✅ "Content hashing is more accurate than timestamps for change detection"
