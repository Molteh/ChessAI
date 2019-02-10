class Rook extends Piece {

    constructor(x, y, isWhite, board) {
            super(x, y, isWhite, board, isWhite ? images[4] : images[10], 5);
            this.has_moved = false;
    }

    // Rook can move on files and ranks without trespassing other pieces
    check_move_pattern(x, y) {

        // if there's already one of my pieces, return false
        const piece_at_position = this.board.getPieceAt(x, y);
        if (piece_at_position!=null && piece_at_position.is_white() !== this.is_white())
            return false;

        // check if it still on the same file or rank
        if (this.x !== x && this.y !== y)
            return false;

        // check if it has no pieces on its way
        if (this.x === x) {
            return !this.board.hasPieceOnFile(x, y, this.y);
        }
        else {
            return !this.board.hasPieceOnRank(x, y, this.x);
        }
    }

    move(x, y) {
        super.move(x,y);
        this.has_moved = true;
    }

    generate_moves() {
        let moves = [];

        // Generate horizontal moves
        for (let i = 0; i < 8 ; i++) {
            if (this.can_move(i, this.y, this.board))
                moves.push( new createVector(i, this.y));
        }

        // Generate vertical moves
        for (let i = 0; i < 8; i++) {
            if (this.can_move(this.x, i, this.board))
                moves.push(new createVector(this.x, i));
        }

        console.log(this, moves);
        return moves;
    }
}
