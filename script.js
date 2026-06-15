// Dados dos flashcards
const categoriesData = {
    ciencia: {
        name: "Ciência no Cotidiano",
        price: 250,
        color: "#00ff9d",
        items: [
            {
                myth: "A água quente congela mais rápido que a fria",
                truth: "Em algumas condições, a água quente pode congelar mais rápido (Efeito Mpemba), mas não é regra geral.",
                mythImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
                truthImg: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
            },
            {
                myth: "Usamos apenas 10% do nosso cérebro",
                truth: "Usamos praticamente 100% do cérebro em diferentes momentos do dia.",
                mythImg: "https://images.unsplash.com/photo-1559757175-5700dde675bc",
                truthImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
            }
        ]
    },
    saude: {
        name: "Saúde & Fitness",
        price: 500,
        color: "#ff3b9d",
        items: [
            {
                myth: "Beber 8 copos de água por dia é obrigatório",
                truth: "A quantidade ideal varia de pessoa para pessoa. Não existe uma regra fixa.",
                mythImg: "https://images.unsplash.com/photo-1559757148-5c3506b0e8a3",
                truthImg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
            }
        ]
    },
    historia: {
        name: "História Oculta & Conspirações",
        price: 1200,
        color: "#a855f7",
        items: [
            {
                myth: "A Terra é plana",
                truth: "A Terra é esférica. Existem diversas provas científicas e fotográficas.",
                mythImg: "https://images.unsplash.com/photo-1617791160505-6f00504e3519",
                truthImg: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4"
            }
        ]
    },
    tecnologia: {
        name: "Tecnologia & IA",
        price: 3500,
        color: "#60a5fa",
        items: [
            {
                myth: "A IA vai dominar o mundo em breve",
                truth: "A IA atual é especializada e depende de humanos. Não possui consciência.",
                mythImg: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
                truthImg: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485"
            }
        ]
    },
    financas: {
        name: "Enriquecimento & Finanças",
        price: 7000,
        color: "#facc15",
        items: [
            {
                myth: "Investir na bolsa é igual a apostar",
                truth: "Investir com análise e diversificação é diferente de apostar.",
                mythImg: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
                truthImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
            }
        ]
    }
};

let balance = 100000;
const balanceEl = document.getElementById('balance');

// Atualiza saldo na tela
function updateBalance() {
    balanceEl.textContent = '$' + balance.toLocaleString();
}

// Cria os cards de categoria
function createCategoryCards() {
    const grid = document.getElementById('category-grid');
    
    Object.keys(categoriesData).forEach(key => {
        const cat = categoriesData[key];
        
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <h3>${cat.name}</h3>
            <div class="price">$${cat.price} por caixa</div>
            
            <div class="quantity-buttons">
                <button data-qty="1">Abrir 1</button>
                <button data-qty="2">Abrir 2</button>
                <button data-qty="3">Abrir 3</button>
            </div>
            
            <button class="open-btn">Abrir Caixas</button>
        `;
        
        const buttons = card.querySelectorAll('.quantity-buttons button');
        const openBtn = card.querySelector('.open-btn');
        let selectedQty = 1;

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.style.background = '');
                btn.style.background = 'var(--neon-green)';
                btn.style.color = '#000';
                selectedQty = parseInt(btn.dataset.qty);
            });
        });

        openBtn.addEventListener('click', () => {
            if (!selectedQty) selectedQty = 1;
            openCases(key, selectedQty);
        });

        grid.appendChild(card);
    });
}

// Abre as caixas
function openCases(categoryKey, quantity) {
    const category = categoriesData[categoryKey];
    const totalCost = category.price * quantity;

    if (balance < totalCost) {
        showAlert(`Saldo insuficiente! Você precisa de $${totalCost}.`);
        return;
    }

    // Debita o saldo
    balance -= totalCost;
    updateBalance();

    // Mostra a roleta
    const rouletteSection = document.getElementById('roulette-section');
    rouletteSection.classList.remove('hidden');

    // Abre as caixas uma por uma
    let count = 0;
    
    function openNext() {
        if (count >= quantity) {
            rouletteSection.classList.add('hidden');
            return;
        }
        
        count++;
        spinRoulette(categoryKey, () => {
            setTimeout(openNext, 800);
        });
    }
    
    openNext();
}

// Animação da roleta
function spinRoulette(categoryKey, callback) {
    const category = categoriesData[categoryKey];
    const strip = document.getElementById('roulette-strip');
    const rouletteSection = document.getElementById('roulette-section');
    
    strip.innerHTML = '';
    strip.style.transition = 'none';
    strip.style.transform = 'translateX(0)';

    const itemsCount = 42;
    const winningIndex = Math.floor(itemsCount * 0.65);
    
    // Cria itens da roleta
    for (let i = 0; i < itemsCount; i++) {
        const item = document.createElement('div');
        item.className = 'roulette-item';
        item.textContent = '?';
        strip.appendChild(item);
    }

    // Força reflow
    void strip.offsetWidth;

    // Posição final
    const itemWidth = 168;
    const containerWidth = 1100;
    const targetPosition = (winningIndex * itemWidth) - (containerWidth / 2) + 80;
    
    strip.style.transition = 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)';
    strip.style.transform = `translateX(-${targetPosition}px)`;

    // Quando terminar a animação
    setTimeout(() => {
        const randomItem = category.items[Math.floor(Math.random() * category.items.length)];
        createFlashcard(randomItem);
        
        if (callback) callback();
    }, 4200);
}

// Cria o flashcard
function createFlashcard(item) {
    const container = document.getElementById('cards-container');
    
    const card = document.createElement('div');
    card.className = 'flashcard';
    
    card.innerHTML = `
        <div class="flashcard-inner">
            <div class="flashcard-front">
                <img src="${item.mythImg}" alt="Mito">
                <div class="flashcard-content">
                    <h4>Mito</h4>
                    <p>${item.myth}</p>
                    <button class="reveal-btn">Receber Verdade</button>
                </div>
            </div>
            <div class="flashcard-back">
                <img src="${item.truthImg}" alt="Verdade">
                <div class="flashcard-content">
                    <h4>A Verdade</h4>
                    <p>${item.truth}</p>
                    <span class="fact-badge">FATO DESMISTIFICADO</span>
                </div>
            </div>
        </div>
    `;

    const revealBtn = card.querySelector('.reveal-btn');
    revealBtn.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        card.classList.add('flipped');
    });

    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });

    container.appendChild(card);
}

// Alerta visual
function showAlert(message) {
    const modal = document.getElementById('alert-modal');
    const msgEl = document.getElementById('alert-message');
    msgEl.textContent = message;
    modal.classList.remove('hidden');

    document.getElementById('close-alert').onclick = () => {
        modal.classList.add('hidden');
    };
}

// Limpar resultados
document.getElementById('clear-results').addEventListener('click', () => {
    document.getElementById('cards-container').innerHTML = '';
});

// Inicialização
function init() {
    updateBalance();
    createCategoryCards();
}

init();
