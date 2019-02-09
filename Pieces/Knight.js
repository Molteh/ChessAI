class Knight extends Piece {

    constructor(x, y, isWhite) {
        super(x, y, isWhite);

        this.value = 3;
        this.sprite = isWhite ? images[3] : images[9];
    }

    // Knight's moves are L shaped, it can jump over other pieces
    check_move_pattern(x, y, board) {
        if((Math.abs(x - this.x) === 1 && Math.abs(y - this.y) === 2) ||
        (Math.abs(x - this.x) === 2 && Math.abs(y - this.y) === 1))
            return true;
        return false;
    }

    clone() {
        return new Knight(this.x, this.y, this.isWhite);
    }



}
