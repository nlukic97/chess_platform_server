import { validateFen } from "fen-validator"; // Nikola - add type for this in .d.ts

export function fullFenValidation(fen: String): boolean {
  if (typeof fen !== "string") {
    return false;
  } else {
    return validateFen(fen);
  }
}
