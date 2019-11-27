# Financius API application

## Install Depedencies

```bash
npm install
```

OR

```bash
yarn install
```

### Configuration DB
```bash
cp .env.example .env
```

Gere uma nova key
```bash
adonis key:generate
```

Altere Arquivo [.env](./.env)

    DB_CONNECTION=mysql       
    DB_HOST=127.0.0.1   
    DB_PORT=3306   
    DB_USER=root   
    DB_PASSWORD=sua senha   
    DB_DATABASE=financius   
    HASH_DRIVER=bcrypt   


### Migrations

SGBD: MySQL
Name BD: financius

```sql
CREATE DATABASE IF NOT EXISTS financius
```

```js
adonis migration:run
```

### Run Serve Developer
```js
adonis serve --dev
```

## Routes

url_base: http://127.0.0.1:3333

### Criar usuário:
POST: http://127.0.0.1:3333/users

    {
        "name": "required String",
        "email": "required|unique String",
        "password": "required String"
    }

### Login usuário:
POST: http://127.0.0.1:3333/sessions

    {
        "email": "required String",
        "password": "required String"
    }

### CRUD Categoria:

#### Autenticação Bearer por token do login necessário.

#### Create
POST: http://127.0.0.1:3333/category

    {
        "name": "required String",
        "type": "required (expense, recipe) String"
    }

#### Read (List All)

#### Autenticação Bearer por token do login necessário.

GET: http://127.0.0.1:3333/category

    No body

#### Update

#### Autenticação Bearer por token do login necessário.

PUT: http://127.0.0.1:3333/category/:id

    {
        "name": "optional String",
        "type": "optional String"
    }

#### Delete

#### Autenticação Bearer por token do login necessário.

DELETE: http://127.0.0.1:3333/category/:id

    No body

_________________
_________________

### CRUD Banco:

#### Autenticação Bearer por token do login necessário.

#### Create
POST: http://127.0.0.1:3333/banks

    {
        "name": "required String",
        "code": "required String",
        "document": "optional String"
    }

#### Read (List All)

#### Autenticação Bearer por token do login necessário.

GET: http://127.0.0.1:3333/banks

    No body

#### Show (Unique)

#### Autenticação Bearer por token do login necessário.

GET: http://127.0.0.1:3333/banks/:id

    No body

#### Update

#### Autenticação Bearer por token do login necessário.

PATCH: http://127.0.0.1:3333/banks/:id

    {
        "name": "optional String",
        "code": "optional String",
        "document": "optional String"
    }

#### Delete

#### Autenticação Bearer por token do login necessário.

DELETE: http://127.0.0.1:3333/banks/:id

    No body

_________________
_________________

### CRUD Pagamento:

#### Autenticação Bearer por token do login necessário.

#### Create
POST: http://127.0.0.1:3333/payments

    {
        "agency": "required String Conta Bancária",
        "account": "required String Conta Bancária",
        "bank_id": "required String Conta Bancária",
        "number": "required String Cartão",
        "flag": "required String Cartão",
        "type": "required String Cartão",
        "limit": "required String Cartão de Crédito",
    }

#### Read (List All)

#### Autenticação Bearer por token do login necessário.

GET: http://127.0.0.1:3333/payments

    No body

#### Show (Unique)

#### Autenticação Bearer por token do login necessário.

GET: http://127.0.0.1:3333/payments/:id

    No body

#### Update

#### Autenticação Bearer por token do login necessário.

PATCH: http://127.0.0.1:3333/payments/:id

    {
        "agency": "optional String",
        "account": "optional String",
        "bank_id": "optional Number",
        "number": "optional String",
        "flag": "optional String",
        "type": "optional String",
        "limit": "optional Number",
    }

#### Delete

#### Autenticação Bearer por token do login necessário.

DELETE: http://127.0.0.1:3333/payments/:id

    No body

_________________
_________________

### CRUD Gasto/Receita:

#### Autenticação Bearer por token do login necessário.

#### Create
POST: http://127.0.0.1:3333/category/:id/flows  -- id da categoria que deseja adicionar um Gasto/Receita

    {
        "name": "required String",
        "value": "required Number Valor de cada Parcela ou total em parcela unica",
        "operation": "required String",
        "day": "required date(yyyy-mm-dd)",
        "payment_id": "required Number",
        "repeat": "required Number >= 0"
    }

#### Read (List All By Categoria)

#### Autenticação Bearer por token do login necessário.

GET: http://127.0.0.1:3333/category/:id/flows  -- id da categoria 

    No body

#### Show (Unique Gasto/Receita)

#### Autenticação Bearer por token do login necessário.

GET: http://127.0.0.1:3333/flows/:id

    No body

#### Delete

#### Autenticação Bearer por token do login necessário.

DELETE: http://127.0.0.1:3333/flows/:id

    No body

_________________
_________________

### CRUD Transações:

#### Show (Unique)

#### Autenticação Bearer por token do login necessário.

GET: http://127.0.0.1:3333/transactions/:id

    No body

#### List Por Data

#### Autenticação Bearer por token do login necessário.

GET: http://127.0.0.1:3333/date/transactions

    {
	"init": "required Date (yyyy-mm-dd)",
	"finished": "required Date (yyyy-mm-dd)"
}

#### Update

#### Autenticação Bearer por token do login necessário.

PATCH: http://127.0.0.1:3333/transactions/:id

    {
        "nexts": "optional Boolean Exclui os proximos a partir do ID"
        "name": "Optional String",
        "value": "Optional Number",
        "day": "Optional Date(yyyy-mm-dd)",
        "complete": "Optional Boolean",
        "payment_id": "Optional Integer"
    }

#### Delete

#### Autenticação Bearer por token do login necessário.

DELETE: http://127.0.0.1:3333/transactions/:id

    {
        "nexts": "optional Boolean Exclui os proximos a partir do ID"
    }

_________________
_________________

### CRUD Moedas:

#### List All (Dólar, Dólar Turismo, Dólar Canadense, Euro, Dólar Australiano)

#### Autenticação Bearer por token do login necessário.

GET: http://127.0.0.1:3333/currency/all

    No body

#### Conversão

#### Autenticação Bearer por token do login necessário.

GET: http://127.0.0.1:3333/currency/convert

    {
        "currency": "required String Moedas Aceitas: USD, EUR, AUD, CAD",
        "value": "required Number Valor em Reais"
    }

_________________
_________________

### CRUD Investimento:

#### Simulação Investimento (Poupança e Tesouro Selic)

#### Autenticação Bearer por token do login necessário.

GET: http://127.0.0.1:3333/investment/simulate

    {
        "initial": "required String valor inicial de investimento",
        "contribute": "required Number >= 0 valor de investimento mensal",
        "time": "required Number Numero de Meses de investimento"
    }

_________________
_________________
