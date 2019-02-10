function minimax(board, depth) {

    // Generate all possible configuration from the current one
    let boards = board.generate_boards();

    let best_boards = [];
    let best_score = 0;

    // For each possible configuration compute what will be the best possible outcome in the future
    for (board in boards) {
        let score = get_best_score(board, 0, depth);

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
