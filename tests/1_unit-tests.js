const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

suite("UnitTests", () => {
  test("Logic handles a valid puzzle string of 81 characters", function () {
    assert.strictEqual(
      solver.validate(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
      ),
      true
    );
  });
  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function () {
    assert.strictEqual(
      solver.validate(
        "1.5..2.84..63.12.7.2..5.L...9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
      ).error,
      "Invalid characters in puzzle"
    );
  });
  test("Logic handles a puzzle string that is not 81 characters in length", function () {
    assert.strictEqual(
      solver.validate(
        "1.5..2.84..63.12.7.2..5....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
      ).error,
      "Expected puzzle to be 81 characters long"
    );
  });
  test("Logic handles a valid row placement", function () {
    assert.strictEqual(
      solver.checkRowPlacement(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        "A",
        1,
        "1"
      ),
      true
    );
  });
  test("Logic handles an invalid row placement", function () {
    assert.strictEqual(
      solver.checkRowPlacement(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        "A",
        1,
        "5"
      ),
      false
    );
  });
  test("Logic handles a valid column placement", function () {
    assert.strictEqual(
      solver.checkColPlacement(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        "A",
        1,
        "1"
      ),
      true
    );
  });
  test("Logic handles an invalid column placement", function () {
    assert.strictEqual(
      solver.checkColPlacement(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        "A",
        1,
        "8"
      ),
      false
    );
  });
  test("Logic handles a valid region (3x3 grid) placement", function () {
    assert.strictEqual(
      solver.checkRegionPlacement(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        "A",
        1,
        "1"
      ),
      true
    );
  });
  test("Logic handles an invalid region (3x3 grid) placement", function () {
    assert.strictEqual(
      solver.checkRegionPlacement(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        "A",
        1,
        "5"
      ),
      false
    );
  });
  test("Valid puzzle strings pass the solver", function () {
    assert.strictEqual(
      solver.solve(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
      ),
      "135762984946381257728459613694517832812936745357824196473298561581673429269145378"
    );
  });
  test("Invalid puzzle strings fail the solver", function () {
    assert.strictEqual(
      solver.solve(
        "1.5..2.84..6.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
      ).error,
      "invalid puzzle"
    );
  });
  test("Solver returns the the expected solution for an incomplete puzzle", function () {
    assert.strictEqual(
      solver.solve(
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
      ),
      "135762984946381257728459613694517832812936745357824196473298561581673429269145378"
    );
  });
});
