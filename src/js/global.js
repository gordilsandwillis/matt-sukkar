'use strict';

var $ = require('jquery');
window.jQuery = window.$ = require("jquery");
// var animsition = require('animsition');
var smoothState = require('./smoothState.js');
var lazyload = require('jquery-lazyload/jquery.lazyload.js');
var lazysizes = require('lazysizes');
var slick = require('slick-carousel');
var salvattore = require("salvattore");
var bodyScrollLock = require('body-scroll-lock');
var disableBodyScroll = bodyScrollLock.disableBodyScroll;
var enableBodyScroll = bodyScrollLock.enableBodyScroll;
var $slickCache;

var global = {
  init: function(){
  },

  ready: function(){
    this.pageTransitions();
    this.menuToggle();
    // this.mailchimpSignup.init(this.mailchimpSignup);
    lazySizes.init();
    this.topArea();
    this.scroll();
    this.exploreSlideshow();
    this.exploreLoader();
    this.splitSlideshowBlock();
    this.accordion();
    this.getInstalink();
    this.mailchimpFooter();
    this.togglePhotoView();
    this.photoModal();
    this.photographySlideshow();
    this.filmSlideshowModal();
    this.filmSlideshow();
    this.filterFilmsByCategory();
    this.exploreOverlay();
    this.permalinkGoBack();
    this.explorePageSwipe();
    this.exploreVerticalCenter();
    window.lazySizesConfig = {
      addClasses: true
    };
  },
  
  resize:function(){
    this.exploreVerticalCenter();
    this.togglePhotoView();
  },
  
  scroll: function(){
    this.headerScroll();
    this.parallaxTop();
  },

  pageTransitions: function () {
    'use strict';

    // $('#main').addClass(path)

    var options = {
      prefetch: true,
      cacheLength: 2,
      debug: true,
      // anchors: '.transition-link:not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not(.trigger)',
      onStart: {
        duration: 1000, // Duration of our animation
        render: function ($container) {
          // Add your CSS animation reversing class
          $container.addClass('is-exiting');
          $container.removeClass('entered');
          $('body').removeClass('menu-open');

          // Restart your animation
          smoothState.restartCSSAnimations();
        }
      },
      onReady: {
        duration: 0,
        render: function ($container, $newContent, url) {
          // Remove your CSS animation reversing class
          // let path = location.pathname;
          // if (path === '/') {
          //   path = 'home'
          // } else if (path === '/contact/') {
          //   path = 'contact'
          // } else if (path === '/photography/') {
          //   path = 'photography'
          // } else if (path === '/explore/') {
          //   path = 'explore'
          // } else if (path === '/films/') {
          //   path = 'films'
          // } else {
          //   path = 'nothing'
          // }

          $container.removeClass();
          $container.removeClass('is-exiting');
          $container.addClass('is-entering');
          setTimeout(() => {
            $container.removeClass('is-entering');
            $container.addClass('entered');
            $('.explore-loader').removeClass('visible');
          }, 900)

          // Inject the new content
          $container.html($newContent);
          // global.togglePhotoView();
          global.ready();
        }
      }
    },
    smoothState = $('#main').smoothState(options).data('smoothState');
  },

  togglePhotoView: () => {
    if ($('.staggered-photo-grid').length) {
      salvattore.recreateColumns(document.querySelector('.staggered-photo-grid'));

      $('.photography-page .toggle-view .toggle-full').click(() => {
        console.log('toggle full')
        if ($('.staggered-photo-grid').hasClass('grid-view')) {
          $('.staggered-photo-grid').addClass('animate-out');
          setTimeout(() => {
            $('.photography-page .toggle-view .toggle-full').addClass('active');
            $('.photography-page .toggle-view .toggle-grid').removeClass('active');
            $('.staggered-photo-grid').removeClass('animate-out');
            $('.staggered-photo-grid').addClass('full-width');
            $('.staggered-photo-grid').removeClass('grid-view');
            salvattore.recreateColumns(document.querySelector('.staggered-photo-grid'));
          }, 250)
        } else {
          console.log('already full')
        }
      })
      $('.photography-page .toggle-view .toggle-grid').click(() => {
        console.log('toggle grid')
        if ($('.staggered-photo-grid').hasClass('full-width')) {
          $('.staggered-photo-grid').addClass('animate-out');
          setTimeout(() => {
            $('.photography-page .toggle-view .toggle-full').removeClass('active');
            $('.photography-page .toggle-view .toggle-grid').addClass('active');
            $('.staggered-photo-grid').removeClass('animate-out');
            $('.staggered-photo-grid').addClass('grid-view');
            $('.staggered-photo-grid').removeClass('full-width');
            salvattore.recreateColumns(document.querySelector('.staggered-photo-grid'));
          }, 250)
        } else {
          console.log('already full')
        }
      })
    }
  },

  headerScroll: function () {
    var scrollTop = $('body').scrollTop() || $('html').scrollTop();
    if (scrollTop > 150) {
      $('body').addClass('scrolled');
    } else {
      $('body').removeClass('scrolled');
    }
  },

  accordion : function () {
    $.fn.slideFadeToggle  = function(speed, easing, callback) {
      return this.animate({opacity: 'toggle', height: 'toggle'}, 200, easing, callback);
    };
    $(".accordion .c-content").hide();
    var tglHandle = $(".accordion .c-header");
    tglHandle.click(function() {
      $(this).next(".accordion .c-content").slideFadeToggle();
      $(this).toggleClass("open");
    });
  },

  exploreOverlay : function () {
    $('.explore-page').click(function(event){
      if (!$('.explore-overlay').hasClass('hidden')){
        $('.explore-overlay').addClass('hidden');
        $('.explore-prev').removeClass('inactive');
        $('.explore-next').removeClass('inactive');
      }
    });
  },

  exploreVerticalCenter : function() {
    if ( $(window).width() < 601 ){
      var slide = $(document).find('.explore-slideshow .slide');
      // console.log('window Height:', $(window).innerHeight());
      var windowHeight = $(window).innerHeight()
      if ( slide ) {
        $('.explore-slideshow .slide').css('height', windowHeight)
      }
    }
  },

  photoModal : function() {
    var modalTrigger = $('.grid-view .photo-modal-trigger');
    var targetElement = document.querySelector(".photo-modal");
      modalTrigger.click(function(event) {
        if ( $('.staggered-photo-grid').hasClass('grid-view') ) {
          event.preventDefault();
          var modal = $('.modal#photo-modal-slide');
          $(modal).closest('.modal-wrap').addClass('open');
          $(modal).addClass('visible');
          $('body').addClass('open-modal');
          disableBodyScroll(targetElement);
        }
      });

      var closeModal = function() {
        $('.modal-wrap.open').removeClass('open');
        $('body').removeClass('open-modal');
        setTimeout(function(){ 
          $('.modal.visible').removeClass('visible');
        }, 200);
      }

      $('.photo-modal .close-modal').click(function() {
        closeModal();
        enableBodyScroll(targetElement);
        window.history.pushState({}, "", '/photography');
      });
  },

  topArea : function () {
    var topTitle = $('.top-area .c-title > p');
    topTitle.replaceWith('<h1>' + topTitle.html() + '</h1>');
  },

  menuToggle: function () {
    var headerHeight = $('header').innerHeight();
    var navHeight;

    // if($(".home-page header").length) {
    //   setTimeout(() => {
    //     navHeight = $('header .nav-main ul').innerHeight();
    //     $('body').addClass('menu-open');
    //     $('header .nav-main').height(navHeight)
    //   }, 1000)
    // }

    $('.toggle-menu').click(function(){
      navHeight = $('header .nav-main ul').innerHeight();
      $('body').toggleClass('menu-open');
      if ($('body').hasClass('menu-open')) {
        // $('body #main .page-content .wrapper').css({'transform': 'translate3d(0, ' + navHeight + 'px, 0)'});
        // $('body #main .page-content .wrapper').css({'padding-top': headerHeight + navHeight + 'px'});
        $('header .nav-main').height(navHeight)
      } else {
        // $('body #main .page-content .wrapper').css({'transform': 'none'});
        // $('body #main .page-content .wrapper').css({'padding-top': headerHeight + 'px'});
        $('header .nav-main').height(0)
      }
    });
    $('.close-menu').click(function(){
      $('body').removeClass('menu-open');
      // $('body #main .page-content .wrapper').css({'transform': 'none'});
      // $('body #main .page-content .wrapper').css({'padding-top': headerHeight + 'px'});
      $('header .nav-main').height(0)
    });

    // $('.menu-wrap').click(function(){
    //   $('body').removeClass('menu-open');
    // });

  },

  exploreLoader : function () {
    $('header #nav-main li:not(.current_page_item) a.Explore').click(function(){
      console.log('explore clicked');
      setTimeout(function(){ 
        $('.explore-loader').addClass('visible')
      }, 1000);
    })
  },

  permalinkGoBack: function () {
    // $('.attachment-back-button').click(function(){
    //     window.history.back();
    // });
  },

  swipedetect: function(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 20, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        distX = 0
        distY = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
  },

  isSwipe: function () {
    var container = document.querySelector("#explore-page-swipe");

    container.addEventListener("touchstart", startTouch, false);
    container.addEventListener("touchmove", moveTouch, false);

    // Swipe Up / Down / Left / Right
    var initialX = null;
    var initialY = null;

    function startTouch(e) {
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;
    };

    function moveTouch(e) {
      if (initialX === null) {
        return;
      }

      if (initialY === null) {
        return;
      }

      var currentX = e.touches[0].clientX;
      var currentY = e.touches[0].clientY;

      var diffX = initialX - currentX;
      var diffY = initialY - currentY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0) {
          // swiped left
        } else {
          // swiped right
        }  
      } else {
        // sliding vertically
        if (diffY > 0) {
          // swiped up
        } else {
          // swiped down
        }  
      }

      initialX = null;
      initialY = null;

      e.preventDefault();
    };
  },

  explorePageSwipe: function () {
    // if ( (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) ) {
      var el = document.getElementById('explore-page-swipe');

      if ( el ) {
        global.swipedetect(el, function(swipedir){
          if (swipedir != 'none') {
            console.log('SWIPED!!')
            if (!$('.explore-overlay').hasClass('hidden')){
              $('.explore-overlay').addClass('hidden');
              $('.slideshow.explore-slideshow').slick("slickSetOption", "swipe", true);
            }
          }
        })
      }
    // }
  },

  getInstalink: function () {
    // console.log($('.sbi_follow_btn > a').attr('href'));

    $('.sbi_follow_btn > a').on('data-attribute-changed', function() {
      var instalink = $('.sbi_follow_btn > a').attr('href');
      // console.log(instalink);
    });

  },

  parallaxTop: function () {
    var scrollTop = $('body').scrollTop();
    var topArea = $('.top-area:not(.slide).parallax .cover-area');
    var parallaxSpeed = .5;
    if (scrollTop > 0) {
      topArea.css({'transform': 'translate3d(0, ' + scrollTop * parallaxSpeed + 'px, 0)'});
    } else {
      topArea.css({'transform': 'translate3d(0, 0, 0)'});
    }
  },

  exploreSlideshow: function() {
    $('.slideshow.explore-slideshow').on('init', function(event, slick){
  
    }).slick({
      slidesToShow: 1,
      centerMode: false,
      slidesToScroll: 1,
      arrows: true,
      infinite: false,
      fade: false,
      speed: 1200,
      autoplay: false,
      swipe: false,
      swipeToSlide: false,
      accessibility: true,
      pauseOnHover: false,
      prevArrow: $('.explore-page .prev'),
      nextArrow: $('.explore-page .next'),
      // responsive: [
      //   {
      //     breakpoint: 600,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //       infinite: true,
      //       dots: true,
      //       centerMode: false,
      //       arrows: true,
      //     }
      //   }
      // ]
    });

    $('.slideshow.explore-slideshow').on('beforeChange', function(event, slick, currentSlide, nextSlide){

      var futureSlideIndex = nextSlide + 2;
      
      var slideCount = $('.slideshow.explore-slideshow').slick('getSlick').$slides.length;
      
      if ( futureSlideIndex <= slideCount ){
        var futureSlideDom = $(slick.$slides.get(futureSlideIndex));
        var imageID = futureSlideDom.find('div.explore-wrap').attr('data-image-id');
        
        if ( futureSlideDom.find('div.explore-wrap').children().length < 1 ){
          global.replaceExploreImage(imageID);
        }
      }

    });

    $(document).on("keydown", function(event) {
      if(event.keyCode == 37){
        if (!$('.explore-overlay').hasClass('hidden')){
          $('.explore-overlay').addClass('hidden');
        }
        $('.slideshow.explore-slideshow').slick('slickPrev');
      }
      if (event.keyCode == 39){
        if (!$('.explore-overlay').hasClass('hidden')){
          $('.explore-overlay').addClass('hidden');
        }
        $('.slideshow.explore-slideshow').slick('slickNext');
      }
    });

    $('.explore-slideshow').on('afterChange', function(event, slick, currentSlide){
      var slideDom = $(slick.$slides.get(currentSlide));
      let slideIndex = slideDom.data('slick-index');
      if(slideIndex !== 0) {
        if ($('.explore-page .explore-prev').hasClass('hidden')) {
          $('.explore-page .explore-prev').removeClass('hidden')
        }
      } else {
        $('.explore-page .explore-prev').addClass('hidden')
      }
      if (slideIndex == slick.$slides.length-1) {
        console.log("Last slide");
        $('.explore-page .explore-prev').addClass('hidden');
        $('.explore-page .explore-next').addClass('hidden');
        setTimeout(function(){ 
          $('.explore-page .explore-more').removeClass('hidden');
        }, 1000);
      }
      // var slidePermalink = slideDom.find('div.video-wrap').attr('data-permalink');
      // if($('.film-modal').hasClass('open')) {
      //   window.history.pushState({}, "", slidePermalink);
      // }
    });

    $('.explore-more').on('click',function(){
      console.log('explore-more clicked');
      $('.explore-loader').addClass('visible');
      window.location.reload(true);
    });

  },

  replaceExploreImage: function(imageId){
    var thisSlideImage = $('.slideshow.explore-slideshow .slide').find('.explore-wrap[data-image-id="'+ imageId +'"]');
    var thisImageSrc = thisSlideImage.attr('data-image-src');
    thisSlideImage.html('<img src="'+ thisImageSrc+'">');
  },

  photographySlideshow: function() {
    $('.photo-slideshow').slick({
      slidesToShow: 1,
      centerMode: false,
      slidesToScroll: 1,
      arrows: true,
      infinite: false,
      fade: false,
      speed: 750,
      autoplay: false,
      swipeToSlide: true,
      accessibility: true,
      pauseOnHover: false,
      prevArrow: false,
      nextArrow: false,
      waitForAnimate: false,
      focusOnChange: true
      // responsive: [
      //   {
      //     breakpoint: 600,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //       infinite: true,
      //       dots: true,
      //       centerMode: false,
      //       arrows: true,
      //     }
      //   }
      // ]
    });

    $('.staggered-photo-grid.grid-view img').click(function() {
      var imageIndex = $(this).attr('data-imageID');

      var $slides = $('.photo-slideshow').slick('getSlick').$slides;
      var $tar;

      // find slide of target image id
      $slides.each(function(){
        var tarSlide = $(this).find('.slide');
        if ( tarSlide.attr('data-imageID') == imageIndex) {
          $tar = $(this);
        }
      })

      // set idx as slick index
      var idx = $slides.index( $tar );

      // replace image for target
      global.replaceSlideshowImage(imageIndex);
      
      // replace image for next slide
      if ( idx + 1 < $slides.length ){
        var nextSlideIndex = idx +1 ;
        var nextSlideDom = $($slides.get(nextSlideIndex));
        var nextImageID = nextSlideDom.find('div.image-wrap').attr('data-image-id');
        global.replaceSlideshowImage(nextImageID);
      }

      // replace image for previous slide
      if ( idx - 1 > 0 ){
        var prevSlideIndex = idx -1 ;
        var prevSlideDom = $($slides.get(prevSlideIndex));
        var prevImageID = prevSlideDom.find('div.image-wrap').attr('data-image-id');
        global.replaceSlideshowImage(prevImageID);
      }      

      // hide nav arrows for first/last slide
      console.log('idx : ',idx);
      console.log('total slides length: ', $slides.length)

      $('#photo-modal-slide .arrow-nav .prev-arrow').removeClass('hidden');
      $('#photo-modal-slide .arrow-nav .next-arrow').removeClass('hidden');

      if ( idx === 0 ) {
        console.log('first slide selected ');
        $('#photo-modal-slide .arrow-nav .prev-arrow').addClass('hidden');
      } else if ( idx === $slides.length -1 ) {
        console.log('last slide selected ')
        $('#photo-modal-slide .arrow-nav .next-arrow').addClass('hidden');
      }

      $('.photo-slideshow').slick("refresh");
      // $('.photo-slideshow')[0].slick.cssTransitions = false;
      $('.photo-slideshow').slick('slickGoTo', idx, true);
      // $('.photo-slideshow').slick('slickGoTo', slideIndex, true);
      $('.photo-slideshow').slick("refresh");
      $('.photo-slideshow .slick-track').attr('tabindex', 0);
    });

    // $('.photo-slideshow').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    //   var nextSlideDom = $(slick.$slides.get(nextSlide));
    //   var imageID = nextSlideDom.find('div.image-wrap').attr('data-image-id');
    //   global.replaceSlideshowImage(imageID);
    // });

    $('.photo-slideshow').on('beforeChange', function(event, slick, currentSlide, nextSlide){

      var futureSlideIndex = nextSlide + 2;
      
      var slideCount = $('.photo-slideshow').slick('getSlick').$slides.length;
      
      if ( futureSlideIndex <= slideCount ){
        var futureSlideDom = $(slick.$slides.get(futureSlideIndex));
        var imageID = futureSlideDom.find('div.image-wrap').attr('data-image-id');
        
        if ( futureSlideDom.find('div.image-wrap').children().length < 1 ){
          global.replaceSlideshowImage(imageID);
        }
      }

      var prevSlideIndex = nextSlide -2;

      if ( prevSlideIndex > 0 ){
        var prevSlideDom = $(slick.$slides.get(prevSlideIndex));
        var imageID = prevSlideDom.find('div.image-wrap').attr('data-image-id');
        
        if ( prevSlideDom.find('div.image-wrap').children().length < 1 ){
          global.replaceSlideshowImage(imageID);
        }
      }

    });

    $('.photo-slideshow').on('afterChange', function(event, slick, currentSlide){
      var slideDom = $(slick.$slides.get(currentSlide));
      var slidePermalink = slideDom.find('div.image-wrap').attr('data-permalink');
      let slideIndex = slideDom.data('slick-index');
      if($('.photo-modal').hasClass('open')) {
        window.history.pushState({}, "", slidePermalink);
      }

      if(slideIndex !== 0) {
        if ($('.photo-modal .prev-arrow').hasClass('hidden')) {
          $('.photo-modal .prev-arrow').removeClass('hidden')
        }
      } else {
        $('.photo-modal .prev-arrow').addClass('hidden')
      }
    });

    $('.photo-modal .modal .arrow-nav p.prev-arrow').click(function(){
      $('.photo-slideshow').slick('slickPrev');
    })
    $('.photo-modal .modal .arrow-nav p.next-arrow').click(function(){
      $('.photo-slideshow').slick('slickNext');
    }) 

  },

  replaceSlideshowImage: function(imageId) {
    var thisSlideImage = $('.photo-slideshow .slide').find('.image-wrap[data-image-id="'+ imageId +'"]');
    var thisImageSrc = thisSlideImage.attr('data-image-src');
    thisSlideImage.html('<img src="'+ thisImageSrc +'">');
  },

  stopVideo: function(videoId) {
    var iframe = $('.slide[data-video-id="'+videoId+ '"] iframe');
    console.log('stop video iframe : ', iframe );
    var player = new Vimeo.Player(iframe);
    player.pause();
    // player.unload();
  },

  playVideo: function(videoId) {

    var iframe = $('.slide[data-video-id="'+videoId+ '"] iframe');
    console.log('play video iframe : ', iframe );

    var player = new Vimeo.Player(iframe);
    player.play();

    var onEnd = function(data) {
      $(iframe).closest('.modal-wrap.open').removeClass('open');
      $(iframe).closest('.modal.visible').removeClass('visible');
    };

    player.on('ended', onEnd);
  },

  filmSlideshowModal : function() {
    var modalTrigger = $(".film-modal-trigger");
    var targetElement = document.querySelector(".film-modal");
    modalTrigger.click(function(event) {
      console.log('film modal trigger clicked')
      event.preventDefault();
      var modal = $('.modal#film-modal-slide');
      $(modal).closest('.modal-wrap').addClass('open');
      $('body').addClass('open-modal');
      $(modal).children().first().attr('data-video-id', $(this).attr('data-video-id'));
      $(modal).addClass('visible');
      disableBodyScroll(targetElement);
      global.playVideo($(this).attr('data-video-id'));
    });

    var closeModal = function() {
      $('.modal-wrap.open').removeClass('open');
      $('body').removeClass('open-modal');
      setTimeout(function(){ 
        $('.modal.visible').removeClass('visible');
      }, 200);
    }
    
    $('.film-modal .close-modal').click(function() {
      var videoId = $(this).attr('data-video-id');
      closeModal();
      global.stopVideo(videoId);
      enableBodyScroll(targetElement);
      window.history.pushState({}, "", '/films');
    });

  },

  filmSlideshow: function() {
    $('.film-slideshow').slick({
      slidesToShow: 1,
      centerMode: false,
      slidesToScroll: 1,
      arrows: true,
      infinite: true,
      fade: false,
      speed: 750,
      autoplay: false,
      swipeToSlide: true,
      accessibility: true,
      pauseOnHover: false,
      prevArrow: false,
      nextArrow: false,
      waitForAnimate: false,
      focusOnChange: true,
      lazyLoad: 'ondemand'
      // responsive: [
      //   {
      //     breakpoint: 600,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //       infinite: true,
      //       dots: true,
      //       centerMode: false,
      //       arrows: true,
      //     }
      //   }
      // ]
    });

    $('.films-page .film-thumb-wrapper').click(function() {

      var videoId = $(this).attr('data-video-id');

      var $slides = $('.film-slideshow').slick('getSlick').$slides;
      var $tar;
      // find slide of target image id
      $slides.each(function(){
        var tarSlide = $(this).find('.slide');
        if ( tarSlide.attr('data-video-id') == videoId) {
          $tar = $(this);
        }
      })

      // set idx as slick index
      var idx = $slides.index( $tar );

      $('.film-slideshow').slick("refresh");
      $('.film-slideshow').slick('slickGoTo', idx, true);
      $('.film-slideshow').slick("refresh");
      $('.film-slideshow .slick-track').attr('tabindex', 0);
    });

    $('.film-slideshow').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      console.log('beforeChange')
      var slideDomCurr = $(slick.$slides.get(currentSlide));
      var videoId = slideDomCurr.find('.slide').attr('data-video-id');
      global.stopVideo(videoId);
    });

    $('.film-slideshow').on('afterChange', function(event, slick, currentSlide){
      var slideDom = $(slick.$slides.get(currentSlide));
      var slidePermalink = slideDom.find('div.video-wrap').attr('data-permalink');
      if($('.film-modal').hasClass('open')) {
        window.history.pushState({}, "", slidePermalink);
      }
    });

    $('.film-modal .modal .arrow-nav p.prev-arrow').click(function(){
      $('.film-slideshow').slick('slickPrev');
    })
    $('.film-modal .modal .arrow-nav p.next-arrow').click(function(){
      $('.film-slideshow').slick('slickNext');
    }) 
  },

  filterFilmsByCategory: function() {
    $('.film-category').click(function(event) {
      $('.film-category').each(function( index ) {
        if ( $(this).hasClass('active')){
          $(this).removeClass('active');
        }
      });
      $(this).addClass('active');
      var categoryID = $(this).attr('data-category-id');

      if ( categoryID === 'all'){
        $('.film-thumb-wrapper').each(function( index ) {
            $(this).show();
        });

      } else {

        $('.film-thumb-wrapper').each(function( index ) {
          var catArray = $( this ).attr('data-category-id').split(',');
          if ( catArray.includes(categoryID) ){
            $(this).show();
          } else {
            $(this).hide();
          }
        });
        global.filterHandler(categoryID);
      }
    });
  },

  filterHandler: function(categoryID) {

      var previousFilter = '';
      var currentFilter = 'all';
      var filtered = 'false';
      var slick = $('.film-slideshow')[0].slick;
      var query;

      // Removes filter state if cache is active ( indicates a filter is applied).
      if (slick.$slidesCache !== null) {
        slick.unload();
        slick.$slideTrack.children(slick.options.slide).remove();
        $slickCache.appendTo(slick.$slideTrack);
        slick.reinit();
        slick.goTo(0);
      }
      query = '[data-category-id*="' + categoryID + '"]'

      // Store a deep copy of the original carousel
      $slickCache = slick.$slides.clone(true, true);

      // Store the previous filter for reference
      previousFilter = currentFilter;

      if (categoryID === 'all') {
        filtered = false;
        currentFilter = '';
      } else {
         // Pass custom function to slick to query UI for our target
        slick.filterSlides(function(index, element) {
            return $(element).find(query).length > 0;
        });

        // Reset slider position
        slick.goTo(0);

        // Store useful properties.
        filtered = true;
        currentFilter = categoryID;
      }

      return currentFilter;
    },

  mailchimpFooter : function () {
    $('footer .mc_form_inside #mc_mv_EMAIL').attr("placeholder","Enter Email")
  },

  splitSlideshowBlock: function() {
    $('.block-split-slideshow .slideshow').slick({
      slidesToShow: 1,
      centerMode: false,
      slidesToScroll: 1,
      // arrows: true,
      prevArrow: $('.block-split-slideshow .slideshow .prev-arrow'),
      nextArrow: $('.block-split-slideshow .slideshow .next-arrow'),
      appendDots: $('.block-split-slideshow .slideshow .c-slide-nav'),
      dots : true,
      infinite: true,
      fade: true,
      speed: 750,
      autoplay: false,
      swipeToSlide: true,
      accessibility: false,
      pauseOnHover: false,
    });
  },

  mailchimpSignup :{
    init : function() {
      var self = this;
      $('.newsletter-signup').submit(function(e){
        self.subscribe(e, self);
      });
    },
    form : $('.newsletter-signup'),

    subscribe : function(e, self){
      e.preventDefault();
      var form = self.form,
          td = $('.newsletter-signup').attr('data-td'),
          link = td + '/assets/includes/mc_subscribe.php',
          request = $.ajax({
                      url: link,
                      type: 'POST',
                      data : $('.newsletter-signup').serialize()
                    });
      request.done(self.handleResponse);
    },

    handleResponse : function(response){
      function outputMessage(msg, style){
        $('.newsletter-signup').find('input[type=text]').val('');
        $('.newsletter-signup').find('input[type=text]').blur();
        $('.newsletter-signup').find('input[type=text]').attr('placeholder', msg);
        var formStyle = $('.newsletter-signup').attr('data-style', style);
      };
      var form = this.form;
      var resp = JSON.parse(response);          
      if (resp.title == 'Member Exists') {
        outputMessage('Thanks Times 2!', 'success');        
      } else if (resp.title == 'Invalid Resource' || resp.title == 'Internal Server Error') {
        outputMessage('Invalid Email', 'failure');
      } else if (resp.status == 'subscribed') {
        outputMessage('Thanks', 'success');
      }else{
        outputMessage('Invalid Response');
      }
    }
  }, // End mailchimpSignup

};
module.exports = global;