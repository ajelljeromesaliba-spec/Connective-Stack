/* ConnectiveStack Website Style Picker
 * Adapted for the site's static Vite deployment from the user's Next.js style-picker project.
 * Browser memory only. No persistent storage, external template scraping, or backend.
 */
(function () {
  'use strict';

  const templates = [
    { id:'outlay', name:'Outlay', category:'Cloud FinOps', headline:'Cut cloud spend without slowing engineering down', subline:'Cloud cost visibility and smarter optimization for engineering teams.', cta:'Start a free audit', features:['Real-time spend visibility','Cost anomaly alerts','Smarter cloud decisions'], bg:'#0e1d29', text:'#f3f7fb', primary:'#63e5c3', accent:'#8bd8ff', secondary:'#183d43', font:'Space Grotesk', style:'cinematic' },
    { id:'perimeter', name:'Perimeter', category:'Cybersecurity', headline:'Know your attack surface before an attacker maps it for you', subline:'Identify exposed assets and give security teams the context to act.', cta:'Request a scan', features:['External attack discovery','Prioritized risk','Always-on coverage'], bg:'#151322', text:'#f8f8ff', primary:'#a4a8ff', accent:'#b1f7d4', secondary:'#252039', font:'IBM Plex Sans', style:'signal' },
    { id:'rosterly', name:'Rosterly', category:'Workforce & Compensation', headline:'Plan comp and headcount from one source of truth', subline:'Give people leaders a clearer picture of workforce plans and costs.', cta:'Book a walkthrough', features:['Headcount planning','Compensation visibility','People analytics'], bg:'#f8f9f4', text:'#212b28', primary:'#36765a', accent:'#347a64', secondary:'#d5e7dc', font:'Sora', style:'clinical' },
    { id:'tracepoint', name:'Tracepoint', category:'API Observability', headline:'Find the failing request before your customer files a ticket', subline:'See performance changes across your API traffic and fix issues faster.', cta:'Start free trial', features:['Live request tracing','Latency insights','Incident context'], bg:'#091e22', text:'#f0faf8', primary:'#32d8b7', accent:'#89eecf', secondary:'#124048', font:'JetBrains Mono', style:'console' },
    { id:'covenant', name:'Covenant', category:'Contract Management', headline:'Close contracts in days, not weeks', subline:'Bring reviews, approvals, and signatures together in one place.', cta:'Request a demo', features:['Simplified contract review','Clear approvals','Track every version'], bg:'#fbf6eb', text:'#302c2b', primary:'#67452f', accent:'#8c664e', secondary:'#f2e6d3', font:'Instrument Serif', style:'premium' },
    { id:'parcel', name:'Parcel', category:'Commercial Real Estate', headline:'Run your entire portfolio from one lease abstraction', subline:'One clearer workspace for property records, leases, and portfolio decisions.', cta:'Talk to sales', features:['Lease data in one place','Portfolio reporting','Property insights'], bg:'#f3f5f4', text:'#1f3536', primary:'#176e66', accent:'#338e8e', secondary:'#d8e9e7', font:'Manrope', style:'swiss' },
    { id:'freightline', name:'Freightline', category:'Logistics Visibility', headline:"Never let a customer ask where's my shipment first", subline:'A live view of every shipment, exception, and next delivery milestone.', cta:'Get a demo', features:['Shipment timelines','Exception monitoring','Customer updates'], bg:'#11191b', text:'#f5f7f4', primary:'#f0b45d', accent:'#e9d58b', secondary:'#26383a', font:'Archivo', style:'industrial' },
    { id:'quota', name:'Quota', category:'Revenue Operations', headline:'Forecast revenue you can actually defend to the board', subline:'Connect pipeline data and activity to a more dependable revenue forecast.', cta:'Get a forecast review', features:['Pipeline accuracy','Forecast scenarios','Team performance'], bg:'#191126', text:'#faf5ff', primary:'#cb85f5', accent:'#f5adbb', secondary:'#39244a', font:'Space Grotesk', style:'bold' },
    { id:'census', name:'Census', category:'Hospital Operations', headline:'See every open bed in your health system, right now', subline:'Help care teams coordinate capacity and patient flow with live information.', cta:'Request a demo', features:['Capacity overview','Care-team coordination','Faster placement'], bg:'#f2f8fb', text:'#203c4d', primary:'#136d99', accent:'#3b8baf', secondary:'#d6eaf5', font:'Sora', style:'depth' },
    { id:'rampart', name:'Rampart', category:'Payments Infrastructure', headline:'Launch embedded payments without becoming a payments company', subline:'Build payments into your platform with a clearer integration path.', cta:'Talk to an engineer', features:['Payment infrastructure','Developer integrations','Operational insights'], bg:'#101719', text:'#edf6f5', primary:'#8de6b8', accent:'#d0f2e5', secondary:'#223b38', font:'IBM Plex Sans', style:'mono' }
  ];

  const typography = [
    {id:'bold',label:'Bold',description:'Confident, powerful, authoritative.',fonts:[['Space Grotesk','Inter'],['Inter',null],['Archivo',null],['Manrope',null],['Plus Jakarta Sans',null]]},
    {id:'playful',label:'Playful',description:'Friendly, energetic, approachable.',fonts:[['DM Sans',null],['Nunito',null],['Outfit',null],['Quicksand',null],['Poppins',null]]},
    {id:'minimal',label:'Minimal',description:'Clean, elegant, restrained.',fonts:[['Inter',null],['IBM Plex Sans',null],['Source Sans 3',null],['Work Sans',null],['Helvetica Neue',null]]},
    {id:'modern',label:'Modern',description:'Contemporary, premium, technology-focused.',fonts:[['Sora',null],['Geist',null],['Manrope',null],['Urbanist',null],['Plus Jakarta Sans',null]]},
    {id:'editorial',label:'Editorial',description:'Distinctive, expressive, refined.',fonts:[['DM Serif Display','Inter'],['Playfair Display','Manrope'],['Instrument Serif','Inter'],['Libre Baskerville','DM Sans'],['Fraunces','Inter']]}
  ];

  const themes = [
    {id:'cool-tech',name:'Cool Tech',mode:'light',colors:['#0B1E3D','#4F7FFF','#0E7490','#FFFFFF','#0B1E3D'],description:'Deep navy, blue and cyan.'},
    {id:'warm-premium',name:'Warm Premium',mode:'light',colors:['#2B2622','#E4D5B7','#B5563A','#FBF7F0','#2B2622'],description:'Charcoal, beige and terracotta.'},
    {id:'natural-modern',name:'Natural Modern',mode:'light',colors:['#1F3B2C','#9CAF88','#7A6A45','#F7F5F0','#1F3B2C'],description:'Deep green, sage and sand.'},
    {id:'sunset-coral',name:'Sunset Coral',mode:'light',colors:['#3A1230','#FF6B5B','#A8493E','#FFF5F1','#3A1230'],description:'Coral, blush and plum.'},
    {id:'mono-luxe',name:'Monochrome Luxe',mode:'light',colors:['#0A0A0A','#7A7A7A','#8A6A2E','#F7F7F5','#0A0A0A'],description:'Black, silver and champagne.'},
    {id:'candy-pop',name:'Candy Pop',mode:'light',colors:['#3A0CA3','#F72585','#C2185B','#FFFCF7','#240046'],description:'Pink, violet and cream.'},
    {id:'dark-futuristic',name:'Dark Futuristic',mode:'dark',colors:['#A78BFA','#2B2B33','#C4B5FD','#0A0A0C','#F5F5F7'],description:'Near-black, graphite and violet.'},
    {id:'neon-cyberpunk',name:'Neon Cyberpunk',mode:'dark',colors:['#FF00A8','#7C0A8A','#4ADE80','#0A0A0A','#F5F5F5'],description:'Black, magenta and neon green.'},
    {id:'midnight-ocean',name:'Midnight Ocean',mode:'dark',colors:['#0EA5A5','#0B4A52','#5EEAD4','#071A1F','#EAF6F6'],description:'Teal-black, aqua and light text.'},
    {id:'ember-noir',name:'Ember Noir',mode:'dark',colors:['#E1673B','#3A2A22','#F2A65A','#17110E','#F5EDE6'],description:'Charcoal, rust and amber.'},
    {id:'forest-noir',name:'Forest Noir',mode:'dark',colors:['#3F8F63','#1B3327','#D4B483','#0D1712','#F1EDE1'],description:'Ink black, green and gold.'},
    {id:'royal-velvet',name:'Royal Velvet',mode:'dark',colors:['#7C3AED','#3B1450','#E8C468','#17081F','#F3E9F7'],description:'Plum, violet and gold.'}
  ];

  const $ = function(id){return document.getElementById(id);};
  const qsa = function(selector){return Array.from(document.querySelectorAll(selector));};
  const state = {template:null,typography:null,branding:null,device:'desktop',tab:'template',fontCategory:'modern',saved:null};
  let lastLive = '';
  function clone(value){return JSON.parse(JSON.stringify(value));}
  function isHex(value){return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);}
  function contrastOn(hex){
    let h=hex.replace('#','');
    if(h.length===3)h=h.split('').map(function(c){return c+c;}).join('');
    const parts=[0,2,4].map(function(i){return parseInt(h.slice(i,i+2),16)/255;});
    const linear=parts.map(function(c){return c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4);});
    const l=.2126*linear[0]+.7152*linear[1]+.0722*linear[2];
    return l>.35?'#10161a':'#ffffff';
  }
  function current(){return {template:state.template,typography:state.typography,branding:state.branding};}
  function hasSelection(c){return !!(c.template||c.typography||c.branding);}
  function dirty(){return hasSelection(current()) && JSON.stringify(current())!==JSON.stringify(state.saved);}
  function safeFont(name){return String(name||'Inter').replace(/[^a-zA-Z0-9 ]/g,'');}
  function escapeHtml(input){return String(input).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function addFont(name){
    if(!name||name==='Helvetica Neue'||document.querySelector('[data-google-font="'+name+'"]'))return;
    const link=document.createElement('link');
    link.rel='stylesheet';link.dataset.googleFont=name;
    link.href='https://fonts.googleapis.com/css2?family='+encodeURIComponent(name).replace(/%20/g,'+')+':wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
  }
  function setTab(tab){
    state.tab=tab;
    qsa('.picker-tab').forEach(function(b){const yes=b.dataset.tab===tab;b.classList.toggle('is-active',yes);b.setAttribute('aria-selected',String(yes));b.tabIndex=yes?0:-1;});
    qsa('.tab-panel').forEach(function(panel){panel.hidden=panel.id!=='panel-'+tab;});
  }
  function renderTemplates(){
    const term=$('template-search').value.trim().toLowerCase();
    const found=templates.filter(function(t){return [t.name,t.category,t.headline,t.style].join(' ').toLowerCase().includes(term);});
    $('template-empty').hidden=found.length>0;
    $('template-grid').innerHTML=found.map(function(t){
      const selected=state.template&&state.template.id===t.id;
      return '<button type="button" class="template-card'+(selected?' is-selected':'')+'" data-template="'+t.id+'" aria-pressed="'+String(!!selected)+'">'+
        '<div class="template-thumb" style="--thumb-bg:'+t.bg+';--thumb-fg:'+t.text+';--thumb-accent:'+t.primary+'">'+
        '<div class="thumb-brand"><i class="thumb-mark"></i>'+escapeHtml(t.name)+'</div><div class="thumb-headline">'+escapeHtml(t.headline.slice(0,62))+'</div>'+
        '<i class="thumb-button"></i><div class="thumb-screen"><i></i><i></i><i></i><i></i></div>'+
        (selected?'<span class="selected-mark" aria-label="Selected">✓</span>':'')+
        '</div><strong>'+escapeHtml(t.name)+'</strong><small>'+escapeHtml(t.category)+'</small></button>';
    }).join('');
  }
  function renderTypography(){
    $('font-categories').innerHTML=typography.map(function(g){return '<button type="button" class="category-pill'+(state.fontCategory===g.id?' is-active':'')+'" data-category="'+g.id+'">'+g.label+'</button>';}).join('');
    const cat=typography.find(function(g){return g.id===state.fontCategory;})||typography[0];
    $('font-category-description').textContent=cat.description;
    $('font-grid').innerHTML=cat.fonts.map(function(pair,i){
      const selected=state.typography&&state.typography.style===cat.id&&state.typography.primaryFont===pair[0]&&state.typography.secondaryFont===(pair[1]||null);
      const label=pair[1]?pair[0]+' + '+pair[1]:pair[0];
      return '<button type="button" class="font-card'+(selected?' is-selected':'')+'" data-font-index="'+i+'" aria-pressed="'+String(!!selected)+'"><span class="font-sample" style="font-family:&quot;'+safeFont(pair[0])+'&quot;,serif">'+escapeHtml(label)+'</span><small>'+(pair[1]?'Paired with '+escapeHtml(pair[1]):'Single typeface')+'</small>'+(selected?'<span class="check">✓</span>':'')+'</button>';
    }).join('');
  }
  function toBrand(theme){
    return {theme:theme.id,themeName:theme.name,primaryColor:theme.colors[0],secondaryColor:theme.colors[1],accentColor:theme.colors[2],backgroundColor:theme.colors[3],textColor:theme.colors[4]};
  }
  function renderBranding(){
    $('theme-grid').innerHTML=['light','dark'].map(function(mode){
      return '<div class="theme-section-title">'+(mode==='light'?'☀ Light themes':'☾ Dark themes')+'</div><div class="theme-cards">'+themes.filter(function(t){return t.mode===mode;}).map(function(t){
        const selected=state.branding&&state.branding.theme===t.id;
        return '<button class="theme-card'+(selected?' is-selected':'')+'" type="button" data-theme="'+t.id+'" aria-pressed="'+String(!!selected)+'"><strong>'+t.name+(selected?' ✓':'')+'</strong><span class="theme-swatches">'+[0,1,2,3].map(function(i){return '<i style="background:'+t.colors[i]+'"></i>';}).join('')+'</span><small>'+t.description+'</small></button>';
      }).join('')+'</div>';
    }).join('');
    const selected=state.branding;
    $('custom-colors').hidden=!selected;
    if(!selected){$('color-fields').innerHTML='';return;}
    const fields=[['backgroundColor','Background color'],['textColor','Text color'],['primaryColor','Button color'],['accentColor','Icon color']];
    $('color-fields').innerHTML=fields.map(function(item){
      const color=selected[item[0]];
      return '<div class="color-field"><input type="color" id="swatch-'+item[0]+'" data-color="'+item[0]+'" value="'+color+'" aria-label="'+item[1]+' swatch picker">'+
        '<label for="text-'+item[0]+'">'+item[1]+'</label><input type="text" id="text-'+item[0]+'" data-hex="'+item[0]+'" value="'+color+'" maxlength="7" spellcheck="false" aria-label="'+item[1]+' hexadecimal value"></div>';
    }).join('');
    const original=themes.find(function(t){return t.id===selected.theme;});
    const base=original?toBrand(original):null;
    $('reset-theme').hidden=!base||fields.every(function(field){return selected[field[0]].toLowerCase()===base[field[0]].toLowerCase();});
  }
  function activeLook(config){
    const t=config.template;
    const b=config.branding;
    return {bg:b?b.backgroundColor:(t?t.bg:'#f8fafc'),
      text:b?b.textColor:(t?t.text:'#173140'),
      primary:b?b.primaryColor:(t?t.primary:'#176a68'),
      secondary:b?b.secondaryColor:(t?t.secondary:'#d4e8e4'),
      accent:b?b.accentColor:(t?t.accent:'#167d83'),
      heading:config.typography?config.typography.primaryFont:(t?t.font:'Space Grotesk'),
      body:config.typography?(config.typography.secondaryFont||config.typography.primaryFont):'DM Sans'};
  }
  function renderSiteMarkup(config){
    const t=config.template;
    const name=t?t.name:'Your Brand';
    const headline=t?t.headline:'A better way to run the work that matters';
    const sub=t?t.subline:'Turn your idea into a clear, useful experience that helps your audience take the next step.';
    const action=t?t.cta:'Get started';
    const items=t?t.features:['Clearer customer journeys','Thoughtful integrations','A more effective experience'];
    return '<div class="preview-site"><div class="site-nav"><strong><span class="site-logo-dot"></span>'+escapeHtml(name)+'</strong><div class="site-links"><span>Solutions</span><span>How it works</span><span>Resources</span></div><span class="site-cta">Get in touch</span></div>'+
      '<section class="site-hero"><div><span class="site-kicker">'+escapeHtml(t?t.category:'YOUR FUTURE WEBSITE')+'</span><h2>'+escapeHtml(headline)+'</h2><p>'+escapeHtml(sub)+'</p><div class="site-hero-actions"><span class="site-cta">'+escapeHtml(action)+'</span><span class="site-text-link">Explore platform ↗</span></div></div>'+
      '<div class="site-visual"><div class="visual-orb"></div><div class="visual-window"><div class="visual-top"><strong>'+escapeHtml(name)+' / Overview</strong><span class="visual-tag">Live</span></div><div class="visual-chart"><i></i><i></i><i></i><i></i><i></i></div><div class="visual-stats"><span></span><span></span><span></span></div></div></div></section>'+
      '<div class="site-logo-strip"><span>BUILT FOR TEAMS</span><span>GREATER CLARITY</span><span>FEWER HANDOFFS</span><span>BETTER VISIBILITY</span></div>'+
      '<section class="site-feature-area"><span class="site-kicker">WHAT YOU CAN DO</span><h3>Everything you need to move forward</h3><div class="site-features">'+items.map(function(item,i){return '<article class="site-feature"><span class="feature-number">0'+(i+1)+'</span><b>'+escapeHtml(item)+'</b><p>Keep the right information within reach and make the next action easier.</p></article>';}).join('')+'</div></section>'+
      '<div class="site-final-cta"><h3>Ready to get started?</h3><p>Tell us what you want to build and we will map out the next steps.</p></div></div>';
  }
  function cssVars(config){
    const look=activeLook(config);
    return {'--site-bg':look.bg,'--site-text':look.text,'--site-primary':look.primary,'--site-secondary':look.secondary,'--site-accent':look.accent,'--site-heading':'"'+safeFont(look.heading)+'",sans-serif','--site-body':'"'+safeFont(look.body)+'",sans-serif','--button-text':contrastOn(look.primary)};
  }
  function renderPreview(){
    const c=current(),exists=hasSelection(c);
    $('preview-note').hidden=!c.template;
    $('preview-subtitle').textContent=c.template?'Try different fonts or colors. Layout and copy are illustrative.':'Changes to your selection appear instantly below.';
    $('preview-domain').textContent=c.template?c.template.name.toLowerCase()+'.example':'yourbrand.example';
    const frame=$('preview-frame');
    frame.dataset.device=state.device;
    qsa('.device-button').forEach(function(b){const on=b.dataset.device===state.device;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on));});
    const content=$('preview-inner');
    if(!exists){
      content.innerHTML='<div class="preview-empty"><div><div class="empty-glyph">▦</div><strong>Pick a style to get started</strong><p>Choose a template, typography or brand palette to see your design direction here.</p></div></div>';
      return;
    }
    const vars=cssVars(c);
    Object.keys(vars).forEach(function(key){content.style.setProperty(key,vars[key]);});
    const look=activeLook(c);
    addFont(look.heading);addFont(look.body);
    const next=JSON.stringify({t:c.template?c.template.id:null});
    if(lastLive!==next){content.innerHTML=renderSiteMarkup(c);lastLive=next;}
  }
  function renderFooter(){
    const c=current(),exists=hasSelection(c),changed=dirty();
    const clean=exists&&state.saved&&!changed;
    $('save-pick').disabled=!changed;
    $('save-pick').textContent=clean?'Saved ✓':'Save pick';
    $('view-prompt').disabled=!state.saved;
    $('download-preview').disabled=!state.saved;
    $('reset-all').disabled=!exists&&!state.saved;
    $('save-status-text').textContent=!exists?'Make a selection, then save your pick to enable exports.':changed?(state.saved?'You have unsaved changes. Save again to update your exports.':'Save your pick to enable the design prompt and HTML download.'):'Your design is saved. Exports use this saved version.';
    $('selection-chips').innerHTML=(c.template?'<span class="selection-chip">▦ '+escapeHtml(c.template.name)+'</span>':'')+
      (c.typography?'<span class="selection-chip">Aa '+escapeHtml(c.typography.primaryFont)+'</span>':'')+
      (c.branding?'<span class="selection-chip"><i style="background:'+c.branding.primaryColor+'"></i>'+escapeHtml(c.branding.themeName)+'</span>':'');
  }
  function renderEverything(){
    renderTemplates();renderTypography();renderBranding();renderPreview();renderFooter();
  }
  function toPrompt(c){
    const t=c.template,ty=c.typography,b=c.branding,look=activeLook(c);
    const data={template:t?{id:t.id,name:t.name,originalNicheDescription:t.category,contentInstruction:'Replace all sample business copy and imagery with original content for your business.'}:null,typography:ty?{style:ty.style,primaryFont:ty.primaryFont,secondaryFont:ty.secondaryFont}:null,branding:b?{theme:b.theme,primaryColor:b.primaryColor,secondaryColor:b.secondaryColor,accentColor:b.accentColor,backgroundColor:b.backgroundColor,textColor:b.textColor}:null};
    return 'Recreate a website using the exact style direction below.\n\n'+
      '## Layout & structure\n'+(t?'Use the "'+t.name+'" layout direction ('+t.category+'). Reference only: this is a curated concept, not a licensed copy of a third-party website. Create original content and artwork for [YOUR BUSINESS NAME / NICHE].\nHeadline concept: '+t.headline+'\n':'Use a clean marketing website with navigation, hero, relevant feature sections, and a clear call to action.\n')+
      'Do not reuse the sample business name, copy, statistics, logos, or testimonials. Use truthful, business-specific claims.\n\n'+
      '## Typography\nHeading: '+look.heading+'\nBody: '+look.body+'\nStyle: '+(ty?ty.styleLabel:'Template default')+'\n\n'+
      '## Branding & color tokens\nPrimary/button: '+look.primary+'\nButton text: '+contrastOn(look.primary)+'\nSecondary: '+look.secondary+'\nAccent/icon: '+look.accent+'\nBackground: '+look.bg+'\nText: '+look.text+'\n'+(b?'Palette: '+b.themeName+'\n':'')+
      '\n## Implementation\nResponsive desktop/tablet/mobile layouts. Use accessible controls, a logical heading structure, clear focus states, and WCAG AA contrast for actual text. Load the specified heading and body fonts. Include functional forms and CTAs only when backed by real destinations.\n\n'+
      '## Design Direction JSON\n'+JSON.stringify(data,null,2)+'\n';
  }
  function download(filename,text,mime){
    const blob=new Blob([text],{type:mime||'text/plain;charset=utf-8'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();
    setTimeout(function(){URL.revokeObjectURL(url);},1500);
  }
  function standaloneHtml(c){
    const look=activeLook(c);
    const markup=renderSiteMarkup(c);
    const heading=safeFont(look.heading),body=safeFont(look.body);
    const google='https://fonts.googleapis.com/css2?family='+encodeURIComponent(heading).replace(/%20/g,'+')+':wght@400;500;600;700&family='+encodeURIComponent(body).replace(/%20/g,'+')+':wght@400;500;600;700&display=swap';
    const style=':root{--site-bg:'+look.bg+';--site-text:'+look.text+';--site-primary:'+look.primary+';--site-accent:'+look.accent+';--button-text:'+contrastOn(look.primary)+';--site-heading:"'+heading+'",sans-serif;--site-body:"'+body+'",sans-serif}*{box-sizing:border-box}body{margin:0;background:var(--site-bg);color:var(--site-text);font-family:var(--site-body)}.preview-site{font-size:14px}.site-nav{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:22px 5%;border-bottom:1px solid #8884}.site-nav strong{font:700 20px var(--site-heading);display:flex;align-items:center;gap:10px}.site-logo-dot{display:inline-block;width:18px;height:18px;background:var(--site-primary);border-radius:5px}.site-links{display:flex;gap:22px;font-size:12px;opacity:.7}.site-cta{display:inline-block;background:var(--site-primary);color:var(--button-text);padding:12px 20px;border-radius:8px;font-weight:700;font-size:13px}.site-hero{display:grid;grid-template-columns:1fr 1fr;gap:6%;align-items:center;padding:90px 6% 70px}.site-kicker{color:var(--site-accent);font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.site-hero h2{font:700 clamp(34px,5vw,76px)/1.04 var(--site-heading);letter-spacing:-.05em;margin:18px 0}.site-hero p{font-size:17px;line-height:1.6;opacity:.75}.site-hero-actions{display:flex;gap:20px;align-items:center}.site-text-link{font-weight:700;font-size:13px}.site-visual{background:color-mix(in srgb,var(--site-bg),var(--site-accent) 12%);border:1px solid #8884;border-radius:24px;padding:32px;position:relative;min-height:360px;display:grid;place-items:center}.visual-orb{position:absolute;inset:8%;background:var(--site-primary);opacity:.08;filter:blur(35px);border-radius:50%}.visual-window{position:relative;background:var(--site-bg);border:1px solid #8885;border-radius:13px;padding:22px;width:100%;box-shadow:0 22px 50px #0002}.visual-top{display:flex;justify-content:space-between;font-size:12px}.visual-tag{background:var(--site-accent);padding:4px 10px;border-radius:100px}.visual-chart{display:flex;align-items:end;gap:17px;height:150px;padding-top:25px}.visual-chart i{flex:1;background:var(--site-primary);height:35%;border-radius:6px 6px 0 0}.visual-chart i:nth-child(2){height:70%}.visual-chart i:nth-child(3){height:50%}.visual-chart i:nth-child(4){height:90%}.visual-chart i:nth-child(5){height:65%;background:var(--site-accent)}.visual-stats{display:flex;gap:12px}.visual-stats span{flex:1;height:22px;border-radius:6px;background:var(--site-accent);opacity:.2}.site-logo-strip{display:flex;justify-content:space-around;gap:10px;padding:28px;border-block:1px solid #8884;font-size:12px;font-weight:700;opacity:.6}.site-feature-area{padding:70px 6%}.site-feature-area h3{font:700 clamp(30px,3vw,45px) var(--site-heading);letter-spacing:-.04em}.site-features{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.site-feature{padding:28px;border:1px solid #8885;border-radius:12px}.feature-number{display:inline-block;color:var(--site-accent);font-weight:800}.site-feature b{display:block;font:700 18px var(--site-heading);margin:14px 0}.site-feature p{font-size:13px;opacity:.7}.site-final-cta{text-align:center;padding:60px 20px;background:var(--site-primary);color:var(--button-text)}.site-final-cta h3{font:700 36px var(--site-heading);margin:0 0 10px}.site-final-cta p{margin:0}@media(max-width:700px){.site-links{display:none}.site-hero{grid-template-columns:1fr;padding:45px 6%;gap:35px}.site-visual{min-height:260px}.site-features{grid-template-columns:1fr}.site-logo-strip{flex-wrap:wrap}.site-feature-area{padding:45px 6%}}';
    return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+escapeHtml(c.template?c.template.name:'Website')+' - Concept Preview</title><link rel="stylesheet" href="'+google+'"><style>'+style+'</style></head><body>'+markup+'<div style="padding:18px;text-align:center;font:12px sans-serif;opacity:.7">Design concept preview only. Replace sample content before publishing.</div></body></html>';
  }

  qsa('.picker-tab').forEach(function(btn){btn.addEventListener('click',function(){setTab(btn.dataset.tab);});});
  $('template-search').addEventListener('input',renderTemplates);
  $('template-grid').addEventListener('click',function(e){
    const btn=e.target.closest('[data-template]');if(!btn)return;
    const t=templates.find(function(x){return x.id===btn.dataset.template;});if(!t)return;
    state.template=t;
    state.typography=null;
    state.branding=null;
    lastLive='';
    renderEverything();
  });
  $('font-categories').addEventListener('click',function(e){
    const btn=e.target.closest('[data-category]');if(!btn)return;
    state.fontCategory=btn.dataset.category;renderTypography();
  });
  $('font-grid').addEventListener('click',function(e){
    const btn=e.target.closest('[data-font-index]');if(!btn)return;
    const cat=typography.find(function(x){return x.id===state.fontCategory;});
    const pair=cat.fonts[Number(btn.dataset.fontIndex)];if(!pair)return;
    state.typography={style:cat.id,styleLabel:cat.label,primaryFont:pair[0],secondaryFont:pair[1]||null};
    addFont(pair[0]);addFont(pair[1]);renderEverything();
  });
  $('theme-grid').addEventListener('click',function(e){
    const btn=e.target.closest('[data-theme]');if(!btn)return;
    const t=themes.find(function(x){return x.id===btn.dataset.theme;});if(!t)return;
    state.branding=toBrand(t);renderEverything();
  });
  $('color-fields').addEventListener('input',function(e){
    const key=e.target.dataset.color||e.target.dataset.hex;
    if(!key||!state.branding)return;
    const next=e.target.value;
    if(!isHex(next)){
      if(e.target.dataset.hex)e.target.classList.add('invalid');
      return;
    }
    state.branding[key]=next.toUpperCase();
    if(e.target.dataset.color){const txt=$('text-'+key);if(txt)txt.value=next.toUpperCase();}
    else {e.target.classList.remove('invalid');const color=$('swatch-'+key);if(color)color.value=next;}
    const orig=themes.find(function(t){return t.id===state.branding.theme;});
    const defaults=orig?toBrand(orig):null;
    $('reset-theme').hidden=!defaults||['backgroundColor','textColor','primaryColor','accentColor'].every(function(k){return state.branding[k].toLowerCase()===defaults[k].toLowerCase();});
    renderPreview();renderFooter();
  });
  $('reset-theme').addEventListener('click',function(){
    const theme=themes.find(function(t){return state.branding&&t.id===state.branding.theme;});
    if(theme){state.branding=toBrand(theme);renderEverything();}
  });
  qsa('.device-button').forEach(function(btn){btn.addEventListener('click',function(){state.device=btn.dataset.device;renderPreview();});});
  $('save-pick').addEventListener('click',function(){if(!dirty())return;state.saved=clone(current());renderFooter();$('save-status-text').textContent='Saved. Your prompt and HTML download now reflect this exact pick.';});
  $('reset-all').addEventListener('click',function(){
    if(!confirm('Start over? This clears your choices and saved pick.'))return;
    state.template=null;state.typography=null;state.branding=null;state.saved=null;state.device='desktop';state.fontCategory='modern';lastLive='';
    $('template-search').value='';setTab('template');renderEverything();
  });
  $('view-prompt').addEventListener('click',function(){
    if(!state.saved)return;
    $('prompt-content').textContent=toPrompt(state.saved);$('prompt-dialog').showModal();
  });
  $('close-dialog').addEventListener('click',function(){$('prompt-dialog').close();});
  $('prompt-dialog').addEventListener('click',function(e){if(e.target===$('prompt-dialog'))$('prompt-dialog').close();});
  $('download-prompt').addEventListener('click',function(){if(state.saved)download('website-style-prompt.txt',toPrompt(state.saved));});
  $('copy-prompt').addEventListener('click',async function(){
    if(!state.saved)return;
    const prompt=toPrompt(state.saved);
    try{await navigator.clipboard.writeText(prompt);this.textContent='Copied ✓';}
    catch(_){window.prompt('Copy your design prompt:',prompt);}
  });
  $('download-preview').addEventListener('click',function(){
    if(state.saved)download('website-preview.html',standaloneHtml(state.saved),'text/html;charset=utf-8');
  });
  setTab('template');renderEverything();
})();
