import type {ArchivedMessage} from "../shared/types";
const stop=new Set("a o os as um uma uns umas de da do das dos e é em no na nos nas por para com que se eu você voce ele ela eles elas nós nos meu minha meus minhas seu sua seus suas foi era ser ter tem não nao sim mas mais muito bem aqui ali hoje ontem amanhã amanha the and for you are this that with from have has was were its your our about then just not".split(" "));
const valid=(m:ArchivedMessage)=>m.type!=="system"&&Number.isFinite(m.messageAt??m.capturedAt);
const date=(m:ArchivedMessage)=>new Date(m.messageAt??m.capturedAt);
function top(map:Map<string,number>,limit=15){return [...map].map(([label,count])=>({label,count})).sort((a,b)=>b.count-a.count||a.label.localeCompare(b.label)).slice(0,limit)}
export function advancedAnalytics(messages:ArchivedMessage[]){
 const rows=messages.filter(valid),heat=Array.from({length:7},()=>Array<number>(24).fill(0)),months=new Map<string,number>(),words=new Map<string,number>(),emojis=new Map<string,number>(),senders=new Map<string,number>(),links=new Map<string,number>(),days=new Set<string>();let media=0,linkCount=0;
 const emojiRegex=/\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*/gu;
 const urlRegex=/https?:\/\/[^\s<>]+/gi;
 for(const m of rows){const d=date(m),month=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`,day=`${month}-${String(d.getDate()).padStart(2,"0")}`;heat[d.getDay()][d.getHours()]++;months.set(month,(months.get(month)||0)+1);days.add(day);senders.set(m.sender,(senders.get(m.sender)||0)+1);
 for(const w of m.text.toLocaleLowerCase().match(/[\p{L}][\p{L}\p{M}]{2,}/gu)||[]){if(!stop.has(w))words.set(w,(words.get(w)||0)+1)}
 for(const e of m.text.match(emojiRegex)||[])emojis.set(e,(emojis.get(e)||0)+1);
 const urls=m.text.match(urlRegex)||[];linkCount+=urls.length;for(const u of urls){try{const host=new URL(u).hostname.toLowerCase();links.set(host,(links.get(host)||0)+1)}catch{/* ignore invalid URLs */}}
 if(/<mídia oculta>|<media omitted>|imagem ocultada|vídeo omitido|áudio ocultado|sticker omitted|figurinha omitida/i.test(m.text))media++;
 }
 const sorted=[...days].sort();let longestSilenceDays=0;for(let i=1;i<sorted.length;i++){const gap=Math.round((new Date(sorted[i]+"T12:00:00").getTime()-new Date(sorted[i-1]+"T12:00:00").getTime())/86400000)-1;longestSilenceDays=Math.max(longestSilenceDays,gap)}
 return{heat,months:[...months].sort(([a],[b])=>a.localeCompare(b)).map(([label,count])=>({label,count})),words:top(words),emojis:top(emojis),participants:top(senders,30),links:top(links,10),linkCount,media,activeDays:days.size,longestSilenceDays,total:rows.length};
}
