
/* //Metodo del curso dependiente de librerias externas
Template.gestor.onCreated(function () {
    $.getScript('https://cloud.tinymce.com/stable/tinymce.min.js', function () {
        tinymce.init({selector: 'textarea'});
    });
});
*/
//Usando libreria instalada por add
// meteor add teamon:tinymce
Template.gestor.onRendered(function () {
    tinymce.init({
        selector: 'textarea',
        skin_url: '/packages/teamon_tinymce/skins/lightgray',
        height: 300,
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste code'
        ],
        toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        content_css: [
            '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
            '//www.tinymce.com/css/codepen.min.css']
    });
});