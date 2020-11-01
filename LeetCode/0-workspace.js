function combinationSumRecursive({
    candidates,
    remainingSum,
    finalCombinations = [],
    currentCombination = [],
    startFrom = 0,
}) {
    if (remainingSum < 0) {
        return;
    }

    if (remainingSum === 0) {
        finalCombinations.push(currentCombination.slice());
        return;
    }

    for (let candidateIndex = startFrom; candidateIndex < candidates.length; candidateIndex += 1) {
        const currentCandidate = candidates[candidateIndex];
        currentCombination.push(currentCandidate);

        combinationSumRecursive({
            candidates,
            remainingSum: remainingSum - currentCandidate,
            finalCombinations,
            currentCombination,
            startFrom: candidateIndex,
        });

        currentCombination.pop();
    }

    return finalCombinations;
}