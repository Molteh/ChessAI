class Piece {

    constructor(x, y, isWhite, board, sprite, value) {
        this.x = x;
        this.y = y;
        this.board = board;
        this.isWhite = isWhite;
        this.sprite = sprite;
        this.value = value;
        this.is_moving = false;
        this.pixel_position = createVector(x * tile_size + tile_size / 2, y *
            tile_size + tile_size / 2);
    }

    can_move(x, y) {

        // if i'm moving a piece of my opponent, return false
        if (this.isWhite !== this.board.white_turn)
            return false;

        // if i'm moving outside the board, return false
        if (!this.board.is_in_boundaries(x, y))
            return false;

        // if the move is not valid for that specific piece, return false
        if (!this.check_move_pattern(x, y))
            return false;

        // if there's already one of my pieces, return false
        const piece_at_position = this.board.getPieceAt(x, y);
        if (piece_at_position!=null && piece_at_position.is_white() === this.is_white())
            return false;

        // if i'm in check and i'm not breaking it, return false
        return !(this.board.is_check() && !this.board.breaks_check(x, y));
    }

    move(x, y) {
        console.log(x, y);

        // capture enemy piece
        this.board.removePieceAt(x, y);

        this.x = x;
        this.y = y;
        this.pixel_position.x = x * tile_size + tile_size / 2;
        this.pixel_position.y = y * tile_size + tile_size / 2;

        // switch turn
        this.board.white_turn = !this.board.white_turn;

        this.is_moving = false;
        this.board.moving_piece = null;
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

    check_move_pattern(x, y) {
        return true;
    }

    generate_moves() {

    }

    is_white() {
        return this.isWhite
    }

}
