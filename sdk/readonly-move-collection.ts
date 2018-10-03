import { Move } from "./move";
import { MoveType } from "./move-type";
import { Area } from "./area";

export class ReadonlyMoveCollection
{
    protected moveList: Move[];

    constructor()
    {
        this.moveList = new Array<Move>();
    }

    public getMoves(): Move[]{
        return this.moveList;
    }

    public getAttacks(): Move[]
    {
        return this.moveList.filter(x => x.getType() == MoveType.Attack);
    }

    public getDefences() : Move[]
    {
        return this.moveList.filter(x => x.getType() == MoveType.Defense);
    }

    public hasDefence(area: Area): boolean{
        return this.getDefences().filter(x => x.getArea() == area).length > 0;        
    }

    public sumEnergy(): number{
        return this.moveList.map(x => x.getEnergy()).reduce((x, y) => x + y);
    }
}