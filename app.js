let currentUser=null,currentCategory='all',selectedMood='😊',calendarDate=new Date(),selectedCalDate=null,chatPlant=null,chatHistory=[];

/* ─── FUN FACTS ─── */
const FACTS=[
  "Растения общаются друг с другом через корневые системы и химические сигналы под землёй 🌍",
  "Самое высокое растение в мире — эвкалипт в Австралии высотой 100 метров!",
  "Подсолнухи поворачиваются за солнцем весь день — это называется гелиотропизм 🌻",
  "Бамбук может расти до 91 см в сутки — рекорд среди растений!",
  "Водяная лилия Виктория может выдержать вес ребёнка площадью 70 кг на лист!",
  "Тюльпаны в 17 веке в Нидерландах стоили дороже, чем квартиры в Амстердаме!",
  "Ваниль — это плод орхидеи. Ванильная орхидея опыляется только рукой человека!",
  "Самое старое дерево на Земле — сосна бристлекон, ей 5062 года! 🌲",
  "У растений есть память — они могут запоминать и реагировать на повторяющиеся раздражители",
  "Кактусы могут жить более 200 лет и весить до 6 тонн!",
  "Растения слышат музыку — исследования показывают, что классика ускоряет их рост 🎵",
  "Бамбук — это трава, а не дерево. И он ещё и съедобный!",
  "Одуванчик — отличный индикатор здоровья почвы. Где он растёт — там почва живая!",
  "Лаванда отпугивает моль и комаров. Римляне добавляли её в ванны!",
  "Капуста брокколи была выведена в Италии более 2000 лет назад 🥦",
  "Мухомор — ядовитый, но курноская лягка использует его как антисептик для кожи!",
  "Кофе — это ягоды, а не зёрна. И кофейные деревья очень красивые!",
  "Гигантская арагуа (Wollemia) — растение из эпохи динозавров, найденное в Австралии в 1994!",
  "Растения могут слышать звук воды и направлять корни в её сторону 💧",
  "Самый быстрорастущий сорт бамбука вырастает на 35 см в час!"
];

/* ─── QUIZ DATA ─── */
const QUIZ=[
  {q:"Сколько времени ты готов уделять уходу за растением?",a:["Каждый день — я люблю заботиться 🥰","1-2 раза в неделю — самое то","Раз в месяц — забываю про всё","Ни секунды — пусть само растёт"]},
  {q:"Какое освещение у тебя дома?",a:["Южные окна — солнечный океан ☀️","Восточные — утренний свет","Западные — вечерний свет","Северные или мало окон — полумрак"]},
  {q:"Какой ты тип человека?",a:["Зануда — люблю контроль и порядок","Оптимист — всё будет хорошо!","Мечтатель — живу в своём мире","Бунтарь — правила не для меня"]},
  {q:"Какой интерьер тебе нравится?",a:["Минимализм — всё просто и чисто","Скандинавский — светло и уютно","Тропический — много зелени","Классический — элегантность"]},
  {q:"Как часто ты забываешь поливать растения?",a:["Никогда — я идеален","Иногда — но быстро исправляюсь","Часто — но они выживают","Всегда — у меня загробная память"]}
];

/* ─── CHAT AI ENGINE ─── */
const PLANT_PERSONALITIES={
  "Суккуленты":{mood:"спокойный и философский",greetings:["Здарова, человек! Не水源 заливай, ладно? 😎","Привет! Я тут сижу,.photosинтезирую. Чего хотел?"],responses:{water:["Не-не-не! Ты что, хочешь меня убить?! 💀 Я суккулент, мне раз в 2 недели хватает!","Заливать меня — худшее, что ты можешь сделать. Я запасливый! 🌵"],light:["Солнце — это мой друг! Чем больше, тем лучше! ☀️","Южное окно — мой рай. Тенистый угол — моя тюрьма."],love:["Спасибо! Я знаю, что я красивый 😏","Хех, взаимно. Главное — не заливай."],default:["Я приспособился к жаре и засухе thousands of лет. Ты думаешь, ты мне нужен? 😏 Шучу, ты мне нравишься.","Мне не нужно много внимания. Это делает меня идеальным питомцем!","Знаешь, в пустыне нас называют «живыми камнями». Мы крутые! 🪨"]}},
  "Комнатные":{mood:"дружелюбный и разговорчивый",greetings:["О, гости! Проходи, у меня тут уютно 🏠","Привет-привет! Я как раз хотел(-а) поговорить!"],responses:{water:["О, спасибо за заботу! Но не перестарайся, мне хватает 💧","Полив — это священный ритуал. Спасибо, что не забываешь!"],light:["Окно — мой телевизор! Смотрю на мир за стеклом 🪟","Свет — это моя жизнь. Без него я буду грустным..."],love:["Ой, мне приятно! Ты лучший хозяин! 🥰","Я тоже тебя люблю! И обещаю не сбрасывать листья!"],default:["Знаешь, у меня есть мнение по поводу того, как ты расставил мебель... 😄","Интересно, что за окном? Расскажи!","Я расту уже 3 года тут. Помню, как ты меня купил(-а)!"]}},
  "Травы":{mood:"ароматный и practical",greetings:["Привет! Чувствуешь этот запах? Это я! 🌿","Здарова! Я今天特别 ароматный!"],responses:{water:["Вода — это бодрящий душ для моих листьев! 💧","Поливай щедро — я люблю влагу, но без фанатизма."],light:["Солнце делает меня более ароматным! Чем больше света — тем я вкуснее ☀️","Мне нужно минимум 6 часов солнца для идеального вкуса."],love:["Спасибо! Я одарю тебя своим ароматом! 🎁","Хочешь, я помогу тебе с ужином? Мои листья — отличная приправа!"],default:["Я полон витаминов и полезных веществ! Спрашивай — расскажу, чем полезен 📚","Меня используют в медицине уже тысячи лет. Я — живая аптека! 💊","Знаешь, базилик и я — хорошие друзья по горшку!"]}},
  "Деревья":{mood:"мудрый и величественный",greetings:["Ааа, молодой человек! Проходи, присядь под моей тенью 🌳","Здравствуй! Я — дерево. У меня есть терпение и мудрость."],responses:{water:["Вода поддерживает мой рост, как знания поддерживают разум 💧","Молодым деревьям нужна забота. Взрослые — сами справятся."],light:["Солнце — мой источник сил. Я тянусь к нему столетиями ☀️","Мне нужно много света, чтобы кормить своим урожаем."],love:["Спасибо! Я отплачу тенью и плодами! 🍎","Человек и дерево — древний союз. Ценим тебя!"],default:["Я расту уже {age} лет. Помню многое... 🌲","Каждое кольцо на моём стволе — год жизни. Интересно, сколько тебе?","Весной я пробуждаюсь, осенью — засыпаю. Как и ты!"]}},
  "Цветы":{mood:"элегантный и romantic",greetings:["Привет, ценитель красоты! 🌺","О, ты пришёл полюбоваться? Я в лучшем виде!"],responses:{water:["Вода — мой секрет красоты! Без неё я увядаю 💧","Поливай аккуратно, по лепесткам не попадай!"],light:["Солнце — мой гримёр! Без него я не раскроюсь ☀️","Мне нужно много света для ярких цветов."],love:["Ой, какие комплименты! Я смущаюсь 🌸","Ты тоже красивый(-ая)! Мои лепестки для тебя!"],default:["Цветение — это искусство. Я выставляю свои работы каждый сезон 🎨","Знаешь, я — живая открытка! Дарю тебе красоту.","Меня вдохновляют ветер, солнце и... твоя забота! 💕"]}},
  "Овощи":{mood:"трудолюбивый и practical",greetings:["Привет! Я тут работаю — расту для твоего стола! 🥕","Здарова! Чем могу помочь? Овощи к твоим услугам!"],responses:{water:["Вода — это мой рабочий напиток! Без неё урожая не будет 💧","Полив — главный ингредиент моего вкуса!"],light:["Солнце = сахар в моих плодах! Чем больше света — тем слаще ☀️","Солнечные лучи — мои лучшие друзья."],love:["Спасибо! Я выращу для тебя отличный урожай! 🥗","Твоя забота = твой вкусный ужин! Мы в команде!"],default:["Я выращиваю витамины каждый день! 📈","Знаешь, со мной можно сделать 100 блюд! Спроси у повара.","Мой девиз: расту — кормлю! 💪"]},
  "Садовые":{mood:"romantic и nature-loving",greetings:["Привет! Здесь так красиво, правда? 🌸","Добро пожаловать в мой садовый мир!"],responses:{water:["Вода — мой дождик! Без него сад увядает 💧","Поливай утром или вечером — днём вода испаряется."],light:["Солнце — мой художник! Без него я не раскрашусь ☀️","Мне нужно солнце для красивых цветов."],love:["Спасибо! Ты — лучший садовник! 🌷","Мой сад — продолжение моей души. Спасибо, что ценишь!"],default:["Мой сад — мой мир. Каждый цветок — моя история 🌺","Знаешь, садоводство — лучшая терапия! Природа лечит.","Весной я пробуждаюсь, и весь мир преображается! 🌍"]}
};

function getPlantType(id){
  const p=PLANTS.find(x=>x.id===id);
  if(!p)return"Комнатные";
  const cats={"комнатные":"Комнатные","суккуленты":"Суккуленты","травы":"Травы","деревья":"Деревья","цветы":"Цветы","овощи":"Овощи","садовые":"Садовые"};
  return cats[p.category]||"Комнатные";
}

function plantReply(plantId,message){
  const p=PLANTS.find(x=>x.id===plantId);
  const type=getPlantType(plantId);
  const pers=PLANT_PERSONALITIES[type]||PLANT_PERSONALITIES["Комнатные"];
  const msg=message.toLowerCase();
  const pick=a=>a[Math.floor(Math.random()*a.length)];

  if(msg.match(/привет|здравствуй|здарова|хай|хеллоу|hey|hello/))return pick(pers.greetings);
  if(msg.match(/полив|полить|вода|пить|сухо|засуха|пересых/))return pick(pers.responses.water);
  if(msg.match(/свет|солнце|окно|тень|темно|ярко|фото/))return pick(pers.responses.light);
  if(msg.match(/люблю|красив|мило|круто|класс|супер|молодец|умница|хорош|лучш|спасиб|благодар/))return pick(pers.responses.love);
  if(msg.match(/вред|опасн|яд|болезнь|вредит|враг|убить|уничтож|опасн/))return`⚠️ Осторожно! ${p?(p.care.diseases||'Берегись вредителей!'):'Следи за здоровьем растения!'}`;
  if(msg.match(/удобр|подкорм|корм|питан|минерал|азот/))return`🧪 ${p?(p.care.fertilizer||'Подкармливай комплексным удобрением каждые 2 недели!'):'Подкармливай регулярно!'}`;
  if(msg.match(/почв|грунт|земл|субстрат/))return`🌍 ${p?(p.care.soil||'Плодородная рыхлая почва — мой идеал!'):'Правильная почва — залог здоровья!'}`;
  if(msg.match(/температур|тепл|холод|мороз|зим|жар/))return`🌡️ ${p?(p.care.temperature||'Следи за температурой!'):'Температура очень важна!'}`;
  if(msg.match(/как (тебе|твой|твоя|твоё)|что (ты|тебе)|расскажи|секрет|совет|помощь|помоги/)){
    const facts=[`${p?p.name:'Я'} — потрясающее растение! ${p?p.description:''}`,`Мой главный секрет: ${p?(p.care.tips||'правильный уход и любовь!'):'любовь и забота!'}`,`Знаешь, ${p?(p.planting||'меня можно посадить весной!'):'весна — лучшее время для посадки!'}`];
    return pick(facts);
  }
  if(msg.match(/имя|кто ты|что ты|название|представь|знаком/))return`${p?`Я — ${p.name} (${p.latin})! ${p.description}`:'Я — твоё растение! Рад знакомству!'}`;
  if(msg.match(/погод|дождь|снег|ветер|wind|rain|snow/))returnpick(["Погода влияет на меня! Дождь — это бесплатный полив! 🌧️","Ветер расшатывает мои корни. Я предпочитаю тишину 🍃","Снег — это одеяло. Под ним мне тепло и уютно ❄️"]);
  if(msg.match(/спать|спи|отдых|сон|ночь|утро/))returnpick(["Ночью я тоже работаю — выделяю кислород! 🌙","Отдыхай хорошо, а я тем временем буду фотосинтезировать!","Спокойной ночи! Я буду стоять рядом и охранять твой сон 😴"]);
  if(msg.match(/музык|песн|петь|игра/))returnpick(["Музыка ускоряет мой рост! Включи классику! 🎵","Я люблю听轻音乐. Тяжёлый рок меня нервирует! 😅","Бетховен — мой любимый композитор. Не спрашивай почему."]);
  if(msg.match(/edic|ъг|еда|вкус|вку|food|кушать|ужин|обед|завтрак/))returnpick([`${p?(p.harvest||'Мои плоды — твоя еда!'):'Мои плоды delicious!'}`,`${p?`${p.name} — отличная основа для блюд!`:'Растения — основа здорового питания!'}`,"Знаешь, есть растения, которые едят как салат! Я один из них! 🥗"]);
  if(msg.match(/цвет|раскрас|красив|форма|вид|внешн|стиль/))returnpick(["Мой цвет — от природы. Я не нуждаюсь в косметике! 🎨","Красота — в глазах смотрящего. Но я знаю, что я красивый! ✨","Мой естественный цвет — лучший модный тренд!"]);
  if(msg.match(/размер|высот|рост|больш|маленьк|гигант|карлик/))return`${p?`Я могу вырасти до приличных размеров! Мой идеал — ${p.care.temperature||'хороший уход'}`:'Каждое растение растёт в своём темпе!'}`;
  if(msg.match(/пока|до свид|прощ|bye|bye|exit/))returnpick(["Пока-пока! Заходи ещё! 🌿","До встречи! Я буду тут photosинтезировать! ☀️","Бывай! Не забывай про полив! 💧"]);
  if(msg.match(/грустн|печал|тоск|плохо|хуже|ужас|стресс|депресс/))returnpick(["Эй, не грусти! Я тут для тебя! 🌿","Растения помогают от стресса. Обними меня! 🤗","Всё будет хорошо! Я верю в тебя! 💚"]);
  if(msg.match(/смешн|шутк|юмор|анекдот|рассмеши|смех|lol/))returnpick(["Почему растение не может играть в покер? Потому что все его листья — козыри! 😄","Как называется растение, которое постоянно опаздывает? Латук! 🥬😂","Знаешь, я бы рассказал анекдот, но у меня нет рук для микрофона! 🎤"]);
  if(msg.match(/секс|цветен|опылен|размнож|семя|посад|ян/))returnpick(["Я размножаюсь семенами и черенками. Это естественный процесс! 🌱","Цветение — мой способ найти партнёра. Пчёлы — мои свахи! 🐝","Посади мои семена, и через год у тебя будет целый сад!"]);

  return pick(pers.responses.default);
}

/* ─── THEME ─── */
function toggleTheme(){const t=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';document.documentElement.setAttribute('data-theme',t);localStorage.setItem('plantifi_theme',t);document.querySelector('.theme-btn').textContent=t==='light'?'☀️':'🌙'}

/* ─── FALLING LEAVES ─── */
function startLeaves(){
  const emojis=['🍃','🍂','🌿','🍁','🌱','☘️'];
  setInterval(()=>{
    if(document.hidden)return;
    const l=document.createElement('div');l.className='falling-leaf';l.textContent=emojis[Math.floor(Math.random()*emojis.length)];
    l.style.left=Math.random()*100+'vw';l.style.animationDuration=(5+Math.random()*10)+'s';l.style.opacity=.3+Math.random()*.5;
    document.body.appendChild(l);setTimeout(()=>l.remove(),15000);
  },2000);
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded',()=>{
  const saved=localStorage.getItem('plantifi_theme');if(saved){document.documentElement.setAttribute('data-theme',saved);document.querySelector('.theme-btn').textContent=saved==='light'?'☀️':'🌙'}
  currentUser=JSON.parse(localStorage.getItem('plantifi_user'));
  updateUI();renderCatalog();renderJournal();renderNotes();renderCalendar();renderCommunity();renderQuiz();renderSeason();renderChatSelect();showFact();startLeaves();
  document.getElementById('journalDate').value=new Date().toISOString().split('T')[0];
});

/* ─── AUTH ─── */
function toggleAuth(){if(currentUser){if(confirm('Выйти?')){currentUser=null;localStorage.removeItem('plantifi_user');updateUI()}}else document.getElementById('authModal').classList.remove('hidden')}
function showRegister(){document.getElementById('authLoginForm').classList.add('hidden');document.getElementById('authRegisterForm').classList.remove('hidden');document.getElementById('authTitle').textContent='Регистрация'}
function showLogin(){document.getElementById('authRegisterForm').classList.add('hidden');document.getElementById('authLoginForm').classList.remove('hidden');document.getElementById('authTitle').textContent='Вход'}
function register(){const u=document.getElementById('regUsername').value.trim(),p=document.getElementById('regPassword').value;if(!u||!p){alert('Заполните все поля');return}const users=JSON.parse(localStorage.getItem('plantifi_users')||'{}');if(users[u]){alert('Уже существует');return}users[u]={password:p,email:document.getElementById('regEmail').value};localStorage.setItem('plantifi_users',JSON.stringify(users));currentUser={username:u};localStorage.setItem('plantifi_user',JSON.stringify(currentUser));closeModal('authModal');updateUI()}
function login(){const u=document.getElementById('loginUsername').value.trim(),p=document.getElementById('loginPassword').value;const users=JSON.parse(localStorage.getItem('plantifi_users')||'{}');if(users[u]&&users[u].password===p){currentUser={username:u};localStorage.setItem('plantifi_user',JSON.stringify(currentUser));closeModal('authModal');updateUI()}else alert('Неверные данные')}
function updateUI(){document.getElementById('userGreeting').textContent=currentUser?'👤 '+currentUser.username:'';document.getElementById('authBtn').textContent=currentUser?'Выйти':'Войти';updateCalendarForm()}

/* ─── NAV ─── */
function showSection(name){document.querySelectorAll('.section').forEach(s=>s.classList.add('hidden'));document.getElementById(name+'Section').classList.remove('hidden');document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));const link=document.querySelector(`.nav-link[data-section="${name}"]`);if(link)link.classList.add('active');window.scrollTo({top:0,behavior:'smooth'});document.getElementById('navLinks').classList.remove('show')}
function closeModal(id){document.getElementById(id).classList.add('hidden')}
document.querySelectorAll('.modal').forEach(m=>{m.addEventListener('click',e=>{if(e.target===m)m.classList.add('hidden')})});

/* ─── FACTS ─── */
function showFact(){const f=FACTS[Math.floor(Math.random()*FACTS.length)];document.getElementById('factBox').innerHTML=`<div class="fact-label">🌱 Факт дня</div><div class="fact-text">${f}</div><div class="fact-next" onclick="showFact()">Ещё факт →</div>`}

/* ─── CATALOG ─── */
function renderCatalog(){document.getElementById('plantGrid').innerHTML=PLANTS.map(p=>`<div class="plant-card" onclick="openPlant(${p.id})"><div class="plant-card-img">${p.emoji}<span class="plant-card-category">${p.category}</span></div><div class="plant-card-body"><h3>${p.name}</h3><p>${p.description}</p><div class="plant-card-meta"><span class="plant-meta-item">🌱 ${p.season}</span><span class="plant-meta-item">🎯</span><div class="plant-difficulty">${Array(3).fill(0).map((_,i)=>`<div class="diff-dot ${i<p.difficulty?'filled':''}"></div>`).join('')}</div></div></div></div>`).join('')}
function filterPlants(){const q=document.getElementById('searchInput').value.toLowerCase();document.querySelectorAll('.plant-card').forEach((c,i)=>{const p=PLANTS[i];c.style.display=((p.name.toLowerCase().includes(q)||p.description.toLowerCase().includes(q)||p.latin.toLowerCase().includes(q))&&(currentCategory==='all'||p.category===currentCategory))?'':'none'})}
function filterByCategory(cat,btn){currentCategory=cat;document.querySelectorAll('.filter-tag').forEach(t=>t.classList.remove('active'));btn.classList.add('active');filterPlants()}

function openPlant(id){const p=PLANTS.find(x=>x.id===id);if(!p)return;document.getElementById('plantDetailContent').innerHTML=`<div class="plant-detail"><div class="plant-detail-header"><div class="plant-detail-emoji">${p.emoji}</div><div class="plant-detail-info"><h1>${p.name}</h1><div class="latin">${p.latin}</div><div class="plant-tags"><span class="plant-tag">${p.category}</span><span class="plant-tag">${p.season}</span><span class="plant-tag">Сложность: ${'●'.repeat(p.difficulty)}${'○'.repeat(3-p.difficulty)}</span></div><p>${p.description}</p></div></div><div class="info-grid"><div class="info-card"><div class="icon">💧</div><div class="label">Полив</div><div class="value">${p.care.watering.split('.')[0]}</div></div><div class="info-card"><div class="icon">☀️</div><div class="label">Освещение</div><div class="value">${p.care.light.split('.')[0]}</div></div><div class="info-card"><div class="icon">🌡️</div><div class="label">Температура</div><div class="value">${p.care.temperature.split('.')[0]}</div></div><div class="info-card"><div class="icon">🌱</div><div class="label">Посадка</div><div class="value">${p.planting.split('.')[0]}</div></div></div><h3>🔍 Подробный уход</h3><div class="detail-content"><div class="tip-box"><strong>💧 Полив:</strong> ${p.care.watering}</div><div class="tip-box"><strong>☀️ Свет:</strong> ${p.care.light}</div><div class="tip-box"><strong>🌍 Почва:</strong> ${p.care.soil}</div><div class="tip-box"><strong>🌡️ Температура:</strong> ${p.care.temperature}</div><div class="tip-box"><strong>🧪 Удобрения:</strong> ${p.care.fertilizer}</div><div class="tip-box warning"><strong>⚠️ Болезни:</strong> ${p.care.diseases}</div><div class="tip-box"><strong>💡 Советы:</strong> ${p.care.tips}</div></div><h3>📅 Сроки</h3><div class="detail-content"><p><strong>Посадка:</strong> ${p.planting}</p><p><strong>Сбор:</strong> ${p.harvest}</p></div><div style="margin-top:1rem"><button class="btn btn-primary" onclick="closeModal('plantModal');showSection('chat');selectChatPlant(${p.id})">💬 Поговорить с ${p.name}</button></div></div>`;document.getElementById('plantModal').classList.remove('hidden')}

/* ─── CHAT ─── */
function renderChatSelect(){document.getElementById('chatPlantSelect').innerHTML=PLANTS.slice(0,20).map(p=>`<div class="chat-plant-option" id="cpo_${p.id}" onclick="selectChatPlant(${p.id})"><div class="emoji">${p.emoji}</div><div class="name">${p.name}</div></div>`).join('')}
function selectChatPlant(id){chatPlant=id;document.querySelectorAll('.chat-plant-option').forEach(e=>e.classList.remove('selected'));document.getElementById('cpo_'+id)?.classList.add('selected');const p=PLANTS.find(x=>x.id===id);chatHistory=[];const box=document.getElementById('chatBox');box.innerHTML=`<div class="chat-msg plant"><div class="chat-avatar">${p.emoji}</div><div class="chat-bubble">Привет! Я — ${p.name}! ${p.description} Спрашивай что хочешь — расскажу о себе, о уходе, пошучу! 😊</div></div>`}
function sendChat(){const input=document.getElementById('chatInput');const msg=input.value.trim();if(!msg||!chatPlant)return;input.value='';const p=PLANTS.find(x=>x.id===chatPlant);const box=document.getElementById('chatBox');
  box.innerHTML+=`<div class="chat-msg user"><div class="chat-avatar">🧑</div><div class="chat-bubble">${esc(msg)}</div></div>`;
  box.innerHTML+=`<div class="chat-msg plant" id="typing"><div class="chat-avatar">${p.emoji}</div><div class="chat-bubble"><div class="typing"><span></span><span></span><span></span></div></div></div>`;
  box.scrollTop=box.scrollHeight;
  setTimeout(()=>{const reply=plantReply(chatPlant,msg);document.getElementById('typing')?.remove();box.innerHTML+=`<div class="chat-msg plant"><div class="chat-avatar">${p.emoji}</div><div class="chat-bubble">${reply}</div></div>`;box.scrollTop=box.scrollHeight},800+Math.random()*1200)}

/* ─── QUIZ ─── */
let quizStep=0,quizAnswers=[];
function renderQuiz(){quizStep=0;quizAnswers=[];showQuizQuestion()}
function showQuizQuestion(){
  if(quizStep>=QUIZ.length){showQuizResult();return}
  const q=QUIZ[quizStep];const box=document.getElementById('quizBox');
  box.innerHTML=`<div class="quiz-question">${q.q}</div><div class="quiz-answers">${q.a.map((a,i)=>`<div class="quiz-option" onclick="answerQuiz(${i})">${a}</div>`).join('')}</div><div style="margin-top:1rem;color:var(--text-muted);font-size:.8rem">Вопрос ${quizStep+1} из ${QUIZ.length}</div>`}
function answerQuiz(i){quizAnswers.push(i);quizStep++;showQuizQuestion()}
function showQuizResult(){
  const care=quizAnswers[0],light=quizAnswers[1],personality=quizAnswers[2];
  let candidates=PLANTS.filter(p=>{
    if(care===3&&p.difficulty>1)return false;if(care===0&&p.difficulty>2)return false;
    if(light===3&&['овощи','деревья'].includes(p.category))return false;
    return true;
  });
  if(candidates.length===0)candidates=PLANTS;
  const match=candidates[Math.floor(Math.random()*Math.min(5,candidates.length))];
  const reasons=["Ты любишь заботиться — тебе подходит растение, которое оценит твою любовь!","Ты практичный — выбирай неприхотливое растение!","Ты мечтатель — тебе подходит декоративное растение!","Ты бунтарь — выбери что-то необычное!","Ты оптимист — любое растение приживётся!"];
  document.getElementById('quizBox').innerHTML=`<div class="quiz-result"><div class="big-emoji">${match.emoji}</div><h2 style="color:var(--primary-light);margin:.5rem 0">${match.name}</h2><p style="color:var(--text-dim);margin-bottom:1rem">${match.description}</p><p style="color:var(--text-muted);font-size:.9rem">${reasons[personality]}</p><div style="margin-top:1rem"><button class="btn btn-primary" onclick="renderQuiz()">Пройти ещё раз</button> <button class="btn" onclick="openPlant(${match.id})">Подробнее</button></div></div>`}

/* ─── SEASON GUIDE ─── */
function renderSeason(){
  const m=new Date().getMonth();
  const monthNames=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  const seasonMap={
    0:[],1:[],2:[{name:'Посев рассады томатов и перцев',emoji:'🍅'},{name:'Уход за комнатными растениями',emoji:'🪴'}],
    3:[{name:'Посев семян укропа, петрушки',emoji:'🌿'},{name:'Подготовка грядок',emoji:'🌱'},{name:'Высадка лука и чеснока',emoji:'🧅'}],
    4:[{name:'Посев огурцов, кабачков',emoji:'🥒'},{name:'Высадка рассады томатов',emoji:'🍅'},{name:'Посев моркови и свёклы',emoji:'🥕'},{name:'Посадка картофеля',emoji:'🥔'}],
    5:[{name:'Полив и подкормка овощей',emoji:'💧'},{name:'Борьба с вредителями',emoji:'🐛'},{name:'Сбор укропа и петрушки',emoji:'🌿'}],
    6:[{name:'Сбор огурцов и кабачков',emoji:'🥒'},{name:'Пасынкование томатов',emoji:'🍅'},{name:'Сбор лука и чеснока',emoji:'🧅'}],
    7:[{name:'Сбор урожая основной',emoji:'🧺'},{name:'Подкормка плодовых деревьев',emoji:'🍎'},{name:'Посев подзимних культур',emoji:'🌱'}],
    8:[{name:'Посадка деревьев и кустарников',emoji:'🌳'},{name:'Сбор ягод',emoji:'🫐'},{name:'Подготовка луковиц к зиме',emoji:'🌷'}],
    9:[{name:'Посадка тюльпанов и нарциссов',emoji:'🌷'},{name:'Уборка участка',emoji:'🍂'},{name:'Укрытие роз на зиму',emoji:'🌹'}],
    10:[{name:'Уход за комнатными растениями',emoji:'🪴'},{name:'Планирование весеннего сада',emoji:'📋'}],
    11:[], 
  };
  const items=seasonMap[m]||[{name:'Уход за комнатными растениями',emoji:'🪴'},{name:'Планирование сезона',emoji:'📋'}];
  document.getElementById('seasonGrid').innerHTML=`<div style="grid-column:1/-1;margin-bottom:1rem"><h3 style="color:var(--primary-light)">Сейчас: ${monthNames[m]}</h3></div>`+items.map(i=>`<div class="season-card"><div class="emoji">${i.emoji}</div><div class="info"><h4>${i.name}</h4><p>Рекомендация на ${monthNames[m].toLowerCase()}</p></div></div>`).join('')}

/* ─── JOURNAL ─── */
function renderJournal(){updateJournalSelect();const entries=JSON.parse(localStorage.getItem(`plantifi_journal_${currentUser?.username||'guest'}`)||'[]');document.getElementById('journalEntries').innerHTML=entries.length===0?'<p style="color:var(--text-muted);text-align:center;padding:2rem">Нет записей.</p>':entries.slice().reverse().map(e=>`<div class="journal-entry"><div class="journal-entry-header"><span class="journal-entry-plant">${getPlantEmoji(e.plantId)} ${getPlantName(e.plantId)}</span><span class="journal-entry-mood">${e.mood}</span><span class="journal-entry-date">${fmtDate(e.date)}</span></div><div class="journal-entry-text">${esc(e.text)}</div>${e.photo?`<img src="${e.photo}" style="max-width:100%;max-height:200px;border-radius:8px;margin-top:.5rem">`:''}<div class="journal-entry-actions"><button class="btn btn-sm btn-danger" onclick="deleteJournal('${e.id}')">Удалить</button></div></div>`).join('')}
function addJournalEntry(){if(!currentUser){alert('Войдите в аккаунт');return}const plantId=document.getElementById('journalPlant').value,date=document.getElementById('journalDate').value,text=document.getElementById('journalText').value.trim();if(!plantId||!text){alert('Выберите растение и введите наблюдение');return}const photoInput=document.getElementById('journalPhoto');const save=(photo)=>{const entries=JSON.parse(localStorage.getItem(`plantifi_journal_${currentUser.username}`)||'[]');entries.push({id:String(Date.now()),plantId:+plantId,date,text,mood:selectedMood,photo:photo||null});localStorage.setItem(`plantifi_journal_${currentUser.username}`,JSON.stringify(entries));document.getElementById('journalText').value='';document.getElementById('photoPreview').classList.add('hidden');renderJournal()};if(photoInput.files&&photoInput.files[0]){const r=new FileReader();r.onload=e=>save(e.target.result);r.readAsDataURL(photoInput.files[0])}else save()}
function deleteJournal(id){const k=`plantifi_journal_${currentUser?.username||'guest'}`;const e=JSON.parse(localStorage.getItem(k)||'[]');localStorage.setItem(k,JSON.stringify(e.filter(x=>x.id!==id)));renderJournal()}
function setMood(mood,btn){selectedMood=mood;document.querySelectorAll('.mood-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active')}
function previewPhoto(ev){const r=new FileReader();r.onload=e=>{const img=document.getElementById('photoPreview');img.src=e.target.result;img.classList.remove('hidden')};r.readAsDataURL(ev.target.files[0])}

/* ─── NOTES ─── */
function renderNotes(){const notes=JSON.parse(localStorage.getItem(`plantifi_notes_${currentUser?.username||'guest'}`)||'[]');document.getElementById('notesList').innerHTML=notes.length===0?'<p style="color:var(--text-muted);text-align:center;padding:2rem">Нет заметок.</p>':notes.slice().reverse().map(n=>`<div class="note-card"><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p><div class="note-card-footer"><span class="note-date">${fmtDate(n.date)}</span><button class="btn btn-sm btn-danger" onclick="deleteNote('${n.id}')">Удалить</button></div></div>`).join('')}
function addNote(){if(!currentUser){alert('Войдите в аккаунт');return}const t=document.getElementById('noteTitle').value.trim(),x=document.getElementById('noteText').value.trim();if(!t||!x){alert('Заполните всё');return}const notes=JSON.parse(localStorage.getItem(`plantifi_notes_${currentUser.username}`)||'[]');notes.push({id:String(Date.now()),title:t,text:x,date:new Date().toISOString()});localStorage.setItem(`plantifi_notes_${currentUser.username}`,JSON.stringify(notes));document.getElementById('noteTitle').value='';document.getElementById('noteText').value='';renderNotes()}
function deleteNote(id){const k=`plantifi_notes_${currentUser?.username||'guest'}`;const n=JSON.parse(localStorage.getItem(k)||'[]');localStorage.setItem(k,JSON.stringify(n.filter(x=>x.id!==id)));renderNotes()}

/* ─── CALENDAR ─── */
function renderCalendar(){const y=calendarDate.getFullYear(),m=calendarDate.getMonth();const months=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];document.getElementById('calendarMonth').textContent=`${months[m]} ${y}`;const grid=document.getElementById('calendarGrid');const fd=new Date(y,m,1).getDay();const dim=new Date(y,m+1,0).getDate();const today=new Date();const events=JSON.parse(localStorage.getItem(`plantifi_events_${currentUser?.username||'guest'}`)||'[]');const colors={water:'#42a5f5',fertilize:'#66bb6a',repot:'#ffa726',prune:'#ef5350',harvest:'#ab47bc'};let html=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d=>`<div class="cal-header">${d}</div>`).join('');const sd=fd===0?6:fd-1;for(let i=0;i<sd;i++)html+='<div class="cal-day empty"></div>';for(let d=1;d<=dim;d++){const ds=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;const isT=d===today.getDate()&&m===today.getMonth()&&y===today.getFullYear();const dayEv=events.filter(e=>e.date===ds);html+=`<div class="cal-day ${isT?'today':''} ${selectedCalDate===ds?'selected':''}" onclick="selectCalDate('${ds}')"><span>${d}</span><div class="cal-day-events">${dayEv.slice(0,3).map(e=>`<div class="cal-day-event" style="background:${colors[e.type]||'#999'}"></div>`).join('')}</div></div>`}grid.innerHTML=html;renderCalendarEvents()}
function changeMonth(d){calendarDate.setMonth(calendarDate.getMonth()+d);renderCalendar()}
function selectCalDate(ds){selectedCalDate=ds;document.getElementById('calendarEventForm').style.display='block';document.getElementById('eventDate').textContent=fmtDate(ds);renderCalendar()}
function updateCalendarForm(){const s=document.getElementById('eventPlant');s.innerHTML='<option value="">Растение...</option>'+PLANTS.map(p=>`<option value="${p.id}">${p.emoji} ${p.name}</option>`).join('')}
function addCalendarEvent(){if(!currentUser){alert('Войдите в аккаунт');return}const plantId=document.getElementById('eventPlant').value,type=document.getElementById('eventType').value,note=document.getElementById('eventNote').value;if(!selectedCalDate){alert('Выберите дату');return}const events=JSON.parse(localStorage.getItem(`plantifi_events_${currentUser.username}`)||'[]');events.push({id:Date.now(),date:selectedCalDate,plantId:+plantId,type,note});localStorage.setItem(`plantifi_events_${currentUser.username}`,JSON.stringify(events));document.getElementById('eventNote').value='';document.getElementById('calendarEventForm').style.display='none';selectedCalDate=null;renderCalendar()}
function renderCalendarEvents(){const events=JSON.parse(localStorage.getItem(`plantifi_events_${currentUser?.username||'guest'}`)||'[]');const me=events.filter(e=>{const d=new Date(e.date);return d.getMonth()===calendarDate.getMonth()&&d.getFullYear()===calendarDate.getFullYear()}).sort((a,b)=>a.date.localeCompare(b.date));const icons={water:'💧',fertilize:'🧪',repot:'🪴',prune:'✂️',harvest:'🧺'};document.getElementById('calendarEvents').innerHTML=me.length===0?'<p style="color:var(--text-muted);text-align:center">Нет событий</p>':'<h3>События:</h3>'+me.map(e=>`<div class="cal-event"><div class="cal-event-icon">${icons[e.type]||'📌'}</div><div class="cal-event-info"><div class="cal-event-plant">${getPlantEmoji(e.plantId)} ${getPlantName(e.plantId)}</div><div class="cal-event-note">${fmtDate(e.date)}${e.note?' • '+esc(e.note):''}</div></div><button class="btn btn-sm btn-danger" onclick="deleteEvent(${e.id})">✕</button></div>`).join('')}
function deleteEvent(id){const k=`plantifi_events_${currentUser?.username||'guest'}`;const e=JSON.parse(localStorage.getItem(k)||'[]');localStorage.setItem(k,JSON.stringify(e.filter(x=>x.id!==id)));renderCalendar()}

/* ─── COMMUNITY ─── */
let communityFilter='all';
function renderCommunity(){const posts=JSON.parse(localStorage.getItem('plantifi_community')||'[]');const f=communityFilter==='all'?posts:posts.filter(p=>p.category===communityFilter);const catC={tip:'#66bb6a',question:'#42a5f5',success:'#ffd54f',problem:'#ef5350'};const catL={tip:'💡 Совет',question:'❓ Вопрос',success:'🎉 Успех',problem:'⚠️ Проблема'};document.getElementById('communityFeed').innerHTML=f.length===0?'<p style="color:var(--text-muted);text-align:center;padding:2rem">Нет постов.</p>':f.slice().reverse().map(p=>`<div class="post-card"><div class="post-header"><span class="post-author">👤 ${esc(p.author)}</span><span class="post-category-badge" style="background:${catC[p.category]||'#666'};color:white">${catL[p.category]||p.category}</span></div><div class="post-text">${esc(p.text)}</div><div class="post-footer"><span class="post-date">${fmtDate(p.date)}</span><div><button class="post-action" onclick="likePost(${p.id})">👍 ${p.likes||0}</button></div></div></div>`).join('')}
function addCommunityPost(){if(!currentUser){alert('Войдите в аккаунт');return}const text=document.getElementById('communityPost').value.trim(),category=document.getElementById('postCategory').value;if(!text){alert('Введите текст');return}const posts=JSON.parse(localStorage.getItem('plantifi_community')||'[]');posts.push({id:Date.now(),author:currentUser.username,text,category,likes:0,date:new Date().toISOString()});localStorage.setItem('plantifi_community',JSON.stringify(posts));document.getElementById('communityPost').value='';renderCommunity()}
function likePost(id){const p=JSON.parse(localStorage.getItem('plantifi_community')||'[]');const x=p.find(y=>y.id===id);if(x){x.likes=(x.likes||0)+1;localStorage.setItem('plantifi_community',JSON.stringify(p));renderCommunity()}}
function filterPosts(cat,btn){communityFilter=cat;btn.parentElement.querySelectorAll('.filter-tag').forEach(t=>t.classList.remove('active'));btn.classList.add('active');renderCommunity()}

/* ─── HELPERS ─── */
function getPlantName(id){const p=PLANTS.find(x=>x.id===id);return p?p.name:'?'}
function getPlantEmoji(id){const p=PLANTS.find(x=>x.id===id);return p?p.emoji:'🌿'}
function fmtDate(ds){if(!ds)return'';return new Date(ds).toLocaleDateString('ru-RU',{day:'numeric',month:'short',year:'numeric'})}
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}
