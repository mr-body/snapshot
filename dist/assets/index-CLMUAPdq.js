import{initializeApp as f}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";import{getDatabase as m,ref as d,onValue as p,remove as y,set as g,push as v}from"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const b={databaseURL:"https://clientes-36d2f-default-rtdb.firebaseio.com/"},h=f(b),l=m(h),u=d(l,"movies"),c=document.getElementById("input-field"),E=document.getElementById("add-button"),a=document.getElementById("list-items");p(u,r=>{a.innerHTML="",r.forEach(o=>{const i=document.createElement("li");i.textContent=o.val(),i.addEventListener("dblclick",()=>{confirm("Are you sure?")&&y(d(l,"movies/"+o.key))}),a.append(i)})});E.addEventListener("click",function(){let r=c.value;g(v(u),r),c.value=""});window.addEventListener("load",r=>{L()});async function L(){if("serviceWorker"in navigator)try{await navigator.serviceWorker.register("./service-worker.js")}catch{alert("ServiceWorker registration failed. Sorry about that.")}else document.querySelector(".alert").removeAttribute("hidden")}
