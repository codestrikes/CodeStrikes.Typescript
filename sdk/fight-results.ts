import { FightResultType } from "./fight-result-type";
import { RoundResult } from "./round-result";
import { FightResultError } from "./fight-result-error";
import { FightExceptionReason } from "./fight-exception-reason";

export class FightResults
{
    private playerScore: number;
    private opponentScore: number;
    private result: FightResultType;
    private isErrorV: boolean;
	private fightResultError: FightResultError;
    private roundResults: RoundResult[];

    private StandardRes(playerScore: number, opponentScore: number, result: FightResultType)
    {
        this.roundResults = new Array<RoundResult>();
        this.playerScore = playerScore;
        this.opponentScore = opponentScore;
        this.result = result;
        return this;
    }

    private ErrorRes(fightResultError: FightResultError, result: FightResultType)
    {
        this.roundResults = new Array<RoundResult>();
        this.fightResultError = fightResultError;
        this.result = result;
        this.isErrorV = true;
        return this;
    }

    public static Draw(playerScore: number, opponentScore: number): FightResults
    {
        return new FightResults().StandardRes(playerScore, opponentScore, FightResultType.Draw);
    }

    public static Win(playerScore: number, opponentScore: number): FightResults
    {
        return new FightResults().StandardRes(playerScore, opponentScore, FightResultType.Win);
    }

    public static Lost(playerScore: number, opponentScore: number): FightResults
    {
        return new FightResults().StandardRes(playerScore, opponentScore, FightResultType.Lost);
    }

    public static Error(fightResultError: FightResultError, result: FightResultType): FightResults
    {
        return new FightResults().ErrorRes(fightResultError, result);
    }

    public setRoundResults(results: RoundResult[]): FightResults
    {
        this.roundResults = results;
        return this;
    }

    public getPlayerScore(): number {
        return this.playerScore;
    }

    public getOpponentScore(): number {
        return this.opponentScore;
    }

    public getResult(): FightResultType {
        return this.result;
    }

    public isError(): boolean{
        return this.isErrorV;
    }

    public getErrorMessage(): String {
        return this.fightResultError.message;
    }

    public getErrorType(): FightExceptionReason {
        return this.fightResultError.errorType;
    }

    public getRoundResults(): RoundResult[] {
        return this.roundResults;
    }

    public toString(): String {
        if (this.isErrorV)
        {
            return `${FightResultType[this.result]} with error : ${this.fightResultError.errorType} - message: ${this.fightResultError.message}`;
        }

        return `${FightResultType[this.result]}: PlayerScore: ${this.playerScore}, OpponentScore: ${this.opponentScore}`;        
    }
}