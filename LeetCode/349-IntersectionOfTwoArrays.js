function intersection(arrayM, arrayN) {
    let hash = {};

    arrayM.forEach(number => {
        hash[number] = true;
    });

    let intersect = {};

    arrayN.forEach(number => {
        if (hash[number]) {
            intersect[number] = number
        }
    });

    return Object.values(intersect);
}
