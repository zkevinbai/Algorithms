function splitNumber(number, k) {
    if (!number.length) return [""];
    if (k < 1) return [""];

    let numArray = number.split("");

    let answer = [];
    while (numArray.length > k) {
        let split = [];

        while (split.length < k) {
            let shift = numArray.shift();

            split.push(shift);

            if (split[0] === "0") split.shift();
        }

        answer.push(split)
    }

    if (numArray.length) {
        while (numArray[0] === "0" && numArray.length !== 1) {
            numArray.shift();
        }

        answer.push(numArray);
    }

    answer = answer.map(el => el.join(""));

    if (answer.length === 1 && answer[0] === "") return ["0"];

    return answer
}
