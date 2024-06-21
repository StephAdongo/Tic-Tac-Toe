class Gameboard {
    constructor (rows,cols) {
        this.rows = rows;
        this.cols = cols;
        this.board = [];

        for (let i = 0; i < rows; i++) {
            this.board.push([]);
            for (let j = 0; j < cols; j++) {
                this.board[i].push(null);
            }
        }
    }
    getCell(row, col) {
        if (row >= 0 && row < this.rows && col < this.cols) {
            return this.board[row][col];
        } else {
            return null;
        }
    }
    setCell(row, col, value) {
        if (row >= 0 && row < this.rows && col >= 0 && col< this.cols) {
            this.board[row][col] = value;
        } else {
            console.error ("Cell out of bounds!");
        }
    }
}

class Player {
    constructor (name, symbol) {
        this.name = name;
        this.symbol = symbol;
    }
    
}