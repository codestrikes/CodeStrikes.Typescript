import { BotBase } from "./bot-base";
import { IGameLogic } from "./standard-game-logic";
import { ReadonlyMoveCollection } from "./readonly-move-collection";
import { RoundResult } from "./round-result";
import { RoundContext } from "./round-context";
import { MoveCollection } from "./move-collection";
import { FightResultType } from "./fight-result-type";
import { FightResults } from "./fight-results";
import { FightExceptionReason } from "./fight-exception-reason";
import { FightResultError } from "./fight-result-error";

export class Fight
{
    private bot1: BotBase;
    private bot2: BotBase;
    private gameLogic: IGameLogic;

    public constructor(bot1: BotBase, bot2: BotBase, gameLogic: IGameLogic)
    {
        this.bot1 = bot1;
        this.bot2 = bot2;
        this.gameLogic = gameLogic;
    }

    public execute(): FightResults
    {
        let f1Move: ReadonlyMoveCollection = null;
        let f2Move: ReadonlyMoveCollection = null;

        let score1 = 0;
        let score2 = 0;
        let round = 0;

        let f1Lifepoints = this.gameLogic.getLifePoints(); 
        let f2Lifepoints = this.gameLogic.getLifePoints();
        let roundResults = new Array<RoundResult>();

        while (f1Lifepoints > 0 && f2Lifepoints > 0)
        {
            round++;

            let bot1Context = new RoundContext(f2Move, score1, score2, f1Lifepoints, f2Lifepoints);

            let moves: MoveCollection = null;

            try
            {
                moves = this.bot1.nextMove(bot1Context);
                bot1Context.setMoves(moves);
            }
            catch (exc)
            {
               let error = new FightResultError(FightExceptionReason.Runtime, '', exc);
                return FightResults.Error(error, FightResultType.Lost).setRoundResults(roundResults);
            }

            if (!this.gameLogic.validate(moves))
            {
				let error = new FightResultError(FightExceptionReason.IllegalMove, '', this.bot1 + " made an illegal move");
                return FightResults.Error(error, FightResultType.Lost).setRoundResults(roundResults);
			}

            let bot2Context = new RoundContext(f1Move, score2, score1, f2Lifepoints, f1Lifepoints);
            try
            {
                moves = this.bot2.nextMove(bot2Context);
                bot2Context.setMoves(moves);
            }
            catch (exc)
            {
				let error = new FightResultError(FightExceptionReason.Runtime, '', exc);
                return FightResults.Error(error, FightResultType.Win).setRoundResults(roundResults);
            }
			
            if (!this.gameLogic.validate(moves))
			{
				let error = new FightResultError(FightExceptionReason.IllegalMove, '', this.bot2 + " made an illegal move");
                return FightResults.Error(error, FightResultType.Win).setRoundResults(roundResults);
			}

            f1Move = bot1Context.getMyMoves();
            f2Move = bot2Context.getMyMoves();

            score1 = this.gameLogic.calculateScore(f1Move, f2Move);
            score2 = this.gameLogic.calculateScore(f2Move, f1Move);

            f1Lifepoints -= score2;
            f2Lifepoints -= score1;

            let roundResult = new RoundResult(round, f1Move, f2Move, score1, score2);
            roundResults.push(roundResult);

            if (!this.gameLogic.validateRound(round, f1Lifepoints, f2Lifepoints))
            {
                return FightResults.Draw(f1Lifepoints, f2Lifepoints).setRoundResults(roundResults);
            }
        }

        if (f1Lifepoints <= 0 && f2Lifepoints <= 0)
        {
            return FightResults.Draw(f1Lifepoints, f2Lifepoints).setRoundResults(roundResults);
        }
        else if (f1Lifepoints > f2Lifepoints)
        {
            return FightResults.Win(f1Lifepoints, f2Lifepoints).setRoundResults(roundResults);
        }
        else if (f1Lifepoints == f2Lifepoints)
        {
            return FightResults.Draw(f1Lifepoints, f2Lifepoints).setRoundResults(roundResults);
        }
        return FightResults.Lost(f1Lifepoints, f2Lifepoints).setRoundResults(roundResults);
    }
}