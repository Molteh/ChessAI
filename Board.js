class Board {

    constructor() {
        this.check = false;
        this.board_length = 8;
        this.board_height = 8;
        this.moving_piece = null;
        this.white_turn = true;
        this.score = 0;

        //setup pieces
        this.white_pieces = [];
        this.black_pieces = [];
        this.setUpPieces()
    }

    setUpPieces() {

        //standard game setup
        this.white_pieces.push(new Rook(0, 7, true));
        this.white_pieces.push(new Knight(1, 7,true));
        this.white_pieces.push(new Bishop(2, 7,true));
        this.white_pieces.push(new Queen(3, 7, true));
        this.white_pieces.push(new King(4, 7,  true));
        this.white_pieces.push(new Bishop(5, 7,true));
        this.white_pieces.push(new Knight(6, 7,true));
        this.white_pieces.push(new Rook(7, 7, true));

        for (let i = 0; i < 8; i++) {
            this.white_pieces.push(new Pawn(i, 6, true));
        }

        this.black_pieces.push(new Rook(0, 0,false));
        this.black_pieces.push(new Knight(1, 0,false));
        this.black_pieces.push(new Bishop(2, 0, false));
        this.black_pieces.push(new Queen(3, 0, false));
        this.black_pieces.push(new King(4, 0, false));
        this.black_pieces.push(new Bishop(5, 0, false));
        this.black_pieces.push(new Knight(6, 0, false));
        this.black_pieces.push(new Rook(7, 0, false));

        for (let i = 0; i < 8; i++) {
            this.black_pieces.push(new Pawn(i, 1, false));
        }

    }

    show() {
        for (let i = 0; i < this.white_pieces.length; i++) {
            this.white_pieces[i].show();
        }
        for (let i = 0; i < this.black_pieces.length; i++) {
            this.black_pieces[i].show();
        }
    }

    static getKing(pieces) {
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].value === 100)
                return pieces[i];
        }
    }

    getPieceAt(x, y) {
        for (let i = 0; i < this.white_pieces.length; i++) {
            if( this.white_pieces[i].x === x && this.white_pieces[i].y === y) {
                return this.white_pieces[i];
            }
        }
        for (let i = 0; i < this.black_pieces.length; i++) {
            if( this.black_pieces[i].x === x && this.black_pieces[i].y === y) {
                return this.black_pieces[i];
            }
        }
        return null;
    }

    removePieceAt(x, y) {
        for (let i = 0; i < this.white_pieces.length; i++) {
            if( this.white_pieces[i].x === x && this.white_pieces[i].y === y) {
                this.score -= this.white_pieces[i].value;
                this.white_pieces.splice(i, 1);
            }
        }
        for (let i = 0; i < this.black_pieces.length; i++) {
            if( this.black_pieces[i].x === x && this.black_pieces[i].y === y) {
                this.score += this.black_pieces[i].value;
                this.black_pieces.splice(i, 1);
            }
        }
        return null;
    }

    is_in_boundaries(x, y) {
        if (x<0 || x>=this.board_length)
            return false;
        return !(y < 0 || y >= this.board_height);

    }

    is_check(flag=true) {
        let pieces = this.white_turn ? this.black_pieces : this.white_pieces;
        let king = Board.getKing((this.white_turn ? this.white_pieces : this.black_pieces));

        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].value!==100 && pieces[i].check_move_pattern(king.x, king.y, this)) {
                console.log(pieces[i], "can reach you");
                if(flag) checkLabel.html("Check");
                return true;
            }
        }
        checkLabel.html("");
        return false;
    }

    breaks_check(x, y) {
        let clone = this.clone();
        clone.removePieceAt(x, y);
        clone.moving_piece.x = x;
        clone.moving_piece.y = y;
        clone.moving_piece.pixel_position.x = x * tile_size + tile_size / 2;
        clone.moving_piece.pixel_position.y = y * tile_size + tile_size / 2;
        return !clone.is_check(false);
    }

    is_checkmate() {
        let pieces = this.white_turn ? this.white_pieces : this.black_pieces;
        for (let piece in pieces) {
            let moves = piece.generate_moves(this);
            if (moves.length > 0)
                return false;
        }
        return true;
    }

    hasPieceOnDiagonal(x1, y1, x2, y2) {
        let start_x = 0, start_y = 0;

        if ((x1 > x2 && y1 < y2) || (x2 > x1 && y2 < y1)) {
            start_x = Math.min(x2, x1) + 1;
            start_y = Math.max(y2, y1) - 1;

            while (start_x<Math.max(x1, x2)) {
                if (this.getPieceAt(start_x, start_y))
                    return true;
                start_x++;
                start_y--;
            }
        }
        else {
            start_x = Math.min(x2, x1) + 1;
            start_y = Math.min(y2, y1) + 1;

            while (start_x<Math.max(x1, x2)) {
                if (this.getPieceAt(start_x, start_y))
                    return true;
                start_x++;
                start_y++;
            }
        }
        return false;
    }

    hasPieceOnRank(x, y, x2) {
        for (let i = Math.min(x, x2) + 1; i < Math.max(x, x2); i++) {
            if(this.getPieceAt(i, y) != null)
                return true;
        }
        return false
    }

    hasPieceOnFile(x, y, y2) {
        for (let i = Math.min(y, y2) + 1; i < Math.max(y, y2); i++) {
            if(this.getPieceAt(x, i) != null)
                return true;
        }
        return false
    }

    clone() {
        let clone = new Board();

        clone.check = this.check;
        clone.board_length = this.board_length;
        clone.board_height = this.board_height;

        clone.white_turn = this.white_turn;
        clone.score = this.score;

        clone.white_pieces = [];
        clone.black_pieces = [];

        for (let i = 0; i < this.white_pieces.length ; i++) {
            clone.white_pieces.push(this.white_pieces[i].clone());
        }
        for (let i = 0; i < this.black_pieces.length ; i++) {
            clone.black_pieces.push(this.black_pieces[i].clone());
        }

        clone.moving_piece = this.moving_piece? clone.getPieceAt(this.moving_piece.x, this.moving_piece.y) : null;

        return clone;
    }

    generate_boards() {

        let boards = [];
        let pieces = this.white_turn ? this.white_pieces : this.black_pieces;

        for (let piece in pieces) {
            let moves = piece.generate_moves(this);
            for (let move in moves) {
                let clone = this.clone();
                clone.move(move.x, move.y);
                boards.push(clone);
            }
        }

        return boards;
    }
}
