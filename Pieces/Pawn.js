class Pawn extends Piece {

    constructor(x, y, isWhite, board) {
        super(x, y, isWhite, board, isWhite ? images[5] : images[11], 1);
        this.has_moved = false;
    }

    // Pawn can only move forward either of one file or of two if it's it first move and capture diagonally
    check_move_pattern(x, y) {

        // if there's already one of my pieces, return false
        const piece_at_position = this.board.getPieceAt(x, y);
        if (!piece_at_position && piece_at_position.is_white() !== this.is_white())
            return false;

        if(!this.isWhite) {
            if ((this.has_moved && y - this.y === 1 && x === this.x && this.board.getPieceAt(x, y) == null)
                || (!this.has_moved && y - this.y <= 2 && y - this.y > 0 && x === this.x && this.board.getPieceAt(x, y) == null)
                || (y - this.y === 1 && Math.abs(x - this.x) === 1 && this.board.getPieceAt(x, y) != null && this.board.getPieceAt(x, y).is_white() !== this.isWhite)) {
                return true;
            }
        }
        else {
            if ((this.has_moved && y - this.y === -1 && x === this.x && this.board.getPieceAt(x, y) == null)
                || (!this.has_moved && y - this.y >= -2 && y - this.y < 0 && x === this.x && this.board.getPieceAt(x, y) == null)
                || (y - this.y === -1 && Math.abs(x - this.x) === 1 && this.board.getPieceAt(x, y) != null && this.board.getPieceAt(x, y).is_white() !== this.isWhite)) {
                return true;
            }
        }

        return false;
    }

    move(x, y) {
        super.move(x,y);
        this.has_moved = true;
    }

    generate_moves() {
        let moves = [];

        // Generate moves for white pawn
        if(this.isWhite) {
            for (let i = 0; i < 3; i++) {
                for (let j = -1; j < 2; j++) {
                    if (this.can_move(this.x + j, this.y - i, this.board))
                        moves.push(new createVector(this.x + j, this.y - i));
                }
            }
        }

        // Generate moves for black pawn
        else {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 2; j++) {
                    if (this.can_move(this.x + j, this.y + i, this.board))
                        moves.push(new createVector(this.x + j, this.y + i));
                }
            }
        }

        console.log(this, moves);
        return moves;
    }

}
