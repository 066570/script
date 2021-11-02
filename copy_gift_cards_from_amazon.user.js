// ==UserScript==
// @name           Easily Copy Amazon Purchased Gift Cards
// @namespace      copy-amazon-purchased-cards
// @description    ALlows for easy copying of gift cards purchased through Amazon to be added to a Simplify Shopping spreadsheet.
// @match          *://egift.activationspot.com/*
// @author         Anonymous
// @version        1.0.1
// @updateURL      https://github.com/066570/script/raw/master/copy_gift_cards_from_amazon.user.js
// @downloadURL    https://github.com/066570/script/raw/master/copy_gift_cards_from_amazon.user.js
// @require        http://code.jquery.com/jquery-3.4.1.min.js
// @run-at         document-end
// @grant          unsafeWindow
// ==/UserScript==

$(document).ready( function() {

    function copyToClipboard(element) {
        navigator.clipboard.writeText(element)
            .then(() => {
            console.log('Text copied to clipboard');
            document.getElementById('copyMsg').innerHTML = 'Text copied to clipboard.';
            setTimeout(
                function()
                {
                    document.getElementById('copyMsg').innerHTML = '';
                }, 5000);
        })
            .catch(err => {
            console.error('Error in copying text: ', err);
            $('#copyMsg').addClass('error');
            document.getElementById('copyMsg').innerHTML = 'Error while copying: '+err;
            setTimeout(
                function()
                {
                    document.getElementById('copyMsg').innerHTML = '';
                }, 5000);
        });
    }
    
    document.onkeyup = function(e) {
	    if (e.ctrlKey && e.altKey && e.which == 67) {
            copyToClipboard(copyMe)
	    }
    };

    var cardNum = $("#cardNumber2").text().split(" ").join("");
    var cardPin = $("#Span2").text().toString();

    var copyMe1 = cardNum + "\t" + cardPin + "\n";
    var copyMe = copyMe1.toString();

    unsafeWindow.copyToClipboard = copyToClipboard;
    unsafeWindow.copyMe = copyMe;

    var css = '<style>#copyBtn{border-radius:5px;border:none;padding:5px;margin-left:8px;background-color:#4694ff;color:white;}#copyBtn:hover{background-color:#1477ff;}#copyMsg{height:18px;color:#0a0;font-weight:400;margin-top:5px;}.error{color:#a00;}</style>';

    var copyBtn = '<button id=\"copyBtn\" onclick=\"copyToClipboard(copyMe)\">Copy</button><h5 id=\"copyMsg"></h5>';

    $("#Span2").after(css,copyBtn);

});
