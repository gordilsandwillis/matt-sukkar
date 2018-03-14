'use strict';

var Bricklayer = require("bricklayer");
var slick = require('slick-carousel');

var homepage = {
  init: function(){
  },

  ready: function(){
  },
  
  resize:function(){
  },
  
  scroll: function(){
  },

  staggeredGrid: function() {
  	var bricklayer = new Bricklayer(document.querySelector('.home-grid'));
  },

};
module.exports = homepage;