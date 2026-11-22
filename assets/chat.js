/* AR BI Consulting: rule-based chat assistant. Runs fully in the browser; no data leaves the page. */
(function(){
var L=window.ARL||{},reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var $=function(s){return document.querySelector(s)};
var mount=document.createElement('div');
mount.innerHTML='<button class="cb-fab" id="cbFab" aria-label="Open chat assistant" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/></svg></button>'+
'<div class="cb" id="cb" role="dialog" aria-label="AR BI assistant"><div class="cb-h"><img src="'+(L.logo||'img/logo-mark.webp')+'" alt=""><div><b>AR BI Assistant</b><small>Instant answers, no sign-up</small></div><button class="cb-x" id="cbX" aria-label="Close chat">&times;</button></div><div class="cb-m" id="cbM" aria-live="polite"></div><div class="cb-ch" id="cbCh"></div><form class="cb-f" id="cbF"><input id="cbI" type="text" placeholder="Ask about services, process, contact…" aria-label="Your question" autocomplete="off" maxlength="200"><button type="submit">Send</button></form></div>';
while(mount.firstChild)document.body.appendChild(mount.firstChild);
var fab=$('#cbFab'),box=$('#cb'),M=$('#cbM'),CH=$('#cbCh'),F=$('#cbF'),I=$('#cbI'),started=false;
function u(k,h){return (L[k]||'#')+(h||'')}
var C='<a href="'+u('contact')+'">contact form</a>';
var KB=[
{k:['hello','hi','hey','salam','assalam'],a:'Hello! I can tell you about our services, working process, portfolio and how to get in touch. What would you like to know?'},
{k:['service','offer','what do you do','help with','provide'],a:'We offer 10 services: Power BI dashboards, advanced DAX, SQL development and reporting, Excel dashboards, Power Query, data modeling, BI consulting, performance tuning, automated reporting, and KPI/executive reporting. See <a href="'+u('services')+'">Services</a> for details on each.'},
{k:['power bi','dashboard'],a:'Power BI dashboard development is our core service: interactive dashboards built around the decisions your team makes. See <a href="'+u('svc0')+'">the service page</a> or browse examples in the <a href="'+u('portfolio')+'">Portfolio</a>.'},
{k:['dax'],a:'Advanced DAX covers measures, time intelligence, KPIs and calculation logic, written to be accurate and fast. <a href="'+u('svc1')+'">Read more</a>.'},
{k:['sql','database'],a:'SQL development and database reporting: queries, views and reporting layers that feed dashboards with trusted numbers. <a href="'+u('svc2')+'">Read more</a>.'},
{k:['excel'],a:'We build Excel dashboards and reporting workbooks with clean models and clear visuals for teams that live in Excel. <a href="'+u('svc3')+'">Read more</a>.'},
{k:['power query','etl','transform','clean'],a:'Power Query and data transformation: cleaning, shaping and combining data from multiple sources into a reliable model. <a href="'+u('svc4')+'">Read more</a>.'},
{k:['model','semantic','star schema'],a:'Data modeling and semantic models give dashboards a solid, scalable foundation so every report uses the same definitions. <a href="'+u('svc5')+'">Read more</a>.'},
{k:['slow','performance','optimi','speed'],a:'Dashboard optimization and performance tuning: we find what makes reports slow and fix model, DAX and visual issues. <a href="'+u('svc7')+'">Read more</a>.'},
{k:['automat','schedule','refresh'],a:'Automated business reporting replaces manual spreadsheet work with refreshed, scheduled reports. <a href="'+u('svc8')+'">Read more</a>.'},
{k:['kpi','executive','ceo','cfo'],a:'KPI and executive reporting solutions: one clear view of the numbers leadership cares about. <a href="'+u('svc9')+'">Read more</a>.'},
{k:['consulting','strategy','advice'],a:'Business intelligence consulting covers reporting strategy, KPI selection and a roadmap for your dashboards. <a href="'+u('svc6')+'">Read more</a>.'},
{k:['process','how do you work','steps','workflow'],a:'Our process has five steps: Discover, Analyze, Design, Develop, Deliver. See <a href="'+u('home','#process')+'">Working process</a>.'},
{k:['experience','years','how long'],a:'AR BI Consulting brings 4.7+ years of professional Business Intelligence experience. See <a href="'+u('about')+'">About us</a>.'},
{k:['why','different','choose'],a:'See <a href="'+u('why')+'">Why choose AR BI Consulting</a> for what to expect when working with us.'},
{k:['portfolio','example','sample','work','project'],a:'See the <a href="'+u('portfolio')+'">Portfolio</a>. Power BI and Excel items are dashboard screenshots; SQL, modeling and report items are clearly labelled samples.'},
{k:['industry','industries','finance','health','retail','education','sector'],a:'We serve finance and banking, sales and marketing, education, healthcare, retail and e-commerce, and operations and management. See <a href="'+u('home','#industries')+'">Industries</a>.'},
{k:['receptionist','assistant','bot','chatbot','ai'],a:'I am the automated receptionist: a rule-based assistant that answers common questions from this website, any time. I am not a person, and I hand anything detailed to the team. <a href="'+u('recept')+'">How I work</a>.'},
{k:['faq','question'],a:'Common questions are answered on the <a href="'+u('faq')+'">FAQ page</a>.'},
{k:['price','cost','rate','quote','budget','how much','fee'],a:'Pricing depends on scope, so I will not guess a number. Tell us about your project in the '+C+' and we will reply with a proposal.'},
{k:['time','deadline','how long will','turnaround','delivery'],a:'Timelines depend on data sources and scope. Share your details in the '+C+' and we will give you an honest estimate.'},
{k:['certif','award','client','testimonial','review'],a:'I only share what is verified. For credentials or references, please ask us directly through the '+C+'.'},
{k:['contact','email','mail','reach','whatsapp','phone','call','linkedin','location','where'],a:'Email: <a href="mailto:arbiconsultings@gmail.com">arbiconsultings@gmail.com</a><br>WhatsApp: <a href="https://wa.me/923102521471" target="_blank" rel="noopener">+92 310 2521471</a><br>Based in Islamabad, Pakistan. You can also use the '+C+'.'},
{k:['consult','book','meeting','start','hire'],a:'Great! Use "Book a Free Consultation" or the '+C+' and describe your goals. We will get back to you.'},
{k:['thank','thanks','shukria'],a:'You are welcome! Anything else I can help with?'}
];
var CHIPS=['What services do you offer?','How does your process work?','Show me your portfolio','How can I contact you?','What does it cost?'];
function add(t,w,h){var d=document.createElement('div');d.className='cb-b '+w;if(h)d.innerHTML=t;else d.textContent=t;M.appendChild(d);M.scrollTop=M.scrollHeight;return d}
function norm(q){return q.toLowerCase().replace(/[^a-z0-9 ]/g,' ')}
function hit(n,k){return k.length<=3?(' '+n+' ').indexOf(' '+k+' ')>-1:n.indexOf(k)>-1}
function answer(q){var n=norm(q),best=null,bs=0;KB.forEach(function(e){var sc=0;e.k.forEach(function(k){if(hit(n,k))sc+=k.length>3?2:1});if(sc>bs){bs=sc;best=e}});
return best?best.a:'I am not sure about that one. Try asking about services, process, portfolio or contact, or send your question through the '+C+' and we will answer personally.'}
function chips(){CH.innerHTML='';CHIPS.forEach(function(c){var b=document.createElement('button');b.type='button';b.textContent=c;b.onclick=function(){ask(c)};CH.appendChild(b)})}
function ask(q){q=q.trim();if(!q)return;add(q,'me');var t=add('<span class="dots"><i></i><i></i><i></i></span>','bot',1);setTimeout(function(){t.innerHTML=answer(q);M.scrollTop=M.scrollHeight},reduce?0:650)}
function open(o){box.classList.toggle('open',o);fab.setAttribute('aria-expanded',o);if(o&&!started){started=true;add('Hi, I am the AR BI assistant. Ask me about services, process, portfolio or how to reach us.','bot');chips()}if(o)setTimeout(function(){I.focus()},50)}
fab.onclick=function(){open(!box.classList.contains('open'))};$('#cbX').onclick=function(){open(false);fab.focus()};
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&box.classList.contains('open'))open(false)});
F.onsubmit=function(e){e.preventDefault();var v=I.value;I.value='';ask(v)};
window.ARChat={open:open};
})();
