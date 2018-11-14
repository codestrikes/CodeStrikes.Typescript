import { MoveCollection } from "./move-collection";
import { ReadonlyMoveCollection } from "./readonly-move-collection";

export class RoundContext {
    private myMoves: MoveCollection;
    private lastOpponentMoves: ReadonlyMoveCollection;
    private myDamage: number;
    private opponentDamage: number;
	private myLifePoints: number;
    private opponentLifePoints: number;

    public constructor(lastOpponentMoves: ReadonlyMoveCollection, myDamage: number, opponentDamage: number, myLifePoints: number, opponentLifePoints: number) {
        this.lastOpponentMoves = lastOpponentMoves;
        this.myDamage = myDamage;
        this.opponentDamage = opponentDamage;
        this.myMoves = new MoveCollection();
		this.myLifePoints = myLifePoints;
		this.opponentLifePoints = opponentLifePoints;
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

    public getMyLifePoints(): number {
        return this.myLifePoints;
    }

    public getOpponentLifePoints(): number {
        return this.opponentLifePoints;
    }
}