import { ReadonlyMoveCollection } from "./readonly-move-collection";
import { Area } from "./area";
import { Move } from "./move";
import { MoveType } from "./move-type";

export class MoveCollection extends ReadonlyMoveCollection {
    public addAttack(area: Area): MoveCollection{
        const move = new Move(MoveType.Attack, area);
        this.moveList.push(move);
        return this;
    }

    public addDefence(area: Area): MoveCollection {
        const move = new Move(MoveType.Defense, area);
        this.moveList.push(move);
        return this;
    }

    public remove(move: Move): MoveCollection {
        this.moveList.splice(this.moveList.indexOf(move), 1);
        return this;
    }
}