import { FightResultType } from "./fight-result-type";
import { RoundResult } from "./round-result";
import { FightExceptionReason } from "./fight-exception-reason";

export class FightResults
{
    private playerScore: number;
    private opponentScore: number;
    private result: FightResultType;
    private isErrorV: boolean;
    private errorMessage: String;
    private errorType: FightExceptionReason;
    private roundResults: RoundResult[];

    private StandardRes(playerScore: number, opponentScore: number, result: FightResultType)
    {
        this.roundResults = new Array<RoundResult>();
        this.playerScore = playerScore;
        this.opponentScore = opponentScore;
        this.result = result;
        return this;
    }

    private ErrorRes(errorType: FightExceptionReason, result: FightResultType, errorMessage: String)
    {
        this.roundResults = new Array<RoundResult>();
        this.errorType = errorType;
        this.result = result;
        this.errorMessage = errorMessage;
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

    public static Error(errorType: FightExceptionReason, result: FightResultType, errorMessage: String): FightResults
    {
        return new FightResults().ErrorRes(errorType, result, errorMessage);
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
        return this.errorMessage;
    }

    public getErrorType(): FightExceptionReason {
        return this.errorType;
    }

    public getRoundResults(): RoundResult[] {
        return this.roundResults;
    }

    public toString(): String {
        if (this.isErrorV)
        {
            return `${FightResultType[this.result]} with error : ${this.errorType} - message: ${this.errorMessage}`;
        }

        return `${FightResultType[this.result]}: PlayerScore: ${this.playerScore}, OpponentScore: ${this.opponentScore}`;        
    }
}