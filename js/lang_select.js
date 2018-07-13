$(document).ready(function() {
  var lang_en = $(".lang-en");
  var lang_zh = $(".lang-zh");

  $(lang_en).on('click', changeLang);
  $(lang_zh).on('click', changeLang);

  function changeLang(event) {
    var target = event.target;
    var lang = $(target).data("language");

    var pathname = window.location.pathname;

    if (pathname.indexOf('zh') > 0) {
      if (pathname.indexOf('resource_post') > 0) {
        location.href = pathname.replace('zh', lang)
      } else if(lang === 'zh'){
        location.href = pathname;
      } else {
        location.href = pathname.slice(3);
      }
    } else {
      if (pathname.indexOf('resource_post') > 0) {
        location.href = pathname.replace('en', lang)
      } else if(lang === 'en') {
        location.href = pathname;
      } else {
        location.href = '/zh' + pathname;
      }
    }
  }

})
