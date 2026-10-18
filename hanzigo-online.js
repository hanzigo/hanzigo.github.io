// HanziGo online presence: add <script type="module" src="./hanzigo-online.js"></script> to index.html before </body>.
import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getFirestore, doc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
const config={apiKey:'AIzaSyA0e_sTd0uZe-_XJzA1QM5UF26YyXqlj18',authDomain:'hanzigo-5793f.firebaseapp.com',projectId:'hanzigo-5793f',storageBucket:'hanzigo-5793f.firebasestorage.app',messagingSenderId:'4231248194',appId:'1:4231248194:web:802a3f3f2570a95d7e4ed'};
const app=getApps().find(a=>a.options.projectId===config.projectId)||initializeApp(config);
const auth=getAuth(app), db=getFirestore(app);
let current=null, heartbeat=null;
async function ping(){if(!current || document.visibilityState!=='visible')return;try{await setDoc(doc(db,'presence',current.uid),{displayName:current.displayName||'',email:current.email||'',lastSeen:serverTimestamp()},{merge:true});}catch(e){console.warn('HanziGo presence:',e.message);}}
onAuthStateChanged(auth,user=>{current=user;if(heartbeat)clearInterval(heartbeat);heartbeat=null;if(user){ping();heartbeat=setInterval(ping,20000);}});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')ping();});
window.addEventListener('focus',ping);
