// Dados dos flashcards (Mitos e Verdades)
const casesData = [
    {
        id: 1,
        category: "Saúde & Fitness",
        name: "Vitality Case",
        color: "#00ff9d",
        myth: "Beber água gelada queima mais calorias que água em temperatura ambiente.",
        mythImage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
        truth: "A diferença calórica é mínima (cerca de 8-10 calorias). O corpo precisa aquecer a água, mas o gasto energético é insignificante.",
        truthImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
    },
    {
        id: 2,
        category: "Enriquecimento & Finanças",
        name: "Wealth Case",
        color: "#ffd700",
        myth: "Investir em criptomoedas é o caminho mais rápido para ficar rico.",
        mythImage: "https://images.unsplash.com/photo-1621761191319-c6fb2f6453a0",
        truth: "A maioria dos investidores em cripto perde dinheiro. O mercado é extremamente volátil e especulativo.",
        truthImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    },
    {
        id: 3,
        category: "Tecnologia & IA",
        name: "Neural Case",
        color: "#b967ff",
        myth: "A Inteligência Artificial vai eliminar a maioria dos empregos em menos de 10 anos.",
        mythImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
        truth: "A IA tende a transformar empregos em vez de eliminá-los completamente. Novas profissões surgem conforme a tecnologia avança.",
        truthImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    },
    {
        id: 4,
        category: "História Oculta",
        name: "Conspiracy Case",
        color: "#ff6b6b",
        myth: "A Terra é plana e as fotos da NASA são todas editadas.",
        mythImage: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5",
        truth: "Existem inúmeras evidências científicas e observações que comprovam que a Terra é esférica.",
        truthImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
    },
    {
        id: 5,
        category: "Ciência no Cotidiano",
        name: "Quantum Case",
        color: "#00d4ff",
        myth: "Esquentar comida no micro-ondas deixa os alimentos radioativos.",
        mythImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
        truth: "Micro-ondas aquecem os alimentos através de vibração molecular. Não deixam resíduos radioativos.",
        truthImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136"
    }
];

let selectedCases = [];

// Renderizar cases
function renderCases() {
    const grid = document.getElementById('cases-grid');
    grid.innerHTML = '';

    casesData.forEach(caseItem => {
        const card = document.createElement('div');
        card.className = 'case-card';
        card.innerHTML = `
            <div class="category">${caseItem.category}</div>
            <div class="case-name" style="color: ${caseItem.color}">${caseItem.name}</div>
            <div style="margin-top: 15px; font-size: 13px; color: #666;">Clique para selecionar</div>
        `;

        card.addEventListener('click', () => toggleCaseSelection(card, caseItem));
        grid.appendChild(card);
    });
}

function toggleCaseSelection(cardElement, caseItem) {
    const index = selectedCases.findIndex(c => c.id === caseItem.id);

    if (index !== -1) {
        // Desselecionar
        selectedCases.splice(index, 1);
        cardElement.classList.remove('selected');
    } else {
        // Selecionar
        if (selectedCases.length >= 3) {
            alert('Você só pode selecionar no máximo 3 caixas.');
            return;
        }
        selectedCases.push(caseItem);
        cardElement.classList.add('selected');
    }

    updateOpenButton();
}

function updateOpenButton() {
    const btn = document.getElementById('open-btn');
    btn.disabled = selectedCases.length === 0;
}

function openCases() {
    const unboxingSection = document.getElementById('unboxing-section');
    const cardsContainer = document.getElementById('cards-container');
    
    cardsContainer.innerHTML = '';
    unboxingSection.classList.remove('hidden');

    // Simular animação de abertura
    selectedCases.forEach((caseItem, index) => {
        setTimeout(() => {
            createFlashcard(caseItem, cardsContainer);
        }, index * 400);
    });
}

function createFlashcard(caseItem, container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper';

    wrapper.innerHTML = `
        <div class="card" id="card-${caseItem.id}">
            <!-- Frente (Mito) -->
            <div class="card-face card-front">
                <img src="${caseItem.mythImage}" alt="Mito">
                <div class="card-content">
                    <h3>MITO</h3>
                    <p>${caseItem.myth}</p>
                    <button class="reveal-btn" style="margin-top: auto; padding: 10px; background: #ff2d55; color: white; border: none; border-radius: 8px; cursor: pointer;">
                        RECEBER VERDADE
                    </button>
                </div>
            </div>
            
            <!-- Verso (Verdade) -->
            <div class="card-face card-back">
                <img src="${caseItem.truthImage}" alt="Verdade">
                <div class="card-content">
                    <h3>VERDADE</h3>
                    <p>${caseItem.truth}</p>
                    <div class="badge verdade">FATO DESMISTIFICADO</div>
                </div>
            </div>
        </div>
    `;

    container.appendChild(wrapper);

    // Adicionar evento de flip
    const card = wrapper.querySelector('.card');
    const revealBtn = wrapper.querySelector('.reveal-btn');

    revealBtn.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        card.classList.add('flipped');
    });

    // Permitir clicar no card também
    card.addEventListener('click', () => {
        if (!card.classList.contains('flipped')) {
            card.classList.add('flipped');
        }
    });
}

// Event Listeners
document.getElementById('open-btn').addEventListener('click', openCases);

document.getElementById('reset-btn').addEventListener('click', () => {
    // Limpar seleção
    document.querySelectorAll('.case-card').forEach(card => card.classList.remove('selected'));
    selectedCases = [];
    updateOpenButton();
    
    // Esconder seção de unboxing
    document.getElementById('unboxing-section').classList.add('hidden');
    document.getElementById('cards-container').innerHTML = '';
});

// Inicialização
renderCases();
