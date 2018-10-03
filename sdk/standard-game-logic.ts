import { Move } from './move';
import { ReadonlyMoveCollection } from "./readonly-move-collection";

export interface IGameLogic {
    getLifePoints(): number;
    getMaxMoveTime(): number;
    validate(moveCollection: ReadonlyMoveCollection): boolean;
    validateRound(roundNumber: number, f1Points: number, f2Points: number): boolean;
    calculateScore(attacker: ReadonlyMoveCollection, defender: ReadonlyMoveCollection): number;
}

export class StandardGameLogic implements IGameLogic {
    public getLifePoints(): number {
        return 200;
    }

    public getEnergy(): number {
        return 12;
    }

    public getMaxRounds(): number {
        return 100;
    }

    public getMaxMoveTime(): number {
        return 500;
    }

    public calculateScore(attacker: ReadonlyMoveCollection, defender: ReadonlyMoveCollection): number{
        let points = 0;

        attacker.getAttacks().forEach((attack: Move) => {
            if (!defender.hasDefence(attack.getArea()))
            {
                points += attack.getAttackPower();
            }
        });

        return points;
    }

    public validate(moveCollection: ReadonlyMoveCollection) : boolean{
        return moveCollection.sumEnergy() <= this.getEnergy();
    }

    public validateRound(roundNumber: number, f1Points: number, f2Points: number): boolean {
        if (roundNumber >= this.getMaxRounds() && f1Points > 0 && f2Points > 0) return false;
        return f1Points >= 0 || f2Points >= 0;
    }
}