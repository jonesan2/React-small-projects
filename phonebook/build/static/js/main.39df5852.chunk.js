(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{20:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(0),r=t(1),a=t.n(r),u=t(14),i=t.n(u),o=(t(20),t(3)),s=function(e){var n=e.value,t=e.onChange;return Object(c.jsxs)("div",{children:["filter shown with",Object(c.jsx)("input",{value:n,onChange:t})]})},l=function(e){var n=e.handleSubmit,t=e.newName,r=e.handleTyping,a=e.setNewName,u=e.newNumber,i=e.setNewNumber;return Object(c.jsxs)("form",{onSubmit:n,children:[Object(c.jsx)("h2",{children:"add a new"}),Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{value:t,onChange:r(a)})]}),Object(c.jsxs)("div",{children:["number: ",Object(c.jsx)("input",{value:u,onChange:r(i)})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"add"})})]})},d=function(e){var n=e.person,t=e.handler;return Object(c.jsxs)("li",{children:[n.name," ",n.number,Object(c.jsx)("button",{onClick:t,children:"delete"})]})},j=function(e){var n=e.filteredPersons,t=e.handler;return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("h2",{children:"Numbers"}),Object(c.jsx)("ul",{children:n.map((function(e){return Object(c.jsx)(d,{person:e,handler:t(e)},e.id)}))})]})},b=function(e){var n=e.notifData;return null===n.message?null:Object(c.jsx)("div",{className:n.type,children:n.message})},f=t(4),h=t.n(f),m="/api/persons",O={getAll:function(){return h.a.get(m).then((function(e){return e.data}))},create:function(e){return h.a.post(m,e).then((function(e){return e.data}))},update:function(e,n){return h.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data})).catch((function(){}))},deletePerson:function(e){return h.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))}},p=function(){var e=Object(r.useState)([]),n=Object(o.a)(e,2),t=n[0],a=n[1],u=Object(r.useState)(t),i=Object(o.a)(u,2),d=i[0],f=i[1],h=Object(r.useState)(""),m=Object(o.a)(h,2),p=m[0],v=m[1],x=Object(r.useState)(""),g=Object(o.a)(x,2),w=g[0],N=g[1],y=Object(r.useState)(""),S=Object(o.a)(y,2),k=S[0],C=S[1],P=Object(r.useState)({message:null,type:null}),D=Object(o.a)(P,2),T=D[0],A=D[1];Object(r.useEffect)((function(){O.getAll().then((function(e){a(e),f(e)}))}),[T]);var I=function(e){return function(n){if(e(n.target.value),e===C){var c=t.filter((function(e){return e.name.includes(n.target.value)}));f(c)}}};return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(b,{notifData:T}),Object(c.jsx)(s,{value:k,onChange:I(C)}),Object(c.jsx)(l,{handleSubmit:function(e){e.preventDefault();var n=t.findIndex((function(e){return e.name===p}));-1===n?O.create({name:p,number:w}).then((function(e){var n=t.concat(e);a(n),v(""),N(""),f(n.filter((function(e){return e.name.includes(k)}))),A({message:"Added ".concat(e.name),type:"success"}),setTimeout((function(){A({message:null,type:null})}),5e3)})):window.confirm("".concat(t[n].name," is already added to phonebook, replace the old number with a new one?"))&&O.update(t[n].id,{name:p,number:w}).then((function(e){var c=t.filter((function(e){return t[n].id!==e.id})).concat(e);a(c),v(""),N(""),f(c.filter((function(e){return e.name.includes(k)})))})).catch((function(){A({message:"Information on ".concat(t[n].name," has already been removed from server"),type:"error"}),setTimeout((function(){A({message:null,type:null})}),5e3)}))},newName:p,handleTyping:I,setNewName:v,newNumber:w,setNewNumber:N}),Object(c.jsx)(j,{filteredPersons:d,handler:function(e){return function(){window.confirm("Delete ".concat(e.name,"?"))&&O.deletePerson(e.id).then((function(n){var c=t.filter((function(n){return e.id!==n.id}));a(c),v(""),N(""),f(c.filter((function(e){return e.name.includes(k)})))}))}}})]})};i.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(p,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.39df5852.chunk.js.map