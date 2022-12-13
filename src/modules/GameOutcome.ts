type GameOutcomeObject = {
  reason: String | undefined;
  winner: String | undefined;
  loser: String | undefined;
};

export function GameOutcome(
  reason: String | undefined = undefined,
  winner: String | undefined = undefined,
  loser: String | undefined = undefined
): GameOutcomeObject {
  return {
    reason,
    winner,
    loser,
  };
}
