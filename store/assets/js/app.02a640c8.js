(function(t){function e(e){for(var a,o,i=e[0],c=e[1],d=e[2],u=0,m=[];u<i.length;u++)o=i[u],Object.prototype.hasOwnProperty.call(l,o)&&l[o]&&m.push(l[o][0]),l[o]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);r&&r(e);while(m.length)m.shift()();return n.push.apply(n,d||[]),s()}function s(){for(var t,e=0;e<n.length;e++){for(var s=n[e],a=!0,i=1;i<s.length;i++){var c=s[i];0!==l[c]&&(a=!1)}a&&(n.splice(e--,1),t=o(o.s=s[0]))}return t}var a={},l={app:0},n=[];function o(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=t,o.c=a,o.d=function(t,e,s){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(s,a,function(e){return t[e]}.bind(null,a));return s},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var d=0;d<i.length;d++)e(i[d]);var r=c;n.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"56d7":function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("cca6"),s("a79d");var a=s("2b0e"),l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("div",{staticClass:"mdl-layout mdl-js-layout mdl-layout--fixed-header"},[t._m(0),t._m(1),s("Main")],1),s("dialogs")],1)},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("header",{staticClass:"mdl-layout__header"},[s("div",{staticClass:"mdl-layout__header-row"},[s("span",{staticClass:"mdl-layout-title"},[t._v("TM Card Planning Pocker")]),s("div",{staticClass:"mdl-layout-spacer"}),s("nav",{staticClass:"mdl-navigation mdl-layout--large-screen-only"})])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mdl-layout__drawer"},[s("span",{staticClass:"mdl-layout-title"},[t._v("TMCPP")]),s("nav",{staticClass:"mdl-navigation"})])}],o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("main",{staticClass:"mdl-layout__content"},[s("div",{staticClass:"page-content"},[s("div",{staticClass:"mdl-grid"},[s("div",{staticClass:"demo-card-wide mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col"},[s("div",{staticClass:"mdl-card__title"},[s("h3",{staticClass:"mdl-card__title-text"},[s("span",{attrs:{id:"room_marker"}},[t.room?s("b",[t._v("ROOM "+t._s(t.room.toUpperCase()))]):t._e()])])]),s("div",{staticClass:"mdl-card__supporting-text"},[t._v(" Write topic and click start to indicate discussion starts. ")]),s("div",{staticClass:"mdl-card__actions mdl-card--border"}),s("Topic"),s("Cards"),s("Users"),s("div",{staticClass:"mdl-card__actions mdl-card--border"},[s("a",{staticClass:"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect",attrs:{id:"change_name"},on:{click:t.onChangeNameClick}},[t._v(" Change name ")]),s("a",{staticClass:"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect",attrs:{id:"play_sound"},on:{click:t.playSound}},[t._v(" Play sound ")])]),s("Menu")],1)])])])},i=[],c=(s("b0c0"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mdl-grid mdl-cell mdl-cell--12-col"},[a("table",{staticClass:"mdl-data-table mdl-js-data-table mdl-shadow--2dp mdl-cell mdl-cell--12-col",attrs:{id:"table"}},[t._m(0),t.instance?a("tbody",{attrs:{id:"table_body"}},t._l(t.instance.players,(function(e,l,n){return a("tr",{key:"ind-"+l+"-"+n},[a("td",{staticClass:"width-fixed-50"},[t._v(t._s(n+1))]),a("td",{staticClass:"width-minus-100"},[t._v(t._s(e.name))]),""===e.vote&&"discuss"===t.discuss?a("td",{staticClass:"width-fixed-50"},[a("img",{staticClass:"wait-throbber",attrs:{src:s("f191")}})]):"discuss"===t.discuss&&t.anyUnvoted?a("td",{staticClass:"width-fixed-50"},[a("span",{staticClass:"material-icons"},[t._v("done")])]):a("td",{staticClass:"width-fixed-50"},[t._v(" "+t._s(e.vote)+" ")])])})),0):t._e()])])}),d=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",{staticClass:"width-fixed-50"},[t._v("№")]),s("th",{staticClass:"width-minus-100"},[t._v("Name")]),s("th",{staticClass:"width-fixed-50"},[t._v("Vote")])])])}],r={name:"Users",computed:{instance:function(){return this.$store.state.instance},anyUnvoted:function(){return this.$store.state.anyUnvoted},discuss:function(){return this.$store.state.discuss}}},u=r,m=s("2877"),p=Object(m["a"])(u,c,d,!1,null,null,null),f=p.exports,v=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mdl-grid mdl-cell mdl-cell--12-col"},[s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"0.5"===t.vote||!t.canBeEnabled,"data-value":"0.5"},on:{click:t.onClick}},[t._v(" 1/2 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"1"===t.vote||!t.canBeEnabled,"data-value":"1"},on:{click:t.onClick}},[t._v(" 1 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"2"===t.vote||!t.canBeEnabled,"data-value":"2"},on:{click:t.onClick}},[t._v(" 2 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"3"===t.vote||!t.canBeEnabled,"data-value":"3"},on:{click:t.onClick}},[t._v(" 3 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"5"===t.vote||!t.canBeEnabled,"data-value":"5"},on:{click:t.onClick}},[t._v(" 5 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"8"===t.vote||!t.canBeEnabled,"data-value":"8"},on:{click:t.onClick}},[t._v(" 8 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"13"===t.vote||!t.canBeEnabled,"data-value":"13"},on:{click:t.onClick}},[t._v(" 13 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"20"===t.vote||!t.canBeEnabled,"data-value":"20"},on:{click:t.onClick}},[t._v(" 20 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"40"===t.vote||!t.canBeEnabled,"data-value":"40"},on:{click:t.onClick}},[t._v(" 40 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"100"===t.vote||!t.canBeEnabled,"data-value":"100"},on:{click:t.onClick}},[t._v(" 100 ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"?"===t.vote||!t.canBeEnabled,"data-value":"?"},on:{click:t.onClick}},[t._v(" ? ")]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:"break"===t.vote||!t.canBeEnabled,"data-value":"break"},on:{click:t.onClick}},[s("span",{staticClass:"material-icons",attrs:{"data-value":"break"}},[t._v(" free_breakfast ")])])])},h=[],b={name:"Cards",methods:{onClick:function(t){if(this.canBeEnabled){var e=t.target,s=e.getAttribute("data-value");this.$store.state.socket.emit("update",this.$store.state.room,"vote",s)}}},computed:{vote:function(){return this.$store.state.vote},canBeEnabled:function(){return"discuss"===this.$store.state.discuss&&this.$store.state.anyUnvoted}}},_=b,C=Object(m["a"])(_,v,h,!1,null,null,null),g=C.exports,k=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mdl-grid mdl-cell mdl-cell--12-col"},[s("div",{staticClass:"mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--11-col"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.topic,expression:"topic"}],staticClass:"mdl-textfield__input",attrs:{type:"text",id:"topic",name:"topic"},domProps:{value:t.topic},on:{blur:t.onBlur,keypress:t.onKeyPress,change:t.onChange,input:function(e){e.target.composing||(t.topic=e.target.value)}}}),s("label",{staticClass:"mdl-textfield__label",attrs:{for:"topic"}},[t._v("Topic...")])]),s("button",{staticClass:"mdl-button mdl-card-pocker-card mdl-shadow--2dp mdl-cell mdl-cell--1-col",attrs:{disabled:!t.validTopic},on:{click:t.onReferenceClick}},[s("span",{staticClass:"material-icons"},[t._v(" open_in_new ")])])])},y=[],w=(s("d3b7"),s("3ca3"),s("ddb0"),s("2b3d"),{name:"Topic",methods:{validUrl:function(t){try{new URL(t)}catch(e){return!1}return!0},onBlur:function(t){this.handleEvent(t)},onKeyPress:function(t){13===t.keyCode&&(this.handleEvent(t),t.target.blur(),t.target.parentNode.classList.remove("is-focused"))},handleEvent:function(t){this.$store.state.socket.emit("topic",this.$store.state.room,t.target.value)},onChange:function(t){this.handleClasses(t.target,t.target.value)},handleClasses:function(t,e){e?t.parentNode.classList.add("is-dirty"):t.parentNode.classList.remove("is-dirty")},onReferenceClick:function(t){var e=this.$store.state.topic;if(e&&this.validUrl(e)){var s=window.open(e,"_blank");s.focus()}}},computed:{room:function(){return this.$store.state.room},topic:{get:function(){var t=document.getElementById("topic");return t&&this.handleClasses(document.getElementById("topic"),this.$store.state.topic),this.$store.state.topic},set:function(t){}},validTopic:function(){return this.$store.state.topic&&this.validUrl(this.$store.state.topic)}}}),$=w,x=Object(m["a"])($,k,y,!1,null,null,null),E=x.exports,j=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mdl-card__menu"},[t.time?s("span",{attrs:{id:"timer"}},[t._v(t._s(t.time))]):t._e(),"result"===t.discuss||"discuss"===t.discuss&&!t.anyUnvoted?s("button",{staticClass:"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect",attrs:{id:"discuss"},on:{click:t.onDiscussClick}},[t._v(" Clear data ")]):"discuss"===t.discuss?s("button",{staticClass:"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect",attrs:{id:"discuss"},on:{click:t.onDiscussClick}},[t._v(" Stop discussion ")]):s("button",{staticClass:"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect",attrs:{disabled:!t.topic&&"idle"===t.discuss,id:"discuss"},on:{click:t.onDiscussClick}},[t._v(" Start discussion ")])])},S=[],N={name:"Menu",computed:{time:function(){return this.$store.state.time},discuss:function(){return this.$store.state.discuss},anyUnvoted:function(){return this.$store.state.anyUnvoted},topic:function(){return this.$store.state.topic}},methods:{onDiscussClick:function(t){"idle"===this.$store.state.discuss?this.$store.state.socket.emit("discuss",this.$store.state.room,"discuss"):"discuss"===this.$store.state.discuss&&this.$store.state.anyUnvoted?this.$store.state.socket.emit("discuss",this.$store.state.room,"result"):this.$store.state.socket.emit("clear",this.$store.state.room)}}},U=N,O=Object(m["a"])(U,j,S,!1,null,null,null),B=O.exports,P={name:"Main",components:{Users:f,Cards:g,Topic:E,Menu:B},computed:{room:function(){return this.$store.state.room}},methods:{onChangeNameClick:function(t){this.$store.state.dialogs.name.showModal()},playSound:function(){this.$store.state.socket.emit("sound",this.$store.state.room)}}},T=P,M=Object(m["a"])(T,o,i,!1,null,null,null),D=M.exports,I=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",[s("dialog",{ref:"name",staticClass:"mdl-dialog",attrs:{id:"name_dialog"}},[s("h4",{staticClass:"mdl-dialog__title"},[t._v("Name yourself")]),s("div",{staticClass:"mdl-dialog__content"},[s("div",{staticClass:"mdl-textfield mdl-js-textfield mdl-textfield--floating-label"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.userName,expression:"userName"}],staticClass:"mdl-textfield__input",attrs:{type:"text",id:"name",name:"name"},domProps:{value:t.userName},on:{blur:t.onBlur,keypress:t.onKeyPress,input:function(e){e.target.composing||(t.userName=e.target.value)}}}),s("label",{staticClass:"mdl-textfield__label",attrs:{for:"Name"}},[t._v("Name...")])])])]),s("dialog",{ref:"start",staticClass:"mdl-dialog",attrs:{id:"start_dialog"}},[s("h4",{staticClass:"mdl-dialog__title"},[t._v("Starting")]),t._m(0)]),s("dialog",{ref:"error",staticClass:"mdl-dialog",attrs:{id:"error_dialog"}},[s("h4",{staticClass:"mdl-dialog__title"},[t._v("Error")]),t._m(1)])])},R=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mdl-dialog__content"},[s("p",[t._v(" Please wait for connection. ")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mdl-dialog__content"},[s("p",[t._v(" Something went wrong, try reload page. ")])])}],L={name:"Dialogs",mounted:function(){this.$store.dispatch("setDialog",{name:"name",element:this.$refs.name}),this.$store.dispatch("setDialog",{name:"error",element:this.$refs.error}),this.$store.dispatch("setDialog",{name:"start",element:this.$refs.start})},methods:{onBlur:function(t){this.handleEvent(t)},onKeyPress:function(t){13===t.keyCode&&(this.handleEvent(t),t.target.blur(),t.target.parentNode.classList.remove("is-focused"))},handleEvent:function(t){t.target.value&&(window.localStorage.setItem("pocker_name",t.target.value),this.$store.state.socket.emit("update",this.$store.state.room,"name",t.target.value),this.$refs.name.close())}},computed:{userName:{get:function(){return this.$store.state.userName},set:function(t){}}}},K=L,A=Object(m["a"])(K,I,R,!1,null,null,null),J=A.exports,V={name:"App",components:{Main:D,Dialogs:J},mounted:function(){var t=this;this.$store.state.dialogs.start.showModal(),this.$store.dispatch("initRoom").then((function(){t.$store.dispatch("initSocket")}))}},W=V,q=(s("5c0b"),Object(m["a"])(W,l,n,!1,null,null,null)),z=q.exports,F=s("2f62"),G=(s("4160"),s("b64b"),s("ac1f"),s("466d"),s("159b"),s("a562")),H=s("c9df"),Q=s.n(H),X={state:{userName:"",instance:null,anyUnvoted:!0,discuss:"idle",room:"",socket:null,vote:"",topic:"",timer:null,time:"",dialogs:{}},mutations:{setTimer:function(t,e){t.timer=e},setTime:function(t,e){t.time=e},setRoom:function(t,e){t.room=e},setUserName:function(t,e){t.userName=e},setSocket:function(t,e){t.socket=e},setDialog:function(t,e){G["a"].registerDialog(e.element),t.dialogs[e.name]=e.element},initSocket:function(t,e){},setInstance:function(t,e){t.instance=e;var s=!1;if(e.hasOwnProperty("players")&&Object.keys(e.players).forEach((function(a){""==e.players[a].vote&&(s=!0),a===t.socket.id&&(t.vote=e.players[a].vote,t.userName=e.players[a].name)})),t.anyUnvoted=s,t.discuss=e.discuss,t.topic=e.topic,"discuss"===t.discuss&&null===t.timer){t.timer={sec:0,getSec:function(){var e=new Date(null);return e.setSeconds(t.timer.sec),e.getUTCMinutes()+":"+e.getUTCSeconds()}};var a=setInterval((function(){t.timer?(t.timer.sec+=1,t.time=t.timer.getSec()):clearInterval(a)}),1e3)}(!t.anyUnvoted&&"discuss"===t.discuss||"result"===t.discuss)&&null!==t.timer&&(t.timer=null),"idle"===t.discuss&&(t.time="")}},actions:{setTimer:function(t,e){t.commit("setTimer",e)},setTime:function(t,e){t.commit("setTime",e)},setRoom:function(t,e){t.commit("setRoom",e)},setUserName:function(t,e){t.commit("setUserName",e)},setInstance:function(t,e){t.commit("setInstance",e)},setSocket:function(t,e){t.commit("setSocket",e)},setDialog:function(t,e){t.commit("setDialog",e)},initRoom:function(t){var e=window.location.pathname.match(/\/room\/(.+)/),s=null;s=e&&2===e.length?e[1]:"default",t.commit("setRoom",s)},initSocket:function(t){var e=Q()("/pocker",{transports:["websocket"],upgrade:!1});window.addEventListener("unload",(function(){e&&e.close()})),e.on("connect",(function(){t.state.dialogs.start.close();var s=window.localStorage.getItem("pocker_name");s?e.emit("update",t.state.room,"name",s):t.state.dialogs.name.showModal()})),e.on("error",(function(){t.state.dialogs.error.showModal()})),e.on("disconnect",(function(){t.state.dialogs.error.showModal()})),e.on("status",(function(e){t.dispatch("setInstance",e)})),e.on("sound",(function(){console.log("sound");var t="/ding.mp3",e=new Audio(t);e.play()}));var s=function t(){setTimeout((function(){e.emit("liveness"),t()}),3e4)};s(),t.commit("setSocket",e)}}},Y=X;a["a"].config.productionTip=!1,a["a"].use(F["a"]),new a["a"]({store:new F["a"].Store(Y),render:function(t){return t(z)}}).$mount("#app")},"5c0b":function(t,e,s){"use strict";var a=s("9c0c"),l=s.n(a);l.a},"9c0c":function(t,e,s){},f191:function(t,e,s){t.exports=s.p+"assets/img/waiting.ef8d4e6b.gif"}});
//# sourceMappingURL=app.02a640c8.js.map