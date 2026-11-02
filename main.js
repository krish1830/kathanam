(function(){
  document.documentElement.classList.add('js');
  // OS auto-detection for the main download button
  var R='https://github.com/krish1830/kathanam/releases/latest/download/';
  var ua=navigator.userAgent, p=(navigator.userAgentData&&navigator.userAgentData.platform)||navigator.platform||'';
  var os=/Mac|iPhone|iPad/i.test(p+ua)?'mac':/Linux|X11/i.test(p+ua)&&!/Android/i.test(ua)?'linux':/Win/i.test(p+ua)?'win':null;
  var map={win:['Kathanam-Setup.exe','Download for Windows'],mac:['Kathanam-mac.zip','Download for macOS'],linux:['Kathanam-x86_64.AppImage','Download for Linux']};
  var b=document.getElementById('main-dl'),l=document.getElementById('main-dl-label');
  if(os&&map[os]){b.href=R+map[os][0];l.textContent=map[os][1];
    var c=document.querySelector('.dl[data-os="'+os+'"]');if(c)c.classList.add('current');
    if(os==='mac'&&navigator.userAgentData&&navigator.userAgentData.getHighEntropyValues){
      navigator.userAgentData.getHighEntropyValues(['architecture']).then(function(v){if(v.architecture==='x86'){b.href=R+'Kathanam-mac-intel.zip';l.textContent='Download for Mac (Intel)';}}).catch(function(){});}
    selectTab(os);
  }
  // install tabs
  function selectTab(id){document.querySelectorAll('.tabs [role=tab]').forEach(function(t){var on=t.id==='t-'+id;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!on;});}
  var tabs=[].slice.call(document.querySelectorAll('.tabs [role=tab]'));
  tabs.forEach(function(t,i){t.addEventListener('click',function(){selectTab(t.id.slice(2))});
    t.addEventListener('keydown',function(e){var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(d){var n=tabs[(i+d+tabs.length)%tabs.length];n.focus();selectTab(n.id.slice(2));}});});
  // scroll reveal
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
  els.forEach(function(e,i){io.observe(e)});
})();
