const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
$('pre').each(function (){
    let button = $('<button>', { style: 'font-size:12px;position:absolute;top:0;right:-40px;z-index:10;'} ).text('copy');
    let txt = this.innerText;
    button.get(0).addEventListener('click', function (){
        copyToClipboard(txt);
    });
    $(this).parent().prepend(button);
});
