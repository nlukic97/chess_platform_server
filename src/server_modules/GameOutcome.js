module.exports = {
    GameOutcome:function(reason = undefined,winner = undefined,loser=undefined){
        return {
            reason,
            winner,
            loser
        }
    }
}