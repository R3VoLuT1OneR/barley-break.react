export default {

    generate() {
        let base = [null,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        let newBoard = [
            [false,false,false,false],
            [false,false,false,false],
            [false,false,false,false],
            [false,false,false,false]
        ];

        for (let index = 0; index < newBoard.length; index++ ) {
            for (let cindex = 0; cindex < newBoard[index].length; cindex++) {
                newBoard[index][cindex] = base.splice(Math.floor(Math.random() * base.length), 1)[0];
            }
        }

        return this._checkBoard(newBoard) ? newBoard : this.generate();
    },

    /**
     * From wiki: http://mathworld.wolfram.com/15Puzzle.html
     *
     * To address the solubility of a given initial arrangement, proceed as follows. If the square containing the number
     * i appears "before" (reading the squares in the box from left to right and top to bottom) n numbers that are less
     * than i, then call it an inversion of order n, and denote it n_i. Then define
     *
     * N=sum_(i=1)^(15)n_i=sum_(i=2)^(15)n_i,
     *
     * where the sum need run only from 2 to 15 rather than 1 to 15 since there are no numbers less than 1 (so n_1 must
     * equal 0). Stated more simply,  N=i(p) is the number of permutation inversions in the list of numbers. Also define
     * e to be the row number of the empty square.
     *
     * Then if N+e is even, the position is possible, otherwise it is not.
     */
    _checkBoard(board) {
        let Sum = 0, flatBoard = board[0].concat(board[1], board[2], board[3]);

        for (let i = 0; i < flatBoard.length; i++) {
            let value = flatBoard[i];

            if (value === null) {
                Sum +=  Math.floor(i/4) + 1; // e
            } else {
                let Ni = 0;

                for (let ii = i+1; ii < flatBoard.length; ii++) {
                    if (flatBoard[ii] !== null) {
                        Ni += (flatBoard[ii] < value) ? 1 : 0;
                    }
                }

                Sum += Ni;
            }
        }

        return !(Sum % 2);
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