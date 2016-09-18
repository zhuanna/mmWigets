/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by anna on 16/8/29.
	 */
	//reqiure
	//require('normalize.css');
	//全局变量
	window.mmWigets = {
	    //tab : require('./tab.js'),
	    //createMoreBtn : require('./createMoreBtn.js'),
	    //addMore : require('./addMore.js'),
	    ajax : __webpack_require__(1),
	    //base64 : require('./base64.js'),
	    tool:__webpack_require__(2),
	    countDown:__webpack_require__(3),
	    popWinow:__webpack_require__(4),
	    cookie:__webpack_require__(9)
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Created by anna on 16/8/22.
	 * 公共的ajax函数
	 * 参数
	 * url:请求地址
	 * type:请求方式 get,post
	 * data:请求参数--对象格式传入
	 * success:成功回调参数
	 * error:失败回调参数
	 */
	var ajax = function(arg){

	    if(!arg.url){
	        alert('没有url参数');
	        return;
	    }

	    if(arg.data && typeof arg.data != 'object'){
	        alert('请输入key-value格式的参数');
	        return;
	    }

	    arg.data = (arg.data)?arg.data:{};

	    arg.data.ran = new Date().getTime();

	    $.ajax({
	        url : arg.url,
	        type : arg.type || 'get',
	        data : arg.data || {},
	        dataType: arg.dataType || 'json',
	        timeout : arg.timeout || 3000,
	        beforeSend: arg.beforeSend || null,
	        success : function(data){
	            if(typeof arg.success === 'function'){
	                arg.success(data, arg.btn);
	            }
	        },
	        error : function(xhr){
	            if(typeof arg.error === 'function'){
	                arg.error(arg.btn,xhr);
	            }else{
	                console.log(xhr);
	            }
	        }
	    });
	};

	module.exports = ajax;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Created by anna on 16/9/2.
	 * 工具函数tool
	 */
	var tool = {
	    //获取地址栏参数
	    getParamFromURL:function(argName){
	        if(!argName){
	            alert('没有输入参数名。')
	            return;
	        }
	        if(typeof argName !== 'string'){
	            alert('参数不是字符串类型。')
	            return;
	        }
	        var args = location.search.substr(1),
	            result = args.match('(^|&)'+argName +'=([^&]*)(&|$)');
	        return (result)?result[2]:'';
	    },
	    //是否是中国移动手机号
	    isChinaMobile:function(num){
	        var chinaMobileArr = ["134", "135", "136", "137", "138", "139", "158", "159", "157", "150", "151", "188", "182", "147", "152", "183", "187", "184", "178"],
	            chinaMobileArrStr = chinaMobileArr.join(''),
	            result = num.match(/0?(13|14|15|18)[0-9]{9}/);
	        if(result){
	            if(chinaMobileArrStr.indexOf(result.input.substr(0,3)) >= 0){
	                return result.input;
	            }else{
	                console.log('输入的参数不是移动手机号');
	            }
	        }else{
	            console.log('输入的参数不是手机号');
	        }
	    }
	};

	module.exports = tool;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Created by anna on 16/9/3.
	 *参数说明：
	 *time:需要进行倒计时的时间总数,数字类型
	 *btn:倒计时其间状态不可点击的按钮,input type="button"的juqery对象
	 *btnFontColor:'#f00',默认按钮的颜色
	 *btnGreyFont:'#666',倒计时开始后的按钮颜色
	 *btnBgColor:'#000',默认按钮的背景色
	 *btnGreyBgColor:'#ccc',倒计时开始后的按钮背景色
	 *btnTxt:arguments[0].btnTxt,默认按钮上的文字
	 *changeTxt:显示倒计时秒数的文本,dom对象,如果倒计时按钮本身发生变化用不到这个参数
	 *
	 */

	var countdown = function () {
	    var timer;
	    var d = {
	        time:60,
	        btnGreyFont:'#666',
	        btnGreyBgColor:'#ccc',
	        changeTxt:null,
	        changeTxtContent:''
	    };
	    //要倒计时变化的数字
	    var changeTime =arguments[0].time || d.time ;
	    //必须大于两个参数
	    if(!arguments[0].btn) return;
	    //添加新参数
	    for(var ele in arguments[0]){
	        d[ele] = arguments[0][ele];
	    }
	    //添加默认的按钮文字到d
	    d.btnTxt= d.btn.val();
	    d.btnFontColor = d.btn.css('color');
	    d.btnBgColor = d.btn.css('background');
	    //循环执行的函数
	    (function(time){
	        var arg = arguments;
	        if (changeTime <= 0) {
	            d.btn.removeAttr("disabled");
	            d.btn.css({'color': d.btnFontColor,'background':d.btnBgColor});
	            d.btn.val(d.btnTxt);
	            if(d.changeTxt){
	                d.changeTxt.html(d.changeTxtContent);
	            }
	            changeTime = time;
	            clearTimeout(timer);
	        } else {
	            d.btn.attr("disabled", true);
	            d.btn.css({'color': d.btnGreyFont,'background': d.btnGreyBgColor});
	            if(d.changeTxt){
	                d.changeTxt.html('重新发送('+ changeTime + ')');
	            }else{
	                d.btn.val('重新发送('+ changeTime + ')');
	            }
	            changeTime--;
	            timer = setTimeout(function () {
	                arg.callee(changeTime);
	            }, 1000);
	        }
	    }(d.time));
	};
	module.exports = countdown;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by anna on 16/9/5.
	 * 提示框有多种情况
	 * tip表示提示后3秒钟消失
	 */
	__webpack_require__(5);
	//
	var popWindow = {
	    //str为提示语
	    tip:function(str){
	            var message = str || false;
	            if(message){
	                var windowEl=document.getElementById('popWindowTip');
	                if(windowEl){
	                    windowEl.innerHTML = str;
	                    windowEl.style.display='block';
	                }else{
	                    windowEl=document.createElement('div');
	                    windowEl.setAttribute('id','popWindowTip');
	                    windowEl.innerHTML=str;
	                    document.body.appendChild(windowEl);
	                }
	                setTimeout(function(){
	                    hideWindow();
	                },2000);
	            }
	        //隐藏弹窗 使用方法hideWindow();
	        function hideWindow(){
	            document.getElementById('popWindowTip').style.display = 'none';
	        }
	    }
	};

	module.exports = popWindow;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./popWindowTip.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./popWindowTip.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "#popWindowTip{width:80%;background: rgba(0,0,0,.5);position:fixed;top:50%;left:50%;transform:translate(-50%, -50%) ;padding:30px 0;color:#fff;border-radius: 5px;text-align:center;}", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
	 *Created by anna on 16/9/6.
	 *设置cookie cookie.set(name, value, expires, path, domain, secure)
	 *获取cookie cookie.get(name)
	 *删除cookie cookie.del(name, path, domain, secure)
	 */
	var cookie = {
	    get: function(name) {
	        var cookie = document.cookie;
	        var cookieName = encodeURIComponent(name) + "=";
	        var start = cookie.indexOf(cookieName);
	        var value = null;
	        if (start > -1)
	        {
	            var end = cookie.indexOf(";", start);
	            if (end == -1)
	                end = cookie.length;
	            value = decodeURIComponent(cookie.substring(start + cookieName.length, end));
	        }
	        return value;
	    },
	    set: function(name, value, expires, path, domain, secure) {
	        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
	        if (expires instanceof Date)
	            cookieText += "; expires=" + expires.toGMTString();
	        if (path)
	            cookieText += "; path=" + path;
	        if (domain)
	            cookieText += "; domain=" + domain;
	        if (secure)
	            cookieText += "; secure";

	        document.cookie = cookieText;
	    },
	    del: function(name, path, domain, secure) {
	        this.set(name, "", new Date(0), path, domain, secure);
	    }
	};
	//exports
	module.exports = cookie;

/***/ }
/******/ ]);