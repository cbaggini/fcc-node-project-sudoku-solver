"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    let { puzzle, coordinate, value } = req.body;
    if (puzzle && coordinate && value && solver.validate(puzzle) === true) {
      const coords = coordinate.split("");
      let conflicts = [];
      const validLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
      if (
        !validLetters.includes(coords[0]) ||
        parseInt(coords[1] > 9 || parseInt(coords[1]) < 1)
      ) {
        res.json({ error: "Invalid coordinate" });
      } else if (
        !Number.isInteger(parseInt(value)) ||
        parseInt(value) > 9 ||
        parseInt(value) < 1
      ) {
        res.json({ error: "Invalid value" });
      } else {
        if (
          !solver.checkRowPlacement(
            puzzle,
            coords[0],
            parseInt(coords[1]),
            value
          )
        ) {
          conflicts.push("row");
        }
        if (
          !solver.checkColPlacement(
            puzzle,
            coords[0],
            parseInt(coords[1]),
            value
          )
        ) {
          conflicts.push("column");
        }
        if (
          !solver.checkRegionPlacement(
            puzzle,
            coords[0],
            parseInt(coords[1]),
            value
          )
        ) {
          conflicts.push("region");
        }
        if (conflicts.length === 0) {
          res.json({ valid: true });
        } else {
          res.json({ valid: false, conflict: conflicts });
        }
      }
    } else if (puzzle && coordinate && value) {
      res.json(solver.validate(puzzle));
    } else {
      res.json({ error: "Required field(s) missing" });
    }
  });

  app.route("/api/solve").post((req, res) => {
    if (req.body.puzzle) {
      const solution = solver.solve(req.body.puzzle);
      if (solution.error) res.json({ error: solution.error });
      else res.json({ solution: solution });
    } else {
      res.json({ error: "Required field missing" });
    }
  });
};
