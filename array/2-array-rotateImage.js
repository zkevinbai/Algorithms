// O(1) space

function rotateImage(a) {
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length; j++) {
            a[i].unshift( a.shift() )
        }
    }

    return a;
}
