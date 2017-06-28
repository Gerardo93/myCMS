Comentarios = new Meteor.Collection("comentarios");

ComentariosSchema = new SimpleSchema({
    'author_id':{
        type: String,
        label:'autor'
    },
    'entrada_id':{
        type: String,
        label:'entrada'
    },
    'title':{
        type: String,
        label:'titulo',
        max:255
    },
    'text':{
        type: String,
        label:'texto'
    },
    "createdAt":{
        type: Date,
        label: "creation",
        autoValue: function () {
            return new Date();
        }
    }
});

Comentarios.attachSchema(ComentariosSchema);

Comentarios.after.insert(function (userID,doc) {
    Entradas.update({_id:doc.entrada_id}, {$inc:{coments_num:1}}, function (error,result) {
        if(error)
            console.log('Error Update Entradas: '+error.reason)
    })
});

Comentarios.after.remove(function (userID,doc) {
    Entradas.update({_id:doc.entrada_id}, {$inc:{coments_num:-1}}, function (error,result) {
        if(error)
            console.log('Error Update Entradas: '+error.reason)
    })
});