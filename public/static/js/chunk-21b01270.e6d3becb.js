(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-21b01270"],{2017:function(t,n,e){"use strict";var o=e("993f"),a=e.n(o);a.a},3399:function(t,n,e){},"5b3f":function(t,n,e){"use strict";var o=e("f93b"),a=e.n(o);a.a},6672:function(t,n,e){},"6f84":function(t,n,e){var o=e("e46b");o(o.P,"Array",{fill:e("b88d")}),e("0e8b")("fill")},8750:function(t,n,e){"use strict";var o=e("3399"),a=e.n(o);a.a},"993f":function(t,n,e){},"9ed6":function(t,n,e){"use strict";e.r(n);var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"login-container"},[e("canvas",{ref:"canvas"}),t._v(" "),e("div",{staticClass:"login-containe-form"},[e("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.loginForm,rules:t.loginRules,"auto-complete":"on","label-position":"left"}},[e("div",{staticClass:"title-container"},[e("h3",{staticClass:"title"},[t._v("数字媒体学院-学生管理系统")])]),t._v(" "),e("el-form-item",{attrs:{prop:"username"}},[e("span",{staticClass:"svg-container"},[e("svg-icon",{attrs:{"icon-class":"user"}})],1),t._v(" "),e("el-input",{ref:"username",attrs:{placeholder:"用户名",name:"username",type:"text",tabindex:"1","auto-complete":"on"},model:{value:t.loginForm.username,callback:function(n){t.$set(t.loginForm,"username",n)},expression:"loginForm.username"}})],1),t._v(" "),e("el-form-item",{attrs:{prop:"password"}},[e("span",{staticClass:"svg-container"},[e("svg-icon",{attrs:{"icon-class":"password"}})],1),t._v(" "),e("el-input",{key:t.passwordType,ref:"password",attrs:{type:t.passwordType,placeholder:"密码",name:"password",tabindex:"2"},nativeOn:{keyup:function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"enter",13,n.key,"Enter")?null:t.handleLogin(n)}},model:{value:t.loginForm.password,callback:function(n){t.$set(t.loginForm,"password",n)},expression:"loginForm.password"}}),t._v(" "),e("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[e("svg-icon",{attrs:{"icon-class":"password"===t.passwordType?"eye":"eye-open"}})],1)],1),t._v(" "),e("el-button",{staticStyle:{width:"55%","margin-bottom":"30px","margin-right":"10px"},attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(n){return n.preventDefault(),t.handleLogin(n)}}},[t._v("登录")]),t._v(" "),e("el-button",{staticStyle:{width:"32%","margin-bottom":"30px"},attrs:{type:"primary"},nativeOn:{click:function(n){return n.preventDefault(),t.studentEnquiry(n)}}},[t._v("学生查询")])],1)],1),t._v(" "),e("CopyrightNotice")],1)},a=[],r=(e("f548"),function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("p",{staticClass:"CopyrightNotice"},[t._v("2019 @ 数字媒体学院    野码工作室")])}),i=[],s={name:"CopyrightNotice"},c=s,l=(e("8750"),e("4e82")),u=Object(l["a"])(c,r,i,!1,null,null,null),d=u.exports,p=(e("6672"),e("6d57"),e("6f84"),function(t){var n=t,e=n.getContext("2d"),o=1,a=n.width=window.innerWidth*o,r=n.height=window.innerHeight*o,i=200,s=.05*a,c=.1*a,l=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return Math.random()*t},u=Math.PI,d=2*u,p=new Date,f=function(t,n,e){return(1-e)*t+e*n},h=function(t,n,e,o){var a=t-e,r=n-o;return Math.sqrt(a*a+r*r)},m=function(t,n,e,o){return Math.atan2(o-n,e-t)},g=function(){return{x:.5*a+Math.cos(l(d))*l(.5*a),y:.5*r+Math.sin(l(d))*l(.5*r),angle:l(d),speed:l(.15),normalSpeed:l(.15),oscAmplitudeX:l(2),oscSpeedX:.001+l(.008),oscAmplitudeY:l(2),oscSpeedY:.001+l(.008),connectDistance:l(s),color:{r:Math.round(200+l(55)),g:Math.round(150+l(105)),b:Math.round(200+l(55))}}},v=new Array(i).fill({}).map(g),w=function(){v.forEach((function(t){t.x+=(Math.cos(t.angle)+Math.cos(p*t.oscSpeedX)*t.oscAmplitudeX)*t.speed,t.y+=(Math.sin(t.angle)+Math.cos(p*t.oscSpeedY)*t.oscAmplitudeY)*t.speed,t.speed=f(t.speed,t.normalSpeed*o,.1),(t.x>a||t.x<0)&&(t.angle=u-t.angle),(t.y>r||t.y<0)&&(t.angle=-t.angle),l()<.005&&(t.oscAmplitudeX=l(2)),l()<.005&&(t.oscSpeedX=.001+l(.008)),l()<.005&&(t.oscAmplitudeY=l(2)),l()<.005&&(t.oscSpeedY=.001+l(.008)),t.x=Math.max(-.01,Math.min(t.x,a+.01)),t.y=Math.max(-.01,Math.min(t.y,r+.01))}))},y=function(){e.clearRect(0,0,a,r),v.map((function(t){v.filter((function(n){return t!=n&&!(h(t.x,t.y,n.x,n.y)>t.connectDistance)})).map((function(n){var e=h(t.x,t.y,n.x,n.y);return t.speed=f(t.speed,t.speed+.05/t.connectDistance*e,.2),{p1:t,p2:n,color:t.color,opacity:Math.floor(100/t.connectDistance*(t.connectDistance-e))/100}})).forEach((function(t,n){var o=Math.sin(p*t.p1.oscSpeedX);e.beginPath(),e.globalAlpha=t.opacity,e.moveTo(t.p1.x,t.p1.y),e.lineTo(t.p2.x,t.p2.y),e.strokeStyle="rgb(\n\t\t\t\t\t".concat(Math.floor(t.color.r*o),",\n\t\t\t\t\t").concat(Math.floor(.5*t.color.g+.5*t.color.g*o),",\n\t\t\t\t\t").concat(t.color.b,"\n\t\t\t\t)"),e.lineWidth=4*t.opacity,e.stroke(),e.closePath()}))}))},x=function t(){p=new Date,w(),y(),window.requestAnimationFrame(t)};x(),window.addEventListener("mousemove",(function(t){var n=t.layerX*o,e=t.layerY*o;v.forEach((function(t){var o=h(n,e,t.x,t.y);if(o<c&&o>0){t.angle=m(n,e,t.x,t.y);var a=.1*(c-o);t.speed=f(t.speed,a,.2)}}))})),window.addEventListener("resize",(function(t){a=n.width=window.innerWidth*o,r=n.height=window.innerHeight*o}))}),f=p,h={name:"Login",components:{CopyrightNotice:d},data:function(){var t=function(t,n,e){""===n?e(new Error("请输入正确的用户名")):e()},n=function(t,n,e){n.length<6?e(new Error(" 密码不能小于6位")):e()};return{loginForm:{username:"",password:"",loginFlag:""},loginRules:{username:[{required:!0,trigger:"blur",validator:t}],password:[{required:!0,trigger:"blur",validator:n}]},loading:!1,passwordType:"password",redirect:void 0}},watch:{$route:{handler:function(t){this.redirect=t.query&&t.query.redirect},immediate:!0}},mounted:function(){f(this.$refs.canvas),history.pushState(null,null,document.URL),window.addEventListener("popstate",(function(){history.pushState(null,null,document.URL)}))},methods:{showPwd:function(){var t=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){t.$refs.password.focus()}))},handleLogin:function(){var t=this;this.$refs.loginForm.validate((function(n){if(!n)return!1;t.loading=!0,t.$store.dispatch("user/login",t.loginForm).then((function(){t.$router.push({path:t.redirect||"/"}),t.loading=!1})).catch((function(){t.loading=!1}))}))},studentEnquiry:function(){this.$router.replace("/student")}}},m=h,g=(e("2017"),e("5b3f"),Object(l["a"])(m,o,a,!1,null,"7465acf8",null));n["default"]=g.exports},f93b:function(t,n,e){}}]);