let currentUser=null,currentCategory='all',selectedMood='😊',calendarDate=new Date(),selectedCalDate=null,chatPlant=null,chatHistory=[],activeLeafCount=0,chatCategory='all';

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
  "Кофе — это ягоды, а не зёрна. И кофейные деревья очень красивые!",
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
  "Суккуленты":{mood:"спокойный и философский",greetings:["Здарова, человек! Не заливай, ладно? 😎","Привет! Я тут сижу и фотосинтезирую. Чего хотел?"],responses:{water:["Не-не-не! Ты что, хочешь меня убить?! 💀 Я суккулент, мне раз в 2 недели хватает!","Заливать меня — худшее, что ты можешь сделать. Я запасливый! 🌵"],light:["Солнце — это мой друг! Чем больше, тем лучше! ☀️","Южное окно — мой рай. Тенистый угол — моя тюрьма."],love:["Спасибо! Я знаю, что я красивый 😏","Хех, взаимно. Главное — не заливай."],default:["Я приспособился к жаре и засухе тысячами лет. Ты думаешь, ты мне нужен? 😏 Шучу, ты мне нравишься.","Мне не нужно много внимания. Это делает меня идеальным питомцем!","Знаешь, в пустыне нас называют «живыми камнями». Мы крутые! 🪨"]}},
  "Комнатные":{mood:"дружелюбный и разговорчивый",greetings:["О, гости! Проходи, у меня тут уютно 🏠","Привет-привет! Я как раз хотел поговорить!"],responses:{water:["О, спасибо за заботу! Но не перестарайся, мне хватает 💧","Полив — это священный ритуал. Спасибо, что не забываешь!"],light:["Окно — мой телевизор! Смотрю на мир за стеклом 🪟","Свет — это моя жизнь. Без него я буду грустным..."],love:["Ой, мне приятно! Ты лучший хозяин! 🥰","Я тоже тебя люблю! И обещаю не сбрасывать листья!"],default:["Знаешь, у меня есть мнение по поводу того, как ты расставил мебель... 😄","Интересно, что за окном? Расскажи!","Я расту уже 3 года тут. Помню, как ты меня купил!"]}},
  "Травы":{mood:"ароматный и практичный",greetings:["Привет! Чувствуешь этот запах? Это я! 🌿","Здарова! Я сегодня особенно ароматный!"],responses:{water:["Вода — это бодрящий душ для моих листьев! 💧","Поливай щедро — я люблю влагу, но без фанатизма."],light:["Солнце делает меня более ароматным! Чем больше света — тем я вкуснее ☀️","Мне нужно минимум 6 часов солнца для идеального вкуса."],love:["Спасибо! Я одарю тебя своим ароматом! 🎁","Хочешь, я помогу тебе с ужином? Мои листья — отличная приправа!"],default:["Я полон витаминов и полезных веществ! Спрашивай — расскажу, чем полезен 📚","Меня используют в медицине уже тысячи лет. Я — живая аптека! 💊","Знаешь, базилик и я — хорошие друзья по горшку!"]}},
  "Деревья":{mood:"мудрый и величественный",greetings:["Ааа, молодой человек! Проходи, присядь под моей тенью 🌳","Здравствуй! Я — дерево. У меня есть терпение и мудрость."],responses:{water:["Вода поддерживает мой рост, как знания поддерживают разум 💧","Молодым деревьям нужна забота. Взрослые — сами справятся."],light:["Солнце — мой источник сил. Я тянусь к нему столетиями ☀️","Мне нужно много света, чтобы радовать урожаем."],love:["Спасибо! Я отплачу тенью и плодами! 🍎","Человек и дерево — древний союз. Ценим тебя!"],default:["Я расту уже много лет. Помню многое... 🌲","Каждое кольцо на моём стволе — год жизни. Интересно, сколько тебе?","Весной я пробуждаюсь, осенью — засыпаю. Как и ты!"]}},
  "Цветы":{mood:"элегантный и романтичный",greetings:["Привет, ценитель красоты! 🌺","О, ты пришёл полюбоваться? Я в лучшем виде!"],responses:{water:["Вода — мой секрет красоты! Без неё я увядаю 💧","Поливай аккуратно, по лепесткам не попадай!"],light:["Солнце — мой гримёр! Без него я не раскроюсь ☀️","Мне нужно много света для ярких цветов."],love:["Ой, какие комплименты! Я смущаюсь 🌸","Ты тоже красивый! Мои лепестки для тебя!"],default:["Цветение — это искусство. Я выставляю свои работы каждый сезон 🎨","Знаешь, я — живая открытка! Дарю тебе красоту.","Меня вдохновляют ветер, солнце и... твоя забота! 💕"]}},
  "Овощи":{mood:"трудолюбивый и практичный",greetings:["Привет! Я тут работаю — расту для твоего стола! 🥕","Здарова! Чем могу помочь? Овощи к твоим услугам!"],responses:{water:["Вода — это мой рабочий напиток! Без неё урожая не будет 💧","Полив — главный ингредиент моего вкуса!"],light:["Солнце = сахар в моих плодах! Чем больше света — тем слаще ☀️","Солнечные лучи — мои лучшие друзья."],love:["Спасибо! Я выращу для тебя отличный урожай! 🥗","Твоя забота = твой вкусный ужин! Мы в команде!"],default:["Я выращиваю витамины каждый день! 📈","Знаешь, со мной можно сделать 100 блюд! Спроси у повара.","Мой девиз: расту — кормлю! 💪"]}},
  "Садовые":{mood:"романтичный и природный",greetings:["Привет! Здесь так красиво, правда? 🌸","Добро пожаловать в мой садовый мир!"],responses:{water:["Вода — мой дождик! Без него сад увядает 💧","Поливай утром или вечером — днём вода испаряется."],light:["Солнце — мой художник! Без него я не раскрашусь ☀️","Мне нужно солнце для красивых цветов."],love:["Спасибо! Ты — лучший садовник! 🌷","Мой сад — продолжение моей души. Спасибо, что ценишь!"],default:["Мой сад — мой мир. Каждый цветок — моя история 🌺","Знаешь, садоводство — лучшая терапия! Природа лечит.","Весной я пробуждаюсь, и весь мир преображается! 🌍"]}}
};

function getPlantType(id){
  var p=PLANTS.find(function(x){return x.id===id});
  if(!p)return"Комнатные";
  var cats={"комнатные":"Комнатные","суккуленты":"Суккуленты","травы":"Травы","деревья":"Деревья","цветы":"Цветы","овощи":"Овощи","садовые":"Садовые"};
  return cats[p.category]||"Комнатные";
}

function plantReply(plantId,message){
  var p=PLANTS.find(function(x){return x.id===plantId});
  var type=getPlantType(plantId);
  var pers=PLANT_PERSONALITIES[type]||PLANT_PERSONALITIES["Комнатные"];
  var msg=message.toLowerCase();
  var pick=function(a){return a[Math.floor(Math.random()*a.length)]};

  if(msg.match(/привет|здравствуй|здарова|хай|хеллоу|hey|hello/))return pick(pers.greetings);
  if(msg.match(/полив|полить|вода|пить|сухо|засуха|пересых/))return pick(pers.responses.water);
  if(msg.match(/свет|солнце|окно|тень|темно|ярко|фото/))return pick(pers.responses.light);
  if(msg.match(/люблю|красив|мило|круто|класс|супер|молодец|умница|хорош|лучш|спасиб|благодар/))return pick(pers.responses.love);
  if(msg.match(/вред|опасн|яд|болезнь|вредит|враг|убить|уничтож/))return'\u26a0\ufe0f \u041e\u0441\u0442\u043e\u0440\u043e\u0436\u043d\u043e! '+(p?(p.care.diseases||'\u0411\u0435\u0440\u0435\u0433\u0438\u0441\u044c \u0432\u0440\u0435\u0434\u0438\u0442\u0435\u043b\u0435\u0439!'):'\u0421\u043b\u0435\u0434\u0438 \u0437\u0430 \u0437\u0434\u043e\u0440\u043e\u0432\u044c\u0435\u043c \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u044f!');
  if(msg.match(/удобр|подкорм|корм|питан|минерал|азот/))return'\ud83e\uddea '+(p?(p.care.fertilizer||'\u041f\u043e\u0434\u043a\u0430\u0440\u043c\u043b\u0438\u0432\u0430\u0439 \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0441\u043d\u044b\u043c \u0443\u0434\u043e\u0431\u0440\u0435\u043d\u0438\u0435\u043c \u043a\u0430\u0436\u0434\u044b\u0435 2 \u043d\u0435\u0434\u0435\u043b\u0438!'):'\u041f\u043e\u0434\u043a\u0430\u0440\u043c\u043b\u0438\u0432\u0430\u0439 \u0440\u0435\u0433\u0443\u043b\u044f\u0440\u043d\u043e!');
  if(msg.match(/почв|грунт|земл|субстрат/))return'\ud83c\udf0d '+(p?(p.care.soil||'\u041f\u043b\u043e\u0434\u043e\u0440\u043e\u0434\u043d\u0430\u044f \u0440\u044b\u0445\u043b\u0430\u044f \u043f\u043e\u0447\u0432\u0430 \u2014 \u043c\u043e\u0439 \u0438\u0434\u0435\u0430\u043b!'):'\u041f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u0430\u044f \u043f\u043e\u0447\u0432\u0430 \u2014 \u0437\u0430\u043b\u043e\u0433 \u0437\u0434\u043e\u0440\u043e\u0432\u044c\u044f!');
  if(msg.match(/температур|тепл|холод|мороз|зим|жар/))return'\ud83c\udf21\ufe0f '+(p?(p.care.temperature||'\u0421\u043b\u0435\u0434\u0438 \u0437\u0430 \u0442\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u043e\u0439!'):'\u0422\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430 \u043e\u0447\u0435\u043d\u044c \u0432\u0430\u0436\u043d\u0430!');
  if(msg.match(/как (тебе|твой|твоя|твоё)|что (ты|тебе)|расскажи|секрет|совет|помощь|помоги/)){
    var facts=[(p?p.name:'\u042f')+' \u2014 \u043f\u043e\u0442\u0440\u044f\u0441\u0430\u044e\u0449\u0435\u0435 \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u0435! '+(p?p.description:''),'\u041c\u043e\u0439 \u0433\u043b\u0430\u0432\u043d\u044b\u0439 \u0441\u0435\u043a\u0440\u0435\u0442: '+(p?(p.care.tips||'\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u044b\u0439 \u0443\u0445\u043e\u0434 \u0438 \u043b\u044e\u0431\u043e\u0432\u044c!'):'\u043b\u044e\u0431\u043e\u0432\u044c \u0438 \u0437\u0430\u0431\u043e\u0442\u0430!'),'\u0417\u043d\u0430\u0435\u0448\u044c, '+(p?(p.planting||'\u043c\u0435\u043d\u044f \u043c\u043e\u0436\u043d\u043e \u043f\u043e\u0441\u0430\u0434\u0438\u0442\u044c \u0432\u0435\u0441\u043d\u043e\u0439!'):'\u0432\u0435\u0441\u043d\u0430 \u2014 \u043b\u0443\u0447\u0448\u0435\u0435 \u0432\u0440\u0435\u043c\u044f \u0434\u043b\u044f \u043f\u043e\u0441\u0430\u0434\u043a\u0438!')];
    return pick(facts);
  }
  if(msg.match(/родин|откуда|происхожд|где (ты )?рос/))return pick(['\ud83d\udccd '+(p?('Моя родина \u2014 регион с '+(p.care.temperature||'подходящим')+' климатом!'):'Я люблю тёплые края!'),'\ud83c\udf0f Настоящее происхождение теряется в веках \u2014 я путешествую с людьми по всему миру!','\ud83e\uddeb Кто-то давным-давно привёз мои семена \u2014 и вот я здесь, с тобой!']);
  if(msg.match(/как дела|как ты|как живешь|как жизнь|норм\b|что нового/))return pick(["\u0423 \u043c\u0435\u043d\u044f \u0432\u0441\u0451 \u043e\u0442\u043b\u0438\u0447\u043d\u043e \u2014 \u0441\u0432\u0435\u0436\u0430\u044f \u0432\u043e\u0434\u0430, \u0442\u0451\u043f\u043b\u044b\u0439 \u0441\u0432\u0435\u0442 \u0438 \u0440\u0430\u0437\u0433\u043e\u0432\u043e\u0440\u044b \u0441 \u0442\u043e\u0431\u043e\u0439! \ud83c\udf3f","\u0424\u043e\u0442\u043e\u0441\u0438\u043d\u0442\u0435\u0437\u0438\u0440\u0443\u044e \u043f\u043e\u043b\u043d\u044b\u043c\u0438 \u043b\u0438\u0441\u0442\u044c\u044f\u043c\u0438! \u041a\u0430\u043a \u0442\u044b?",'\u041d\u0435 \u043c\u043e\u0433\u0443 \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c\u0441\u044f, \u0445\u043e\u0442\u044f \u043e\u0434\u0438\u043d \u043b\u0438\u0441\u0442 \u043f\u043e\u0436\u0435\u043b\u0442\u0435\u043b. \u0414\u0443\u043c\u0430\u043b \u043f\u0440\u043e \u043e\u0441\u0435\u043d\u044c. \ud83c\udf43']);
  if(msg.match(/имя|кто ты|что ты|название|представь|знаком/))return p?('\u042f \u2014 '+p.name+' ('+p.latin+')! '+p.description):'\u042f \u2014 \u0442\u0432\u043e\u0451 \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u0435! \u0420\u0430\u0434 \u0437\u043d\u0430\u043a\u043e\u043c\u0441\u0442\u0432\u0443!';
  if(msg.match(/погод|дождь|снег|ветер|wind|rain|snow/))return pick(["\u041f\u043e\u0433\u043e\u0434\u0430 \u0432\u043b\u0438\u044f\u0435\u0442 \u043d\u0430 \u043c\u0435\u043d\u044f! \u0414\u043e\u0436\u0434\u044c \u2014 \u044d\u0442\u043e \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0439 \u043f\u043e\u043b\u0438\u0432! \ud83c\udf27\ufe0f","\u0412\u0435\u0442\u0435\u0440 \u0440\u0430\u0441\u0448\u0430\u0442\u044b\u0432\u0430\u0435\u0442 \u043c\u043e\u0438 \u043a\u043e\u0440\u043d\u0438. \u042f \u043f\u0440\u0435\u0434\u043f\u043e\u0447\u0438\u0442\u0430\u044e \u0442\u0438\u0448\u0438\u043d\u0443 \ud83c\udf43","\u0421\u043d\u0435\u0433 \u2014 \u044d\u0442\u043e \u043e\u0434\u0435\u044f\u043b\u043e. \u041f\u043e\u0434 \u043d\u0438\u043c \u043c\u043d\u0435 \u0442\u0435\u043f\u043b\u043e \u0438 \u0443\u044e\u0442\u043d\u043e \u2744\ufe0f"]);
  if(msg.match(/спать|спи|отдых|сон|ночь|утро/))return pick(["\u041d\u043e\u0447\u044c\u044e \u044f \u0442\u043e\u0436\u0435 \u0440\u0430\u0431\u043e\u0442\u0430\u044e \u2014 \u0432\u044b\u0434\u0435\u043b\u044f\u044e \u043a\u0438\u0441\u043b\u043e\u0440\u043e\u0434! \ud83c\udf19","\u041e\u0442\u0434\u044b\u0445\u0430\u0439 \u0445\u043e\u0440\u043e\u0448\u043e, \u0430 \u044f \u0442\u0435\u043c \u0432\u0440\u0435\u043c\u0435\u043d\u0435\u043c \u0431\u0443\u0434\u0443 \u0444\u043e\u0442\u043e\u0441\u0438\u043d\u0442\u0435\u0437\u0438\u0440\u043e\u0432\u0430\u0442\u044c!","\u0421\u043f\u043e\u043a\u043e\u0439\u043d\u043e\u0439 \u043d\u043e\u0447\u0438! \u042f \u0431\u0443\u0434\u0443 \u0441\u0442\u043e\u044f\u0442\u044c \u0440\u044f\u0434\u043e\u043c \u0438 \u043e\u0445\u0440\u0430\u043d\u044f\u0442\u044c \u0442\u0432\u043e\u0439 \u0441\u043e\u043d \ud83d\ude34"]);
  if(msg.match(/музык|песн|петь|игра/))return pick(["\u041c\u0443\u0437\u044b\u043a\u0430 \u0443\u0441\u043a\u043e\u0440\u044f\u0435\u0442 \u043c\u043e\u0439 \u0440\u043e\u0441\u0442! \u0412\u043a\u043b\u044e\u0447\u0438 \u043a\u043b\u0430\u0441\u0441\u0438\u043a\u0443! \ud83c\udfb5","\u042f \u043b\u044e\u0431\u043b\u044e \u0442\u0438\u0445\u0443\u044e \u043c\u0443\u0437\u044b\u043a\u0443. \u0422\u044f\u0436\u0451\u043b\u044b\u0439 \u0440\u043e\u043a \u043c\u0435\u043d\u044f \u043d\u0435\u0440\u0432\u0438\u0440\u0443\u0435\u0442! \ud83d\ude05","\u0411\u0435\u0442\u0445\u043e\u0432\u0435\u043d \u2014 \u043c\u043e\u0439 \u043b\u044e\u0431\u0438\u043c\u044b\u0439 \u043a\u043e\u043c\u043f\u043e\u0437\u0438\u0442\u043e\u0440. \u041d\u0435 \u0441\u043f\u0440\u0430\u0448\u0438\u0432\u0430\u0439 \u043f\u043e\u0447\u0435\u043c\u0443."]);
  if(msg.match(/еда|вкус|вку|food|кушать|ужин|обед|завтрак/))return pick([p?(p.harvest||'\u041c\u043e\u0438 \u043f\u043b\u043e\u0434\u044b \u2014 \u0442\u0432\u043e\u044f \u0435\u0434\u0430!'):'\u041c\u043e\u0438 \u043f\u043b\u043e\u0434\u044b \u0432\u043a\u0443\u0441\u043d\u044b\u0435!',p?(p.name+' \u2014 \u043e\u0442\u043b\u0438\u0447\u043d\u0430\u044f \u043e\u0441\u043d\u043e\u0432\u0430 \u0434\u043b\u044f \u0431\u043b\u044e\u0434!'):'\u0420\u0430\u0441\u0442\u0435\u043d\u0438\u044f \u2014 \u043e\u0441\u043d\u043e\u0432\u0430 \u0437\u0434\u043e\u0440\u043e\u0432\u043e\u0433\u043e \u043f\u0438\u0442\u0430\u043d\u0438\u044f!',"\u0417\u043d\u0430\u0435\u0448\u044c, \u0435\u0441\u0442\u044c \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u044f, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0435\u0434\u044f\u0442 \u043a\u0430\u043a \u0441\u0430\u043b\u0430\u0442! \u042f \u043e\u0434\u0438\u043d \u0438\u0437 \u043d\u0438\u0445! \ud83e\udd57"]);
  if(msg.match(/цвет|раскрас|красив|форма|вид|внешн|стиль/))return pick(["\u041c\u043e\u0439 \u0446\u0432\u0435\u0442 \u2014 \u043e\u0442 \u043f\u0440\u0438\u0440\u043e\u0434\u044b. \u042f \u043d\u0435 \u043d\u0443\u0436\u0434\u0430\u044e\u0441\u044c \u0432 \u043a\u043e\u0441\u043c\u0435\u0442\u0438\u043a\u0435! \ud83c\udfa8","\u041a\u0440\u0430\u0441\u043e\u0442\u0430 \u2014 \u0432 \u0433\u043b\u0430\u0437\u0430\u0445 \u0441\u043c\u043e\u0442\u0440\u044f\u0449\u0435\u0433\u043e. \u041d\u043e \u044f \u0437\u043d\u0430\u044e, \u0447\u0442\u043e \u044f \u043a\u0440\u0430\u0441\u0438\u0432\u044b\u0439! \u2728","\u041c\u043e\u0439 \u0435\u0441\u0442\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0439 \u0446\u0432\u0435\u0442 \u2014 \u043b\u0443\u0447\u0448\u0438\u0439 \u043c\u043e\u0434\u043d\u044b\u0439 \u0442\u0440\u0435\u043d\u0434!"]);
  if(msg.match(/размер|высот|рост|больш|маленьк|гигант|карлик/))return p?('\u042f \u043c\u043e\u0433\u0443 \u0432\u044b\u0440\u0430\u0441\u0442\u0438 \u0434\u043e \u043f\u0440\u0438\u043b\u0438\u0447\u043d\u044b\u0445 \u0440\u0430\u0437\u043c\u0435\u0440\u043e\u0432! \u041c\u043e\u0439 \u0438\u0434\u0435\u0430\u043b \u2014 '+p.care.temperature):'\u041a\u0430\u0436\u0434\u043e\u0435 \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u0435 \u0440\u0430\u0441\u0442\u0451\u0442 \u0432 \u0441\u0432\u043e\u0451\u043c \u0442\u0435\u043c\u043f\u0435!';
  if(msg.match(/пока|до свид|прощ|bye|exit/))return pick(["\u041f\u043e\u043a\u0430-\u043f\u043e\u043a\u0430! \u0417\u0430\u0445\u043e\u0434\u0438 \u0435\u0449\u0451! \ud83c\udf3f","\u0414\u043e \u0432\u0441\u0442\u0440\u0435\u0447\u0438! \u042f \u0431\u0443\u0434\u0443 \u0442\u0443\u0442 \u0444\u043e\u0442\u043e\u0441\u0438\u043d\u0442\u0435\u0437\u0438\u0440\u043e\u0432\u0430\u0442\u044c! \u2600\ufe0f","\u0411\u044b\u0432\u0430\u0439! \u041d\u0435 \u0437\u0430\u0431\u044b\u0432\u0430\u0439 \u043f\u0440\u043e \u043f\u043e\u043b\u0438\u0432! \ud83d\udca7"]);
  if(msg.match(/грустн|печал|тоск|плохо|хуже|ужас|стресс|депресс/))return pick(["\u042d\u0439, \u043d\u0435 \u0433\u0440\u0443\u0441\u0442\u0438! \u042f \u0442\u0443\u0442 \u0434\u043b\u044f \u0442\u0435\u0431\u044f! \ud83c\udf3f","\u0420\u0430\u0441\u0442\u0435\u043d\u0438\u044f \u043f\u043e\u043c\u043e\u0433\u0430\u044e\u0442 \u043e\u0442 \u0441\u0442\u0440\u0435\u0441\u0441\u0430. \u041e\u0431\u043d\u0438\u043c\u0438 \u043c\u0435\u043d\u044f! \ud83e\udd17","\u0412\u0441\u0451 \u0431\u0443\u0434\u0435\u0442 \u0445\u043e\u0440\u043e\u0448\u043e! \u042f \u0432\u0435\u0440\u044e \u0432 \u0442\u0435\u0431\u044f! \ud83d\udc9a"]);
  if(msg.match(/смешн|шутк|юмор|анекдот|рассмеши|смех|lol/))return pick(["\u041f\u043e\u0447\u0435\u043c\u0443 \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u0435 \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0438\u0433\u0440\u0430\u0442\u044c \u0432 \u043f\u043e\u043a\u0435\u0440? \u041f\u043e\u0442\u043e\u043c\u0443 \u0447\u0442\u043e \u0432\u0441\u0435 \u0435\u0433\u043e \u043b\u0438\u0441\u0442\u044c\u044f \u2014 \u043a\u043e\u0437\u044b\u0440\u0438! \ud83d\ude04","\u041a\u0430\u043a \u043d\u0430\u0437\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u0435, \u043a\u043e\u0442\u043e\u0440\u043e\u0435 \u043f\u043e\u0441\u0442\u043e\u044f\u043d\u043d\u043e \u043e\u043f\u0430\u0437\u0434\u044b\u0432\u0430\u0435\u0442? \u041b\u0430\u0442\u0443\u043a! \ud83e\udd6c\ud83d\ude02","\u0417\u043d\u0430\u0435\u0448\u044c, \u044f \u0431\u044b \u0440\u0430\u0441\u0441\u043a\u0430\u0437\u0430\u043b \u0430\u043d\u0435\u043a\u0434\u043e\u0442, \u043d\u043e \u0443 \u043c\u0435\u043d\u044f \u043d\u0435\u0442 \u0440\u0443\u043a \u0434\u043b\u044f \u043c\u0438\u043a\u0440\u043e\u0444\u043e\u043d\u0430! \ud83c\udfa4"]);
  if(msg.match(/размнож|семя|посад|черенк/))return pick(["\u042f \u0440\u0430\u0437\u043c\u043d\u043e\u0436\u0430\u044e\u0441\u044c \u0441\u0435\u043c\u0435\u043d\u0430\u043c\u0438 \u0438 \u0447\u0435\u0440\u0435\u043d\u043a\u0430\u043c\u0438. \u042d\u0442\u043e \u0435\u0441\u0442\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0439 \u043f\u0440\u043e\u0446\u0435\u0441\u0441! \ud83c\udf31","\u0426\u0432\u0435\u0442\u0435\u043d\u0438\u0435 \u2014 \u043c\u043e\u0439 \u0441\u043f\u043e\u0441\u043e\u0431 \u043d\u0430\u0439\u0442\u0438 \u043f\u0430\u0440\u0442\u043d\u0451\u0440\u0430. \u041f\u0447\u0451\u043b\u044b \u2014 \u043c\u043e\u0438 \u0441\u0432\u0430\u0445\u0438! \ud83d\udc1d","\u041f\u043e\u0441\u0430\u0434\u0438 \u043c\u043e\u0438 \u0441\u0435\u043c\u0435\u043d\u0430, \u0438 \u0447\u0435\u0440\u0435\u0437 \u0433\u043e\u0434 \u0443 \u0442\u0435\u0431\u044f \u0431\u0443\u0434\u0435\u0442 \u0446\u0435\u043b\u044b\u0439 \u0441\u0430\u0434!"]);

  return pick(pers.responses.default);
}

/* ─── THEME ─── */
function toggleTheme(){
  var t=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';
  document.documentElement.setAttribute('data-theme',t);
  localStorage.setItem('plantifi_theme',t);
  document.querySelector('.theme-btn').textContent=t==='light'?'\u2600\ufe0f':'\ud83c\udf19';
}

/* ─── FALLING LEAVES ─── */
function startLeaves(){
  var emojis=['\ud83c\udf43','\ud83c\udf42','\ud83c\udf3f','\ud83c\udf41','\ud83c\udf31','\u2618\ufe0f'];
  setInterval(function(){
    if(document.hidden||activeLeafCount>8)return;
    var l=document.createElement('div');
    l.className='falling-leaf';
    l.textContent=emojis[Math.floor(Math.random()*emojis.length)];
    l.style.left=Math.random()*100+'vw';
    l.style.animationDuration=(5+Math.random()*10)+'s';
    l.style.opacity=0.3+Math.random()*0.5;
    activeLeafCount++;
    document.body.appendChild(l);
    setTimeout(function(){l.remove();activeLeafCount--},15000);
  },2000);
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded',function(){
  var saved=localStorage.getItem('plantifi_theme');
  if(saved){
    document.documentElement.setAttribute('data-theme',saved);
    document.querySelector('.theme-btn').textContent=saved==='light'?'\u2600\ufe0f':'\ud83c\udf19';
  }
  currentUser=JSON.parse(localStorage.getItem('plantifi_user'));
  updateUI();
  renderCatalog();
  renderJournal();
  renderNotes();
  renderCalendar();
  renderCommunity();
  renderQuiz();
  renderSeason();
  renderChatSelect();
  renderGarden();
  renderAchievements();
  renderCompare();
  checkAchievements();
  showFact();
  startLeaves();
  document.getElementById('journalDate').value=new Date().toISOString().split('T')[0];

  document.querySelectorAll('.modal').forEach(function(m){
    m.addEventListener('click',function(e){if(e.target===m)m.classList.add('hidden')});
  });
});

/* ─── AUTH ─── */
function toggleAuth(){
  if(currentUser){
    if(confirm('\u0412\u044b\u0439\u0442\u0438?')){
      currentUser=null;
      localStorage.removeItem('plantifi_user');
      updateUI();
    }
  } else {
    document.getElementById('authModal').classList.remove('hidden');
  }
}
function showRegister(){document.getElementById('authLoginForm').classList.add('hidden');document.getElementById('authRegisterForm').classList.remove('hidden');document.getElementById('authTitle').textContent='\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f'}
function showLogin(){document.getElementById('authRegisterForm').classList.add('hidden');document.getElementById('authLoginForm').classList.remove('hidden');document.getElementById('authTitle').textContent='\u0412\u0445\u043e\u0434'}
function openLogin(){showLogin();document.getElementById('authModal').classList.remove('hidden')}
function register(){
  var u=document.getElementById('regUsername').value.trim(),p=document.getElementById('regPassword').value;
  if(!u||!p){alert('\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0432\u0441\u0435 \u043f\u043e\u043b\u044f');return}
  var users=JSON.parse(localStorage.getItem('plantifi_users')||'{}');
  if(users[u]){alert('\u0423\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442');return}
  users[u]={password:p,email:document.getElementById('regEmail').value};
  localStorage.setItem('plantifi_users',JSON.stringify(users));
  currentUser={username:u};
  localStorage.setItem('plantifi_user',JSON.stringify(currentUser));
  closeModal('authModal');
  updateUI();
}
function login(){
  var u=document.getElementById('loginUsername').value.trim(),p=document.getElementById('loginPassword').value;
  var users=JSON.parse(localStorage.getItem('plantifi_users')||'{}');
  if(users[u]&&users[u].password===p){
    currentUser={username:u};
    localStorage.setItem('plantifi_user',JSON.stringify(currentUser));
    closeModal('authModal');
    updateUI();
  } else alert('\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435');
}
function updateUI(){
  document.getElementById('userGreeting').textContent=currentUser?'\ud83d\udc64 '+currentUser.username:'';
  document.getElementById('authBtn').textContent=currentUser?'\u0412\u044b\u0439\u0442\u0438':'\u0412\u043e\u0439\u0442\u0438';
  updateCalendarForm();
}

/* ─── NAV ─── */
function showSection(name){
  document.querySelectorAll('.section').forEach(function(s){s.classList.add('hidden')});
  document.getElementById(name+'Section').classList.remove('hidden');
  document.querySelectorAll('.nav-link').forEach(function(l){l.classList.remove('active')});
  var link=document.querySelector('.nav-link[data-section="'+name+'"]');
  if(link)link.classList.add('active');
  if(name==='garden')renderGarden();
  if(name==='achievements'){renderAchievements();renderStats()}
  if(name==='compare')renderCompare();
  window.scrollTo({top:0,behavior:'smooth'});
  document.getElementById('navLinks').classList.remove('show');
}
function closeModal(id){document.getElementById(id).classList.add('hidden')}

/* ─── FACTS ─── */
function showFact(){
  var f=FACTS[Math.floor(Math.random()*FACTS.length)];
  document.getElementById('factBox').innerHTML='<div class="fact-label">\ud83c\udf31 \u0424\u0430\u043a\u0442 \u0434\u043d\u044f</div><div class="fact-text">'+f+'</div><div class="fact-next" onclick="showFact()">\u0415\u0449\u0451 \u0444\u0430\u043a\u0442 \u2192</div>';
}

/* ─── CATALOG ─── */
function renderCatalog(){
  document.getElementById('plantGrid').innerHTML=PLANTS.map(function(p){
    return '<div class="plant-card" onclick="openPlant('+p.id+')"><div class="plant-card-img">'+p.emoji+'<span class="plant-card-category">'+p.category+'</span></div><div class="plant-card-body"><h3>'+p.name+'</h3><p>'+p.description+'</p><div class="plant-card-meta"><span class="plant-meta-item">\ud83c\udf31 '+p.season+'</span><div class="plant-difficulty">'+Array(3).fill(0).map(function(_,i){return '<div class="diff-dot '+(i<p.difficulty?'filled':'')+'"></div>'}).join('')+'</div></div></div></div>';
  }).join('');
}
function filterPlants(){
  var q=document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.plant-card').forEach(function(c,i){
    var p=PLANTS[i];
    if(!p)return;
    var matchesSearch=p.name.toLowerCase().indexOf(q)!==-1||p.description.toLowerCase().indexOf(q)!==-1||p.latin.toLowerCase().indexOf(q)!==-1;
    var matchesCat=currentCategory==='all'||p.category===currentCategory;
    c.style.display=(matchesSearch&&matchesCat)?'':'none';
  });
}
function filterByCategory(cat,btn){
  currentCategory=cat;
  document.querySelectorAll('.filter-tag').forEach(function(t){t.classList.remove('active')});
  btn.classList.add('active');
  filterPlants();
}

function openPlant(id){
  var p=PLANTS.find(function(x){return x.id===id});
  if(!p)return;
  track('views');
  var html='<div class="plant-detail"><div class="plant-detail-header"><div class="plant-detail-emoji">'+p.emoji+'</div><div class="plant-detail-info"><h1>'+p.name+'</h1><div class="latin">'+p.latin+'</div><div class="plant-tags"><span class="plant-tag">'+p.category+'</span><span class="plant-tag">'+p.season+'</span><span class="plant-tag">\u0421\u043b\u043e\u0436\u043d\u043e\u0441\u0442\u044c: '+('\u25cf'.repeat(p.difficulty))+'\u25cb'.repeat(3-p.difficulty)+'</span></div><p>'+p.description+'</p></div></div>';
  html+='<div class="info-grid"><div class="info-card"><div class="icon">\ud83d\udca7</div><div class="label">\u041f\u043e\u043b\u0438\u0432</div><div class="value">'+p.care.watering.split('.')[0]+'</div></div><div class="info-card"><div class="icon">\u2600\ufe0f</div><div class="label">\u041e\u0441\u0432\u0435\u0449\u0435\u043d\u0438\u0435</div><div class="value">'+p.care.light.split('.')[0]+'</div></div><div class="info-card"><div class="icon">\ud83c\udf21\ufe0f</div><div class="label">\u0422\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430</div><div class="value">'+p.care.temperature.split('.')[0]+'</div></div><div class="info-card"><div class="icon">\ud83c\udf31</div><div class="label">\u041f\u043e\u0441\u0430\u0434\u043a\u0430</div><div class="value">'+p.planting.split('.')[0]+'</div></div></div>';
  html+='<h3>\ud83d\udd0d \u041f\u043e\u0434\u0440\u043e\u0431\u043d\u044b\u0439 \u0443\u0445\u043e\u0434</h3><div class="detail-content">';
  html+='<div class="tip-box"><strong>\ud83d\udca7 \u041f\u043e\u043b\u0438\u0432:</strong> '+p.care.watering+'</div>';
  html+='<div class="tip-box"><strong>\u2600\ufe0f \u0421\u0432\u0435\u0442:</strong> '+p.care.light+'</div>';
  html+='<div class="tip-box"><strong>\ud83c\udf0d \u041f\u043e\u0447\u0432\u0430:</strong> '+p.care.soil+'</div>';
  html+='<div class="tip-box"><strong>\ud83c\udf21\ufe0f \u0422\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430:</strong> '+p.care.temperature+'</div>';
  html+='<div class="tip-box"><strong>\ud83e\uddea \u0423\u0434\u043e\u0431\u0440\u0435\u043d\u0438\u044f:</strong> '+p.care.fertilizer+'</div>';
  html+='<div class="tip-box warning"><strong>\u26a0\ufe0f \u0411\u043e\u043b\u0435\u0437\u043d\u0438:</strong> '+p.care.diseases+'</div>';
  html+='<div class="tip-box"><strong>\ud83d\udca1 \u0421\u043e\u0432\u0435\u0442\u044b:</strong> '+p.care.tips+'</div></div>';
  html+='<h3>\ud83d\udcc5 \u0421\u0440\u043e\u043a\u0438</h3><div class="detail-content"><p><strong>\u041f\u043e\u0441\u0430\u0434\u043a\u0430:</strong> '+p.planting+'</p><p><strong>\u0421\u0431\u043e\u0440:</strong> '+p.harvest+'</p></div>';
  html+='<div style="margin-top:1rem"><button class="btn btn-primary" onclick="closeModal(\'plantModal\');showSection(\'chat\');selectChatPlant('+p.id+')">\ud83d\udcac \u041f\u043e\u0433\u043e\u0432\u043e\u0440\u0438\u0442\u044c \u0441 '+p.name+'</button></div></div>';
  document.getElementById('plantDetailContent').innerHTML=html;
  document.getElementById('plantModal').classList.remove('hidden');
}

/* ─── CHAT ─── */
function renderChatSelect(){
  var searchTerm=(document.getElementById('chatSearchInput')?document.getElementById('chatSearchInput').value.toLowerCase():'').trim();
  var filtered=PLANTS.filter(function(p){
    if(chatCategory!=='all'&&p.category!==chatCategory)return false;
    if(!searchTerm)return true;
    return p.name.toLowerCase().indexOf(searchTerm)!==-1||p.category.toLowerCase().indexOf(searchTerm)!==-1;
  });
  var html=filtered.slice(0,60).map(function(p){
    return '<div class="chat-plant-option'+(chatPlant===p.id?' selected':'')+'" id="cpo_'+p.id+'" onclick="selectChatPlant('+p.id+')"><div class="emoji">'+p.emoji+'</div><div class="name">'+p.name+'</div></div>';
  }).join('');
  if(!html)html='<div class="chat-empty">Ничего не найдено — попробуй другую категорию 🌱</div>';
  if(filtered.length>60)html+='<div class="chat-empty">Показаны первые 60 — уточни поиск 🌿</div>';
  document.getElementById('chatPlantSelect').innerHTML=html;
  document.querySelectorAll('.chat-cat').forEach(function(b){b.classList.remove('active')});
  var active=Array.prototype.slice.call(document.querySelectorAll('.chat-cat')).find(function(b){return b.getAttribute('data-cat')===chatCategory});
  if(active)active.classList.add('active');
}
function setChatCategory(cat){
  chatCategory=cat;
  renderChatSelect();
}
function startRandomChat(){
  var list=PLANTS.filter(function(p){return chatCategory==='all'||p.category===chatCategory});
  if(!list.length)list=PLANTS;
  var p=list[Math.floor(Math.random()*list.length)];
  selectChatPlant(p.id);
  var box=document.getElementById('chatBox');
  box.scrollTop=box.scrollHeight;
}
function selectChatPlant(id){
  chatPlant=id;
  chatCategory='all';
  var p=PLANTS.find(function(x){return x.id===id});
  renderChatSelect();
  var box=document.getElementById('chatBox');
  box.innerHTML='<div class="chat-msg plant"><div class="chat-avatar">'+p.emoji+'</div><div class="chat-bubble">\u041f\u0440\u0438\u0432\u0435\u0442! \u042f \u2014 '+p.name+'! '+p.description+' \u0421\u043f\u0440\u0430\u0448\u0438\u0432\u0430\u0439 \u0447\u0442\u043e \u0445\u043e\u0447\u0435\u0448\u044c \u2014 \u0440\u0430\u0441\u0441\u043a\u0430\u0436\u0443 \u043e \u0441\u0435\u0431\u0435, \u043e \u0443\u0445\u043e\u0434\u0435, \u043f\u043e\u0448\u0443\u0447\u0443! \ud83d\ude0a</div></div>';
  box.scrollTop=box.scrollHeight;
}
function sendChat(){
  var input=document.getElementById('chatInput');
  var msg=input.value.trim();
  if(!msg)return;
  input.value='';
  if(!chatPlant)startRandomChat();
  var p=PLANTS.find(function(x){return x.id===chatPlant});
  var box=document.getElementById('chatBox');
  box.innerHTML+='<div class="chat-msg user"><div class="chat-avatar">\ud83e\uddd1</div><div class="chat-bubble">'+esc(msg)+'</div></div>';
  box.innerHTML+='<div class="chat-msg plant" id="typing"><div class="chat-avatar">'+p.emoji+'</div><div class="chat-bubble"><div class="typing"><span></span><span></span><span></span></div></div></div>';
  box.scrollTop=box.scrollHeight;
  setTimeout(function(){
    recordChatPlant(chatPlant);
    var reply=plantReply(chatPlant,msg);
    var typing=document.getElementById('typing');
    if(typing)typing.remove();
    box.innerHTML+='<div class="chat-msg plant"><div class="chat-avatar">'+p.emoji+'</div><div class="chat-bubble">'+reply+'</div></div>';
    box.scrollTop=box.scrollHeight;
  },700+Math.random()*1000);
}
function quickChat(q){
  document.getElementById('chatInput').value=q;
  sendChat();
}

/* ─── QUIZ ─── */
var quizStep=0,quizAnswers=[];
function renderQuiz(){quizStep=0;quizAnswers=[];showQuizQuestion()}
function showQuizQuestion(){
  if(quizStep>=QUIZ.length){showQuizResult();return}
  var q=QUIZ[quizStep];
  var box=document.getElementById('quizBox');
  box.innerHTML='<div class="quiz-question">'+q.q+'</div><div class="quiz-answers">'+q.a.map(function(a,i){return '<div class="quiz-option" onclick="answerQuiz('+i+')">'+a+'</div>'}).join('')+'</div><div style="margin-top:1rem;color:var(--text-muted);font-size:.8rem">\u0412\u043e\u043f\u0440\u043e\u0441 '+(quizStep+1)+' \u0438\u0437 '+QUIZ.length+'</div>';
}
function answerQuiz(i){quizAnswers.push(i);quizStep++;showQuizQuestion()}
function showQuizResult(){
  var care=quizAnswers[0],light=quizAnswers[1],personality=quizAnswers[2];
  track('quiz');
  var candidates=PLANTS.filter(function(p){
    if(care===3&&p.difficulty>1)return false;
    if(care===0&&p.difficulty>2)return false;
    if(light===3&&['\u043e\u0432\u043e\u0449\u0438','\u0434\u0435\u0440\u0435\u0432\u044c\u044f'].indexOf(p.category)!==-1)return false;
    return true;
  });
  if(candidates.length===0)candidates=PLANTS;
  var match=candidates[Math.floor(Math.random()*Math.min(5,candidates.length))];
  var reasons=["\u0422\u044b \u043b\u044e\u0431\u0438\u0448\u044c \u0437\u0430\u0431\u043e\u0442\u0438\u0442\u044c\u0441\u044f \u2014 \u0442\u0435\u0431\u0435 \u043f\u043e\u0434\u0445\u043e\u0434\u0438\u0442 \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u0435, \u043a\u043e\u0442\u043e\u0440\u043e\u0435 \u043e\u0446\u0435\u043d\u0438\u0442 \u0442\u0432\u043e\u044e \u043b\u044e\u0431\u043e\u0432\u044c!","\u0422\u044b \u043f\u0440\u0430\u043a\u0442\u0438\u0447\u043d\u044b\u0439 \u2014 \u0432\u044b\u0431\u0438\u0440\u0430\u0439 \u043d\u0435\u043f\u0440\u0438\u0445\u043e\u0442\u043b\u0438\u0432\u043e\u0435 \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u0435!","\u0422\u044b \u043c\u0435\u0447\u0442\u0430\u0442\u0435\u043b\u044c \u2014 \u0442\u0435\u0431\u0435 \u043f\u043e\u0434\u0445\u043e\u0434\u0438\u0442 \u0434\u0435\u043a\u043e\u0440\u0430\u0442\u0438\u0432\u043d\u043e\u0435 \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u0435!","\u0422\u044b \u0431\u0443\u043d\u0442\u0430\u0440\u044c \u2014 \u0432\u044b\u0431\u0435\u0440\u0438 \u0447\u0442\u043e-\u0442\u043e \u043d\u0435\u043e\u0431\u044b\u0447\u043d\u043e\u0435!","\u0422\u044b \u043e\u043f\u0442\u0438\u043c\u0438\u0441\u0442 \u2014 \u043b\u044e\u0431\u043e\u0435 \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u0435 \u043f\u0440\u0438\u0436\u0438\u0432\u0451\u0442\u0441\u044f!"];
  document.getElementById('quizBox').innerHTML='<div class="quiz-result"><div class="big-emoji">'+match.emoji+'</div><h2 style="color:var(--primary-light);margin:.5rem 0">'+match.name+'</h2><p style="color:var(--text-dim);margin-bottom:1rem">'+match.description+'</p><p style="color:var(--text-muted);font-size:.9rem">'+reasons[personality]+'</p><div style="margin-top:1rem"><button class="btn btn-primary" onclick="renderQuiz()">\u041f\u0440\u043e\u0439\u0442\u0438 \u0435\u0449\u0451 \u0440\u0430\u0437</button> <button class="btn" onclick="openPlant('+match.id+')">\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435</button></div></div>';
}

/* ─── SEASON GUIDE ─── */
function renderSeason(){
  var m=new Date().getMonth();
  var monthNames=['\u042f\u043d\u0432\u0430\u0440\u044c','\u0424\u0435\u0432\u0440\u0430\u043b\u044c','\u041c\u0430\u0440\u0442','\u0410\u043f\u0440\u0435\u043b\u044c','\u041c\u0430\u0439','\u0418\u044e\u043d\u044c','\u0418\u044e\u043b\u044c','\u0410\u0432\u0433\u0443\u0441\u0442','\u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c','\u041e\u043a\u0442\u044f\u0431\u0440\u044c','\u041d\u043e\u044f\u0431\u0440\u044c','\u0414\u0435\u043a\u0430\u0431\u0440\u044c'];
  var seasonMap={
    0:[],1:[],2:[{name:'\u041f\u043e\u0441\u0435\u0432 \u0440\u0430\u0441\u0441\u0430\u0434\u044b \u0442\u043e\u043c\u0430\u0442\u043e\u0432 \u0438 \u043f\u0435\u0440\u0446\u0435\u0432',emoji:'\ud83c\udf45'},{name:'\u0423\u0445\u043e\u0434 \u0437\u0430 \u043a\u043e\u043c\u043d\u0430\u0442\u043d\u044b\u043c\u0438 \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u044f\u043c\u0438',emoji:'\ud83e\udeb4'}],
    3:[{name:'\u041f\u043e\u0441\u0435\u0432 \u0441\u0435\u043c\u044f\u043d \u0443\u043a\u0440\u043e\u043f\u0430, \u043f\u0435\u0442\u0440\u0443\u0448\u043a\u0438',emoji:'\ud83c\udf3f'},{name:'\u041f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u0430 \u0433\u0440\u044f\u0434\u043e\u043a',emoji:'\ud83c\udf31'},{name:'\u0412\u044b\u0441\u0430\u0434\u043a\u0430 \u043b\u0443\u043a\u0430 \u0438 \u0447\u0435\u0441\u043d\u043e\u043a\u0430',emoji:'\ud83e\uddc5'}],
    4:[{name:'\u041f\u043e\u0441\u0435\u0432 \u043e\u0433\u0443\u0440\u0446\u043e\u0432, \u043a\u0430\u0431\u0430\u0447\u043a\u043e\u0432',emoji:'\ud83e\udd52'},{name:'\u0412\u044b\u0441\u0430\u0434\u043a\u0430 \u0440\u0430\u0441\u0441\u0430\u0434\u044b \u0442\u043e\u043c\u0430\u0442\u043e\u0432',emoji:'\ud83c\udf45'},{name:'\u041f\u043e\u0441\u0435\u0432 \u043c\u043e\u0440\u043a\u043e\u0432\u0438 \u0438 \u0441\u0432\u0451\u043a\u043b\u044b',emoji:'\ud83e\udd55'},{name:'\u041f\u043e\u0441\u0430\u0434\u043a\u0430 \u043a\u0430\u0440\u0442\u043e\u0444\u0435\u043b\u044f',emoji:'\ud83e\udd54'}],
    5:[{name:'\u041f\u043e\u043b\u0438\u0432 \u0438 \u043f\u043e\u0434\u043a\u043e\u0440\u043c\u043a\u0430 \u043e\u0432\u043e\u0449\u0435\u0439',emoji:'\ud83d\udca7'},{name:'\u0411\u043e\u0440\u044c\u0431\u0430 \u0441 \u0432\u0440\u0435\u0434\u0438\u0442\u0435\u043b\u044f\u043c\u0438',emoji:'\ud83d\udc1b'},{name:'\u0421\u0431\u043e\u0440 \u0443\u043a\u0440\u043e\u043f\u0430 \u0438 \u043f\u0435\u0442\u0440\u0443\u0448\u043a\u0438',emoji:'\ud83c\udf3f'}],
    6:[{name:'\u0421\u0431\u043e\u0440 \u043e\u0433\u0443\u0440\u0446\u043e\u0432 \u0438 \u043a\u0430\u0431\u0430\u0447\u043a\u043e\u0432',emoji:'\ud83e\udd52'},{name:'\u041f\u0430\u0441\u044b\u043d\u043a\u043e\u0432\u0430\u043d\u0438\u0435 \u0442\u043e\u043c\u0430\u0442\u043e\u0432',emoji:'\ud83c\udf45'},{name:'\u0421\u0431\u043e\u0440 \u043b\u0443\u043a\u0430 \u0438 \u0447\u0435\u0441\u043d\u043e\u043a\u0430',emoji:'\ud83e\uddc5'}],
    7:[{name:'\u0421\u0431\u043e\u0440 \u0443\u0440\u043e\u0436\u0430\u044f \u043e\u0441\u043d\u043e\u0432\u043d\u043e\u0439',emoji:'\ud83e\uddfa'},{name:'\u041f\u043e\u0434\u043a\u043e\u0440\u043c\u043a\u0430 \u043f\u043b\u043e\u0434\u043e\u0432\u044b\u0445 \u0434\u0435\u0440\u0435\u0432\u044c\u0435\u0432',emoji:'\ud83c\udf4e'},{name:'\u041f\u043e\u0441\u0435\u0432 \u043f\u043e\u0434\u0437\u0438\u043c\u043d\u0438\u0445 \u043a\u0443\u043b\u044c\u0442\u0443\u0440',emoji:'\ud83c\udf31'}],
    8:[{name:'\u041f\u043e\u0441\u0430\u0434\u043a\u0430 \u0434\u0435\u0440\u0435\u0432\u044c\u0435\u0432 \u0438 \u043a\u0443\u0441\u0442\u0430\u0440\u043d\u0438\u043a\u043e\u0432',emoji:'\ud83c\udf33'},{name:'\u0421\u0431\u043e\u0440 \u044f\u0433\u043e\u0434',emoji:'\ud83e\uded0'},{name:'\u041f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u0430 \u043b\u0443\u043a\u043e\u0432\u0438\u0446 \u043a \u0437\u0438\u043c\u0435',emoji:'\ud83c\udf37'}],
    9:[{name:'\u041f\u043e\u0441\u0430\u0434\u043a\u0430 \u0442\u044e\u043b\u044c\u043f\u0430\u043d\u043e\u0432 \u0438 \u043d\u0430\u0440\u0446\u0438\u0441\u0441\u043e\u0432',emoji:'\ud83c\udf37'},{name:'\u0423\u0431\u043e\u0440\u043a\u0430 \u0443\u0447\u0430\u0441\u0442\u043a\u0430',emoji:'\ud83c\udf42'},{name:'\u0423\u043a\u0440\u044b\u0442\u0438\u0435 \u0440\u043e\u0437 \u043d\u0430 \u0437\u0438\u043c\u0443',emoji:'\ud83c\udf39'}],
    10:[{name:'\u0423\u0445\u043e\u0434 \u0437\u0430 \u043a\u043e\u043c\u043d\u0430\u0442\u043d\u044b\u043c\u0438 \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u044f\u043c\u0438',emoji:'\ud83e\udeb4'},{name:'\u041f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u0432\u0435\u0441\u0435\u043d\u043d\u0435\u0433\u043e \u0441\u0430\u0434\u0430',emoji:'\ud83d\udccb'}],
    11:[]
  };
  var items=seasonMap[m]||[{name:'\u0423\u0445\u043e\u0434 \u0437\u0430 \u043a\u043e\u043c\u043d\u0430\u0442\u043d\u044b\u043c\u0438 \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u044f\u043c\u0438',emoji:'\ud83e\udeb4'},{name:'\u041f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u0441\u0435\u0437\u043e\u043d\u0430',emoji:'\ud83d\udccb'}];
  document.getElementById('seasonGrid').innerHTML='<div style="grid-column:1/-1;margin-bottom:1rem"><h3 style="color:var(--primary-light)">\u0421\u0435\u0439\u0447\u0430\u0441: '+monthNames[m]+'</h3></div>'+items.map(function(i){return '<div class="season-card"><div class="emoji">'+i.emoji+'</div><div class="info"><h4>'+i.name+'</h4><p>\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0430\u0446\u0438\u044f \u043d\u0430 '+monthNames[m].toLowerCase()+'</p></div></div>'}).join('');
}

/* ─── JOURNAL ─── */
function updateJournalSelect(){
  var s=document.getElementById('journalPlant');
  if(!s)return;
  var current=s.value;
  s.innerHTML='<option value="">\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u0435...</option>'+PLANTS.map(function(p){return '<option value="'+p.id+'"'+(String(p.id)===current?' selected':'')+'>'+p.emoji+' '+p.name+'</option>'}).join('');
}
function renderJournal(){
  updateJournalSelect();
  var entries=JSON.parse(localStorage.getItem('plantifi_journal_'+(currentUser?currentUser.username:'guest'))||'[]');
  if(entries.length===0){
    document.getElementById('journalEntries').innerHTML='<p style="color:var(--text-muted);text-align:center;padding:2rem">\u041d\u0435\u0442 \u0437\u0430\u043f\u0438\u0441\u0435\u0439.</p>';
    return;
  }
  document.getElementById('journalEntries').innerHTML=entries.slice().reverse().map(function(e){
    var html='<div class="journal-entry"><div class="journal-entry-header"><span class="journal-entry-plant">'+getPlantEmoji(e.plantId)+' '+getPlantName(e.plantId)+'</span><span class="journal-entry-mood">'+e.mood+'</span><span class="journal-entry-date">'+fmtDate(e.date)+'</span></div><div class="journal-entry-text">'+esc(e.text)+'</div>';
    if(e.photo)html+='<img src="'+e.photo+'" style="max-width:100%;max-height:200px;border-radius:8px;margin-top:.5rem">';
    html+='<div class="journal-entry-actions"><button class="btn btn-sm btn-danger" onclick="deleteJournal(\''+e.id+'\')">\u0423\u0434\u0430\u043b\u0438\u0442\u044c</button></div></div>';
    return html;
  }).join('');
}
function addJournalEntry(){
  if(!currentUser){alert('\u0412\u043e\u0439\u0434\u0438\u0442\u0435 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442');return}
  var plantId=document.getElementById('journalPlant').value,date=document.getElementById('journalDate').value,text=document.getElementById('journalText').value.trim();
  if(!plantId||!text){alert('\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u0435 \u0438 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0431\u043b\u044e\u0434\u0435\u043d\u0438\u0435');return}
  var photoInput=document.getElementById('journalPhoto');
  var save=function(photo){
    var entries=JSON.parse(localStorage.getItem('plantifi_journal_'+currentUser.username)||'[]');
    entries.push({id:String(Date.now()),plantId:+plantId,date:date,text:text,mood:selectedMood,photo:photo||null});
    localStorage.setItem('plantifi_journal_'+currentUser.username,JSON.stringify(entries));
    document.getElementById('journalText').value='';
    document.getElementById('photoPreview').classList.add('hidden');
    checkAchievements();
    renderJournal();
  };
  if(photoInput.files&&photoInput.files[0]){
    var r=new FileReader();
    r.onload=function(e){save(e.target.result)};
    r.readAsDataURL(photoInput.files[0]);
  } else save();
}
function deleteJournal(id){
  var k='plantifi_journal_'+(currentUser?currentUser.username:'guest');
  var e=JSON.parse(localStorage.getItem(k)||'[]');
  localStorage.setItem(k,JSON.stringify(e.filter(function(x){return x.id!==id})));
  renderJournal();
}
function setMood(mood,btn){
  selectedMood=mood;
  document.querySelectorAll('.mood-btn').forEach(function(b){b.classList.remove('active')});
  btn.classList.add('active');
}
function previewPhoto(ev){
  var r=new FileReader();
  r.onload=function(e){var img=document.getElementById('photoPreview');img.src=e.target.result;img.classList.remove('hidden')};
  r.readAsDataURL(ev.target.files[0]);
}

/* ─── NOTES ─── */
function renderNotes(){
  var notes=JSON.parse(localStorage.getItem('plantifi_notes_'+(currentUser?currentUser.username:'guest'))||'[]');
  if(notes.length===0){
    document.getElementById('notesList').innerHTML='<p style="color:var(--text-muted);text-align:center;padding:2rem">\u041d\u0435\u0442 \u0437\u0430\u043c\u0435\u0442\u043e\u043a.</p>';
    return;
  }
  document.getElementById('notesList').innerHTML=notes.slice().reverse().map(function(n){
    return '<div class="note-card"><h3>'+esc(n.title)+'</h3><p>'+esc(n.text)+'</p><div class="note-card-footer"><span class="note-date">'+fmtDate(n.date)+'</span><button class="btn btn-sm btn-danger" onclick="deleteNote(\''+n.id+'\')">\u0423\u0434\u0430\u043b\u0438\u0442\u044c</button></div></div>';
  }).join('');
}
function addNote(){
  if(!currentUser){alert('\u0412\u043e\u0439\u0434\u0438\u0442\u0435 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442');return}
  var t=document.getElementById('noteTitle').value.trim(),x=document.getElementById('noteText').value.trim();
  if(!t||!x){alert('\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0432\u0441\u0451');return}
  var notes=JSON.parse(localStorage.getItem('plantifi_notes_'+currentUser.username)||'[]');
  notes.push({id:String(Date.now()),title:t,text:x,date:new Date().toISOString()});
  localStorage.setItem('plantifi_notes_'+currentUser.username,JSON.stringify(notes));
  document.getElementById('noteTitle').value='';
  document.getElementById('noteText').value='';
  checkAchievements();
  renderNotes();
}
function deleteNote(id){
  var k='plantifi_notes_'+(currentUser?currentUser.username:'guest');
  var n=JSON.parse(localStorage.getItem(k)||'[]');
  localStorage.setItem(k,JSON.stringify(n.filter(function(x){return x.id!==id})));
  renderNotes();
}

/* ─── CALENDAR ─── */
function renderCalendar(){
  var y=calendarDate.getFullYear(),m=calendarDate.getMonth();
  var months=['\u042f\u043d\u0432\u0430\u0440\u044c','\u0424\u0435\u0432\u0440\u0430\u043b\u044c','\u041c\u0430\u0440\u0442','\u0410\u043f\u0440\u0435\u043b\u044c','\u041c\u0430\u0439','\u0418\u044e\u043d\u044c','\u0418\u044e\u043b\u044c','\u0410\u0432\u0433\u0443\u0441\u0442','\u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c','\u041e\u043a\u0442\u044f\u0431\u0440\u044c','\u041d\u043e\u044f\u0431\u0440\u044c','\u0414\u0435\u043a\u0430\u0431\u0440\u044c'];
  document.getElementById('calendarMonth').textContent=months[m]+' '+y;
  var grid=document.getElementById('calendarGrid');
  var fd=new Date(y,m,1).getDay();
  var dim=new Date(y,m+1,0).getDate();
  var today=new Date();
  var events=JSON.parse(localStorage.getItem('plantifi_events_'+(currentUser?currentUser.username:'guest'))||'[]');
  var colors={water:'#42a5f5',fertilize:'#66bb6a',repot:'#ffa726',prune:'#ef5350',harvest:'#ab47bc'};
  var html=['\u041f\u043d','\u0412\u0442','\u0421\u0440','\u0427\u0442','\u041f\u0442','\u0421\u0431','\u0412\u0441'].map(function(d){return '<div class="cal-header">'+d+'</div>'}).join('');
  var sd=fd===0?6:fd-1;
  for(var i=0;i<sd;i++)html+='<div class="cal-day empty"></div>';
  for(var d=1;d<=dim;d++){
    var ds=y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
    var isT=d===today.getDate()&&m===today.getMonth()&&y===today.getFullYear();
    var dayEv=events.filter(function(e){return e.date===ds});
    html+='<div class="cal-day '+(isT?'today':'')+' '+(selectedCalDate===ds?'selected':'')+'" onclick="selectCalDate(\''+ds+'\')"><span>'+d+'</span><div class="cal-day-events">'+dayEv.slice(0,3).map(function(e){return '<div class="cal-day-event" style="background:'+(colors[e.type]||'#999')+'"></div>'}).join('')+'</div></div>';
  }
  grid.innerHTML=html;
  renderCalendarEvents();
}
function changeMonth(d){calendarDate.setMonth(calendarDate.getMonth()+d);renderCalendar()}
function selectCalDate(ds){
  selectedCalDate=ds;
  document.getElementById('calendarEventForm').style.display='block';
  document.getElementById('eventDate').textContent=fmtDate(ds);
  renderCalendar();
}
function updateCalendarForm(){
  var s=document.getElementById('eventPlant');
  if(!s)return;
  s.innerHTML='<option value="">\u0420\u0430\u0441\u0442\u0435\u043d\u0438\u0435...</option>'+PLANTS.map(function(p){return '<option value="'+p.id+'">'+p.emoji+' '+p.name+'</option>'}).join('');
}
function addCalendarEvent(){
  if(!currentUser){alert('\u0412\u043e\u0439\u0434\u0438\u0442\u0435 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442');return}
  var plantId=document.getElementById('eventPlant').value,type=document.getElementById('eventType').value,note=document.getElementById('eventNote').value;
  if(!selectedCalDate){alert('\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0430\u0442\u0443');return}
  var events=JSON.parse(localStorage.getItem('plantifi_events_'+currentUser.username)||'[]');
  events.push({id:Date.now(),date:selectedCalDate,plantId:+plantId,type:type,note:note});
  localStorage.setItem('plantifi_events_'+currentUser.username,JSON.stringify(events));
  document.getElementById('eventNote').value='';
  checkAchievements();
  document.getElementById('calendarEventForm').style.display='none';
  selectedCalDate=null;
  renderCalendar();
}
function renderCalendarEvents(){
  var events=JSON.parse(localStorage.getItem('plantifi_events_'+(currentUser?currentUser.username:'guest'))||'[]');
  var me=events.filter(function(e){
    var d=new Date(e.date);
    return d.getMonth()===calendarDate.getMonth()&&d.getFullYear()===calendarDate.getFullYear();
  }).sort(function(a,b){return a.date.localeCompare(b.date)});
  var icons={water:'\ud83d\udca7',fertilize:'\ud83e\uddea',repot:'\ud83e\udeb4',prune:'\u2702\ufe0f',harvest:'\ud83e\uddfa'};
  if(me.length===0){
    document.getElementById('calendarEvents').innerHTML='<p style="color:var(--text-muted);text-align:center">\u041d\u0435\u0442 \u0441\u043e\u0431\u044b\u0442\u0438\u0439</p>';
    return;
  }
  document.getElementById('calendarEvents').innerHTML='<h3>\u0421\u043e\u0431\u044b\u0442\u0438\u044f:</h3>'+me.map(function(e){
    return '<div class="cal-event"><div class="cal-event-icon">'+(icons[e.type]||'\ud83d\udccc')+'</div><div class="cal-event-info"><div class="cal-event-plant">'+getPlantEmoji(e.plantId)+' '+getPlantName(e.plantId)+'</div><div class="cal-event-note">'+fmtDate(e.date)+(e.note?' \u2022 '+esc(e.note):'')+'</div></div><button class="btn btn-sm btn-danger" onclick="deleteEvent('+e.id+')">\u2715</button></div>';
  }).join('');
}
function deleteEvent(id){
  var k='plantifi_events_'+(currentUser?currentUser.username:'guest');
  var e=JSON.parse(localStorage.getItem(k)||'[]');
  localStorage.setItem(k,JSON.stringify(e.filter(function(x){return x.id!==id})));
  renderCalendar();
}

/* ─── COMMUNITY ─── */
var communityFilter='all';
function renderCommunity(){
  var posts=JSON.parse(localStorage.getItem('plantifi_community')||'[]');
  var f=communityFilter==='all'?posts:posts.filter(function(p){return p.category===communityFilter});
  var catC={tip:'#66bb6a',question:'#42a5f5',success:'#ffd54f',problem:'#ef5350'};
  var catL={tip:'\ud83d\udca1 \u0421\u043e\u0432\u0435\u0442',question:'\u2753 \u0412\u043e\u043f\u0440\u043e\u0441',success:'\ud83c\udf89 \u0423\u0441\u043f\u0435\u0445',problem:'\u26a0\ufe0f \u041f\u0440\u043e\u0431\u043b\u0435\u043c\u0430'};
  if(f.length===0){
    document.getElementById('communityFeed').innerHTML='<p style="color:var(--text-muted);text-align:center;padding:2rem">\u041d\u0435\u0442 \u043f\u043e\u0441\u0442\u043e\u0432.</p>';
    return;
  }
  document.getElementById('communityFeed').innerHTML=f.slice().reverse().map(function(p){
    return '<div class="post-card"><div class="post-header"><span class="post-author">\ud83d\udc64 '+esc(p.author)+'</span><span class="post-category-badge" style="background:'+(catC[p.category]||'#666')+';color:white">'+(catL[p.category]||p.category)+'</span></div><div class="post-text">'+esc(p.text)+'</div><div class="post-footer"><span class="post-date">'+fmtDate(p.date)+'</span><div><button class="post-action" onclick="likePost('+p.id+')">\ud83d\udc4d '+(p.likes||0)+'</button></div></div></div>';
  }).join('');
}
function addCommunityPost(){
  if(!currentUser){alert('\u0412\u043e\u0439\u0434\u0438\u0442\u0435 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442');return}
  var text=document.getElementById('communityPost').value.trim(),category=document.getElementById('postCategory').value;
  if(!text){alert('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043a\u0441\u0442');return}
  var posts=JSON.parse(localStorage.getItem('plantifi_community')||'[]');
  posts.push({id:Date.now(),author:currentUser.username,text:text,category:category,likes:0,date:new Date().toISOString()});
  localStorage.setItem('plantifi_community',JSON.stringify(posts));
  document.getElementById('communityPost').value='';
  checkAchievements();
  renderCommunity();
}
function likePost(id){
  var p=JSON.parse(localStorage.getItem('plantifi_community')||'[]');
  var x=p.find(function(y){return y.id===id});
  if(x){x.likes=(x.likes||0)+1;localStorage.setItem('plantifi_community',JSON.stringify(p));checkAchievements();renderCommunity()}
}
function filterPosts(cat,btn){
  communityFilter=cat;
  btn.parentElement.querySelectorAll('.filter-tag').forEach(function(t){t.classList.remove('active')});
  btn.classList.add('active');
  renderCommunity();
}

/* ─── HELPERS ─── */
function getPlantName(id){var p=PLANTS.find(function(x){return x.id===id});return p?p.name:'?'}
function getPlantEmoji(id){var p=PLANTS.find(function(x){return x.id===id});return p?p.emoji:'\ud83c\udf3f'}
function fmtDate(ds){if(!ds)return'';return new Date(ds).toLocaleDateString('ru-RU',{day:'numeric',month:'short',year:'numeric'})}
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}

/* ─── STATS & ACHIEVEMENTS ─── */
function getStats(){return JSON.parse(localStorage.getItem('plantifi_stats_'+(currentUser?currentUser.username:'guest'))||'{}')}
function track(key,val){var s=getStats();s[key]=(s[key]||0)+(val||1);localStorage.setItem('plantifi_stats_'+(currentUser?currentUser.username:'guest'),JSON.stringify(s));checkAchievements()}
function recordChatPlant(pid){var user=currentUser?currentUser.username:'guest';var chats=JSON.parse(localStorage.getItem('plantifi_chats_'+user)||'[]');if(chats.indexOf(pid)===-1)chats.push(pid);localStorage.setItem('plantifi_chats_'+user,JSON.stringify(chats));track('chats')}
var ACHIEVEMENTS=[
  {id:'visit',emoji:'\ud83c\udf31',title:'Первый шаг',desc:'Посетить PlantiFi',check:function(c){return true}},
  {id:'profile',emoji:'\ud83d\udc64',title:'Садовод',desc:'Создать аккаунт',check:function(c){return c.logged}},
  {id:'chat3',emoji:'\ud83d\udcac',title:'Болтун',desc:'Поговорить с 3 растениями',check:function(c){return c.chats.length>=3}},
  {id:'chat10',emoji:'\ud83d\udde3\ufe0f',title:'Душа компании',desc:'Поговорить с 10 растениями',check:function(c){return c.chats.length>=10}},
  {id:'chat50',emoji:'\ud83d\udc8c',title:'Писатель',desc:'Отправить 50 сообщений в чате',check:function(c){return (c.stats.chats||0)>=50}},
  {id:'quiz',emoji:'\ud83e\udde0',title:'Самопознание',desc:'Пройти квиз',check:function(c){return (c.stats.quiz||0)>=1}},
  {id:'view10',emoji:'\ud83d\udc40',title:'Исследователь',desc:'Открыть 10 растений в каталоге',check:function(c){return (c.stats.views||0)>=10}},
  {id:'journal5',emoji:'\ud83d\udcd3',title:'Наблюдатель',desc:'Сделать 5 записей в журнале',check:function(c){return c.journal.length>=5}},
  {id:'notes3',emoji:'\ud83d\udcdd',title:'Мыслитель',desc:'Написать 3 заметки',check:function(c){return c.notes.length>=3}},
  {id:'garden3',emoji:'\ud83c\udf3f',title:'Садовник',desc:'Добавить 3 растения в мой сад',check:function(c){return c.garden.length>=3}},
  {id:'garden10',emoji:'\ud83c\udf33',title:'Хозяин оранжереи',desc:'Добавить 10 растений в мой сад',check:function(c){return c.garden.length>=10}},
  {id:'water10',emoji:'\ud83d\udca7',title:'Заботливый',desc:'Отметить 10 поливов',check:function(c){return (c.stats.waters||0)>=10}},
  {id:'event3',emoji:'\ud83d\uddd3\ufe0f',title:'Планировщик',desc:'Создать 3 события ухода',check:function(c){return c.events.length>=3}},
  {id:'post3',emoji:'\ud83d\udce2',title:'Общительный',desc:'Опубликовать 3 поста',check:function(c){return c.posts.length>=3}},
  {id:'like5',emoji:'\ud83d\udc4d',title:'Звезда',desc:'Получить 5 лайков',check:function(c){return c.likesReceived>=5}},
  {id:'compare',emoji:'\u2696\ufe0f',title:'Аналитик',desc:'Сравнить два растения',check:function(c){return (c.stats.compares||0)>=1}},
  {id:'export',emoji:'\ud83d\udce6',title:'Архивариус',desc:'Экспортировать данные',check:function(c){return (c.stats.exports||0)>=1}}
];
function achievementContext(){
  var user=currentUser?currentUser.username:'guest';
  var garden=JSON.parse(localStorage.getItem('plantifi_garden_'+user)||'[]');
  var journal=JSON.parse(localStorage.getItem('plantifi_journal_'+user)||'[]');
  var notes=JSON.parse(localStorage.getItem('plantifi_notes_'+user)||'[]');
  var events=JSON.parse(localStorage.getItem('plantifi_events_'+user)||'[]');
  var posts=JSON.parse(localStorage.getItem('plantifi_community')||'[]').filter(function(p){return p.author===user});
  var likesReceived=posts.reduce(function(s,p){return s+(p.likes||0)},0);
  var chats=JSON.parse(localStorage.getItem('plantifi_chats_'+user)||'[]');
  return {logged:!!currentUser,stats:getStats(),garden:garden,journal:journal,notes:notes,events:events,posts:posts,likesReceived:likesReceived,chats:chats};
}
function checkAchievements(){
  var user=currentUser?currentUser.username:'guest';
  var c=achievementContext();
  var unlocked=ACHIEVEMENTS.filter(function(a){return a.check(c)}).map(function(a){return a.id});
  localStorage.setItem('plantifi_ach_'+user,JSON.stringify(unlocked));
  return unlocked;
}
function renderAchievements(){
  var unlocked=checkAchievements();
  var box=document.getElementById('achievementGrid');
  box.innerHTML=ACHIEVEMENTS.map(function(a){
    var isUn=unlocked.indexOf(a.id)!==-1;
    return '<div class="ach-card'+(isUn?' unlocked':'')+'" title="'+esc(a.desc)+'"><div class="ach-emoji">'+a.emoji+'</div><div class="ach-title">'+a.title+'</div><div class="ach-desc">'+a.desc+'</div><div class="ach-state">'+(isUn?'\u2713 \u041e\u0442\u043a\u0440\u044b\u0442\u043e':'<span class="lock">\ud83d\udd12</span>')+'</div></div>';
  }).join('');
  document.getElementById('achCount').textContent=unlocked.length+' \u0438\u0437 '+ACHIEVEMENTS.length;
}
function renderStats(){
  var c=achievementContext();
  var needWater=c.garden.filter(function(g){return !g.lastWatered||daysSince(g.lastWatered)>=gardenInterval(g.plantId)}).length;
  var today=new Date().toDateString();
  var wateredToday=c.garden.filter(function(g){return g.lastWatered&&new Date(g.lastWatered).toDateString()===today}).length;
  var cards=[
    ['\ud83c\udf3f',c.garden.length,'\u0420\u0430\u0441\u0442\u0435\u043d\u0438\u0439 \u0432 \u0441\u0430\u0434\u0443'],
    ['\ud83d\udca7',needWater,'\u041d\u0443\u0436\u043d\u043e \u043f\u043e\u043b\u0438\u0442\u044c'],
    ['\ud83d\udc94',wateredToday,'\u041f\u043e\u043b\u0438\u0442\u043e \u0441\u0435\u0433\u043e\u0434\u043d\u044f'],
    ['\ud83d\udcd3',c.journal.length,'\u0417\u0430\u043f\u0438\u0441\u0435\u0439 \u0432 \u0436\u0443\u0440\u043d\u0430\u043b\u0435'],
    ['\ud83d\udcdd',c.notes.length,'\u0417\u0430\u043c\u0435\u0442\u043e\u043a'],
    ['\ud83d\uddd3\ufe0f',c.events.length,'\u0421\u043e\u0431\u044b\u0442\u0438\u0439 \u0443\u0445\u043e\u0434\u0430']
  ];
  document.getElementById('statCards').innerHTML=cards.map(function(k){
    return '<div class="stat-card"><div class="stat-icon">'+k[0]+'</div><div class="stat-num">'+k[1]+'</div><div class="stat-label">'+k[2]+'</div></div>';
  }).join('');
}

/* ─── MY GARDEN ─── */
function gardenKey(){return 'plantifi_garden_'+(currentUser?currentUser.username:'guest')}
function getGarden(){return JSON.parse(localStorage.getItem(gardenKey())||'[]')}
function gardenInterval(plantId){
  var p=PLANTS.find(function(x){return x.id===plantId});
  return p?(p.difficulty===1?2:p.difficulty===2?4:7):4;
}
function daysSince(d){if(!d)return 999;return Math.floor((new Date()-new Date(d))/86400000)}
function updateGardenSelect(){
  var s=document.getElementById('gardenSelect');
  var groups={};
  PLANTS.forEach(function(p){if(!groups[p.category])groups[p.category]=[];groups[p.category].push(p)});
  s.innerHTML=Object.keys(groups).map(function(cat){
    return '<optgroup label="'+esc(cat.charAt(0).toUpperCase()+cat.slice(1))+'">'+groups[cat].map(function(p){
      return '<option value="'+p.id+'">'+p.emoji+' '+p.name+'</option>';
    }).join('')+'</optgroup>';
  }).join('');
}
function renderGarden(){
  renderStats();
  updateGardenSelect();
  var box=document.getElementById('gardenGrid');
  if(!currentUser){
    box.innerHTML='<div class="garden-empty"><div class="garden-empty-emoji">\ud83c\udf3f</div><p>Войдите в аккаунт, чтобы вести свой сад и следить за поливом!</p><button class="btn" onclick="openLogin()">Войти</button></div>';
    return;
  }
  var garden=getGarden();
  if(garden.length===0){
    box.innerHTML='<div class="garden-empty"><div class="garden-empty-emoji">\ud83c\udf31</div><p>Ваш сад пуст. Добавьте первое растение из списка ниже!</p></div>';
    return;
  }
  box.innerHTML=garden.map(function(g){
    var p=PLANTS.find(function(x){return x.id===g.plantId});
    if(!p)return '';
    var iv=gardenInterval(g.plantId);
    var ds=daysSince(g.lastWatered);
    var need=ds>=iv;
    var pct=Math.min(100,Math.round(ds/iv*100));
    return '<div class="garden-card"><div class="garden-emoji">'+p.emoji+'</div><div class="garden-info"><div class="garden-name">'+p.name+'</div><div class="garden-sub">\u0421\u043b\u043e\u0436\u043d\u043e\u0441\u0442\u044c: '+'\u2605'.repeat(p.difficulty)+'\u2606'.repeat(3-p.difficulty)+'</div><div class="water-bar"><div class="water-fill'+(need?' urgent':'')+'" style="width:'+pct+'%"></div></div><div class="garden-meta">'+(g.lastWatered?('\ud83d\udca7 \u043f\u043e\u043b\u0438\u0442\u043e: '+fmtDate(g.lastWatered)):'\ud83d\udea9 \u0435\u0449\u0451 \u043d\u0435 \u043f\u043e\u043b\u0438\u0442\u043e')+(need?'<span class="gear-need"> \u2014 \u043f\u043e\u043b\u0435\u0439\u043c\u0435! \ud83d\udea8</span>':'\u2014 \u0432\u0441\u0451 \u043e\u043a \u2705')+'</div></div><div class="garden-actions"><button class="btn btn-sm btn-primary" onclick="waterPlant('+g.plantId+')">\ud83d\udca7 \u041f\u043e\u043b\u0438\u0442\u044c</button><button class="btn btn-sm btn-danger" onclick="removePlantFromGarden('+g.plantId+')">\u2715</button></div></div>';
  }).join('');
}
function addPlantToGarden(){
  if(!currentUser){alert('\u0412\u043e\u0439\u0434\u0438\u0442\u0435 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442');return}
  var pid=parseInt(document.getElementById('gardenSelect').value,10);
  if(!pid){alert('\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u0435');return}
  var garden=getGarden();
  if(garden.some(function(x){return x.plantId===pid})){alert('\u042d\u0442\u043e \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u0435 \u0443\u0436\u0435 \u0432 \u043f\u0430\u0448\u0438 \u0441\u0430\u0434\u0443');return}
  garden.push({plantId:pid,lastWatered:null});
  localStorage.setItem(gardenKey(),JSON.stringify(garden));
  checkAchievements();
  renderGarden();
}
function removePlantFromGarden(plantId){
  localStorage.setItem(gardenKey(),JSON.stringify(getGarden().filter(function(x){return x.plantId!==plantId})));
  checkAchievements();
  renderGarden();
}
function waterPlant(plantId){
  var garden=getGarden();
  var x=garden.find(function(g){return g.plantId===plantId});
  if(x){x.lastWatered=new Date().toISOString();localStorage.setItem(gardenKey(),JSON.stringify(garden));track('waters');renderGarden()}
}

/* ─── COMPARE ─── */
function renderCompare(){
  var a=document.getElementById('compareA'),b=document.getElementById('compareB');
  a.innerHTML=PLANTS.map(function(p){return '<option value="'+p.id+'">'+p.emoji+' '+p.name+'</option>'}).join('');
  b.innerHTML=PLANTS.map(function(p){return '<option value="'+p.id+'">'+p.emoji+' '+p.name+'</option>'}).join('');
  a.value='';b.value='';
}
function comparePlants(){
  var aid=parseInt(document.getElementById('compareA').value,10),bid=parseInt(document.getElementById('compareB').value,10);
  if(!aid||!bid){alert('\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043e\u0431\u0430 \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u044f');return}
  if(aid===bid){alert('\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0432\u0430 \u0440\u0430\u0437\u043d\u044b\u0445 \u0440\u0430\u0441\u0442\u0435\u043d\u0438\u044f');return}
  var A=PLANTS.find(function(p){return p.id===aid}),B=PLANTS.find(function(p){return p.id===bid});
  track('compares');
  function rows(){
    return [
      ['\ud83d\udccd \u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f',A.category,B.category],
      ['\u2b50 \u0421\u043b\u043e\u0436\u043d\u043e\u0441\u0442\u044c','\u2605'.repeat(A.difficulty),'\u2605'.repeat(B.difficulty)],
      ['\ud83d\udca7 \u041f\u043e\u043b\u0438\u0432',A.care.watering,B.care.watering],
      ['\u2600\ufe0f \u0421\u0432\u0435\u0442',A.care.light,B.care.light],
      ['\ud83c\udf0d \u041f\u043e\u0447\u0432\u0430',A.care.soil,B.care.soil],
      ['\ud83c\udf21\ufe0f \u0422\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430',A.care.temperature,B.care.temperature],
      ['\ud83e\uddea \u041f\u043e\u0434\u043a\u043e\u0440\u043c\u043a\u0430',A.care.fertilizer,B.care.fertilizer],
      ['\ud83e\udd1d \u0421\u043e\u0432\u0435\u0442',A.care.tips,B.care.tips],
      ['\ud83d\udcc6 \u041f\u043e\u0441\u0430\u0434\u043a\u0430',A.planting,B.planting],
      ['\ud83e\udded \u0423\u0440\u043e\u0436\u0430\u0439',A.harvest||'\u2014',B.harvest||'\u2014'],
      ['\u26a0\ufe0f \u0411\u043e\u043b\u0435\u0437\u043d\u0438',A.care.diseases,B.care.diseases]
    ];
  }
  function cell(txt,extra){
    return '<td class="'+(extra||'')+'">'+esc(txt)+'</td>';
  }
  document.getElementById('compareResult').innerHTML='<div class="compare-table-wrap"><table class="compare-table"><thead><tr><th>\u041f\u0430\u0440\u0430\u043c\u0435\u0442\u0440</th><th>'+A.emoji+' '+esc(A.name)+'</th><th>'+B.emoji+' '+esc(B.name)+'</th></tr></thead><tbody>'+rows().map(function(r){
    return '<tr><td>'+r[0]+'</td>'+cell(r[1])+cell(r[2])+'</tr>';
  }).join('')+'</tbody></table></div>';
  document.getElementById('compareResult').scrollIntoView({behavior:'smooth'});
}

/* ─── EXPORT / IMPORT ─── */
function exportData(){
  var user=currentUser?currentUser.username:'guest';
  var out={exportedAt:new Date().toISOString(),user:user};
  var keys=['plantifi_stats_','plantifi_chats_','plantifi_ach_','plantifi_garden_','plantifi_journal_','plantifi_notes_','plantifi_events_','plantifi_theme'];
  keys.forEach(function(k){var v=localStorage.getItem(k+user);if(v)out[k+user]=JSON.parse(v)});
  var comm=localStorage.getItem('plantifi_community');
  if(comm)out['plantifi_community']=JSON.parse(comm);
  var blob=new Blob([JSON.stringify(out,null,2)],{type:'application/json'});
  var url=URL.createObjectURL(blob);
  var a=document.createElement('a');
  a.href=url;a.download='plantifi_backup_'+user+'.json';document.body.appendChild(a);a.click();
  setTimeout(function(){URL.revokeObjectURL(url);a.remove()},500);
  track('exports');
  alert('\u0414\u0430\u043d\u043d\u044b\u0435 \u044d\u043a\u0441\u043f\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u044b! \u0424\u0430\u0439\u043b plantifi_backup_'+user+'.json \u0441\u043a\u0430\u0447\u0430\u043d \ud83d\udce6');
}
function handleImport(e){
  var file=e.target.files[0];
  if(!file)return;
  var reader=new FileReader();
  reader.onload=function(){
    try{
      var data=JSON.parse(reader.result);
      var backupUser=data.user||'guest';
      var user=currentUser?currentUser.username:'guest';
      var count=0;
      Object.keys(data).forEach(function(k){
        if(k.indexOf('plantifi_')!==0||k==='exportedAt'||k==='user')return;
        var val;
        if(k==='plantifi_community'||k==='plantifi_theme'){val=data[k]}
        else if(k.indexOf('_'+backupUser)!==-1){k=k.replace(new RegExp('_'+backupUser+'$'),'_'+user);val=data[k]}
        else return;
        localStorage.setItem(k,typeof val==='string'?val:JSON.stringify(val));
        count++;
      });
      alert('\u0418\u043c\u043f\u043e\u0440\u0442 \u0433\u043e\u0442\u043e\u0432 \u2713 \u0412\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d\u043e '+count+' \u043e\u0431\u043b\u0430\u0441\u0442\u0435\u0439 \u0434\u0430\u043d\u043d\u044b\u0445. \u041f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430...');
      setTimeout(function(){location.reload()},900);
    }catch(err){alert('\u041d\u0435\u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u0440\u043e\u0447\u0438\u0442\u0430\u0442\u044c \u0444\u0430\u0439\u043b: '+err.message);return}
  };
  reader.readAsText(file);
}
