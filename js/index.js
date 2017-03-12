// const colors = require('colors');

const size = 40;

const grid = [];
function gridLetter(char, isWord, word) {
    return {
        char: char,
        isWord: isWord,
        word: word
    };
}

function buildRandomGrid() {
    for (let i = 0; i < size * size; i++) {
        //65 A
        //97 a
        var offset = Math.floor(Math.random() * 26) + 65;
        var char = String.fromCharCode(offset);
        var gl = new gridLetter(char, false);
        grid.push(gl);
    }
}

function printGrid() {
    let line = [];
    for (let i = 0; i < size * size; i++) {
        if (i % size == 0) {
            console.log(line.join(''));
            line = [];
        }

        if (grid[i].isWord) {
            line.push(grid[i].char);
        } else {
            line.push(grid[i].char);
        }

    }
}

function addWord(rawWord, x, y, direction) {
    const word = rawWord.toUpperCase();
    //direction gives us our offset
    let offset = 1;
    switch (direction) {
        case 'down':
            offset = size;
            break;
        case 'nwse':
            offset = size + 1;
            break;
    }
    
    let position = y * size + x;

    for (let i = 0; i < word.length; i++) {
        let gl = new gridLetter(word[i], true, word);
        grid[position] = gl;
        position += offset;
    }
}

buildRandomGrid();

addWord('sophie', 1, 1);
addWord('louise', 10, 10, 'down');
addWord('higham', 20, 20, 'nwse');

printGrid();


