(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{526:function(t,n,e){"use strict";e.d(n,"a",(function(){return r})),e.d(n,"b",(function(){return o}));var r=function(t,n){return{type:"LOGIN_USER",payload:{username:t,password:n}}},o=function(t){return{type:"LOGOUT_USER",payload:{history:t}}}},923:function(t,n,e){"use strict";e.r(n);var r=e(0),o=e.n(r),u=e(723),c=e(10),i=e(526);function f(t){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function p(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t,n){return(l=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function s(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,r=b(t);if(n){var o=b(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return y(this,e)}}function y(t,n){return!n||"object"!==f(n)&&"function"!=typeof n?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):n}function b(t){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var h=function(t){!function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&l(t,n)}(c,t);var n,e,r,u=s(c);function c(){return a(this,c),u.apply(this,arguments)}return n=c,(e=[{key:"componentDidMount",value:function(){this.props.logoutUser(this.props.history)}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null)}}])&&p(n.prototype,e),r&&p(n,r),c}(r.Component);n.default=Object(c.f)(Object(u.a)(null,{logoutUser:i.b})(h))}}]);