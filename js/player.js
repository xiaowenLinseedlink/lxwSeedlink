// A $( document ).ready() block.
$(document).ready(function() {
  var awsURL = $("#aws-url")[0] && $("#aws-url")[0].innerHTML;
  var qiniuURL = $("#qiniu-url")[0] && $("#qiniu-url")[0].innerHTML;
  var coverURL = $("#cover-url")[0] && $("#cover-url")[0].innerHTML;
  var eventPlayButton = $(".video-play-button")[0];
  var bbcPlayButton = $(".video-bbc-button")[0];
  var marthaPlayButton = $(".video-martha-button")[0];

  var bbcNewsElement = $("#bbc-video")[0];
  var marthaNewsElement = $("#martha-video")[0];

  var bbcBarElement = $('.bbc-bar')[0];
  var marthaBarElement = $('.martha-bar')[0];

  var previousButton = $('.control-button.previous')[0];
  var nextButton = $('.control-button.next')[0];

  var bbcNewsContainer = $('.home-media .news.bbc')[0];
  var marthNewsContainer = $('.home-media .news.martha')[0];

  var homeVideoContainer = $('.home-media')[0];
  var homeLanguage = $(homeVideoContainer).data('lang');

  var videoSource = {
    cn: {
      en: {
        bbc: "https://cdn.seedlinktech.com/bbc-reports-seedlinktech.mp4",
        martha: "https://cdn.seedlinktech.com/martha-flora-collaboration-with-seedlink-en.mp4",
      },
      zh: {
        bbc: "https://cdn.seedlinktech.com/BBC-video-report.mp4",
        martha: "https://cdn.seedlinktech.com/martha-flora-collaboration-with-seedlink-zh.mp4",
      }
    },
    other: {
      en: {
        bbc: "https://file.seedlinktech.com/bbc-reports-seedlinktech.mp4",
        martha: "https://file.seedlinktech.com/martha-flora-collaboration-with-seedlink-en.mp4",
      },
      zh: {
        bbc: "https://file.seedlinktech.com/BBC-video-report.mp4",
        martha: "https://file.seedlinktech.com/martha-flora-collaboration-with-seedlink-zh.mp4",
      }
    }
  }

  var eventVideoOption;
  var homeBBCVideoOption;
  var homeMarthaVideoOption;

  function VideoOption(url, element) {
    this.element = element;
    this.autoplay = false;
    this.screenshot = false;
    this.hotkey = true;
    this.preload = 'none';
    this.video = {
      url: url,
      // pic: poster,
    };
  }

  function setChinaVideoOptions() {
    if(qiniuURL) {
      eventVideoOption = new VideoOption(qiniuURL, $("#video-container")[0]);
    }
    if(bbcNewsElement) {
      homeBBCVideoOption = new VideoOption(videoSource.cn[homeLanguage].bbc, bbcNewsElement);
      homeMarthaVideoOption = new VideoOption(videoSource.cn[homeLanguage].martha, marthaNewsElement);
    }
  }

  function setOutChinaVideoOptions() {
    if(awsURL) {
      eventVideoOption = new VideoOption(awsURL, $("#video-container")[0]);
    }
    if(bbcNewsElement) {
      homeBBCVideoOption = new VideoOption(videoSource.other[homeLanguage].bbc, bbcNewsElement);
      homeMarthaVideoOption = new VideoOption(videoSource.other[homeLanguage].martha, marthaNewsElement);
    }
  }

  function setDPlayer() {
    if(eventVideoOption) {
      new DPlayer(eventVideoOption);
      $(eventPlayButton).css('display', 'block');
    }
    if(bbcNewsElement) {
      new DPlayer(homeBBCVideoOption);
      $(bbcPlayButton).css('display', 'block');
      new DPlayer(homeMarthaVideoOption);
      $(marthaPlayButton).css('display', 'block');
    }
  }

  $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
    var country_code = data.country_code;

    if (country_code === 'CN') {
      setChinaVideoOptions();
    } else {
      setOutChinaVideoOptions();
    }

    setDPlayer();

  })
  .fail(function() {
    setOutChinaVideoOptions();
    setDPlayer();
  });


  if(bbcBarElement) {
    $(bbcBarElement).on('click', function(){
      showBBCVideo();
    });

    $(previousButton).on('click', function(){
      showBBCVideo();
    });

    $(marthaBarElement).on('click', function(){
      showMarthaVideo();
    });

    $(nextButton).on('click', function(){
      showMarthaVideo();
    });
  }

  if(eventPlayButton) {
    $(eventPlayButton).on('click', playVideo);
  }
  if(bbcPlayButton) {
    $(bbcPlayButton).on('click', playVideo);
  }

  if(marthaPlayButton) {
    $(marthaPlayButton).on('click', playVideo);
  }

  function playVideo(event) {
    var target = event.target;
    $(target).css('display', 'none');
    var videoContainer = $(target).parents('.video-container');
    $(videoContainer).find('.video-cover').addClass('hide-cover');
    $(videoContainer).find('.video-title').addClass('hide-title');
    $(videoContainer).find('.dplayer-video')[0].play();
  }

  function showBBCVideo() {
    $(bbcNewsContainer).css('display', 'block');
    $(marthNewsContainer).css('display', 'none');
    $(bbcBarElement).addClass('current-bar');
    $(marthaBarElement).removeClass('current-bar');
  }

  function showMarthaVideo() {
    $(bbcNewsContainer).css('display', 'none');
    $(marthNewsContainer).css('display', 'block');
    $(marthaBarElement).addClass('current-bar');
    $(bbcBarElement).removeClass('current-bar');
  }
});
