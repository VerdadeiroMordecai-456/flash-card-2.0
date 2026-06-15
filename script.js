// Script.js - Funcionalidade adicional
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  
  // Adiciona suporte a clique (além do hover) para acessibilidade
  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  console.log('%c[Flashcards] Página carregada com 3 cartões.', 'color:#888');
});
