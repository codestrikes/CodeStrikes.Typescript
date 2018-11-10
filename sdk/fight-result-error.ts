import { FightExceptionReason } from "./fight-exception-reason";

export class FightResultError
{
	public errorType: FightExceptionReason;
	public stackTrace: String;
	public message: String;
	
	public constructor(errorType: FightExceptionReason, stackTrace: String, message: String)
    {
		this.errorType = errorType;
		this.stackTrace = stackTrace;
		this.message = message;
    }
}