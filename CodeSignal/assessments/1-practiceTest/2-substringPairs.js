function substringPairs(s, k) {
    let subs = [];

    for (let i = 0; i < s.length; i++) {
        let current = s[i];
        let sub = [current]

        for (let j = i + 1; j < s.length; j++) {
            let subCurrent = s[j];
            sub.push(subCurrent);

            subs.push(sub.slice(0));
        }
    }

    return subs;
}

function diff 