(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{58:function(e,t,c){},91:function(e,t,c){},93:function(e,t,c){},94:function(e,t,c){},95:function(e,t,c){"use strict";c.r(t);var n=c(0),s=c(15),r=c.n(s),a=c(8),i=c(29),o=c(5),j=(c(58),c.p+"static/media/dollar.5e3a3f1d.svg"),l=c(1),d=function(){return Object(l.jsx)("img",{src:j,alt:"",width:"18",height:"18"})},b=c.p+"static/media/sun.64146f2f.svg",h=function(){return Object(l.jsx)("img",{src:b,alt:"",width:"14",height:"14"})},x=function(e){var t=e.cryptoCount;return Object(l.jsx)("div",{className:"desktop",children:Object(l.jsx)("div",{className:"upper-info-wrapper",children:Object(l.jsxs)("div",{className:"upper-info-content",children:[Object(l.jsxs)("div",{className:"left-content",children:[Object(l.jsxs)("span",{children:["Cryptos:",Object(l.jsx)("a",{href:"/",children:0===t?"...":t})]}),Object(l.jsxs)("span",{children:["Exchanges:",Object(l.jsx)("a",{href:"/",children:"346"})]}),Object(l.jsxs)("span",{children:["Market Cap:",Object(l.jsx)("a",{href:"/",children:"$2,271,520,574,504"})]}),Object(l.jsxs)("span",{children:["Dominance:",Object(l.jsx)("a",{href:"/",children:"BTC: 46.4% ETH: 17.1%"})]})]}),Object(l.jsxs)("div",{className:"right-content",children:[Object(l.jsxs)("div",{children:[Object(l.jsx)(d,{}),"USD"]}),Object(l.jsx)("div",{children:Object(l.jsx)(h,{})})]})]})})})},O=function(){return Object(l.jsx)("div",{className:"mobile"})},u=function(e){var t=e.cryptoCount;return Object(l.jsxs)("div",{className:"navbar-wrapper",children:[Object(l.jsx)(x,{cryptoCount:t}),Object(l.jsx)(O,{})]})},p=c(22),m=c(48),f=c.n(m),g=c.p+"static/media/info.1ed92dc4.svg",v={marginLeft:"4px"},N=function(){return Object(l.jsx)("img",{src:g,alt:"",width:"16",height:"16",style:v})},w=c(28),y=c(27),C=function(){return Object(l.jsx)("thead",{children:Object(l.jsxs)("tr",{children:[Object(l.jsx)("th",{}),Object(l.jsxs)("th",{className:"text-center",children:["#",Object(l.jsx)(y.a,{icon:w.b})]}),Object(l.jsx)("th",{className:"text-start",children:"Name"}),Object(l.jsx)("th",{className:"text-end",children:"Price"}),Object(l.jsx)("th",{className:"text-end",children:" 24h %"}),Object(l.jsx)("th",{className:"text-end",children:"7d %"}),Object(l.jsxs)("th",{className:"text-end",children:["Market Cap",Object(l.jsx)(N,{})]}),Object(l.jsxs)("th",{className:"text-end",children:["Volume(24h)",Object(l.jsx)(N,{})]}),Object(l.jsxs)("th",{className:"text-end",children:["Circulating Supply",Object(l.jsx)(N,{})]}),Object(l.jsx)("th",{className:"text-end",children:"Small chart of Last 7 Days"})]})})},k=c.p+"static/media/empty_star.7ebe4a23.svg",_=function(){return Object(l.jsx)("img",{src:k,alt:"",width:"16",height:"16"})},S=function(e){var t=e.crypto,c=t.id,n=t.image,s=t.market_cap_rank,r=t.name,a=t.current_price,o=t.symbol,j=t.market_cap,d=t.total_volume,b=t.circulating_supply,h=t.price_change_percentage_24h_in_currency,x=t.price_change_percentage_7d_in_currency,O=t.sparkline_url,u=function(e,t){var c="";return"number"===e?c=null!==t?t:"":"$"===e?c=null!==t?"$".concat(t.toLocaleString()):"?":"%"===e&&(c=null!==t?"".concat(t.toFixed(2)," %"):"?"),c};return Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{className:"text-center",children:Object(l.jsx)(_,{})}),Object(l.jsx)("td",{className:"text-center",children:u("number",s)}),Object(l.jsx)("td",{className:"text-start",children:Object(l.jsx)(i.b,{to:"/detail/".concat(c),children:Object(l.jsxs)("div",{className:"logo-wrapper",children:[Object(l.jsx)("img",{className:"crypto-logo",src:n,alt:""}),Object(l.jsxs)("div",{className:"name-content",children:[r," , ",o.toUpperCase()]})]})})}),Object(l.jsx)("td",{className:"text-end",children:u("$",a)}),Object(l.jsx)("td",{className:"text-end ".concat(null===h?"":h<0?"text-red":"text-green"),children:u("%",h)}),Object(l.jsx)("td",{className:"text-end ".concat(null===x?"":x<0?"text-red":"text-green"),children:u("%",x)}),Object(l.jsx)("td",{className:"text-end",children:u("$",j)}),Object(l.jsx)("td",{className:"text-end",children:u("$",d)}),Object(l.jsx)("td",{className:"text-end",children:null!==b?"".concat(b.toLocaleString()," ").concat(o.toUpperCase()):"?"}),Object(l.jsx)("td",{className:"text-end",children:Object(l.jsx)("img",{src:O,alt:"",width:"164",height:"54"})})]})},M=function(e){var t=e.cryptos;return Object(l.jsx)("tbody",{children:t.map((function(e){var t=e.id;return Object(l.jsx)(S,{crypto:e},t)}))})},I=function(e){var t=e.cryptos;return Object(l.jsx)("div",{className:"screener-wrapper",children:Object(l.jsxs)("table",{className:"screener ",children:[Object(l.jsx)(C,{}),Object(l.jsx)(M,{cryptos:t})]})})},F=c(118),E=c(116),P=c(50),T=(c(69),Object(E.a)((function(e){return{root:{"& > *":{marginTop:e.spacing(2)}},ul:{"& .MuiPaginationItem-root":{color:"black"},"& .MuiPaginationItem-page.Mui-selected":{backgroundColor:"#2196F3",color:"#ffff"},"& .MuiPaginationItem-page.Mui-selected:hover":{backgroundColor:"#2196F3",color:"#ffff"},"& .MuiPaginationItem-page:hover":{backgroundColor:"rgb(239, 242, 245)",color:"black"}}}}))),$=function(e){var t=e.handleClick;return Object(l.jsxs)("div",{className:"rows-dropdown-content",children:[Object(l.jsx)("a",{href:"#",children:Object(l.jsx)("button",{value:"100",onClick:t,children:"100"})}),Object(l.jsx)("a",{href:"#",children:Object(l.jsx)("button",{value:"50",onClick:t,children:"50"})}),Object(l.jsx)("a",{href:"#",children:Object(l.jsx)("button",{value:"20",onClick:t,children:"20"})})]})},L=function(e){var t=e.pagination,c=e.count,n=e.cryptoCount,s=e.pageChage,r=e.rowsChange,a=T();return Object(l.jsxs)("div",{className:"pagination-wrapper",children:[Object(l.jsx)("div",{className:"current-rows",children:Object(l.jsxs)("p",{children:["Showing ",t.page*t.rows-t.rows+1," -"," ",t.page*t.rows," rows out of ",n]})}),Object(l.jsx)("div",{className:a.root,children:Object(l.jsx)(F.a,{classes:{ul:a.ul},count:c,page:t.page,onChange:s})}),Object(l.jsxs)("div",{className:"show-rows",children:[Object(l.jsx)("p",{children:"Show rows"}),Object(l.jsx)(P.a,{interactive:"true",className:"show-rows-tooltip",arrow:!1,allowHTML:"true",placement:"bottom",content:Object(l.jsx)($,{handleClick:r}),children:Object(l.jsxs)("div",{className:"rows-dropdown",children:[t.rows,Object(l.jsx)(y.a,{icon:w.a})]})})]})]})},A=c(24),D=c.n(A),B="/api/cryptos",U=function(e,t,c){return D.a.get("".concat(B,"/info/").concat(e,"/").concat(t,"/").concat(c)).then((function(e){return e.data}))},z=function(){return D.a.get(B).then((function(e){return e.data}))},G=function(e,t){return D.a.get("".concat(B,"/market_chart/").concat(e,"/").concat(t)).then((function(e){return e.data}))},H=function(e){var t=e.cryptoCount,c=Object(n.useState)([]),s=Object(a.a)(c,2),r=s[0],i=s[1],o=Object(n.useState)(!1),j=Object(a.a)(o,2),d=j[0],b=j[1],h=Object(n.useState)(139),x=Object(a.a)(h,2),O=x[0],u=x[1],m=Object(n.useState)({page:1,rows:50}),g=Object(a.a)(m,2),v=g[0],N=g[1];console.log("Cryptos: ",r);Object(n.useEffect)((function(){console.log("Getting cryptos..."),b(!0),U("market_cap_desc",v.rows,v.page).then((function(e){i(e),b(!1)}))}),[v]);return Object(l.jsx)(l.Fragment,{children:d?Object(l.jsx)("div",{className:"loading-wrapper",children:Object(l.jsx)(f.a,{color:"#2196F3",loading:d,size:20})}):Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(I,{cryptos:r}),Object(l.jsx)(L,{cryptoCount:t,pagination:v,count:O,pageChage:function(e,t){var c=Object(p.a)(Object(p.a)({},v),{},{page:t});N(c)},rowsChange:function(e){var c=e.target.value,n=Object(p.a)(Object(p.a)({},v),{},{rows:c,page:1}),s=Math.ceil(t/c);N(n),u(s)}})]})})},J=(c(91),c(35)),Y=c.n(J),Q=c(49),R=c.n(Q),V=function(){var e=Object(o.g)().id,t=Object(n.useState)([]),c=Object(a.a)(t,2),s=c[0],r=c[1],i=Object(n.useState)(!1),j=Object(a.a)(i,2),d=j[0],b=j[1],h=Object(n.useState)("max"),x=Object(a.a)(h,2),O=x[0],u=(x[1],{chart:{panning:!0,zoomType:"x"},plotOptions:{series:{animation:{duration:2e3}}},xAxis:[{type:"datetime"},{labels:{style:{color:"#666"}}}],yAxis:{opposite:!1,labels:{style:{color:"#666"}}},tooltip:{borderColor:"transparent",borderRadius:0,shared:!0,followPointer:!0,followTouchMove:!0,pointFormat:"{point.x}",formatter:function(){var e="<b>"+Y.a.dateFormat("%A, %B %e, %Y",this.x)+"</b>";return this.points.forEach((function(t){e+="<br/>Price: $"+t.y})),e}},scrollbar:{enabled:!1},series:[{lineWidth:1.8,lineColor:"rgb(22, 199, 132)",data:s.prices}]});console.log("Chart data: ",s);return Object(n.useEffect)((function(){console.log("Getting chart data..."),b(!0),G(e,O).then((function(e){r(e),b(!1)}))}),[]),Object(l.jsxs)("div",{className:"detail-container",children:[Object(l.jsx)("div",{className:"top-info-container",children:Object(l.jsxs)("div",{className:"top-info-content",children:[Object(l.jsx)("div",{className:"top-left-wrapper",children:"top-left-content"}),Object(l.jsx)("div",{className:"top-center-wrapper",children:"top-center-content"}),Object(l.jsx)("div",{className:"bottom-right-wrapper",children:"bottom-right-content"}),Object(l.jsx)("div",{className:"top-right-wrapper",children:"top-right-content"}),Object(l.jsx)("div",{className:"bottom-left-wrapper",children:"bottom-left-content"})]})}),Object(l.jsx)("div",{className:"page-content-container",children:Object(l.jsxs)("div",{className:"crypto-detail-container",children:[Object(l.jsx)("div",{className:"left-side",children:Object(l.jsx)("div",{className:"chart-wrapper",children:d?"loading...":Object(l.jsx)(R.a,{highcharts:Y.a,constructorType:"stockChart",options:u})})}),Object(l.jsx)("div",{className:"right-side",children:"right-side"})]})})]})},W=(c(93),c(94),function(){return Object(l.jsxs)("div",{className:"column",children:[Object(l.jsx)("span",{children:"Column 1"}),Object(l.jsxs)("ul",{children:[Object(l.jsx)("li",{children:Object(l.jsx)("a",{children:"Item"})}),Object(l.jsx)("li",{children:Object(l.jsx)("a",{children:"Item"})}),Object(l.jsx)("li",{children:Object(l.jsx)("a",{children:"Item"})}),Object(l.jsx)("li",{children:Object(l.jsx)("a",{children:"Item"})}),Object(l.jsx)("li",{children:Object(l.jsx)("a",{children:"Item"})})]})]})}),q=function(e){e.crypto;return Object(l.jsx)("footer",{className:"footer-wrapper",children:Object(l.jsxs)("div",{className:"footer-content",children:[Object(l.jsx)("div",{className:"footer-left"}),Object(l.jsxs)("div",{className:"footer-right",children:[Object(l.jsx)(W,{}),Object(l.jsx)(W,{}),Object(l.jsx)(W,{}),Object(l.jsx)(W,{})]}),Object(l.jsxs)("div",{className:"footer-meta",children:["@",(new Date).getFullYear()," QcoinCap. All rights reserved."]})]})})};var K=function(){var e=Object(n.useState)(0),t=Object(a.a)(e,2),c=t[0],s=t[1];return Object(n.useEffect)((function(){z().then((function(e){s(e.tot)}))}),[]),Object(l.jsxs)("div",{className:"page-wrapper",children:[Object(l.jsx)(u,{cryptoCount:c}),Object(l.jsx)(i.a,{children:Object(l.jsxs)(o.d,{children:[Object(l.jsx)(o.b,{exact:!0,path:"/",render:function(){return Object(l.jsx)(o.a,{to:"/home"})}}),Object(l.jsx)(o.b,{exact:!0,path:"/home",render:function(){return Object(l.jsx)(H,{cryptoCount:c})}}),Object(l.jsx)(o.b,{exact:!0,path:"/detail/:id",component:V})]})}),Object(l.jsx)(q,{})]})};r.a.render(Object(l.jsx)(K,{}),document.getElementById("root"))}},[[95,1,2]]]);
//# sourceMappingURL=main.8532c8d7.chunk.js.map