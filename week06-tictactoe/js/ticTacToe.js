console.log('Tic Tac Toe in Javascript');
var BOARD_SIZE = 3;

var getRowValues = function(i) {
    if (i < 0 || i > BOARD_SIZE - 1) {
        throw "Invalid row number " + i;
    }

    var rowValues = $(".row:nth(" + (i) + ") .cell").map(function() {
        return $(this).text();
    }).toArray();
    //console.log(rowValues);
    return rowValues;
};

var getColumnValues = function(i) {
    if (i < 0 || i > BOARD_SIZE - 1) {
        throw "Invalid column number " + i;
    }

    var columnValues = $(".cell:nth-child("+ (i+1) + ")").map(function() {
        return $(this).text();
    }).toArray();
    //console.log(columnValues);
    return columnValues;
};

var allEquals = function(values, symbol) {
    var result = true;
    //console.log(values, symbol);
    for (var k = 0; k < BOARD_SIZE; k++) {
        if (values[k] !== symbol) {
            result = false;
            break;
        }
    }
    return result;
};

var onDiag = function(rowIndex, columnIndex, isPrimary) {
    if (isPrimary) {
        return rowIndex === columnIndex;
    } else {
        return (rowIndex + columnIndex) === (BOARD_SIZE - 1);
    }
};

var getDiagValues = function(isPrimary) {
    var diagValues = [];
    for (var k = 0; k < BOARD_SIZE; k++) {
        var value = '';
        if (isPrimary) {
            value = $(".row:nth(" + k + ") .cell:nth("+ k + ")").text();
        } else {
            value = $(".row:nth(" + k + ") .cell:nth("+ (BOARD_SIZE - 1 - k) + ")").text();
        }
        diagValues.push(value);
    }

    return diagValues;
};

$(function() {

    var tictactoe = {
        isPlayer1: true,
        symbols: {player1: "O", player2: "X"},
        getSymbol: function() {
            if (tictactoe.isPlayer1) {
                return tictactoe.symbols.player1;
            } else {
                return tictactoe.symbols.player2;
            }
        },
        checkWin: function(rowIndex, columnIndex) {
            var symbol = tictactoe.getSymbol();

            // Check current row
            if (allEquals(getRowValues(rowIndex), symbol)) {
                return true;
            }
            if (allEquals(getColumnValues(columnIndex), symbol)) {
                return true;
            }
            if (onDiag(rowIndex, columnIndex, true) && allEquals(getDiagValues(true), symbol)) {
                return true;
            }
            if (onDiag(rowIndex, columnIndex, false) && allEquals(getDiagValues(false), symbol)) {
                return true;
            }
            return false;
        }
    };

    $("#board").on('click', '.cell', function() {
        if ($(this).text().length === 0) {
            $(this).text(tictactoe.getSymbol());
        }
        // check winning position
        var rowIndex = $(this).parent().index();
        var columnIndex = $(this).index();
        if (tictactoe.checkWin(rowIndex, columnIndex)) {
            var msg = "Player " + (tictactoe.isPlayer1 ? "1" : "2") + " Wins!";
            //console.log(msg);
            alert(msg);
            location.reload();
        }
        //console.log(rowIndex, columnIndex, tictactoe.isPlayer1);
        tictactoe.isPlayer1 = !tictactoe.isPlayer1;
    });

});
