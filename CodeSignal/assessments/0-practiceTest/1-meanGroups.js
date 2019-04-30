// input
    // array of arrays a

// output
    // group the arrays a[i] by their mean values
    // each group should have the index of the array
    // return answer as array of arrays;

// solved; poor 9/14

function meanGroups(a) {
    let averages = {};

    for (let index = 0; index < a.length; index++) {
        const subArray = a[index];
        const mean = subArray.reduce((acc, val) => acc + val)/subArray.length;

        if (averages[mean]){
            averages[mean].push(index);
        } else {
            averages[mean] = [index];
        }
    }

    return Object.values(averages).sort((a,b) => {
        let minA = a[0];

        for (let index = 0; index < a.length; index++) {
            const number = a[index];
            if (number < minA){
                minA = number;
            }
        }

        let minB = b[0];

        for (let index = 0; index < b.length; index++) {
            const number = b[index];
            if (number < minB) {
                minB = number;
            }
        }
        
        return minA < minB;
    });
}
