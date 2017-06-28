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

Meteor.publish("EntradasMasComentadas", function (id) {
    return Entradas.find({},{sort:{coments_num:-1},limit:10});
});

Meteor.publish("EntradasAutor", function (id) {
    let entrada = Entradas.findOne({_id:id});
    return Entradas.find({$and:[{author_id:entrada.author_id},{_id:{$ne:id}}]},{limit:10});
});