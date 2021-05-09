"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    let { puzzle, coordinate, value } = req.body;
    console.log(puzzle);
    console.log(solver.validate(puzzle));
    console.log(
      solver.validate(
        "5..91372.3...8..9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3"
      )
    );
    result = { valid: false, conflict: ["row", "column", "region"] };
    res.send("ok");
  });

  app.route("/api/solve").post((req, res) => {});
};
