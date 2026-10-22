const DEFAULT_ROSTER = [
 {rank:"DIRECTOR",name:"♛ 𝐂𝐈𝐀 〢 𝐀𝐋𝐏𝐇𝐀 ♛",icon:"♛",lead:true},
 {rank:"DEPUTY DIRECTOR",name:"𝐂𝐢𝐚 │ 𝙻𝙷𝙱𝙸𝙻",icon:"♜"},
 {rank:"CHIEF OF OPERATIONS",name:"𝐂𝐢𝐚 │ IRON",icon:"⚙"},
 {rank:"CHIEF OF STAFF",name:"VACANT",icon:"✦"},
 {rank:"SENIOR AGENT",name:"𝐂𝐢𝐚 │ 𝑽𝑰𝑷𝑬𝑹",icon:"◆"},
 {rank:"SPECIAL AGENT",name:"VACANT",icon:"◎"},
 {rank:"AGENT",name:"𝐂𝐢𝐚 │ ILYAS",icon:"◈"},
 {rank:"AGENT",name:"𝐂𝐢𝐚 │ kafta",icon:"◈"},
 {rank:"AGENT",name:"𝐂𝐢𝐚 │ 𝑮𝑬𝑳𝑩𝑬𝑹𝑻",icon:"◈"},
 {rank:"AGENT",name:"𝐂𝐢𝐚 │ 𝐀𝐧𝐰𝐚𝐫",icon:"◈"},
 {rank:"AGENT",name:"𝐂𝐢𝐚 │ FARIS",icon:"◈"},
 {rank:"MEDIC",name:"VACANT",icon:"✚"}
];
const $ = s => document.querySelector(s);
let roster = loadRoster();
function loadRoster(){try{return JSON.parse(localStorage.getItem("cia_morocco_roster"))||DEFAULT_ROSTER.map(x=>({...x}))}catch{return DEFAULT_ROSTER.map(x=>({...x}))}}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function render(){
 const q=$("#search").value.trim().toLowerCase();
 const filtered=roster.filter(x=>(x.name+" "+x.rank).toLowerCase().includes(q));
 $("#rosterGrid").innerHTML=filtered.map((x,i)=>`<article class="rank-card ${x.lead?"lead":""}"><div class="card-top"><span class="rank-number">FILE / ${String(roster.indexOf(x)+1).padStart(2,"0")}</span><span class="rank-icon">${esc(x.icon||"◈")}</span></div><div class="rank-label">${esc(x.rank)}</div><div class="member-name ${x.name==="VACANT"?"empty":""}">${esc(x.name)}</div></article>`).join("")||'<p style="color:#92929e">No matching personnel files.</p>';
 $("#memberCount").textContent=roster.filter(x=>x.name!=="VACANT").length;
 $("#rankCount").textContent=new Set(roster.map(x=>x.rank)).size;
 $("#structureList").innerHTML=roster.filter((x,i,a)=>a.findIndex(y=>y.rank===x.rank)===i).map((x,i)=>`<div class="structure-item"><span class="num">${String(i+1).padStart(2,"0")}</span><div><strong>${esc(x.rank)}</strong><small>${roster.filter(y=>y.rank===x.rank&&y.name!=="VACANT").length} assigned · ${roster.filter(y=>y.rank===x.rank&&y.name==="VACANT").length?"position open":"assigned"}</small></div></div>`).join("");
 $("#rosterJson").value=JSON.stringify(roster,null,2);
}
$("#search").addEventListener("input",render);
$("#editToggle").addEventListener("click",()=>{$("#editor").classList.toggle("hidden");if(!$("#editor").classList.contains("hidden"))$("#rosterJson").value=JSON.stringify(roster,null,2)});
$("#saveRoster").addEventListener("click",()=>{try{const parsed=JSON.parse($("#rosterJson").value);if(!Array.isArray(parsed)||parsed.some(x=>!x.rank||!x.name))throw new Error("Roster must be a list of entries with rank and name.");roster=parsed;localStorage.setItem("cia_morocco_roster",JSON.stringify(roster));$("#editMessage").textContent="Roster saved in this browser.";render()}catch(e){$("#editMessage").textContent="Could not save: "+e.message}});
$("#resetRoster").addEventListener("click",()=>{roster=DEFAULT_ROSTER.map(x=>({...x}));localStorage.removeItem("cia_morocco_roster");render();$("#editMessage").textContent="Default roster restored."});
$("#year").textContent=new Date().getFullYear();render();