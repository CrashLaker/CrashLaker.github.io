const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

$('pre').each(function (){
    let button = $('<button>', { style: 'font-size:12px;display:none;position:absolute;top:3px;right:3px;z-index:10;color:black;'} ).text('copy');
    let txt = this.innerText;
    this.style.position = 'relative'
    button.get(0).addEventListener('click', function (){
        copyToClipboard(txt);
    });
    this.addEventListener('mouseenter', function (){
        button.show(500)
    })
    this.addEventListener('mouseleave', function (){
        button.hide(200)
    })
    $(this).prepend(button);
});
