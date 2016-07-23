//ico from :https://www.onlinewebfonts.com/icon/298644

function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

//ref: http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox
function setCaretPosition(elemId, caretPos) {
    var elem = document.getElementById(elemId);

    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}



document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl(function(url){
        var href= url;
	var qrcode = new QRCode(document.getElementById("qrcode"), {
	    text: url,
	    width: 170,
	    height: 170,
	    colorDark : "#000000",
	    colorLight : "#ffffff",
	    correctLevel : QRCode.CorrectLevel.H
	});

        var input = document.getElementById("href");
	input.value=url;
        setCaretPosition("href",0);
        input.blur();

	document.getElementById("href").addEventListener("keyup", function(e){
	  var val = e.target.value;
	  initHref(val);
	});


	function initHref(val){
         qrcode.clear();
	 qrcode.makeCode(val?val:href);
	}

   })
});

