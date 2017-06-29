let entradas = [];

function random_string(len) {
    let res="",
        chars="0123456789qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM";
    for(let i=0;i<len;i++){
        res+=chars[Math.floor(Math.random()*chars.length)];
    }
    return res;
}

function lorem() {
    return "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque sollicitudin ut neque nec fringilla. Maecenas quis dictum metus. Maecenas nulla ante, finibus eget posuere et, hendrerit eu nisl. Cras purus mi, molestie a luctus vitae, ornare feugiat metus. Nam enim dui, venenatis a maximus nec, ultrices et tortor. Aliquam nisi nisl, hendrerit et dolor nec, gravida ornare magna.\n"+
        "Duis ac efficitur enim. Mauris nec consequat leo. Phasellus at suscipit lacus, vitae porta leo. Nulla et rhoncus odio. Phasellus vel magna vehicula, convallis tellus a, euismod purus. Suspendisse eleifend massa est. Suspendisse ut purus mattis, pharetra metus sed, commodo urna. Pellentesque rhoncus aliquam finibus. Cras risus massa, bibendum at consequat in, mattis ut libero. Proin a mi commodo, laoreet magna vitae, posuere sem. Phasellus condimentum molestie justo. Mauris pellentesque efficitur ante vel blandit. Sed finibus tristique diam quis tempus. Maecenas neque erat, scelerisque eget luctus in, commodo quis orci.\n"+
        "Nullam metus mauris, sollicitudin vitae ex sed, egestas rutrum diam. Cras massa tortor, mattis sit amet orci nec, aliquet lacinia nibh. Ut metus nulla, vestibulum non lobortis at, tristique eget urna. Phasellus tincidunt vitae tellus et facilisis. Cras in imperdiet sem. Phasellus luctus quam ut nisl vulputate, non ultrices odio imperdiet. Pellentesque facilisis neque id massa aliquet, ut interdum purus dignissim. Sed convallis nec ante quis fringilla. Pellentesque tortor lacus, bibendum sed gravida eget, tristique id lectus. Suspendisse elementum, leo quis sagittis tempus, erat dolor placerat mi, ac fermentum magna nisl id arcu. Aenean vitae neque ligula. Nullam ullamcorper quis augue quis aliquet. Fusce pulvinar nisl elementum, interdum diam et, dapibus sem.\n"+
        "Ut cursus, justo id pulvinar accumsan, ipsum ante mollis purus, eu condimentum mauris velit vel erat. Aliquam imperdiet finibus felis ac blandit. Vivamus cursus enim dolor, vitae ultrices sem fringilla at. Nam ullamcorper sed lorem in gravida. Sed nec tincidunt felis. Suspendisse lobortis vitae dolor non dapibus. Duis consectetur ligula risus, nec posuere ipsum malesuada vel. Praesent mollis massa id libero mattis pharetra. Fusce molestie massa sem, a pharetra tortor ultricies non. Nullam sit amet orci ante. Vivamus imperdiet nulla mauris, eu sodales nibh porttitor vitae.\n"+
        "Duis sit amet magna convallis, convallis quam non, semper metus. Praesent gravida justo nec posuere condimentum. Nullam imperdiet cursus ligula, finibus varius lacus pulvinar at. In aliquet arcu leo. Maecenas metus magna, pretium nec imperdiet quis, imperdiet sagittis mauris. Morbi accumsan vitae felis eget sodales. Etiam viverra libero at nibh semper rhoncus. Duis facilisis odio lacinia, suscipit orci quis, posuere sapien. Curabitur luctus eros eu quam rhoncus, a vestibulum ipsum faucibus. Pellentesque eget elit ut arcu pretium sollicitudin at nec magna. Etiam in nisl ac ante interdum pellentesque in eget ex. Nulla porttitor commodo urna, non porta diam scelerisque a. Etiam efficitur sapien urna, et iaculis justo elementum quis.\n";
}

Meteor.startup(function () {
    if(!Meteor.users.findOne()){
        for (let i=0;i<10;i++){
            let options={};
            if(i===1){
                options = {
                    username:"user"+i,
                    email:"user"+i+"@test.com",
                    password:"123456",
                    profile:{
                        active:true,
                        roles:"admin"
                    }
                }
            }
            else{
                options = {
                    username:"user"+i,
                    email:"user"+i+"@test.com",
                    password:"123456",
                    profile:{
                        active:true,
                        roles:"user"
                    }
                }
            }
            let userID = Accounts.createUser(options);
            console.log("Creado el user"+i+" con id: "+userID);
        }
    }
    if(!Entradas.findOne()){
        for(let i=0;i<100;i++){
            let usr_count = Meteor.users.find().count();
            let j = Math.floor(Math.random()*usr_count);
            let user_name = "user"+j;
            let selector = {username:user_name};
            let user = Meteor.users.findOne(selector);
            if(user){
                let entrada = {
                    title: random_string(10),
                    text: lorem(),
                    author_id:user._id,
                    active:true,
                    coments_num:0
                };
                Entradas.insert(entrada,function (err,result) {
                    if(err){
                        //console.log("error entrada "+i+" id: "+err);
                        throw new Meteor.Error(333,Entradas.simpleSchema().namedContext().invalidKeys());
                    }else{
                        console.log("Entrada "+i+" id: "+result);
                        entradas[i]=result;
                    }
                });
            }
        }
        console.log(Entradas.simpleSchema().namedContext().invalidKeys())
    }

    if(!Comentarios.findOne()){
        for(let i=0;i<100;i++){
            let usr_count = Meteor.users.find().count();
            let j = Math.floor(Math.random()*usr_count);
            let user_name = "user"+j;
            let selector = {username:user_name};
            let user = Meteor.users.findOne(selector);
            if(user){
                let rand_entrada = Math.floor(Math.random()*entradas.length);
                let comentario = {
                    author_id:user._id,
                    entrada_id:entradas[rand_entrada],
                    title: random_string(25),
                    text: lorem()
                };
                Comentarios.insert(comentario,function (err,result) {
                    if(err){
                        //console.log("error comentario "+i+" id: "+err);
                        throw new Meteor.Error(333,Comentarios.simpleSchema().namedContext().invalidKeys());
                    }else{
                        console.log("Comentario "+i+" id: "+result);
                    }
                });
            }
        }
        console.log(Comentarios.simpleSchema().namedContext().invalidKeys())
    }
});