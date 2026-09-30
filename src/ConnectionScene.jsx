import React, { useEffect, useRef } from 'react'
import './connection-journey.css'

const steps = [
  { label: 'Website inquiry', title: 'A visitor becomes a lead.', detail: 'Capture the request with the details your team needs.', badge: 'INQUIRY RECEIVED' },
  { label: 'CRM routing', title: 'The right person gets it.', detail: 'Create the contact, assign an owner, and set the next step.', badge: 'OWNER ASSIGNED' },
  { label: 'Follow-up', title: 'The conversation keeps moving.', detail: 'Send confirmation and a booking link without the manual chase.', badge: 'FOLLOW-UP SENT' },
  { label: 'Appointment', title: 'An inquiry becomes a booking.', detail: 'Update the pipeline and notify the person taking the call.', badge: 'APPOINTMENT CONFIRMED' },
]
const clamp = n => Math.max(0, Math.min(1, n))

function Panel({ index }) {
  return <div className="journey-panel-content">
    <div className="journey-window"><i /><i /><i /><span>{['yourbusiness.com / contact', 'CRM / new opportunity', 'Workflow / inquiry follow-up', 'Calendar / discovery call'][index]}</span></div>
    <div className="journey-panel-body">
      <small>{['YOUR WEBSITE', 'YOUR CRM', 'YOUR AUTOMATION', 'YOUR CALENDAR'][index]}</small>
      <strong>{['Let’s talk about your project.', 'New inquiry. Clear next step.', 'Follow up, automatically.', 'You’re on the calendar.'][index]}</strong>
      {index === 0 && <><div className="journey-field">Name <b>Alex Morgan</b></div><div className="journey-field">I’m looking for <b>A website + booking setup</b></div><div className="journey-gold-button">Send inquiry <span>↗</span></div></>}
      {index === 1 && <><div className="journey-contact"><b>AM</b><span>Alex Morgan<small>Website inquiry</small></span></div><div className="journey-field">Pipeline <b>New lead → Contacted</b></div><div className="journey-field">Assigned to <b>Business owner</b></div></>}
      {index === 2 && <div className="journey-workflow"><div>✓ Inquiry captured</div><span>↓</span><div>✓ Confirmation email sent</div><span>↓</span><div>✓ Booking link delivered</div></div>}
      {index === 3 && <><div className="journey-booking"><b>✓</b><span>Discovery call<small>Alex Morgan · 30 minutes</small></span></div><div className="journey-field">Status <b>Booking confirmed</b></div><div className="journey-field">Team notification <b>Delivered</b></div></>}
      <div className="journey-panel-status">{steps[index].badge}</div>
    </div>
  </div>
}

// Textures are drawn once. Scroll moves actual meshes and the camera, not a video.
function makeTexture(THREE, index) {
  const el = document.createElement('canvas'); el.width = 1024; el.height = 820
  const c = el.getContext('2d')
  const text = (s, x, y, size = 30, color = '#f4eee4', weight = 500) => { c.fillStyle = color; c.font = `${weight} ${size}px Arial`; c.fillText(s, x, y) }
  const box = (x,y,w,h,color,stroke = '#494036') => { c.fillStyle = color; c.beginPath(); c.roundRect(x,y,w,h,14); c.fill(); c.strokeStyle = stroke; c.lineWidth = 2; c.stroke() }
  c.fillStyle = '#171615'; c.fillRect(0,0,1024,820)
  c.fillStyle = '#24221f'; c.fillRect(0,0,1024,80)
  for(let i=0;i<3;i++){ c.fillStyle = '#bda778'; c.beginPath(); c.arc(38+i*26,40,6,0,Math.PI*2); c.fill() }
  text(['yourbusiness.com / contact','CRM / new opportunity','Workflow / inquiry follow-up','Calendar / discovery call'][index],142,50,25,'#bfb6a7')
  text(['YOUR WEBSITE','YOUR CRM','YOUR AUTOMATION','YOUR CALENDAR'][index], 60,145,23,'#ddbb7a',700)
  text(['Let’s talk about your project.','New inquiry. Clear next step.','Follow up, automatically.','You’re on the calendar.'][index],60,217, 40, '#f6f0e6',700)
  const row = (label,value,y) => { box(60,y,904,100,'#22201d'); text(label,84,y+35,22,'#bdb4a4'); text(value,84,y+76,30) }
  if(index===0){ row('Name','Alex Morgan',272); row('I’m looking for','A website + booking setup',399); box(60,538,904,83,'#dabc80','#e9d6ae'); text('Send inquiry',90,591,30,'#21190d',700); text('↗',889,591,35,'#21190d') }
  if(index===1){ box(60,270,904,104,'#2b261e','#8d754b'); text('AM',90,335,36,'#e3c993',700); text('Alex Morgan',195,317,30); text('Website inquiry',195,351,23,'#bdb4a4'); row('Pipeline','New lead → Contacted',397); row('Assigned to','Business owner',524) }
  if(index===2){ ['Inquiry captured','Confirmation email sent','Booking link delivered'].forEach((s,i)=>{box(60,270+i*122,904,85,'#26231d','#7a6747');text('✓  '+s,92,324+i*122,31);if(i<2)text('↓',490,379+i*122,30,'#dab979')}) }
  if(index===3){box(60,270,904,126,'#2b261e','#b99a61');text('✓',92,345,55,'#e2c68e');text('Discovery call',190,321,36);text('Alex Morgan · 30 minutes',190,365,27,'#bdb4a4');row('Status','Booking confirmed',419);row('Team notification','Delivered',544)}
  text(steps[index].badge,60,756,24,'#e3c993',700)
  const texture = new THREE.CanvasTexture(el); texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export default function ConnectionScene() {
  const root = useRef(null)
  const canvas = useRef(null)
  useEffect(() => {
    const host = root.current, hero = host.closest('.cinematic-hero')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let disposed = false, renderer, scene, camera, cards=[], tracer, paths=[], resources=[]
    let frame = 0, progress = 0, previous = 0, active = true
    const resize = () => {
      if (!renderer) return
      const {width,height} = host.getBoundingClientRect()
      renderer.setSize(width,height,false); camera.aspect = width / Math.max(1,height); camera.updateProjectionMatrix()
    }
    const draw = () => {
      host.style.setProperty('--journey-progress', progress)
      const stage = Math.min(3, Math.floor(progress * 3.999))
      host.dataset.stage = stage; hero.dataset.connectionStage = stage
      host.querySelectorAll('.journey-fallback-card').forEach((card,i) => {
        const offset = i - progress * 3
        card.style.transform = `translate3d(${offset*108}%, ${Math.abs(offset)*18}px, ${-Math.abs(offset)*130}px) rotateY(${offset*-22}deg)`
        card.style.opacity = String(Math.max(.12,1-Math.abs(offset)*.65))
      })
      if(!renderer) return
      const x = progress*14.4
      camera.position.set(x+.65,.48,7.8); camera.lookAt(x,0,0)
      cards.forEach((card,i) => {card.rotation.y = -.12 + (i*4.8-x)*-.045;card.rotation.x = .045})
      if(tracer){ const segment=Math.min(2,Math.floor(progress*3)); const p=clamp(progress*3-segment); tracer.position.copy(paths[segment].getPoint(p)); tracer.visible=progress>.01&&progress<.99 }
      renderer.render(scene,camera)
    }
    const tick = now => {
      frame = 0
      if(disposed || !active || document.hidden) return
      const rect = hero.getBoundingClientRect()
      const target = motion.matches ? 0 : clamp((78-rect.top)/Math.max(1,rect.height-window.innerHeight+78))
      const dt = Math.min(64,now-previous || 16); previous=now
      progress += (target-progress)*(1-Math.exp(-dt/95))
      if(Math.abs(target-progress)<.0002) progress=target
      draw()
      if(Math.abs(target-progress)>.0002) frame=requestAnimationFrame(tick)
    }
    const request = () => { if(!frame && active && !document.hidden) frame=requestAnimationFrame(tick) }
    const observer = new IntersectionObserver(([entry])=>{active=entry.isIntersecting;if(active)request();else{cancelAnimationFrame(frame);frame=0}}, {rootMargin:'100px'})
    observer.observe(hero)
    const ro = new ResizeObserver(()=>{resize();request()}); ro.observe(host)
    window.addEventListener('scroll',request,{passive:true}); document.addEventListener('visibilitychange',request); motion.addEventListener('change',request)
    request()
    if(!motion.matches) import('three').then(THREE=>{
      if(disposed) return
      try { renderer = new THREE.WebGLRenderer({canvas:canvas.current,alpha:true,antialias:true,powerPreference:'low-power'}) } catch { return }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace
      scene = new THREE.Scene();camera = new THREE.PerspectiveCamera(40,1,.1,100)
      scene.add(new THREE.AmbientLight(0xffffff,2))
      const key = new THREE.DirectionalLight(0xffdc9e,4);key.position.set(-3,6,9);scene.add(key)
      const rim = new THREE.DirectionalLight(0xffffff,3);rim.position.set(15,-3,4);scene.add(rim)
      const body = new THREE.MeshStandardMaterial({color:0x5d503c,metalness:.85,roughness:.28});resources.push(body)
      for(let i=0;i<4;i++){
        const group = new THREE.Group();group.position.x=i*4.8
        const geometry = new THREE.BoxGeometry(4.4,3.52,.16);resources.push(geometry)
        group.add(new THREE.Mesh(geometry,body))
        const texture=makeTexture(THREE,i), material=new THREE.MeshBasicMaterial({map:texture}), faceGeo=new THREE.PlaneGeometry(4.34,3.46);resources.push(texture,material,faceGeo)
        const face=new THREE.Mesh(faceGeo,material);face.position.z=.087;group.add(face)
        scene.add(group);cards.push(group)
        if(i<3){
          const path=new THREE.CatmullRomCurve3([new THREE.Vector3(i*4.8,-1.9,0),new THREE.Vector3(i*4.8+1,-2.15,.6),new THREE.Vector3(i*4.8+3.8,-2.15,.6),new THREE.Vector3((i+1)*4.8,-1.9,0)]);paths.push(path)
          const geo=new THREE.TubeGeometry(path,32,.022,6,false),mat=new THREE.MeshBasicMaterial({color:0x9a7f4e});resources.push(geo,mat);scene.add(new THREE.Mesh(geo,mat))
        }
      }
      const geo=new THREE.BoxGeometry(.32,.2,.1),mat=new THREE.MeshBasicMaterial({color:0xffe0a2});resources.push(geo,mat);tracer=new THREE.Mesh(geo,mat);scene.add(tracer)
      resize();draw();host.classList.add('journey-webgl')
    }).catch(()=>{})
    return ()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();ro.disconnect();window.removeEventListener('scroll',request);document.removeEventListener('visibilitychange',request);motion.removeEventListener('change',request);resources.forEach(r=>r.dispose());renderer?.dispose()}
  },[])
  return <div className="connection-journey" ref={root} data-stage="0">
    <div className="journey-topline"><span>ONE INQUIRY. A CONNECTED PATH.</span><span>ILLUSTRATIVE WORKFLOW</span></div>
    <div className="journey-fallback" aria-hidden="true">{steps.map((s,i)=><div key={s.label} className="journey-fallback-card" style={{transform:`translate3d(${i*108}%,${i*18}px,${-i*130}px) rotateY(${-i*22}deg)`}}><Panel index={i}/></div>)}</div>
    <canvas ref={canvas} className="journey-canvas" aria-hidden="true"/>
    <div className="journey-caption">{steps.map((s,i)=><div key={s.label} className={`journey-caption-${i}`}><strong>{s.title}</strong><p>{s.detail}</p></div>)}</div>
    <ol className="journey-stages">{steps.map((s,i)=><li key={s.label} className={`journey-step-${i}`}><span/>{s.label}</li>)}</ol>
  </div>
}
