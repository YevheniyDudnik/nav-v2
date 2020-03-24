$(document).ready(function() {
    initNavigation();
    mmClose();
});

$(window).resize(function(){
    displayNavigationMobile();
});

function initNavigation() {
    "use strict";
    var menu = $('.navigation'),
        menuParent = menu.parent(),
        menuList = menu.find('ul'),
        subnavClass = 'sublevel-';
    // loop through main navigation, define if there are any sub-levels and wrap into container with corresponding class name
    // the function is needed because mmenu doesn't provide this functionality, and we need it to style sub-levels differently, with their own color schemes
    navigationSublevelWrap(menuList, subnavClass);
    // mobile navigation
    menu.clone().attr('id', 'navigation--mobile').mmenu({
        extensions: [
            "pageshadow",
            "border-full"
        ],
        offCanvas: {
            "zposition": "next"
        },
        navbar: {
            title: "Menu"
        },
        navbars: [
            {
                position: 'top',
                content: [
                    'close',
                    'title'
                ]
            }
        ]
    });
    
    $('.navigation:not(.mm-menu) .navigation__list>li>div>ul').desktopDropNav();
        // accordion for desktop nav
        $('.navigation:not(.mm-menu)').slideAccordion({
            activeClass: 'open-close--active',
            opener: '>a span.opener',
            slider: '>div.slide',
            animSpeed: 300
        });
        
        $('.navigation:not(.mm-menu) > ul').dropdownFit({
            dropDown: '>li>div>ul'
        });
}

function displayNavigationMobile() {
    let navigationMobile = $('#navigation--mobile');
    if ($(window).width() >= 768){
        if (typeof $(navigationMobile).data('mmenu') !== 'undefined') {
            $(navigationMobile).data('mmenu').close();
        };
    };
}

function mmClose() {
    let menuApi = $('#navigation--mobile').data('mmenu');
	$('.mm-close').click(function() {
        menuApi.close();
    });
}