Router.configure({
    layoutTemplate: "layoutTemplate",
    notFoundTemplate: "notFoundTemplate"
});

Router.route("/",{
    name:"home",
    template:"content",
    waitOn:function () {
        Meteor.subscribe("Entradas");
    },
    data:function () {
        Entradas.find({});
    }
});

Router.route("/entrada/:_id",{
    name:"entrada",
    template:"Entrada",
    waitOn:function () {
        return [Meteor.subscribe("EntradasByID", this.params._id),
            Meteor.subscribe("ComentariosByEntrada", this.params._id)]
    },
    data:function () {
        return {
            Comentarios:Comentarios.find({},{sort:{createdAt:-1}}),
            Entradas:Entradas.findOne()
        }
    }
});

Router.route("/gestor",{
    name:"gestor",
    template:"gestor"
});