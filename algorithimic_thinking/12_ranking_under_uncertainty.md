# Problem 12: Ranking Under Uncertainty

## Prompt

Rank items when signals are noisy or incomplete.

---

## Key Concepts

- Stability
- Drift
- Feedback loops

## Variations

- Multi-signal ranking
- Time-decay ranking
- Personalized ranking

---

## Practice: 30-Minute Drill

### 1. Problem Framing (5 min)

**Restate the problem:**
- We need to rank items (products, content, users, etc.)
- Ranking signals (scores, features) are noisy, incomplete, or uncertain
- Signals may change over time (drift)
- We need stable, accurate rankings despite uncertainty

**Clarify constraints:**
- What are we ranking? (Products? Content? Search results?)
- What are the signals? (Ratings? Clicks? Sales? Features?)
- How noisy are signals? (High noise? Low noise?)
- How complete are signals? (All items have signals? Some missing?)
- What is the ranking purpose? (Recommendations? Search? Discovery?)

**Bounded vs Unbounded:**
- **Bounded**: Number of items is typically bounded (though may be very large)
- **Online**: Signals may arrive continuously, rankings may need updates

**Key Questions:**
- How do we combine multiple signals?
- How do we handle missing signals?
- How do we handle signal noise?
- How do we prevent ranking instability (items jumping around)?
- How do we handle concept drift (signals change over time)?

---

### 2. Candidate Approaches (10 min)

#### Approach 1: Simple Score Aggregation

**Description:**
- Combine signals into single score (weighted sum, product, etc.)
- Rank by score
- Update ranking when signals change

**Pros:**
- Simple: Easy to implement
- Fast: O(n log n) to sort by score
- Interpretable: Clear how ranking is computed

**Cons:**
- **Instability**: Small signal changes cause large ranking changes
- **Noise sensitivity**: Noisy signals cause unstable rankings
- **Missing signals**: Hard to handle missing signals
- **No uncertainty handling**: Doesn't account for signal uncertainty

#### Approach 2: Bayesian Ranking

**Description:**
- Model signal uncertainty (prior + observations)
- Use Bayesian inference to estimate "true" score
- Rank by posterior mean or confidence interval

**Pros:**
- **Handles uncertainty**: Accounts for signal noise
- **Stable**: Prior provides stability (items with few signals don't jump)
- **Theoretically sound**: Bayesian framework is well-founded

**Cons:**
- **Complexity**: More complex than simple aggregation
- **Prior selection**: Must choose priors (may be arbitrary)
- **Computational cost**: Bayesian inference may be expensive

#### Approach 3: Confidence-Weighted Ranking

**Description:**
- Weight signals by confidence (more confident signals weighted more)
- Use confidence intervals for ranking (lower bound, upper bound)
- Rank by conservative estimate (e.g., lower bound of confidence interval)

**Pros:**
- **Handles uncertainty**: Confidence weighting reduces impact of noisy signals
- **Stable**: Conservative estimates prevent wild swings
- **Interpretable**: Confidence scores are understandable

**Cons:**
- **Conservative**: May rank items too conservatively
- **Confidence estimation**: Must estimate confidence (may be hard)
- **Tuning**: Must tune confidence thresholds

#### Approach 4: Time-Decay Ranking

**Description:**
- Apply time decay to signals (recent signals weighted more)
- Combine decayed signals into score
- Rank by time-weighted score

**Pros:**
- **Handles drift**: Recent signals more important (adapts to change)
- **Stable for recent**: Recent rankings are stable
- **Simple**: Easy to implement

**Cons:**
- **Forgets history**: Old signals become irrelevant
- **May be too reactive**: Overreacts to recent changes
- **Decay rate**: Must tune decay rate

#### Approach 5: Multi-Armed Bandit Ranking

**Description:**
- Treat ranking as exploration vs exploitation problem
- Balance showing high-scoring items (exploitation) vs exploring new items (exploration)
- Use Thompson Sampling or UCB for ranking

**Pros:**
- **Handles uncertainty**: Exploration reduces uncertainty
- **Adaptive**: Learns from feedback
- **Theoretically optimal**: Bandit algorithms are well-studied

**Cons:**
- **Complexity**: More complex than simple ranking
- **Exploration cost**: May show suboptimal items for exploration
- **Feedback needed**: Requires user feedback (clicks, ratings, etc.)

---

### 3. Tradeoffs & Scaling (10 min)

#### Time Complexity

| Approach | Update Signal | Compute Ranking |
|----------|---------------|-----------------|
| Simple Aggregation | O(1) | O(n log n) |
| Bayesian | O(1) update, O(1) inference | O(n log n) |
| Confidence-Weighted | O(1) | O(n log n) |
| Time-Decay | O(1) | O(n log n) |
| Multi-Armed Bandit | O(1) | O(n log n) |

#### Stability

| Approach | Stability | Reactivity |
|----------|-----------|------------|
| Simple Aggregation | Low (sensitive to noise) | High (reacts immediately) |
| Bayesian | High (prior provides stability) | Medium (adapts gradually) |
| Confidence-Weighted | High (conservative) | Low (slow to change) |
| Time-Decay | Medium (recent stable) | High (reacts to recent) |
| Multi-Armed Bandit | Medium (exploration adds noise) | High (adapts to feedback) |

#### Handling Uncertainty

| Approach | Noise Handling | Missing Signals | Drift Handling |
|---------|----------------|----------------|---------------|
| Simple Aggregation | Poor | Poor | Poor |
| Bayesian | Good (prior smooths) | Good (prior fills gaps) | Medium (adapts) |
| Confidence-Weighted | Good (weights by confidence) | Medium (low confidence for missing) | Poor |
| Time-Decay | Medium (recent weighted more) | Poor | Good (forgets old) |
| Multi-Armed Bandit | Good (exploration reduces uncertainty) | Good (explores missing) | Good (adapts) |

#### What Breaks at 10× / 100×?

**10× more items:**
- All approaches: Ranking computation 10× slower (O(n log n))
- May need to rank only top-K (not all items)
- Or use approximate ranking (sampling, indexing)

**10× more signals:**
- Simple Aggregation: Must combine more signals (complexity)
- Bayesian: More parameters to estimate (complexity)
- Confidence-Weighted: More confidence scores to compute
- All: Signal combination becomes more complex

**10× noisier signals:**
- Simple Aggregation: **Fails** - rankings become very unstable
- Bayesian: Still works (prior provides stability)
- Confidence-Weighted: Still works (weights reduce noise impact)
- Time-Decay: May overreact to noisy recent signals
- Multi-Armed Bandit: Exploration helps reduce uncertainty

**10× faster signal changes (drift):**
- Simple Aggregation: Rankings change too frequently (unstable)
- Bayesian: May be too slow to adapt (prior too strong)
- Confidence-Weighted: May be too conservative (slow to adapt)
- Time-Decay: **Good** - adapts quickly to recent changes
- Multi-Armed Bandit: Adapts well to feedback

---

### 4. Failure & Evolution (5 min)

#### How Does This Fail?

**Simple Aggregation:**
- **Instability**: Small signal changes cause large ranking changes
- **Noise sensitivity**: Noisy signals make rankings unreliable
- **Missing signals**: Hard to rank items with missing signals
- **No uncertainty**: Doesn't account for signal quality

**Bayesian:**
- **Prior selection**: Must choose priors (may be arbitrary or wrong)
- **Computational cost**: Bayesian inference may be expensive
- **Complexity**: More complex than needed for simple cases
- **Adaptation speed**: May be too slow to adapt (prior too strong)

**Confidence-Weighted:**
- **Conservative**: May rank items too conservatively (miss opportunities)
- **Confidence estimation**: Hard to estimate confidence accurately
- **Tuning**: Must tune confidence thresholds
- **Slow adaptation**: May be too slow to adapt to changes

**Time-Decay:**
- **Forgets history**: Old signals become irrelevant (may lose important patterns)
- **Overreaction**: May overreact to recent noisy signals
- **Decay rate**: Must tune decay rate (too fast = unstable, too slow = stale)
- **No uncertainty handling**: Doesn't account for signal uncertainty

**Multi-Armed Bandit:**
- **Exploration cost**: Shows suboptimal items for exploration (user experience)
- **Feedback needed**: Requires user feedback (may not be available)
- **Complexity**: More complex than simple ranking
- **Cold start**: Poor performance for new items (no feedback yet)

#### How Would You Evolve It?

**Hybrid approach:**
- Use Bayesian for stability (prior)
- Use time-decay for adaptation (recent signals weighted more)
- Combine: Stable prior + adaptive recent signals

**Multi-signal fusion:**
- Combine multiple signals with learned weights
- Use machine learning to learn optimal weights
- Adapt weights based on feedback

**Personalized ranking:**
- Different rankings for different users
- Use user features to personalize
- Balance personalization vs exploration

**Stability mechanisms:**
- Add hysteresis (ranking changes only if score difference > threshold)
- Smooth ranking changes over time
- Use moving averages instead of instantaneous scores

**Feedback loops:**
- Monitor ranking performance (clicks, conversions, etc.)
- Adjust ranking algorithm based on feedback
- Prevent feedback loops (popular items become more popular)

---

## Knowledge Deep Dive

### Bayesian Ranking

**Basic idea**: Start with prior belief about item quality, update with observations.

**Example (ratings):**
- Prior: Beta distribution (assumes items start with some average rating)
- Observations: User ratings
- Posterior: Updated Beta distribution
- Rank by: Posterior mean or lower confidence bound

**Benefits:**
- Items with few ratings don't jump to top (prior provides stability)
- Accounts for uncertainty (items with few ratings have wide confidence intervals)
- Theoretically sound (Bayesian framework)

### Confidence Intervals

**Lower confidence bound (LCB):**
- Rank by lower bound of confidence interval
- Conservative: Prevents items with uncertain scores from ranking too high
- Example: Item with score 4.5 ± 1.0 ranks lower than item with 4.0 ± 0.1

**Upper confidence bound (UCB):**
- Rank by upper bound (for exploration)
- Optimistic: Explores items with high potential
- Used in multi-armed bandits

### Time Decay

**Exponential decay:**
- Weight = e^(-λt) where t = age, λ = decay rate
- Recent signals weighted more
- Tune λ: Large λ = fast decay (forgets quickly), small λ = slow decay (remembers longer)

**Linear decay:**
- Weight = max(0, 1 - t/T) where T = window size
- Simpler than exponential
- Hard cutoff at T

### Feedback Loops

**Problem**: Popular items get more exposure → more signals → higher ranking → more exposure (positive feedback loop).

**Solutions:**
1. **Diversity**: Ensure diversity in rankings (not all popular items)
2. **Exploration**: Show new/less popular items (multi-armed bandit)
3. **Time decay**: Reduce weight of old signals (prevents items from staying popular forever)
4. **Fairness**: Ensure fair representation (not just popularity)

### When to Use What

- **Simple case, low noise**: Simple aggregation
- **High noise, need stability**: Bayesian or confidence-weighted
- **Rapidly changing signals**: Time-decay
- **Need exploration**: Multi-armed bandit
- **Complex signals**: Machine learning-based ranking
- **Personalization needed**: Personalized ranking models

---

## Listen For Yourself Saying

✅ "We need to balance stability (consistent rankings) with reactivity (adapting to changes)"
✅ "Signal uncertainty requires us to use confidence intervals or Bayesian methods"
✅ "Time decay helps handle concept drift, but we need to tune the decay rate"
✅ "Feedback loops can cause popular items to dominate - we need diversity mechanisms"
