(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{425:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return b}));var r=n(0),o=n.n(r),i=n(70),c=n(524),a=n.n(c);n(525);function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function s(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=d(e);if(t){var o=d(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return p(this,n)}}function p(e,t){return!t||"object"!==u(t)&&"function"!=typeof t?h(e):t}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(u,e);var t,n,r,c=s(u);function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),m(h(t=c.call(this,e)),"rightBarNodeRef",void 0),m(h(t),"componentWillMount",(function(){document.addEventListener("mousedown",t.handleOtherClick,!1)})),m(h(t),"componentWillUnmount",(function(){document.removeEventListener("mousedown",t.handleOtherClick,!1)})),m(h(t),"handleClose",(function(e){e.preventDefault(),t.hide()})),m(h(t),"handleOtherClick",(function(e){t.rightBarNodeRef.contains(e.target)||t.hide()})),t.handleClose=t.handleClose.bind(h(t)),t.state={},t}return t=u,(n=[{key:"hide",value:function(){document.body.classList.remove("right-bar-enabled")}},{key:"render",value:function(){var e=this,t=this.props.title,n=this.props.children||null;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"right-bar",ref:function(t){return e.rightBarNodeRef=t}},o.a.createElement("div",{className:"rightbar-title"},o.a.createElement(i.b,{to:"#",className:"right-bar-toggle float-right",onClick:this.handleClose},o.a.createElement("i",{className:"dripicons-cross noti-icon"})),o.a.createElement("h5",{className:"m-0 text-white"},t)),o.a.createElement(a.a,null,n)),o.a.createElement("div",{className:"rightbar-overlay"}))}}])&&l(t.prototype,n),r&&l(t,r),u}(r.Component);m(b,"defaultProps",{title:"Right BarLeftSide"})}}]);