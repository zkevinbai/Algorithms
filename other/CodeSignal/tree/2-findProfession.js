// e
// ed
// eded
// ededed

//         E
//      /         \
//     E           D
//     /   \        /  \
//     E     D      D    E
//     / \   / \    / \   / \
//     E   D D   E  D   E E   D

// input
    // level and position

// output
    // profession of the individual

// strategy
    // for each level, 
        // double ed pattern, 
            // for each e, push ed, for each d, push de
        // replace current level
    // at target level
        // key in with n -1 

// Phase 3 someone else's code
function findProfession(level, pos) {
    if (level == 1) {
        return "Engineer"
    }
    if (pos % 2 == 0) {
        if (findProfession(level - 1, pos / 2) == "Doctor") {
            return "Engineer"
        } else {
            return "Doctor"
        }
    } else {
        // console.log(findProfession(level-1, pos+1/2))
        // console.log(findProfession(level-1, pos+1/2))
        return findProfession(level - 1, (pos + 1) / 2)
    }
}

// Phase 2, still too much storage
function findProfession(level, pos) {
    if (level === 1) return "Engineer";

    let counter = 1;
    let currentLevel = [1, 0];

    while (counter < level) {
        let nextLevel = [];

        for (let i = 0; i < currentLevel.length; i++) {
            let profession = currentLevel[i];

            if (profession === 1) {
                nextLevel.push(1);
                nextLevel.push(0);
            } else if (profession === 0) {
                nextLevel.push(0);
                nextLevel.push(1);
            }
        }

        currentLevel = nextLevel;
        counter += 1;
    }

    if(currentLevel[pos - 1]) return "Engineer";
    return "Doctor";
}

// Phase 1 too much storage
// function findProfession(level, pos) {
//     debugger;
//     if(level === 1)return "Engineer";

//     let counter = 1;
//     let currentLevel = ["Engineer", "Doctor"];

//     while(counter < level){
//         let nextLevel = [];

//         for (let i = 0; i < currentLevel.length; i++) {
//             let profession = currentLevel[i];

//             if (profession === "Engineer"){
//                 nextLevel.push("Engineer");
//                 nextLevel.push("Doctor");
//             } else if (profession === "Doctor") {
//                 nextLevel.push("Doctor");
//                 nextLevel.push("Engineer");
//             }
//         }

//         currentLevel = nextLevel;
//         counter += 1;
//     }

//     return currentLevel[pos - 1];
// }
