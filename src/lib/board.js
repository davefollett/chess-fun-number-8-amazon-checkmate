export class Location {
  constructor(row, column) {
    this._row = row;
    this._column = column;
  }

  get row() {
    return this._row;
  }

  get column() {
    return this._column;
  }

  move(rowIncrement, columnIncrement) {
    this._row += rowIncrement;
    this._column += columnIncrement;
  }
}

export class Board {
  constructor(kingLocation, amazonLocation, defaultValue) {
    this.board = new Array(8);
    this._kingLocation = kingLocation;
    this._amazonLocation = amazonLocation;

    for(let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(defaultValue, defaultValue, defaultValue, defaultValue, defaultValue, defaultValue, defaultValue, defaultValue);
    }

    this.setLocation(this._kingLocation, Board.KING);
    this.setLocation(this._amazonLocation, Board.AMAZON);
    this.markCheckAsRook();
    this.markCheckAsBishop();
    this.markCheckAsKnight();
    //this.canMoveSafely();
  }

  static get AMAZON() {
    return 'A';
  }
  static get BLANK() {
    return 'B';
  }
  static get CHECK() {
    return '+';
  }
  static get KING() {
    return 'K';
  }
  static get SAFE() {
    return 'O';
  }

  atLocation(location) {
    return this.at(location.row, location.column);
  }
  at(row, column) {
    return this.board[row][column];
  }

  setLocation(location, value) {
    this.board[location.row][location.column] = value;
  }

  onTheBoard(location) {
    let result = false;

    if((location.row >= 0 && location.row <=7) && 
       (location.column >= 0 && location.column <= 7)) {
      result = true;
    }
    
    return result;
  }

  markCheckTillOccupied(rowIncrement, columnIncrement ) {
    let location = new Location(this._amazonLocation.row,
                                this._amazonLocation.column);
    let foundKing = false;

    location.move(rowIncrement, columnIncrement);
    while(this.onTheBoard(location) && !foundKing) {
      
      if(this.atLocation(location) === Board.SAFE) {
        this.setLocation(location, Board.CHECK);
      } else if(this.atLocation(location) === Board.KING) {
        foundKing = true;
      }
      location.move(rowIncrement, columnIncrement)
    }
  }

  markAmazonOffsetInCheck(rowOffset, columnOffset) {
    let location = new Location(this._amazonLocation.row + rowOffset,
                                this._amazonLocation.column + columnOffset);

    if(this.onTheBoard(location) && this.atLocation(location) === Board.SAFE) {
      this.setLocation(location, Board.CHECK);
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

  /*
  canMoveSafely() {

    for(let row = 0; row < this.board.length; row++) {
      for(let column = 0; column < this.board[row].length; column++) {

        if(this.at(row, column) === Board.SAFE) {
          
          if(!isAdjacent(board, row, column, SAFE)) {
            board[row][column] = STALEMATE;
          }
        } else if(board[row][column] === Board.CHECK) {

          if(!isAdjacent(board, row, column, SAFE) && !isAdjacent(board, row, column, STALEMATE)) {

            if(isAdjacent(board, row, column, WHITEAMAZON) && !isAdjacent(board, amazon.row, amazon.column, WHITEKING)) {
              board[row][column] = CHECK;
            } else {
              board[row][column] = CHECKMATE;
            }
          }
        }
      }
      
    }
  }
*/

}