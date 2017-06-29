Meteor.methods({
   'InsertComment':function (comentario) {
       if(!this.userId){
           throw new Meteor.Error("No autorizado");
       }
       else {
           Comentarios.insert(comentario, function (err, result) {
               if(err){
                   throw new Meteor.Error(333, Comentarios.SimpleSchema().namedContext().invalidKeys());
               }
           })
       }
   }
});