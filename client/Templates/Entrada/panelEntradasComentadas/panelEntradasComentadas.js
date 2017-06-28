Template.panelEntradasComentadas.onCreated(function () {
    this.subscribe("EntradasMasComentadas");
});

Template.panelEntradasComentadas.helpers({
    entradasComentadas: function () {
        return Entradas.find({},{sort:{coments_num:-1},limit:10});
    },
    entradasComentadasCount: function () {
        return Entradas.find({},{sort:{coments_num:-1},limit:10}).count()>0;
    },
    incremented: function (index) {
        index++;
        return index;
    }
});