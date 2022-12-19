"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullFenValidation = void 0;
const fen_validator_1 = require("fen-validator"); // Nikola - add type for this in .d.ts
function fullFenValidation(fen) {
    if (typeof fen !== "string") {
        return false;
    }
    else {
        return (0, fen_validator_1.validateFen)(fen);
    }
}
exports.fullFenValidation = fullFenValidation;
