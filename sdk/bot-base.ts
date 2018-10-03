import { RoundContext } from "./round-context";
import { MoveCollection } from "./move-collection";

export abstract class BotBase {
    public abstract nextMove(context: RoundContext) : MoveCollection;
}