var hyper = {
  modules : [],
  init : function(){
    this.modules.forEach(function(item, i){
      if(item.hasOwnProperty('init')){
        item.init(item);
      }
    });
  },
  ready : function(){
    this.modules.forEach(function(item, i){
      if(item.hasOwnProperty('ready')){
        item.ready(item);
      }
    });
  },
  scroll : function(){
    var self = this;
      self.modules.forEach(function(item, i){
        if(item.hasOwnProperty('scroll')){
          item.scroll(item);
        }
      });
  },
  resize : function(){
    this.modules.forEach(function(item, i){
      if(item.hasOwnProperty('resize')){
        item.resize(item);
      }
    });
  }
}

hyper.modules.push( require('./global') );
hyper.modules.push( require('./homepage') );
// hyper.modules.push( require('./photography') );
 
hyper.init(hyper);
document.addEventListener('DOMContentLoaded', hyper.ready.bind(hyper));
document.addEventListener('scroll', hyper.scroll.bind(hyper));
window.addEventListener('resize', hyper.resize.bind(hyper));