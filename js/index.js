// const colors = require('colors');

var wordSearchApp = angular.module('wordSearchApp', []);

wordSearchApp.controller('GridController', function ($scope) {

    $scope.size = 30;
    let grid = [];
    function gridLetter(char, isWord, word) {
        return {
            char: char,
            isWord: isWord,
            word: word
        };
    }

    function buildRandomGrid() {
        console.log($scope.size);
        for (let i = 0; i < $scope.size * $scope.size; i++) {
            //65 A
            //97 a
            var offset = Math.floor(Math.random() * 26) + 97;
            var char = String.fromCharCode(offset);
            var gl = new gridLetter(char, false);
            grid.push(gl);
        }
    }

    function renderGrid() {
        $scope.gridRows = [];
        let line = undefined;
        for (let i = 0; i < $scope.size * $scope.size; i++) {
            if (i % $scope.size == 0) {
                if (line)
                    $scope.gridRows.push(line);
                line = [];
            }
            line.push(grid[i]);
        }
        $scope.gridRows.push(line);
    }

    function addWord(word, x, y, direction) {
        //direction gives us our offset
        let offset = 1;
        switch (direction) {
            case 'across':
                offset = 1;
                break;
            case 'down':
                offset = $scope.size;
                break;
            case 'nwse':
                offset = $scope.size + 1;
                break;
            case 'senw':
                offset = ($scope.size + 1) * -1;
                break;
            case 'swne':
                offset = 1 - ($scope.size);
                break;
            case 'nesw':
                offset = $scope.size - 1;
                break;
        }

        //Will the word fit?
        let position = y * $scope.size + x;

        const wontFit = false;
        for (let i = 0; i < word.length; i++) {
            if (position < 0 || position > ($scope.size * $scope.size)) {
                //Failed -- off the grid
                wontFit = true;
            }

            
            
        }

        if (wontFit)
            return wontFit;

        position = y * $scope.size + x;

        for (let i = 0; i < word.length; i++) {
            let gl = new gridLetter(word[i], true, word);
            grid[position] = gl;
            position += offset;
        }

        return true;

    }

    buildRandomGrid();

    function getWordList() {
        console.log($scope.words);
        let words = $scope.words.split('\n');
        return words;
    }

    function addWords(words) {
        const directions = ['down', 'nwse', 'across', 'senw', 'swne', 'nesw'];
        words.forEach(word => {
            const x = Math.floor(Math.random() * $scope.size);
            const y = Math.floor(Math.random() * $scope.size);

            const direction = Math.floor(Math.random() * 5);
            let repeat = 100;
            let success = false;
            while (repeat-- > 0 && ! success) {
                success = addWord(word, x, y, directions[direction]);
            }
        });

    }

    $scope.buildGrid = function () {
        $scope.gridRows = [];
        grid = [];
        buildRandomGrid();
        let words = getWordList();
        console.log(words);
        addWords(words);
        renderGrid();

    };


    $scope.words = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'and', 'violet'].join('\n');
    renderGrid();

});

