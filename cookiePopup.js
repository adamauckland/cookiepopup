/**
 * @namespace
 */
(
	function() {
		"use strict";

		/**
		 * @namespace
		 * @description A simple cookie message popup to be compliant with the EU cookie directive ruling.
		 */

		CookiePopupManager = {

			/**
			 * @default
			 * @description Store the configuration and allow some defaults which may be overriden
			 */

			configuration: {
				COOKIE_INFORMATION_URL: '/',
				COOKIE_POPUP_POSITION: 'top',
				COOKIE_NAME: 'EUCookieAccepted',
				COOKIE_VALUE: 'Cookies Accepted'
			},



			/**
			 * @function
			 * @description Create a div with a message and attach it to the body element.
			 */

			initialise: function (configuration) {
				if (configuration !== undefined) {
					CookiePopupManager.overrideConfiguration(configuration);
				}

				if (CookiePopupManager.userHasAcceptedCookies() ) {
					return;
				}

				/**
				 * Create a popup and store a reference to it
				 */

				CookiePopupManager.messageContainer = CookiePopupManager.createPopupMessage();

				if (CookiePopupManager.messageContainer != null) {

				}
			},



			/**
			 * @function
			 * @description Merge the users configuration into our default configuration
			 */

			overrideConfiguration: function(configuration) {
				for(var configurationItemKey in configuration) {
					CookiePopupManager.configuration[configurationItemKey] = configuration[configurationItemKey];
				}
			},



			/**
			 * @function
			 * @description CreatePopupMessage
			 */

			createPopupMessage: function () {
				var cookieHtmlBuilder = [];
				cookieHtmlBuilder.push( '<div id="cookiePopupContainer" style="position: fixed; ');
				cookieHtmlBuilder.push( CookiePopupManager.configuration.COOKIE_POPUP_POSITION );
				cookieHtmlBuilder.push( ': 0px; background: #fff; border: solid 1px #ccc; padding: 1em; margin: 0; width: auto;">' );
				cookieHtmlBuilder.push( 'This site uses cookies. By using this site you agree to allow cookies to be stored in your browser. ');
				cookieHtmlBuilder.push( 'For more details visit <a href="' + CookiePopupManager.configuration.COOKIE_INFORMATION_URL + '">' );
				cookieHtmlBuilder.push( 'the cookie page</a> for details. ' );
				cookieHtmlBuilder.push( '<span style="margin-right: 4em; float:right; ">' );
				cookieHtmlBuilder.push( '<a href="#" onclick="return CookiePopupManager.closePopup();">I agree to accept cookies</a></span></div>' );

				var cookieHtml = cookieHtmlBuilder.join(' ');

				var searchForBody = document.getElementsByTagName('body');
				if(searchForBody.length == 1) {
					var bodyTag = searchForBody[0];

					var popupDiv = document.createElement('div');
					popupDiv.innerHTML = cookieHtml;
					bodyTag.appendChild(popupDiv);

					return popupDiv;
				}

				/**
				 * No body element. exit
				 */
				return null;
			},



			/**
			 * @function
			 * @description Close the cookie popup container.
			 */

			closePopup: function () {
				CookiePopupManager.storeCookie();

				var cookiePopupParent = CookiePopupManager.messageContainer.parentNode;
				cookiePopupParent.removeChild(CookiePopupManager.messageContainer);
			},



			/**
			 * @function
			 * @description Check for a saved cookie indicating the user has accepted cookies
			 */

			userHasAcceptedCookies: function() {
				var cookieArray = document.cookie.split(";");
				var cookieName, cookieValue, cookieSplit;

				for (i = 0; i < cookieArray.length;i++) {
					if (cookieArray[i].indexOf('=') != -1) {
						cookieSplit = cookieArray[i].split('=');
						cookieName = cookieSplit[0].replace(/^\s+|\s+$/g, '');
						cookieValue = unescape(cookieSplit[1].replace(/^\s+|\s+$/g, ''));

						if ((cookieName == CookiePopupManager.configuration.COOKIE_NAME) &&
							(cookieValue == CookiePopupManager.configuration.COOKIE_VALUE)) {
							return true;
						}
					}
				}

				return false;
			},



			/**
			 * @function
			 * @description Store a cookie in the browser
			 *
 			 * Set the cookie to expire ten years in the future.
			 * Note - some browsers may potentially have problems with dates
			 * greater than 2038, although I would be surprised if this hasn't been fixed.
			 *
			 * Search for Y2038 issue for more information.
			 *
			 * Since we are only setting the cookie once, in ten years time the message will reappear.
			 * I have decided I would rather that inconvenience than add
			 * extra code in to reset the expiry on every page refresh.
			 *
			 */

			storeCookie: function() {
				var expiryDate = new Date();
				expiryDate.setDate(expiryDate.getDate() + 365 * 10);

				var cookieValue = escape(CookiePopupManager.configuration.COOKIE_VALUE) + '; expires=' + expiryDate.toUTCString();
				var previousCookies = document.cookie;

				if(previousCookies != '') {
					previousCookies = previousCookies + ';';
				}

				/**
				 * Add the cookie in
				 */

				document.cookie = previousCookies + CookiePopupManager.configuration.COOKIE_NAME + "=" + cookieValue;
			}
		}
	}
)();
