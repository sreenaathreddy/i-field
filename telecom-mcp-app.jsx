import React, { useState, useEffect } from "react";

/* ── TOKENS ── */
const T = {
  bg:"#F1F5F9",surf:"#FFFFFF",border:"#E2E8F0",border2:"#CBD5E1",
  sky:"#0EA5E9",skyD:"#0369A1",skyL:"#E0F2FE",
  teal:"#0D9488",tealL:"#CCFBF1",
  green:"#16A34A",greenL:"#DCFCE7",
  red:"#DC2626",redL:"#FEE2E2",
  yellow:"#D97706",yellowL:"#FEF3C7",
  orange:"#EA580C",orangeL:"#FFEDD5",
  purple:"#7C3AED",purpleL:"#EDE9FE",
  ink:"#0F172A",ink2:"#334155",muted:"#94A3B8",
  sh:"0 1px 4px rgba(0,0,0,0.07)",
  shM:"0 4px 16px rgba(0,0,0,0.09)",
};

/* ── ICONS as SVG string paths (no JSX at module scope) ── */
function Ic({ n, size=18, col="currentColor", sw=1.8, style={} }) {
  const P = {
    tower:`<rect x="8" y="2" width="8" height="3" rx="1"/><path d="M8 5L4 20M16 5l4 15"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="12" y1="5" x2="12" y2="20"/>`,
    search:`<circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>`,
    bell:`<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>`,
    logout:`<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>`,
    home:`<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
    wrench:`<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>`,
    ticket:`<path d="M15 5v2M15 11v2M15 17v2M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z"/>`,
    clipboard:`<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>`,
    user:`<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
    users:`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
    phone:`<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11 19.79 19.79 0 0 1 1.62 2.4 2 2 0 0 1 3.62.4h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.1A16 16 0 0 0 16 16.1l1.06-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`,
    pin:`<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`,
    globe:`<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
    signal:`<path d="M1.42 9a16 16 0 0 1 21.16 0M5 12.55a11 11 0 0 1 14.08 0M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>`,
    zap:`<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
    battery:`<rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="13" x2="23" y2="11"/>`,
    sun:`<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`,
    grid4:`<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>`,
    warn:`<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`,
    check:`<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`,
    tick:`<polyline points="20 6 9 17 4 12"/>`,
    xmark:`<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>`,
    clock:`<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
    camera:`<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>`,
    chL:`<polyline points="15 18 9 12 15 6"/>`,
    chR:`<polyline points="9 18 15 12 9 6"/>`,
    card:`<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>`,
    doc:`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>`,
    wave:`<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,
    shield:`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    layers:`<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>`,
    fuel:`<line x1="3" y1="22" x2="15" y2="22"/><line x1="4" y1="9" x2="14" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>`,
    cpu:`<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>`,
    flame:`<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/>`,
    dollar:`<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`,
    bar:`<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
    star:`<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
    wifi:`<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>`,
    info:`<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>`,
    plus:`<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`,
    send:`<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>`,
    therm:`<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>`,
    edit:`<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>`,
    gauge:`<path d="M12 2a10 10 0 0 1 7.38 3.17"/><path d="M2 12a10 10 0 0 0 10 10"/><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="1"/>`,
    tool:`<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>`,
    download:`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`,
    lock:`<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
    mail:`<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>`,
    eye:`<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`,
    trending:`<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>`,
    file:`<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>`,
    refresh:`<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>`,
    building:`<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
    activity:`<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,
    hash:`<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>`,
    share:`<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>`,
    alert:`<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
    percent:`<line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>`,
  };
  const path = P[n] || `<circle cx="12" cy="12" r="10"/>`;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={{ width:size, height:size, flexShrink:0, display:"inline-block", verticalAlign:"middle", ...style }}
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
}

/* ── CSS ── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#F1F5F9;color:#0F172A}
input,textarea,select,button{font-family:'Inter',sans-serif}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:99px}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideR{from{opacity:0;transform:translateX(-18px)}to{opacity:1;transform:translateX(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(.93)}to{opacity:1;transform:scale(1)}}
@keyframes popIn{0%{transform:scale(0)}60%{transform:scale(1.15)}100%{transform:scale(1)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.15}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes slideNotif{from{transform:translateX(120%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes flowDot{0%{left:-10%}100%{left:110%}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 6px currentColor}50%{box-shadow:0 0 18px currentColor}}
.fadeUp{animation:fadeUp .4s cubic-bezier(.34,1.2,.64,1) both}
.fadeIn{animation:fadeIn .3s ease both}
.scaleIn{animation:scaleIn .3s cubic-bezier(.34,1.2,.64,1) both}
.card{background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;box-shadow:0 1px 4px rgba(0,0,0,0.07)}
.card-h{transition:all .18s;cursor:pointer}
.card-h:hover{border-color:#0EA5E9;box-shadow:0 4px 18px rgba(14,165,233,.12);transform:translateY(-1px)}
.btn{display:inline-flex;align-items:center;gap:6px;font-weight:700;border-radius:9px;border:none;cursor:pointer;transition:all .15s;white-space:nowrap;font-size:13px}
.btn-sky{background:#0EA5E9;color:#fff;padding:9px 16px}
.btn-sky:hover{background:#0369A1;box-shadow:0 4px 12px rgba(14,165,233,.4)}
.btn-out{background:#FFFFFF;color:#334155;border:1.5px solid #E2E8F0;padding:7px 13px}
.btn-out:hover{border-color:#0EA5E9;color:#0EA5E9}
.btn-ghost{background:transparent;border:1.5px solid transparent;padding:7px 13px}
.btn-sm{padding:5px 10px!important;font-size:11px!important}
.btn-full{width:100%;justify-content:center}
.input{width:100%;background:#FFFFFF;border:1.5px solid #E2E8F0;border-radius:9px;padding:10px 13px;font-size:14px;color:#0F172A;outline:none;transition:border .2s}
.input:focus{border-color:#0EA5E9;box-shadow:0 0 0 3px rgba(14,165,233,0.15)}
.input::placeholder{color:#94A3B8}
.select{width:100%;background:#FFFFFF;border:1.5px solid #E2E8F0;border-radius:9px;padding:10px 13px;font-size:13px;color:#0F172A;outline:none}
.pill{display:inline-flex;align-items:center;gap:5px;border-radius:20px;padding:3px 10px 3px 7px;font-size:11px;font-weight:700}
.tag{border-radius:6px;padding:2px 9px;font-size:11px;font-weight:700;display:inline-block}
.led{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.led-g{background:#16A34A;box-shadow:0 0 6px #16A34A;animation:glowPulse 2s infinite}
.led-r{background:#DC2626;animation:blink .8s infinite}
.led-y{background:#D97706;animation:pulse 1.5s infinite}
.divider{height:1px;background:#E2E8F0;margin:12px 0}
.shdr{font-size:10px;font-weight:800;letter-spacing:1px;color:#94A3B8;text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:6px}
`;

/* ── DATA ── */
const USERS = [
  {email:"field@telecom.com",   pw:"field123",  role:"Field Executive"},
  {email:"estate@telecom.com",  pw:"estate123", role:"Estate Manager"},
  {email:"finance@telecom.com", pw:"finance123",role:"Finance Team"},
  {email:"om@telecom.com",      pw:"om123",     role:"O&M Engineer"},
  {email:"circle@telecom.com",  pw:"circle123", role:"Circle Head"},
  {email:"admin@telecom.com",   pw:"admin123",  role:"Admin"},
];
const ROLE_META = {
  "Field Executive":  {icon:"user",    col:T.sky,    canRaise:true,  roEstate:false},
  "Estate Manager":   {icon:"home",    col:T.green,  canRaise:true,  roEstate:false},
  "Finance Team":     {icon:"dollar",  col:T.yellow, canRaise:true,  roEstate:false},
  "O&M Engineer":     {icon:"wrench",  col:T.orange, canRaise:false, roEstate:true },
  "Circle Head":      {icon:"star",    col:T.purple, canRaise:true,  roEstate:false},
  "Admin":            {icon:"shield",  col:T.red,    canRaise:true,  roEstate:false},
};

const SITES = [
  {id:"APHYD2345",name:"Hyderabad Central Tower",circle:"AP",cluster:"HYD-NORTH",lat:"17.3850",lng:"78.4867",landlord:"Ravi Kumar",  phone:"9876543210",live:true, ops:["Jio","Airtel","Vi"],       tenancies:3,pmDone:false},
  {id:"MHPUN1122",name:"Pune West BTS",          circle:"MH",cluster:"PUNE-WEST",lat:"18.5204",lng:"73.8567",landlord:"Priya Shah",   phone:"8765432109",live:true, ops:["Airtel","BSNL"],            tenancies:2,pmDone:true },
  {id:"KABLR0987",name:"Bangalore Tech Park",    circle:"KA",cluster:"BLR-EAST", lat:"12.9716",lng:"77.5946",landlord:"Suresh Nair",  phone:"7654321098",live:false,ops:["Jio","Airtel","Vi","BSNL"], tenancies:4,pmDone:false},
];

const ESTATE_DATA = {
  "APHYD2345":{
    landlords:[
      {name:"Ravi Kumar", pan:"AAAPK1234A",gst:"36AAAPK1234A1Z5",share:60,payee:true, bank:"HDFC ****4567",ifsc:"HDFC0001234"},
      {name:"Meena Kumar",pan:"AAAPK5678B",gst:null,             share:40,payee:false,bank:"SBI ****8901", ifsc:"SBIN0001567"},
    ],
    escalation:{pct:5,terms:3,nextEsc:"01 Apr 2026",history:[{yr:"2022-23",rent:38000},{yr:"2023-24",rent:40000},{yr:"2024-25",rent:42500},{yr:"2025-26",rent:45000}]},
    baseRent:45000,holdReason:"Agreement renewal pending since Feb 2025",holdBy:"Anil Sharma (Estate Manager)",holdDate:"10 Feb 2025",
    sharingOps:[{op:"Jio",logo:"🔵",rent:12000,tenure:5,remaining:3},{op:"Airtel",logo:"🔴",rent:10000,tenure:7,remaining:5},{op:"Vi",logo:"🟣",rent:8000,tenure:3,remaining:1}],
    docs:[{name:"Master Lease Agreement",size:"2.4 MB",date:"01 Apr 2022"},{name:"Jio Sharing Agreement",size:"1.1 MB",date:"15 Jun 2022"}],
    bankChangeReq:null,
  },
  "MHPUN1122":{
    landlords:[{name:"Priya Shah",pan:"BBBPS9876C",gst:"27BBBPS9876C1Z3",share:100,payee:true,bank:"SBI ****2345",ifsc:"SBIN0002345"}],
    escalation:{pct:8,terms:2,nextEsc:"01 Apr 2026",history:[{yr:"2022-23",rent:27000},{yr:"2023-24",rent:29000},{yr:"2024-25",rent:32000}]},
    baseRent:32000,holdReason:null,holdBy:null,holdDate:null,
    sharingOps:[{op:"Airtel",logo:"🔴",rent:9000,tenure:5,remaining:3},{op:"BSNL",logo:"🟠",rent:7000,tenure:4,remaining:2}],
    docs:[{name:"Lease Agreement",size:"1.8 MB",date:"01 Jan 2022"}],
    bankChangeReq:null,
  },
  "KABLR0987":{
    landlords:[
      {name:"Suresh Nair",pan:"CCCNS4321D",gst:"29CCCNS4321D1Z1",share:50,payee:true, bank:"ICICI ****7890",ifsc:"ICIC0007890"},
      {name:"Anitha Nair",pan:"CCCNA6543E",gst:null,             share:30,payee:false,bank:"HDFC ****3456", ifsc:"HDFC0005678"},
      {name:"Vinod Kumar", pan:"CCCVK8765F",gst:"29CCCVK8765F1Z9",share:20,payee:false,bank:"Axis ****6789", ifsc:"UTIB0003456"},
    ],
    escalation:{pct:6,terms:5,nextEsc:"01 Apr 2026",history:[{yr:"2020-21",rent:20000},{yr:"2021-22",rent:21200},{yr:"2022-23",rent:22500},{yr:"2023-24",rent:23900},{yr:"2025-26",rent:28000}]},
    baseRent:28000,holdReason:"Bank mismatch – Vinod Kumar account mismatch",holdBy:"Deepa Raj (Finance Team)",holdDate:"08 Mar 2025",
    sharingOps:[{op:"Jio",logo:"🔵",rent:10000,tenure:6,remaining:4},{op:"Airtel",logo:"🔴",rent:9500,tenure:5,remaining:3},{op:"Vi",logo:"🟣",rent:7000,tenure:4,remaining:2},{op:"BSNL",logo:"🟠",rent:5500,tenure:3,remaining:1}],
    docs:[{name:"Master Lease Agreement",size:"3.1 MB",date:"01 Apr 2020"},{name:"Jio Sharing Agreement",size:"1.2 MB",date:"15 May 2020"}],
    bankChangeReq:{requestedBy:"Vinod Kumar",date:"20 Mar 2025",newBank:"Kotak ****1234",status:"Pending"},
  },
};

const PAY = {
  "APHYD2345":[
    {month:"Jan 2025",rent:45000,gst:8100,rs:"Paid",   gs:"Paid",   utr:"UTR2025011234",date:"05 Jan 2025",bank:"HDFC ****4567"},
    {month:"Feb 2025",rent:45000,gst:8100,rs:"Hold",   gs:"Pending",utr:"-",            date:"-",          bank:"HDFC ****4567",hold:"Agreement renewal pending"},
    {month:"Mar 2025",rent:45000,gst:8100,rs:"Paid",   gs:"Paid",   utr:"UTR2025031890",date:"04 Mar 2025",bank:"HDFC ****4567"},
    {month:"Apr 2025",rent:45000,gst:8100,rs:"Pending",gs:"Pending",utr:"-",            date:"-",          bank:"HDFC ****4567"},
  ],
  "MHPUN1122":[
    {month:"Jan 2025",rent:32000,gst:5760,rs:"Paid",   gs:"Paid",   utr:"UTR2025014455",date:"03 Jan 2025",bank:"SBI ****2345"},
    {month:"Feb 2025",rent:32000,gst:5760,rs:"Paid",   gs:"Paid",   utr:"UTR2025024567",date:"05 Feb 2025",bank:"SBI ****2345"},
    {month:"Mar 2025",rent:32000,gst:5760,rs:"Pending",gs:"Pending",utr:"-",            date:"-",          bank:"SBI ****2345"},
  ],
  "KABLR0987":[
    {month:"Jan 2025",rent:28000,gst:5040,rs:"Paid",   gs:"Paid",   utr:"UTR2025011890",date:"06 Jan 2025",bank:"ICICI ****7890"},
    {month:"Feb 2025",rent:28000,gst:5040,rs:"Hold",   gs:"Pending",utr:"-",            date:"-",          bank:"ICICI ****7890",hold:"Bank mismatch"},
    {month:"Mar 2025",rent:28000,gst:5040,rs:"Pending",gs:"Pending",utr:"-",            date:"-",          bank:"ICICI ****7890"},
  ],
};

const INFRA = {
  "APHYD2345":{power:"DG + Grid",fuel:72,fuelOk:true,dgCompany:"Cummins",dgSerial:"CUM-2020-HYD-4521",dgCapacity:"125 kVA",dgFuelCap:"250 L",dgBattCo:"Amara Raja",dgBattSerial:"AR-12V-200AH-7865",dgBattCap:"12V / 200Ah",kWH:"4521 kWh",hmr:"1240 hrs",batCnt:8,batH:85,batW:[1,1,1,1,1,1,1,0],batCo:"Exide",batCap:"2V / 1000Ah VRLA",batSer:["EX-001","EX-002","EX-003","EX-004","EX-005","EX-006","EX-007","EX-008"],rCnt:2,rLoad:68,rW:[1,1],rCo:"Eltek",rModel:"Flatpack2 HE 48V",solar:"Active",grid:"Available",eb:"4521 kWh",alarms:["Low fuel warning"]},
  "MHPUN1122":{power:"Grid Only",fuel:0,fuelOk:false,dgCompany:"Kirloskar",dgSerial:"KG-2019-PUN-1122",dgCapacity:"62.5 kVA",dgFuelCap:"140 L",dgBattCo:"Exide",dgBattSerial:"EX-12V-100AH-3210",dgBattCap:"12V / 100Ah",kWH:"2198 kWh",hmr:"0 hrs",batCnt:4,batH:92,batW:[1,1,1,1],batCo:"Amara Raja",batCap:"2V / 500Ah VRLA",batSer:["AR-101","AR-102","AR-103","AR-104"],rCnt:1,rLoad:45,rW:[1],rCo:"Vertiv",rModel:"NetSure 701 A48",solar:"Inactive",grid:"Available",eb:"2198 kWh",alarms:[]},
  "KABLR0987":{power:"DG+Grid+Solar",fuel:18,fuelOk:true,dgCompany:"Mahindra Powerol",dgSerial:"MP-2018-BLR-9870",dgCapacity:"82.5 kVA",dgFuelCap:"200 L",dgBattCo:"Amara Raja",dgBattSerial:"AR-12V-150AH-5643",dgBattCap:"12V / 150Ah",kWH:"8834 kWh",hmr:"3890 hrs",batCnt:12,batH:61,batW:[1,1,0,1,1,0,1,1,1,0,1,1],batCo:"HBL Power",batCap:"2V / 800Ah VRLA",batSer:["HBL-201","HBL-202","HBL-203","HBL-204","HBL-205","HBL-206","HBL-207","HBL-208","HBL-209","HBL-210","HBL-211","HBL-212"],rCnt:3,rLoad:88,rW:[1,0,1],rCo:"Delta Electronics",rModel:"DPH 48/30 HE",solar:"Active",grid:"Fail",eb:"8834 kWh",alarms:["Mains fail","DG fuel critical","Battery health low"]},
};

const TICKETS = [
  {id:"TKT-001",siteId:"APHYD2345",type:"Rent",month:"Feb 2025",status:"Open",       sla:"Breached",  raised:"12 Feb 2025",landlord:"Ravi Kumar"},
  {id:"TKT-002",siteId:"KABLR0987",type:"GST", month:"Mar 2025",status:"In Progress",sla:"Within SLA",raised:"15 Mar 2025",landlord:"Suresh Nair"},
  {id:"TKT-003",siteId:"MHPUN1122",type:"Rent",month:"Mar 2025",status:"Resolved",  sla:"Within SLA",raised:"02 Mar 2025",landlord:"Priya Shah"},
];

/* ── PRIMITIVE COMPONENTS ── */
function SPill({ s }) {
  const cfg = {
    "Paid":        {bg:T.greenL, c:T.green,  l:"led-g"},
    "Pending":     {bg:T.yellowL,c:T.yellow, l:"led-y"},
    "Hold":        {bg:T.redL,   c:T.red,    l:"led-r"},
    "In Progress": {bg:T.skyL,   c:T.sky,    l:"led-y"},
    "Resolved":    {bg:T.greenL, c:T.green,  l:"led-g"},
    "Open":        {bg:T.redL,   c:T.red,    l:"led-r"},
  }[s] || {bg:"#F1F5F9", c:T.muted, l:""};
  return (
    <span className="pill" style={{background:cfg.bg,color:cfg.c}}>
      <span className={"led " + cfg.l} />{s}
    </span>
  );
}

function Tag({ t, c, bg }) {
  return <span className="tag" style={{background:bg||c+"18",color:c}}>{t}</span>;
}
function Div() { return <div className="divider" />; }
function SHdr({ children, icon, c }) {
  return (
    <div className="shdr">
      {icon && <Ic n={icon} size={12} col={c||T.muted} />}
      {children}
    </div>
  );
}
function CoBadge({ name, size=13 }) {
  const logos = {"Cummins":"#003399","Kirloskar":"#e63012","Mahindra Powerol":"#c8102e","Exide":"#1a237e","Amara Raja":"#d32f2f","HBL Power":"#1565c0","Eltek":"#006d77","Vertiv":"#e65100","Delta Electronics":"#1b5e20"};
  const bg = logos[name] || T.sky;
  const init = name.split(" ").map(w=>w[0]).join("").slice(0,3).toUpperCase();
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:5,background:bg+"18",border:"1.5px solid "+bg+"40",borderRadius:7,padding:"3px 8px",fontSize:size}}>
      <span style={{background:bg,color:"white",borderRadius:4,padding:"1px 5px",fontWeight:900,fontSize:size-1}}>{init}</span>
      <span style={{fontWeight:700,color:T.ink}}>{name}</span>
    </span>
  );
}

function StatCard({ label, value, icon, c, delay=0 }) {
  return (
    <div className="card fadeUp" style={{padding:"15px 16px",flex:1,minWidth:120,animationDelay:delay+"ms"}}>
      <div style={{background:c+"15",borderRadius:9,padding:8,display:"inline-flex",marginBottom:8}}>
        <Ic n={icon} size={17} col={c} />
      </div>
      <div style={{fontSize:24,fontWeight:900,color:c,lineHeight:1}}>{value}</div>
      <div style={{fontSize:11,color:T.ink2,marginTop:3,fontWeight:500}}>{label}</div>
    </div>
  );
}

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div style={{position:"relative",marginBottom:14}}>
      <Ic n="search" size={15} col={T.muted} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}} />
      <input className="input" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{paddingLeft:38}} />
    </div>
  );
}

function SiteCard({ site, onClick, col=T.sky, delay=0 }) {
  return (
    <div className="card card-h fadeUp" onClick={onClick} style={{padding:16,marginBottom:10,animationDelay:delay+"ms"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
          <div style={{background:col+"15",borderRadius:10,padding:10,display:"flex",flexShrink:0}}><Ic n="tower" size={22} col={col}/></div>
          <div>
            <div style={{fontWeight:800,fontSize:15,color:col}}>{site.id}</div>
            <div style={{fontSize:13,fontWeight:600,marginTop:2}}>{site.name}</div>
            <div style={{display:"flex",gap:12,marginTop:5,flexWrap:"wrap"}}>
              <span style={{display:"flex",alignItems:"center",gap:4,fontSize:12,color:T.ink2}}><Ic n="user" size={11} col={T.muted}/>{site.landlord}</span>
              <span style={{display:"flex",alignItems:"center",gap:4,fontSize:12,color:T.ink2}}><Ic n="pin" size={11} col={T.muted}/>{site.circle} – {site.cluster}</span>
            </div>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
          <Tag t={site.live?"● LIVE":"● OFF-AIR"} c={site.live?T.green:T.red} bg={site.live?T.greenL:T.redL}/>
          <span style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:T.ink2}}><Ic n="layers" size={11} col={T.muted}/>{site.tenancies} Tenants</span>
        </div>
      </div>
      <div style={{display:"flex",gap:6,marginTop:12,flexWrap:"wrap"}}>
        {site.ops.map(op => <Tag key={op} t={op} c={T.purple}/>)}
      </div>
    </div>
  );
}

/* ── FUEL WIDGET ── */
function FuelWidget({ infra }) {
  const { fuel, fuelOk, dgCompany, dgSerial, dgCapacity, dgFuelCap, dgBattCo, dgBattSerial, dgBattCap, kWH, hmr } = infra;
  const [fill, setFill] = useState(0);
  const [wave, setWave] = useState(0);
  const [bubs, setBubs] = useState([]);
  const [segs, setSegs] = useState(0);
  useEffect(() => { if(!fuelOk) return; const t=setTimeout(()=>{setFill(fuel);setSegs(Math.round(fuel/10));},350); return()=>clearTimeout(t); }, [fuel,fuelOk]);
  useEffect(() => { if(!fuelOk||fuel===0) return; const t=setInterval(()=>setWave(w=>(w+1)%360),40); return()=>clearInterval(t); }, [fuelOk,fuel]);
  useEffect(() => {
    if(!fuelOk||fuel===0) return;
    const t = setInterval(() => {
      setBubs(p => {
        const n = p.filter(b=>b.age<25).map(b=>({...b,age:b.age+1}));
        if(Math.random()>.65) n.push({id:Date.now()+Math.random(),x:10+Math.random()*60,age:0});
        return n;
      });
    }, 150);
    return () => clearInterval(t);
  }, [fuelOk,fuel]);
  const col = !fuelOk ? T.muted : fuel<=20 ? T.red : fuel<=40 ? T.yellow : T.green;
  const wX = Math.sin(wave*Math.PI/180)*5;
  return (
    <div className="card" style={{padding:20}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <div style={{background:col+"18",borderRadius:10,padding:9,display:"flex"}}><Ic n="fuel" size={21} col={col}/></div>
        <div><div style={{fontWeight:800,fontSize:15}}>DG Fuel System</div><CoBadge name={dgCompany}/></div>
        {!fuelOk && <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6,background:T.redL,border:"1px solid "+T.red+"40",borderRadius:8,padding:"5px 11px"}}><span className="led led-r"/><span style={{fontSize:11,fontWeight:800,color:T.red}}>SENSOR FAULT</span></div>}
      </div>
      <div style={{background:T.bg,borderRadius:10,border:"1px solid "+T.border,padding:"12px 14px",marginBottom:14}}>
        <SHdr icon="info" c={T.sky}>DG Manufacturing Details</SHdr>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[{l:"Serial No",v:dgSerial,i:"hash"},{l:"Capacity",v:dgCapacity,i:"zap"},{l:"Fuel Tank Cap",v:dgFuelCap,i:"fuel"}].map(f=>(
            <div key={f.l} style={{display:"flex",gap:8}}>
              <div style={{background:T.surf,borderRadius:7,padding:6,display:"flex",flexShrink:0}}><Ic n={f.i} size={12} col={T.sky}/></div>
              <div><div style={{fontSize:10,color:T.muted,fontWeight:700}}>{f.l}</div><div style={{fontSize:12,fontWeight:700,marginTop:1}}>{f.v}</div></div>
            </div>
          ))}
        </div>
        <div className="divider"/>
        <SHdr icon="battery" c={T.orange}>DG Battery</SHdr>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}><CoBadge name={dgBattCo}/><Tag t={dgBattCap} c={T.orange}/><span style={{fontSize:11,color:T.muted}}>S/N: {dgBattSerial}</span></div>
      </div>
      {!fuelOk ? (
        <div>
          <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:12}}>
            <div style={{flexShrink:0,width:60,height:100,border:"3px dashed "+T.red,borderRadius:10,background:T.redL,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,animation:"blink 2s infinite"}}>
              <span style={{fontSize:22}}>⚠️</span><span style={{fontSize:8,fontWeight:800,color:T.red,textAlign:"center"}}>SENSOR ERROR</span>
            </div>
            <div><div style={{fontWeight:800,fontSize:15,color:T.red,marginBottom:6}}>Fuel Sensor Not Working</div><div style={{fontSize:13,color:T.ink2}}>Fuel level data unavailable. Manual inspection required.</div></div>
          </div>
          {[{n:"warn",t:"Check sensor wiring & connectors",c:T.yellow},{n:"tool",t:"Inspect fuel probe for damage",c:T.orange},{n:"send",t:"Raise O&M ticket immediately",c:T.red}].map((a,i) => (
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,background:a.c+"10",border:"1px solid "+a.c+"25",borderRadius:9,padding:"8px 12px",marginBottom:7}}>
              <div style={{background:a.c+"20",borderRadius:7,padding:6,display:"flex",flexShrink:0}}><Ic n={a.n} size={13} col={a.c}/></div>
              <span style={{fontSize:12,fontWeight:600}}>{a.t}</span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{display:"flex",gap:20,alignItems:"flex-start"}}>
          <div style={{flexShrink:0}}>
            <div style={{width:14,height:6,background:col,borderRadius:"3px 3px 0 0",margin:"0 auto",opacity:.8}}/>
            <div style={{width:62,height:130,border:"3px solid "+col,borderRadius:"8px 8px 10px 10px",overflow:"hidden",position:"relative",background:"#F8FAFC",boxShadow:"0 0 14px "+col+"25"}}>
              {[75,50,25].map(m => (
                <div key={m} style={{position:"absolute",right:0,bottom:m+"%",width:"28%",height:1,background:T.border,zIndex:3}}>
                  <span style={{position:"absolute",right:3,top:-7,fontSize:8,color:T.muted,fontWeight:700}}>{m}</span>
                </div>
              ))}
              <div style={{position:"absolute",bottom:0,left:0,right:0,height:fill+"%",background:"linear-gradient(180deg,"+col+"30 0%,"+col+"80 50%,"+col+"CC 100%)",transition:"height 1.4s cubic-bezier(.34,1.3,.64,1)",borderRadius:"0 0 7px 7px"}}>
                <div style={{position:"absolute",top:-4,left:0,right:0,height:8,background:col,opacity:.4,borderRadius:"50%",transform:"translateX("+wX+"px)",transition:"transform .04s linear"}}/>
                <div style={{position:"absolute",top:-2,left:0,right:0,height:5,background:col,opacity:.7,borderRadius:"50%",transform:"translateX("+(-wX*1.4)+"px)",transition:"transform .04s linear"}}/>
                {bubs.map(b => <div key={b.id} style={{position:"absolute",left:b.x+"%",bottom:((b.age/25)*90)+"%",width:4,height:4,borderRadius:"50%",background:col+"70",opacity:1-b.age/25}}/>)}
                {fill>18 && <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:4,pointerEvents:"none",textAlign:"center"}}><div style={{fontSize:18,fontWeight:900,color:"rgba(255,255,255,.95)",lineHeight:1,textShadow:"0 1px 4px rgba(0,0,0,.5)"}}>{fill}<span style={{fontSize:10}}>%</span></div></div>}
              </div>
            </div>
            <div style={{width:8,height:8,background:T.border2,borderRadius:"0 0 4px 4px",margin:"0 auto"}}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:11,color:T.ink2,fontWeight:600,marginBottom:5}}>Tank Level</div>
            <div style={{display:"flex",gap:3,marginBottom:4}}>
              {Array.from({length:10}).map((_,i) => <div key={i} style={{flex:1,height:9,borderRadius:4,background:i<segs?col:T.border,boxShadow:i<segs?"0 0 4px "+col+"70":"none",transition:"background .07s ease "+(i*60)+"ms"}}/>)}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:T.muted,marginBottom:10}}><span>0%</span><span style={{fontWeight:800,color:col}}>{fill}%</span><span>100%</span></div>
            <div style={{display:"inline-flex",alignItems:"center",gap:7,background:col+"12",border:"1.5px solid "+col+"30",borderRadius:9,padding:"7px 13px",marginBottom:12}}>
              <span className={"led "+(fuel<=20?"led-r":fuel<=40?"led-y":"led-g")}/>
              <span style={{fontSize:12,fontWeight:800,color:col}}>{fuel<=20?"🚨 CRITICAL – Refuel NOW":fuel<=40?"⚠ LOW – Schedule Refuel":"✅ NORMAL"}</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[{l:"Present kWH",v:kWH,c:T.sky,i:"activity"},{l:"Hour Meter (HMR)",v:hmr,c:T.purple,i:"clock"}].map(r => (
                <div key={r.l} style={{background:r.c+"0C",border:"1px solid "+r.c+"25",borderRadius:9,padding:"10px 11px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:4}}><Ic n={r.i} size={13} col={r.c}/><span style={{fontSize:10,color:T.muted,fontWeight:700}}>{r.l}</span></div>
                  <div style={{fontSize:15,fontWeight:900,color:r.c}}>{r.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── BATTERY WIDGET ── */
function BatModal({ idx, working, health, company, serial, capacity, onClose }) {
  const col = !working ? T.red : health>=80 ? T.green : health>=50 ? T.yellow : T.red;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(15,23,42,.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,backdropFilter:"blur(4px)"}} onClick={onClose}>
      <div className="card scaleIn" style={{width:320,padding:22}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{background:col+"18",borderRadius:9,padding:8,display:"flex"}}><Ic n="battery" size={19} col={col}/></div>
            <div><div style={{fontWeight:800,fontSize:15}}>Bank B{idx+1}</div><div style={{display:"flex",alignItems:"center",gap:6,marginTop:2}}><span className={"led "+(!working?"led-r":health>=80?"led-g":"led-y")}/><span style={{fontSize:12,fontWeight:700,color:col}}>{working?"Health: "+health+"%":"FAULT"}</span></div></div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer"}}><Ic n="xmark" size={19} col={T.muted}/></button>
        </div>
        <div className="divider"/>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[{l:"Company",v:<CoBadge name={company}/>,i:"building"},{l:"Serial Number",v:serial,i:"hash"},{l:"Capacity",v:capacity,i:"zap"},{l:"Status",v:working?"Operational":"FAULT",i:"activity"},{l:"Health",v:working?health+"%":"—",i:"gauge"}].map(f => (
            <div key={f.l} style={{display:"flex",gap:10,alignItems:"center"}}>
              <div style={{background:T.bg,borderRadius:7,padding:6,display:"flex",flexShrink:0}}><Ic n={f.i} size={13} col={T.sky}/></div>
              <div style={{flex:1}}><div style={{fontSize:10,color:T.muted,fontWeight:700}}>{f.l}</div><div style={{fontSize:13,fontWeight:700,marginTop:1}}>{f.v}</div></div>
            </div>
          ))}
        </div>
        <div style={{marginTop:14,background:T.bg,borderRadius:10,padding:12,textAlign:"center"}}>{working?<span style={{fontWeight:700,color:T.green}}>✓ In service</span>:<span style={{fontWeight:700,color:T.red}}>⛔ Needs replacement</span>}</div>
      </div>
    </div>
  );
}

function SingleBat({ idx, working, health, onClick }) {
  const [h, setH] = useState(0);
  const [bl, setBl] = useState(true);
  useEffect(() => { if(working){const t=setTimeout(()=>setH(health),400+idx*70);return()=>clearTimeout(t);} }, [working,health,idx]);
  useEffect(() => { if(!working){const t=setInterval(()=>setBl(b=>!b),600);return()=>clearInterval(t);} }, [working]);
  const col = !working ? T.red : health>=80 ? T.green : health>=50 ? T.yellow : T.red;
  const fp = working ? Math.max(2,(h/100)*40) : 0;
  return (
    <div onClick={onClick} title={"B"+(idx+1)+": Click for details"} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,opacity:!working&&!bl?.35:1,transition:"opacity .12s",cursor:"pointer"}}>
      <div style={{position:"relative",width:24,height:50}}>
        <div style={{width:10,height:5,background:working?col:T.red,borderRadius:"2px 2px 0 0",margin:"0 auto",boxShadow:working?"0 0 5px "+col+"80":"none"}}/>
        <div style={{width:24,height:42,border:"2.5px solid "+col,borderRadius:"3px 3px 5px 5px",overflow:"hidden",position:"relative",background:T.bg}}>
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:fp,background:col,transition:"height .9s cubic-bezier(.34,1.3,.64,1) "+(idx*70)+"ms",opacity:.9}}/>
          {[33,66].map(p => <div key={p} style={{position:"absolute",left:0,right:0,bottom:p+"%",height:1,background:"white",opacity:.5,zIndex:2}}/>)}
          {working&&health>=55 && <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:3,pointerEvents:"none"}}><span style={{fontSize:11,opacity:h>25?1:0,transition:"opacity .5s"}}>⚡</span></div>}
          {!working && <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:3,background:T.redL+"CC"}}><span style={{fontSize:12,fontWeight:900,color:T.red}}>✕</span></div>}
        </div>
      </div>
      <div style={{fontSize:8,fontWeight:800,color:col,textAlign:"center",lineHeight:1.3}}>B{idx+1}<div style={{fontSize:7,color:working?T.muted:T.red}}>{working?health+"%":"FAULT"}</div></div>
    </div>
  );
}

function BatteryWidget({ infra }) {
  const { batCnt, batH, batW, batCo, batSer, batCap } = infra;
  const [hBar, setHBar] = useState(0);
  const [selBat, setSelBat] = useState(null);
  useEffect(() => { const t=setTimeout(()=>setHBar(batH),300); return()=>clearTimeout(t); }, [batH]);
  const faults = (batW||[]).filter(w=>!w).length;
  const col = faults===0 ? T.green : faults>=batCnt/2 ? T.red : T.yellow;
  return (
    <div className="card" style={{padding:20}}>
      {selBat!==null && <BatModal idx={selBat} working={batW?!!batW[selBat]:true} health={batH} company={batCo} serial={batSer[selBat]||"N/A"} capacity={batCap} onClose={()=>setSelBat(null)}/>}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <div style={{background:col+"18",borderRadius:10,padding:9,display:"flex"}}><Ic n="battery" size={21} col={col}/></div>
        <div><div style={{fontWeight:800,fontSize:15}}>Battery Bank System</div><div style={{display:"flex",gap:8,marginTop:3,flexWrap:"wrap"}}><CoBadge name={batCo}/><Tag t={batCap} c={T.sky}/></div></div>
        <div style={{marginLeft:"auto",display:"flex",gap:6}}><Tag t={(batCnt-faults)+" OK"} c={T.green} bg={T.greenL}/>{faults>0&&<Tag t={faults+" FAULT"} c={T.red} bg={T.redL}/>}</div>
      </div>
      <div style={{marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:5}}><span style={{color:T.ink2,fontWeight:600}}>Overall Health</span><span style={{fontWeight:800,color:col}}>{batH}%</span></div>
        <div style={{height:9,background:T.bg,borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",width:hBar+"%",background:"linear-gradient(90deg,"+col+"70,"+col+")",borderRadius:99,transition:"width 1.2s ease",boxShadow:"0 0 7px "+col+"50"}}/></div>
      </div>
      <div style={{fontSize:11,color:T.muted,marginBottom:8,display:"flex",alignItems:"center",gap:5}}><Ic n="info" size={12} col={T.muted}/>Tap any battery to view details</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:9,padding:12,background:T.bg,borderRadius:10,border:"1px solid "+T.border}}>
        {Array.from({length:batCnt}).map((_,i) => <SingleBat key={i} idx={i} working={batW?!!batW[i]:true} health={batH} onClick={()=>setSelBat(i)}/>)}
      </div>
      <div style={{display:"flex",gap:14,marginTop:10,flexWrap:"wrap"}}>
        {[{c:T.green,l:"Healthy ≥80%"},{c:T.yellow,l:"Weak 50–79%"},{c:T.red,l:"Fault/Critical"}].map(l => <div key={l.l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:T.ink2}}><div style={{width:9,height:9,borderRadius:2,background:l.c}}/>{l.l}</div>)}
      </div>
      {faults>0 && <div style={{marginTop:12,background:T.redL,border:"1px solid "+T.red+"30",borderLeft:"3px solid "+T.red,borderRadius:8,padding:"9px 13px",display:"flex",alignItems:"center",gap:8}}><Ic n="warn" size={15} col={T.red}/><span style={{fontSize:12,fontWeight:700,color:T.red}}>{faults} bank{faults>1?"s":""} in FAULT — Immediate inspection!</span></div>}
    </div>
  );
}

/* ── RECTIFIER WIDGET ── */
function RectModal({ idx, working, load, company, model, onClose }) {
  const col = !working ? T.red : load>85 ? T.orange : T.green;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(15,23,42,.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,backdropFilter:"blur(4px)"}} onClick={onClose}>
      <div className="card scaleIn" style={{width:320,padding:22}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{background:col+"18",borderRadius:9,padding:8,display:"flex"}}><Ic n="cpu" size={19} col={col}/></div>
            <div><div style={{fontWeight:800,fontSize:15}}>Rectifier R-{idx+1}</div><div style={{display:"flex",alignItems:"center",gap:6,marginTop:2}}><span className={"led "+(!working?"led-r":load>85?"led-y":"led-g")}/><span style={{fontSize:12,fontWeight:700,color:col}}>{!working?"OFFLINE":load>85?"OVERLOAD":"NORMAL"}</span></div></div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer"}}><Ic n="xmark" size={19} col={T.muted}/></button>
        </div>
        <div className="divider"/>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[{l:"Company",v:<CoBadge name={company}/>,i:"building"},{l:"Model",v:model,i:"cpu"},{l:"Unit",v:"R-"+(idx+1)+" of Module Bay",i:"hash"},{l:"Voltage",v:"48V DC",i:"zap"},{l:"Load",v:working?load+"%":"—",i:"activity"},{l:"Status",v:!working?"Offline – check fuse":load>85?"Overload":"Operating normally",i:"info"}].map(f => (
            <div key={f.l} style={{display:"flex",gap:10,alignItems:"center"}}>
              <div style={{background:T.bg,borderRadius:7,padding:6,display:"flex",flexShrink:0}}><Ic n={f.i} size={13} col={T.sky}/></div>
              <div style={{flex:1}}><div style={{fontSize:10,color:T.muted,fontWeight:700}}>{f.l}</div><div style={{fontSize:13,fontWeight:700,marginTop:1}}>{f.v}</div></div>
            </div>
          ))}
        </div>
        {working && (
          <div style={{marginTop:14,background:T.bg,borderRadius:10,padding:12}}>
            <div style={{fontSize:11,color:T.ink2,fontWeight:600,marginBottom:6}}>Load Meter</div>
            <div style={{height:10,background:T.border,borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",width:load+"%",background:load>85?"linear-gradient(90deg,"+T.yellow+","+T.orange+")":`linear-gradient(90deg,${T.green}70,${T.green})`,borderRadius:99,transition:"width 1s ease"}}/></div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:3,fontSize:9,color:T.muted}}><span>0%</span><span style={{color:T.red}}>85% limit</span><span>100%</span></div>
          </div>
        )}
      </div>
    </div>
  );
}

function SingleRect({ idx, working, load, onClick }) {
  const [ld, setLd] = useState(0);
  const [led, setLed] = useState(true);
  useEffect(() => { if(working){const t=setTimeout(()=>setLd(load),450+idx*100);return()=>clearTimeout(t);} }, [working,load,idx]);
  useEffect(() => { const t=setInterval(()=>setLed(l=>!l),working?(load>85?280:1000):450); return()=>clearInterval(t); }, [working,load]);
  const col = !working ? T.red : load>85 ? T.orange : load>60 ? T.yellow : T.green;
  return (
    <div onClick={onClick} title={"R-"+(idx+1)+": Click for details"} style={{flex:"1 1 130px",minWidth:120,background:!working?T.redL:load>85?T.orangeL:T.bg,border:"2px solid "+col+"40",borderRadius:11,padding:13,textAlign:"center",transition:"all .3s",cursor:"pointer",boxShadow:working?"0 2px 10px "+col+"15":"none"}}>
      <div style={{position:"relative",width:58,height:44,margin:"0 auto 9px",background:!working?T.red+"15":T.surf,border:"2.5px solid "+col,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:working&&led?"0 0 10px "+col+"35":"none",transition:"box-shadow .15s"}}>
        {[0,1,2,3].map(v => <div key={v} style={{position:"absolute",top:5,bottom:5,left:6+v*9,width:2,background:col+"30",borderRadius:1}}/>)}
        <div style={{position:"absolute",top:5,right:6,display:"flex",flexDirection:"column",gap:4}}>
          <div style={{width:5,height:5,borderRadius:"50%",background:working&&led?T.green:"#CBD5E1",boxShadow:working&&led?"0 0 5px "+T.green:"none",transition:"all .15s"}}/>
          <div style={{width:5,height:5,borderRadius:"50%",background:working&&load>60&&led?(load>85?T.orange:T.yellow):"#CBD5E1",transition:"all .15s"}}/>
        </div>
        {working ? <div style={{fontSize:8,fontWeight:900,color:col,letterSpacing:.3,marginLeft:-6}}>AC→DC<br/><span style={{fontSize:7,color:T.muted}}>48V</span></div> : <div style={{fontSize:18,fontWeight:900,color:T.red}}>✕</div>}
        <div style={{position:"absolute",left:-4,top:"50%",transform:"translateY(-50%)",width:4,height:10,background:T.border2,borderRadius:"3px 0 0 3px"}}/>
        <div style={{position:"absolute",right:-4,top:"50%",transform:"translateY(-50%)",width:4,height:10,background:T.border2,borderRadius:"0 3px 3px 0"}}/>
      </div>
      <div style={{fontSize:12,fontWeight:800,color:col}}>R-{idx+1}</div>
      {working && <><div style={{marginTop:5,height:4,background:T.border,borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",width:ld+"%",borderRadius:99,background:col,transition:"width 1s ease"}}/></div><div style={{fontSize:9,color:col,fontWeight:700,marginTop:2}}>{load}% Load</div></>}
      <div style={{marginTop:5,fontSize:9,fontWeight:800,color:col,background:col+"12",borderRadius:5,padding:"2px 6px",display:"inline-block"}}>{!working?"⛔ OFFLINE":load>85?"⚠ OVERLOAD":"✅ NORMAL"}</div>
    </div>
  );
}

function RectWidget({ infra }) {
  const { rCnt, rLoad, rW, rCo, rModel } = infra;
  const [lb, setLb] = useState(0);
  const [selRect, setSelRect] = useState(null);
  useEffect(() => { const t=setTimeout(()=>setLb(rLoad),300); return()=>clearTimeout(t); }, [rLoad]);
  const faults = (rW||[]).filter(w=>!w).length;
  const col = faults>0 ? T.red : rLoad>85 ? T.orange : T.green;
  return (
    <div className="card" style={{padding:20}}>
      {selRect!==null && <RectModal idx={selRect} working={rW?!!rW[selRect]:true} load={rLoad} company={rCo} model={rModel} onClose={()=>setSelRect(null)}/>}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <div style={{background:col+"18",borderRadius:10,padding:9,display:"flex"}}><Ic n="cpu" size={21} col={col}/></div>
        <div><div style={{fontWeight:800,fontSize:15}}>Rectifier Modules</div><div style={{display:"flex",gap:8,marginTop:3,flexWrap:"wrap"}}><CoBadge name={rCo}/><Tag t={rModel} c={T.sky}/></div></div>
        <div style={{marginLeft:"auto",display:"flex",gap:6}}><Tag t={(rCnt-faults)+" Online"} c={T.green} bg={T.greenL}/>{faults>0&&<Tag t={faults+" Fault"} c={T.red} bg={T.redL}/>}</div>
      </div>
      <div style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:5}}><span style={{color:T.ink2,fontWeight:600}}>System Load</span><span style={{fontWeight:800,color:rLoad>85?T.orange:T.green}}>{rLoad}%</span></div>
        <div style={{height:11,background:T.bg,borderRadius:99,overflow:"hidden",position:"relative"}}>
          <div style={{height:"100%",width:lb+"%",borderRadius:99,background:rLoad>85?"linear-gradient(90deg,"+T.yellow+","+T.orange+")":"linear-gradient(90deg,"+T.green+"70,"+T.green+")",transition:"width 1.2s ease",boxShadow:rLoad>85?"0 0 8px "+T.orange+"50":"0 0 6px "+T.green+"40"}}/>
          <div style={{position:"absolute",top:0,bottom:0,left:"85%",width:2,background:T.red,opacity:.5}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:3,fontSize:9,color:T.muted}}><span>0%</span><span style={{color:T.red}}>85% limit</span><span>100%</span></div>
      </div>
      <div style={{fontSize:11,color:T.muted,marginBottom:8,display:"flex",alignItems:"center",gap:5}}><Ic n="info" size={12} col={T.muted}/>Tap any module to view details</div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        {Array.from({length:rCnt}).map((_,i) => <SingleRect key={i} idx={i} working={rW?!!rW[i]:true} load={rLoad} onClick={()=>setSelRect(i)}/>)}
      </div>
      {faults>0 && <div style={{marginTop:12,background:T.redL,border:"1px solid "+T.red+"30",borderLeft:"3px solid "+T.red,borderRadius:8,padding:"9px 13px",display:"flex",alignItems:"center",gap:8}}><Ic n="warn" size={15} col={T.red}/><span style={{fontSize:12,fontWeight:700,color:T.red}}>{faults} module{faults>1?"s":""} offline — Check fuse</span></div>}
      {rLoad>85&&faults===0 && <div style={{marginTop:12,background:T.orangeL,border:"1px solid "+T.orange+"30",borderLeft:"3px solid "+T.orange,borderRadius:8,padding:"9px 13px",display:"flex",alignItems:"center",gap:8}}><Ic n="warn" size={15} col={T.orange}/><span style={{fontSize:12,fontWeight:700,color:T.orange}}>Load exceeds 85% — Add module or reduce load</span></div>}
      {faults===0&&rLoad<=85 && <div style={{marginTop:12,background:T.greenL,border:"1px solid "+T.green+"30",borderLeft:"3px solid "+T.green,borderRadius:8,padding:"9px 13px",display:"flex",alignItems:"center",gap:8}}><Ic n="tick" size={15} col={T.green} sw={2.5}/><span style={{fontSize:12,fontWeight:700,color:T.green}}>All rectifier modules operating normally</span></div>}
    </div>
  );
}

/* ── PAYMENT FLOW WIDGET ── */
function PayFlowWidget({ pays, canRaise, onRaise }) {
  const latest = pays[pays.length-1] || pays[0];
  const rs = latest?.rs||"Pending";
  const gs = latest?.gs||"Pending";
  const month = latest?.month||"";
  const STEPS = [
    {id:"gen",    label:"Bill Generated",  icon:"doc",    done:true,         col:T.green},
    {id:"verify", label:"Verification",    icon:"tick",   done:rs!=="Pending"&&rs!=="Hold",col:T.sky},
    {id:"approve",label:"Finance Approval",icon:"check",  done:rs==="Paid",  col:T.teal},
    {id:"gst",    label:"GST Processing",  icon:"hash",   done:gs==="Paid",  col:T.purple},
    {id:"payment",label:"Payment Released",icon:"dollar", done:rs==="Paid"&&gs==="Paid",col:T.green},
    {id:"confirm",label:"UTR Confirmed",   icon:"tick",   done:rs==="Paid"&&latest?.utr!=="-",col:T.green},
  ];
  const activeStep = STEPS.findIndex(s=>!s.done);
  const isHold = rs==="Hold";
  const isPending = rs==="Pending";
  return (
    <div className="card" style={{padding:20,background:"linear-gradient(135deg,#FAFFFE 0%,#F0F9FF 100%)"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
        <div style={{background:T.skyL,borderRadius:10,padding:9,display:"flex"}}><Ic n="wave" size={20} col={T.sky}/></div>
        <div><div style={{fontWeight:800,fontSize:15}}>Payment Status Flow</div><div style={{fontSize:12,color:T.ink2}}>Current Month: <strong>{month}</strong></div></div>
        <div style={{marginLeft:"auto"}}><SPill s={rs}/></div>
      </div>
      <div style={{position:"relative",paddingBottom:8}}>
        <div style={{position:"absolute",top:22,left:22,right:22,height:3,background:T.border,borderRadius:99,zIndex:0}}>
          <div style={{height:"100%",background:"linear-gradient(90deg,"+T.green+","+T.sky+")",borderRadius:99,width:((STEPS.filter(s=>s.done).length/STEPS.length)*100)+"%",transition:"width 1.5s ease"}}/>
          {!isHold&&activeStep>0&&activeStep<STEPS.length && <div style={{position:"absolute",top:-4,width:10,height:10,borderRadius:"50%",background:T.sky,boxShadow:"0 0 10px "+T.sky,left:((activeStep/STEPS.length)*100)+"%",animation:"flowDot 2s linear infinite"}}/>}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",position:"relative",zIndex:1}}>
          {STEPS.map((st,i) => {
            const isActive = i===activeStep;
            const isDone = st.done;
            const isBlocked = isHold&&i>=activeStep;
            return (
              <div key={st.id} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,flex:1}}>
                <div style={{width:44,height:44,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:isBlocked?T.redL:isDone?st.col:isActive?T.skyL:T.bg,border:"2.5px solid "+(isBlocked?T.red:isDone?st.col:isActive?T.sky:T.border),boxShadow:isDone?"0 0 12px "+st.col+"40":isActive?"0 0 12px "+T.sky+"50":"none",transition:"all .3s",animation:isActive&&!isHold?"glowPulse 2s infinite":"none"}}>
                  {isBlocked?<Ic n="lock" size={16} col={T.red}/>:isDone?<Ic n="tick" size={16} col="#fff" sw={2.5}/>:<Ic n={st.icon} size={16} col={isActive?T.sky:T.muted}/>}
                </div>
                <div style={{fontSize:9,fontWeight:700,color:isBlocked?T.red:isDone?st.col:isActive?T.sky:T.muted,textAlign:"center",lineHeight:1.3,maxWidth:54}}>{st.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:16}}>
        <div style={{background:rs==="Paid"?T.greenL:rs==="Hold"?T.redL:T.yellowL,border:"1.5px solid "+(rs==="Paid"?T.green:rs==="Hold"?T.red:T.yellow)+"30",borderRadius:10,padding:"11px 13px"}}>
          <div style={{fontSize:10,color:T.muted,fontWeight:700,marginBottom:4}}>RENT STATUS</div>
          <div style={{display:"flex",alignItems:"center",gap:7}}><span className={"led "+(rs==="Paid"?"led-g":rs==="Hold"?"led-r":"led-y")}/><span style={{fontSize:14,fontWeight:800,color:rs==="Paid"?T.green:rs==="Hold"?T.red:T.yellow}}>{rs}</span></div>
          {rs==="Paid"&&latest?.utr!=="-" && <div style={{fontSize:10,color:T.muted,marginTop:4}}>UTR: {latest.utr}</div>}
        </div>
        <div style={{background:gs==="Paid"?T.greenL:gs==="Hold"?T.redL:T.yellowL,border:"1.5px solid "+(gs==="Paid"?T.green:gs==="Hold"?T.red:T.yellow)+"30",borderRadius:10,padding:"11px 13px"}}>
          <div style={{fontSize:10,color:T.muted,fontWeight:700,marginBottom:4}}>GST STATUS</div>
          <div style={{display:"flex",alignItems:"center",gap:7}}><span className={"led "+(gs==="Paid"?"led-g":gs==="Hold"?"led-r":"led-y")}/><span style={{fontSize:14,fontWeight:800,color:gs==="Paid"?T.green:gs==="Hold"?T.red:T.yellow}}>{gs}</span></div>
          {gs==="Paid" && <div style={{fontSize:10,color:T.muted,marginTop:4}}>₹{latest?.gst?.toLocaleString()}</div>}
        </div>
      </div>
      {isHold && (
        <div style={{marginTop:14,background:T.redL,border:"1.5px solid "+T.red+"30",borderLeft:"4px solid "+T.red,borderRadius:10,padding:"12px 15px",display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10}}>
          <div><div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}><Ic n="lock" size={15} col={T.red}/><span style={{fontWeight:800,fontSize:13,color:T.red}}>Payment on Hold</span></div><div style={{fontSize:12,color:T.ink2}}>{latest?.hold}</div></div>
          {canRaise && <button className="btn btn-sm" style={{background:T.red,color:"#fff",border:"none",flexShrink:0}} onClick={()=>onRaise(latest)}><Ic n="ticket" size={11} col="#fff"/>Raise Ticket</button>}
          {!canRaise && <Tag t="View Only" c={T.muted}/>}
        </div>
      )}
      {isPending&&canRaise && <div style={{marginTop:14,textAlign:"right"}}><button className="btn btn-sm" style={{background:T.orange+"18",color:T.orange,border:"1.5px solid "+T.orange+"40"}} onClick={()=>onRaise(latest)}><Ic n="plus" size={11} col={T.orange}/>Raise Ticket</button></div>}
    </div>
  );
}

/* ── PAYMENT HISTORY CARDS ── */
function PayHistory({ pays, canRaise, onRaise }) {
  const paidCnt    = pays.filter(r=>r.rs==="Paid").length;
  const holdCnt    = pays.filter(r=>r.rs==="Hold").length;
  const pendingCnt = pays.filter(r=>r.rs==="Pending").length;
  return (
    <div style={{marginTop:14}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <SHdr icon="bar" c={T.sky}>Payment History</SHdr>
        <div style={{display:"flex",gap:6}}>
          <Tag t={paidCnt+" Paid"} c={T.green}/><Tag t={holdCnt+" Hold"} c={T.red}/><Tag t={pendingCnt+" Pending"} c={T.yellow}/>
        </div>
      </div>
      {pays.map((r,i) => {
        const isPaid    = r.rs==="Paid"&&r.gs==="Paid";
        const isHold    = r.rs==="Hold";
        const isPending = r.rs==="Pending";
        const statusCol = isPaid?T.green:isHold?T.red:T.yellow;
        const statusBg  = isPaid?T.greenL:isHold?T.redL:T.yellowL;
        const statusLabel = isPaid?"✅ Paid":isHold?"🔒 On Hold":"⏳ Pending";
        const total = r.rent+r.gst;
        return (
          <div key={i} style={{background:T.surf,border:"1.5px solid "+(isHold?T.red+"40":isPaid?T.green+"25":T.border),borderLeft:"4px solid "+statusCol,borderRadius:14,marginBottom:10,overflow:"hidden",boxShadow:T.sh,animation:"fadeUp .3s ease "+(i*60)+"ms both"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px 10px",background:isPaid?"linear-gradient(90deg,"+T.green+"06,transparent)":isHold?"linear-gradient(90deg,"+T.red+"06,transparent)":"linear-gradient(90deg,"+T.yellow+"06,transparent)",borderBottom:"1px solid "+T.border,flexWrap:"wrap",gap:8}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:40,height:40,borderRadius:10,background:statusBg,border:"1.5px solid "+statusCol+"30",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <div style={{fontSize:8,fontWeight:800,color:statusCol,lineHeight:1,textTransform:"uppercase"}}>{r.month.split(" ")[0].slice(0,3)}</div>
                  <div style={{fontSize:11,fontWeight:900,color:statusCol,lineHeight:1}}>{(r.month.split(" ")[1]||"").slice(-2)}</div>
                </div>
                <div>
                  <div style={{fontWeight:800,fontSize:15}}>{r.month}</div>
                  <div style={{fontSize:11,color:T.muted,marginTop:1,display:"flex",alignItems:"center",gap:5}}><Ic n="card" size={10} col={T.muted}/>{r.bank}</div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:18,fontWeight:900,color:statusCol}}>₹{total.toLocaleString()}</div>
                  <div style={{fontSize:10,color:T.muted,marginTop:1}}>Rent + GST</div>
                </div>
                <div style={{background:statusBg,border:"1.5px solid "+statusCol+"40",borderRadius:20,padding:"4px 12px",fontSize:12,fontWeight:800,color:statusCol,whiteSpace:"nowrap"}}>{statusLabel}</div>
              </div>
            </div>
            <div style={{padding:"10px 16px"}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10}}>
                <div style={{background:T.bg,borderRadius:9,padding:"8px 11px"}}>
                  <div style={{fontSize:10,color:T.muted,fontWeight:700,marginBottom:3,display:"flex",alignItems:"center",gap:4}}><Ic n="dollar" size={10} col={T.muted}/>RENT</div>
                  <div style={{fontSize:14,fontWeight:800}}>₹{r.rent.toLocaleString()}</div>
                  <div style={{marginTop:4}}><SPill s={r.rs}/></div>
                </div>
                <div style={{background:T.bg,borderRadius:9,padding:"8px 11px"}}>
                  <div style={{fontSize:10,color:T.muted,fontWeight:700,marginBottom:3,display:"flex",alignItems:"center",gap:4}}><Ic n="hash" size={10} col={T.muted}/>GST (18%)</div>
                  <div style={{fontSize:14,fontWeight:800}}>₹{r.gst.toLocaleString()}</div>
                  <div style={{marginTop:4}}><SPill s={r.gs}/></div>
                </div>
                <div style={{background:r.date&&r.date!=="-"?T.greenL:T.bg,border:r.date&&r.date!=="-"?"1px solid "+T.green+"25":"none",borderRadius:9,padding:"8px 11px"}}>
                  <div style={{fontSize:10,color:T.muted,fontWeight:700,marginBottom:3,display:"flex",alignItems:"center",gap:4}}><Ic n="clock" size={10} col={r.date&&r.date!=="-"?T.green:T.muted}/>CREDITED DATE</div>
                  {r.date&&r.date!=="-" ? <><div style={{fontSize:13,fontWeight:800,color:T.green}}>{r.date}</div><div style={{fontSize:10,color:T.green,marginTop:2,fontWeight:600}}>✓ Confirmed</div></> : <><div style={{fontSize:13,fontWeight:700,color:T.muted}}>Not credited</div><div style={{fontSize:10,color:T.muted,marginTop:2}}>{isHold?"Payment held":"Awaiting release"}</div></>}
                </div>
                <div style={{background:r.utr&&r.utr!=="-"?T.skyL:T.bg,border:r.utr&&r.utr!=="-"?"1px solid "+T.sky+"25":"none",borderRadius:9,padding:"8px 11px"}}>
                  <div style={{fontSize:10,color:T.muted,fontWeight:700,marginBottom:3,display:"flex",alignItems:"center",gap:4}}><Ic n="hash" size={10} col={r.utr&&r.utr!=="-"?T.sky:T.muted}/>UTR NUMBER</div>
                  {r.utr&&r.utr!=="-" ? <div style={{fontFamily:"monospace",fontSize:11,fontWeight:800,color:T.sky,wordBreak:"break-all"}}>{r.utr}</div> : <div style={{fontSize:12,fontWeight:600,color:T.muted}}>—</div>}
                </div>
              </div>
              {isHold&&r.hold && (
                <div style={{marginTop:10,background:T.redL,border:"1px solid "+T.red+"30",borderRadius:8,padding:"8px 12px",display:"flex",alignItems:"center",gap:8}}>
                  <Ic n="lock" size={13} col={T.red}/>
                  <div><span style={{fontSize:12,fontWeight:700,color:T.red}}>Hold Reason: </span><span style={{fontSize:12,color:T.red}}>{r.hold}</span></div>
                  {canRaise && <button className="btn btn-sm" style={{marginLeft:"auto",background:T.red,color:"#fff",border:"none",flexShrink:0}} onClick={()=>onRaise(r)}><Ic n="ticket" size={11} col="#fff"/>Raise</button>}
                </div>
              )}
              {isPending&&canRaise && <div style={{marginTop:10,display:"flex",justifyContent:"flex-end"}}><button className="btn btn-sm" style={{background:T.yellow+"18",color:T.yellow,border:"1.5px solid "+T.yellow+"50"}} onClick={()=>onRaise(r)}><Ic n="plus" size={11} col={T.yellow}/>Raise Ticket</button></div>}
            </div>
          </div>
        );
      })}
      <div style={{background:"linear-gradient(135deg,"+T.skyL+","+T.greenL+")",border:"1px solid "+T.sky+"25",borderRadius:12,padding:"12px 16px",marginTop:4}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:12}}>
          {[
            {l:"Total Rent",     v:"₹"+pays.reduce((a,r)=>a+r.rent,0).toLocaleString(),                                              c:T.sky},
            {l:"Total GST",      v:"₹"+pays.reduce((a,r)=>a+r.gst,0).toLocaleString(),                                               c:T.purple},
            {l:"Total Paid",     v:"₹"+pays.filter(r=>r.rs==="Paid").reduce((a,r)=>a+r.rent+r.gst,0).toLocaleString(),               c:T.green},
            {l:"Pending Amount", v:"₹"+pays.filter(r=>r.rs!=="Paid").reduce((a,r)=>a+r.rent+r.gst,0).toLocaleString(),               c:T.orange},
          ].map(s => (
            <div key={s.l} style={{textAlign:"center"}}>
              <div style={{fontSize:10,color:T.ink2,fontWeight:700,marginBottom:3}}>{s.l}</div>
              <div style={{fontSize:15,fontWeight:900,color:s.c}}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── BANK UPDATE FORM ── */
function BankUpdateForm({ landlords }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selLL, setSelLL] = useState(0);
  const [form, setForm] = useState({accName:"",accNo:"",confirmAccNo:"",ifsc:"",bankName:"",branchName:"",accType:"Savings",reason:"",fileName:""});
  const setF = k => e => setForm(p=>({...p,[k]:e.target.value}));
  const mismatch = form.accNo&&form.confirmAccNo&&form.accNo!==form.confirmAccNo;
  const canSubmit = form.accName&&form.accNo&&form.confirmAccNo&&!mismatch&&form.ifsc&&form.bankName&&form.reason;
  if(submitted) return (
    <div style={{textAlign:"center",padding:"24px 16px"}}>
      <div style={{background:T.greenL,borderRadius:"50%",width:56,height:56,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",animation:"popIn .5s cubic-bezier(.34,1.56,.64,1)"}}><Ic n="tick" size={28} col={T.green} sw={2.5}/></div>
      <div style={{fontWeight:800,fontSize:15,marginBottom:4}}>Bank Update Request Submitted!</div>
      <div style={{fontSize:12,color:T.ink2,marginBottom:16}}>Under review by Finance Team · SLA: 3 working days</div>
      <button className="btn btn-out btn-sm" onClick={()=>{setSubmitted(false);setOpen(false);setForm({accName:"",accNo:"",confirmAccNo:"",ifsc:"",bankName:"",branchName:"",accType:"Savings",reason:"",fileName:""});}}><Ic n="refresh" size={12} col={T.muted}/>New Request</button>
    </div>
  );
  if(!open) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
      <div><div style={{fontSize:13,color:T.ink2,marginBottom:4}}>Need to update bank account for rental payments?</div><div style={{fontSize:11,color:T.muted}}>Upload new bank details + cancelled cheque / bank form</div></div>
      <button className="btn btn-sky" onClick={()=>setOpen(true)}><Ic n="card" size={14} col="#fff"/>Update Bank Details</button>
    </div>
  );
  return (
    <div style={{animation:"fadeIn .3s ease"}}>
      {landlords.length>1 && (
        <div style={{marginBottom:14}}>
          <label style={{fontSize:11,color:T.ink2,fontWeight:700,display:"block",marginBottom:6}}>Select Landlord</label>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {landlords.map((l,i) => <button key={i} onClick={()=>setSelLL(i)} style={{padding:"7px 14px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:12,border:"1.5px solid "+(selLL===i?T.sky:T.border),background:selLL===i?T.skyL:T.surf,color:selLL===i?T.sky:T.ink2,transition:"all .15s"}}>{l.name}{l.payee&&<span style={{fontSize:10,color:T.muted}}> (Primary)</span>}</button>)}
          </div>
          <div style={{marginTop:6,fontSize:11,color:T.muted}}>Current: <strong>{landlords[selLL]?.bank}</strong> · IFSC: {landlords[selLL]?.ifsc}</div>
        </div>
      )}
      <div style={{background:T.yellowL,border:"1px solid "+T.yellow+"30",borderRadius:9,padding:"10px 13px",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
        <Ic n="warn" size={15} col={T.yellow}/><span style={{fontSize:12,fontWeight:600}}>Upload cancelled cheque or bank passbook as proof</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div style={{gridColumn:"1/-1"}}>
          <label style={{fontSize:11,color:T.ink2,fontWeight:700,display:"block",marginBottom:5}}>Account Holder Name *</label>
          <input className="input" value={form.accName} onChange={setF("accName")} placeholder="As per bank records" style={{fontSize:13}}/>
        </div>
        {[{l:"New Account Number *",k:"accNo",ph:"Enter account number",t:"password"},{l:"Confirm Account No *",k:"confirmAccNo",ph:"Re-enter account number",t:"password"},{l:"IFSC Code *",k:"ifsc",ph:"e.g. HDFC0001234"},{l:"Bank Name *",k:"bankName",ph:"e.g. HDFC Bank"},{l:"Branch Name",k:"branchName",ph:"e.g. Hyderabad Central"}].map(f => (
          <div key={f.k}>
            <label style={{fontSize:11,color:T.ink2,fontWeight:700,display:"block",marginBottom:5}}>{f.l}</label>
            <input className="input" value={form[f.k]} onChange={setF(f.k)} placeholder={f.ph} type={f.t||"text"} style={{fontSize:13,borderColor:f.k==="confirmAccNo"&&mismatch?T.red:undefined}}/>
            {f.k==="confirmAccNo"&&mismatch && <div style={{fontSize:10,color:T.red,marginTop:3}}>⚠ Account numbers do not match</div>}
          </div>
        ))}
      </div>
      <div style={{marginBottom:12}}>
        <label style={{fontSize:11,color:T.ink2,fontWeight:700,display:"block",marginBottom:5}}>Account Type</label>
        <div style={{display:"flex",gap:8}}>
          {["Savings","Current","OD/CC"].map(t => <button key={t} onClick={()=>setForm(p=>({...p,accType:t}))} style={{padding:"7px 16px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:12,border:"1.5px solid "+(form.accType===t?T.sky:T.border),background:form.accType===t?T.skyL:T.surf,color:form.accType===t?T.sky:T.ink2,transition:"all .15s"}}>{t}</button>)}
        </div>
      </div>
      <div style={{marginBottom:12}}>
        <label style={{fontSize:11,color:T.ink2,fontWeight:700,display:"block",marginBottom:5}}>Reason for Update *</label>
        <textarea className="input" value={form.reason} onChange={setF("reason")} placeholder="e.g. Account closed, bank merger…" rows={2} style={{resize:"none",fontSize:13}}/>
      </div>
      <div style={{marginBottom:16}}>
        <label style={{fontSize:11,color:T.ink2,fontWeight:700,display:"block",marginBottom:5}}>Upload Cancelled Cheque / Bank Form *</label>
        <label style={{display:"flex",alignItems:"center",gap:10,border:"2px dashed "+(form.fileName?T.green:T.border),borderRadius:10,padding:"14px 16px",cursor:"pointer",background:form.fileName?T.greenL:T.bg,transition:"all .2s"}}>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(f)setForm(p=>({...p,fileName:f.name}));}}/>
          <div style={{background:form.fileName?T.green+"20":T.surf,borderRadius:8,padding:9,display:"flex"}}><Ic n="download" size={18} col={form.fileName?T.green:T.sky} style={{transform:"rotate(180deg)"}}/></div>
          <div>{form.fileName?<><div style={{fontWeight:700,fontSize:13,color:T.green}}>{form.fileName}</div><div style={{fontSize:11,color:T.muted,marginTop:2}}>Click to change</div></>:<><div style={{fontWeight:700,fontSize:13,color:T.sky}}>Click to upload</div><div style={{fontSize:11,color:T.muted,marginTop:2}}>PDF, JPG, PNG · Max 5MB</div></>}</div>
          {form.fileName && <Ic n="tick" size={18} col={T.green} style={{marginLeft:"auto"}}/>}
        </label>
      </div>
      <div style={{display:"flex",gap:10}}>
        <button className="btn btn-sky" style={{opacity:canSubmit?1:.5,cursor:canSubmit?"pointer":"not-allowed"}} onClick={()=>{if(canSubmit)setSubmitted(true);}}><Ic n="send" size={14} col="#fff"/>Submit Request</button>
        <button className="btn btn-out" onClick={()=>setOpen(false)}>Cancel</button>
      </div>
      {!canSubmit && <div style={{fontSize:11,color:T.muted,marginTop:8}}>* Fill all required fields and upload proof to submit</div>}
    </div>
  );
}

/* ── TICKET MODAL ── */
function TicketModal({ rec, siteId, landlord, onClose }) {
  const [form, setForm] = useState({ type:rec?.rs!=="Paid"?"Rent":"GST", remark:"", month:rec?.month||"" });
  const [done, setDone] = useState(false);
  if(done) return (
    <div style={{position:"fixed",inset:0,background:"rgba(15,23,42,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,backdropFilter:"blur(5px)"}}>
      <div className="card scaleIn" style={{width:320,textAlign:"center",padding:40}}>
        <div style={{background:T.greenL,borderRadius:"50%",width:68,height:68,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",animation:"popIn .5s cubic-bezier(.34,1.56,.64,1)"}}><Ic n="tick" size={32} col={T.green} sw={2.5}/></div>
        <div style={{fontSize:20,fontWeight:800,marginBottom:6}}>Ticket Raised!</div>
        <div style={{fontSize:13,color:T.ink2,marginBottom:24}}>SLA: 24 Hours · Auto-escalation on breach</div>
        <button className="btn btn-sky btn-full" onClick={onClose}><Ic n="tick" size={15} col="#fff"/>Done</button>
      </div>
    </div>
  );
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(15,23,42,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,backdropFilter:"blur(5px)",animation:"fadeIn .2s ease"}}>
      <div className="card scaleIn" style={{width:400,maxHeight:"90vh",overflowY:"auto",padding:22}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{background:T.redL,borderRadius:9,padding:8,display:"flex"}}><Ic n="ticket" size={19} col={T.red}/></div><span style={{fontSize:16,fontWeight:800}}>Raise Complaint</span></div>
          <button className="btn btn-out btn-sm" onClick={onClose}><Ic n="xmark" size={14} col={T.muted}/></button>
        </div>
        {[{l:"Site ID",v:siteId,n:"tower"},{l:"Landlord",v:landlord,n:"user"},{l:"Month",v:form.month,n:"clock"}].map(f => (
          <div key={f.l} style={{marginBottom:11}}>
            <label style={{fontSize:12,color:T.ink2,fontWeight:600,display:"flex",alignItems:"center",gap:5,marginBottom:5}}><Ic n={f.n} size={12} col={T.muted}/>{f.l}</label>
            <div style={{background:T.bg,border:"1px solid "+T.border,borderRadius:8,padding:"9px 12px",fontSize:13,fontWeight:600}}>{f.v}</div>
          </div>
        ))}
        <div style={{marginBottom:11}}>
          <label style={{fontSize:12,color:T.ink2,fontWeight:600,display:"flex",alignItems:"center",gap:5,marginBottom:7}}><Ic n="doc" size={12} col={T.muted}/>Issue Type</label>
          <div style={{display:"flex",gap:8}}>
            {["Rent","GST","Hold"].map(t => <button key={t} onClick={()=>setForm(f=>({...f,type:t}))} style={{flex:1,padding:"8px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13,border:"1.5px solid "+(form.type===t?T.sky:T.border),background:form.type===t?T.skyL:T.surf,color:form.type===t?T.sky:T.ink2,transition:"all .15s"}}>{t}</button>)}
          </div>
        </div>
        <div style={{marginBottom:12}}>
          <label style={{fontSize:12,color:T.ink2,fontWeight:700,display:"flex",alignItems:"center",gap:5,marginBottom:5}}><Ic n="alert" size={12} col={T.red}/>Hold Remark <span style={{color:T.red}}>*</span></label>
          <textarea className="input" value={form.remark} onChange={e=>setForm(f=>({...f,remark:e.target.value}))} placeholder="Enter mandatory remark…" rows={3} style={{resize:"none",borderColor:!form.remark?T.red:T.border}}/>
          {!form.remark && <div style={{fontSize:11,color:T.red,marginTop:3}}>⚠ Remark is mandatory</div>}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,background:T.bg,borderRadius:9,padding:"9px 12px",marginBottom:14}}>
          <Ic n="camera" size={14} col={T.muted}/><span style={{fontSize:12,color:T.ink2}}>Photo optional</span>
          <span style={{marginLeft:"auto",fontSize:12,color:T.muted,display:"flex",alignItems:"center",gap:4}}><Ic n="pin" size={11} col={T.muted}/>GPS auto-captured</span>
        </div>
        <button className="btn btn-sky btn-full" style={{background:!form.remark?T.muted:T.red,cursor:!form.remark?"not-allowed":"pointer"}} onClick={()=>{if(form.remark)setDone(true);}}><Ic n="send" size={14} col="#fff"/>Submit Ticket</button>
      </div>
    </div>
  );
}

/* ── NOTIF PANEL ── */
function NotifPanel({ onClose }) {
  const items = [
    {i:"dollar",t:"Rent released – APHYD2345",  c:T.green, bg:T.greenL },
    {i:"fuel",  t:"DG Fuel critical – KABLR0987",c:T.red,   bg:T.redL  },
    {i:"ticket",t:"TKT-001 SLA breached",        c:T.yellow,bg:T.yellowL},
  ];
  return (
    <div style={{position:"fixed",top:66,right:14,width:290,zIndex:300}}>
      {items.map((n,i) => (
        <div key={i} onClick={onClose} style={{background:T.surf,border:"1px solid "+T.border,borderLeft:"3px solid "+n.c,borderRadius:11,padding:"10px 13px",marginBottom:7,display:"flex",alignItems:"center",gap:10,cursor:"pointer",animation:"slideNotif .3s ease "+(i*60)+"ms both",boxShadow:T.shM}}>
          <div style={{background:n.bg,borderRadius:8,padding:7,display:"flex",flexShrink:0}}><Ic n={n.i} size={14} col={n.c}/></div>
          <span style={{fontSize:12,fontWeight:600}}>{n.t}</span>
        </div>
      ))}
      <button className="btn btn-out btn-sm btn-full" onClick={onClose}><Ic n="xmark" size={12} col={T.muted}/>Dismiss All</button>
    </div>
  );
}

/* ── MAIN APP ── */
export default function App() {
  const [user, setUser]         = useState(null);
  const [loginErr, setLoginErr] = useState("");
  const [email, setEmail]       = useState("");
  const [pw, setPw]             = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [mod, setMod]           = useState("estate");
  const [search, setSearch]     = useState("");
  const [selPay, setSelPay]     = useState(null);
  const [selSite, setSelSite]   = useState(null);
  const [tRec, setTRec]         = useState(null);
  const [notif, setNotif]       = useState(false);
  const [checkedIn, setCheckedIn] = useState({});
  const [omTab, setOmTab]       = useState("basic");

  useEffect(() => { const t=setTimeout(()=>setNotif(true),2500); return()=>clearTimeout(t); }, []);

  const doLogin = () => {
    setLoggingIn(true);
    setTimeout(() => {
      const u = USERS.find(u=>u.email===email.toLowerCase()&&u.pw===pw);
      if(u) { setUser(u); setLoginErr(""); }
      else setLoginErr("Invalid credentials. Try: field@telecom.com / field123");
      setLoggingIn(false);
    }, 800);
  };

  const filtered = SITES.filter(s => [s.id,s.landlord,s.phone,s.circle,s.cluster,s.name].some(v=>v.toLowerCase().includes(search.toLowerCase())));
  const role = user?.role || "";
  const rm = ROLE_META[role] || ROLE_META["Field Executive"];

  /* LOGIN */
  if(!user) return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0F172A 0%,#1E3A5F 50%,#0D9488 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <style dangerouslySetInnerHTML={{__html:CSS}}/>
      <div style={{width:420}} className="fadeUp">
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{width:80,height:80,background:"rgba(14,165,233,.2)",borderRadius:24,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",border:"2px solid rgba(14,165,233,.4)",animation:"bounce 2.5s infinite"}}>
            <Ic n="signal" size={38} col="#38BDF8" sw={2}/>
          </div>
          <div style={{fontSize:32,fontWeight:900,color:"#fff",letterSpacing:-1}}>Telecom MCP</div>
          <div style={{fontSize:14,color:"rgba(255,255,255,.6)",marginTop:4}}>Estate & O&M Field Management Platform</div>
          <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:10,flexWrap:"wrap"}}>
            {["Field Executive","Estate Manager","O&M Engineer","Finance","Circle Head","Admin"].map(r => <span key={r} style={{background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)",borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:600}}>{r}</span>)}
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,.95)",backdropFilter:"blur(20px)",borderRadius:20,padding:32,boxShadow:"0 20px 60px rgba(0,0,0,.4)"}}>
          <div style={{fontSize:20,fontWeight:800,marginBottom:6}}>Welcome Back</div>
          <div style={{fontSize:13,color:T.ink2,marginBottom:24}}>Sign in to your account to continue</div>
          {loginErr && <div style={{background:T.redL,border:"1px solid "+T.red+"30",borderRadius:9,padding:"10px 13px",marginBottom:16,display:"flex",alignItems:"center",gap:8,animation:"fadeIn .3s ease"}}><Ic n="alert" size={15} col={T.red}/><span style={{fontSize:12,color:T.red,fontWeight:600}}>{loginErr}</span></div>}
          <div style={{marginBottom:14}}>
            <label style={{fontSize:12,color:T.ink2,fontWeight:700,display:"flex",alignItems:"center",gap:5,marginBottom:6}}><Ic n="mail" size={13} col={T.muted}/>Email Address</label>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@telecom.com" style={{fontSize:14}} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
          </div>
          <div style={{marginBottom:20}}>
            <label style={{fontSize:12,color:T.ink2,fontWeight:700,display:"flex",alignItems:"center",gap:5,marginBottom:6}}><Ic n="lock" size={13} col={T.muted}/>Password</label>
            <div style={{position:"relative"}}>
              <input className="input" type={showPw?"text":"password"} value={pw} onChange={e=>setPw(e.target.value)} placeholder="Enter password" style={{fontSize:14,paddingRight:42}} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
              <button onClick={()=>setShowPw(v=>!v)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",display:"flex",padding:0}}><Ic n="eye" size={16} col={T.muted}/></button>
            </div>
          </div>
          <button className="btn btn-sky btn-full" onClick={doLogin} style={{height:46,fontSize:15,borderRadius:11,background:"linear-gradient(135deg,"+T.sky+","+T.teal+")",justifyContent:"center"}}>
            {loggingIn ? <><div style={{width:16,height:16,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .7s linear infinite"}}/> Signing In…</> : <><Ic n="chR" size={16} col="#fff"/>Sign In</>}
          </button>
          <div style={{marginTop:16,fontSize:12,color:T.muted,textAlign:"center"}}>Demo: <strong>om@telecom.com</strong> / <strong>om123</strong></div>
        </div>
      </div>
    </div>
  );

  const pays   = selPay ? (PAY[selPay.id]||[]) : [];
  const estData= selPay ? ESTATE_DATA[selPay.id] : null;
  const infra  = selSite ? INFRA[selSite.id] : null;

  return (
    <div style={{minHeight:"100vh",background:T.bg,display:"flex",flexDirection:"column"}}>
      <style dangerouslySetInnerHTML={{__html:CSS}}/>
      {/* NAV */}
      <div style={{background:T.surf,borderBottom:"1px solid "+T.border,padding:"0 20px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:200,boxShadow:"0 1px 5px rgba(0,0,0,.06)"}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{background:T.skyL,borderRadius:9,padding:7,display:"flex"}}><Ic n="signal" size={19} col={T.sky} sw={2}/></div>
          <div><div style={{fontWeight:900,fontSize:15,letterSpacing:-.3}}>Telecom MCP</div><div style={{fontSize:9,color:T.muted}}>Field Management Platform</div></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <button className="btn btn-out btn-sm" style={{position:"relative",padding:"6px 9px"}} onClick={()=>setNotif(v=>!v)}>
            <Ic n="bell" size={16} col={notif?T.yellow:T.ink2}/>
            <span style={{position:"absolute",top:3,right:3,width:7,height:7,background:T.red,borderRadius:"50%",border:"2px solid "+T.surf,animation:"blink 1.5s infinite"}}/>
          </button>
          <div style={{display:"flex",alignItems:"center",gap:6,background:rm.col+"0D",border:"1.5px solid "+rm.col+"28",borderRadius:9,padding:"5px 11px"}}><Ic n={rm.icon} size={14} col={rm.col}/><span style={{fontSize:12,fontWeight:700,color:rm.col}}>{role}</span></div>
          <button className="btn btn-out btn-sm" onClick={()=>{setUser(null);setEmail("");setPw("");}}><Ic n="logout" size={13} col={T.muted}/>Logout</button>
        </div>
      </div>
      {notif && <NotifPanel onClose={()=>setNotif(false)}/>}
      {/* TABS */}
      <div style={{background:T.surf,borderBottom:"1px solid "+T.border,padding:"0 20px",display:"flex",gap:2,overflowX:"auto"}}>
        {[{id:"estate",label:"Estate",icon:"home",col:T.sky},{id:"om",label:"O&M",icon:"wrench",col:T.orange},{id:"tickets",label:"Tickets",icon:"ticket",col:T.purple}].map(m => {
          const a = mod===m.id;
          return (
            <button key={m.id} onClick={()=>{setMod(m.id);setSelPay(null);setSelSite(null);setSearch("");}} style={{display:"flex",alignItems:"center",gap:6,padding:"13px 15px",background:"none",border:"none",cursor:"pointer",fontSize:13,fontWeight:700,flexShrink:0,color:a?m.col:T.ink2,borderBottom:"2.5px solid "+(a?m.col:"transparent"),transition:"all .15s"}}>
              <Ic n={m.icon} size={15} col={a?m.col:T.muted}/>{m.label}
            </button>
          );
        })}
      </div>
      {/* CONTENT */}
      <div style={{flex:1,padding:20,maxWidth:900,width:"100%",margin:"0 auto",boxSizing:"border-box"}}>

        {/* ESTATE LIST */}
        {mod==="estate"&&!selPay && (
          <div className="fadeUp">
            <div style={{marginBottom:18}}><h1 style={{fontSize:20,fontWeight:900,letterSpacing:-.4,marginBottom:3}}>Estate Dashboard</h1><p style={{fontSize:13,color:T.ink2}}>Rental & GST tracking{rm.roEstate&&" · "}{rm.roEstate&&<Tag t="View Only" c={T.muted}/>}</p></div>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:18}}>
              <StatCard label="Total Sites"  value={SITES.length}                       icon="tower"  c={T.sky}    delay={0}/>
              <StatCard label="Live Sites"   value={SITES.filter(s=>s.live).length}     icon="wifi"   c={T.green}  delay={60}/>
              <StatCard label="Pending Rent" value="₹77K"                               icon="dollar" c={T.yellow} delay={120}/>
              <StatCard label="Open Tickets" value={TICKETS.filter(t=>t.status!=="Resolved").length} icon="ticket" c={T.red} delay={180}/>
            </div>
            <SearchBar value={search} onChange={setSearch} placeholder="Search Site ID, landlord, phone, circle…"/>
            {filtered.map((s,i) => <SiteCard key={s.id} site={s} onClick={()=>setSelPay(s)} delay={i*50}/>)}
            {filtered.length===0 && <div style={{textAlign:"center",padding:40,color:T.muted}}><Ic n="search" size={32} col={T.border}/><div style={{marginTop:10,fontSize:14}}>No sites found</div></div>}
          </div>
        )}

        {/* ESTATE DETAIL */}
        {mod==="estate"&&selPay&&estData && (
          <div className="fadeUp">
            <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:16}}>
              <button className="btn btn-out btn-sm" onClick={()=>setSelPay(null)}><Ic n="chL" size={13} col={T.ink2}/>Back</button>
              <div><h1 style={{fontSize:18,fontWeight:900,margin:0}}>{selPay.id}</h1><div style={{fontSize:12,color:T.ink2}}>{selPay.name}</div></div>
              <Tag t={selPay.live?"● LIVE":"● OFF-AIR"} c={selPay.live?T.green:T.red} bg={selPay.live?T.greenL:T.redL}/>
              {rm.roEstate && <Tag t="👁 View Only" c={T.muted}/>}
            </div>
            <PayFlowWidget pays={pays} canRaise={rm.canRaise} onRaise={r=>setTRec(r)}/>
            {/* LANDLORDS */}
            <div className="card" style={{padding:20,marginTop:14}}>
              <SHdr icon="users" c={T.sky}>Landlord Details ({estData.landlords.length})</SHdr>
              {estData.landlords.map((l,i) => (
                <div key={i} style={{background:T.bg,border:"1px solid "+T.border,borderRadius:12,padding:"14px 16px",marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      <div style={{background:l.payee?T.skyL:T.border,border:"2px solid "+(l.payee?T.sky:T.border2),borderRadius:"50%",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center"}}><Ic n="user" size={18} col={l.payee?T.sky:T.muted}/></div>
                      <div><div style={{fontWeight:800,fontSize:14}}>{l.name}</div><div style={{display:"flex",gap:6,marginTop:3,flexWrap:"wrap"}}>{l.payee&&<Tag t="PRIMARY PAYEE" c={T.sky} bg={T.skyL}/>}<Tag t={l.share+"% Share"} c={T.purple} bg={T.purpleL}/></div></div>
                    </div>
                    <div style={{fontSize:22,fontWeight:900,color:T.green}}>₹{Math.round(estData.baseRent*l.share/100).toLocaleString()}</div>
                  </div>
                  <div className="divider"/>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10}}>
                    {[{l:"PAN Number",v:l.pan,i:"hash"},{l:"GSTIN",v:l.gst||"Not Registered",i:"doc"},{l:"Bank Account",v:l.bank,i:"card"},{l:"IFSC Code",v:l.ifsc,i:"building"}].map(f => (
                      <div key={f.l} style={{display:"flex",gap:8}}>
                        <div style={{background:T.surf,borderRadius:7,padding:6,display:"flex",height:"fit-content",flexShrink:0}}><Ic n={f.i} size={12} col={T.sky}/></div>
                        <div><div style={{fontSize:10,color:T.muted,fontWeight:700}}>{f.l}</div><div style={{fontSize:12,fontWeight:700,marginTop:1}}>{f.v}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* ESCALATION */}
            <div className="card" style={{padding:20,marginTop:14}}>
              <SHdr icon="trending" c={T.orange}>Escalation Details</SHdr>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:16}}>
                <div style={{background:T.orangeL,border:"1px solid "+T.orange+"25",borderRadius:10,padding:"12px 14px"}}><div style={{fontSize:10,color:T.muted,fontWeight:700}}>ESCALATION %</div><div style={{fontSize:28,fontWeight:900,color:T.orange}}>{estData.escalation.pct}%</div></div>
                <div style={{background:T.purpleL,border:"1px solid "+T.purple+"25",borderRadius:10,padding:"12px 14px"}}><div style={{fontSize:10,color:T.muted,fontWeight:700}}>TERMS</div><div style={{fontSize:28,fontWeight:900,color:T.purple}}>{estData.escalation.terms} Yrs</div></div>
                <div style={{background:T.tealL,border:"1px solid "+T.teal+"25",borderRadius:10,padding:"12px 14px"}}><div style={{fontSize:10,color:T.muted,fontWeight:700}}>NEXT DATE</div><div style={{fontSize:14,fontWeight:800,color:T.teal,marginTop:4}}>{estData.escalation.nextEsc}</div></div>
              </div>
              <div style={{display:"flex",gap:6,alignItems:"flex-end",overflow:"auto",paddingBottom:4}}>
                {estData.escalation.history.map((h,i) => {
                  const maxR = Math.max(...estData.escalation.history.map(x=>x.rent));
                  const pct = Math.round((h.rent/maxR)*80)+10;
                  const isLast = i===estData.escalation.history.length-1;
                  return (
                    <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,flex:1,minWidth:48}}>
                      <div style={{fontSize:10,fontWeight:700,color:isLast?T.green:T.muted}}>₹{(h.rent/1000).toFixed(0)}K</div>
                      <div style={{width:"80%",background:isLast?T.green:T.sky,borderRadius:"4px 4px 0 0",height:pct,transition:"height 1s ease",boxShadow:isLast?"0 -4px 12px "+T.green+"40":"none"}}/>
                      <div style={{fontSize:9,color:T.muted,textAlign:"center",lineHeight:1.2}}>{h.yr}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* SHARING OPS */}
            {estData.sharingOps.length>0 && (
              <div className="card" style={{padding:20,marginTop:14}}>
                <SHdr icon="share" c={T.purple}>Sharing Operators ({estData.sharingOps.length})</SHdr>
                {estData.sharingOps.map((op,i) => (
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 13px",background:T.bg,border:"1px solid "+T.border,borderRadius:10,marginBottom:8,flexWrap:"wrap",gap:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:22}}>{op.logo}</span><div><div style={{fontWeight:800,fontSize:14}}>{op.op}</div><div style={{fontSize:11,color:T.ink2,marginTop:2}}>Tenure: {op.tenure} yrs · {op.remaining} yr{op.remaining>1?"s":""} remaining</div></div></div>
                    <div style={{textAlign:"right"}}><div style={{fontSize:20,fontWeight:900,color:T.purple}}>₹{op.rent.toLocaleString()}</div><div style={{fontSize:10,color:T.muted}}>Sharing Rent / Month</div></div>
                  </div>
                ))}
                <div style={{background:T.purpleL,border:"1px solid "+T.purple+"25",borderRadius:10,padding:"11px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontWeight:700,color:T.purple}}>Total Sharing Income</span>
                  <span style={{fontSize:18,fontWeight:900,color:T.purple}}>₹{estData.sharingOps.reduce((a,o)=>a+o.rent,0).toLocaleString()}/mo</span>
                </div>
              </div>
            )}
            {/* DOCS */}
            <div className="card" style={{padding:20,marginTop:14}}>
              <SHdr icon="doc" c={T.teal}>Documents & Agreements</SHdr>
              {estData.docs.map((d,i) => (
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 13px",background:T.bg,border:"1px solid "+T.border,borderRadius:10,marginBottom:7}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{background:T.tealL,borderRadius:8,padding:7,display:"flex"}}><Ic n="file" size={16} col={T.teal}/></div><div><div style={{fontWeight:700,fontSize:13}}>{d.name}</div><div style={{fontSize:11,color:T.muted}}>PDF · {d.size} · {d.date}</div></div></div>
                  <button className="btn btn-sm" style={{background:T.teal+"20",color:T.teal,border:"1.5px solid "+T.teal+"40"}}><Ic n="download" size={13} col={T.teal}/>Download</button>
                </div>
              ))}
            </div>
            {/* HOLD REMARK */}
            {estData.holdReason && (
              <div style={{background:T.redL,border:"1.5px solid "+T.red+"30",borderLeft:"4px solid "+T.red,borderRadius:12,padding:16,marginTop:14}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><Ic n="lock" size={16} col={T.red}/><span style={{fontWeight:800,color:T.red,fontSize:14}}>Rental Hold Active</span></div>
                <div style={{fontSize:13,color:T.ink2,marginBottom:6}}><strong>Reason:</strong> {estData.holdReason}</div>
                <div style={{fontSize:12,color:T.muted}}>Held by: {estData.holdBy} · {estData.holdDate}</div>
              </div>
            )}
            {/* BANK CHANGE */}
            <div className="card" style={{padding:20,marginTop:14}}>
              <SHdr icon="card" c={T.sky}>Bank Details Change Request</SHdr>
              {estData.bankChangeReq ? (
                <div style={{background:T.yellowL,border:"1px solid "+T.yellow+"30",borderRadius:10,padding:"12px 14px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                    <div><div style={{fontWeight:700,fontSize:13,marginBottom:4}}>Pending from {estData.bankChangeReq.requestedBy}</div><div style={{fontSize:12,color:T.ink2}}>New: <strong>{estData.bankChangeReq.newBank}</strong> · {estData.bankChangeReq.date}</div></div>
                    <div style={{display:"flex",gap:8}}>
                      <button className="btn btn-sm" style={{background:T.green,color:"#fff",border:"none"}}><Ic n="tick" size={12} col="#fff"/>Approve</button>
                      <button className="btn btn-sm btn-out" style={{color:T.red,border:"1.5px solid "+T.red+"40"}}><Ic n="xmark" size={12} col={T.red}/>Reject</button>
                    </div>
                  </div>
                </div>
              ) : <BankUpdateForm landlords={estData.landlords}/>}
            </div>
            {/* PAYMENT HISTORY */}
            <PayHistory pays={pays} canRaise={rm.canRaise} onRaise={r=>setTRec(r)}/>
          </div>
        )}

        {/* O&M LIST */}
        {mod==="om"&&!selSite && (
          <div className="fadeUp">
            <div style={{marginBottom:18}}><h1 style={{fontSize:20,fontWeight:900,letterSpacing:-.4,marginBottom:3}}>O&M Dashboard</h1><p style={{fontSize:13,color:T.ink2}}>Infrastructure monitoring & field operations</p></div>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:18}}>
              <StatCard label="Total Sites"   value={SITES.length}                       icon="tower"    c={T.orange} delay={0}/>
              <StatCard label="Live Sites"    value={SITES.filter(s=>s.live).length}     icon="wave"     c={T.green}  delay={60}/>
              <StatCard label="Active Alarms" value={Object.values(INFRA).reduce((a,b)=>a+b.alarms.length,0)} icon="warn" c={T.red} delay={120}/>
              <StatCard label="DG Critical"   value="1"                                  icon="fuel"     c={T.yellow} delay={180}/>
            </div>
            <SearchBar value={search} onChange={setSearch} placeholder="Search by Site ID…"/>
            {filtered.map((s,i) => <SiteCard key={s.id} site={s} col={T.orange} onClick={()=>{setSelSite(s);setSearch("");setOmTab("basic");}} delay={i*50}/>)}
          </div>
        )}

        {/* O&M DETAIL */}
        {mod==="om"&&selSite&&infra && (
          <div className="fadeUp">
            <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:14}}>
              <button className="btn btn-out btn-sm" onClick={()=>setSelSite(null)}><Ic n="chL" size={13} col={T.ink2}/>Back</button>
              <div><h1 style={{fontSize:18,fontWeight:900,margin:0}}>{selSite.id}</h1><div style={{fontSize:12,color:T.ink2}}>{selSite.name}</div></div>
              <Tag t={selSite.live?"● LIVE":"● OFF-AIR"} c={selSite.live?T.green:T.red} bg={selSite.live?T.greenL:T.redL}/>
            </div>
            {/* GPS */}
            <div style={{background:checkedIn[selSite.id]?T.greenL:T.skyL,border:"1.5px solid "+(checkedIn[selSite.id]?T.green+"45":T.sky+"45"),borderRadius:13,padding:"13px 16px",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:11}}>
                <div style={{background:T.surf,borderRadius:10,padding:8,display:"flex",boxShadow:T.sh}}><Ic n="pin" size={19} col={checkedIn[selSite.id]?T.green:T.sky}/></div>
                <div>
                  <div style={{fontWeight:800,fontSize:13}}>GPS Check-in</div>
                  <div style={{fontSize:11,color:T.ink2}}>Lat {selSite.lat} · Lng {selSite.lng}</div>
                  {checkedIn[selSite.id] && <div style={{fontSize:10,color:T.green,marginTop:2,fontWeight:700,display:"flex",alignItems:"center",gap:4}}><Ic n="tick" size={10} col={T.green} sw={2.5}/>Checked in at {new Date().toLocaleTimeString()}</div>}
                </div>
              </div>
              <div style={{display:"flex",gap:8}}>
                {!checkedIn[selSite.id] ? <button className="btn btn-sky btn-sm" onClick={()=>setCheckedIn(c=>({...c,[selSite.id]:true}))}><Ic n="pin" size={13} col="#fff"/>Check In</button> : <Tag t="✓ CHECKED IN" c={T.green} bg={T.greenL}/>}
              </div>
            </div>
            {/* Sub-tabs */}
            <div style={{display:"flex",gap:6,marginBottom:16}}>
              {[{id:"basic",l:"Basic Info",n:"info"},{id:"infra",l:"Infra Status",n:"cpu"},{id:"alarms",l:"Alarms"+(infra.alarms.length?" ("+infra.alarms.length+")":""),n:"warn"}].map(t => {
                const a = omTab===t.id;
                const alarm = t.id==="alarms"&&infra.alarms.length>0;
                return (
                  <button key={t.id} onClick={()=>setOmTab(t.id)} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",cursor:"pointer",background:a?(alarm?T.redL:T.skyL):T.surf,border:"1.5px solid "+(a?(alarm?T.red:T.sky):T.border),borderRadius:9,fontWeight:700,fontSize:12,color:a?(alarm?T.red:T.sky):T.ink2,transition:"all .15s"}}>
                    <Ic n={t.n} size={13} col={a?(alarm?T.red:T.sky):T.muted}/>{t.l}
                  </button>
                );
              })}
            </div>
            {omTab==="basic" && (
              <div className="card" style={{padding:18}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  {[{l:"Site Name",v:selSite.name,n:"tower"},{l:"Circle/Cluster",v:selSite.circle+"/"+selSite.cluster,n:"pin"},{l:"Tenancies",v:selSite.tenancies,n:"layers"},{l:"Operators",v:selSite.ops.join(", "),n:"signal"},{l:"Latitude",v:selSite.lat,n:"globe"},{l:"Longitude",v:selSite.lng,n:"globe"},{l:"Landlord",v:selSite.landlord,n:"user"},{l:"Phone",v:selSite.phone,n:"phone"}].map(f => (
                    <div key={f.l} style={{display:"flex",gap:9}}>
                      <div style={{background:T.bg,borderRadius:7,padding:7,display:"flex",height:"fit-content"}}><Ic n={f.n} size={13} col={T.ink2}/></div>
                      <div><div style={{fontSize:10,color:T.muted,fontWeight:700}}>{f.l}</div><div style={{fontSize:13,fontWeight:700,marginTop:2}}>{f.v}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {omTab==="infra" && (
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div className="card" style={{padding:18}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:13}}><Ic n="zap" size={15} col={T.yellow}/><span style={{fontWeight:800,fontSize:14}}>Power Overview</span></div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:9}}>
                    {[{l:"Power Type",v:infra.power,n:"zap",c:T.yellow},{l:"Grid",v:infra.grid,n:"grid4",c:infra.grid==="Available"?T.green:T.red},{l:"Solar",v:infra.solar,n:"sun",c:infra.solar==="Active"?T.orange:T.muted},{l:"EB Reading",v:infra.eb,n:"wave",c:T.sky}].map(f => (
                      <div key={f.l} style={{background:T.bg,border:"1px solid "+T.border,borderRadius:9,padding:"10px 11px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:5}}><Ic n={f.n} size={12} col={f.c}/><span style={{fontSize:10,color:T.muted,fontWeight:600}}>{f.l}</span></div>
                        <div style={{fontSize:12,fontWeight:800,color:f.c}}>{f.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <FuelWidget infra={infra}/>
                <BatteryWidget infra={infra}/>
                <RectWidget infra={infra}/>
              </div>
            )}
            {omTab==="alarms" && (
              <div className="card" style={{padding:18}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:14}}><Ic n="warn" size={15} col={infra.alarms.length?T.red:T.green}/><span style={{fontWeight:800,fontSize:14}}>Active Alarms</span>{infra.alarms.length>0&&<Tag t={infra.alarms.length+" active"} c={T.red} bg={T.redL}/>}</div>
                {infra.alarms.length===0 ? (
                  <div style={{textAlign:"center",padding:"28px 16px"}}>
                    <div style={{background:T.greenL,borderRadius:"50%",width:52,height:52,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",animation:"popIn .5s cubic-bezier(.34,1.56,.64,1)"}}><Ic n="tick" size={26} col={T.green} sw={2.5}/></div>
                    <div style={{fontWeight:800}}>All Clear</div><div style={{fontSize:12,color:T.ink2,marginTop:3}}>No active alarms</div>
                  </div>
                ) : infra.alarms.map((alarm,i) => (
                  <div key={i} style={{display:"flex",alignItems:"center",gap:11,background:T.redL,border:"1px solid "+T.red+"25",borderLeft:"3px solid "+T.red,borderRadius:9,padding:"11px 13px",marginBottom:7}}>
                    <div style={{background:T.surf,borderRadius:7,padding:6,display:"flex",flexShrink:0}}><Ic n="flame" size={15} col={T.red}/></div>
                    <div><div style={{fontWeight:800,fontSize:13,color:T.red}}>{alarm}</div><div style={{fontSize:10,color:T.red+"99",marginTop:1}}>Auto alert sent · {new Date().toLocaleDateString()}</div></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TICKETS */}
        {mod==="tickets" && (
          <div className="fadeUp">
            <div style={{marginBottom:18}}><h1 style={{fontSize:20,fontWeight:900,letterSpacing:-.4,marginBottom:3}}>Complaint Tickets</h1><p style={{fontSize:13,color:T.ink2}}>SLA: 24 Hours · Auto-escalation on breach</p></div>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:18}}>
              <StatCard label="Open"         value={TICKETS.filter(t=>t.status==="Open").length}        icon="xmark" c={T.red}    delay={0}/>
              <StatCard label="In Progress"  value={TICKETS.filter(t=>t.status==="In Progress").length} icon="wave"  c={T.sky}    delay={60}/>
              <StatCard label="Resolved"     value={TICKETS.filter(t=>t.status==="Resolved").length}    icon="tick"  c={T.green}  delay={120}/>
              <StatCard label="SLA Breached" value={TICKETS.filter(t=>t.sla==="Breached").length}       icon="warn"  c={T.orange} delay={180}/>
            </div>
            {TICKETS.map((t,i) => (
              <div key={t.id} className="card card-h fadeUp" style={{padding:16,marginBottom:10,animationDelay:(i*60)+"ms"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{display:"flex",gap:12}}>
                    <div style={{background:t.status==="Resolved"?T.greenL:t.status==="Open"?T.redL:T.skyL,borderRadius:10,padding:9,display:"flex",height:"fit-content"}}><Ic n="ticket" size={20} col={t.status==="Resolved"?T.green:t.status==="Open"?T.red:T.sky}/></div>
                    <div>
                      <div style={{fontWeight:800,fontSize:15}}>{t.id}</div>
                      <div style={{fontSize:12,color:T.ink2,marginTop:3,display:"flex",alignItems:"center",gap:8}}><Ic n="tower" size={11} col={T.muted}/>{t.siteId}<span style={{color:T.border}}>·</span><Ic n="user" size={11} col={T.muted}/>{t.landlord}</div>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginTop:5,fontSize:11,color:T.muted}}><Ic n="clock" size={11} col={T.muted}/>{t.month} · Raised {t.raised}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end"}}>
                    <SPill s={t.status}/>
                    <Tag t={t.sla==="Breached"?"⚠ SLA Breached":"Within SLA"} c={t.sla==="Breached"?T.red:T.green} bg={t.sla==="Breached"?T.redL:T.greenL}/>
                    <Tag t={t.type} c={T.purple} bg={T.purpleL}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {tRec && selPay && <TicketModal rec={tRec} siteId={selPay.id} landlord={selPay.landlord} onClose={()=>setTRec(null)}/>}
    </div>
  );
}
