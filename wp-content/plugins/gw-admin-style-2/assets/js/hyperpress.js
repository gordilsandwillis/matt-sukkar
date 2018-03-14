var $ = jQuery.noConflict();
HYPER = {
  ready : function (){
    this.mediaUploader();
    this.WPcolorPicker();
    this.addBodyClass();
    this.filterOnChange(); // Hide submit buttons
    this.checkAdminMenu();
  },
  load : function (){
    this.addColumnIcon();    
  },
  checkAdminMenu : function(){
    $('.hyperpress-logout').appendTo('#adminmenuwrap');
  },
  resize : function(){
  },
  addColumnIcon : function(){
    function getURLParameter(name) {
        return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
        );
    }
    var typeName = getURLParameter('post_type');
    $('#adminmenu li a[href*="post_type='+typeName+'"]').find('.wp-menu-image').clone().appendTo('tbody .column-post_thumb');
  },
  addBodyClass : function(){
    var loc = window.location.href;
    var output  = loc.split('/').pop().split('.').shift()
    $('body').addClass('page-'+output);
  },
  filterOnChange : function(){
    $('#filter-by-date').change(function(){
      $(this).closest('form').submit();
    });
  },
  WPcolorPicker: function(){
    $('.color-field').wpColorPicker();
  },
  mediaUploader : function(){
    var custom_uploader;
    $('.upload_button').click(function(e) {
      parent = $(this).parent('li');
      e.preventDefault();

      custom_uploader = wp.media.frames.file_frame = wp.media({
        title: 'Choose Image',
        button: {text: 'Choose Image'},
        multiple: false
      });

      custom_uploader.on('select', function() {
        attachment = custom_uploader.state().get('selection').first().toJSON();
        parent.find('.image_field').val(attachment.url);
        parent.find('.image').attr('src', attachment.url);
      });

      if (custom_uploader) {
        custom_uploader.open();
        return;
      }else{
        custom_uploader.open();  
      }
    });
  }
};

$(document).ready(function(){
  HYPER.ready();      
});

$(window).load(function(){
  HYPER.load();      
});

$(window).resize(function(){
  HYPER.resize();      
});