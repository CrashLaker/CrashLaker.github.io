


(function (){

    setTimeout(() => {
        $('#pagehit').attr('src', 'https://hitcounter.pythonanywhere.com/count/tag.svg?url='+escape(window.location.href))
    },5000)

})();

