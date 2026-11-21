import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { inflateSync, deflateSync } from 'node:zlib'

// Produce the 1200x630 Open Graph image from the same uploaded logo used in the navigation.
// No external dependencies or image services are needed during deployment.
const png = await readFile('public/assets/connectivestack-blue-gold-logo.png')
if (png.toString('hex', 0, 8) !== '89504e470d0a1a0a') throw new Error('Invalid brand logo PNG')
let offset=8, w, h, depth, mode, pal, trans
const segments=[]
while(offset<png.length){
  const length=png.readUInt32BE(offset);offset+=4
  const type=png.toString('ascii',offset,offset+4);offset+=4
  const data=png.subarray(offset,offset+length);offset+=length+4
  if(type==='IHDR'){w=data.readUInt32BE(0);h=data.readUInt32BE(4);depth=data[8];mode=data[9]}
  if(type==='PLTE')pal=data
  if(type==='tRNS')trans=data
  if(type==='IDAT')segments.push(data)
  if(type==='IEND')break
}
if(depth!==8 || mode!==3 || !pal) throw new Error('Brand logo must be an indexed 8-bit PNG')
const raw=inflateSync(Buffer.concat(segments)), pixels=Buffer.alloc(w*h*4)
let ptr=0, previous=Buffer.alloc(w)
for(let y=0;y<h;y++){
  const filter=raw[ptr++], row=Buffer.from(raw.subarray(ptr,ptr+w));ptr+=w
  for(let x=0;x<w;x++){
    const left=x?row[x-1]:0, above=previous[x], corner=x?previous[x-1]:0
    if(filter===1)row[x]=(row[x]+left)&255
    else if(filter===2)row[x]=(row[x]+above)&255
    else if(filter===3)row[x]=(row[x]+Math.floor((left+above)/2))&255
    else if(filter===4){
      const p=left+above-corner, a=Math.abs(p-left),b=Math.abs(p-above),c=Math.abs(p-corner)
      row[x]=(row[x]+(a<=b&&a<=c?left:b<=c?above:corner))&255
    }else if(filter!==0)throw new Error('Unsupported PNG filter '+filter)
  }
  for(let x=0;x<w;x++){const i=row[x],k=(y*w+x)*4
    pixels[k]=pal[i*3];pixels[k+1]=pal[i*3+1];pixels[k+2]=pal[i*3+2];pixels[k+3]=trans?.[i]??255
  }
  previous=row
}
const WIDTH=1200, HEIGHT=630, out=Buffer.alloc(HEIGHT*(WIDTH*3+1))
const displayWidth=1030, factor=displayWidth/w, displayHeight=Math.round(h*factor)
const startX=Math.round((WIDTH-displayWidth)/2), startY=Math.round((HEIGHT-displayHeight)/2)
for(let y=0;y<HEIGHT;y++){
  const row=y*(WIDTH*3+1);out[row]=0
  for(let x=0;x<WIDTH;x++){
    const blue=Math.exp(-((x-310)**2/(510**2)+(y-260)**2/(400**2)))
    const gold=Math.exp(-((x-960)**2/(530**2)+(y-385)**2/(540**2)))
    const rgb=[1+11*blue+4*gold,5+26*blue+9*gold,32+62*blue+8*gold]
    if(x>=startX&&x<startX+displayWidth&&y>=startY&&y<startY+displayHeight){
      const sx=Math.max(0,Math.min(w-1,(x-startX+.5)/factor-.5))
      const sy=Math.max(0,Math.min(h-1,(y-startY+.5)/factor-.5))
      const x0=Math.floor(sx),y0=Math.floor(sy),x1=Math.min(w-1,x0+1),y1=Math.min(h-1,y0+1)
      const tx=sx-x0,ty=sy-y0
      let coverage=0;const summed=[0,0,0]
      for(const [u,v,weight] of [[x0,y0,(1-tx)*(1-ty)],[x1,y0,tx*(1-ty)],[x0,y1,(1-tx)*ty],[x1,y1,tx*ty]]){
        const k=(v*w+u)*4,opacity=pixels[k+3]/255*weight;coverage+=opacity
        for(let n=0;n<3;n++)summed[n]+=pixels[k+n]*opacity
      }
      for(let n=0;n<3;n++)rgb[n]=rgb[n]*(1-coverage)+summed[n]
    }
    const dst=row+1+x*3
    for(let n=0;n<3;n++)out[dst+n]=Math.max(0,Math.min(255,Math.round(rgb[n])))
  }
}
const crcTable=new Uint32Array(256)
for(let i=0;i<256;i++){let c=i;for(let bit=0;bit<8;bit++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;crcTable[i]=c>>>0}
function makeChunk(type,data){
  const bytes=Buffer.alloc(data.length+12)
  bytes.writeUInt32BE(data.length,0);bytes.write(type,4,'ascii');data.copy(bytes,8)
  let crc=0xffffffff
  for(const n of bytes.subarray(4,8+data.length))crc=crcTable[(crc^n)&255]^(crc>>>8)
  bytes.writeUInt32BE((crc^0xffffffff)>>>0,8+data.length)
  return bytes
}
const header=Buffer.alloc(13);header.writeUInt32BE(WIDTH,0);header.writeUInt32BE(HEIGHT,4);header[8]=8;header[9]=2
const social=Buffer.concat([png.subarray(0,8),makeChunk('IHDR',header),makeChunk('IDAT',deflateSync(out,{level:9})),makeChunk('IEND',Buffer.alloc(0))])
await mkdir('dist/assets',{recursive:true})
await writeFile('dist/assets/connectivestack-blue-gold-social.png',social)
console.log('Branded Open Graph card created:',WIDTH+'x'+HEIGHT)
