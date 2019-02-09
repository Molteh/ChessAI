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

    generate_moves(board) {
        let moves = [];

        for (let i = -2; i < 3; i++) {
            if(Math.abs(i) === 2) {
                if(this.can_move(this.x + i, this.y + 1, board))
                    moves.push(new createVector(this.x + i, this.y + 1));
                if(this.can_move(this.x + i, this.y - 1, board))
                    moves.push(new createVector(this.x + i, this.y - 1));
            }
            else if (Math.abs(i) === 1) {
                if(this.can_move(this.x + i, this.y + 2, board))
                    moves.push(new createVector(this.x + i, this.y + 2));
                if(this.can_move(this.x + i, this.y - 2, board))
                    moves.push(new createVector(this.x + i, this.y - 2));
            }
        }

        console.log(this, moves);
        return moves;
    }

}
