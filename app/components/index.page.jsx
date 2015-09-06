import React from 'react';
import board from './board';

export default React.createClass({

    getInitialState() {
        return {
            board: (this.props.board ? this.props.board : board.generate()),
            move: null
        }
    },

    onNumberClick(rindex, cindex) {
        return () => {
            if (board.canMoveCell(this.state.board, rindex, cindex)) {
                let [data, nullPosition, direction] = board.moveCell(this.state.board, rindex, cindex);
                this.setState({
                    board: data,
                    move: {
                        direction: direction,
                        position: nullPosition
                    }
                });
            }
        };
    },

    render() {
        let move = this.state.move;

        return (
            <div className="board">
                {this.state.board.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className="row">
                            {row.map((number, cellIndex) => {
                                let canMove = board.canMoveCell(this.state.board, rowIndex, cellIndex);
                                let direction = (move && move.position[0] === rowIndex && move.position[1] === cellIndex) ?
                                    move.direction : false;

                                return (
                                    <div
                                        onClick={this.onNumberClick(rowIndex, cellIndex)}
                                        key={cellIndex}
                                        className={'num' + (canMove ? ' movable' : '') + (direction ? ' ' + direction : '')}
                                    >
                                        {number}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }

});