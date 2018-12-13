'use strict';

var $ = require('jquery');
window.jQuery = window.$ = require("jquery");
var animsition = require('animsition');
var lazyload = require('jquery-lazyload/jquery.lazyload.js');
var lazysizes = require('lazysizes');
var slick = require('slick-carousel');

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
    this.slideshowBlock();
    this.splitSlideshowBlock();
    this.accordion();
    this.getInstalink();
    this.modals();
    this.mailchimpFooter();
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
    $(".animsition").animsition({
      inClass: 'fade-in',
      outClass: 'fade-out',
      inDuration: 500,
      outDuration: 500,
      linkElement: '.transition-link:not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not(.trigger)',
      // linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([href^="deadlink"])',
      // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
      loading: true,
      loadingParentElement: 'body', //animsition wrapper element
      loadingClass: 'page-loading',
      loadingInner: '', // e.g '<img src="loading.svg" />'
      timeout: true,
      timeoutCountdown: 50000,
      onLoadEvent: true,
      browser: [ 'animation-duration', '-webkit-animation-duration'],
      // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
      // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
      overlay : false,
      overlayClass : 'animsition-overlay-slide',
      overlayParentElement : 'body',
      transition: function(url){ window.location.href = url; }
    });

    $('.animsition').on('animsition.inStart', function(){
      $('.page-loader').addClass('loaded');
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

  modals : function () {
    var modalTrigger = $(".modal-trigger");
    modalTrigger.click(function(event) {
      event.preventDefault();
      var modalId = $(this).attr('data-modal-id');
      var modal = $('.modal#' + modalId);
      $(modal).closest('.modal-wrap').addClass('open');
      $(modal).addClass('visible');
    });

    var closeModal = function() {
      $('.modal-wrap.open').removeClass('open');
      setTimeout(function(){ 
        $('.modal.visible').removeClass('visible');
      }, 200);
    }

    $('.overlay').click(function() {
      closeModal();
    });

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

  slideshowBlock: function() {
    $('.block-slideshow .slideshow').slick({
      slidesToShow: 3,
      centerMode: true,
      slidesToScroll: 1,
      arrows: true,
      infinite: true,
      fade: false,
      speed: 750,
      autoplay: false,
      swipeToSlide: true,
      accessibility: false,
      pauseOnHover: false,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            centerMode: false,
            arrows: true,
          }
        }
      ]
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