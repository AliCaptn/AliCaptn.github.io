/* AR BI Consulting: inquiry form. Sends to contact.php and reports failure honestly. */
(function(){
var form=document.getElementById('form');if(!form)return;
var $=function(s){return document.querySelector(s)};
var done=$('#done'),err=$('#formErr'),sel=document.getElementById('service'),btn=form.querySelector('button[type=submit]');
var L=window.ARL||{};
/* Paste your free Web3Forms access key between the quotes to make the form work on GitHub Pages. Leave empty to use contact.php (PHP hosting). */
var W3F_KEY='f3d78f19-bcd3-47a7-9805-8f789e9a7882';
/* fill service list when the page has not done it already */
if(sel&&sel.options.length<2&&L.svcNames){L.svcNames.forEach(function(n){var o=document.createElement('option');o.textContent=n;sel.appendChild(o)})}
/* ?service=slug preselects the service */
try{var q=new URLSearchParams(location.search).get('service');if(q&&sel&&L.svcSlugs){var i=L.svcSlugs.indexOf(q);if(i>-1)sel.selectedIndex=i+1}}catch(e){}
function setErr(id,bad){document.getElementById(id).classList.toggle('invalid',bad);return bad}
form.addEventListener('submit',function(e){
  e.preventDefault();
  var f=form.elements,bad=false;
  if(err)err.hidden=true;
  bad=setErr('g-name',f.name.value.trim().length<2)||bad;
  bad=setErr('g-email',!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.value.trim()))||bad;
  bad=setErr('g-service',!f.service.value)||bad;
  bad=setErr('g-details',f.details.value.trim().length<10)||bad;
  if(bad){var first=form.querySelector('.invalid input,.invalid select,.invalid textarea');if(first)first.focus();return}
  var label=btn.textContent;btn.disabled=true;btn.textContent='Sending...';
  var ctrl=window.AbortController?new AbortController():null,t=setTimeout(function(){if(ctrl)ctrl.abort()},15000);
  var fd=new FormData(form),url=L.contactPhp||'/contact.php';
  if(W3F_KEY){url='https://api.web3forms.com/submit';fd.append('access_key',W3F_KEY);fd.append('subject','New inquiry from AR BI Consulting website: '+f.service.value);fd.append('from_name','AR BI Consulting website');fd.append('message',f.details.value)}
  fetch(url,{method:'POST',body:fd,headers:{'Accept':'application/json'},signal:ctrl?ctrl.signal:undefined})
   .then(function(r){return r.json().then(function(j){return {ok:r.ok&&j&&(j.ok||j.success),j:j}})})
   .then(function(x){
     if(!x.ok)throw new Error((x.j&&x.j.error)||'failed');
     $('#doneH').textContent='Thank you, '+f.name.value.trim().split(' ')[0]+'. Inquiry received.';
     form.style.display='none';done.classList.add('show');done.focus();
   })
   .catch(function(){
     if(err){err.hidden=false;err.focus()}
   })
   .then(function(){clearTimeout(t);btn.disabled=false;btn.textContent=label});
});
var again=$('#again');if(again)again.addEventListener('click',function(){form.reset();form.style.display='';done.classList.remove('show')});
})();
