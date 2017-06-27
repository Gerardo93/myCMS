Modal.allowMultiple=true;
var validador=$.validator;

validador.setDefaults({
    rules:{
        regnombre:{
            required:true,
            minlength:4,
            maxlength:24
        },
        regemail:{
            required:true,
            email:true
        },
        regpass1:{
            required:true,
            minlength:6
        },
        regpass2:{
            required:true,
            minlength:6,
            equalTo: "#regpass1"
        },
        lognombre:{
            required:true,
            minlength:4,
            maxlength:24
        },
        logpass:{
            required:true,
            minlength:6
        }
    },
    messages:{
        regnombre:{
            required:"Debes introducir un nombre.",
            minlength:"Como minimo {0} carácteres.",
            maxlength:"Como máximo {0} carácteres."
        },
        regemail:{
            required:"Debes introducir un email.",
            email:"Debes introducir un email valido."
        },
        regpass1:{
            required:"Debes introducir una contraseña.",
            minlength:"Como minimo {0} carácteres."
        },
        regpass2:{
            required:"Debes comprobar la contraseña.",
            minlength:"Como minimo {0} carácteres.",
            equalTo: "Las contraseñas deben ser iguales."
        },
        lognombre:{
            required:"Debes introducir un nombre.",
            minlength:"Como minimo {0} carácteres.",
            maxlength:"Como máximo {0} carácteres."
        },
        logpass:{
            required:"Debes introducir una contraseña.",
            minlength:"Como minimo {0} carácteres."
        }
    }
});

Template.register.onRendered(function () {
    validator=$('form#register-form').validate();
});

Template.login.onRendered(function () {
    validator=$('form#login-form').validate();
});

Template.register.events({
    "click a#reglog":function (event,template){
        event.preventDefault();
        Modal.hide(template);
        Modal.show('login');
    }
});

Template.login.events({
    "click a#logreg":function (event,template){
        event.preventDefault();
        Modal.hide(template);
        Modal.show('register');
    }
});