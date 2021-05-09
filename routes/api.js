"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    let { puzzle, coordinate, value } = req.body;
    console.log(puzzle);
    // console.log(solver.validate(puzzle));
    // console.log(solver.checkRegionPlacement(puzzle, "G", 2, "1"));
    console.log(solver.solve(puzzle));
    result = { valid: false, conflict: ["row", "column", "region"] };
    res.send("ok");
  });

  app.route("/api/solve").post((req, res) => {});
};
