jQuery(document).ready(function ($) {



    var ua = navigator.userAgent,
    isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);

  if (isMobileWebkit) {
    $('html').addClass('mobile');
  }

  $(function(){
    var iScrollInstance;

    if (isMobileWebkit) {
      // iScrollInstance = new IScroll('#scroller', {
      //   mouseWheel: true,
      //   scrollbars: true
      // });

      $('#scroller').stellar({
        scrollProperty: 'scroll',
        positionProperty: 'position',
        horizontalScrolling: false
      });
    } else {
      $.stellar({
        horizontalScrolling: false
      });
    }

    var toggleGrid = $('#wrapper');

    $('.toggle-grid').on('click', function (e) {
        e.preventDefault();
        toggleGrid.toggleClass('grid');
    });

    $('.js-plus').on('click', function (e) {
      e.preventDefault();
      var getRef = $(this).attr('href');

      if (isMobileWebkit) {
        $(getRef).toggle();
      } else {
        $(getRef).toggleClass('fade-in');
      }
    });

  });

    // initialise Stellar.js
     //$(window).stellar();

    // Cache variables for Stellar.js in the document
    var nav = $('.navigation');
    links = $(nav).find('li'),
    slide = $('.slide'),
    mywindow = $(window),
    htmlbody = $('html,body');

    // Set up for waypoints navigation
    slide.waypoint(function (event, direction) {
        // cache the variable of the data-slide attribute associated with each
        // slide
        dataslide = $(this).attr('data-slide');

        // If the user scrolls up change the navigation link that has the same
        // data-slide attribute as the slide to active and remove the active
        // class from the previous navigation link
        if (direction === 'down') {
            $('.navigation li[data-slide="' + dataslide + '"], .slide[data-slide="' + dataslide + '"]').
            addClass('active').
            prev().
            removeClass('active');
        }

        // else If the user scrolls down change the navigation link that has
        // the same data-slide attribute as the slide to active and remove the
        // active class from the next navigation link
        else {
            $('.navigation li[data-slide="' + dataslide + '"], .slide[data-slide="' + dataslide + '"]').
            addClass('active').
            next().
            removeClass('active');
        }
    });

    // waypoints doesnt detect the first slide when user scrolls back up to the
    // top so we add this little bit of code, that removes the class from
    // navigation link slide 2 and adds it to navigation link slide 1.
    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('.navigation li[data-slide="1"], .slide[data-slide="1"]').addClass('active');
            $('.navigation li[data-slide="2"], .slide[data-slide="2"]').removeClass('active');
        }
    });

    // Create a function that will be passed a slide number and then will scroll
    // to that slide using jquerys animate. The Jquery easing plugin is also
    // used, so we passed in the easing method of 'easeInOutQuint' which is
    //available throught the plugin.
    function goToByScroll(dataslide) {
        var slideToScrollTo = $('.slide[data-slide="' + dataslide + '"]');

        nav.addClass('fade');

        htmlbody.animate({
            scrollTop: slideToScrollTo.offset().top
        }, {
            duration: 1500,
            easing: 'easeOutQuart',
            complete: function () { nav.removeClass('fade'); },
            step: function (now) {
              var percent = ((100*now)/slideToScrollTo.offset().top).toFixed(0);
                if (percent >= 98 ) {
                  slideToScrollTo.addClass('active');
                }
            }
          })
          //1500, 'easeOutQuart', function () { nav.removeClass('fade') });
    }

    // When the user clicks on the navigation links, get the data-slide
    // attribute value of the link and pass that variable to the goToByScroll
    // function
    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });


    //Mouse-wheel scroll easing
    if (window.addEventListener)
        window.addEventListener('DOMMouseScroll', wheel, false);
        window.onmousewheel = document.onmousewheel = wheel;
        var time = 350;
        var distance = 100;

    function wheel(event) {
        if (event.wheelDelta) delta = event.wheelDelta / 50;
        else if (event.detail) delta = -event.detail / 1;
        handle();
        if (event.preventDefault) event.preventDefault();
        event.returnValue = false;
    }
    function handle() {

        $('html, body').stop().animate({
            scrollTop: $(window).scrollTop() - (distance * delta)
        }, time);
    }

	//keyboard  scroll easing
    $(document).keydown(function (e) {
        switch (e.which) {
            //up
        case 38:
            $('html, body').stop().animate({
                scrollTop: $(window).scrollTop() - distance
            }, time);
            break;
            //down
        case 40:
            $('html, body').stop().animate({
                scrollTop: $(window).scrollTop() + distance
            }, time);
            break;
        }
    });


});