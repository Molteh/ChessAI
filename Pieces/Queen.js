class Queen extends Piece {

    constructor(x, y, isWhite) {
        super(x, y, isWhite);

        this.value = 9;
        this.sprite = isWhite ? images[1] : images[7];
    }

    // Queen can move either on file and ranks or diagonally
    check_move_pattern(x, y, board) {

        // check if it is following on of the possible patterns
        if (this.x !== x && this.y !== y && Math.abs(this.x - x) !== Math.abs(this.y - y))
            return false;

        // check if it has no pieces on its way
        if (this.x === x) {
            return !board.hasPieceOnFile(x, y, this.y);
        }
        else if(this.y === y) {
            return !board.hasPieceOnRank(x, y, this.x);
        }
        else {
            return !board.hasPieceOnDiagonal(x, y, this.x, this.y)
        }
    }

    clone() {
        return new Queen(this.x, this.y, this.isWhite);
    }

}
