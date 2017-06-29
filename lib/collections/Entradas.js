Entradas = new Meteor.Collection("entradas");

EntradasSchema = new SimpleSchema({
    'author_id':{
        type: String,
        label:'autor'
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
    'active':{
        type: Boolean,
        label:'activa'
    },
    'coments_num':{
        type: Number,
        optional:true
    },
    "createdAt":{
        type: Date,
        label: "creation",
        autoValue: function () {
            return new Date();
        }
    }
});

Entradas.attachSchema(EntradasSchema);

Entradas.after.remove(function(userID,doc){
    Comentarios.remove({entrada_id:doc._id});
});