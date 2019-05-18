function wordCount(board, word) {
//  generate all horizontals
    let horizontal = board.map( sub => sub.join(""));
    
//  generate all verticals
    let vertical = [];
    for(let i = 0; i < board[0].length; i++){
        vertical.push([]);
    }
    
    for(let i = 0; i < board.length; i++){
        let row = board[i];
        
        for(let j = 0; j < row.length; j++){
            vertical[j].push(row[j]);
        }
    }
    
    vertical = vertical.map( sub => sub.join(""));
    
//  generate all diagonals
    let diagonal = [];
        
    if(board.length >= word.length){
        for(let i = 0; i < board[0].length; i++){
            let sub = [board[0][i]];

            let level = board.length - (board.length - i);

            if(i === 0) level += 1;

            while(level < word.length){
                sub.push(board[level][i + 1]);

                level += 1;
            }

            diagonal.push(sub);
        }
    }
    
    diagonal = diagonal.map( sub => sub.join(""));
    
//  count instances of the word

    let count = 0;
    
    horizontal.forEach( hWord => {
        if(hWord.includes(word)) count += 1
    });
    vertical.forEach( vWord => {
        if(vWord.includes(word)) count += 1
    });    
    diagonal.forEach( dWord => {
        if(dWord.includes(word)) count += 1
    });
    
    console.log(diagonal)
    
    return count;
}
