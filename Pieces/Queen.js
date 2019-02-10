class Queen extends Piece {

    constructor(x, y, isWhite, board) {
        super(x, y, isWhite, board, isWhite ? images[1] : images[7], 9);
    }

    // Queen can move either on file and ranks or diagonally
    check_move_pattern(x, y) {

        // if there's already one of my pieces, return false
        const piece_at_position = this.board.getPieceAt(x, y);
        if (!piece_at_position && piece_at_position.is_white() !== this.is_white())
            return false;

        // check if it is following on of the possible patterns
        if (this.x !== x && this.y !== y && Math.abs(this.x - x) !== Math.abs(this.y - y))
            return false;

        // check if it has no pieces on its way
        if (this.x === x) {
            return !this.board.hasPieceOnFile(x, y, this.y);
        }
        else if(this.y === y) {
            return !this.board.hasPieceOnRank(x, y, this.x);
        }
        else {
            return !this.board.hasPieceOnDiagonal(x, y, this.x, this.y)
        }
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

        console.log(this, moves);
        return moves;
    }

}
