/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 /* eslint-env browser */
(function() {
  'use strict';
/*

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  if ('serviceWorker' in navigator &&
    (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        // Check to see if there's an updated version of service-worker.js with
        // new files to cache:
        // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-registration-update-method
        if (typeof registration.update === 'function') {
          registration.update();
        }

        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function() {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set:
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            var installingWorker = registration.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
                case 'installed':
                  // At this point, the old content will have been purged and the
                  // fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in the page's interface.
                  break;

                case 'redundant':
                  throw new Error('The installing ' +
                    'service worker became redundant.');

                default:
                // Ignore
              }
            };
          }
        };
      }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }
*/


  jQuery(document).ready(function($){
    if (typeof $.fn.smoothScroll !== "undefined")
      $('a').smoothScroll();

    var slideshow = document.getElementById('stayshine-slideshow');
    if (slideshow){
      runSlideShow();
    }
    var $blog = $('#stayshine-blog-ui'),
      $entries = $('#stayshine-blog-ui .stayshine-blog-spot');

    $entries.each(function (i) {
      if ($(this).attr('data-href')){
        var linkhref = $(this).attr('data-href');
        $(this).load(linkhref);
      }
    });

  });


  function runSlideShow () {
    var carousel = {
      frames : {
        0 : $('.frame0'),
        1 : $('.frame1'),
        2 : $('.frame2'),
        3 : $('.frame3'),
        4 : $('.frame4')
      },

      captionDisplayed : false,

      nextFrame : function () {
        var shownFrame = this.frames[this.currentFrame],
          nextFrameNum = parseInt((++this.currentFrame % 5),10),
          nextFrame  = this.frames[nextFrameNum];
        clearTimeout(this.timer);
        shownFrame.fadeOut(300);
        nextFrame.fadeIn(900);
        this.currentFrame = nextFrameNum;
        this.showPosition();
        this.timer = setTimeout(function ()  {
          carousel.nextFrame();
        },4700);
      },

      prevFrame : function (frameNum){
        clearTimeout(this.timer);
        var shownFrame = this.frames[this.currentFrame],
          nextFrameNum = parseInt((--this.currentFrame % 5),10),
          nextFrame  = nextFrameNum === -1 ? this.frames[4]: this.frames[nextFrameNum];

        shownFrame.fadeOut(300);
        nextFrame.fadeIn(900);
        this.currentFrame = nextFrameNum === -1 ? 4 : nextFrameNum;
        this.showPosition();
        this.timer = setTimeout(function ()  {
          carousel.prevFrame();
        },4700);
      },

      showPosition : function (color) {
        var num = parseInt((this.currentFrame + 1),10);
        color = color || '#AA6C39';
        $('.carousel .frameMarker').css('background-color','#D49A6A');
        $('.carousel .frameMarker:nth-of-type('+ num +')').css('background-color',color);
      },

      stopTheRide : function () {
        clearTimeout(this.timer);
        this.timer = setTimeout(function ()  {
          carousel.nextFrame();
        },47000);
      },

      captionsOn: function () {
        if (carousel.captionDisplayed === false){
          $('.caption').fadeIn(400);
          carousel.captionDisplayed = true;
        }
      },

      captionsOff: function () {
        if (carousel.captionDisplayed === true){
          carousel.captionDisplayed = false;
          window.setTimeout(function () {
            // This is so the captions don't turn off for a quick
            // mouseleave or for a blur off one button onto a focus
            // on another button.
            if (carousel.captionDisplayed === false) {
              $('.caption').fadeOut(400).finish();
            }
          }, 50);
        }
      },

      init : function () {
        $('.carousel > div > figure').css('display','none');
        this.frames[0].css('display','block');
        this.currentFrame = 0;
        this.showPosition();

        $('#nextFrameBtn').on('click',function (evt) {
          carousel.nextFrame();
        }).on('keyup', accessibilityClickWithEnter);


        $('#prevFrameBtn').on('click',function (evt) {
          carousel.prevFrame();
        }).on('keyup', accessibilityClickWithEnter);

        $('#pauseFrameBtn')
          .on('click',function () {
            carousel.stopTheRide();
          })
          .on('keyup', accessibilityClickWithEnter);

        //set initial timeout
        this.timer = setTimeout(function ()  {
          carousel.nextFrame();
        }, 4700);

        $('.carousel').on('mouseover', carousel.captionsOn)
          .on('mouseleave',carousel.captionsOff)
          .on('blur',carousel.captionsOff);
        $('.carousel #buttonBox > div')
          .on('focus',carousel.captionsOn)
          .on('blur',carousel.captionsOff)

      }

    };
    carousel.init();
  }

  function accessibilityClickWithEnter(evt) {
    /**
     * Make sure that the buttons in the slideshow work for keyboard users
     * the same way which they work for mouse users.
     */
    if (evt.keyCode && evt.keyCode === 13) {
      console.log(evt);
      $(evt.target).trigger('click');
    }
    console.log('asdfsdaf', evt);
    return evt;
  }
})();

