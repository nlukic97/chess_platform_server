import { validateFen } from "fen-validator"; // Nikola - add type for this in .d.ts

export function fullFenValidation(fen) {
  if (typeof fen !== "string") {
    return false;
  } else {
    return validateFEN(fen);
  }
}
