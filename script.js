// Menu Toggle Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Carregar Produtos Dinâmicos do Banco
document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
});

async function loadProducts() {
    try {
        const response = await fetch('api/products.php');
        const products = await response.json();

        if (products.success) {
            renderProducts(products.data);
        }
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

function renderProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = products.map(product => `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="price">R$ ${parseFloat(product.price).toFixed(2)}</span>
            </div>
        </article>
    `).join('');
}

// Smooth Scroll já está no CSS
// Animações ao scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .product-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});
