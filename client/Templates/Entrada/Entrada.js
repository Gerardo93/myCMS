Template.Entrada.helpers({
    "createdAtE":function (sDate) {
        return sDate.toLocaleDateString()+' '+sDate.toLocaleTimeString();
    },
    "textoE":function (sText) {
        return Spacebars.SafeString(sText.replace(/(\n)+/g,'<br>'));
    },
    "coments_numE":function (sNum) {
        return sNum > 0;
    },
    "comentariosE":function (sNum) {
        let comentarios = "No hay comentarios";
        if(sNum===1)
            comentarios = "1 Comentario";
        else if(sNum>1)
            comentarios = sNum+" Comentarios";
        return comentarios;
    }
});