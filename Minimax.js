function minimax(board, prediction_depth) {

    // Generate all possible configuration from the current one
    let boards = board.generate_boards();

    let best_boards = [];
    let best_score = 0;

    // For each possible configuration compute what will be the best possible outcome in the future
    for (board in boards) {
        let score = get_best_score(board, 0, prediction_depth);

        if (score > best_score) {
            best_boards = [];
            best_boards.push(board);
            best_score = score;
        }
        else if (score === best_score) {
            best_boards.push(board);
        }
    }

    // Return one random configuration from the best ones
    return best_boards[Math.floor(Math.random() * (best_boards.length))];
}

function get_best_score(board, i, stop) { ////IMPORTANT if it's black's turn I should return min instead of max

    let boards = board.generate_boards();
    let scores = [];

    if (i===stop) {
        for (board in boards)
            scores.push(board.score);
    }
    else {
        for (board in boards)
            scores.push(get_best_score(board, i++, stop));
    }

    return Math.max(scores);
}


// ALPHA BETA PRUNING

function minimax_alpha_beta(board) {

    // Generate all possible configuration from the current one
    let boards = board.generate_boards();

    let best_boards = [];
    let best_score = 0;

    // For each possible configuration compute what will be the best possible outcome in the future
    for (let i = 0; i < boards.length; i++) {
        let score = alpha_beta(boards[i], prediction_depth, -100000, 100000, boards[i].white_turn);

        if (score > best_score) {
            best_boards = [];
            best_boards.push(boards[i]);
            best_score = score;
        }
        else if (score === best_score) {
            best_boards.push(boards[i]);
        }
    }

    // Return one random configuration from the best ones
    return best_boards[Math.floor(Math.random() * (best_boards.length))];
}

function alpha_beta(board, prediction_depth, alpha, beta, maximize) {

    if (prediction_depth===0)
        return board.score;

    if(maximize) {
        let score = -100000;
        let boards = board.generate_boards();
        for (let i = 0; i < boards.length; i++) {
            score = Math.max(score, alpha_beta(boards[i], prediction_depth--, alpha, beta, false ));
            alpha = Math.max(score, alpha);
            if (beta <= alpha)
                break;
        }

        return score;
    }
    else {
        let score = 100000;
        let boards = board.generate_boards();
        for (let i = 0; i < boards.length ; i++) {
            score = Math.min(score, alpha_beta(boards[i], prediction_depth--, alpha, beta, true));
            beta = Math.min(score, beta);
            if (beta <= alpha)
                break;
        }

        return score;
    }
}
