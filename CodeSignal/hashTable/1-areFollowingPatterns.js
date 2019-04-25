// input
    // an array of strings, an array of patterns
// output
    // a boolean determining if the strings array follows the patterns array
// strategy
    // generate all combinations of index positions
    // check for equality in the pattern string
        // confirm that the boolean result of that equality matches
        // the input string

function areFollowingPatterns(strings, patterns) {
    let indices = [];

    for (let i = 0; i < patterns.length; i++) {
        for (let j = i+1; j < patterns.length; j++) {
            indices.push([i,j])
        }        
    }

    for (let i = 0; i < indices.length; i++) {
        let indexArray = indices[i];
        let indexLeft = indexArray[0];
        let indexRight = indexArray[0];
        
        let patternsBoolean;

        if(patterns[indexLeft] === patterns[indexRight]){
            patternsBoolean = true;
        } else {
            patternsBoolean = false;
        }

        let stringsBoolean;
        
        if (strings[indexLeft] === strings[indexRight]) {
            stringsBoolean = true;
        } else {
            stringsBoolean = false;
        }

        if(stringsBoolean !== patternsBoolean){
            return false;
        }
    }

    return true;
}   
