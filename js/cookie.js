$(document).ready(function() {
  var AGREE_COOKIE_KEY = "isAgreeCookie";
  var AGREE_COOKIE_VALUE = "agree";

  checkCookie();
  $(".cookie-close").on("click", agreeCookie);

  function getCookie(cName) {
    var cookie = document.cookie;
    var cStart, cEnd;
    if (cookie.length > 0) {
      cStart = cookie.indexOf(cName + "=");
      if (cStart > -1) {
        cStart = cStart + cName.length + 1;
        cEnd = cookie.indexOf(";", cStart);
        if(cEnd == -1) {
          cEnd = cookie.length;
        }
        return unescape(cookie.substring(cStart, cEnd));
      }
      return '';
    }
    return '';
  }

  function setCookie(cName, value) {
    document.cookie = cName + "=" + escape(value) + ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
  }

  function checkCookie() {
    const agreeCookie = getCookie(AGREE_COOKIE_KEY);
    if(agreeCookie !== AGREE_COOKIE_VALUE) {
      toggleClassWithCookie();
      $('.cookie').show();
    }
  }

  function toggleClassWithCookie () {
    var elements = [
      $(".body-container"),
      $(".blog-menu"),
      $(".blog-mobile-nav")
    ]
    for (var i = 0, length = elements.length; i < length; i++) {
      elements[i].toggleClass("show-cookie");
    }
  }

  function agreeCookie() {
    setCookie(AGREE_COOKIE_KEY, AGREE_COOKIE_VALUE);
    toggleClassWithCookie();
    $('.cookie').hide();
  }
})
