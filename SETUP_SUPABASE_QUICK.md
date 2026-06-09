# 🎬 Guia Rápido Visual - Supabase + Android

## ⚡ 5 Minutos para Configurar Tudo!

---

## PASSO 1️⃣ - Criar Conta Supabase

```
1. Acesse: https://supabase.com
   
2. Clique: "Start Your Project"

3. Email: seu_email@gmail.com

4. Senha: SenhaForte123

5. ✅ Verifique email
```

---

## PASSO 2️⃣ - Criar Projeto

```
1. Dashboard: https://app.supabase.com

2. Clique: "+ New Project"

3. Preencha:
   📝 Name: belem-pan
   🔐 Password: SenhaForte123
   🌍 Region: São Paulo

4. Aguarde 1-2 minutos...

5. ✅ Projeto criado!
```

---

## PASSO 3️⃣ - Criar Tabelas (COPIAR E COLAR)

```
1. Clique: "SQL Editor"

2. Clique: "+ New Query"

3. COLE ESTE CÓDIGO INTEIRO:
```

```sql
-- COPIAR E COLAR TUDO ISSO!

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

INSERT INTO products (name, description, price, image) VALUES
('Pães Caseiros', 'Macios e saborosos para o café da manhã', 12.50, 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=700&q=80'),
('Pão de Forma', 'Perfeito para sanduíches', 15.00, 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=700&q=80'),
('Cucas', 'Receitas tradicionais com farofa', 18.00, 'https://images.unsplash.com/photo-1612201143788-b158560b8e88?auto=format&fit=crop&w=700&q=80'),
('Broas Integrais', 'Ingredientes selecionados', 14.50, 'https://images.unsplash.com/photo-1600626333392-431f64c932bd?auto=format&fit=crop&w=700&q=80');
```

```
4. Clique: "Run"

5. ✅ Tabelas criadas com 4 produtos!
```

---

## PASSO 4️⃣ - Pegar Chaves de Acesso

```
1. Clique: "Settings"

2. Clique: "API"

3. COPIE estas informações:

   🌐 URL:
   https://seu-projeto.supabase.co
   
   (Copie e guarde em um lugar seguro!)
   
   🔑 anon public:
   eyJhbGc....(uma chave longa)
   
   (Esta é a chave que coloca no código)
```

---

## PASSO 5️⃣ - Configurar Arquivos (NO COMPUTADOR)

### Arquivo 1: `config/supabase.php`

```php
<?php
// Cole isto em config/supabase.php

define('SUPABASE_URL', 'https://seu-projeto.supabase.co');
define('SUPABASE_KEY', 'cole-sua-chave-anon-public-aqui');

// Função para buscar dados
function supabaseRequest($table, $method = 'GET', $data = null) {
    $url = SUPABASE_URL . '/rest/v1/' . $table . '?select=*';
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'apikey: ' . SUPABASE_KEY,
        'Authorization: Bearer ' . SUPABASE_KEY
    ]);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}
?>
```

### Arquivo 2: `api/products-supabase.php`

```php
<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/../config/supabase.php';

try {
    $url = SUPABASE_URL . '/rest/v1/products?select=*&active=eq.true&order=created_at.desc';
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'apikey: ' . SUPABASE_KEY,
        'Authorization: Bearer ' . SUPABASE_KEY
    ]);
    
    $response = curl_exec($ch);
    $products = json_decode($response, true);
    
    echo json_encode([
        'success' => true,
        'data' => $products ?: [],
        'count' => count($products ?: [])
    ]);
    
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

## PASSO 6️⃣ - Atualizar script.js

**Alterar em `script.js`:**

```javascript
// Trocar esta parte:
async function loadProducts() {
    try {
        const response = await fetch('api/products.php'); // ← MUDA PRA
        const response = await fetch('api/products-supabase.php'); // ← ISTO
        
        const products = await response.json();

        if (products.success) {
            renderProducts(products.data);
        }
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}
```

---

## PASSO 7️⃣ - Fazer Upload (000webhost)

```
1. Acesse: 000webhost.com (sua conta)

2. File Manager

3. public_html

4. Upload dos arquivos:
   - Todos os arquivos
   - Todas as pastas
   - Incluindo os novos arquivos do Supabase

5. ✅ Pronto!
```

---

## PASSO 8️⃣ - Testar no Celular

```
1. Abra navegador

2. Digite: https://seu-site.000webhostapp.com

3. ✅ Site carrega com produtos do Supabase!
```

---

## 🎨 Adicionar Novos Produtos

### Forma 1: Pelo Admin Dashboard

```
1. Acesse: /admin/dashboard.html

2. Clique: "📦 Produtos"

3. Clique: "+ Novo Produto"

4. Preencha os dados

5. Clique: "Criar Produto"

6. ✅ Produto aparece no site!
```

### Forma 2: Direto no Supabase (Admin avançado)

```
1. Supabase Dashboard

2. Clique: "SQL Editor"

3. Clique: "+ New Query"

4. Cole:

INSERT INTO products (name, description, price, image, active)
VALUES (
  'Novo Produto',
  'Descrição aqui',
  25.00,
  'https://...',
  true
);

5. Clique: "Run"

6. ✅ Produto criado instantaneamente!
```

---

## 📱 Ver Produtos no Celular

### Site Público:
```
https://seu-site.000webhostapp.com
```

### Admin (Gerenciar):
```
https://seu-site.000webhostapp.com/admin/dashboard.html
```

### Dashboard Supabase (Dados):
```
https://app.supabase.com
```

---

## 🔧 Se der Erro

**Erro: "Erro ao carregar produtos"**
- ✅ Verifique se copiou a chave certa em `config/supabase.php`
- ✅ Verifique se é a chave "anon public" (não a secreta!)

**Erro: "produtos não aparecem"**
- ✅ Verifique se alterou em `script.js` para chamar `products-supabase.php`
- ✅ Verifique se a tabela foi criada (SQL executou?)

**Supabase retorna vazio**
- ✅ Vá em Supabase → Table Editor → products
- ✅ Você deve ver 4 produtos lá
- ✅ Se não tiver, execute o SQL novamente

---

## 🎯 Resumo do que Você Tem Agora

✅ **Site funcional** com banco de dados grátis
✅ **Admin dashboard** para gerenciar produtos
✅ **API automática** do Supabase
✅ **Funciona no celular Android**
✅ **Dados na nuvem** (seguro e confiável)
✅ **Sem limite** de acessos

---

## 💡 Dicas Importantes

1. **A chave "anon public" é segura para colocar no código**
   - É a chave pública
   - Não colocar a chave "secreta" no código!

2. **Supabase vs MySQL:**
   - Supabase é melhor = gerenciado, backups automáticos
   - MySQL é mais simples = você gerencia tudo

3. **Quanto custa?**
   - Primeiro 1 ano: GRÁTIS
   - Depois: depende do uso (muito barato)

4. **Posso migrar depois?**
   - SIM! Pode exportar dados facilmente

---

## 📊 Próximas Ideias

- [ ] Autenticação (login de admin)
- [ ] Histórico de pedidos
- [ ] Relatórios de vendas
- [ ] Enviar email após pedido
- [ ] Sistema de avaliações

---

**Parabéns! 🎉 Seu app está profissional com Supabase!**

Próximo passo? Chamar clientes e começar a vender! 💰📱
