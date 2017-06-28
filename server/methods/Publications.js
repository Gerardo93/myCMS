Meteor.publish('Entradas', function () {
    return Entradas.find();
});

Meteor.publish('Comentarios', function () {
    return Comentarios.find();
});

Meteor.publish("EntradasByID", function (id) {
    return Entradas.find({_id:id});
});

Meteor.publish("ComentariosByEntrada", function (id) {
    return Comentarios.find({entrada_id:id});
});