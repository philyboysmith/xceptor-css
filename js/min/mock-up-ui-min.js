/*global Modernizr:true */




// var mainNav = {
// 	menuHeight:  "",
// 	menuOpen: "false",
// 	init: function () {
// 		var _this = this;
// 		_this.menuHeight =  _this.getMenuHeight();

// 		// initia
// 		$('.ui-navigation-header__nav-list').css('margin-top', - _this.menuHeight);

// 		// bind the click to open/close the menu
// 		$('.ui-navigation-header__title').on('click', function(e){
// 			e.preventDefault();
			
// 			var $clickedNavTitle = $(this);

// 		    $clickedNavTitle.parent('.ui-navigation-header__nav').toggleClass('ui-navigation-header__nav--open');
// 		    if (_this.menuOpen === false) {
// 		    	// open menu
// 		    	_this.openMenu($clickedNavTitle );
		    
// 		    } else {
// 		    	// close menu
// 		    	_this.closeMenu($clickedNavTitle , _this.menuHeight);
// 		    }
		   

// 		});

// 		// bind a click to select a menu item
// 		$('.ui-navigation-header__nav-list-item').on('click', function(e){
// 			e.preventDefault();
			
// 			var $clickedItem = $(this).find('span');
// 			var $currentItem = $('.ui-navigation-header__title').find('span');

// 			//$('ui-navigation-header__nav-list li').append($currentItem);
// 			$clickedItem.replaceWith( $currentItem );

// 			// set the h1 to the selected item
// 			$('.ui-navigation-header__title').html($clickedItem.find('span'));
		    
		   

// 		});


// 	},
// 	getMenuHeight: function() {
// 		return $('.ui-navigation-header__nav-list').height();
// 	},
// 	openMenu: function(navTitle) {
// 		var _this = this;
// 		navTitle.parent('.ui-navigation-header__nav').find('.ui-navigation-header__nav-list').css('margin-top', '0');
// 		_this.menuOpen = true;
// 	},
// 	closeMenu: function(navTitle, menuHeight) {
// 		var _this = this;
// 		navTitle.parent('.ui-navigation-header__nav').find('.ui-navigation-header__nav-list').css('margin-top', - menuHeight);
// 		_this.menuOpen = false;
// 	},
// 	selectItem: function(item) {
// 		var _this = this;
// 	}

// };

// //mainNav.init();




/**
 * jquery.dropdown.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */
;( function( $, window, undefined ) {

	'use strict';

	$.DropDown = function( options, element ) {
		this.$el = $( element );
		this._init( options );
	};

	// the options
	$.DropDown.defaults = {
		speed : 300,
		easing : 'ease',
		gutter : 0,
		// initial stack effect
		stack : false,
		// delay between each option animation
		delay : 0,
		// random angle and positions for the options
		random : false,
		// rotated [right||left||false] : the options will be rotated to thr right side or left side.
		// make sure to tune the transform origin in the stylesheet
		rotated : false,
		// effect to slide in the options. value is the margin to start with
		slidingIn : false,
		ddClass : 'nav-dropdown',
		onOptionSelect : function(opt) { return false; }
	};

	$.DropDown.prototype = {

		_init : function( options ) {

			// options
			this.options = $.extend( true, {}, $.DropDown.defaults, options );
			this._layout();
			this._initEvents();



		},
		_layout : function() {

			var self = this;
			this.minZIndex = 400;
			var value = this._transformSelect();
			this.opts = this.listopts.children( 'li' );
			this.optsCount = this.opts.length;
			this.size = { width : this.dd.width(), height : this.dd.height() };
			
			var elName = this.$el.attr( 'name' ), elId = this.$el.attr( 'id' ),
				inputName = elName !== undefined ? elName : elId !== undefined ? elId : this.options.ddClass + ( new Date() ).getTime();

			this.inputEl = $( '<input type="hidden" name="' + inputName + '" value="' + value + '"></input>' ).insertAfter( this.selectlabel );
			
			this.selectlabel.css( 'z-index', this.minZIndex + this.optsCount );
			this._positionOpts();
			if( Modernizr.csstransitions ) {
				setTimeout( function() { self.opts.css( 'transition', 'all ' + self.options.speed + 'ms ' + self.options.easing ); }, 25 );
			}

		},
		_transformSelect : function() {

			var optshtml = '', selectlabel = '', value = -1;
			this.$el.children( 'option' ).each( function() {

				var $this = $( this ),
					val = isNaN( $this.attr( 'value' ) ) ? $this.attr( 'value' ) : Number( $this.attr( 'value' ) ) ,
					classes = $this.attr( 'class' ),
					selected = $this.attr( 'selected' ),
					label = $this.text();

				if( val !== -1 ) {
					optshtml += 
						classes !== undefined ? 
							'<li class="nav-dropdown__list-item" data-value="' + val + '"><span class="' + classes + '">' + label + '</span></li>' :
							'<li class="nav-dropdown__list-item" data-value="' + val + '"><span>' + label + '</span></li>';
				}

				if( selected ) {
					selectlabel = label;
					value = val;
				}

			} );
			var selectLabelIcon = '<i class="nav-dropdown__toggle"><svg class="icon icon--large icon--absolute-v-middle "><use xlink:href="#dropdown1"></use></svg></i>';
			this.listopts = $( '<ul class="nav-dropdown__list" />' ).append( optshtml );
			this.selectlabel = $( '<span class="nav-dropdown__title"> </span>' ).append( selectlabel );
			this.dd = $( '<div class="' + this.options.ddClass + ' nav-dropdown"/>' ).append( this.selectlabel, selectLabelIcon, this.listopts ).insertAfter( this.$el );
			this.$el.remove();

			return value;

		},
		_positionOpts : function( anim ) {

			var self = this;

			this.listopts.css( 'height', 'auto' );
			this.opts
				.each( function( i ) {
					$( this ).css( {
						zIndex : self.minZIndex + self.optsCount - 1 - i,
						top : self.options.slidingIn ? ( i + 1 ) * ( self.size.height + self.options.gutter ) : 0,
						left : 0,
						marginLeft : self.options.slidingIn ? i % 2 === 0 ? self.options.slidingIn : - self.options.slidingIn : 0,
						opacity : self.options.slidingIn ? 0 : 1,
						transform : 'none'
					} );
					console.log('height: ' +self.size.height);
				} );

			if( !this.options.slidingIn ) {
				this.opts
					.eq( this.optsCount - 1 )
					.css( { top : this.options.stack ? 9 : 0, left : this.options.stack ? 4 : 0, width : this.options.stack ? this.size.width - 8 : this.size.width, transform : 'none' } )
					.end()
					.eq( this.optsCount - 2 )
					.css( { top : this.options.stack ? 6 : 0, left : this.options.stack ? 2 : 0, width : this.options.stack ? this.size.width - 4 : this.size.width, transform : 'none' } )
					.end()
					.eq( this.optsCount - 3 )
					.css( { top : this.options.stack ? 3 : 0, left : 0, transform : 'none' } );
			}

		},
		_initEvents : function() {
			
			var self = this;
			
			this.selectlabel.on( 'mousedown.dropdown', function( event ) {
				self.opened ? self.close() : self.open();
				return false;

			} );

			this.opts.on( 'click.dropdown', function() {
				if( self.opened ) {
					var opt = $( this );
					self.options.onOptionSelect( opt );
					self.inputEl.val( opt.data( 'value' ) );
					self.selectlabel.html( opt.html() );
					self.close();
				}
			} );

		},
		open : function() {
			var self = this;
			this.dd.toggleClass( 'nav-dropdown--active' );
			this.listopts.css( 'height', ( this.optsCount + 1 ) * ( this.size.height + this.options.gutter ) );
			this.opts.each( function( i ) {

				$( this ).css( {
					opacity : 1,
					top : self.options.rotated ? self.size.height + self.options.gutter : ( i + 1 ) * ( self.size.height + self.options.gutter ),
					left : self.options.random ? Math.floor( Math.random() * 11 - 5 ) : 0,
					width : self.size.width,
					marginLeft : 0,
					transform : self.options.random ?
						'rotate(' + Math.floor( Math.random() * 11 - 5 ) + 'deg)' :
						self.options.rotated ?
							self.options.rotated === 'right' ?
								'rotate(-' + ( i * 5 ) + 'deg)' :
								'rotate(' + ( i * 5 ) + 'deg)'
							: 'none',
					transitionDelay : self.options.delay && Modernizr.csstransitions ? self.options.slidingIn ? ( i * self.options.delay ) + 'ms' : ( ( self.optsCount - 1 - i ) * self.options.delay ) + 'ms' : 0
				} );

			} );
			this.opened = true;

		},
		close : function() {

			var self = this;
			this.dd.toggleClass( 'nav-dropdown--active' );
			if( this.options.delay && Modernizr.csstransitions ) {
				this.opts.each( function( i ) {
					$( this ).css( { 'transition-delay' : self.options.slidingIn ? ( ( self.optsCount - 1 - i ) * self.options.delay ) + 'ms' : ( i * self.options.delay ) + 'ms' } );
				} );
			}
			this._positionOpts( true );
			this.opened = false;

		}

	};

	$.fn.dropdown = function( options ) {
		var instance = $.data( this, 'dropdown' );
		if ( typeof options === 'string' ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			this.each(function() {
				instance[ options ].apply( instance, args );
			});
		}
		else {
			this.each(function() {
				instance ? instance._init() : instance = $.data( this, 'dropdown', new $.DropDown( options, this ) );
			});
		}
		return instance;
	};

} )( jQuery, window );









// new configure item action panel

var configActions = {
	panelSettings: {
		panelClass: '.ui-nav-action__panel',
		panelOpen: false,
		buttonActiveClass: 'button--active'
	},

	_init: function() {
		this._initEvents();
	},
	_initEvents: function(){
		var self = this;
		//click the action buttons
		$('.ui-nav-action').on('click', '.ui-nav-action__button', function(e){
			e.preventDefault();
			//var $actionContentPanel = $(panelClass);
		    
		    if ( $(this).hasClass(self.panelSettings.buttonActiveClass) ) {
				console.log('true - Active button clicked - panel is open');
				self._hidePanel($(this));
		    }
		    else{
		    	// check if the panel is open or not
				if (self.panelSettings.panelOpen === false) {
					console.log('false - panel is closed');
					self._showPanel($(this));
					
				}
				else {
					console.log('true - panel is open');
					self._hidePanel($(this));
					self._showPanel($(this));
				}
		    }
			

			
		});
	},
	_hidePanel: function() {
		$(this.panelSettings.panelClass).css('max-height', 0);
		$('.ui-nav-action__button').removeClass('button--active');
		this.panelSettings.panelOpen = false;	
	},
	_displayCorrectSubPanel: function(buttonName){
		console.log('button name: ' + buttonName);
		$(this.panelSettings.panelClass).find('.action-panel').removeClass('show-content');
		$(this.panelSettings.panelClass).find('#'+ buttonName).addClass('show-content');
	},
	_getPanelHeight: function(){
		var h = $(this.panelSettings.panelClass).find('.inner').outerHeight();
		return h;
	},
	_showPanel: function(buttonClicked){
		var self = this;
		
		var buttonName = buttonClicked.attr('data-button-name');

		this._displayCorrectSubPanel(buttonName);
		// get the panel height for css animation
		var panelHeight = self._getPanelHeight();
		// plus the action button height
		var actionButtonHeight = $('.ui-nav-action').height();
		// animate the panel
		$(this.panelSettings.panelClass).css('max-height', panelHeight + actionButtonHeight);

		// set active classes
		buttonClicked.addClass('button--active');
		this.panelSettings.panelOpen = true;


	}

};


$(function() {



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


	// mock the edit button being clicked
	$('.edit').on('click', function(e){
	    e.preventDefault();

	    if ( $(this).hasClass('edit-mode') ) {
	    	$('.ui-form__item').find('input, textarea').attr( "readonly", "" );
	    }
	    else{
	    	$('.ui-form__item').find('input, textarea').removeAttr( "readonly" );
	    }

	    $(this).toggleClass('edit-mode')

	});

	configActions._init();


	//---- navigation header navigation dd
	$( '#primary-nav' ).dropdown( {
		gutter : 2
	} );
	$( '#secondary-nav' ).dropdown( {
		gutter : 2
	} );

});

// mock the edit button being clicked




