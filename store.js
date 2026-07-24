/* ============================================================
   store.js — M/S Dayal Fire Works  (shared utilities v3)
   Utility functions, seed data, and localStorage cart/cache.
   Firebase logic lives inline in each HTML page.
   ============================================================ */

// ── Category icons & list ────────────────────────────────────
const DFW_CATEGORY_ICONS = {
  'Sparklers':         '✨',
  'Ground Chakras':    '🌀',
  'Flower Pots':       '🌺',
  'Rockets':           '🚀',
  'Sound Crackers':    '💥',
  'Fancy & Fountains': '🎆',
  'Gift Boxes':        '🎁',
  'Green Crackers':    '🌿'
};
function dfw_categoryIcon(cat){ return DFW_CATEGORY_ICONS[cat] || '🧨'; }
function dfw_mapsUrl(settings){
  if (settings.googleMapsLink && settings.googleMapsLink.trim()) return settings.googleMapsLink.trim();
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent((settings.address||'') + ' ' + (settings.shopName||''));
}

const DFW_CATEGORIES = [
  'Sparklers','Ground Chakras','Flower Pots','Rockets',
  'Sound Crackers','Fancy & Fountains','Gift Boxes','Green Crackers'
];

// ── Security & Utils ───────────────────────────────────────────
function dfw_escapeHTML(str){
  if(typeof str !== 'string') return str;
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag]));
}
function dfw_generateOrderId(){
  const d = new Date();
  const dateStr = [
    String(d.getDate()).padStart(2,'0'),
    String(d.getMonth()+1).padStart(2,'0'),
    String(d.getFullYear()).slice(-2)
  ].join('');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for(let i=0; i<5; i++) rand += chars.charAt(Math.floor(Math.random()*chars.length));
  return `DFW-${dateStr}-${rand}`;
}

// ── Placeholder image (emoji on dark bg) ─────────────────────
function dfw_placeholderImage(emoji, bg){
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
    <rect width='400' height='400' rx='24' fill='${bg}'/>
    <text x='50%' y='54%' font-size='160' text-anchor='middle' dominant-baseline='middle'>${emoji}</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// ── Seed products (shown when Firestore is empty) ─────────────
const DFW_SEED_PRODUCTS = [
  { id:'p1',  name:'Colour Sparklers (10 cm)',        category:'Sparklers',        price:40,   unit:'per box (10 pcs)', quantity:100, badge:'Bestseller',   image:dfw_placeholderImage('✨','#1a2340'), description:'Bright multi-colour hand sparklers.' },
  { id:'p2',  name:'Electric Sparklers (15 cm)',       category:'Sparklers',        price:60,   unit:'per box (10 pcs)', quantity:100, badge:'',             image:dfw_placeholderImage('✨','#1a2340'), description:'Longer-burning silver sparklers.' },
  { id:'p3',  name:'Dhanak Chakkar (Ground Spinner)',  category:'Ground Chakras',   price:25,   unit:'per piece',        quantity:100, badge:'',             image:dfw_placeholderImage('🌀','#241a40'), description:'Classic spinning ground chakra.' },
  { id:'p4',  name:'Deluxe Chakri (Large)',            category:'Ground Chakras',   price:90,   unit:'per piece',        quantity:50,  badge:'',             image:dfw_placeholderImage('🌀','#241a40'), description:'Bigger, longer-spinning chakra.' },
  { id:'p5',  name:'Flower Pot (Anar) — Small',        category:'Flower Pots',      price:35,   unit:'per piece',        quantity:100, badge:'',             image:dfw_placeholderImage('🌺','#40241a'), description:'Compact fountain of sparks.' },
  { id:'p6',  name:'Flower Pot (Anar) — Jumbo',        category:'Flower Pots',      price:150,  unit:'per piece',        quantity:30,  badge:'Popular',      image:dfw_placeholderImage('🌺','#40241a'), description:'Tall jumbo fountain, long burn time.' },
  { id:'p7',  name:'10-Shot Sky Rocket',               category:'Rockets',          price:120,  unit:'per piece',        quantity:50,  badge:'',             image:dfw_placeholderImage('🚀','#1a4030'), description:'Rises high and bursts into colour.' },
  { id:'p8',  name:'Whistling Rocket (Pack of 5)',     category:'Rockets',          price:100,  unit:'per pack',         quantity:50,  badge:'',             image:dfw_placeholderImage('🚀','#1a4030'), description:'Whistling ascent, colourful burst.' },
  { id:'p9',  name:'Lakshmi Bomb (Sound Cracker)',     category:'Sound Crackers',   price:150,  unit:'per box (10 pcs)', quantity:80,  badge:'',             image:dfw_placeholderImage('💥','#402a1a'), description:'Traditional loud-report cracker.' },
  { id:'p10', name:'Garland Chain — 50 wala',          category:'Sound Crackers',   price:180,  unit:'per chain',        quantity:40,  badge:'',             image:dfw_placeholderImage('🧨','#402a1a'), description:'Continuous garland of small crackers.' },
  { id:'p11', name:'Rangoli Fountain Assortment',      category:'Fancy & Fountains',price:220,  unit:'per box',          quantity:20,  badge:'New',          image:dfw_placeholderImage('🎆','#301a40'), description:'Mixed fountain pack, varied effects.' },
  { id:'p12', name:'Family Gift Box — Celebration',    category:'Gift Boxes',       price:999,  unit:'per box',          quantity:10,  badge:'Value Pack',   image:dfw_placeholderImage('🎁','#401a1a'), description:'Sparklers, chakras, anars & rockets.' },
  { id:'p13', name:'Grand Gift Box — Premium Pack',    category:'Gift Boxes',       price:2499, unit:'per box',          quantity:5,   badge:'Premium',      image:dfw_placeholderImage('🎁','#401a1a'), description:'Our largest, most premium assortment.' },
  { id:'p14', name:'Green Sparklers (Eco-friendly)',   category:'Green Crackers',   price:50,   unit:'per box (10 pcs)', quantity:100, badge:'Green Cracker',image:dfw_placeholderImage('🌿','#1a4023'), description:'PESO-approved, reduced emissions.' },
  { id:'p15', name:'Green Flower Pot',                 category:'Green Crackers',   price:60,   unit:'per piece',        quantity:100, badge:'Green Cracker',image:dfw_placeholderImage('🌿','#1a4023'), description:'Eco-friendly anar, less smoke.' }
];

// ── localStorage keys ────────────────────────────────────────
const DFW_KEYS = { cart:'dfw_cart_v2', products:'dfw_products_v3', settings:'dfw_settings_v3' };

// ── Cart (always localStorage) ───────────────────────────────
function dfw_getCart(){ try{ return JSON.parse(localStorage.getItem(DFW_KEYS.cart)||'{}'); }catch(e){ return {}; } }
function dfw_saveCart(c){ localStorage.setItem(DFW_KEYS.cart, JSON.stringify(c)); }

// ── Products local cache ─────────────────────────────────────
function dfw_getCachedProducts(){
  try{ const r=localStorage.getItem(DFW_KEYS.products); return r?JSON.parse(r):[...DFW_SEED_PRODUCTS]; }
  catch(e){ return [...DFW_SEED_PRODUCTS]; }
}
function dfw_saveCachedProducts(p){ localStorage.setItem(DFW_KEYS.products, JSON.stringify(p)); }

// ── Settings local cache ─────────────────────────────────────
const DFW_SETTINGS_DEFAULT = {
  shopName:'M/S Dayal Fire Works', tagline:'Wholesale Cracker Godown',
  whatsapp:'919149637898', altPhones:['9149637898','9906277804','8899278436'],
  address:'Tikri Dayalan Ghou Manhasan, Near Ring Road',
  ownerName:'Shop Owner', ownerEmail:'', googleMapsLink:'', logoImage:null
};
function dfw_getSettings(){
  try{ return {...DFW_SETTINGS_DEFAULT,...JSON.parse(localStorage.getItem(DFW_KEYS.settings)||'{}')}; }
  catch(e){ return {...DFW_SETTINGS_DEFAULT}; }
}
function dfw_saveSettings(s){ localStorage.setItem(DFW_KEYS.settings, JSON.stringify(s)); }

// ── Formatting ───────────────────────────────────────────────
function dfw_formatINR(n){ return '₹'+Number(n).toLocaleString('en-IN',{maximumFractionDigits:2}); }

// ── WhatsApp message builder ─────────────────────────────────
function dfw_buildOrderMessage({ orderId, items, customerName, customerPhone, note, total }){
  const lines = [
    `*New Order — ${orderId}*`, `M/S Dayal Fire Works`, '',
    `Name: ${customerName}`, `Phone: ${customerPhone}`, '', 'Order items:'
  ];
  items.forEach((it,i)=>lines.push(`${i+1}. ${it.name} (${it.unit}) x${it.qty} = ${dfw_formatINR(it.price*it.qty)}`));
  lines.push('', `*Total: ${dfw_formatINR(total)}*`);
  if(note&&note.trim()){ lines.push('', `Note: ${note.trim()}`); }
  lines.push('', '(Sent from the Dayal Fire Works website)');
  return lines.join('\n');
}

// ── Image resize ─────────────────────────────────────────────
async function dfw_resizeImage(file, maxDim=700, quality=0.82){
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=e=>{
      const img=new Image();
      img.onload=()=>{
        let {width,height}=img;
        if(width>height&&width>maxDim){height=Math.round(height*(maxDim/width));width=maxDim;}
        else if(height>maxDim){width=Math.round(width*(maxDim/height));height=maxDim;}
        const canvas=document.createElement('canvas');
        canvas.width=width;canvas.height=height;
        canvas.getContext('2d').drawImage(img,0,0,width,height);
        resolve(canvas.toDataURL('image/jpeg',quality));
      };
      img.onerror=reject; img.src=e.target.result;
    };
    reader.onerror=reject; reader.readAsDataURL(file);
  });
}

// ── Status helpers ───────────────────────────────────────────
const DFW_STATUSES = ['New','Confirmed','Ready for Pickup','Delivered','Cancelled'];
function dfw_statusColor(s){
  return {
    'New':              '#ff8096',
    'Confirmed':        '#ffe566',
    'Ready for Pickup': '#80d4ff',
    'Delivered':        '#7de8a8',
    'Cancelled':        '#a8adc0'
  }[s] || '#a8adc0';
}
function dfw_statusBg(s){
  return {
    'New':              'rgba(224,26,46,0.2)',
    'Confirmed':        'rgba(255,215,0,0.2)',
    'Ready for Pickup': 'rgba(59,130,246,0.2)',
    'Delivered':        'rgba(45,186,106,0.2)',
    'Cancelled':        'rgba(139,146,184,0.2)'
  }[s] || 'rgba(139,146,184,0.2)';
}
