webpackJsonp([5,9],{321:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={computed:{message:function t(){var t="";switch(this.$route.params.code){case"404":t="Page not found :(";break;case"500":t="Internal Server Error :(";break;default:t="Internal Server Error :("}return t}}}},604:function(t,e){},665:function(t,e,r){var s,a;r(604),s=r(321);var n=r(686);a=s=s||{},"object"!=typeof s.default&&"function"!=typeof s.default||(a=s=s.default),"function"==typeof a&&(a=a.options),a.render=n.render,a.staticRenderFns=n.staticRenderFns,a._scopeId="data-v-141651be",t.exports=s},686:function(t,e){t.exports={render:function(){var t=this;return t._h("div",{staticClass:"error-container"},[t._h("div",{staticClass:"error-wrapper"},[t._m(0)," ",t._h("div",{staticClass:"error-content-wrapper"},[t._h("div",{staticClass:"content-title",domProps:{textContent:t._s(t.$route.params.code)}})," ",t._h("div",{staticClass:"content-message",domProps:{textContent:t._s(t.message)}})])," ",t._m(1)])])},staticRenderFns:[function(){var t=this;return t._h("div",{staticClass:"error-icon-wrapper left-wrapper"},[t._h("div",{staticClass:"icon-footer"})," ",t._h("div",{staticClass:"icon-header"})])},function(){var t=this;return t._h("div",{staticClass:"error-icon-wrapper right-wrapper"},[t._h("div",{staticClass:"icon-header"})," ",t._h("div",{staticClass:"icon-footer"})])}]}}});