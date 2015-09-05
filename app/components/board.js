import _ from 'underscore';

export default {

    generate() {
        let base = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        let newBoard = [
            [null,null,null,null],
            [null,null,null,null],
            [null,null,null,null],
            [null,null,null,null]
        ];

        let rand = (array) => { return Math.floor(Math.random() * array.length)};

        let emptyCell = [
            Math.floor(Math.random() * 4),
            Math.floor(Math.random() * 4)
        ];

        _.each(newBoard, (row,index) => {
            _.each(row, (cell,cindex) => {
                if (!(index === emptyCell[0] && cindex === emptyCell[1])) {
                    newBoard[index][cindex] = base.splice(rand(base), 1);
                }
            });
        });

        return newBoard;
    },

    canMoveCell(board, rindex, cindex) {
        const nullPosition = this._getNullPosition(board, rindex, cindex);

        return nullPosition[0] !== false && nullPosition[1] !== false;
        /*
         return (board[rindex] && board[rindex][cindex+1] === null) ||
         (board[rindex] && board[rindex][cindex-1] === null) ||
         (board[rindex+1] && board[rindex+1][cindex] === null) ||
         (board[rindex-1] && board[rindex-1][cindex] === null);
         */
    },

    moveCell(board, rindex, cindex) {
        const nullPosition = this._getNullPosition(board, rindex, cindex);
        let direction;

        board[nullPosition[0]][nullPosition[1]] = board[rindex][cindex];
        board[rindex][cindex] = null;

        if (nullPosition[0] > rindex) {
            direction = 'move-down';
        } else if (nullPosition[0] < rindex) {
            direction = 'move-up';
        } else if (nullPosition[1] > cindex) {
            direction = 'move-left';
        } else if (nullPosition[1] < cindex) {
            direction = 'move-right';
        }

        return [board, nullPosition, direction];
    },

    _getNullPosition(board, rindex, cindex) {
        let rpos, cpos;

        rpos = (board[rindex+1] && board[rindex+1][cindex] === null) ? rindex + 1 : (
            (board[rindex-1] && board[rindex-1][cindex] === null) ? rindex - 1 : false
        );

        cpos = (board[rindex] && board[rindex][cindex+1] === null) ? cindex + 1 : (
            (board[rindex] && board[rindex][cindex-1] === null) ? cindex - 1 : false
        );

        return [(cpos !== false ? rindex : rpos), (rpos !== false ? cindex : cpos)];
    }
};