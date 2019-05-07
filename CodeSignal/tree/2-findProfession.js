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

function findProfession(level, pos) {
    debugger;
    if(level === 1)return "Engineer";

    let counter = 1;
    let currentLevel = ["Engineer", "Doctor"];

    while(counter < level){
        let nextLevel = [];

        for (let i = 0; i < currentLevel.length; i++) {
            let profession = currentLevel[i];

            if (profession === "Engineer"){
                nextLevel.push("Engineer");
                nextLevel.push("Doctor");
            } else if (profession === "Doctor") {
                nextLevel.push("Doctor");
                nextLevel.push("Engineer");
            }
        }

        currentLevel = nextLevel;
        counter += 1;
    }

    return currentLevel[pos - 1];
}
