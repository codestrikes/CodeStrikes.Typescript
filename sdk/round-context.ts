import { MoveCollection } from "./move-collection";
import { ReadonlyMoveCollection } from "./readonly-move-collection";

export class RoundContext {
    private myMoves: MoveCollection;
    private lastOpponentMoves: ReadonlyMoveCollection;
    private myDamage: number;
    private opponentDamage: number;

    public constructor(lastOpponentMoves: ReadonlyMoveCollection, myDamage: number, opponentDamage: number) {
        this.lastOpponentMoves = lastOpponentMoves;
        this.myDamage = myDamage;
        this.opponentDamage = opponentDamage;
        this.myMoves = new MoveCollection();
    }

    public setMoves(moves: MoveCollection) {
        this.myMoves = moves;
    }

    public getMyMoves(): MoveCollection {
        return this.myMoves;
    }

    public getLastOpponentMoves(): ReadonlyMoveCollection {
        return this.lastOpponentMoves;
    }

    public getMyDamage(): number {
        return this.myDamage;
    }

    public getOpponentDamage(): number {
        return this.opponentDamage;
    }
}