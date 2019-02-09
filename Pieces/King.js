class King extends Piece {

    constructor(x, y, isWhite) {
        super(x, y, isWhite);

        this.value = 100;
        this.sprite = isWhite ? images[0] : images[6];

        this.has_moved = false;
    }

    // Override method and update has_moved property
    can_move(x, y, board) {
        let result = super.can_move(x, y, board);
        if (result)
            this.has_moved = true;
        return result;
    }

    check_move_pattern(x, y, board) {
        if((Math.abs(x - this.x) > 1) || (Math.abs(y - this.y) > 1)) {
            return false;
        }
        return true;
    }

    is_castling(x, y, board) {

        // If king has already moved castling is not possible
        if (this.has_moved || board.hasPieceOnRank(this.x, y, x) || board.is_check()) {
            return false;
        }

        // Check castling moves for white King
        if (this.isWhite) {
            if (x===6 && y===7) {
                if (check_rook(7, 7))
                    return perform_castling(5, 7, 7);
            }
            else if (x===2 && y===7) {
                if (check_rook(0, 7))
                    return perform_castling(3, 7, 0);
            }
        }

        // Check castling moves for Black King
        if (!this.isWhite) {
            if (x===2 && y===0) {
                if (check_rook(0, 0))
                    return perform_castling(3, 0, 0);
            }
            else if (x===6 && y===0) {
                if(check_rook(7, 0))
                    return perform_castling(5, 0, 7);
            }
        }

        return false;

        function check_rook(x, y) {
            let piece = board.getPieceAt(x, y);
            return (piece.value === 5 && !piece.has_moved);
        }

        function perform_castling(rx, ry, sx) {

            board.moving_piece.x = x;
            board.moving_piece.y = y;
            board.moving_piece.pixel_position.x = x * tile_size + tile_size / 2;
            board.moving_piece.pixel_position.y = y * tile_size + tile_size / 2;
            board.moving_piece.has_moved = true;

            let piece = board.getPieceAt(sx, ry);
            piece.x = rx;
            piece.y = ry;
            piece.pixel_position.x = rx * tile_size + tile_size / 2;
            piece.pixel_position.y = ry * tile_size + tile_size / 2;
            piece.has_moved = true;

            // Switch turn
            board.white_turn = !board.white_turn;

            ///// useful here?
            if (board.is_check()) {

            }

            return true;
        }
    }

    clone() {
        let clone = new King(this.x, this.y, this.isWhite);
        clone.has_moved = this.has_moved;
        return clone;
    }

    generate_moves(board) {
        let moves = [];
        for (let i = -1; i <= 1; i++)
            for(let j = -1; j <= 1; j++){
                if(i !==0 || j !== 0)
                    if(this.can_move(this.x + i, this.y + j, board)) { // aggiungere il controllo che non esca dalla board
                        moves.push(new createVector(this.x + i, this.y + j));
                    }
            }

        console.log(this, moves);
        return moves;
    }
}
