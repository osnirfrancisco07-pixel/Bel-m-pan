# 🚀 Guia Completo - Supabase (Banco de Dados Grátis na Nuvem)

## ✨ O que é Supabase?

**Supabase** = Banco de dados PostgreSQL GRÁTIS + API automática + Autenticação

- ✅ **Grátis** para começar
- ✅ Funciona no celular
- ✅ Sem limite de acesso
- ✅ Fácil de usar
- ✅ Seguro e profissional

---

## 🔷 PASSO 1: Criar Conta Supabase (2 minutos)

### No Computador:

1. **Acesse:** https://supabase.com
2. Clique em **"Start Your Project"** ou **"Sign In"**
3. Escolha: **"Sign up with GitHub"** ou **"Email"**

**Se escolher Email:**
- 📧 Email: seu_email@gmail.com
- 🔐 Password: SenhaForte123

4. Clique em **"Send Magic Link"** ou **"Sign Up"**
5. ✅ Verifique o email e ative a conta

---

## 🔷 PASSO 2: Criar Projeto (3 minutos)

```
1. Acesse: https://app.supabase.com
   
2. Clique em "+ New Project"

3. Preencha:
   📝 Name: belem-pan
   🔐 Database Password: SenhaForte123
   🌍 Region: São Paulo (Brazil - sa-east-1)
   
4. Clique em "Create New Project"

5. ⏳ Aguarde 1-2 minutos...

6. ✅ Projeto criado!
```

---

## 🔷 PASSO 3: Criar Tabelas com SQL (5 minutos)

```
1. Na Dashboard do Supabase, clique em "SQL Editor"

2. Clique em "+ New Query"

3. Cole este código TODO:
```

```sql
-- Criar tabela de produtos
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(500) NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de pedidos
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20) NOT NULL,
  product_id BIGINT REFERENCES products(id),
  quantity INT DEFAULT 1,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir produtos de exemplo
INSERT INTO products (name, description, price, image) VALUES
('Pães Caseiros', 'Macios e saborosos para o café da manhã e lanche da tarde.', 12.50, 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=700&q=80'),
('Pão de Forma', 'Perfeito para sanduíches e torradas.', 15.00, 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=700&q=80'),
('Cucas', 'Receitas tradicionais com farofa crocante.', 18.00, 'https://images.unsplash.com/photo-1612201143788-b158560b8e88?auto=format&fit=crop&w=700&q=80'),
('Broas Integrais', 'Ingredientes selecionados e preparo artesanal.', 14.50, 'https://images.unsplash.com/photo-1600626333392-431f64c932bd?auto=format&fit=crop&w=700&q=80');

-- Criar índices
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_orders_status ON orders(status);
```

```
4. Clique em "Run" ou "Execute"

5. ✅ Tabelas criadas com sucesso!
```

---

## 🔷 PASSO 4: Pegar Credenciais (2 minutos)

```
1. Na Dashboard do Supabase, vá em "Settings"

2. Clique em "Database"

3. Procure por "Connection String" ou "Connection Info"

4. Copie as informações:
   🔗 Host
   👤 User
   🔐 Password
   📝 Database
   
   Ou copie a URL completa se houver:
   postgresql://user:password@host:port/database
```

---

## 🔷 PASSO 5: Configurar Projeto Belém Pan (5 minutos)

### Opção A: Usar com API Supabase (RECOMENDADO)

**Criar novo arquivo:** `config/supabase.php`

```php
<?php
// Supabase Configuration
define('SUPABASE_URL', 'https://seu-projeto.supabase.co');
define('SUPABASE_KEY', 'sua-chave-publica-aqui');
define('SUPABASE_SECRET', 'sua-chave-secreta-aqui');

// Função para fazer requisições ao Supabase
function supabaseRequest($table, $method = 'GET', $data = null, $query = '') {
    $url = SUPABASE_URL . '/rest/v1/' . $table . $query;
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . SUPABASE_KEY,
        'apikey: ' . SUPABASE_KEY,
        'Content-Type: application/json'
    ]);
    
    if ($method !== 'GET') {
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        if ($data) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }
    }
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}
?>
```

### Opção B: Usar PostgreSQL Direto

**Atualizar `config/db.php`:**

```php
<?php
// Supabase PostgreSQL Connection
$host = 'seu-projeto.supabase.co';
$user = 'postgres';
$password = 'sua_senha_supabase';
$database = 'postgres';
$port = 5432;

try {
    $mysqli = new mysqli($host, $user, $password, $database, $port);
    
    if ($mysqli->connect_error) {
        die(json_encode([
            'success' => false,
            'message' => 'Conexão com banco falhou',
            'error' => $mysqli->connect_error
        ]));
    }
    
    $mysqli->set_charset('utf8mb4');
    
} catch (Exception $e) {
    die(json_encode([
        'success' => false,
        'message' => 'Erro ao conectar',
        'error' => $e->getMessage()
    ]));
}
?>
```

---

## 🔷 PASSO 6: Pegar Chaves de API (3 minutos)

```
1. Na Dashboard do Supabase, vá em "Settings"

2. Clique em "API"

3. Você verá:
   🔑 anon public (chave pública - usar no JavaScript)
   🔐 service_role secret (chave privada - usar no backend)
   
4. Copie a chave "anon public"

5. Crie arquivo: config/api-keys.php

<?php
define('SUPABASE_ANON_KEY', 'cole-sua-chave-publica-aqui');
?>
```

---

## 🔷 PASSO 7: Criar API para Supabase (5 minutos)

**Criar arquivo:** `api/supabase-products.php`

```php
<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/../config/supabase.php';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Buscar produtos
        $url = SUPABASE_URL . '/rest/v1/products?active=eq.true&order=created_at.desc';
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'apikey: ' . SUPABASE_KEY,
            'Authorization: Bearer ' . SUPABASE_KEY
        ]);
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        $products = json_decode($response, true);
        
        echo json_encode([
            'success' => true,
            'data' => $products,
            'count' => count($products)
        ]);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Criar produto
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validações
        $errors = [];
        if (empty($data['name'])) $errors[] = 'Nome obrigatório';
        if (empty($data['price'])) $errors[] = 'Preço obrigatório';
        if (empty($data['description'])) $errors[] = 'Descrição obrigatória';
        if (empty($data['image'])) $errors[] = 'Imagem obrigatória';
        
        if (!empty($errors)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'errors' => $errors]);
            exit;
        }
        
        $url = SUPABASE_URL . '/rest/v1/products';
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'apikey: ' . SUPABASE_KEY,
            'Authorization: Bearer ' . SUPABASE_KEY,
            'Content-Type: application/json',
            'Prefer: return=representation'
        ]);
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        $result = json_decode($response, true);
        
        echo json_encode([
            'success' => true,
            'message' => 'Produto criado com sucesso',
            'product' => $result[0] ?? $result
        ]);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
```

---

## 🔷 PASSO 8: Atualizar Script JavaScript

**Atualizar `script.js`:**

```javascript
// Carregar Produtos do Supabase
async function loadProducts() {
    try {
        const response = await fetch('api/supabase-products.php');
        const result = await response.json();

        if (result.success) {
            renderProducts(result.data);
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

// Carregar ao abrir página
document.addEventListener('DOMContentLoaded', loadProducts);
```

---

## 🔷 PASSO 9: Fazer Deploy no 000webhost (5 minutos)

1. **Upload dos arquivos:**
   - Faça upload de todos os arquivos para o 000webhost (public_html)
   - Os dados agora vêm do Supabase (não precisa configurar MySQL do 000webhost)

2. **Teste no celular:**
   ```
   https://seu-site.000webhostapp.com
   ```

3. **Admin:**
   ```
   https://seu-site.000webhostapp.com/admin/dashboard.html
   ```

---

## ✅ Checklist Final

- [ ] Criei conta no Supabase
- [ ] Criei projeto "belem-pan"
- [ ] Executei SQL para criar tabelas
- [ ] Copiei credenciais do Supabase
- [ ] Atualizei arquivo `config/supabase.php`
- [ ] Criei arquivo `api/supabase-products.php`
- [ ] Atualizei `script.js`
- [ ] Fiz upload para 000webhost
- [ ] Testei no celular Android

---

## 📊 Dashboard Supabase

No dashboard, você pode:

- ✅ Ver todos os produtos em tempo real
- ✅ Ver todos os pedidos
- ✅ Editar dados diretamente
- ✅ Fazer backups
- ✅ Ver logs e analytics

---

## 🔒 Segurança com Supabase

### Row Level Security (RLS)

Proteger dados (opcional, para começar não precisa):

```sql
-- Permitir leitura pública de produtos
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on products"
ON products FOR SELECT
USING (active = true);

-- Permitir apenas admin criar/editar
CREATE POLICY "Allow admin insert on products"
ON products FOR INSERT
WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));
```

---

## 💡 Dicas

1. **Supabase é melhor que 000webhost porque:**
   - ✅ Banco de dados gerenciado
   - ✅ Backups automáticos
   - ✅ Escalável
   - ✅ Seguro
   - ✅ Grátis

2. **Você pode usar Supabase + 000webhost juntos:**
   - 000webhost = hosting da aplicação PHP
   - Supabase = banco de dados

3. **Ou usar apenas Supabase:**
   - Supabase + Vercel (frontend) + API
   - Mais profissional mas mais complexo

---

## ❓ Dúvidas Comuns

**P: Supabase é seguro?**
R: SIM! É PostgreSQL gerenciado, com segurança profissional.

**P: Preciso deixar meu computador ligado?**
R: NÃO! Fica tudo na nuvem do Supabase.

**P: Quanto custa?**
R: GRÁTIS! 500MB de armazenamento, depois paga conforme usa.

**P: Posso usar do celular?**
R: SIM! Acede via navegador como qualquer site.

**P: Como faço backup?**
R: Supabase faz automaticamente. Você também pode exportar.

---

## 🎯 Próximas Melhorias

- [ ] Autenticação de usuários
- [ ] Sistema de pedidos com email
- [ ] Integração com WhatsApp API
- [ ] Relatórios de vendas
- [ ] Cupons de desconto

---

## 📞 Suporte Supabase

- Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com
- Twitter: @supabase

---

**Parabéns! 🎉 Agora seu banco de dados está profissional e na nuvem!**
