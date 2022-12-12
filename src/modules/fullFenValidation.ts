module.exports = { 
    fullFenValidation:function(fen){
        if(typeof(fen) !== 'string'){
            return false
        } else {
            return validateFEN(fen)
        }
    }
 }