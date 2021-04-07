(function(t){function e(e){for(var a,n,o=e[0],c=e[1],r=e[2],u=0,m=[];u<o.length;u++)n=o[u],Object.prototype.hasOwnProperty.call(l,n)&&l[n]&&m.push(l[n][0]),l[n]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);d&&d(e);while(m.length)m.shift()();return i.push.apply(i,r||[]),s()}function s(){for(var t,e=0;e<i.length;e++){for(var s=i[e],a=!0,o=1;o<s.length;o++){var c=s[o];0!==l[c]&&(a=!1)}a&&(i.splice(e--,1),t=n(n.s=s[0]))}return t}var a={},l={app:0},i=[];function n(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=a,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(s,a,function(e){return t[e]}.bind(null,a));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var r=0;r<o.length;r++)e(o[r]);var d=c;i.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"56d7":function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("cca6"),s("a79d");var a=s("2b0e"),l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("div",{staticClass:"mdl-layout mdl-js-layout mdl-layout--fixed-header"},[t._m(0),t._m(1),s("Main")],1),s("dialogs")],1)},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("header",{staticClass:"mdl-layout__header"},[s("div",{staticClass:"mdl-layout__header-row"},[s("span",{staticClass:"mdl-layout-title"},[s("a",{attrs:{target:"_blank",href:"https://en.wikipedia.org/wiki/Planning_poker"}},[t._v("TM Planning Poker (v2.0)")])]),s("div",{staticClass:"mdl-layout-spacer"}),s("nav",{staticClass:"mdl-navigation mdl-layout--large-screen-only"})])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mdl-layout__drawer"},[s("span",{staticClass:"mdl-layout-title"},[t._v("TMPP")]),s("nav",{staticClass:"mdl-navigation"},[s("a",{attrs:{target:"_blank",href:"https://en.wikipedia.org/wiki/Planning_poker"}},[t._v("TM Planning Poker (v2.0)")])])])}],n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("main",{staticClass:"mdl-layout__content"},[s("div",{staticClass:"page-content"},[s("div",{staticClass:"mdl-grid"},[s("div",{staticClass:"demo-card-wide mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col"},[s("div",{staticClass:"mdl-card__title"},[s("h3",{staticClass:"mdl-card__title-text"},[s("span",{attrs:{id:"room_marker"}},[t.room?s("b",[t._v("ROOM "+t._s(t.room.toUpperCase()))]):t._e()])])]),s("div",{staticClass:"mdl-card__supporting-text"},[t._v(" Write topic and click start to indicate discussion starts. ")]),s("div",{staticClass:"mdl-card__actions mdl-card--border"}),s("Topic"),s("Cards"),s("Users"),s("div",{staticClass:"mdl-card__actions mdl-card--border"},[s("a",{staticClass:"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect",attrs:{id:"change_name"},on:{click:t.onChangeNameClick}},[t._v(" Change name ")]),s("a",{staticClass:"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect",attrs:{id:"play_sound"},on:{click:t.playSound}},[t._v(" Play sound ")])]),s("Menu")],1)])])])},o=[],c=(s("b0c0"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mdl-grid mdl-cell mdl-cell--12-col"},[a("table",{staticClass:"mdl-data-table mdl-js-data-table mdl-shadow--2dp mdl-cell mdl-cell--12-col",attrs:{id:"table"}},[t._m(0),t.instance?a("tbody",{attrs:{id:"table_body"}},[t._l(t.instance.players,(function(e,l,i){return a("tr",{key:"ind-"+l+"-"+i},[a("td",{staticClass:"width-fixed-50"},[t._v(t._s(i+1))]),a("td",{staticClass:"width-minus-100"},[t._v(t._s(e.name))]),t.su?a("td",{staticClass:"width-fixed-50"},[t._v(" "+t._s(e.vote)+" ")]):""===e.vote&&"discuss"===t.discuss?a("td",{staticClass:"width-fixed-50"},[a("img",{staticClass:"wait-throbber",attrs:{src:s("f191")}})]):"discuss"===t.discuss&&t.anyUnvoted?a("td",{staticClass:"width-fixed-50"},[a("span",{staticClass:"material-icons"},[t._v("done")])]):a("td",{staticClass:"width-fixed-50"},[t._v(" "+t._s(e.vote)+" ")])])})),t.average?a("tr",[a("td",{staticClass:"width-fixed-50"},[t._v("Average:")]),a("td",{staticStyle:{"text-align":"left"}},[t._v(t._s(t.average))])]):t._e(),t.recommended?a("tr",[a("td",{staticClass:"width-fixed-50"},[t._v("Recommended:")]),a("td",{staticStyle:{"text-align":"left"}},[t._v(t._s(t.recommended))])]):t._e()],2):t._e()]),t.debugResult?a("div",[t._v(t._s(t.debugResult))]):t._e()])}),r=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",{staticClass:"width-fixed-50"},[t._v("№")]),s("th",{staticClass:"width-minus-100"},[t._v("Name")]),s("th",{staticClass:"width-fixed-50"},[t._v("Vote")])])])}],d={name:"Users",computed:{instance:function(){return this.$store.state.app.data},anyUnvoted:function(){return this.$store.state.app.anyUnvoted},discuss:function(){return this.$store.state.app.discuss},average:function(){return this.$store.state.app.result.average},recommended:function(){return this.$store.state.app.result.recommended},su:function(){return this.$store.state.app.isSU()},debugResult:function(){return this.$store.state.app.isDebug()?this.$store.state.app.result.stringify():""}}},u=d,m=s("2877"),p=Object(m["a"])(u,c,r,!1,null,null,null),v=p.exports,h=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mdl-grid mdl-cell mdl-cell--12-col"},[s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"0.5"===t.vote||!t.canBeEnabled,"data-value":"0.5"},on:{click:t.onClick}},[t._v(" 1/2 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"1"===t.vote||!t.canBeEnabled,"data-value":"1"},on:{click:t.onClick}},[t._v(" 1 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"2"===t.vote||!t.canBeEnabled,"data-value":"2"},on:{click:t.onClick}},[t._v(" 2 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"3"===t.vote||!t.canBeEnabled,"data-value":"3"},on:{click:t.onClick}},[t._v(" 3 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"5"===t.vote||!t.canBeEnabled,"data-value":"5"},on:{click:t.onClick}},[t._v(" 5 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"8"===t.vote||!t.canBeEnabled,"data-value":"8"},on:{click:t.onClick}},[t._v(" 8 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"13"===t.vote||!t.canBeEnabled,"data-value":"13"},on:{click:t.onClick}},[t._v(" 13 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"20"===t.vote||!t.canBeEnabled,"data-value":"20"},on:{click:t.onClick}},[t._v(" 20 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"40"===t.vote||!t.canBeEnabled,"data-value":"40"},on:{click:t.onClick}},[t._v(" 40 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"100"===t.vote||!t.canBeEnabled,"data-value":"100"},on:{click:t.onClick}},[t._v(" 100 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"?"===t.vote||!t.canBeEnabled,"data-value":"?"},on:{click:t.onClick}},[t._v(" ? ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"break"===t.vote||!t.canBeEnabled,"data-value":"break"},on:{click:t.onClick}},[s("span",{staticClass:"material-icons",attrs:{"data-value":"break"}},[t._v(" free_breakfast ")])])])},f=[],b={name:"Cards",methods:{onClick:function(t){if(this.canBeEnabled){var e=t.target,s=e.getAttribute("data-value");this.$store.state.app.emit("update","vote",s)}}},computed:{vote:function(){return this.$store.state.app.vote},canBeEnabled:function(){return"discuss"===this.$store.state.app.discuss&&this.$store.state.app.anyUnvoted}}},_=b,g=Object(m["a"])(_,h,f,!1,null,null,null),k=g.exports,C=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mdl-grid mdl-cell mdl-cell--12-col"},[s("div",{staticClass:"mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--11-col"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.topic,expression:"topic"}],staticClass:"mdl-textfield__input",attrs:{type:"text",id:"topic",name:"topic"},domProps:{value:t.topic},on:{blur:t.onBlur,keypress:t.onKeyPress,change:t.onChange,input:function(e){e.target.composing||(t.topic=e.target.value)}}}),s("label",{staticClass:"mdl-textfield__label",attrs:{for:"topic"}},[t._v("Topic...")])]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:!t.validTopic},on:{click:t.onReferenceClick}},[s("span",{staticClass:"material-icons"},[t._v(" open_in_new ")])])])},y=[],w=(s("d3b7"),s("3ca3"),s("ddb0"),s("2b3d"),{name:"Topic",methods:{validUrl:function(t){try{new URL(t)}catch(e){return!1}return!0},onBlur:function(t){this.handleEvent(t)},onKeyPress:function(t){13===t.keyCode&&(this.handleEvent(t),t.target.blur(),t.target.parentNode.classList.remove("is-focused"))},handleEvent:function(t){this.$store.state.app.emit("topic",t.target.value)},onChange:function(t){this.handleClasses(t.target,t.target.value)},handleClasses:function(t,e){e?t.parentNode.classList.add("is-dirty"):t.parentNode.classList.remove("is-dirty")},onReferenceClick:function(t){var e=this.$store.state.app.topic;if(e&&this.validUrl(e)){var s=window.open(e,"_blank");s.focus()}}},computed:{room:function(){return this.$store.state.app.room},topic:{get:function(){var t=document.getElementById("topic");return t&&this.handleClasses(document.getElementById("topic"),this.$store.state.app.topic),this.$store.state.app.topic},set:function(t){}},validTopic:function(){return this.$store.state.app.topic&&this.validUrl(this.$store.state.app.topic)}}}),$=w,x=Object(m["a"])($,C,y,!1,null,null,null),j=x.exports,E=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mdl-card__menu"},[t.time?s("span",[t._v(t._s(t.time))]):t._e(),"result"===t.discuss||"discuss"===t.discuss&&!t.anyUnvoted?s("button",{staticClass:"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect",attrs:{id:"discuss"},on:{click:t.onDiscussClick}},[t._v(" Clear data ")]):"discuss"===t.discuss?s("button",{staticClass:"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect",attrs:{id:"discuss"},on:{click:t.onDiscussClick}},[t._v(" Stop discussion ")]):s("button",{staticClass:"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect",attrs:{disabled:!t.topic&&"idle"===t.discuss,id:"discuss"},on:{click:t.onDiscussClick}},[t._v(" Start discussion ")])])},O=[],P={name:"Menu",computed:{time:function(){return this.$store.state.app.timer.time},discuss:function(){return this.$store.state.app.discuss},anyUnvoted:function(){return this.$store.state.app.anyUnvoted},topic:function(){return this.$store.state.app.topic}},methods:{onDiscussClick:function(t){"idle"===this.$store.state.app.discuss?(this.$store.state.app.emit("discuss","discuss"),this.$store.state.app.emit("sound")):"discuss"===this.$store.state.app.discuss&&this.$store.state.app.anyUnvoted?this.$store.state.app.emit("discuss","result"):this.$store.state.app.emit("clear")}}},S=P,U=Object(m["a"])(S,E,O,!1,null,null,null),N=U.exports,B={name:"Main",components:{Users:v,Cards:k,Topic:j,Menu:N},computed:{room:function(){return this.$store.state.app.room}},methods:{onChangeNameClick:function(t){this.$store.state.dialogs.name.showModal()},playSound:function(){this.$store.state.app.emit("sound")}}},M=B,T=Object(m["a"])(M,n,o,!1,null,null,null),D=T.exports,R=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",[s("dialog",{ref:"name",staticClass:"mdl-dialog",attrs:{id:"name_dialog"}},[s("h4",{staticClass:"mdl-dialog__title"},[t._v("Name yourself")]),s("div",{staticClass:"mdl-dialog__content"},[s("div",{staticClass:"mdl-textfield mdl-js-textfield mdl-textfield--floating-label"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.userName,expression:"userName"}],staticClass:"mdl-textfield__input",attrs:{type:"text",id:"name",name:"name"},domProps:{value:t.userName},on:{blur:t.onBlur,keypress:t.onKeyPress,input:function(e){e.target.composing||(t.userName=e.target.value)}}}),s("label",{staticClass:"mdl-textfield__label",attrs:{for:"Name"}},[t._v("Name...")])])])]),s("dialog",{ref:"start",staticClass:"mdl-dialog",attrs:{id:"start_dialog"}},[s("h4",{staticClass:"mdl-dialog__title"},[t._v("Starting")]),t._m(0)]),s("dialog",{ref:"error",staticClass:"mdl-dialog",attrs:{id:"error_dialog"}},[s("h4",{staticClass:"mdl-dialog__title"},[t._v("Error")]),t._m(1)])])},I=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mdl-dialog__content"},[s("p",[t._v(" Please wait for connection. ")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mdl-dialog__content"},[s("p",[t._v(" Something went wrong, try reload page. ")])])}],L={name:"Dialogs",mounted:function(){this.$store.dispatch("setDialog",{name:"name",element:this.$refs.name}),this.$store.dispatch("setDialog",{name:"error",element:this.$refs.error}),this.$store.dispatch("setDialog",{name:"start",element:this.$refs.start})},methods:{onBlur:function(t){this.handleEvent(t)},onKeyPress:function(t){13===t.keyCode&&(this.handleEvent(t),t.target.blur(),t.target.parentNode.classList.remove("is-focused"))},handleEvent:function(t){t.target.value&&(window.localStorage.setItem("pocker_name",t.target.value),this.$store.state.app.emit("update","name",t.target.value),this.$refs.name.close())}},computed:{userName:{get:function(){return this.$store.state.app.userName},set:function(t){}}}},A=L,K=Object(m["a"])(A,R,I,!1,null,null,null),H=K.exports,J={name:"App",components:{Main:D,Dialogs:H},mounted:function(){this.$store.state.dialogs.start.showModal(),this.$store.state.app.initRoom(),this.$store.dispatch("initSocket")}},Q=J,F=(s("5c0b"),Object(m["a"])(Q,l,i,!1,null,null,null)),V=F.exports,W=s("2f62"),q=s("a562"),z=(s("99af"),s("d4ec")),G=s("bee2"),X=function(){function t(){Object(z["a"])(this,t),this.sec=0,this.stopped=!0,this.time=""}return Object(G["a"])(t,[{key:"processTime",value:function(){var t=new Date(null);t.setSeconds(this.sec);var e=t.getUTCMinutes(),s=t.getUTCSeconds(),a=t.getUTCHours();e<=9&&(e="0".concat(e)),s<=9&&(s="0".concat(s)),a<=9&&(a="0".concat(a)),this.time="".concat(a,":").concat(e,":").concat(s)}},{key:"start",value:function(){var t=this;if(this.stopped){this.stopped=!1;var e=setInterval((function(){t.stopped?clearInterval(e):(t.sec+=1,t.processTime())}),1e3);this.processTime()}}},{key:"stop",value:function(){this.stopped=!0}},{key:"clear",value:function(){this.time="",this.sec=0}}]),t}(),Y=X,Z=(s("4160"),s("07ac"),s("159b"),function(){function t(){Object(z["a"])(this,t),this.clear()}return Object(G["a"])(t,[{key:"clear",value:function(){this.values={},this.average=null,this.recommended=null}},{key:"addResult",value:function(t,e){var s=parseFloat(t);isNaN(s)&&(s=0),this.values[e]=s}},{key:"collectSum",value:function(){var t=0;return Object.values(this.values).forEach((function(e){t+=e})),t}},{key:"submit",value:function(){this.average=this.collectSum()/Object.values(this.values).length,this.processRecommended()}},{key:"processRecommended",value:function(){for(var t=[.5,1,2,3,5,8,13,20,40,100],e=0,s=0,a=0;a<t.length;a++)if(this.average>t[a])e=t[a];else{if(this.average===t[a]){this.recommended=t[a];break}s=t[a];var l=this.recommended-e,i=s-this.recommended;if(l<i){this.recommended=e;break}if(l>i){this.recommended=s;break}}}},{key:"stringify",value:function(){return JSON.stringify(this)}}]),t}()),tt=Z,et=(s("b64b"),s("4d63"),s("ac1f"),s("25f0"),s("466d"),s("5319"),function(){function t(e,s,a){Object(z["a"])(this,t),this.vote="",this.topic="",this.data=null,this.userName="",this.discuss="idle",this.anyUnvoted=!1,this.timer=e,this.result=s,this.room="",this.socketHandler=a,this.socket=null}return Object(G["a"])(t,[{key:"initRoom",value:function(){var t=window.location.pathname.match(/\/room\/(.+)/);t&&2===t.length?this.room=t[1]:this.room="default",console.log(this.room)}},{key:"setData",value:function(t){var e=this;this.data=t;var s=!1;Object.prototype.hasOwnProperty.call(t,"players")&&(this.result.clear(),Object.keys(t.players).forEach((function(a){""===t.players[a].vote&&(s=!0),e.result.addResult(t.players[a].vote,a),a===e.socket.id&&(e.vote=t.players[a].vote,e.userName=t.players[a].name)}))),this.anyUnvoted=s,this.discuss=t.discuss,this.topic=t.topic,"discuss"===this.discuss&&this.timer.start(),(!this.anyUnvoted&&"discuss"===this.discuss||"result"===this.discuss)&&(this.timer.stop(),this.result.submit()),"idle"===this.discuss&&(this.timer.clear(),this.result.clear())}},{key:"createSocket",value:function(t){this.socket=this.socketHandler.create(t)}},{key:"emit",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return this.socket.emit(t,this.room,e,s)}},{key:"getQueryParam",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.location.href,s=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)"),a=s.exec(e);return a?a[2]?decodeURIComponent(a[2].replace(/\+/g," ")):"":null}},{key:"isSU",value:function(){return"me"===this.getQueryParam("su")}},{key:"isDebug",value:function(){return"1"===this.getQueryParam("debug")}}]),t}()),st=et,at=s("c9df"),lt=s.n(at),it=function(){function t(){Object(z["a"])(this,t)}return Object(G["a"])(t,[{key:"create",value:function(t){var e=lt()("/pocker",{transports:["websocket"],upgrade:!1});window.addEventListener("unload",(function(){e&&e.close()})),e.on("connect",(function(){t.state.dialogs.start.close();var s=window.localStorage.getItem("pocker_name");s?e.emit("update",t.state.app.room,"name",s):t.state.dialogs.name.showModal()})),e.on("error",(function(){t.state.dialogs.error.showModal()})),e.on("disconnect",(function(){t.state.dialogs.error.showModal()})),e.on("status",(function(e){t.state.app.setData(e)})),e.on("sound",(function(){var t="/ding2.mp3",e=new Audio(t);e.play()}));var s=function t(){setTimeout((function(){e.emit("liveness"),t()}),3e4)};return s(),e}}]),t}(),nt=it,ot={state:{app:new st(new Y,new tt,new nt),dialogs:{}},mutations:{},actions:{setDialog:function(t,e){q["a"].registerDialog(e.element),t.state.dialogs[e.name]=e.element},initSocket:function(t){t.state.app.createSocket(t)}}},ct=ot;a["a"].config.productionTip=!1,a["a"].use(W["a"]),new a["a"]({store:new W["a"].Store(ct),render:function(t){return t(V)}}).$mount("#app")},"5c0b":function(t,e,s){"use strict";var a=s("9c0c"),l=s.n(a);l.a},"9c0c":function(t,e,s){},f191:function(t,e,s){t.exports=s.p+"assets/img/waiting.ef8d4e6b.gif"}});
//# sourceMappingURL=app.23efe6ac.js.map