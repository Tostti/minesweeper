(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{32:function(e,t,s){},33:function(e,t,s){"use strict";s.r(t);var a=s(1),c=s(16),i=s.n(c),n=s(8),r=s(2),l=s(4),d=s(0),o=function(e){var t=e.leftMines,s=e.elapsedTime;return Object(d.jsxs)("div",{className:"container mt-2",children:[Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-4",children:Object(d.jsxs)("h3",{children:[" ",t," \ud83d\udca3 "]})}),Object(d.jsx)("div",{className:"col-8",children:Object(d.jsxs)("h3",{children:[s[0],"h : ",s[1]," m : ",s[2],"s"]})})]}),Object(d.jsx)("hr",{})]})},m=function(e){var t=e.pos,s=e.clickCallback,a=e.rightClickCallback,c=t[0].toString()+","+t[1].toString();return Object(d.jsx)("div",{className:"cell",id:c,onClick:s,onContextMenu:a})},u=function(e){var t=e.timerActive,s=e.dif,c=e.srows,i=e.scols,n=e.smines,r=e.load,o=e.setLoad,u=e.setLeftMines,j=e.leftMines,b=e.setTimerActive,h=e.elapsedTime,f=e.setElapsedTime,O=Object(a.useState)([]),v=Object(l.a)(O,2),x=v[0],g=v[1],p=Object(a.useState)(!1),N=Object(l.a)(p,2),y=N[0],k=N[1],L=Object(a.useState)(""),S=Object(l.a)(L,2),M=S[0],w=S[1],C=Object(a.useState)(!1),E=Object(l.a)(C,2),T=E[0],I=E[1],H=Object(a.useState)(null),B=Object(l.a)(H,2),J=B[0],R=B[1],D=Object(a.createRef)(),A=Object(a.createRef)(),G=Object(a.createRef)(),Y=c,q=i,F=n,W=s,z=function(){for(var e=[],t=0;t<Y;t++){for(var s=[],a=0;a<q;a++){var c={position:[t,a],mine:!1};s.push(c)}e.push(s)}if(r)for(var i=J.boardcode,n=function(t){i[t].forEach((function(s){e[t][s].mine=!0}))},l=0;l<Y;l++)n(l);else{w(K());for(var d=0;d<F;){var o=Math.floor(Math.random()*Y),m=Math.floor(Math.random()*q);e[o][m].mine||(e[o][m].mine=!0,d+=1)}}g(e)},K=function(){var e=new Date,t=e.getFullYear(),s=e.getDate().toString().padStart(2,"0");return(e.getMonth()+1).toString().padStart(2,"0")+"-"+s+"-"+t+" "+(12===e.getHours()?12:e.getHours()%12).toString().padStart(2,"0")+":"+(e.getMinutes()+"").padStart(2,"0")+(e.getHours()>11?"pm":"am")},P=function(e,t){return D.current.children[e].children[t]},Q=function e(t){if(!t.classList.contains("flag")&&!t.classList.contains("clicked")&&!t.classList.contains("lose")){var s=t.id,a=parseInt(s.split(",")[0]),c=parseInt(s.split(",")[1]);if(x[a][c].mine)t.classList.add("extreme"),t.innerHTML="&#128163",G.current.firstChild.innerHTML="You lose. Better luck next time!",X(!1);else{var i=0;t.classList.add("clicked");for(var n=Math.max(0,a-1);n<=Math.min(a+1,Y-1);n++)for(var r=Math.max(0,c-1);r<=Math.min(c+1,q-1);r++)x[n][r].mine&&i++;if(0===i){t.classList.add("none");for(var l=Math.max(0,a-1);l<=Math.min(a+1,Y-1);l++)for(var d=Math.max(0,c-1);d<=Math.min(c+1,q-1);d++){var o=P(l,d);o.classList.contains("clicked")||e(o)}}else i<3?t.classList.add("low"):i<5?t.classList.add("mid"):i<7?t.classList.add("high"):t.classList.add("extreme"),t.innerHTML=i;V()}}},U=function(e){t||b(!0),e.preventDefault();var s=e.target;if(!s.classList.contains("clicked")&&!s.classList.contains("lose")){b(!0);var a=j;s.classList.contains("flag")?(s.classList.remove("flag"),s.innerHTML="",a++):(s.classList.add("flag"),s.innerHTML="&#128681",a--),u(a)}},V=function(){if(!T){for(var e=!0,t=0;t<Y;t++)for(var s=0;s<q;s++){if(!P(t,s).classList.contains("clicked")&&!1===x[t][s].mine){e=!1;break}}e&&"Congratulations! You win!"!==G.current.firstChild.innerHTML&&(G.current.firstChild.innerHTML="Congratulations! You win!",I(!0),u(0),X(!0),r&&(o(!1),localStorage.removeItem("save")))}},X=function(e){r&&(Y=J.rows,q=J.cols,F=J.mines),b(!1),A.current.classList.add("disabled");for(var t=0;t<Y;t++)for(var s=0;s<q;s++){var a=P(t,s);a.classList.add("lose"),x[t][s].mine&&(a.innerHTML="&#128163")}Z(e)},Z=function(e){var t=JSON.parse(localStorage.getItem("hist")),s={difficulty:W+"("+Y+"x"+q+", "+F+"mines)",time:h[0]+"h "+h[1]+"m "+h[2]+"s",status:e,start:M,endtime:K()};t?(t.push(s),localStorage.setItem("hist",JSON.stringify(t))):((t=[]).push(s),localStorage.setItem("hist",JSON.stringify(t)))};return Object(a.useEffect)((function(){r?R(JSON.parse(localStorage.getItem("save"))):z()}),[]),Object(a.useEffect)((function(){null!==J&&function(){Y=J.rows,q=J.cols,F=J.mines,W=J.dif,z();var e=J.leftMines;u(e),k(!0)}()}),[J]),Object(a.useEffect)((function(){r&&y&&function(){for(var e=J.flagcode,t=J.clickedcode,s=function(t){e[t].forEach((function(e){var s=P(t,e);s.classList.add("flag"),s.innerHTML="&#128681"}))},a=0;a<Y;a++)s(a);for(var c=function(e){t[e].forEach((function(t){var s=P(e,t);Q(s)}))},i=0;i<Y;i++)c(i);var n=J.elapsedTime;f(n),w(J.startTime),b(!1),k(!1)}()}),[y]),Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("div",{ref:D,id:"board",children:x.map((function(e,t){return Object(d.jsx)("div",{className:"cellrow",id:t,children:e.map((function(e,t){return Object(d.jsx)(m,{pos:e.position,clickCallback:function(e){return Q(e.target)},rightClickCallback:U},t)}))},t)}))}),Object(d.jsxs)("div",{className:"mt-2 mb-2 buttons",children:[Object(d.jsx)("button",{ref:A,className:"btn btn-dark",onClick:function(){for(var e=[],t=[],a=[],c=0;c<Y;c++){for(var i=[],n=[],r=[],l=0;l<q;l++){var d=P(c,l);x[c][l].mine&&i.push(l),d.classList.contains("flag")&&n.push(l),d.classList.contains("clicked")&&r.push(l)}e.push(i),t.push(n),a.push(r)}var o={dif:s,startTime:M,elapsedTime:h,rows:Y,cols:q,mines:F,leftMines:j,boardcode:e,flagcode:t,clickedcode:a};localStorage.setItem("save",JSON.stringify(o))},children:" Save game"}),Object(d.jsx)("button",{className:"btn btn-danger",onClick:function(){I(!1),o(!1),b(!1),f([0,0,0]),G.current.firstChild.innerHTML="",A.current.classList.remove("disabled");for(var e=0;e<Y;e++)for(var t=0;t<q;t++){var s=P(e,t);s.classList="cell",s.innerHTML=""}g([]),z(Y,q,F,!0),u(F)},children:" Restart"})]}),Object(d.jsx)("div",{ref:G,children:Object(d.jsx)("h1",{})})]})},j=function(e){var t=void 0===e.location.state?{width:0,height:0,mines:0,dif:""}:e.location.state.params,s=t.width,c=t.height,i=t.mines,n=t.dif,m=Object(a.useState)(i),j=Object(l.a)(m,2),b=j[0],h=j[1],f=Object(a.useState)([0,0,0]),O=Object(l.a)(f,2),v=O[0],x=O[1],g=Object(a.useState)(!1),p=Object(l.a)(g,2),N=p[0],y=p[1],k=Object(a.useState)(void 0===e.location.state?null:e.location.state.load),L=Object(l.a)(k,2),S=L[0],M=L[1],w=Object(a.useRef)(),C=Object(r.g)();return Object(a.useEffect)((function(){return console.log(e),N&&(w.current=setInterval((function(){!function(){var e=v;e[2]++,e[2]>=60&&(e[2]=0,e[1]++),e[1]>=60&&(e[1]=0,e[0]++),x([e[0],e[1],e[2]])}()}),1e3)),function(){return clearInterval(w.current)}}),[N]),Object(a.useEffect)((function(){void 0===e.location.state&&C.replace("/menu")}),[]),Object(d.jsxs)("div",{className:"container",children:[Object(d.jsx)(o,{leftMines:b,elapsedTime:v}),Object(d.jsx)(u,{timerActive:N,dif:n,srows:c,scols:s,smines:i,elapsedTime:v,setElapsedTime:x,load:S,setLoad:M,leftMines:b,setLeftMines:h,setTimerActive:y})]})},b=function(){var e=Object(a.useState)(null),t=Object(l.a)(e,2),s=t[0],c=t[1],i=function(e,t){var s=e.difficulty,a=t.difficulty;return s===a?0:s.includes("Custom")?1:a.includes("Custom")?-1:s.includes("Easy")?1:s.includes("Hard")?-1:s.includes("Medium")?a.includes("Easy")?-1:1:void 0};return Object(a.useEffect)((function(){!function(){if(localStorage.getItem("hist")){var e=JSON.parse(localStorage.getItem("hist"));e.sort(i),c(e)}}()}),[]),Object(d.jsxs)("div",{className:"container mt-2",children:[Object(d.jsx)("button",{className:"btn btn-dark",onClick:function(){c(null),localStorage.removeItem("hist")},disabled:null===s,children:"Clear History"}),Object(d.jsxs)("table",{className:"table table-hover",children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{children:"Start time"}),Object(d.jsx)("th",{children:"End time"}),Object(d.jsx)("th",{children:"Difficulty"}),Object(d.jsx)("th",{children:"Time spent"}),Object(d.jsx)("th",{children:"Status"})]})}),Object(d.jsx)("tbody",{children:null!=s?s.map((function(e,t){return Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:e.start}),Object(d.jsx)("td",{children:e.endtime}),Object(d.jsx)("td",{children:e.difficulty}),Object(d.jsx)("td",{children:e.time}),Object(d.jsx)("td",{children:Object(d.jsx)("span",{className:e.status?"badge bg-success":"badge bg-danger",children:e.status?"Won":"Lost"})})]},t)})):null})]})]})},h=s(11),f=s(15),O=function(){var e=Object(r.g)(),t=Object(a.createRef)(),s=Object(a.useState)({width:10,height:10,mines:10,dif:"Easy"}),c=Object(l.a)(s,2),i=c[0],n=c[1],o=i.width,m=i.height,u=i.mines,j=i.dif,b=function(){document.getElementById("mines").readOnly=!0,document.getElementById("width").readOnly=!0,document.getElementById("height").readOnly=!0},O=function(){document.getElementById("mines").readOnly=!1,document.getElementById("width").readOnly=!1,document.getElementById("height").readOnly=!1},v=function(e){var t=e.target;if(t.value){var s,a=parseInt(t.value);"mines"===t.name?t.value>o*m*.8?a=o*m*.8:t.value<1&&(a=1):t.value>50?a=50:t.value<2&&(a=2),n(Object(f.a)(Object(f.a)({},i),{},(s={},Object(h.a)(s,t.name,a),Object(h.a)(s,"dif","Custom"),s)))}};return Object(a.useEffect)((function(){localStorage.getItem("save")&&t.current.classList.remove("disabled")}),[]),Object(d.jsx)(d.Fragment,{children:Object(d.jsxs)("div",{className:"container",children:[Object(d.jsx)("h3",{children:"New Game"}),Object(d.jsxs)("form",{onSubmit:function(t){t.preventDefault(),e.push("/game",{params:i,load:!1,dif:j})},children:[Object(d.jsxs)("div",{onChange:function(e){var t=e.target;"easy"===t.value?(n({width:10,height:10,mines:10,dif:"Easy"}),b()):"medium"===t.value?(n({width:15,height:15,mines:40,dif:"Medium"}),b()):"hard"===t.value?(n({width:25,height:25,mines:100,dif:"Hard"}),b()):O()},children:[Object(d.jsxs)("div",{className:"form-check",children:[Object(d.jsx)("input",{className:"form-check-input",type:"radio",name:"difficultyradios",id:"easyradio",value:"easy",defaultChecked:!0}),Object(d.jsx)("label",{className:"form-check-label",children:"Easy"})]}),Object(d.jsxs)("div",{className:"form-check",children:[Object(d.jsx)("input",{className:"form-check-input",type:"radio",name:"difficultyradios",id:"mediumradio",value:"medium"}),Object(d.jsx)("label",{className:"form-check-label",children:"Medium"})]}),Object(d.jsxs)("div",{className:"form-check",children:[Object(d.jsx)("input",{className:"form-check-input",type:"radio",name:"difficultyradios",id:"hardradio",value:"hard"}),Object(d.jsx)("label",{className:"form-check-label",children:"Hard"})]}),Object(d.jsxs)("div",{className:"form-check",children:[Object(d.jsx)("input",{className:"form-check-input",type:"radio",name:"difficultyradios",id:"customradio",value:"custom"}),Object(d.jsx)("label",{className:"form-check-label",children:"Custom"})]})]}),Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-4",children:Object(d.jsxs)("div",{className:"form-group mb-2",children:[Object(d.jsx)("label",{children:"Width"}),Object(d.jsx)("input",{type:"number",name:"width",id:"width",className:"form-control",value:o,onChange:v,min:"2",max:"50",required:!0,readOnly:!0})]})}),Object(d.jsx)("div",{className:"col-4",children:Object(d.jsxs)("div",{className:"form-group mb-2",children:[Object(d.jsx)("label",{children:"Height"}),Object(d.jsx)("input",{type:"number",name:"height",id:"height",className:"form-control",value:m,onChange:v,min:"2",max:"50",required:!0,readOnly:!0})]})}),Object(d.jsx)("div",{className:"col-4",children:Object(d.jsxs)("div",{className:"form-group mb-2",children:[Object(d.jsx)("label",{children:"Mines"}),Object(d.jsx)("input",{type:"number",name:"mines",id:"mines",className:"form-control",value:u,onChange:v,min:"1",max:"2500",required:!0,readOnly:!0})]})})]}),Object(d.jsx)("button",{type:"submit",className:"btn btn-dark mt-5",children:"Start"})]}),Object(d.jsx)("hr",{}),Object(d.jsx)("h3",{children:"Load Game"}),Object(d.jsx)("button",{ref:t,onClick:function(){e.push("/game",{params:i,load:!0})},className:"btn btn-dark mb-2 disabled",children:"Start"})]})})},v=function(){return Object(d.jsx)("div",{className:"container mt-2",children:Object(d.jsxs)("ul",{className:"nav nav-pills",children:[Object(d.jsx)("li",{className:"nav-item",children:Object(d.jsx)(n.b,{exact:!0,to:"/",className:"nav-link",children:"Main menu"})}),Object(d.jsx)("li",{className:"nav-item",children:Object(d.jsx)(n.b,{exact:!0,to:"/history",className:"nav-link",children:"Game history"})}),Object(d.jsx)("li",{className:"nav-item",children:Object(d.jsx)(n.b,{exact:!0,to:"/game",className:"nav-link  disabled",children:"Game"})})]})})},x=function(){return Object(d.jsx)("div",{className:"background",children:Object(d.jsxs)(n.a,{children:[Object(d.jsx)(v,{}),Object(d.jsxs)(r.d,{children:[Object(d.jsx)(r.b,{exact:!0,path:"/",component:O}),Object(d.jsx)(r.b,{exact:!0,path:"/game",component:j}),Object(d.jsx)(r.b,{exact:!0,path:"/history",component:b}),Object(d.jsx)(r.a,{to:"/"})]})]})})};s(32);var g=function(){return Object(d.jsx)(x,{})};i.a.render(Object(d.jsx)(g,{}),document.getElementById("root"))}},[[33,1,2]]]);
//# sourceMappingURL=main.6c5ba55e.chunk.js.map