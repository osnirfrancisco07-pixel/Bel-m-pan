// Alternar seções
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active de todos
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));
        
        // Adiciona active no clicado
        item.classList.add('active');
        const target = item.getAttribute('href').substring(1);
        document.getElementById(target)?.classList.add('active');
    });
});

// Carregar dados ao abrir seções
document.addEventListener('DOMContentLoaded', () => {
    loadDashboardStats();
    loadProducts();
});

// Função para carregar estatísticas
async function loadDashboardStats() {
    try {
        const [productsRes, ordersRes] = await Promise.all([
            fetch('../api/products.php'),
            fetch('../api/orders.php')
        ]);

        const products = await productsRes.json();
        const orders = await ordersRes.json();

        document.getElementById('total-products').textContent = products.count || 0;
        document.getElementById('total-orders').textContent = orders.count || 0;
        
        const totalSales = orders.data?.reduce((sum, order) => sum + parseFloat(order.total_price || 0), 0) || 0;
        document.getElementById('total-sales').textContent = totalSales.toFixed(2);

    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
    }
}

// Função para carregar produtos
async function loadProducts() {
    try {
        const response = await fetch('../api/products.php');
        const result = await response.json();

        if (!result.success) throw new Error(result.message);

        const productsList = document.getElementById('products-list');
        productsList.innerHTML = result.data.map(product => `
            <div class="product-item">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">R$ ${parseFloat(product.price).toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="btn btn-primary" onclick="editProduct(${product.id})">Editar</button>
                        <button class="btn btn-secondary" onclick="deleteProduct(${product.id})">Deletar</button>
                    </div>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        document.getElementById('products-list').innerHTML = '<p>Erro ao carregar produtos</p>';
    }
}

// Alternar formulário de novo produto
function toggleProductForm() {
    document.getElementById('product-form').classList.toggle('hidden');
}

// Enviar novo produto
document.getElementById('product-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const productData = {
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: parseFloat(document.getElementById('product-price').value),
        image: document.getElementById('product-image').value
    };

    try {
        const response = await fetch('../api/product-create.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        const result = await response.json();

        if (result.success) {
            alert('✅ Produto criado com sucesso!');
            document.getElementById('product-form').reset();
            toggleProductForm();
            loadProducts();
        } else {
            alert('❌ Erro: ' + (result.errors?.[0] || result.message));
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('❌ Erro ao criar produto');
    }
});

// Funções para editar e deletar (placeholder)
function editProduct(id) {
    alert('Edição de produtos em desenvolvimento');
}

function deleteProduct(id) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
        alert('Deleção em desenvolvimento');
    }
}
