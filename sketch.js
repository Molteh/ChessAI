const tile_size = 80;
const board_width = 8;
const board_height = 8;
let game;

let images = [];

let prediction_depth = 0;


let scoreLabel;
let checkLabel;

function setup() {
    createCanvas(640, 640);


    setup_images("White");
    setup_images("Black");

    stroke(255, 100);
    game = new Board();
    html_elems_setup();
}

function draw() {
    background(0);
    show_board();
    update_score();
    game.show();

    runAI()
}

function runAI() {
    if (game.white_turn === false) {
        console.log('Minimax comes in action');
        game = minimax_alpha_beta(game);
    }
}

function show_board() {
    for (let x = 0; x < board_width; x++) {
        for (let y = 0; y < board_height; y++) {
            if ((!(x%2) && !(y%2)) || ((x%2) && (y%2)))
                rect(x * tile_size, y * tile_size, tile_size, tile_size);
        }
    }
}

function setup_images(color) {
    images.push(loadImage("images/" + color + "King.png"));
    images.push(loadImage("images/" + color + "Queen.png"));
    images.push(loadImage("images/" + color + "Bishop.png"));
    images.push(loadImage("images/" + color + "Knight.png"));
    images.push(loadImage("images/" + color + "Rook.png"));
    images.push(loadImage("images/" + color + "Pawn.png"));
}

function mousePressed() {
    let x = ~~(mouseX / tile_size);
    let y = ~~(mouseY / tile_size);

    console.log("Clicked on cell: ", x," - ", y);
    if(game.moving_piece)
        if(game.moving_piece.can_move(x,y, game))
            game.moving_piece.move(x, y, game);
        else {
            game.moving_piece.is_moving = false;
            game.moving_piece = null;
        }
    else {
        game.moving_piece = game.getPieceAt(x, y);
        game.moving_piece.is_moving = true;
    }
}

function update_score() {
    scoreLabel.html("Score: " + game.score);
}

function html_elems_setup() {

    let depthLabel = createDiv("Thinking " + prediction_depth + " moves ahead");
    let plusButton = createButton('+');
    let minusButton = createButton('-');
    plusButton.mousePressed(() => {
        prediction_depth++;
        show_prediction_depth()
    });
    minusButton.mousePressed(() => {
        if (prediction_depth > 0)
            prediction_depth--;
        show_prediction_depth()
    });

    function show_prediction_depth() {
        depthLabel.html("Thinking " + prediction_depth + " moves ahead");
    }

    scoreLabel = createDiv("Score " + 0);
    checkLabel = createDiv("");

    let testGenMoveButton = createButton('Generate moves');
    testGenMoveButton.mousePressed(() => {
        console.log(game.white_turn);
        if(game.white_turn) {
            for (let i = 0; i < game.white_pieces.length; i++) {
                game.white_pieces[i].generate_moves(game);
            }
        }
        else {
            for (let i = 0; i < game.black_pieces.length; i++) {
                game.black_pieces[i].generate_moves(game);
            }
        }
    })
}


