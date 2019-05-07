'use strict';

var salvattore = require("salvattore");
var slick = require('slick-carousel');

var photography = {
  init: function(){
    this.toggleView();
  },

  ready: function(){
  	this.toggleView();
  },
  
  resize:function(){
  },
  
  scroll: function(){
  },

  toggleView: () => {
  	$('.photography-page .toggle-view .toggle-full').click(() => {
  		console.log('toggle full')
  		$('.photography-page .toggle-view .toggle-full').addClass('active');
  		$('.photography-page .toggle-view .toggle-grid').removeClass('active');
  		$('.staggered-photo-grid').addClass('full-width');
  		salvattore.recreateColumns(document.querySelector('.staggered-photo-grid'));
  	})
  	$('.photography-page .toggle-view .toggle-grid').click(() => {
  		console.log('toggle grid')
  		$('.photography-page .toggle-view .toggle-full').removeClass('active');
  		$('.photography-page .toggle-view .toggle-grid').addClass('active');
  		$('.staggered-photo-grid').removeClass('full-width');
  		salvattore.recreateColumns(document.querySelector('.staggered-photo-grid'));
  	})
  }

};
module.exports = photography;