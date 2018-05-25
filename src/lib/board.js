var toColumn = {
  "a": 0,
  "b": 1,
  "c": 2,
  "d": 3,
  "e": 4,
  "f": 5,
  "g": 6,
  "h": 7,
};

var toRow = {
  "1": 7,
  "2": 6,
  "3": 5,
  "4": 4,
  "5": 3,
  "6": 2,
  "7": 1,
  "8": 0,
}

export default class Board {

  constructor() {
    this.numberCheckmate = 0;
    this.numberCheck = 0;
    this.numberStalemate = 0;
    this.numberSafe = 0;

    this.board = new Array(8);
    for(let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(Board.BLANK, Board.BLANK, Board.BLANK, Board.BLANK, Board.BLANK, Board.BLANK, Board.BLANK, Board.BLANK);
    }
  }

  static get AMAZON() {
    return "A";
  }
  static get BLANK() {
    return "B";
  }
  static get CHECK() {
    return "+";
  }
  static get KING() {
    return "K";
  }
  static get SAFE() {
    return "O";
  }
  static get CHECKMATE() {
    return "X";
  }
  static get STALEMATE() {
    return "S";
  }

  execute(king, amazon) {
    let row, column;

    [column, row] = [...king];
    this._kingRow = toRow[row];
    this._kingColumn = toColumn[column];

    [column, row] = [...amazon];
    this._amazonRow = toRow[row];
    this._amazonColumn = toColumn[column];

    this.setBoard(Board.SAFE);
    this.setLocation(this._kingRow, this._kingColumn, Board.KING);
    this.setLocation(this._amazonRow, this._amazonColumn, Board.AMAZON);
    this.markCheckAsRook();
    this.markCheckAsBishop();
    this.markCheckAsKnight();
    this.blankKingAdjacent();
    this.updateBoardForBlackKingMovement();
    this.numberCheckmate = this.computeTotal(Board.CHECKMATE);
    this.numberCheck = this.computeTotal(Board.CHECK);
    this.numberStalemate = this.computeTotal(Board.STALEMATE);
    this.numberSafe = this.computeTotal(Board.SAFE);
  }

  at(row, column) {
    return this.board[row][column];
  }

  setBoard(value) {
    for(let row = 0; row < this.board.length; row++) {
      for(let column = 0; column < this.board[row].length; column++) {
        this.setLocation(row, column, value);
      }
    }
  }

  computeTotal(value) {
    return this.board.reduce(function(accumulator, current) {
      return accumulator.concat(current);
    }).reduce(function(accumulator, current) {
      return current === value ? accumulator+1 : accumulator;
    }, 0);
  }

  setLocation(row, column, value) {
    this.board[row][column] = value;
  }

  onTheBoard(row, column) {
    let result = false;

    if((row >= 0 && row <=7) && (column >= 0 && column <= 7)) {
      result = true;
    }
    
    return result;
  }

  getAdjacentLocations(row, column) {
    return [
      {row: row, column: column-1},
      {row: row-1, column: column-1},
      {row: row-1, column: column},
      {row: row-1, column: column+1},
      {row: row, column: column+1},
      {row: row+1, column: column+1},
      {row: row+1, column: column},
      {row: row+1, column: column-1}
    ];
  }

  isAdjacent(row, column, type) {
    let result = false;
    let adjacent = this.getAdjacentLocations(row, column);
    adjacent.forEach(function(location) {
      let row = location.row;
      let column = location.column;
      if(this.onTheBoard(row, column) && this.at(row, column) === type) {
        result = true;
      }
    }, this);

    return result;
  }

  blankKingAdjacent(){
    let adjacent = this.getAdjacentLocations(this._kingRow, this._kingColumn);

    adjacent.forEach(function(location) {
      let row = location.row;
      let column = location.column;
      if(this.onTheBoard(row, column) && this.at(row, column) !== Board.AMAZON) {
        this.setLocation(row, column, Board.BLANK);
      }
    }, this);
  }

  markCheckTillOccupied(rowIncrement, columnIncrement ) {

    let row = this._amazonRow + rowIncrement;
    let column = this._amazonColumn + columnIncrement;
    let foundKing = false;

    while(this.onTheBoard(row, column) && !foundKing) {
      
      if(this.at(row, column) === Board.SAFE) {
        this.setLocation(row, column, Board.CHECK);
      } else if(this.at(row, column) === Board.KING) {
        foundKing = true;
      }

      row += rowIncrement;
      column += columnIncrement
    }
  }

  markAmazonOffsetInCheck(rowOffset, columnOffset) {
    let row = this._amazonRow + rowOffset;
    let column = this._amazonColumn + columnOffset;

    if(this.onTheBoard(row, column) && this.at(row, column) === Board.SAFE) {
      this.setLocation(row, column, Board.CHECK);
    }
  }
  
  markCheckAsRook() {
    this.markCheckTillOccupied(-1, 0);
    this.markCheckTillOccupied(1, 0);
    this.markCheckTillOccupied(0, -1);
    this.markCheckTillOccupied(0, 1);
  }

   markCheckAsBishop() {
    this.markCheckTillOccupied(-1, -1);
    this.markCheckTillOccupied(1, 1);
    this.markCheckTillOccupied(-1, 1);
    this.markCheckTillOccupied(1, -1);
  }

  markCheckAsKnight() {
    
    this.markAmazonOffsetInCheck(-1, -2);
    this.markAmazonOffsetInCheck(-2, -1);
    this.markAmazonOffsetInCheck(-2, +1);
    this.markAmazonOffsetInCheck(-1, +2);

    this.markAmazonOffsetInCheck(+1, +2);
    this.markAmazonOffsetInCheck(+2, +1);
    this.markAmazonOffsetInCheck(+2, -1);
    this.markAmazonOffsetInCheck(+1, -2);
    
  }
  
  updateBoardForBlackKingMovement() {

    for(let row = 0; row < this.board.length; row++) {
      for(let column = 0; column < this.board[row].length; column++) {

        if(this.at(row, column) === Board.SAFE) {
          
          if(!this.isAdjacent(row, column, Board.SAFE)) {
            this.setLocation(row, column, Board.STALEMATE);
          }
        } else if(this.at(row, column) === Board.CHECK) {

          if(!this.isAdjacent(row, column, Board.SAFE) && !this.isAdjacent(row, column, Board.STALEMATE)) {

            if(this.isAdjacent(row, column, Board.AMAZON) && !this.isAdjacent(this._amazonRow, this._amazonColumn, Board.KING)) {
              this.setLocation(row, column, Board.CHECK);
            } else {
              this.setLocation(row, column, Board.CHECKMATE);
            }
          }
        }
      }
      
    }
  }

}