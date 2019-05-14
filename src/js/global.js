'use strict';

var $ = require('jquery');
window.jQuery = window.$ = require("jquery");
// var animsition = require('animsition');
var smoothState = require('./smoothState.js');
var lazyload = require('jquery-lazyload/jquery.lazyload.js');
var lazysizes = require('lazysizes');
var slick = require('slick-carousel');
var salvattore = require("salvattore");

var global = {
  init: function(){
  },

  ready: function(){
    this.pageTransitions();
    // this.menuToggle();
    // this.mailchimpSignup.init(this.mailchimpSignup);
    lazySizes.init();
    this.topArea();
    this.scroll();
    this.exploreSlideshow();
    this.splitSlideshowBlock();
    this.accordion();
    this.getInstalink();
    this.mailchimpFooter();
    this.togglePhotoView();
    this.modals();
    this.photoModal();
    this.photographySlideshow();
    this.filmSlideshowModal();
    this.filmSlideshow();
    this.filterFilmsByCategory();
    window.lazySizesConfig = {
      addClasses: true
    };
  },
  
  resize:function(){
  },
  
  scroll: function(){
    this.headerScroll();
    this.parallaxTop();
  },

  pageTransitions: function () {
    'use strict';
    var options = {
      prefetch: true,
      cacheLength: 2,
      debug: true,
      // anchors: '.transition-link:not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not(.trigger)',
      onStart: {
        duration: 750, // Duration of our animation
        render: function ($container) {
          // Add your CSS animation reversing class
          $container.addClass('is-exiting');

          // Restart your animation
          smoothState.restartCSSAnimations();
        }
      },
      onReady: {
        duration: 0,
        render: function ($container, $newContent, url) {
          // Remove your CSS animation reversing class
          let path = location.pathname;
          if (path === '/') {
            path = 'home'
          }
          $container.removeClass();
          // $container.removeClass('is-exiting');
          $container.addClass(path);

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
    console.log('togglePhotoView RAN')
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

  modals : function () {
    var modalTrigger = $(".modal-trigger");
    
    var playVideo = function(modalId) {
      // Get iFrame and player by Modal Id
      var iframe = $('.modal#'+modalId+ ' iframe');
      var player = new Vimeo.Player(iframe);
      player.play();
      var onEnd = function(data) {
        $(iframe).closest('.modal-wrap.open').removeClass('open');
        $(iframe).closest('.modal.visible').removeClass('visible');
      };
      player.on('ended', onEnd);
    };

    var stopVideo = function (modalId) {
      //Get iFrame and player by Modal Id
      var iframe = $('.modal#'+modalId+ ' iframe');
      var player = new Vimeo.Player(iframe);
      player.unload();
    };

    modalTrigger.click(function(event) {
    console.log('modal-trigger clicked')
      event.preventDefault();
      var modalId = $(this).attr('data-modal-id');
      var modal = $('.modal#vimeo-modal-' + modalId);
      $(modal).closest('.modal-wrap').addClass('open');
      $(modal).addClass('visible');

      //Is there is a video?
      if (modalId.includes('vimeo')) {
        playVideo(modalId);
      }

    });

    var closeModal = function(modalId) {
      // Need to stop a video when the modal is closed
      $('.modal-wrap.open').removeClass('open');
      setTimeout(function(){
        $('.modal.visible').removeClass('visible');
        // Is there a video in the modal? Stop it
      }, 200);
      if (modalId.includes('vimeo')) {
        stopVideo(modalId);
      }
    };

    // $('.overlay').click(function() {
    //   var modalId = $(this).siblings('.modal.visible').attr('id');
    //   closeModal(modalId);
    // });

    $('.close-modal').click(function() {
      var modalId = $(this).parent('.modal').attr('id');
      closeModal(modalId);
    });
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

  photoModal : function() {
    var modalTrigger = $(".photo-modal-trigger");
    modalTrigger.click(function(event) {
      console.log('photo modal trigger clicked')
      event.preventDefault();
      var modal = $('.modal#photo-modal-slide');
      $(modal).closest('.modal-wrap').addClass('open');
      $(modal).addClass('visible');
    });

    var closeModal = function() {
      $('.modal-wrap.open').removeClass('open');
      setTimeout(function(){ 
        $('.modal.visible').removeClass('visible');
      }, 200);
    }

    $('.close-modal').click(function() {
      closeModal();
    });

  },

  topArea : function () {
    var topTitle = $('.top-area .c-title > p');
    topTitle.replaceWith('<h1>' + topTitle.html() + '</h1>');
  },

  menuToggle: function () {
    $('.menu-toggle').click(function(){
      $('body').addClass('menu-open');
    });
    $('.close-menu').click(function(){
      $('body').removeClass('menu-open');
    });
    $('.menu-wrap').click(function(){
      $('body').removeClass('menu-open');
    });
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
    $('.slideshow.explore-slideshow').slick({
      slidesToShow: 1,
      centerMode: false,
      slidesToScroll: 1,
      arrows: true,
      infinite: true,
      fade: false,
      speed: 750,
      autoplay: false,
      swipeToSlide: true,
      accessibility: false,
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
      var nextSlideDom = $(slick.$slides.get(nextSlide));
      // console.log(nextSlideDom);
      var imageID = nextSlideDom.find('div.explore-wrap').attr('data-image-id');
      // console.log(imageID);
      global.replaceExploreImage(imageID);
    });
  },

  replaceExploreImage: function(imageId){
    // console.log('replaceSlideshowImage ran:::', imageId);
    var thisSlideImage = $('.slideshow.explore-slideshow .slide').find('.explore-wrap[data-image-id="'+ imageId +'"]');
    var thisImageSrc = thisSlideImage.attr('data-image-src');
    var thisImageAlt = thisSlideImage.attr('data-image-alt');
    thisSlideImage.html('<img src="'+ thisImageSrc +'" alt="'+ thisImageAlt +'">');
  },

  photographySlideshow: function() {
    $('.photo-slideshow').slick({
      slidesToShow: 1,
      centerMode: false,
      slidesToScroll: 1,
      arrows: true,
      infinite: true,
      fade: false,
      speed: 750,
      autoplay: false,
      swipeToSlide: true,
      accessibility: false,
      pauseOnHover: false,
      prevArrow: false,
      nextArrow: false,
      waitForAnimate: false,
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

      $('.photo-slideshow').slick("refresh");
      $('.photo-slideshow')[0].slick.cssTransitions = false;
      $('.photo-slideshow').slick('slickGoTo', idx, true);
      // $('.photo-slideshow').slick('slickGoTo', slideIndex, true);
      $('.photo-slideshow').slick("refresh");
    });
    $('.photo-slideshow').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      var nextSlideDom = $(slick.$slides.get(nextSlide));
      // console.log(nextSlideDom);
      var imageID = nextSlideDom.find('div.image-wrap').attr('data-image-id');
      // console.log(imageID);
      global.replaceSlideshowImage(imageID);
    });
    $('.photo-modal .modal .arrow-nav p.prev-arrow').click(function(){
      $('.photo-slideshow').slick('slickPrev');
    })
    $('.photo-modal .modal .arrow-nav p.next-arrow').click(function(){
      $('.photo-slideshow').slick('slickNext');
    }) 
  },

  replaceSlideshowImage: function(imageId){
    // console.log('replaceSlideshowImage ran:::', imageId);
    var thisSlideImage = $('.photo-slideshow .slide').find('.image-wrap[data-image-id="'+ imageId +'"]');
    var thisImageSrc = thisSlideImage.attr('data-image-src');
    thisSlideImage.html('<img src="'+ thisImageSrc +'">');
  },

  filmSlideshowModal : function() {
    var modalTrigger = $(".film-modal-trigger");
    modalTrigger.click(function(event) {
      console.log('film modal trigger clicked')
      event.preventDefault();
      var modal = $('.modal#film-modal-slide');
      $(modal).closest('.modal-wrap').addClass('open');
      $(modal).addClass('visible');
    });

    var closeModal = function() {
      $('.modal-wrap.open').removeClass('open');
      setTimeout(function(){ 
        $('.modal.visible').removeClass('visible');
      }, 200);
    }
    
    $('.close-modal').click(function() {
      closeModal();
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
      accessibility: false,
      pauseOnHover: false,
      prevArrow: false,
      nextArrow: false,
      waitForAnimate: false,
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
      console.log('slick slides: ', $slides)
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
      var categoryID = $(this).attr('data-category-id');
      console.log('categoryID::::', categoryID);

      $('.film-thumb-wrapper').each(function( index ) {
        var catArray = $( this ).attr('data-category-id').split(',');
        if ( catArray.includes(categoryID) ){
          $(this).show();
        } else {
          $(this).hide();
        }
      });

      // filter slick slides
      $('.film-slideshow').slick('slickUnfilter');
      $('.film-slideshow')[0].slick.refresh()
      // $('.film-slideshow').slickUnfilter();
      $('.film-slideshow .slick-slide').each(function(){
        $(this).removeClass('slide-visible');
      });

      $('.film-slideshow .slide').each(function(){
        if( $(this).attr('data-category-id').split(',').includes(categoryID) ){
          console.log('found target cat only :: ', $(this).attr('data-video-id'));
          $(this).parent().parent().addClass('slide-visible');
        }
      });

      $('.film-slideshow').slick('slickFilter', '.slide-visible');
      var $afterSlides = $('.film-slideshow').slick('getSlick').$slides;
      console.log('AFTER SLICK FILTER slick slides: ', $afterSlides);
    });
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