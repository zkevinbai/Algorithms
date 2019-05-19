var reverseString = function (s) {
    let counter = (s.length - 1)/ 2;

    let start = 0;
    let end = s.length - 1;

    while(counter){
        if(start !== end){
            let memoS = s[start];
            let memoE = s[end];

            s[start], s[end] = memoE, memoS;
        }

        start -= 1;
        end += 1;
        counter -= 1;
    }

    return s;
};