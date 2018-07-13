$(document).ready(function() {
  var didScroll = false;
  var SCROLL_HEIGHT = 150;
  var menu = $(".blog-menu")[0];
  var openButton = $(".blog-mobile-nav-hamburge")[0];
  var closeButton = $(".blog-mobile-nav-close")[0];
  var mobileNav = $(".blog-mobile-nav")[0];


  $(window).on('scroll', function() {
    if(!didScroll) {
      didScroll = true;
      setTimeout(scrollPage, 250 );
    }
  })

  $(openButton).on('click', function() {
    $(mobileNav).addClass("show-mobile-nav");
    $("body").css('overflow-y', 'hidden');
  })

  $(closeButton).on('click', function() {
    $(mobileNav).removeClass("show-mobile-nav");
    $("body").css('overflow-y', 'auto');
  })

  function scrollPage() {
    scrollHeight = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollHeight >= SCROLL_HEIGHT) {
      $(menu).addClass('menu-scroll');
    } else {
      $(menu).removeClass('menu-scroll');
    }

    didScroll = false;
  }

  scrollPage();

});
