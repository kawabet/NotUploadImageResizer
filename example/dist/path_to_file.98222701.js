parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"NCdG":[function(require,module,exports) {
"use strict";function e(e,t,n){var a=document.createElement("canvas"),r=a.getContext("2d"),i=new Image,o=e.substring(0,e.indexOf(";")).replace("data:","");return i.src=e,new Promise(function(e,h){i.onload=function(){var h,c,d;t&&t>0?i.width>i.height?(h=i.height/i.width,c=t,d=t*h):(h=i.width/i.height,c=t*h,d=t):(c=i.width,d=i.height),a.height=d,a.width=c,r.drawImage(i,0,0,c,d);var g,s,w,u,l=a.toDataURL(o);for(u=(s=atob(l.split("base64,")[1])).length,g=new Uint8Array(u),w=0;w<u;)g[w]=s.charCodeAt(w),w++;n||(n="".concat(Date.now(),".").concat(o.replace("image/","")));var f=new File([g],n,{type:o});e(f)},i.onerror=function(e){return h(e)}})}function t(e,t){var n=document.createElement("canvas"),a=n.getContext("2d"),r=new Image,i=e.match(".+/(.+?)([?#;].*)?$")[1],o=i.substring(i.lastIndexOf(".")+1,i.length);"jpg"==o&&(o="jpeg");var h="images/".concat(o);return r.src=e,new Promise(function(e,o){r.onload=function(){var o,c,d;t&&t>0?r.width>r.height?(o=r.height/r.width,c=t,d=t*o):(o=r.width/r.height,c=t*o,d=t):(c=r.width,d=r.height),n.height=d,n.width=c,a.drawImage(r,0,0,c,d);var g,s,w,u,l=n.toDataURL(h);for(u=(s=atob(l.split("base64,")[1])).length,g=new Uint8Array(u),w=0;w<u;)g[w]=s.charCodeAt(w),w++;var f=new File([g],i,{type:h});e(f)},r.onerror=function(e){return o(e)}})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.base64ToFile=e,exports.pathToFile=t;
},{}],"uKOX":[function(require,module,exports) {
"use strict";var e=require("../../../index"),n=document.querySelector(".image"),o=n.src,c=new Image;c.onload=function(){(0,e.pathToFile)(o).then(function(e){console.info(e)})},c.src=o;
},{"../../../index":"NCdG"}]},{},["uKOX"], null)
//# sourceMappingURL=path_to_file.98222701.js.map