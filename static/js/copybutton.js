const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
$('pre').each(function (){
    let button = $('<button>', { style: 'font-size:12px;position:absolute;top:0;right:0;'} ).text('copy');
    button.get(0).addEventListener('click', function (){
        copyToClipboard(this.innerText);
    });
    $(this).parent().prepend(button);
});
