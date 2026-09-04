let currentUser=null,currentCategory='all',selectedMood='😊',calendarDate=new Date(),selectedCalDate=null;

document.addEventListener('DOMContentLoaded',()=>{
  currentUser=JSON.parse(localStorage.getItem('plantifi_user'));
  updateUI();renderCatalog();renderJournal();renderNotes();renderCalendar();renderCommunity();
  document.getElementById('journalDate').value=new Date().toISOString().split('T')[0];
});

function toggleAuth(){
  if(currentUser){if(confirm('Выйти из аккаунта?')){currentUser=null;localStorage.removeItem('plantifi_user');updateUI()}}
  else document.getElementById('authModal').classList.remove('hidden');
}
function showRegister(){document.getElementById('authLoginForm').classList.add('hidden');document.getElementById('authRegisterForm').classList.remove('hidden');document.getElementById('authTitle').textContent='Регистрация'}
function showLogin(){document.getElementById('authRegisterForm').classList.add('hidden');document.getElementById('authLoginForm').classList.remove('hidden');document.getElementById('authTitle').textContent='Вход'}
function register(){
  const u=document.getElementById('regUsername').value.trim(),p=document.getElementById('regPassword').value;
  if(!u||!p){alert('Заполните все поля');return}
  const users=JSON.parse(localStorage.getItem('plantifi_users')||'{}');
  if(users[u]){alert('Пользователь уже существует');return}
  users[u]={password:p,email:document.getElementById('regEmail').value,joined:new Date().toISOString()};
  localStorage.setItem('plantifi_users',JSON.stringify(users));
  currentUser={username:u};localStorage.setItem('plantifi_user',JSON.stringify(currentUser));
  closeModal('authModal');updateUI();
}
function login(){
  const u=document.getElementById('loginUsername').value.trim(),p=document.getElementById('loginPassword').value;
  const users=JSON.parse(localStorage.getItem('plantifi_users')||'{}');
  if(users[u]&&users[u].password===p){currentUser={username:u};localStorage.setItem('plantifi_user',JSON.stringify(currentUser));closeModal('authModal');updateUI()}
  else alert('Неверное имя пользователя или пароль');
}
function updateUI(){
  const g=document.getElementById('userGreeting'),b=document.getElementById('authBtn');
  if(currentUser){g.textContent='👤 '+currentUser.username;b.textContent='Выйти'}else{g.textContent='';b.textContent='Войти'}
  updateCalendarForm();
}
function showSection(name){
  document.querySelectorAll('.section').forEach(s=>s.classList.add('hidden'));
  document.getElementById(name+'Section').classList.remove('hidden');
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
  document.querySelector(`.nav-link[data-section="${name}"]`).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
function toggleMenu(){document.querySelector('.nav-links').classList.toggle('show')}
function closeModal(id){document.getElementById(id).classList.add('hidden')}
document.querySelectorAll('.modal').forEach(m=>{m.addEventListener('click',e=>{if(e.target===m)m.classList.add('hidden')})});

function renderCatalog(){
  document.getElementById('plantGrid').innerHTML=PLANTS.map(p=>`
    <div class="plant-card" onclick="openPlant(${p.id})">
      <div class="plant-card-img">${p.emoji}<span class="plant-card-category">${p.category}</span></div>
      <div class="plant-card-body">
        <h3>${p.name}</h3><p>${p.description}</p>
        <div class="plant-card-meta">
          <span class="plant-meta-item">🌱 ${p.season}</span>
          <span class="plant-meta-item">🎯 Сложность:</span>
          <div class="plant-difficulty">${Array(3).fill(0).map((_,i)=>`<div class="diff-dot ${i<p.difficulty?'filled':''}"></div>`).join('')}</div>
        </div>
      </div>
    </div>`).join('');
}
function filterPlants(){
  const q=document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.plant-card').forEach((c,i)=>{
    const p=PLANTS[i];
    c.style.display=((p.name.toLowerCase().includes(q)||p.description.toLowerCase().includes(q)||p.latin.toLowerCase().includes(q))&&(currentCategory==='all'||p.category===currentCategory))?'':'none';
  });
}
function filterByCategory(cat,btn){currentCategory=cat;document.querySelectorAll('.filter-tag').forEach(t=>t.classList.remove('active'));btn.classList.add('active');filterPlants()}

function openPlant(id){
  const p=PLANTS.find(x=>x.id===id);if(!p)return;
  document.getElementById('plantDetailContent').innerHTML=`
    <div class="plant-detail">
      <div class="plant-detail-header">
        <div class="plant-detail-emoji">${p.emoji}</div>
        <div class="plant-detail-info">
          <h1>${p.name}</h1><div class="latin">${p.latin}</div>
          <div class="plant-tags"><span class="plant-tag">${p.category}</span><span class="plant-tag">${p.season}</span><span class="plant-tag">Сложность: ${'●'.repeat(p.difficulty)}${'○'.repeat(3-p.difficulty)}</span></div>
          <p>${p.description}</p>
        </div>
      </div>
      <div class="info-grid">
        <div class="info-card"><div class="icon">💧</div><div class="label">Полив</div><div class="value">${p.care.watering.split('.')[0]}</div></div>
        <div class="info-card"><div class="icon">☀️</div><div class="label">Освещение</div><div class="value">${p.care.light.split('.')[0]}</div></div>
        <div class="info-card"><div class="icon">🌡️</div><div class="label">Температура</div><div class="value">${p.care.temperature.split('.')[0]}</div></div>
        <div class="info-card"><div class="icon">🌱</div><div class="label">Посадка</div><div class="value">${p.planting.split('.')[0]}</div></div>
      </div>
      <h3>🔍 Подробный уход</h3>
      <div class="detail-content">
        <div class="tip-box"><strong>💧 Полив:</strong> ${p.care.watering}</div>
        <div class="tip-box"><strong>☀️ Освещение:</strong> ${p.care.light}</div>
        <div class="tip-box"><strong>🌍 Почва:</strong> ${p.care.soil}</div>
        <div class="tip-box"><strong>🌡️ Температура:</strong> ${p.care.temperature}</div>
        <div class="tip-box"><strong>🧪 Удобрения:</strong> ${p.care.fertilizer}</div>
        <div class="tip-box warning"><strong>⚠️ Болезни:</strong> ${p.care.diseases}</div>
        <div class="tip-box"><strong>💡 Советы:</strong> ${p.care.tips}</div>
      </div>
      <h3>📅 Сроки</h3><div class="detail-content"><p><strong>Посадка:</strong> ${p.planting}</p><p><strong>Сбор:</strong> ${p.harvest}</p></div>
    </div>`;
  document.getElementById('plantModal').classList.remove('hidden');
}

function renderJournal(){
  updateJournalSelect();
  const entries=JSON.parse(localStorage.getItem(`plantifi_journal_${currentUser?.username||'guest'}`)||'[]');
  document.getElementById('journalEntries').innerHTML=entries.length===0
    ?'<p style="color:var(--text-muted);text-align:center;padding:2rem">Пока нет записей.</p>'
    :entries.slice().reverse().map(e=>`<div class="journal-entry"><div class="journal-entry-header"><span class="journal-entry-plant">${getPlantEmoji(e.plantId)} ${getPlantName(e.plantId)}</span><span class="journal-entry-mood">${e.mood}</span><span class="journal-entry-date">${fmtDate(e.date)}</span></div><div class="journal-entry-text">${esc(e.text)}</div>${e.photo?`<img src="${e.photo}" class="journal-entry-photo">`:''}<div class="journal-entry-actions"><button class="btn btn-sm btn-danger" onclick="deleteJournal('${e.id}')">Удалить</button></div></div>`).join('');
}
function addJournalEntry(){
  if(!currentUser){alert('Войдите в аккаунт');return}
  const plantId=document.getElementById('journalPlant').value,date=document.getElementById('journalDate').value,text=document.getElementById('journalText').value.trim();
  if(!plantId||!text){alert('Выберите растение и введите наблюдение');return}
  const photoInput=document.getElementById('journalPhoto');
  const save=(photo)=>{
    const entries=JSON.parse(localStorage.getItem(`plantifi_journal_${currentUser.username}`)||'[]');
    entries.push({id:String(Date.now()),plantId:+plantId,date,text,mood:selectedMood,photo:photo||null});
    localStorage.setItem(`plantifi_journal_${currentUser.username}`,JSON.stringify(entries));
    document.getElementById('journalText').value='';document.getElementById('photoPreview').classList.add('hidden');renderJournal();
  };
  if(photoInput.files&&photoInput.files[0]){const r=new FileReader();r.onload=e=>save(e.target.result);r.readAsDataURL(photoInput.files[0])}else save();
}
function deleteJournal(id){const k=`plantifi_journal_${currentUser?.username||'guest'}`;const e=JSON.parse(localStorage.getItem(k)||'[]');localStorage.setItem(k,JSON.stringify(e.filter(x=>x.id!==id)));renderJournal()}
function setMood(mood,btn){selectedMood=mood;document.querySelectorAll('.mood-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active')}
function previewPhoto(ev){const r=new FileReader();r.onload=e=>{const img=document.getElementById('photoPreview');img.src=e.target.result;img.classList.remove('hidden')};r.readAsDataURL(ev.target.files[0])}

function renderNotes(){
  const notes=JSON.parse(localStorage.getItem(`plantifi_notes_${currentUser?.username||'guest'}`)||'[]');
  document.getElementById('notesList').innerHTML=notes.length===0
    ?'<p style="color:var(--text-muted);text-align:center;padding:2rem">Нет заметок.</p>'
    :notes.slice().reverse().map(n=>`<div class="note-card"><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p><div class="note-card-footer"><span class="note-date">${fmtDate(n.date)}</span><button class="btn btn-sm btn-danger" onclick="deleteNote('${n.id}')">Удалить</button></div></div>`).join('');
}
function addNote(){
  if(!currentUser){alert('Войдите в аккаунт');return}
  const t=document.getElementById('noteTitle').value.trim(),x=document.getElementById('noteText').value.trim();
  if(!t||!x){alert('Заполните заголовок и текст');return}
  const notes=JSON.parse(localStorage.getItem(`plantifi_notes_${currentUser.username}`)||'[]');
  notes.push({id:String(Date.now()),title:t,text:x,date:new Date().toISOString()});
  localStorage.setItem(`plantifi_notes_${currentUser.username}`,JSON.stringify(notes));
  document.getElementById('noteTitle').value='';document.getElementById('noteText').value='';renderNotes();
}
function deleteNote(id){const k=`plantifi_notes_${currentUser?.username||'guest'}`;const n=JSON.parse(localStorage.getItem(k)||'[]');localStorage.setItem(k,JSON.stringify(n.filter(x=>x.id!==id)));renderNotes()}

function renderCalendar(){
  const y=calendarDate.getFullYear(),m=calendarDate.getMonth();
  const months=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  document.getElementById('calendarMonth').textContent=`${months[m]} ${y}`;
  const grid=document.getElementById('calendarGrid');
  const firstDay=new Date(y,m,1).getDay();const daysInMonth=new Date(y,m+1,0).getDate();const today=new Date();
  const events=JSON.parse(localStorage.getItem(`plantifi_events_${currentUser?.username||'guest'}`)||'[]');
  const colors={water:'#42a5f5',fertilize:'#66bb6a',repot:'#ffa726',prune:'#ef5350',harvest:'#ab47bc'};
  let html=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d=>`<div class="cal-header">${d}</div>`).join('');
  const sd=firstDay===0?6:firstDay-1;
  for(let i=0;i<sd;i++)html+='<div class="cal-day empty"></div>';
  for(let d=1;d<=daysInMonth;d++){
    const ds=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isT=d===today.getDate()&&m===today.getMonth()&&y===today.getFullYear();
    const dayEv=events.filter(e=>e.date===ds);const isSel=selectedCalDate===ds;
    html+=`<div class="cal-day ${isT?'today':''} ${isSel?'selected':''}" onclick="selectCalDate('${ds}')"><span>${d}</span><div class="cal-day-events">${dayEv.slice(0,3).map(e=>`<div class="cal-day-event" style="background:${colors[e.type]||'#999'}"></div>`).join('')}</div></div>`;
  }
  grid.innerHTML=html;renderCalendarEvents();
}
function changeMonth(d){calendarDate.setMonth(calendarDate.getMonth()+d);renderCalendar()}
function selectCalDate(ds){selectedCalDate=ds;document.getElementById('calendarEventForm').style.display='block';document.getElementById('eventDate').textContent=fmtDate(ds);renderCalendar()}
function updateCalendarForm(){const s=document.getElementById('eventPlant');s.innerHTML='<option value="">Растение...</option>'+PLANTS.map(p=>`<option value="${p.id}">${p.emoji} ${p.name}</option>`).join('')}
function addCalendarEvent(){
  if(!currentUser){alert('Войдите в аккаунт');return}
  const plantId=document.getElementById('eventPlant').value,type=document.getElementById('eventType').value,note=document.getElementById('eventNote').value;
  if(!selectedCalDate){alert('Выберите дату');return}
  const events=JSON.parse(localStorage.getItem(`plantifi_events_${currentUser.username}`)||'[]');
  events.push({id:Date.now(),date:selectedCalDate,plantId:+plantId,type,note});
  localStorage.setItem(`plantifi_events_${currentUser.username}`,JSON.stringify(events));
  document.getElementById('eventNote').value='';document.getElementById('calendarEventForm').style.display='none';selectedCalDate=null;renderCalendar();
}
function renderCalendarEvents(){
  const events=JSON.parse(localStorage.getItem(`plantifi_events_${currentUser?.username||'guest'}`)||'[]');
  const me=events.filter(e=>{const d=new Date(e.date);return d.getMonth()===calendarDate.getMonth()&&d.getFullYear()===calendarDate.getFullYear()}).sort((a,b)=>a.date.localeCompare(b.date));
  const icons={water:'💧',fertilize:'🧪',repot:'🪴',prune:'✂️',harvest:'🧺'};
  document.getElementById('calendarEvents').innerHTML=me.length===0?'<p style="color:var(--text-muted);text-align:center">Нет событий в этом месяце</p>':'<h3>События:</h3>'+me.map(e=>`<div class="cal-event"><div class="cal-event-icon">${icons[e.type]||'📌'}</div><div class="cal-event-info"><div class="cal-event-plant">${getPlantEmoji(e.plantId)} ${getPlantName(e.plantId)}</div><div class="cal-event-note">${fmtDate(e.date)}${e.note?' • '+esc(e.note):''}</div></div><button class="btn btn-sm btn-danger" onclick="deleteEvent(${e.id})">✕</button></div>`).join('');
}
function deleteEvent(id){const k=`plantifi_events_${currentUser?.username||'guest'}`;const e=JSON.parse(localStorage.getItem(k)||'[]');localStorage.setItem(k,JSON.stringify(e.filter(x=>x.id!==id)));renderCalendar()}

let communityFilter='all';
function renderCommunity(){
  const posts=JSON.parse(localStorage.getItem('plantifi_community')||'[]');
  const f=communityFilter==='all'?posts:posts.filter(p=>p.category===communityFilter);
  const catC={tip:'#66bb6a',question:'#42a5f5',success:'#ffd54f',problem:'#ef5350'};
  const catL={tip:'💡 Совет',question:'❓ Вопрос',success:'🎉 Успех',problem:'⚠️ Проблема'};
  document.getElementById('communityFeed').innerHTML=f.length===0
    ?'<p style="color:var(--text-muted);text-align:center;padding:2rem">Нет постов.</p>'
    :f.slice().reverse().map(p=>`<div class="post-card"><div class="post-header"><span class="post-author">👤 ${esc(p.author)}</span><span class="post-category-badge" style="background:${catC[p.category]||'#666'};color:white">${catL[p.category]||p.category}</span></div><div class="post-text">${esc(p.text)}</div><div class="post-footer"><span class="post-date">${fmtDate(p.date)}</span><div class="post-actions"><button class="post-action" onclick="likePost(${p.id})">👍 ${p.likes||0}</button></div></div></div>`).join('');
}
function addCommunityPost(){
  if(!currentUser){alert('Войдите в аккаунт');return}
  const text=document.getElementById('communityPost').value.trim(),category=document.getElementById('postCategory').value;
  if(!text){alert('Введите текст поста');return}
  const posts=JSON.parse(localStorage.getItem('plantifi_community')||'[]');
  posts.push({id:Date.now(),author:currentUser.username,text,category,likes:0,date:new Date().toISOString()});
  localStorage.setItem('plantifi_community',JSON.stringify(posts));
  document.getElementById('communityPost').value='';renderCommunity();
}
function likePost(id){const p=JSON.parse(localStorage.getItem('plantifi_community')||'[]');const x=p.find(y=>y.id===id);if(x){x.likes=(x.likes||0)+1;localStorage.setItem('plantifi_community',JSON.stringify(p));renderCommunity()}}
function filterPosts(cat,btn){communityFilter=cat;btn.parentElement.querySelectorAll('.filter-tag').forEach(t=>t.classList.remove('active'));btn.classList.add('active');renderCommunity()}

function getPlantName(id){const p=PLANTS.find(x=>x.id===id);return p?p.name:'Неизвестное'}
function getPlantEmoji(id){const p=PLANTS.find(x=>x.id===id);return p?p.emoji:'🌿'}
function fmtDate(ds){if(!ds)return'';return new Date(ds).toLocaleDateString('ru-RU',{day:'numeric',month:'short',year:'numeric'})}
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}
