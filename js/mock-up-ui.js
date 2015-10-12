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



//---- navigation header navigation dd

var mainNav = {
	menuHeight:  "",
	menuOpen: "false",
	init: function () {
		var _this = this;
		_this.menuHeight =  _this.getMenuHeight();

		// initia
		$('.ui-navigation-header__nav-list').css('margin-top', - _this.menuHeight);

		//this.closeMenu();
		$('.ui-navigation-header__title').on('click', function(e){
			e.preventDefault();
			
			var $clickedNavTitle = $(this);

		    $clickedNavTitle.parent('.ui-navigation-header__nav').toggleClass('ui-navigation-header__nav--open');
		    if (_this.menuOpen === false) {
		    	// open menu
		    	_this.openMenu($clickedNavTitle );
		    
		    } else {
		    	// close menu
		    	_this.closeMenu($clickedNavTitle , _this.menuHeight);
		    }
		   

		});


	},
	getMenuHeight: function() {
		return $('.ui-navigation-header__nav-list').height();
	},
	openMenu: function(navTitle) {
		var _this = this;
		navTitle.parent('.ui-navigation-header__nav').find('.ui-navigation-header__nav-list').css('margin-top', '0');
		_this.menuOpen = true;
	},
	closeMenu: function(navTitle, menuHeight) {
		var _this = this;
		navTitle.parent('.ui-navigation-header__nav').find('.ui-navigation-header__nav-list').css('margin-top', - menuHeight);
		_this.menuOpen = false;
	}

};

mainNav.init();
