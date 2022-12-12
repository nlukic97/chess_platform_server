export function GameOutcome(
  reason = undefined,
  winner = undefined,
  loser = undefined
) {
  return {
    reason,
    winner,
    loser,
  };
}
