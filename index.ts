#!/usr/bin/env node

import { Fight } from "./sdk/fight";
import { StandardGameLogic } from "./sdk/standard-game-logic";
import { Kickboxer } from "./bots/kickboxer";
import { Boxer } from "./bots/boxer";
import { PlayerBot } from "./playerBot";

const playerBot = new PlayerBot();
const kickboxer = new Kickboxer();
const boxer = new Boxer();

console.log(`Executing fight: ${playerBot.toString()} vs ${boxer.toString()}`);
let fight = new Fight(playerBot, kickboxer, new StandardGameLogic());
let result = fight.execute();

console.log(`Result: ${result.toString()}`);
console.log("");

console.log(`Executing fight: ${playerBot.toString()} vs ${boxer.toString()}`);
fight = new Fight(playerBot, boxer, new StandardGameLogic());
result = fight.execute();
console.log(`Result: ${result.toString()}`);

console.log();