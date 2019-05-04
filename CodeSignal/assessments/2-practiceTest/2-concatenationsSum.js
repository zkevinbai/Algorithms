// solved but was too slow

function concatenationsSum(a) {
    let allNumbers = [];

    for (let i = 0; i < a.length; i++) {
        const stringNumberI = a[i] + "";
        for (let j = 0; j < a.length; j++) {
            const stringNumberJ = a[j] + "";

            let combined = stringNumberI + stringNumberJ;
            combined = parseInt(combined);
            allNumbers.push(combined);
        }   
    }

    return allNumbers.reduce((accumulator, currentValue) => accumulator + currentValue);
}
