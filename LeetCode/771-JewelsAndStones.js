var numJewelsInStones = function (J, S) {
    //     iterate through stones
    const stoneCount = {};

    for (let i = 0; i < S.length; i++) {
        const stone = S[i];

        if (stoneCount[stone]) {
            stoneCount[stone] += 1
        } else {
            stoneCount[stone] = 1
        }
    }

    let jewelCount = 0;

    const jewels = J.split("");

    jewels.forEach((jewel => {
        const count = stoneCount[jewel]

        if (count) {
            jewelCount += count
        }
    }))

    return jewelCount
};

// var numJewelsInStones = function (J, S) {
//     let count = 0;
//     for (let i = 0; i < S.length; i++) {
//         const stone = S[i];
        
//         if(J.includes(stone)){
//             count += 1;
//         }
//     }
//     return count;
// };