Modal.allowMultiple=true;
let validador = $.validator;

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
    },
    "submit #register-form":function (event, template) {
        const user=template.find("#regnombre").value,
            email=template.find("#regemail").value,
            pass1=template.find("#regpass1").value,
            pass2=template.find("#regpass2").value;
        const userObject={
            username:user,
            email:email,
            password:pass1
        };
        Accounts.createUser(userObject, function (err) {
            if(err){
                console.log(err.reason);
                //username ya existe
                if(err.reason === "Username already exists."){
                    validator.showErrors({
                        regnombre: "Ya existe un usuario con ese nombre."
                    });
                }
                //email ya existe
                if(err.reason === "Email already exists."){
                    validator.showErrors({
                        regemail: "Ya existe un usuario con ese email."
                    });
                }
            }
            else{
                console.log(Meteor.user());
                Modal.hide(template);
            }
        });
        console.log('submit-form'+user+email+pass1+pass2);
        return false;
    }
});

Template.login.events({
    "click a#logreg":function (event,template){
        event.preventDefault();
        Modal.hide(template);
        Modal.show('register');
    },
    "submit #login-form":function (event, template) {
        const user=template.find("#lognombre").value,
            pass=template.find("#logpass").value;
        Meteor.loginWithPassword(user,pass,function (err) {
            if(err){
                console.log(err.reason);
                //username erroneo
                if(err.reason === "User not found"){
                    validator.showErrors({
                        lognombre: "El usuario es incorrecto."
                    });
                }
                //pass erroneo
                if(err.reason === "Incorrect password"){
                    validator.showErrors({
                        logpass: "La contraseña es incorrecta."
                    });
                }
            }
            else{
                console.log(Meteor.user());
                Modal.hide(template);
            }
        });
        return false;
    }
});

Template.logout.events({
    "submit #logout-form":function (event, template) {
        Meteor.logout(function (err) {
            console.log(err.reason);
        });
    }
});