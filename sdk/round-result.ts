import { ReadonlyMoveCollection } from "./readonly-move-collection";

export class RoundResult
{
    private roundNumber: number;
    private playerMoves: ReadonlyMoveCollection;
    private opponentMoves: ReadonlyMoveCollection;
    private playerScore: number;
    private opponentScore: number;

    public constructor(roundNumber: number, playerMoves: ReadonlyMoveCollection, opponentMoves: ReadonlyMoveCollection, playerScore: number, opponentScore: number)
    {
        this.roundNumber = roundNumber;
        this.playerMoves = playerMoves;
        this.opponentMoves = opponentMoves;
        this.playerScore = playerScore;
        this.opponentScore = opponentScore;
    }

    public getRoundNumber(): number {
        return this.roundNumber;
    }

    public getPlayerMoves(): ReadonlyMoveCollection {
        return this.playerMoves;
    }

    public getOpponentMoves(): ReadonlyMoveCollection {
        return this.opponentMoves;
    }

    public getPlayerScore(): number {
        return this.playerScore;
    }

    public getOpponentScore(): number {
        return this.opponentScore;
    }
}