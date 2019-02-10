class Knight extends Piece {

    constructor(x, y, isWhite, board) {
        super(x, y, isWhite, board, isWhite ? images[3] : images[9], 3);
    }

    // Knight's moves are L shaped, it can jump over other pieces
    check_move_pattern(x, y) {

        // if there's already one of my pieces, return false
        const piece_at_position = this.board.getPieceAt(x, y);
        if (!piece_at_position && piece_at_position.is_white() !== this.is_white())
            return false;

        return (Math.abs(x - this.x) === 1 && Math.abs(y - this.y) === 2) ||
            (Math.abs(x - this.x) === 2 && Math.abs(y - this.y) === 1);
    }

    generate_moves() {
        let moves = [];

        for (let i = -2; i < 3; i++) {
            if(Math.abs(i) === 2) {
                if(this.can_move(this.x + i, this.y + 1, this.board))
                    moves.push(new createVector(this.x + i, this.y + 1));
                if(this.can_move(this.x + i, this.y - 1, this.board))
                    moves.push(new createVector(this.x + i, this.y - 1));
            }
            else if (Math.abs(i) === 1) {
                if(this.can_move(this.x + i, this.y + 2, this.board))
                    moves.push(new createVector(this.x + i, this.y + 2));
                if(this.can_move(this.x + i, this.y - 2, this.board))
                    moves.push(new createVector(this.x + i, this.y - 2));
            }
        }

        console.log(this, moves);
        return moves;
    }

}
