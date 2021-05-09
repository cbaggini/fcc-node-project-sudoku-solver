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
    const puzzleArray = puzzleString.split("");
    const columnArray = puzzleArray.filter(
      (el, index) => index % 9 === column - 1
    );
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
    let columnIndex = column - 1;
    let columnCounter = 0;
    while (columnIndex % 3 !== 0) {
      columnIndex--;
      columnCounter++;
    }
    let regionString = "";
    for (let i = 0; i <= 2; i++) {
      regionString += allRegionString.slice(
        columnIndex + i * 9,
        columnIndex + i * 9 + 3
      );
    }
    const regionArray = regionString.split("");
    regionArray.splice(columnCounter * 3 + rowCounter, 1);
    return regionArray.every((el) => el !== value);
  }

  solve(puzzleString) {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let isUnsolved = true;
    let result = puzzleString.split("");
    while (isUnsolved) {
      isUnsolved = result.includes(".");
      for (let i = 0; i < result.length; i++) {
        if (result[i] === ".") {
          const row = String.fromCharCode(Math.floor(i / 9) + 65);
          const column = (i % 9) + 1;
          const testString = result.join("");
          const possibleNumbers = numbers.filter(
            (el) =>
              this.checkRowPlacement(testString, row, column, el) &&
              this.checkColPlacement(testString, row, column, el) &&
              this.checkRegionPlacement(testString, row, column, el)
          );
          console.log(possibleNumbers);
          if (possibleNumbers.length === 1) {
            result[i] = possibleNumbers[0];
          }
        }
      }
    }
    return result;
  }
}

module.exports = SudokuSolver;
