// Object Item menu panel
$('#js-sidebar-trigger').click(function(){
    $('.o-content').toggleClass('o-content--full-screen');
    $(this).toggleClass('ui-header-bar__expander--closed');

});

// Folder toggle in Menu panel
$('.ui-object-list__item--folder').on('click', function(e){
    e.preventDefault();
    var $folder = $(this);
    $folder.children('.ui-object-sublist').slideToggle(300, function(){
        $folder.toggleClass('ui-object-list__item--folder--open');
    });
    e.stopPropagation();
});


//hide all of the panel content areas
//$('.ui-panel-content').css('display', 'none');
// Panel's toggle
$('.ui-panel-header').on('click', function(e){
    e.preventDefault();
    var $header = $(this);
    $header.next('.ui-panel-content').slideToggle(300, function(){
        $header.parent().toggleClass('ui-panel--open');
    });
    e.stopPropagation();
});
