
/*
 * general util
 */
var gu = {
	defaultLinksLimit : 30,
	defaultIntervalTime : 200,
	$ : function(selector){
		return document.querySelector(selector);
	},
	getOption : function(key, defaultValue) {
		var value = localStorage[key];
		if (!value) {
			return defaultValue;
		} else {
			return value;
		}

	},
	saveOption : function(key, value) {
		localStorage[key] = value;
	},
	updateStatus : function(div, msg){
		var status = document.getElementById(div);
		status.innerHTML = msg;
		setTimeout(function() {
			status.innerHTML = "";
		}, 1000);
	}

};