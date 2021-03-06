class Pawn extends Piece {

    constructor(x, y, isWhite) {
        super(x, y, isWhite, isWhite ? images[5] : images[11], 1);
        this.has_moved = false;
    }

    // Pawn can only move forward either of one file or of two if it's it first move and capture diagonally
    check_move_pattern(x, y, board) {

        if(!this.isWhite) {
            if ((this.has_moved && y - this.y === 1 && x === this.x && board.getPieceAt(x, y) == null)
                || (!this.has_moved && y - this.y <= 2 && y - this.y > 0 && x === this.x && board.getPieceAt(x, y) == null)
                || (y - this.y === 1 && Math.abs(x - this.x) === 1 && board.getPieceAt(x, y) != null && board.getPieceAt(x, y).is_white() !== this.isWhite)) {
                return true;
            }
        }
        else {
            if ((this.has_moved && y - this.y === -1 && x === this.x && board.getPieceAt(x, y) == null)
                || (!this.has_moved && y - this.y >= -2 && y - this.y < 0 && x === this.x && board.getPieceAt(x, y) == null)
                || (y - this.y === -1 && Math.abs(x - this.x) === 1 && board.getPieceAt(x, y) != null && board.getPieceAt(x, y).is_white() !== this.isWhite)) {
                return true;
            }
        }

        return false;
    }

    move(x, y, board) {
        super.move(x,y,board);
        this.has_moved = true;
    }

    generate_moves(board) {
        board.moving_piece = this;
        let moves = [];

        // Generate moves for white pawn
        if(this.isWhite) {
            for (let i = 0; i < 3; i++) {
                for (let j = -1; j < 2; j++) {
                    if (this.can_move(this.x + j, this.y - i, board))
                        moves.push(new createVector(this.x + j, this.y - i));
                }
            }
        }

        // Generate moves for black pawn
        else {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 2; j++) {
                    if (this.can_move(this.x + j, this.y + i, board))
                        moves.push(new createVector(this.x + j, this.y + i));
                }
            }
        }

        console.log(this, moves);
        return moves;
    }

    clone() {
        let clone = new Pawn(this.x, this.y, this.isWhite);
        clone.has_moved = this.has_moved;
        return clone;
    }

}
