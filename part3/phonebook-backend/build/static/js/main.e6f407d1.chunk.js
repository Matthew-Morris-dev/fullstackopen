(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t.n(c),o=t(15),a=t.n(o),i=t(3),u=t(4),s=t(0),d=function(e){return Object(s.jsxs)("div",{children:["filter shown with ",Object(s.jsx)("input",{value:e.filter,onChange:e.handleChange})]})},l=function(e){return Object(s.jsxs)("form",{onSubmit:e.handleAddPerson,children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{value:e.name,onChange:e.handleNameChange})]}),Object(s.jsxs)("div",{children:["number: ",Object(s.jsx)("input",{value:e.number,onChange:e.handleNumberChange})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},b=function(e){var n=e.contacts,t=e.deletePerson;return Object(s.jsx)("ul",{children:n.map((function(e){return Object(s.jsxs)("li",{children:[e.name," ",e.number," ",Object(s.jsx)("button",{onClick:function(){t(e)},children:"delete"})]},e.id)}))})},f=function(e){var n=e.notificationInfo;if(null===n)return null;var t,c={background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},r=Object(i.a)(Object(i.a)({},c),{},{color:"green"}),o=Object(i.a)(Object(i.a)({},c),{},{color:"red"});if("success"===n.type)t=r;else{if("error"!==n.type)return null;t=o}return Object(s.jsx)("div",{style:t,children:n.message})},h=t(5),j=t.n(h),m="/api/persons",O=function(){return j.a.get(m).then((function(e){return e.data}))},p=function(e){return j.a.post(m,e).then((function(e){return e.data}))},g=function(e){return console.log(e),j.a.put("".concat(m,"/").concat(e.id),e).then((function(e){return e.data}))},v=function(e){return j.a.delete("".concat(m,"/").concat(e.id)).then((function(e){return e.data}))},x=function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],o=Object(c.useState)(""),a=Object(u.a)(o,2),h=a[0],j=a[1],m=Object(c.useState)(""),x=Object(u.a)(m,2),y=x[0],w=x[1],C=Object(c.useState)(""),k=Object(u.a)(C,2),S=k[0],N=k[1],P=Object(c.useState)(null),I=Object(u.a)(P,2),T=I[0],A=I[1];Object(c.useEffect)((function(){O().then((function(e){r(e)}))}),[]);var B=t.filter((function(e){return e.name.toLowerCase().indexOf(S.toLowerCase())>-1})),D=function(e){if(t.some((function(n){return n.name===e.name&&n.number===e.number})))return A({message:"".concat(e.name," already exists in the phonebook with this number"),type:"error"}),setTimeout((function(){A(null)}),2e3),j(""),void w("");if(window.confirm("".concat(e.name," is already added to the phonebook, would you like to replace their old number with a new one?"))){var n=t.filter((function(n){return n.name===e.name})),c=Object(i.a)(Object(i.a)({},n[0]),{},{number:y});g(c).then((function(e){r(t.map((function(n){return n.id!==e.id?n:e}))),A({message:"Updated ".concat(e.name,"'s number"),type:"success"}),setTimeout((function(){A(null)}),2e3)})).catch((function(n){A({message:"Information of ".concat(e.name," has already been removed from the server"),type:"error"}),setTimeout((function(){A(null)}),2e3)}))}};return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(f,{notificationInfo:T}),Object(s.jsx)(d,{filter:S,handleChange:function(e){N(e.target.value)}}),Object(s.jsx)(l,{handleAddPerson:function(e){e.preventDefault();var n={name:h,number:y};t.some((function(e){return e.name===h}))?D(n):p(n).then((function(e){r(t.concat(e)),j(""),w(""),A({message:"Added ".concat(e.name),type:"success"}),setTimeout((function(){A(null)}),2e3)}))},name:h,handleNameChange:function(e){j(e.target.value)},number:y,handleNumberChange:function(e){w(e.target.value)}}),Object(s.jsx)("h2",{children:"Numbers"}),Object(s.jsx)(b,{contacts:B,deletePerson:function(e){window.confirm("Delete ".concat(e.name,"?"))&&v(e).then((function(n){r(t.filter((function(n){return n.id!==e.id})))}))}})]})};a.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(x,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.e6f407d1.chunk.js.map