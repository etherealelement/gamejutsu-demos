import cn from 'classnames';
import {Square} from 'components/Games/Checkers';
import {IBoardProps} from './BoardProps';
import styles from './Board.module.scss';
import React, { useState } from "react";

export const Board: React.FC<IBoardProps> = ({
                                                 squares,
                                                 onClick,
                                                 isFinished,
                                                 disputableMoves,
                                                 selectedCell
                                             }) => {        
    const renderSquare = (row: number, i: number) => {
        if (row % 2 == 1) {
            return <>
                <Square
                value={squares[i]}
                onClick={() => {onClick(i)}}
                disputable={disputableMoves.has(i)}
                selected={selectedCell == i}
                />
                <Square
                value={null}
                onClick={() => {}}
                disputable={false}
                selected={false}
                />
                
            </>
        } 
        return <>
                <Square
                value={null}
                onClick={() => {}}
                disputable={false}
                selected={false}/>
                <Square
                value={squares[i]}
                onClick={() => {onClick(i)}}
                disputable={disputableMoves.has(i)}
                selected={selectedCell == i}
                />
            </> 
    };

    const getRow = (row: number) => {
        return (<div className="board-row">
            {renderSquare(row, (row * 4) + 0)}
            {renderSquare(row, (row * 4) + 1)}
            {renderSquare(row, (row * 4) + 2)}
            {renderSquare(row, (row * 4) + 3)}
        </div>)
    }
    return (
        <div className={cn(styles.container, isFinished ? styles.finished : null)}>
            {getRow(0)}
            {getRow(1)}
            {getRow(2)}
            {getRow(3)}
            {getRow(4)}
            {getRow(5)}
            {getRow(6)}
            {getRow(7)}
        </div>
    );
};