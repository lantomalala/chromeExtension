// (c) hanyoud@gmail.com

var linksOpened = new Array();

/**
 * String util
 */
var strUtil = {
	DEFAULTPROT : "http://",
	trim : function(str_) {
		return str_.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
	},
	isBlank : function(str_url) {
		str_url = this.trim(str_url);
		return str_url.length == 0 ? true : false;
	},
	isURL : function(str_url) {
		if (!str_url)
			return false;
		str_url = this.trim(str_url);
		var re = new RegExp("^"
						+
						// protocol identifier
						"(?:(?:https?|ftps?)://)?"
						+
						// user:pass authentication
						"(?:\\S+(?::\\S*)?@)?"
						+ "(?:"
						+
						// IP address exclusion
						// private & local networks
						"(?!10(?:\\.\\d{1,3}){3})"
						+ "(?!127(?:\\.\\d{1,3}){3})"
						+ "(?!169\\.254(?:\\.\\d{1,3}){2})"
						+ "(?!192\\.168(?:\\.\\d{1,3}){2})"
						+ "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})"
						+
						// IP address dotted notation octets
						// excludes loopback network 0.0.0.0
						// excludes reserved space >= 224.0.0.0
						// excludes network & broacast addresses
						// (first & last IP address of each class)
						"(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])"
						+ "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}"
						+ "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))"
						+ "|"
						+
						// host name
						"(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)"
						+
						// domain name
						"(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*"
						+
						// TLD identifier
						"(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" + ")" +
						// port number
						"(?::\\d{2,5})?" +
						// resource path
						"(?:/[^\\s]*)?" + "$", "i");
		return re.test(str_url);
	},
	wireProtocol : function(str_) {
		var protre = new RegExp("^(https?|ftps?):\/\/", "i");
		if (!protre.test(str_)) {
			str_ = this.DEFAULTPROT + str_;
		}
		return str_;
	}
};

/*
 * Log util
 */
var logger = {
	OKSTR : "[OK]     ",
	ERRSTR : "[ERR]    ",
	DONESTR : "[DONE]   ",
	clearMsg : function() {
		gu.$('#logarea').value = "";
	},

	logMsg : function(msg) {
		var logarea = gu.$('#logarea');
		var _msg_ = msg;
		if (logarea.value) {
			_msg_ = "\n" + msg;
		}
		logarea.value += (_msg_);
		logarea.scrollTop = logarea.scrollHeight;
	}
};

/*
 * Multi-links manager
 */
var mlHelper = {
	processLinks : function() {
		var content = gu.$('#linkarea').value;
		var rows = []
        if(content.includes("<!LIST!>")) rows = content.split('<!LIST!>');
        else if (content.includes(",http")) rows = content.split(',')
        else rows = content.split(',')
		var urlCount = 0;
		var openInTab = true;
		var _linksLimit = gu.getOption("links_limit",gu.defaultLinksLimit);
		for (var i = 0; i < rows.length; i++) {
			if (strUtil.isBlank(rows[i]))
				continue;
			if (strUtil.isURL(rows[i]) && openInTab) {
				var url_ = rows[i];
				url_ = strUtil.wireProtocol(url_);

				linksOpened.push({
							"canOpen" : true,
							"url" : url_
						});
				if (++urlCount >= _linksLimit) {
					openInTab = false;
				}
			} else if (openInTab) {
				linksOpened.push({
							"canOpen" : false,
							"url" : rows[i]
						});
			}
		};
		logger.clearMsg();
		mlHelper.openLinks();
	},
	countOpendLinks : 0,
	countAllLinks : 0,
	openLinks : function() {
		var _intervalTime = gu.getOption("links_interval_time",gu.defaultIntervalTime);
		if (linksOpened.length > 0) {
			var obj = linksOpened.shift();
			if (obj.canOpen) {
				// Open links in inactive tabs
				chrome.tabs.create({
							url : obj.url,
							active : false
						});
				this.countOpendLinks++;
				logger.logMsg(logger.OKSTR + obj.url);
				setTimeout(function(){mlHelper.openLinks();}, _intervalTime);
				this.countAllLinks++;
			} else {
				logger.logMsg(logger.ERRSTR + obj.url);
				setTimeout(function(){mlHelper.openLinks();}, 0);
				this.countAllLinks++;
			}

		}else{
			logger.logMsg("==========================");
			logger.logMsg(logger.DONESTR + this.countAllLinks + " line(s) were found, "
					+ this.countOpendLinks + " url(s) have be processed.");
		}
	}
};

/*
 * Just add event listener
 */
document.addEventListener('DOMContentLoaded', function() {
			gu.$('#linkarea').focus();
			// document.body.addEventListener('click', function(){gu.$('#linkarea').focus()});
			document.querySelector('#confbtn').addEventListener('click',
					mlHelper.processLinks);

		});