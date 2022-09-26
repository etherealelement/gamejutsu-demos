import {TCellData, TCheckersContractMove} from "../types";

export interface IBoardProps {
    squares: TCellData[];
    onClick: (i: number) => void;
    isFinished: boolean;
    disputableMoves: Set<number>;
    selectedCell: number | null;
}