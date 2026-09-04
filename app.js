/* ─── STATE ─── */
let currentUser = null;
let currentCategory = 'all';
let selectedMood = '😊';
let calendarDate = new Date();
let selectedCalDate = null;
let adminUnlocked = false;
const ADMIN_PASSWORD = 'plantifi2026';

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  currentUser = JSON.parse(localStorage.getItem('plantifi_user'));
  updateUI();
  renderCatalog();
  renderJournal();
  renderNotes();
  renderProposals();
  renderCalendar();
  renderCommunity();
  document.getElementById('journalDate').value = new Date().toISOString().split('T')[0];
});

/* ─── AUTH ─── */
function toggleAuth() {
  if (currentUser) {
    if (confirm('Выйти из аккаунта?')) {
      currentUser = null;
      localStorage.removeItem('plantifi_user');
      updateUI();
    }
  } else {
    document.getElementById('authModal').classList.remove('hidden');
  }
}

function showRegister() {
  document.getElementById('authLoginForm').classList.add('hidden');
  document.getElementById('authRegisterForm').classList.remove('hidden');
  document.getElementById('authTitle').textContent = 'Регистрация';
}

function showLogin() {
  document.getElementById('authRegisterForm').classList.add('hidden');
  document.getElementById('authLoginForm').classList.remove('hidden');
  document.getElementById('authTitle').textContent = 'Вход';
}

function register() {
  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value;
  if (!username || !password) { alert('Заполните все поля'); return; }
  const users = JSON.parse(localStorage.getItem('plantifi_users') || '{}');
  if (users[username]) { alert('Пользователь уже существует'); return; }
  users[username] = { password, email: document.getElementById('regEmail').value, joined: new Date().toISOString() };
  localStorage.setItem('plantifi_users', JSON.stringify(users));
  currentUser = { username };
  localStorage.setItem('plantifi_user', JSON.stringify(currentUser));
  closeModal('authModal');
  updateUI();
}

function login() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  const users = JSON.parse(localStorage.getItem('plantifi_users') || '{}');
  if (users[username] && users[username].password === password) {
    currentUser = { username };
    localStorage.setItem('plantifi_user', JSON.stringify(currentUser));
    closeModal('authModal');
    updateUI();
  } else {
    alert('Неверное имя пользователя или пароль');
  }
}

function updateUI() {
  const greeting = document.getElementById('userGreeting');
  const authBtn = document.getElementById('authBtn');
  if (currentUser) {
    greeting.textContent = `👤 ${currentUser.username}`;
    authBtn.textContent = 'Выйти';
  } else {
    greeting.textContent = '';
    authBtn.textContent = 'Войти';
  }
  updateCalendarForm();
}

/* ─── NAVIGATION ─── */
function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.getElementById(name + 'Section').classList.remove('hidden');
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelector(`.nav-link[data-section="${name}"]`).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('show');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.add('hidden');
  });
});

/* ─── CATALOG ─── */
function renderCatalog() {
  const grid = document.getElementById('plantGrid');
  grid.innerHTML = PLANTS.map(p => `
    <div class="plant-card" onclick="openPlant(${p.id})">
      <div class="plant-card-img">
        ${p.emoji}
        <span class="plant-card-category">${p.category}</span>
      </div>
      <div class="plant-card-body">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="plant-card-meta">
          <span class="plant-meta-item">🌱 ${p.season}</span>
          <span class="plant-meta-item">🎯 Сложность:</span>
          <div class="plant-difficulty">
            ${Array(3).fill(0).map((_, i) => `<div class="diff-dot ${i < p.difficulty ? 'filled' : ''}"></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterPlants() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.plant-card');
  PLANTS.forEach((p, i) => {
    const matchSearch = p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.latin.toLowerCase().includes(query);
    const matchCat = currentCategory === 'all' || p.category === currentCategory;
    cards[i].style.display = (matchSearch && matchCat) ? '' : 'none';
  });
}

function filterByCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  filterPlants();
}

/* ─── PLANT DETAIL ─── */
function openPlant(id) {
  const p = PLANTS.find(x => x.id === id);
  if (!p) return;

  const content = document.getElementById('plantDetailContent');
  content.innerHTML = `
    <div class="plant-detail">
      <div class="plant-detail-header">
        <div class="plant-detail-emoji">${p.emoji}</div>
        <div class="plant-detail-info">
          <h1>${p.name}</h1>
          <div class="latin">${p.latin}</div>
          <div class="plant-tags">
            <span class="plant-tag">${p.category}</span>
            <span class="plant-tag">${p.season}</span>
            <span class="plant-tag">Сложность: ${'●'.repeat(p.difficulty)}${'○'.repeat(3-p.difficulty)}</span>
          </div>
          <p>${p.description}</p>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-card">
          <div class="icon">💧</div>
          <div class="label">Полив</div>
          <div class="value">${p.care.watering.split('.')[0]}</div>
        </div>
        <div class="info-card">
          <div class="icon">☀️</div>
          <div class="label">Освещение</div>
          <div class="value">${p.care.light.split('.')[0]}</div>
        </div>
        <div class="info-card">
          <div class="icon">🌡️</div>
          <div class="label">Температура</div>
          <div class="value">${p.care.temperature.split('.')[0]}</div>
        </div>
        <div class="info-card">
          <div class="icon">🌱</div>
          <div class="label">Посадка</div>
          <div class="value">${p.planting.split('.')[0]}</div>
        </div>
      </div>

      <h3>🔍 Подробный уход</h3>
      <div class="detail-content">
        <div class="tip-box">
          <strong>💧 Полив:</strong> ${p.care.watering}
        </div>
        <div class="tip-box">
          <strong>☀️ Освещение:</strong> ${p.care.light}
        </div>
        <div class="tip-box">
          <strong>🌍 Почва:</strong> ${p.care.soil}
        </div>
        <div class="tip-box">
          <strong>🌡️ Температура:</strong> ${p.care.temperature}
        </div>
        <div class="tip-box">
          <strong>🧪 Удобрения:</strong> ${p.care.fertilizer}
        </div>
        <div class="tip-box warning">
          <strong>⚠️ Болезни и вредители:</strong> ${p.care.diseases}
        </div>
        <div class="tip-box">
          <strong>💡 Советы:</strong> ${p.care.tips}
        </div>
      </div>

      <h3>📅 Сроки</h3>
      <div class="detail-content">
        <p><strong>Посадка:</strong> ${p.planting}</p>
        <p><strong>Сбор урожая:</strong> ${p.harvest}</p>
      </div>

      ${currentUser ? `
        <div class="propose-btn">
          <button class="btn btn-primary" onclick="openPropose(${p.id})">✏️ Предложить изменение</button>
        </div>
      ` : '<p style="margin-top:1rem;color:var(--text-muted);font-size:0.85rem">Войдите, чтобы предлагать изменения</p>'}
    </div>
  `;
  document.getElementById('plantModal').classList.remove('hidden');
}

/* ─── PROPOSE ─── */
function openPropose(plantId) {
  document.getElementById('proposePlantId').value = plantId;
  document.getElementById('proposeText').value = '';
  document.getElementById('proposeModal').classList.remove('hidden');
}

function submitProposal() {
  if (!currentUser) { alert('Войдите в аккаунт'); return; }
  const plantId = parseInt(document.getElementById('proposePlantId').value);
  const field = document.getElementById('proposeField').value;
  const text = document.getElementById('proposeText').value.trim();
  if (!text) { alert('Введите текст предложения'); return; }

  const proposals = JSON.parse(localStorage.getItem('plantifi_proposals') || '[]');
  proposals.push({
    id: Date.now(),
    plantId,
    field,
    text,
    author: currentUser.username,
    status: 'pending',
    date: new Date().toISOString()
  });
  localStorage.setItem('plantifi_proposals', JSON.stringify(proposals));
  closeModal('proposeModal');
  alert('Предложение отправлено! Спасибо за вклад.');
  renderProposals();
}

/* ─── JOURNAL ─── */
function renderJournal() {
  updateJournalSelect();
  const entries = JSON.parse(localStorage.getItem(`plantifi_journal_${currentUser?.username || 'guest'}`) || '[]');
  const container = document.getElementById('journalEntries');
  container.innerHTML = entries.length === 0
    ? '<p style="color:var(--text-muted);text-align:center;padding:2rem;">Пока нет записей. Начните наблюдение!</p>'
    : entries.reverse().map(e => `
      <div class="journal-entry">
        <div class="journal-entry-header">
          <span class="journal-entry-plant">${getPlantEmoji(e.plantId)} ${getPlantName(e.plantId)}</span>
          <span class="journal-entry-mood">${e.mood}</span>
          <span class="journal-entry-date">${formatDate(e.date)}</span>
        </div>
        <div class="journal-entry-text">${escapeHtml(e.text)}</div>
        ${e.photo ? `<img src="${e.photo}" class="journal-entry-photo">` : ''}
        <div class="journal-entry-actions">
          <button class="btn btn-sm btn-danger" onclick="deleteJournal('${e.id}')">Удалить</button>
        </div>
      </div>
    `).join('');
}

function addJournalEntry() {
  if (!currentUser) { alert('Войдите в аккаунт'); return; }
  const plantId = document.getElementById('journalPlant').value;
  const date = document.getElementById('journalDate').value;
  const text = document.getElementById('journalText').value.trim();
  if (!plantId || !text) { alert('Выберите растение и введите наблюдение'); return; }

  const photoInput = document.getElementById('journalPhoto');
  const saveEntry = (photoDataUrl) => {
    const entries = JSON.parse(localStorage.getItem(`plantifi_journal_${currentUser.username}`) || '[]');
    entries.push({
      id: String(Date.now()),
      plantId: parseInt(plantId),
      date,
      text,
      mood: selectedMood,
      photo: photoDataUrl || null
    });
    localStorage.setItem(`plantifi_journal_${currentUser.username}`, JSON.stringify(entries));
    document.getElementById('journalText').value = '';
    document.getElementById('photoPreview').classList.add('hidden');
    renderJournal();
  };

  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => saveEntry(e.target.result);
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    saveEntry();
  }
}

function deleteJournal(id) {
  const key = `plantifi_journal_${currentUser?.username || 'guest'}`;
  const entries = JSON.parse(localStorage.getItem(key) || '[]');
  localStorage.setItem(key, JSON.stringify(entries.filter(e => e.id !== id)));
  renderJournal();
}

function setMood(mood, btn) {
  selectedMood = mood;
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function previewPhoto(event) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = document.getElementById('photoPreview');
    img.src = e.target.result;
    img.classList.remove('hidden');
  };
  reader.readAsDataURL(event.target.files[0]);
}

/* ─── NOTES ─── */
function renderNotes() {
  const notes = JSON.parse(localStorage.getItem(`plantifi_notes_${currentUser?.username || 'guest'}`) || '[]');
  const container = document.getElementById('notesList');
  container.innerHTML = notes.length === 0
    ? '<p style="color:var(--text-muted);text-align:center;padding:2rem;">Нет заметок.</p>'
    : notes.reverse().map(n => `
      <div class="note-card">
        <h3>${escapeHtml(n.title)}</h3>
        <p>${escapeHtml(n.text)}</p>
        <div class="note-card-footer">
          <span class="note-date">${formatDate(n.date)}</span>
          ${n.proposed ? '<span class="note-badge proposed">Предложено публично</span>' : ''}
          <div>
            <button class="btn btn-sm btn-danger" onclick="deleteNote('${n.id}')">Удалить</button>
          </div>
        </div>
      </div>
    `).join('');
}

function addNote() {
  if (!currentUser) { alert('Войдите в аккаунт'); return; }
  const title = document.getElementById('noteTitle').value.trim();
  const text = document.getElementById('noteText').value.trim();
  const proposed = document.getElementById('notePublic').checked;
  if (!title || !text) { alert('Заполните заголовок и текст'); return; }

  const notes = JSON.parse(localStorage.getItem(`plantifi_notes_${currentUser.username}`) || '[]');
  notes.push({ id: String(Date.now()), title, text, proposed, date: new Date().toISOString() });
  localStorage.setItem(`plantifi_notes_${currentUser.username}`, JSON.stringify(notes));

  if (proposed) {
    const proposals = JSON.parse(localStorage.getItem('plantifi_proposals') || '[]');
    proposals.push({
      id: Date.now(),
      plantId: null,
      field: 'community_note',
      text: `📝 ${title}\n\n${text}`,
      author: currentUser.username,
      status: 'pending',
      date: new Date().toISOString()
    });
    localStorage.setItem('plantifi_proposals', JSON.stringify(proposals));
    renderProposals();
  }

  document.getElementById('noteTitle').value = '';
  document.getElementById('noteText').value = '';
  document.getElementById('notePublic').checked = false;
  renderNotes();
}

function deleteNote(id) {
  const key = `plantifi_notes_${currentUser?.username || 'guest'}`;
  const notes = JSON.parse(localStorage.getItem(key) || '[]');
  localStorage.setItem(key, JSON.stringify(notes.filter(n => n.id !== id)));
  renderNotes();
}

/* ─── PROPOSALS ─── */
function renderProposals() {
  const proposals = JSON.parse(localStorage.getItem('plantifi_proposals') || '[]');
  const container = document.getElementById('proposalsList');

  container.innerHTML = proposals.length === 0
    ? '<p style="color:var(--text-muted);text-align:center;padding:2rem;">Пока нет предложений.</p>'
    : proposals.reverse().map(p => `
      <div class="proposal-card">
        <div class="proposal-header">
          <div>
            <span class="proposal-author">👤 ${escapeHtml(p.author)} • ${formatDate(p.date)}</span>
          </div>
          <span class="proposal-status ${p.status}">${statusText(p.status)}</span>
        </div>
        <div class="proposal-body">
          <div class="proposal-field">🌱 ${p.plantId ? getPlantName(p.plantId) : 'Общее'} • 📝 Поле: ${fieldName(p.field)}</div>
          <div class="proposal-text">${escapeHtml(p.text)}</div>
        </div>
        ${adminUnlocked && p.status === 'pending' ? `
          <div class="proposal-actions">
            <button class="btn btn-sm btn-primary" onclick="approveProposal(${p.id})">✅ Одобрить</button>
            <button class="btn btn-sm btn-danger" onclick="rejectProposal(${p.id})">❌ Отклонить</button>
          </div>
        ` : ''}
      </div>
    `).join('');
}

function toggleAdmin() {
  const show = document.getElementById('adminMode').checked;
  document.getElementById('adminPassword').classList.toggle('hidden', !show);
  document.getElementById('adminUnlock').classList.toggle('hidden', !show);
  if (!show) {
    adminUnlocked = false;
    renderProposals();
  }
}

function unlockAdmin() {
  const pw = document.getElementById('adminPassword').value;
  if (pw === ADMIN_PASSWORD) {
    adminUnlocked = true;
    renderProposals();
    alert('Режим владельца активирован!');
  } else {
    alert('Неверный пароль');
  }
}

function approveProposal(id) {
  const proposals = JSON.parse(localStorage.getItem('plantifi_proposals') || '[]');
  const p = proposals.find(x => x.id === id);
  if (p) {
    p.status = 'approved';
    localStorage.setItem('plantifi_proposals', JSON.stringify(proposals));
    alert('Предложение одобрено!');
    renderProposals();
  }
}

function rejectProposal(id) {
  const proposals = JSON.parse(localStorage.getItem('plantifi_proposals') || '[]');
  const p = proposals.find(x => x.id === id);
  if (p) {
    p.status = 'rejected';
    localStorage.setItem('plantifi_proposals', JSON.stringify(proposals));
    alert('Предложение отклонено.');
    renderProposals();
  }
}

/* ─── CALENDAR ─── */
function renderCalendar() {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  document.getElementById('calendarMonth').textContent = `${months[month]} ${year}`;

  const grid = document.getElementById('calendarGrid');
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const events = JSON.parse(localStorage.getItem(`plantifi_events_${currentUser?.username || 'guest'}`) || '[]');
  const eventColors = { water: '#42a5f5', fertilize: '#66bb6a', repot: '#ffa726', prune: '#ef5350', harvest: '#ab47bc' };

  let html = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d => `<div class="cal-header">${d}</div>`).join('');

  const startDay = firstDay === 0 ? 6 : firstDay - 1;
  for (let i = 0; i < startDay; i++) html += '<div class="cal-day empty"></div>';

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const dayEvents = events.filter(e => e.date === dateStr);
    const isSelected = selectedCalDate === dateStr;

    html += `
      <div class="cal-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}" onclick="selectCalDate('${dateStr}')">
        <span>${d}</span>
        <div class="cal-day-events">
          ${dayEvents.slice(0,3).map(e => `<div class="cal-day-event" style="background:${eventColors[e.type] || '#999'}"></div>`).join('')}
        </div>
      </div>`;
  }

  grid.innerHTML = html;
  renderCalendarEvents();
}

function changeMonth(delta) {
  calendarDate.setMonth(calendarDate.getMonth() + delta);
  renderCalendar();
}

function selectCalDate(dateStr) {
  selectedCalDate = dateStr;
  document.getElementById('calendarEventForm').style.display = 'block';
  document.getElementById('eventDate').textContent = formatDate(dateStr);
  renderCalendar();
}

function updateCalendarForm() {
  const select = document.getElementById('eventPlant');
  select.innerHTML = '<option value="">Растение...</option>' +
    PLANTS.map(p => `<option value="${p.id}">${p.emoji} ${p.name}</option>`).join('');
}

function addCalendarEvent() {
  if (!currentUser) { alert('Войдите в аккаунт'); return; }
  const plantId = document.getElementById('eventPlant').value;
  const type = document.getElementById('eventType').value;
  const note = document.getElementById('eventNote').value;
  if (!selectedCalDate) { alert('Выберите дату'); return; }

  const events = JSON.parse(localStorage.getItem(`plantifi_events_${currentUser.username}`) || '[]');
  events.push({ id: Date.now(), date: selectedCalDate, plantId: parseInt(plantId), type, note });
  localStorage.setItem(`plantifi_events_${currentUser.username}`, JSON.stringify(events));

  document.getElementById('eventNote').value = '';
  document.getElementById('calendarEventForm').style.display = 'none';
  selectedCalDate = null;
  renderCalendar();
}

function renderCalendarEvents() {
  const events = JSON.parse(localStorage.getItem(`plantifi_events_${currentUser?.username || 'guest'}`) || '[]');
  const monthEvents = events.filter(e => {
    const d = new Date(e.date);
    return d.getMonth() === calendarDate.getMonth() && d.getFullYear() === calendarDate.getFullYear();
  }).sort((a, b) => a.date.localeCompare(b.date));

  const typeIcons = { water: '💧', fertilize: '🧪', repot: '🪴', prune: '✂️', harvest: '🧺' };
  const container = document.getElementById('calendarEvents');
  container.innerHTML = monthEvents.length === 0
    ? '<p style="color:var(--text-muted);text-align:center;">Нет событий в этом месяце</p>'
    : `<h3>События:</h3>` + monthEvents.map(e => `
      <div class="cal-event">
        <div class="cal-event-icon">${typeIcons[e.type] || '📌'}</div>
        <div class="cal-event-info">
          <div class="cal-event-plant">${getPlantEmoji(e.plantId)} ${getPlantName(e.plantId)}</div>
          <div class="cal-event-note">${formatDate(e.date)}${e.note ? ' • ' + escapeHtml(e.note) : ''}</div>
        </div>
        <button class="btn btn-sm btn-danger" onclick="deleteEvent(${e.id})">✕</button>
      </div>
    `).join('');
}

function deleteEvent(id) {
  const key = `plantifi_events_${currentUser?.username || 'guest'}`;
  const events = JSON.parse(localStorage.getItem(key) || '[]');
  localStorage.setItem(key, JSON.stringify(events.filter(e => e.id !== id)));
  renderCalendar();
}

/* ─── COMMUNITY ─── */
let communityFilter = 'all';

function renderCommunity() {
  const posts = JSON.parse(localStorage.getItem('plantifi_community') || '[]');
  const filtered = communityFilter === 'all' ? posts : posts.filter(p => p.category === communityFilter);
  const catColors = { tip: '#66bb6a', question: '#42a5f5', photo: '#ab47bc', success: '#ffd54f', problem: '#ef5350' };
  const catLabels = { tip: '💡 Совет', question: '❓ Вопрос', photo: '📸 Фото', success: '🎉 Успех', problem: '⚠️ Проблема' };

  const container = document.getElementById('communityFeed');
  container.innerHTML = filtered.length === 0
    ? '<p style="color:var(--text-muted);text-align:center;padding:2rem;">Нет постов.</p>'
    : filtered.reverse().map(p => `
      <div class="post-card">
        <div class="post-header">
          <span class="post-author">👤 ${escapeHtml(p.author)}</span>
          <span class="post-category-badge" style="background:${catColors[p.category] || '#666'};color:white">${catLabels[p.category] || p.category}</span>
        </div>
        <div class="post-text">${escapeHtml(p.text)}</div>
        <div class="post-footer">
          <span class="post-date">${formatDate(p.date)}</span>
          <div class="post-actions">
            <button class="post-action" onclick="likePost(${p.id})">👍 ${p.likes || 0}</button>
          </div>
        </div>
      </div>
    `).join('');
}

function addCommunityPost() {
  if (!currentUser) { alert('Войдите в аккаунт'); return; }
  const text = document.getElementById('communityPost').value.trim();
  const category = document.getElementById('postCategory').value;
  if (!text) { alert('Введите текст поста'); return; }

  const posts = JSON.parse(localStorage.getItem('plantifi_community') || '[]');
  posts.push({
    id: Date.now(),
    author: currentUser.username,
    text,
    category,
    likes: 0,
    date: new Date().toISOString()
  });
  localStorage.setItem('plantifi_community', JSON.stringify(posts));
  document.getElementById('communityPost').value = '';
  renderCommunity();
}

function likePost(id) {
  const posts = JSON.parse(localStorage.getItem('plantifi_community') || '[]');
  const p = posts.find(x => x.id === id);
  if (p) {
    p.likes = (p.likes || 0) + 1;
    localStorage.setItem('plantifi_community', JSON.stringify(posts));
    renderCommunity();
  }
}

function filterPosts(cat, btn) {
  communityFilter = cat;
  btn.parentElement.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderCommunity();
}

/* ─── HELPERS ─── */
function getPlantName(id) {
  const p = PLANTS.find(x => x.id === id);
  return p ? p.name : 'Неизвестное';
}

function getPlantEmoji(id) {
  const p = PLANTS.find(x => x.id === id);
  return p ? p.emoji : '🌿';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}

function statusText(s) {
  return { pending: '⏳ Ожидает', approved: '✅ Одобрено', rejected: '❌ Отклонено' }[s] || s;
}

function fieldName(f) {
  const names = {
    description: 'Описание', watering: 'Полив', light: 'Освещение', soil: 'Грунт',
    temperature: 'Температура', fertilizer: 'Удобрения', diseases: 'Болезни', tips: 'Советы',
    community_note: 'Публичная заметка'
  };
  return names[f] || f;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
