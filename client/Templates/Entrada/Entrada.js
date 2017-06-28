Template.Entrada.helpers({
    "createdAtE":function (sDate) {
        return sDate.toLocaleDateString()+' '+sDate.toLocaleTimeString();
    },
    "textoE":function (sText) {
        return Spacebars.SafeString(sText.replace(/(\n)+/g,'<br>'));
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

Template.Entrada.events({
    "submit form": function (event) {
        event.preventDefault();
        let comment = event.target.comment.value.trim();
        if(comment)
        {
            let comentario = {};
            comentario.author_id=Meteor.user()._id;
            comentario.entrada_id=this.Entradas._id;
            comentario.title=this.Entradas.title;
            comentario.text=comment;
            Meteor.call('InsertComment', comentario, function (err,res) {
                if(err){
                    Modal.show('FailComment');
                }
                else{
                    $('textarea#comment').val('')
                    Modal.show('OKComment');
                }
            });
        }
    }
});