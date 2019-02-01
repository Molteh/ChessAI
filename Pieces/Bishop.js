class Bishop extends Piece {

    constructor(x, y, isWhite) {
        super(x, y, isWhite);

        this.value = 3;
        this.sprite = isWhite ? images[2] : images[8];
    }

    check_move_pattern(x, y, board) {

        // check if it is moving on a diagonal
        if(Math.abs(this.x - x) !== Math.abs(this.y - y)) {
            return false;
        }

        // check if it has no pieces on its way
        return !board.hasPieceOnDiagonal(x, y, this.x, this.y)
    }

    clone() {
        return new Bishop(this.x, this.y, this.isWhite);
    }
}
