class Rook extends Piece {

    constructor(x, y, isWhite) {
            super(x, y, isWhite);

            this.value = 5;
            this.sprite = isWhite ? images[4] : images[10];

            this.has_moved = false;
    }

    // Override method and update has_moved property
    can_move(x, y, board) {
        let result = super.can_move(x, y, board);
        if (result)
            this.has_moved = true;
        return result;
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

    clone() {
        return new Rook(this.x, this.y, this.isWhite);
    }

    generate_moves(board) {
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
}
