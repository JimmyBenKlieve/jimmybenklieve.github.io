(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{152:function(e,t,a){"use strict";var n=a(64),c=a(63),r=a(0),o=a.n(r),s=a(20),i=a.n(s),l=a(153),u=a.n(l);t.a=function(e){var t=e.sider,a=e.siderClassName,r=e.siderStyle,s=e.siderSkew,l=void 0!==s&&s,m=e.className,d=e.children,f=e.contentClassName,S=e.contentStyle,h=Object(c.a)(e,["sider","siderClassName","siderStyle","siderSkew","className","children","contentClassName","contentStyle"]);return o.a.createElement("div",Object.assign({className:i()(m,u.a.main,Object(n.a)({},u.a.enableSkew,!!l))},h),t?o.a.createElement("div",{className:i()(a,u.a.left),style:r},t):void 0,o.a.createElement("div",{className:i()(f,u.a.right),style:S},d))}},153:function(e,t,a){e.exports={main:"MainSubLayout_main__gB1tc",left:"MainSubLayout_left__20qL0",right:"MainSubLayout_right__R4yEp",enableSkew:"MainSubLayout_enableSkew__3ffO_"}},155:function(e,t,a){e.exports={seasonSelector:"MCCA_seasonSelector__1vL9v",seasonSelectorItem:"MCCA_seasonSelectorItem__2thT-"}},161:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=(a(65),a(35)),o=a(41),s=a(16),i=a(152),l=[{to:"./",redirect:"season1",hideInMenu:!0},{to:"season1",text:"Season 1",component:c.a.lazy(function(){return a.e(6).then(a.bind(null,159))})}],u=a(155),m=a.n(u);t.default=function(e){return c.a.createElement(i.a,{sider:c.a.createElement("aside",{className:m.a.seasonSelector},c.a.createElement(r.a,{type:"right",duration:400,interval:50,delay:100,animConfig:[{x:[0,16]}]},l.filter(function(e){return!e.redirect&&!e.hideInMenu}).map(function(t){return c.a.createElement("div",{key:t.to},c.a.createElement(o.b,{className:m.a.seasonSelectorItem,to:t.to.startsWith("/")?t.to:"".concat(e.match.path,"/").concat(t.to.startsWith("./")?t.to.slice(2):t.to)},c.a.createElement("header",null,"Season 1"),c.a.createElement("div",null,"First Contact")))}))),siderSkew:!0},c.a.createElement(s.d,null,l.filter(function(e){return!e.redirect}).map(function(t){return c.a.createElement(s.b,{key:t.to,path:"".concat(e.match.path,"/").concat(t.to),component:t.component,exact:t.exact})}),l.filter(function(e){return e.redirect}).map(function(t){return c.a.createElement(s.a,{key:t.to,to:"".concat(e.match.path,"/").concat(t.redirect),exact:!0})})))}}}]);
//# sourceMappingURL=5.79fb81c1.chunk.js.map