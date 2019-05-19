var numJewelsInStones = function (J, S) {
    let count = 0;
    for (let i = 0; i < S.length; i++) {
        const stone = S[i];
        
        if(J.includes(stone)){
            count += 1;
        }
    }
    return count;
};