// array a contains only numbers from length 1 to a.length 
// return the number of duplicate
// return -1 if no duplicates
// if multiple duplicates return the number for which the second occurance has the minimal index

function firstDuplicate(a) {
    let numbersTracker = {};
    let duplicateIndices = [];

    a.forEach( (number, index) => {
        let val = numbersTracker[number];

        if (!val){
            numbersTracker[number] = [index]
        } else {
            numbersTracker[number] = [index]
            duplicateIndices.push(index);
        }
    } )

    if (!duplicateIndices.length) return -1;
    return a[duplicateIndices[0]]
}
