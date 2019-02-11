class Rook extends Piece {

    constructor(x, y, isWhite) {
            super(x, y, isWhite, isWhite ? images[4] : images[10], 5);
            this.has_moved = false;
    }

    // Rook can move on files and ranks without trespassing other pieces
    check_move_pattern(x, y, board) {

        // check if it still on the same file or rank
        if (this.x !== x && this.y !== y)
            return false;

        // check if it has no pieces on its way
        if (this.x === x) {
            return !board.hasPieceOnFile(x, y, this.y);
        }
        else {
            return !board.hasPieceOnRank(x, y, this.x);
        }
    }

    move(x, y, board) {
        super.move(x,y,board);
        this.has_moved = true;
    }

    generate_moves(board) {
        board.moving_piece = this;
        let moves = [];

        // Generate horizontal moves
        for (let i = 0; i < 8 ; i++) {
            if (this.can_move(i, this.y, board))
                moves.push( new createVector(i, this.y));
        }

        // Generate vertical moves
        for (let i = 0; i < 8; i++) {
            if (this.can_move(this.x, i, board))
                moves.push(new createVector(this.x, i));
        }

        console.log(this, moves);
        return moves;
    }

    clone() {
        let clone = new Rook(this.x, this.y, this.isWhite);
        clone.has_moved = this.has_moved;
        return clone;
    }
}
