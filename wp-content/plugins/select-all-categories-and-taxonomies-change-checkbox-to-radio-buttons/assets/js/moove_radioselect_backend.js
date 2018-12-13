(function($){
    $(document).ready(function(){

        $(document).on('change', '.moove-taxonomy-cnt select', function(){
            if ( $( this ).val() === 'checkbox' ) {
                $( this ).closest('td').find( '.moove_select_all_btn' ).removeClass("moove-hidden").show();
            } else {
                $( this ).closest('td').find(' .moove_select_all_btn' ).addClass("moove-hidden").hide();
            }
        });
        $(document).on( 'click','.moove-radioselect-selectall', function(e){
            e.preventDefault();
            cntid = $( this ).closest('.tabs-panel').attr('id');
            $sector_checkBoxes = $('div#'+cntid+'.tabs-panel input[type="checkbox"]');
            $sector_selected_checkBoxes = $('div#'+cntid+'.tabs-panel input[type="checkbox"]:checked');

            if ($(this).hasClass('moove-radioselect-deselect')) {
                $sector_checkBoxes.attr( "checked", false );
            } else {
                $sector_checkBoxes.attr( "checked", true );
            }
            $( this ).toggleClass( 'moove-radioselect-deselect' ).attr('id');
        });
        $(document).on('click','.moove_updated_taxonomy_select_switcher .category-tabs li > a',function(e){
            e.preventDefault();
            var id = $(this).attr('href');
            $(this).closest('.moove_updated_taxonomy_select_switcher').find('.tabs').removeClass('tabs');
            $(this).closest('li').addClass('tabs');
            $(this).closest('.moove_updated_taxonomy_select_switcher').find('.tabs-panel').hide();
            $(id).show();
        });

        $(document).on('change','.moove-tax-popular input[type="radio"]',function(e){
            var selected = $(this).val();
            console.log(selected);
            $(this).closest('.moove_updated_taxonomy_select_switcher').find('.moove-tax-mainchecklist input[type="radio"][value="'+selected+'"]').prop('checked',true);
        });

        $(document).on('change','.moove-tax-mainchecklist input[type="radio"]',function(e){
            
            $(this).closest('.moove_updated_taxonomy_select_switcher').find('.moove-tax-popular input[type="radio"]').prop('checked',false);
        });

    });
})(jQuery);
