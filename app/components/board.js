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
     * From wiki: https://ru.wikipedia.org/wiki/%D0%98%D0%B3%D1%80%D0%B0_%D0%B2_15
     *
     * Можно показать, что ровно половину из всех возможных 20 922 789 888 000 (=16!) начальных положений пятнашек
     * невозможно привести к собранному виду: пусть квадратик с числом  i  расположен до (если считать слева направо и
     * сверху вниз)  k  квадратиков с числами меньшими  i . Будем считать  n_i = k , то есть если после костяшки с i-м
     * числом нет чисел, меньших i, то  k = 0. Также введем число e — номер ряда пустой клетки (считая с 1). Если сумма
     * N = \sum_{i=1}^{15} n_i + e
     * является нечётной, то решения головоломки не существует
     */
    _checkBoard(board) {
        let Sum = 0, flatBoard = board[0].concat(board[1], board[2], board[3]);

        for (let i = 0; i < flatBoard.length; i++) {
            let value = flatBoard[i];
            let Ni = 0;

            if (value === null) {
                Sum +=  Math.floor(i/4) + 1;
            } else {

                for (let ii = i+1; ii < flatBoard.length; ii++) {
                    if (flatBoard[ii] < value) {
                        Ni += flatBoard[ii];
                    }
                }
            }

            Sum += Ni;
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