'use strict';

var $ = require('jquery');
window.jQuery = window.$ = require("jquery");
var animsition = require('animsition');
var lazyload = require('jquery-lazyload/jquery.lazyload.js');
var lazysizes = require('lazysizes');

var global = {
  init: function(){
  },

  ready: function(){
    this.pageTransitions();
    this.menuToggle();
    this.mailchimpSignup.init(this.mailchimpSignup);
    lazySizes.init();
    window.lazySizesConfig = {
      addClasses: true
    };
  },
  
  resize:function(){
  },
  
  scroll: function(){
    this.mobileHeader();
    this.parallaxTop();
  },

  pageTransitions: function () {
    $(".animsition").animsition({
      inClass: 'fade-in',
      outClass: 'fade-out',
      inDuration: 1500,
      outDuration: 800,
      linkElement: '.transition-link',
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

  mobileHeader: function () {
    var scrollTop = $('body').scrollTop();
    if (scrollTop > 100) {
      $('header').addClass('solid');
    } else {
      $('header').removeClass('solid');
    }
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