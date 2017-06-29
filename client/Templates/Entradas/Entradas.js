Template.entrada.helpers({
    "createdAtE":function (sDate) {
        return sDate.toLocaleDateString()+' '+sDate.toLocaleTimeString();
    },
    "textoE":function (sText) {
        return Spacebars.SafeString(sText.replace(/(\n)+/g,'<br>'));
    },
    "coments_numE":function (sNum) {
        return sNum > 0;
    }
});