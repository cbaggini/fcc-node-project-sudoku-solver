class SudokuSolver {
  validate(puzzleString) {
    let isValid = /^[\\.|1-9]+$/g.test(puzzleString);
    if (puzzleString.length === 81 && isValid) {
      return true;
    } else if (puzzleString.length === 81) {
      return { error: "Invalid characters in puzzle" };
    } else {
      return { error: "Expected puzzle to be 81 characters long" };
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowStart = (row.charCodeAt(0) - 65) * 9;
    const rowString = puzzleString.slice(rowStart, rowStart + 9);
    const rowArray = rowString.split("");
    rowArray.splice(column - 1, 1);
    return rowArray.every((el) => el !== value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const columnString = puzzleString.filter(
      (el, index) => index % 9 === column - 1
    );
    const columnArray = columnString.split("");
    columnArray.splice(row.charCodeAt(0) - 65, 1);
    return columnArray.every((el) => el !== value);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let rowIndex = row.charCodeAt(0) - 65;
    let rowCounter = 0;
    while (rowIndex % 3 !== 0) {
      rowIndex--;
      rowCounter++;
    }
    const regionStart = rowIndex * 9;
    let allRegionString = puzzleString.slice(regionStart, regionStart + 27);
    let columnIndex = column;
    let columnCounter = 0;
    while (columnIndex % 3 !== 0) {
      columnIndex--;
      columnCounter++;
    }
    let regionString = "";
    for (let i = 0; i <= 2; i++) {
      regionString += allRegionString.slice(
        columnIndex + i * 3,
        columnIndex + i * 3 + 3
      );
    }
    const regionArray = regionString.split("");
    regionArray.splice(columnIndex * 3 + rowIndex, 1);
    return regionArray.every((el) => el !== value);
  }

  solve(puzzleString) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let isUnsolved = false;
    let result = puzzleString;
    while (isUnsolved) {
      isUnsolved = result.includes(".");
      for (let i = 0; i < result.length; i++) {
        if (result[i] === ".") {
          // TODO: get row letter and column number from index
          const row = "A";
          const column = 1;
          const possibleNumbers = numbers.filter(
            (el) =>
              this.checkRowPlacement(result, row, column, result[i]) ||
              this.checkColPlacement(result, row, column, result[i]) ||
              this.checkRegionPlacement(result, row, column, result[i])
          );
          if (possibleNumbers.length === 1) {
            result[i] = possibleNumbers[0];
          }
        }
      }
    }
  }
}

module.exports = SudokuSolver;
