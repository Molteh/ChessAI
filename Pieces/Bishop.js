class Bishop extends Piece {

    constructor(x, y, isWhite, board) {
        super(x, y, isWhite, board, isWhite ? images[2] : images[8], 3);
    }

    check_move_pattern(x, y) {

        // if there's already one of my pieces, return false
        const piece_at_position = this.board.getPieceAt(x, y);
        if (!piece_at_position && piece_at_position.is_white() !== this.is_white())
            return false;

        // check if it is moving on a diagonal
        if(Math.abs(this.x - x) !== Math.abs(this.y - y)) {
            return false;
        }

        // check if it has no pieces on its way
        return !this.board.hasPieceOnDiagonal(x, y, this.x, this.y)
    }

    generate_moves() {
        let moves = [];
        let min = Math.min(this.x, this.y);
        let x = this.x - min;
        let y = this.y - min;

        // Generate moves from bottom right to top left diagonal
        for (let j = 0; j < 8; j++) {
            if(this.can_move(x + j, y + j, this.board))
                moves.push(new createVector(x + j, y + j));
        }

        y = this.y + min;

        // Generate moves from bottom left to top right diagonal
        for (let j = 0; j < 8; j++) {
            if(this.can_move(x + j, y - j, this.board))
                moves.push(new createVector(x + j, y + j));
        }

        return moves;
    }
}
