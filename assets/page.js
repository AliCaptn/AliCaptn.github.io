/* AR BI Consulting: shared behaviour for inner pages */
(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var hdr=$('#hdr'),bu=$('#burger'),nav=$('#nav'),tb=$('#top-btn');
function onScroll(){var y=window.scrollY;if(hdr)hdr.classList.toggle('scrolled',y>30);if(tb)tb.classList.toggle('show',y>700)}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
if(bu&&nav){
  bu.addEventListener('click',function(){var o=nav.classList.toggle('open');hdr.classList.toggle('menu',o);bu.setAttribute('aria-expanded',String(o))});
  nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');hdr.classList.remove('menu');bu.setAttribute('aria-expanded','false')}});
}
if(tb)tb.addEventListener('click',function(){window.scrollTo({top:0,behavior:reduce?'auto':'smooth'})});
/* quiet reveal for cards */
if('IntersectionObserver' in window&&!reduce){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  $$('[data-rv]').forEach(function(el){el.classList.add('rq');io.observe(el)});
}
/* open chat from any button */
$$('[data-open-chat]').forEach(function(b){b.addEventListener('click',function(){if(window.ARChat)window.ARChat.open(true)})});
/* portfolio filters and dialog */
var fl=$('#filters'),gr=$('#grid'),dlg=$('#dlg');
if(fl&&gr){
  fl.addEventListener('click',function(e){
    var b=e.target.closest('.chip');if(!b)return;
    $$('.chip',fl).forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});
    var c=b.dataset.c,n=0;
    $$('.pj',gr).forEach(function(a){var show=c==='All'||a.dataset.c===c;a.hidden=!show;if(show)n++});
    var st=$('#fcount');if(st)st.textContent=n+' project'+(n===1?'':'s')+' shown';
  });
  var tabs=$('#dTabs');
  function setArt(a,i){
    var imgs=a.dataset.imgs?JSON.parse(a.dataset.imgs):null,src=imgs?imgs[i][1]:a.dataset.img;
    var alt=a.dataset.t+(imgs?' ('+imgs[i][0]+' page)':'')+' preview';
    $('#dArt').innerHTML='<img decoding="async" src="'+src+'" alt="'+alt.replace(/"/g,'&quot;')+'" style="display:block;width:100%;height:auto">';
    tabs.innerHTML='';
    if(imgs){imgs.forEach(function(x,j){var b=document.createElement('button');b.type='button';b.className='tabb';b.textContent=x[0]+' page';b.setAttribute('aria-pressed',String(j===i));b.addEventListener('click',function(){setArt(a,j)});tabs.appendChild(b)})}
  }
  function openP(a){
    setArt(a,0);
    $('#dT').textContent=a.dataset.t;$('#dBadge').textContent=a.dataset.badge;
    $('#dD').textContent=$('.d',a).textContent;$('#dO').textContent=$('.o',a).textContent;$('#dTech').textContent=$('.te',a).textContent;$('#dV').textContent=$('.b',a).textContent;
    if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','');
  }
  gr.addEventListener('click',function(e){var b=e.target.closest('.proj');if(b)openP(b.closest('.pj'))});
  $('#dClose').addEventListener('click',function(){dlg.close()});
  dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
  $('#dCta').addEventListener('click',function(){dlg.close()});
  if(location.hash){var t=document.getElementById(location.hash.slice(1));if(t&&t.classList.contains('pj')){t.scrollIntoView({block:'center'});t.classList.add('hl')}}
}
})();
