import { MoveType } from './move-type';
import { Area } from './area';

export class Move
{
    private type: MoveType;
    private area: Area;

    public getType(): MoveType {
        return this.type;
    }

    public getArea() : Area {
        return this.area;
    }

    public getAttackPower(): number {
        switch (this.area)
        {
            case Area.HookKick: return 10;
            case Area.HookPunch: return 6;
            case Area.UppercutPunch: return 3;
            case Area.LowKick: return 1;
        }
        return 0;
    }

    public getEnergy() : number{
        if (this.type == MoveType.Attack)
        {
            switch (this.area)
            {
                case Area.HookKick: return 4;
                case Area.HookPunch: return 3;
                case Area.UppercutPunch: return 2;
                case Area.LowKick: return 1;
            }
        }
        // Defense
        else
        {
            return 4;
        }
        return 0;
    }

    public constructor(type: MoveType, area: Area)
    {
        this.type = type;
        this.area = area;
    }
}