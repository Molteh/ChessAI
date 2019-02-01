class Piece {
    constructor(x, y, isWhite) {
        this.x = x;
        this.y = y;
        this.isWhite = isWhite;
        this.value = 0;
        this.sprite = null;
        this.is_moving = false;
        this.pixel_position = createVector(x * tile_size + tile_size / 2, y *
            tile_size + tile_size / 2);
    }

    can_move(x, y, board) {

        if (board.is_check()) {
            //check that move out of check
        }
        if(this.isWhite !== board.white_turn)
            return false;
        if (!this.check_move_pattern(x, y, board) || !board.is_in_boundaries(x, y))
            return false;
        let piece_at_position = board.getPieceAt(x, y);
        if (piece_at_position == null)
            return true;
        return piece_at_position.is_white() !== this.isWhite;
    }

    show() {
        imageMode(CENTER);
        if (this.is_moving) {
            image(this.sprite, mouseX, mouseY, tile_size, tile_size);
        } else {
            image(this.sprite, this.pixel_position.x, this.pixel_position.y, tile_size,
                tile_size);
        }
    }

    check_move_pattern(x, y, board) {
        return true;
    }

    clone() {

    }

    is_castling(x, y, board) {
        return false;
    }

    is_white() {
        return this.isWhite
    }

}