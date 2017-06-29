Template.panelEntradasAutor.onCreated(function () {
    this.subscribe("EntradasAutor", Router.current().params._id);
});

Template.panelEntradasAutor.helpers({
    entradasPorAutor: function (author_id,id) {
        return Entradas.find({$and:[{author_id:author_id},{_id:{$ne:id}}]});
    },
    entradasComentadasCount: function (author_id,id) {
        return Entradas.find({$and:[{author_id:author_id},{_id:{$ne:id}}]}).count();
    },
});