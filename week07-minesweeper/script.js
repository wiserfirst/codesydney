var BOARD_SIZE = 9;
var MINE_NUMBER = 10;

var MS_CELL_STATUS = {
    normal: '&nbsp;',
    revealed: '0',
    flagged: '<i class="fa fa-flag"></i>',
    bang: '<i class="fa fa-bomb"></i>'
};

function MSCell(isMine, $cell, x, y, gameBoard) {
    var self = this;
    self.isMine = isMine;
    self.status = MS_CELL_STATUS.normal;
    self.$cell = $cell;
    self.x = x;
    self.y = y;
    self.board = gameBoard;
    self.mineCount = -1;
    self.render();
}

MSCell.prototype.isNormal = function() {
    return this.status === MS_CELL_STATUS.normal;
}
MSCell.prototype.isRevealed = function() {
    return this.status === MS_CELL_STATUS.revealed;
}
MSCell.prototype.isFlagged = function() {
    return this.status === MS_CELL_STATUS.flagged;
}

MSCell.prototype.render = function() {
    var text = this.status;
    if (this.isRevealed()) {
        var text = this.countNeighbors();
        this.$cell.addClass("revealed");
    } else if (this.isFlagged()) {
        this.$cell.addClass("flagged");
    }
    this.$cell.html(text);
    return this.$cell;
};
MSCell.prototype.flag = function() {
    if (this.isRevealed()) {
        return;
    }

    if (this.isNormal()) {
        this.status = MS_CELL_STATUS.flagged;
        this.board.increment(this.x, this.y);
    } else if (this.isFlagged()) {
        this.status = MS_CELL_STATUS.normal;
        this.board.decrement(this.x, this.y);
    }
    this.render();
};

MSCell.prototype.touch = function() {
    if (this.isNormal() && !this.isMine) {
        this.status = MS_CELL_STATUS.revealed;
        this.render();
        this.touchNeighbors();
    }
}
MSCell.prototype.touchNeighbors = function() {
    var self = this;
    if (self.countNeighbors() === 0) {
        var neighbors = self.getNeighbors();
        neighbors.map(function(item) {
            self.board.getCellObj(item).touch();
        });
    }
}

MSCell.prototype.open = function() {
    if (this.isMine) {
        this.status = MS_CELL_STATUS.bang;
        alert("Bang! Sorry, you clicked on a bomb...");
        location.reload();
    } else {
        this.status = MS_CELL_STATUS.revealed;
        this.touchNeighbors();
    }
    this.render();
}

MSCell.prototype.getNeighbors = function() {
    var neighbors = [
        [this.x-1, this.y-1], [this.x, this.y-1], [this.x+1, this.y-1],
        [this.x-1, this.y  ],                     [this.x+1, this.y  ],
        [this.x-1, this.y+1], [this.x, this.y+1], [this.x+1, this.y+1]
    ].filter(function(item) {
        return item[0] >= 0 && item[0] < BOARD_SIZE && item[1] >= 0 && item[1] < BOARD_SIZE;
    });

    return neighbors;
}
MSCell.prototype.countNeighbors = function() {
    var self = this;
    if (self.mineCount === -1) {
        self.mineCount = self.getNeighbors().reduce(function(sum, item) {
            if (self.board.isBomb(item)) {
                sum++;
            }
            return sum;
        }, 0);
    }
    return self.mineCount;
}

function MSBoard($board) {
    var self = this;
    self.marked = 0;
    self.correct = 0;
    self.$board = $board;
    self.msrows = [];

    self.getBombs = function() {
        if (self.bombs === undefined) {
            locations = [];
            while (locations.length < MINE_NUMBER) {
                var location = Math.floor(BOARD_SIZE * BOARD_SIZE * Math.random());
                if (locations.indexOf(location) === -1) {
                    locations.push(location);
                }
            }
            self.bombs = locations.map(function(item) {
                return [item % BOARD_SIZE, Math.floor(item / BOARD_SIZE)];
            });
            //console.log(self.bombs);
        }
        return self.bombs;
    };

    self.isBomb = function(position) {
        result = false;
        self.getBombs().forEach(function(item) {
            if (item[0] === position[0] && item[1] === position[1]) {
                result = true;
            }
        });
        return result;
    };
    self.checkWin = function() {
        if (self.getBombs().length === self.marked
               && self.marked === self.correct) {
            alert("Congrats! You sweeped all mines");
        }
    }
    self.increment = function(x, y) {
        self.marked++;
        if (self.isBomb([x, y])) {
            self.correct++;
        }
        self.checkWin();
    };
    self.decrement = function(x, y) {
        self.marked--;
        if (self.isBomb([x, y])) {
            self.correct--;
        }
        self.checkWin();
    };
    self.getCellObj = function(position) {
        return self.msrows[position[1]][position[0]];
    }

    self.$board.empty();
    for (var i = 0; i < BOARD_SIZE; i++) {
        $row = $('<div class="ms-row">');
        var msrow = [];
        for (var j = 0; j < BOARD_SIZE; j++) {
            $cell = $('<button class="ms-cell normal">');
            var isMine = self.isBomb([j, i]);
            cellObj = new MSCell(isMine, $cell, j, i, self);
            $cell.get(0).cellObj = cellObj;
            $cell.appendTo($row);
            msrow.push(cellObj);
        }
        self.$board.append($row);
        self.msrows.push(msrow);
    }
}

$("#ms-board").on('contextmenu', '.ms-cell', function(event) {
    event.preventDefault();
});
$("#ms-board").on('mouseup', '.ms-cell', function(event) {
    if (event.which === 1) {
        this.cellObj.open();
    } else if (event.which === 3) {
        this.cellObj.flag();
        event.preventDefault();
    }
});

$(function() {
    var gameBoard = new MSBoard($("#ms-board"));
});
