(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{218:function(e,t,n){},219:function(e,t,n){},413:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(22),o=n.n(r),s=(n(218),n.p,n(219),n(220),n(27)),i=n(418),l=n(419),d=n(417),u=n(57),b=n(208),j=n(71),g=n(420),h=n(416),p=n(42),O=n(422),m=n(423),f=n(196),x=n.n(f),v=n(59),C=n.n(v),y=n(132),D=n(199),w=n.n(D),S=n.p+"static/media/logo.605cbd06.gif",k=n(421),L=n.p+"static/media/logo.41163e46.svg",A=n(7),T="https://sala-tutorxs.herokuapp.com",F="808906601781-gnnc5q5lrvr25lf9nci6rc79824mgiok.apps.googleusercontent.com",N=i.a.Link,E=[],I="(0/4)",M=0,R="".concat(T,"/week");function B(){var e=new Date;e.setDate(e.getDate()-e.getDay()+1);var t=Object(a.useState)({}),n=Object(s.a)(t,2),c=n[0],r=n[1],o=Object(a.useState)(""),f=Object(s.a)(o,2),v=f[0],D=f[1],B=Object(a.useState)(""),P=Object(s.a)(B,2),_=P[0],G=P[1],z=Object(a.useState)(""),J=Object(s.a)(z,2),H=J[0],q=J[1],U=Object(a.useState)(""),V=Object(s.a)(U,2),W=(V[0],V[1]),Z=Object(a.useState)(!1),K=Object(s.a)(Z,2),Q=K[0],X=K[1],Y=Object(a.useState)(e),$=Object(s.a)(Y,2),ee=$[0],te=$[1],ne=Object(a.useState)(!1),ae=Object(s.a)(ne,2),ce=ae[0],re=ae[1],oe=Object(a.useState)(!0),se=Object(s.a)(oe,2),ie=se[0],le=se[1],de=Object(a.useState)(5),ue=Object(s.a)(de,2),be=ue[0],je=ue[1],ge=Object(a.useState)(!1),he=Object(s.a)(ge,2),pe=he[0],Oe=he[1],me=Object(a.useState)(""),fe=Object(s.a)(me,2),xe=(fe[0],fe[1]),ve=Object(a.useState)(""),Ce=Object(s.a)(ve,2),ye=Ce[0],De=Ce[1],we=Object(a.useState)({email:"",nombre:"",gds:"",apodo:"",pronombre:"",tiene_llave:!1,gda:"",rol:[]}),Se=Object(s.a)(we,2),ke=Se[0],Le=Se[1];function Ae(){var e;console.log("RELOADING"),C.a.get(R,{},{headers:{"Access-Control-Allow-Origin":"*"}}).then((function(e){E=e.data.schedule,console.log(E),M=new Date("".concat(e.data.start," 13:00:00")),!0===ce&&M.setDate(M.getDate()+7),te(M),e.data.cupos,I=e.data.cupos_0,r({})})).catch((function(e){console.log(e),e.response})),(e=2e3,new Promise((function(t){return setTimeout(t,e)}))).then((function(){!0})),console.log("RELOADING END")}var Te,Fe=function(e){re(!1),Ae(),console.log("oli",e);var t="profileObj",n="email";if(e&&t in e){q(e[t][n]),W(e[t].name),xe(e[t].imageUrl);var a="".concat(T,"/tutore?email=")+e[t][n];C.a.get(a,{},{headers:{"Access-Control-Allow-Origin":"*"}}).then((function(e){console.log("oli",e.data),Le(e.data),D(e.data.apodo),De(e.data.apodo)})).catch((function(e){console.log(e),e.response}))}else q(""),W(""),De(""),Le({email:"",nombre:"",pronombre:"",apodo:"",gds:"",tiene_llave:!1,rol:[],gda:""});console.log(ke),Ae()},Ne=function(e){for(var t in E)if(Date.parse(new Date(E[t].date))===Date.parse(e))return"".concat(E[t].cupos);return I},Ee="rgba(89, 154, 242, 1)",Ie="rgba(162, 198, 248, 1)",Me="#dbedff",Re=function(e){var t=!0,n=!1,a=!1;for(var c in E)Date.parse(new Date(E[c].date))===Date.parse(e)&&(t=E[c].verde,n=E[c].not,H&&E[c].emails.includes(H)&&(a=!0));return t?a?(Ee="#EC7063",Ie="#52BE80",Me="#7DCEA0"):n||6===e.getDay()||0===e.getDay()?(Ee="#e8ebed",Ie="#e8ebed",Me="#b5c0c7",(ke.rol.includes("pfg")||ke.rol.includes("supertutore"))&&(Ee="#657786",Me="#8ea0ab")):(Ee="rgba(89, 154, 242, 1)",Ie="rgba(162, 198, 248, 1)",Me="#dbedff"):(Ee="#e8ebed",Ie="#e8ebed",Me="#e8ebed",(ke.rol.includes("pfg")||ke.rol.includes("supertutore"))&&(Ee="#657786",Me="#8ea0ab")),[Ee,Ie,Me]},Be=function(){C.a.post("".concat(T,"/horarios/modificar"),{tutore:ke,schedule:c},{tutore:ke,schedule:c}).then((function(e){Ae()})).catch((function(e){console.log(e)}))},Pe=function(e){if(!e)return Object(A.jsx)("span",{});var t=e.rol,n="#E74C3C";return"coordi"===t?n="#273746":"jefx"===t&&(n="rgba(46, 134, 193, 1)"),Object(A.jsx)("span",{className:"ant-btn-primary-3 tutore",style:{backgroundColor:n,color:"white",borderRadius:"0.3rem",borderColor:"transparent",margin:"0.1rem",fontSize:"0.8rem",paddingTop:"0.2rem",paddingBottom:"0.26rem",paddingLeft:"0.3rem",paddingRight:"0.3rem",verticalAlign:"center"},children:e.nombre},e.nombre)},_e=function(){C.a.put("".concat(T,"/tutore/change-name"),{nombre:v,tutore:ke,schedule:c},{nombre:v,tutore:ke,schedule:c}).then((function(e){De(e.data.name),Ae()})),X(!1),console.log("antes real")};pe||(Ae(),(Te=2380,new Promise((function(e){return setTimeout(e,Te)}))).then((function(){Oe(!0),le(!1)})));var Ge=function(){X(!1)};return Object(A.jsxs)(w.a,{loading:ie,bgColor:"#ff5757",spinnerColor:"#9ee5f8",textColor:"white",logoSrc:S,text:"Buscando las llaves de la sala...",children:[Object(A.jsxs)("div",{className:"principal",children:[Object(A.jsx)("div",{className:"header",children:Object(A.jsxs)(j.a,{align:"middle",justify:"space-between",children:[Object(A.jsx)("img",{src:L,style:{width:50},alt:""}),Object(A.jsx)(i.a,{className:"anchor",targetOffset:"70",children:Object(A.jsx)(u.a,{type:"link",onClick:function(){X(!0)},children:Object(A.jsx)(N,{title:ye})})})]})}),Object(A.jsxs)("div",{id:"home",className:"wave-container",children:[Object(A.jsx)(j.a,{justify:"center",style:{marginLeft:"15px",marginRight:"15px"},children:Object(A.jsxs)(g.b,{size:"small",direction:"vertical",children:[Object(A.jsx)("h1",{className:"title",children:"Sala de Tutores"}),Object(A.jsxs)("p",{className:"description",children:[Object(A.jsx)(O.a,{})," Reserva tus m\xf3dulos en la salita ",Object(A.jsx)(O.a,{})]}),Object(A.jsx)("br",{}),ke&&ke.email&&ke.apodo?Object(A.jsx)(y.GoogleLogout,{clientId:F,buttonText:"Cerrar Sesi\xf3n",onLogoutSuccess:Fe}):Object(A.jsx)(y.GoogleLogin,{clientId:F,buttonText:"Iniciar Sesi\xf3n \u2764",onSuccess:Fe,onFailure:Fe,cookiePolicy:"single_host_origin",isSignedIn:!0})]})}),Object(A.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320",children:Object(A.jsx)("path",{fill:"#fff","fill-opacity":"1",d:"M0,32L60,37.3C120,43,240,53,360,85.3C480,117,600,171,720,202.7C840,235,960,245,1080,224C1200,203,1320,149,1380,122.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"})})]}),""!==ke.email&&Object(A.jsx)("div",{id:"reservar",children:Object(A.jsx)(j.a,{justify:"center",children:Object(A.jsxs)(h.a,{style:{alignItems:"center"},bordered:!1,children:[Object(A.jsxs)(p.a,{xs:24,sm:30,md:36,lg:44,xl:50,children:[Object(A.jsx)(x.a,{timeFormat:"h",startDate:ee,numDays:be,minTime:1,maxTime:8,selection:c.schedule,onChange:function(e){r({schedule:e})},renderDateCell:function(e,t,n){var a=Re(e),c=Object(s.a)(a,3),r=c[0],o=c[1],i=c[2];return Object(A.jsx)("div",{style:{textAlign:"center",backgroundColor:t?r:o,borderRadius:"20px",height:"30px",padding:"3px"},ref:n,onMouseOver:function(t){t.target.style.backgroundColor=i,G(function(e){var t=[];for(var n in E)Date.parse(new Date(E[n].date))===Date.parse(e)&&(t=E[n].nombres);var a=[];for(var c in t)a.push(Pe(t[c]));return a}(e))},onMouseLeave:function(e){e.target.style.backgroundColor=t?r:o},children:Ne(e)})},renderTimeLabel:function(e){return Object(A.jsx)("span",{className:"timeFont",children:{1:"08:30",2:"10:00",3:"11:30",4:"13:00",5:"14:00",6:"15:30",7:"17:00"}[e.getHours()]})},renderDateLabel:function(e){return Object(A.jsxs)("span",{className:"dateFont",children:[{1:"L",2:"M",3:"W",4:"J",5:"V",6:"S",0:"D"}[e.getDay()]," ",e.getDate()]})},dateFormat:"ddd DD"}),Object(A.jsx)("br",{}),Object(A.jsxs)(g.b,{children:[Object(A.jsx)(u.a,{type:"primary",shape:"round",style:{textAlign:"center",color:"white"},onClick:Ae,children:Object(A.jsx)(m.a,{})}),Object(A.jsx)(u.a,{type:"primary",shape:"round",style:{textAlign:"center",color:"white"},onClick:function(){C.a.post("".concat(T,"/horarios/reservar"),{tutore:ke,schedule:c},{tutore:ke,schedule:c}).then((function(e){e.data.status||b.b.warning(e.data.message),Ae()}))},children:"Enviar"}),function(){if(ke.rol)return ke.rol.includes("pfg")||ke.rol.includes("supertutore")?Object(A.jsx)(u.a,{type:"primary",shape:"round",style:{textAlign:"center",color:"white"},onClick:Be,children:"Modificar Horario"}):void 0}()]}),Object(A.jsx)("br",{}),Object(A.jsx)("br",{}),Object(A.jsx)(h.a,{title:"Tutores en el m\xf3dulo",bordered:!1,style:{backgroundColor:"#F5F8FA",height:"130px"},children:Object(A.jsx)(j.a,{align:"middle",justify:"center",style:{height:"70px"},children:_})})]}),Object(A.jsx)("br",{}),Object(A.jsx)(g.b,{align:"center",direction:"vertical",size:"small",children:(ke.rol.includes("pfg")||ke.rol.includes("supertutore"))&&Object(A.jsx)(k.a,{style:{position:"relative"},onChange:function(){ke.rol.includes("pfg")||ke.rol.includes("supertutore")?(ce?(je(5),ee.setDate(ee.getDate()-7)):(je(5),ee.setDate(ee.getDate()+7)),re(!ce)):(re(!1),je(5))},children:" "})})]})})}),ke.email?Object(A.jsx)(l.a,{title:"Cambia tu nombre!",visible:Q,onOk:_e,onCancel:Ge,okText:"Cambiar",children:Object(A.jsx)(d.a,{placeholder:"Cambiar tu nombre",value:v,style:{marginTop:"1%"},onChange:function(e){return D(e.target.value)}})}):Object(A.jsx)("span",{style:{width:"100%"}})]}),Object(A.jsxs)("p",{style:{textAlign:"center",marginTop:"4%"},children:["Made with ",Object(A.jsx)(O.a,{})," by PFGang"]})]})}C.a.get(R,{},{headers:{"Access-Control-Allow-Origin":"*"}}).then((function(e){E=e.data.schedule,e.data.cupos,I=e.data.cupos_0})).catch((function(e){console.log(e),e.response}));var P=n(207),_=n(20);var G=function(){return Object(A.jsx)("div",{className:"App",children:Object(A.jsx)(P.a,{children:Object(A.jsx)(_.a,{exact:!0,path:"/sala",children:Object(A.jsx)(B,{})})})})},z=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,424)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),a(e),c(e),r(e),o(e)}))};o.a.render(Object(A.jsx)(c.a.StrictMode,{children:Object(A.jsx)(G,{})}),document.getElementById("root")),z()}},[[413,1,2]]]);
//# sourceMappingURL=main.792cb422.chunk.js.map