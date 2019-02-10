class King extends Piece {

    constructor(x, y, isWhite, board) {
        super(x, y, isWhite, board, isWhite ? images[0] : images[6], 100);
        this.has_moved = false;
        this.castling = false;
        this.coord = [];
    }

    can_move(x,y) {

        if(this.is_castling(x,y)) {
            this.castling = true;
        }

        return super.can_move(x,y);
    }

    check_move_pattern(x, y) {
        // check if it's moving by one
        if(!this.castling)
            return !((Math.abs(x - this.x) > 1) || (Math.abs(y - this.y) > 1));
        return true;
    }


    is_castling(x, y) {

        // if castling is not available
        if (this.has_moved || this.board.is_check() || this.board.hasPieceOnRank(this.x, y,x))
            return false;

        // check castling moves for white King
        if (this.isWhite) {
            if (x===6 && y===7) {
                if (check_rook(7, 7))
                    this.coord = [5,7,7];
                    return true;
            }
            else if (x===2 && y===7) {
                if (check_rook(0, 7))
                    this.coord = [3,7,0];
                    return true;
            }
        }

        // check castling moves for Black King
        if (!this.isWhite) {
            if (x===2 && y===0) {
                if (check_rook(0, 0))
                    this.coord = [3,0,0];
                    return true;
            }
            else if (x===6 && y===0) {
                if(check_rook(7, 0))
                    this.coord = [5,0,7];
                    return true;
            }
        }

        return false;

        function check_rook(x, y) {
            let piece = this.board.getPieceAt(x, y);
            return (piece.value === 5 && !piece.has_moved);
        }
    }


    move(x, y) {

        //if i have to perform castling
        if(this.castling) {
            this.perform_castling(this.coord[0],this.coord[1],this.coord[2]);
            this.castling = false;
        }

        super.move(x,y);
        this.has_moved = true;
    }


    perform_castling(rx, ry, sx) {
        let piece = this.board.getPieceAt(sx, ry);
        piece.x = rx;
        piece.y = ry;
        piece.pixel_position.x = rx * tile_size + tile_size / 2;
        piece.pixel_position.y = ry * tile_size + tile_size / 2;
        piece.has_moved = true;
    }


    generate_moves() {
        let moves = [];
        for (let i = -1; i <= 1; i++)
            for(let j = -1; j <= 1; j++){
                if(i !==0 || j !== 0)
                    if(this.can_move(this.x + i, this.y + j, this.board)) { // aggiungere il controllo che non esca dalla board
                        moves.push(new createVector(this.x + i, this.y + j));
                    }
            }

        console.log(this, moves);
        return moves;
    }
}
