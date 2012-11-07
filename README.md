EU Cookie Directive compliance script
=====================================

In light of the EU Cookie Directive ruling, I have written a small piece of JavaScript to put on any site which uses cookies. The code overlays a once-only message over the site with a configurable link to your cookie information page.

How To Use
Download the .js file

Add a link to the JavaScript file in your HTML. I use

  <script type="text/javascript" src="/media/js/cookiePopup.js" ></script>

Add your configuration options using a small piece of script on your pages. I suggest you add it to the bottom of the page, just before the closing tag.

Possible configuration options are:

  COOKIE_POPUP_POSITION: 'top'

or

  COOKIE_POPUP_POSITION: 'bottom'

Either top or bottom realistically.

You can also override COOKIE_NAME and COOKIE_VALUE which refer to the cookie name and cookie value to stop the message appearing again. In case of cookie clashes.

To block Google Analytics or other trackers from dropping cookies until the user has consented, use the following script:

  <script type="text/javascript"> 
      if (CookiePopupManager.userHasAcceptedCookies()) {
        // Put your Google Analytics or other tracking in here…
      }
  </script>
