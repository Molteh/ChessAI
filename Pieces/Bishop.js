class Bishop extends Piece {

    constructor(x, y, isWhite) {
        super(x, y, isWhite);

        this.value = 3;
        this.sprite = isWhite ? images[2] : images[8];
    }

    check_move_pattern(x, y, board) {

        // check if it is moving on a diagonal
        if(Math.abs(this.x - x) !== Math.abs(this.y - y)) {
            return false;
        }

        // check if it has no pieces on its way
        return !board.hasPieceOnDiagonal(x, y, this.x, this.y)
    }

    clone() {
        return new Bishop(this.x, this.y, this.isWhite);
    }

    generate_moves(board) {
        let moves = [];
        for (let i = 0; i < 8 ; i++) {
            if(this.can_move(this.x + i, this.y + i, board)) { // aggiungere il controllo che non esca dalla board o no?
                moves.push(new createVector(this.x + i, this.y + i));
            }
            if(this.can_move(this.x - i, this.y - i, board)) { // aggiungere il controllo che non esca dalla board
                moves.push(new createVector(this.x - i, this.y - i));
            }
            if(this.can_move(this.x + i, this.y - i, board)) { // aggiungere il controllo che non esca dalla board
                moves.push(new createVector(this.x + i, this.y - i));
            }
            if(this.can_move(this.x - i, this.y + i, board)) { // aggiungere il controllo che non esca dalla board
                moves.push(new createVector(this.x - i, this.y + i));
            }
        }
        return moves;
    }
}
