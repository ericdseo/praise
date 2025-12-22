// ===========================
// 칭찬 스티커 앱 v3.0 - Multilingual + Unlimited Emojis
// ===========================

// Language System
const LANGUAGES = {
    ko: {
        appTitle: '🌟 칭찬 스티커',
        btnAdd: '보상 추가',
        btnAddFirst: '첫 번째 보상 추가하기',
        emptyTitle: '보상을 추가해 보세요!',
        emptyDesc: '아이가 스티커를 모아 받을 수 있는\n보상을 설정해 주세요.',
        btnBack: '뒤로',
        stickerSelect: '스티커 선택',
        btnClearAll: '모두 지우기',
        modalTitleNew: '새 보상 추가',
        modalTitleEdit: '보상 수정',
        labelEmoji: '이모지',
        labelName: '보상 이름',
        labelTarget: '필요한 스티커 수',
        placeholderName: '예: 아이스크림, 게임 30분',
        btnCancel: '취소',
        btnSave: '저장하기',
        celebrationTitle: '축하해요!',
        btnClaim: '보상 받기! 🎁',
        remaining: '개 더 필요해요',
        goalAchieved: '🎉 목표 달성!',
        goToStickers: '스티커 붙이기 ⭐',
        emojiInputPrompt: '이모지를 입력하세요 (예: 🌟)',
        emojiInputInvalid: '올바른 이모지를 입력해주세요',
        tabFood: '음식',
        tabPlay: '놀이',
        tabGift: '선물',
        tabAnimal: '동물',
        tabSpecial: '특별',
        stickerLimitReached: '필요한 스티커 개수에 도달했어요!',
        confirmClearAll: '모든 스티커를 지울까요?',
        confirmDelete: '정말 이 보상을 삭제할까요?',
        filterActive: '진행중',
        filterCompleted: '완료됨',
        filterAll: '전체',
        completedBadge: '완료',
        completedOn: '완료',
        btnRestart: '재시작 🔄',
        btnViewStickers: '스티커 보기',
        readonlyTitle: '⚠️ 읽기 전용',
        readonlyDesc: '스티커를 수정하려면 메인 화면에서 "재시작"을 클릭하세요',
        confirmRestart: '이 보상을 다시 시작할까요? 기존 스티커가 모두 지워집니다.',
        emojiPickerTitle: '이모지 선택',
        clearAll: '모두 지우기'
    },
    en: {
        appTitle: '🌟 Praise Stickers',
        btnAdd: 'Add Reward',
        btnAddFirst: 'Add Your First Reward',
        emptyTitle: 'Add a Reward!',
        emptyDesc: 'Set up rewards that your child\ncan earn by collecting stickers.',
        btnBack: 'Back',
        stickerSelect: 'Select Sticker',
        btnClearAll: 'Clear All',
        modalTitleNew: 'New Reward',
        modalTitleEdit: 'Edit Reward',
        labelEmoji: 'Emoji',
        labelName: 'Reward Name',
        labelTarget: 'Stickers Needed',
        placeholderName: 'e.g., Ice Cream, 30min Game Time',
        btnCancel: 'Cancel',
        btnSave: 'Save',
        celebrationTitle: 'Congratulations!',
        btnClaim: 'Claim Reward! 🎁',
        remaining: ' more needed',
        goalAchieved: '🎉 Goal Achieved!',
        goToStickers: 'Add Stickers ⭐',
        emojiInputPrompt: 'Enter an emoji (e.g., 🌟)',
        emojiInputInvalid: 'Please enter a valid emoji',
        tabFood: 'Food',
        tabPlay: 'Play',
        tabGift: 'Gifts',
        tabAnimal: 'Animals',
        tabSpecial: 'Special',
        stickerLimitReached: 'You\'ve reached the sticker limit!',
        confirmClearAll: 'Clear all stickers?',
        confirmDelete: 'Delete this reward?',
        filterActive: 'Active',
        filterCompleted: 'Completed',
        filterAll: 'All',
        completedBadge: 'Done',
        completedOn: 'Completed',
        btnRestart: 'Restart 🔄',
        btnViewStickers: 'View Stickers',
        readonlyTitle: '⚠️ Read-only',
        readonlyDesc: 'To edit stickers, click "Restart" on the main screen',
        confirmRestart: 'Restart this reward? All existing stickers will be cleared.',
        emojiPickerTitle: 'Choose Emoji',
        clearAll: 'Clear All'
    }
};

let currentLang = 'ko';

// DOM Elements - Screens
const mainScreen = document.getElementById('mainScreen');
const detailScreen = document.getElementById('detailScreen');

// DOM Elements - Main Screen
const appTitle = document.getElementById('appTitle');
const btnAddReward = document.getElementById('btnAddReward');
const btnAddText = document.getElementById('btnAddText');
const btnAddRewardEmpty = document.getElementById('btnAddRewardEmpty');
const rewardsContainer = document.getElementById('rewardsContainer');
const emptyState = document.getElementById('emptyState');

// DOM Elements - Detail Screen
const detailEmoji = document.getElementById('detailEmoji');
const detailName = document.getElementById('detailName');
const detailCount = document.getElementById('detailCount');
const detailProgressFill = document.getElementById('detailProgressFill');
const stickerGrid = document.getElementById('stickerGrid');
const stickerOptions = document.getElementById('stickerOptions');
const stickerSelectText = document.getElementById('stickerSelectText');

// Buttons
const btnLang = document.getElementById('btnLang');
const btnBack = document.getElementById('btnBack');
const btnClearAll = document.getElementById('btnClearAll');
const btnEmojiInput = document.getElementById('btnEmojiInput');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancelModal = document.getElementById('btnCancelModal');
const btnSaveReward = document.getElementById('btnSaveReward');
const btnClaimReward = document.getElementById('btnClaimReward');
const btnTargetMinus = document.getElementById('btnTargetMinus');
const btnTargetPlus = document.getElementById('btnTargetPlus');

// Modals & Forms
const rewardModal = document.getElementById('rewardModal');
const celebrationOverlay = document.getElementById('celebrationOverlay');
const confettiContainer = document.getElementById('confettiContainer');
const modalTitle = document.getElementById('modalTitle');
const rewardEmoji = document.getElementById('rewardEmoji');
const rewardName = document.getElementById('rewardName');
const rewardTarget = document.getElementById('rewardTarget');
const emojiPicker = document.getElementById('emojiPicker');
const celebrationMessage = document.getElementById('celebrationMessage');

// Emoji Categories
const emojiCategories = {
    food: ['🍦', '🍕', '🍰', '🧁', '🍩', '🍪', '🍫', '🍭', '🥤', '🍿', '🍔', '🍟', '🌮', '🍣', '🍜', '🥐', '🍱', '🍛', '🍲', '🥗'],
    play: ['🎮', '📱', '🎬', '🎨', '🎭', '🎪', '🎢', '🛝', '⚽', '🏀', '🎯', '🎲', '🎸', '🎤', '📚', '✏️', '🎹', '🎺', '🎻', '🏈'],
    gift: ['🎁', '🧸', '🚲', '🛴', '🎠', '💎', '👑', '🎀', '🌈', '✨', '💝', '🎊', '🎈', '🪁', '🏆', '🥇', '🎖️', '🏅', '🎗️', '🔮'],
    animal: ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁', '🐯', '🦄', '🐸', '🐵', '🦋', '🐞', '🐢', '🐬', '🦀', '🐙', '🦈', '🐠'],
    special: ['⭐', '🌟', '💫', '✨', '🏆', '🥇', '🎖️', '👏', '💪', '🎉', '❤️', '💖', '🔥', '🌙', '☀️', '🍀', '🌺', '🌻', '🌼', '🌷']
};

// Default Sticker Collection (Expanded)
const defaultStickers = [
    '⭐', '🌟', '💫', '✨', '💖', '💝', '🎈', '🌈', '🦄', '🎀',
    '🍀', '🌸', '🏆', '🥇', '👑', '💎', '🎯', '🚀', '🎨', '🎵',
    '🌺', '🌻', '🌼', '🌷', '🎁', '🎊', '🎉', '💐', '🌹', '🔥',
    '❤️', '💛', '💚', '💙', '💜', '🧡', '🤍', '🖤', '🤎', '💕',
    '😊', '😎', '🤩', '🥳', '🤗', '👍', '👏', '🙌', '💪', '✌️',
    '🍕', '🍔', '🍟', '🍦', '🍰', '🧁', '🍩', '🍪', '🍫', '🍭',
    '🌙', '☀️', '🌤️', '⛅', '🌈', '⚡', '☄️', '💧', '🌊', '🏖️'
];

// State
let rewards = [];
let editingRewardId = null;
let currentRewardId = null;
let selectedSticker = '⭐';
let currentEmojiCategory = 'food';
let celebratingRewardId = null;
let userStickers = [...defaultStickers];
let currentFilter = 'active'; // 'active' | 'completed' | 'all'
let isPaletteCollapsed = window.innerWidth <= 600; // 모바일에서는 기본 접힌 상태

// ===========================
// Language Functions
// ===========================
function switchLanguage() {
    currentLang = currentLang === 'ko' ? 'en' : 'ko';
    const langText = currentLang === 'ko' ? '🇬🇧 EN' : '🇰🇷 KO';
    btnLang.textContent = langText;
    const btnLangDetail = document.getElementById('btnLangDetail');
    if (btnLangDetail) btnLangDetail.textContent = langText;
    localStorage.setItem('praiseStickers_lang', currentLang);
    updateUIText();
}

function t(key) {
    return LANGUAGES[currentLang][key] || key;
}

function updateUIText() {
    appTitle.textContent = t('appTitle');
    btnAddText.textContent = t('btnAdd');
    stickerSelectText.textContent = t('stickerSelect');
    btnClearAll.textContent = t('btnClearAll');
    btnCancelModal.textContent = t('btnCancel');
    btnSaveReward.textContent = t('btnSave');
    
    // Update modal labels
    const labelEmoji = document.getElementById('labelEmoji');
    const labelName = document.getElementById('labelName');
    const labelTarget = document.getElementById('labelTarget');
    const rewardNameInput = document.getElementById('rewardName');
    
    if (labelEmoji) labelEmoji.textContent = t('labelEmoji');
    if (labelName) labelName.textContent = t('labelName');
    if (labelTarget) labelTarget.textContent = t('labelTarget');
    if (rewardNameInput) rewardNameInput.placeholder = t('placeholderName');
    
    // Update emoji category tabs
    const tabFood = document.getElementById('tabFood');
    const tabPlay = document.getElementById('tabPlay');
    const tabGift = document.getElementById('tabGift');
    const tabAnimal = document.getElementById('tabAnimal');
    const tabSpecial = document.getElementById('tabSpecial');
    
    if (tabFood) tabFood.textContent = t('tabFood');
    if (tabPlay) tabPlay.textContent = t('tabPlay');
    if (tabGift) tabGift.textContent = t('tabGift');
    if (tabAnimal) tabAnimal.textContent = t('tabAnimal');
    if (tabSpecial) tabSpecial.textContent = t('tabSpecial');
    
    // Update filter buttons
    const filterActiveText = document.getElementById('filterActiveText');
    const filterCompletedText = document.getElementById('filterCompletedText');
    const filterAllText = document.getElementById('filterAllText');
    
    if (filterActiveText) filterActiveText.textContent = t('filterActive');
    if (filterCompletedText) filterCompletedText.textContent = t('filterCompleted');
    if (filterAllText) filterAllText.textContent = t('filterAll');
    
    // Update emoji picker modal
    const emojiPickerTitle = document.getElementById('emojiPickerTitle');
    const btnClearAllText = document.getElementById('btnClearAllText');
    
    if (emojiPickerTitle) emojiPickerTitle.textContent = t('emojiPickerTitle');
    if (btnClearAllText) btnClearAllText.textContent = t('clearAll');
    
    const tabFoodPicker = document.getElementById('tabFoodPicker');
    const tabPlayPicker = document.getElementById('tabPlayPicker');
    const tabGiftPicker = document.getElementById('tabGiftPicker');
    const tabAnimalPicker = document.getElementById('tabAnimalPicker');
    const tabSpecialPicker = document.getElementById('tabSpecialPicker');
    
    if (tabFoodPicker) tabFoodPicker.textContent = t('tabFood');
    if (tabPlayPicker) tabPlayPicker.textContent = t('tabPlay');
    if (tabGiftPicker) tabGiftPicker.textContent = t('tabGift');
    if (tabAnimalPicker) tabAnimalPicker.textContent = t('tabAnimal');
    if (tabSpecialPicker) tabSpecialPicker.textContent = t('tabSpecial');
    
    // Update empty state
    const h2 = emptyState.querySelector('h2');
    const p = emptyState.querySelector('p');
    if (h2) h2.textContent = t('emptyTitle');
    if (p) p.innerHTML = t('emptyDesc').replace('\\n', '<br>');
    if (btnAddRewardEmpty) btnAddRewardEmpty.innerHTML = `<span class="plus-icon">+</span> ${t('btnAddFirst')}`;
    
    // Re-render rewards to update text
    renderRewards();
}

// ===========================
// LocalStorage
// ===========================
function saveToStorage() {
    localStorage.setItem('praiseStickers_rewards_v3', JSON.stringify(rewards));
    localStorage.setItem('praiseStickers_userStickers', JSON.stringify(userStickers));
}

function loadFromStorage() {
    const lang = localStorage.getItem('praiseStickers_lang');
    if (lang) {
        currentLang = lang;
        const langText = currentLang === 'ko' ? '🇬🇧 EN' : '🇰🇷 KO';
        btnLang.textContent = langText;
        const btnLangDetail = document.getElementById('btnLangDetail');
        if (btnLangDetail) btnLangDetail.textContent = langText;
    }
    
    const stored = localStorage.getItem('praiseStickers_rewards_v3');
    if (stored) {
        rewards = JSON.parse(stored);
    } else {
        // Try to migrate from v2
        const v2Data = localStorage.getItem('praiseStickers_rewards_v2');
        if (v2Data) {
            rewards = JSON.parse(v2Data);
            saveToStorage();
        }
    }
    
    // Migrate old rewards without status
    rewards = rewards.map(reward => {
        if (!reward.status) {
            reward.status = 'active';
            reward.completedAt = null;
        }
        return reward;
    });
    
    const storedStickers = localStorage.getItem('praiseStickers_userStickers');
    if (storedStickers) {
        userStickers = JSON.parse(storedStickers);
    }
    
    // Save migrated data
    if (rewards.length > 0) {
        saveToStorage();
    }
}

// ===========================
// Render Functions
// ===========================
function renderRewards() {
    // Filter rewards based on currentFilter
    let filteredRewards = rewards;
    
    if (currentFilter === 'active') {
        filteredRewards = rewards.filter(r => r.status !== 'completed');
    } else if (currentFilter === 'completed') {
        filteredRewards = rewards.filter(r => r.status === 'completed');
    }
    
    // Show empty state only if there are NO rewards at all
    if (rewards.length === 0) {
        rewardsContainer.innerHTML = '';
        emptyState.classList.add('visible');
        return;
    }
    
    // Hide empty state if we have rewards (even if filtered results are empty)
    emptyState.classList.remove('visible');
    
    // If filtered results are empty, show empty container
    if (filteredRewards.length === 0) {
        rewardsContainer.innerHTML = '';
        return;
    }
    
    rewardsContainer.innerHTML = filteredRewards.map(reward => {
        const stickerCount = reward.stickers ? reward.stickers.filter(s => s).length : 0;
        const progress = Math.min((stickerCount / reward.target) * 100, 100);
        const isCompleted = reward.status === 'completed';
        const remaining = Math.max(reward.target - stickerCount, 0);
        
        // Format completed date
        let completedDateStr = '';
        if (isCompleted && reward.completedAt) {
            const date = new Date(reward.completedAt);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            completedDateStr = currentLang === 'ko' 
                ? `${month}/${day} ${t('completedOn')}`
                : `${t('completedOn')} ${month}/${day}`;
        }
        
        return `
            <div class="reward-card ${isCompleted ? 'completed-status' : ''}" data-id="${reward.id}">
                <div class="reward-card-header">
                    <div class="reward-info reward-info-clickable" onclick="openDetailScreen('${reward.id}')">
                        <span class="reward-emoji">${reward.emoji}</span>
                        <span class="reward-name">${escapeHtml(reward.name)}</span>
                        ${isCompleted ? `<span class="completed-badge">${t('completedBadge')}</span>` : ''}
                    </div>
                    <div class="reward-actions">
                        <button class="btn-icon btn-edit" onclick="editReward('${reward.id}')" aria-label="Edit">✏️</button>
                        <button class="btn-icon btn-delete" onclick="deleteReward('${reward.id}')" aria-label="Delete">🗑️</button>
                    </div>
                </div>
                <div class="progress-section">
                    <div class="progress-info">
                        <span class="progress-count">
                            <span class="current">${stickerCount}</span> / ${reward.target} ⭐
                        </span>
                        <span class="progress-remaining">
                            ${isCompleted ? `🎉 ${completedDateStr}` : `${remaining}${t('remaining')}`}
                        </span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill ${isCompleted ? 'completed' : ''}" style="width: ${progress}%"></div>
                    </div>
                </div>
                <div class="sticker-buttons">
                    ${isCompleted ? `
                        <button class="btn-sticker btn-sticker-add" onclick="openDetailScreen('${reward.id}')">
                            ${t('btnViewStickers')}
                        </button>
                        <button class="btn-sticker btn-restart" onclick="restartReward('${reward.id}')">
                            ${t('btnRestart')}
                        </button>
                    ` : `
                        <button class="btn-sticker btn-sticker-add" onclick="openDetailScreen('${reward.id}')">
                            ${t('goToStickers')}
                        </button>
                    `}
                </div>
            </div>
        `;
    }).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===========================
// Emoji Picker
// ===========================
function renderEmojiPicker(category) {
    currentEmojiCategory = category;
    const emojis = emojiCategories[category] || emojiCategories.food;
    
    emojiPicker.innerHTML = emojis.map(emoji => `
        <button class="emoji-option ${rewardEmoji.value === emoji ? 'selected' : ''}" data-emoji="${emoji}">${emoji}</button>
    `).join('');
    
    // Update tab states
    document.querySelectorAll('.emoji-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === category);
    });
}

// ===========================
// Sticker Palette
// ===========================
function renderStickerPalette() {
    // Show max 70 stickers
    const visibleCount = Math.min(userStickers.length, 70);
    const visibleStickers = userStickers.slice(0, visibleCount);
    
    stickerOptions.innerHTML = visibleStickers.map(sticker => `
        <button class="sticker-option ${selectedSticker === sticker ? 'selected' : ''}" data-sticker="${sticker}">${sticker}</button>
    `).join('') + `
        <button class="sticker-option add-button" onclick="openEmojiPickerModal()">+</button>
    `;
}

function selectSticker(sticker) {
    selectedSticker = sticker;
    document.querySelectorAll('.sticker-option').forEach(opt => {
        opt.classList.toggle('selected', opt.dataset.sticker === sticker);
    });
    
    // 모바일에서 스티커 선택 시 자동으로 팔레트 접기
    if (window.innerWidth <= 600 && !isPaletteCollapsed) {
        togglePalette();
    }
}

function togglePalette() {
    isPaletteCollapsed = !isPaletteCollapsed;
    const palette = document.querySelector('.sticker-palette');
    const toggleBtn = document.getElementById('btnPaletteToggle');
    
    if (!palette || !toggleBtn) return;
    
    if (isPaletteCollapsed) {
        palette.classList.add('collapsed');
        toggleBtn.textContent = '⬇️';
    } else {
        palette.classList.remove('collapsed');
        toggleBtn.textContent = '⬆️';
    }
}

// ===========================
// Detail Screen
// ===========================
function openDetailScreen(id) {
    const reward = rewards.find(r => r.id === id);
    if (!reward) return;
    
    currentRewardId = id;
    
    // Initialize stickers array if not exists
    if (!reward.stickers) {
        reward.stickers = [];
    }
    
    const isCompleted = reward.status === 'completed';
    
    // Update header
    detailEmoji.textContent = reward.emoji;
    detailName.textContent = reward.name;
    
    // Render grid and update progress
    renderStickerGrid(reward);
    updateDetailProgress(reward);
    renderStickerPalette();
    
    // Show/hide elements based on completion status
    const stickerPalette = document.querySelector('.sticker-palette');
    if (isCompleted) {
        stickerGrid.classList.add('readonly');
        stickerPalette.style.display = 'none';
        showReadonlyNotice(reward);
    } else {
        stickerGrid.classList.remove('readonly');
        stickerPalette.style.display = 'block';
        hideReadonlyNotice();
        
        // 팔레트 초기 상태 설정
        const isMobile = window.innerWidth <= 600;
        isPaletteCollapsed = isMobile;
        
        const toggleBtn = document.getElementById('btnPaletteToggle');
        if (isPaletteCollapsed) {
            stickerPalette.classList.add('collapsed');
            if (toggleBtn) toggleBtn.textContent = '⬇️';
        } else {
            stickerPalette.classList.remove('collapsed');
            if (toggleBtn) toggleBtn.textContent = '⬆️';
        }
    }
    
    // Show detail screen
    mainScreen.style.display = 'none';
    detailScreen.classList.add('visible');
}

function closeDetailScreen() {
    detailScreen.classList.remove('visible');
    mainScreen.style.display = 'block';
    currentRewardId = null;
    renderRewards();
}

function renderStickerGrid(reward) {
    // Create cells equal to target - exactly the number needed
    const totalCells = reward.target;
    
    stickerGrid.innerHTML = '';
    for (let i = 0; i < totalCells; i++) {
        const sticker = reward.stickers[i] || '';
        const cell = document.createElement('div');
        cell.className = `grid-cell ${sticker ? 'has-sticker' : 'empty'}`;
        cell.dataset.index = i;
        cell.textContent = sticker;
        cell.onclick = () => toggleSticker(i);
        stickerGrid.appendChild(cell);
    }
}

function updateDetailProgress(reward) {
    const stickerCount = reward.stickers ? reward.stickers.filter(s => s).length : 0;
    const progress = Math.min((stickerCount / reward.target) * 100, 100);
    const isCompleted = stickerCount >= reward.target;
    
    detailCount.textContent = `${stickerCount} / ${reward.target}`;
    detailProgressFill.style.width = `${progress}%`;
    detailProgressFill.classList.toggle('completed', isCompleted);
}

function toggleSticker(index) {
    const reward = rewards.find(r => r.id === currentRewardId);
    if (!reward) return;
    
    // Prevent changes if completed
    if (reward.status === 'completed') {
        return; // Do nothing for completed rewards
    }
    
    if (!reward.stickers) {
        reward.stickers = [];
    }
    
    // Expand array if needed
    while (reward.stickers.length <= index) {
        reward.stickers.push('');
    }
    
    // Toggle sticker
    if (reward.stickers[index]) {
        // Remove sticker
        reward.stickers[index] = '';
    } else {
        // Check if we've reached the target limit
        const currentCount = reward.stickers.filter(s => s).length;
        if (currentCount >= reward.target) {
            alert(t('stickerLimitReached'));
            return;
        }
        // Add sticker
        reward.stickers[index] = selectedSticker;
    }
    
    saveToStorage();
    renderStickerGrid(reward);
    updateDetailProgress(reward);
    
    // Check for completion
    const stickerCount = reward.stickers.filter(s => s).length;
    if (stickerCount >= reward.target) {
        setTimeout(() => showCelebration(reward), 300);
    }
}

function clearAllStickers() {
    if (!confirm(t('confirmClearAll'))) return;
    
    const reward = rewards.find(r => r.id === currentRewardId);
    if (!reward) return;
    
    reward.stickers = [];
    saveToStorage();
    renderStickerGrid(reward);
    updateDetailProgress(reward);
}

// ===========================
// Reward CRUD
// ===========================
function openAddModal() {
    editingRewardId = null;
    modalTitle.textContent = t('modalTitleNew');
    rewardEmoji.value = '🎁';
    rewardName.value = '';
    rewardTarget.value = '10';
    
    renderEmojiPicker('food');
    rewardModal.classList.add('visible');
    rewardName.focus();
}

function editReward(id) {
    const reward = rewards.find(r => r.id === id);
    if (!reward) return;
    
    editingRewardId = id;
    modalTitle.textContent = t('modalTitleEdit');
    rewardEmoji.value = reward.emoji;
    rewardName.value = reward.name;
    rewardTarget.value = reward.target;
    
    // Find which category contains this emoji
    for (const [cat, emojis] of Object.entries(emojiCategories)) {
        if (emojis.includes(reward.emoji)) {
            renderEmojiPicker(cat);
            break;
        }
    }
    
    rewardModal.classList.add('visible');
    rewardName.focus();
}

function saveReward() {
    const emoji = rewardEmoji.value || '🎁';
    const name = rewardName.value.trim();
    const target = parseInt(rewardTarget.value) || 10;
    
    if (!name) {
        rewardName.focus();
        rewardName.style.borderColor = '#f5576c';
        setTimeout(() => {
            rewardName.style.borderColor = '';
        }, 2000);
        return;
    }
    
    if (editingRewardId) {
        // Update existing
        const index = rewards.findIndex(r => r.id === editingRewardId);
        if (index !== -1) {
            rewards[index].emoji = emoji;
            rewards[index].name = name;
            rewards[index].target = target;
        }
    } else {
        // Create new
        rewards.push({
            id: generateId(),
            emoji,
            name,
            target,
            stickers: [],
            createdAt: Date.now()
        });
    }
    
    saveToStorage();
    renderRewards();
    closeModal();
}

function deleteReward(id) {
    if (confirm(t('confirmDelete'))) {
        rewards = rewards.filter(r => r.id !== id);
        saveToStorage();
        renderRewards();
    }
}

function generateId() {
    return 'reward_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ===========================
// Readonly \u0026 Restart Functions
// ===========================
function showReadonlyNotice(reward) {
    // Remove existing notice if any
    hideReadonlyNotice();
    
    // Create readonly notice
    const notice = document.createElement('div');
    notice.id = 'readonlyNotice';
    notice.className = 'detail-readonly-notice';
    
    const completedDate = reward.completedAt ? new Date(reward.completedAt).toLocaleDateString() : '';
    
    notice.innerHTML = `
        <h3>${t('readonlyTitle')}</h3>
        <p>${t('readonlyDesc')}</p>
        ${completedDate ? `<p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 8px;">🎉 ${completedDate}</p>` : ''}
        <button class="btn-primary btn-restart" onclick="restartCurrentReward()">
            ${t('btnRestart')}
        </button>
    `;
    
    // Insert after progress bar
    const progressBar = document.querySelector('.detail-progress-bar');
    if (progressBar) {
        progressBar.after(notice);
    }
}

function hideReadonlyNotice() {
    const notice = document.getElementById('readonlyNotice');
    if (notice) {
        notice.remove();
    }
}

function restartReward(id) {
    if (!confirm(t('confirmRestart'))) return;
    
    const reward = rewards.find(r => r.id === id);
    if (!reward) return;
    
    reward.status = 'active';
    reward.stickers = [];
    reward.completedAt = null;
    saveToStorage();
    renderRewards();
}

function restartCurrentReward() {
    if (currentRewardId) {
        restartReward(currentRewardId);
        closeDetailScreen();
    }
}

// ===========================
// Emoji Picker Modal
// ===========================
let currentEmojiPickerCategory = 'food';

function openEmojiPickerModal() {
    currentEmojiPickerCategory = 'food';
    renderEmojiPickerGrid('food');
    const modal = document.getElementById('emojiPickerModal');
    if (modal) modal.classList.add('visible');
}

function closeEmojiPickerModal() {
    const modal = document.getElementById('emojiPickerModal');
    if (modal) modal.classList.remove('visible');
}

function renderEmojiPickerGrid(category) {
currentEmojiPickerCategory = category;
    const emojis = emojiCategories[category] || emojiCategories.food;
    
    const grid = document.getElementById('emojiPickerGrid');
    if (!grid) return;
    
    grid.innerHTML = emojis.map(emoji => `
        <button class="emoji-grid-item ${userStickers.includes(emoji) ? 'selected' : ''}" 
                onclick="selectEmojiFromPicker('${emoji}')">
            ${emoji}
        </button>
    `).join('');
    
    // Update tab states
    document.querySelectorAll('#emojiPickerModal .emoji-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === category);
    });
}

function selectEmojiFromPicker(emoji) {
    if (userStickers.includes(emoji)) {
        // Already in palette, just select it
        selectSticker(emoji);
        closeEmojiPickerModal();
        return;
    }
    
    // Add to front of array
    userStickers.unshift(emoji);
    
    saveToStorage();
    renderStickerPalette();
    selectSticker(emoji);
    closeEmojiPickerModal();
}

// ===========================
// Celebration & Claim
// ===========================
function showCelebration(reward) {
    celebratingRewardId = reward.id;
    const msg = currentLang === 'ko' 
        ? `"${reward.emoji} ${reward.name}" 보상을 받을 수 있어요!`
        : `You can claim "${reward.emoji} ${reward.name}"!`;
    celebrationMessage.textContent = msg;
    celebrationOverlay.classList.add('visible');
    createConfetti();
}

function hideCelebration() {
    celebrationOverlay.classList.remove('visible');
    confettiContainer.innerHTML = '';
    celebratingRewardId = null;
}

function claimReward(id) {
    const reward = rewards.find(r => r.id === id);
    if (!reward) return;
    
    celebratingRewardId = id;
    const msg = currentLang === 'ko'
        ? `"${reward.emoji} ${reward.name}" 보상을 받았어요!`
        : `You claimed "${reward.emoji} ${reward.name}"!`;
    celebrationMessage.textContent = msg;
    celebrationOverlay.classList.add('visible');
    createConfetti();
}

function confirmClaim() {
    if (!celebratingRewardId) {
        hideCelebration();
        return;
    }
    
    const reward = rewards.find(r => r.id === celebratingRewardId);
    if (reward) {
        // Mark as completed instead of resetting
        reward.status = 'completed';
        reward.completedAt = Date.now();
        saveToStorage();
        
        // If on detail screen, go back to main
        if (currentRewardId === celebratingRewardId) {
            hideCelebration();
            closeDetailScreen();
        } else {
            renderRewards();
            hideCelebration();
        }
    } else {
        hideCelebration();
    }
}

function createConfetti() {
    confettiContainer.innerHTML = '';
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#38ef7d', '#ffd200'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        confettiContainer.appendChild(confetti);
    }
}

// ===========================
// Modal Functions
// ===========================
function closeModal() {
    rewardModal.classList.remove('visible');
    editingRewardId = null;
}

// ===========================
// Event Listeners
// ===========================
btnLang.addEventListener('click', switchLanguage);
const btnLangDetail = document.getElementById('btnLangDetail');
if (btnLangDetail) btnLangDetail.addEventListener('click', switchLanguage);
btnAddReward.addEventListener('click', openAddModal);
btnAddRewardEmpty.addEventListener('click', openAddModal);
btnCloseModal.addEventListener('click', closeModal);
btnCancelModal.addEventListener('click', closeModal);
btnSaveReward.addEventListener('click', saveReward);
btnClaimReward.addEventListener('click', confirmClaim);
btnBack.addEventListener('click', closeDetailScreen);
btnClearAll.addEventListener('click', clearAllStickers);

// Emoji Picker Modal
const btnCloseEmojiPicker = document.getElementById('btnCloseEmojiPicker');
const emojiPickerModal = document.getElementById('emojiPickerModal');

if (btnCloseEmojiPicker) {
    btnCloseEmojiPicker.addEventListener('click', closeEmojiPickerModal);
}

// Emoji picker tabs
document.querySelectorAll('#emojiPickerModal .emoji-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        renderEmojiPickerGrid(tab.dataset.category);
    });
});

// Close modal on overlay click
if (emojiPickerModal) {
    emojiPickerModal.addEventListener('click', (e) => {
        if (e.target === emojiPickerModal) closeEmojiPickerModal();
    });
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        
        // Update active state
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        renderRewards();
    });
});


// Target number controls
btnTargetMinus.addEventListener('click', () => {
    const current = parseInt(rewardTarget.value) || 10;
    if (current > 1) {
        rewardTarget.value = current - 1;
    }
});

btnTargetPlus.addEventListener('click', () => {
    const current = parseInt(rewardTarget.value) || 10;
    if (current < 999) {
        rewardTarget.value = current + 1;
    }
});

// Palette toggle
const btnPaletteToggle = document.getElementById('btnPaletteToggle');
if (btnPaletteToggle) {
    btnPaletteToggle.addEventListener('click', togglePalette);
}

// 화면 크기 변경 감지
window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= 600;
    const palette = document.querySelector('.sticker-palette');
    const toggleBtn = document.getElementById('btnPaletteToggle');
    
    if (!palette || !toggleBtn) return;
    
    // 모바일로 전환 시 팔레트 접기
    if (isMobile && !isPaletteCollapsed) {
        isPaletteCollapsed = true;
        palette.classList.add('collapsed');
        toggleBtn.textContent = '⬇️';
    }
    // 데스크톱으로 전환 시 팔레트 펼치기
    else if (!isMobile && isPaletteCollapsed) {
        isPaletteCollapsed = false;
        palette.classList.remove('collapsed');
        toggleBtn.textContent = '⬆️';
    }
});

// Emoji tabs
document.querySelectorAll('.emoji-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        renderEmojiPicker(tab.dataset.category);
    });
});

// Emoji picker
emojiPicker.addEventListener('click', (e) => {
    if (e.target.classList.contains('emoji-option')) {
        document.querySelectorAll('.emoji-option').forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add('selected');
        rewardEmoji.value = e.target.dataset.emoji;
    }
});

// Sticker options
stickerOptions.addEventListener('click', (e) => {
    if (e.target.classList.contains('sticker-option')) {
        selectSticker(e.target.dataset.sticker);
    }
});

// Close modals on overlay click
rewardModal.addEventListener('click', (e) => {
    if (e.target === rewardModal) closeModal();
});

celebrationOverlay.addEventListener('click', (e) => {
    if (e.target === celebrationOverlay) confirmClaim();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (celebrationOverlay.classList.contains('visible')) {
            confirmClaim();
        } else if (rewardModal.classList.contains('visible')) {
            closeModal();
        } else if (detailScreen.classList.contains('visible')) {
            closeDetailScreen();
        }
    }
    
    if (e.key === 'Enter' && rewardModal.classList.contains('visible')) {
        saveReward();
    }
});

// ===========================
// Initialize
// ===========================
function init() {
    loadFromStorage();
    renderRewards();
    renderEmojiPicker('food');
    updateUIText();
}

init();
