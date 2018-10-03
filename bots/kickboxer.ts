import { Area } from "../sdk/area";
import { RoundContext } from "../sdk/round-context";
import { MoveCollection } from "../sdk/move-collection";
import { BotBase } from "../sdk/bot-base";

export class Kickboxer extends BotBase {
    private attack1 = Area.HookPunch;
    private defence = Area.HookKick;

    private createRandomArea(): Area
    {
        let random = Math.random();
        if (random < 0.3)
            return Area.HookKick;

        if (random < 0.7)
            return Area.HookPunch;

        if (random < 0.9)
            return Area.LowKick;

        return Area.LowKick;
    }

    public nextMove(context: RoundContext): MoveCollection
    {
        if ((context.getLastOpponentMoves() != null) && context.getLastOpponentMoves().getDefences().filter(x => x.getArea() == this.attack1).length > 0)
        {
            this.attack1 = this.createRandomArea();
        }

        let attack2 = this.createRandomArea();

        context.getMyMoves()
                .addAttack(this.attack1)
                .addAttack(attack2)
                .addDefence(this.defence);
        return context.getMyMoves();
    }

    public toString(): String
    {
        return "Kickboxer";
    }
}