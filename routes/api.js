"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    result = { valid: false, conflict: ["row", "column", "region"] };
  });

  app.route("/api/solve").post((req, res) => {});
};
