import Lista from './Lista.js';

//QUESTÃO 1

class Pilha {
    constructor() {
        this.lista = new Lista();
    }

    push(elemento) {
        this.lista.add(elemento);
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("Underflow (Pilha vazia)");
        }
        const elemento = this.top();
        this.lista.removeFirst();
        return elemento;
    }

    top() {
        if (this.isEmpty()) {
            throw new Error("Pilha vazia");
        }
        return this.lista.head.proximo.dado;
    }

    isEmpty() {
        return this.lista.isEmpty();
    }

    size() {
        return this.lista.length();
    }

    toString() {
        return this.lista.toString();
    }
}

const pilha = new Pilha();

console.assert(pilha.isEmpty() === true, "Pilha deve estar vazia após criação");

pilha.push(10);
console.assert(pilha.isEmpty() === false, "Não estar vazia apos push");
console.assert(pilha.size() === 1, "tamanho 1 apos push");
console.assert(pilha.top() === 10, "Topo deve ser 10 após push(10)");

pilha.push(20);
pilha.push(30);
console.assert(pilha.pop() === 30, "pop deve retornar 30");
console.assert(pilha.top() === 20, "Topo deve ser 20 após pop");
console.assert(pilha.size() === 2, "Pilha deve ter tamanho 2 após push/pop");

const pilhaVazia = new Pilha();
try {
    pilhaVazia.pop();
    console.error("Falha: pop em pilha vazia não lançou exceção");
} catch (e) {
    console.assert(e.message === "Underflow - Pilha vazia", "Deve lançar Underflow");
}


//QUESTÃO 2

class Fila {
  constructor() {
    this.lista = new Lista();
  }

  enqueue(elemento) {
    if (this.lista.isEmpty()) {
      this.lista.add(elemento);
    } else {
      this.lista.append(elemento);
    }
  }

  dequeue() {
    if (!this.isEmpty()) {
      this.lista.removeFirst();
    }
  }

  front() {
    if (!this.isEmpty()) {
      return this.lista.head.proximo.dado;
    }
    return null;
  }

  isEmpty() {
    return this.lista.isEmpty();
  }

  size() {
    return this.lista.length();
  }

  toString() {
    return this.lista.toString();
  }
}

const fila = new Fila();

console.log('Teste 1 - Fila vazia');
console.log(fila.isEmpty() === true);
console.log(fila.size() === 0);

console.log('Teste 2 - Enqueue');
fila.enqueue('a');
console.log(fila.front() === 'a');
console.log(fila.size() === 1);

console.log('Teste 3 - Enqueue múltiplo');
fila.enqueue('b');
fila.enqueue('c');
console.log(fila.toString() === 'abc');
console.log(fila.size() === 3);

//QUESTÃO 3

//QUESTÃO 4

function inverteLista(lista) {
    if (lista.isEmpty() || lista.length() === 1) {
        return;
    }

    let anterior = null;
    let atual = lista.head.proximo;
    let proximo = null;

    while (atual !== null) {
        proximo = atual.proximo;
        atual.proximo = anterior;
        anterior = atual;
        atual = proximo;
    }

    lista.head.proximo = anterior;
}

const lista = new Lista();

console.log('Lista com um elemento');
lista.add('a');
inverteLista(lista);
console.log(lista.toString() === 'a');

console.log('Inverte novamente');
inverteLista(lista);
console.log(lista.toString() === 'cba');

console.log('Adiciona mais elementos e inverte');
lista.add('d');
lista.add('e');
console.log(lista.toString() === 'edcba');
inverteLista(lista);
console.log(lista.toString() === 'abcde');

//QUESTÃO 5

function shuffleLista(lista) {
    if (lista.isEmpty() || lista.length() === 1) return;

    const elementos = [];
    let atual = lista.head.proximo;
    while (atual !== null) {
        elementos.push(atual.dado);
        atual = atual.proximo;
    }

    for (let i = elementos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [elementos[i], elementos[j]] = [elementos[j], elementos[i]];
    }

    lista.head.proximo = null; 
    for (let i = elementos.length - 1; i >= 0; i--) {
        lista.add(elementos[i]); 
    }
}

console.log("Vazia");
const listaVazia = new Lista();
console.log("Antes:", listaVazia.toString());
shuffleLista(listaVazia);
console.log("Depois:", listaVazia.toString());
console.log("--> Resultado esperado: lista continua vazia\n");

console.log("Lista com 5 números");
const listaNumeros = new Lista();
[1, 2, 3, 4, 5].forEach(num => listaNumeros.add(num));
console.log("Original:", listaNumeros.toString());

// Embaralha 3x para mostrar que muda
for (let i = 1; i <= 3; i++) {
    const copia = new Lista();
    let atual = listaNumeros.head.proximo;
    while (atual !== null) {
        copia.add(atual.dado);
        atual = atual.proximo;
    }
    shuffleLista(copia);
    console.log(`Shuffle ${i}:`, copia.toString());
}
console.log("--> Resultado esperado: ordens diferentes a cada vez\n");

//QUESTÃO 6

class StringLista {
    constructor(texto = '') {
      this.lista = new Lista();
      for (let i = texto.length - 1; i >= 0; i--) {
        this.lista.add(texto[i]);
      }
    }
  
    substring(A, B) {
      const novaLista = new Lista();
      let pos = 0;
      let atual = this.lista.head.proximo;
  
      while (atual !== null && pos < A) {
        atual = atual.proximo;
        pos++;
      }
  
      while (atual !== null && pos <= B) {
        novaLista.add(atual.dado); 
        atual = atual.proximo;
        pos++;
      }
  
      return novaLista;
    }
  
    toString() {
      let result = '';
      let atual = this.lista.head.proximo;
      while (atual !== null) {
        result = atual.dado + result; 
        atual = atual.proximo;
      }
      return result;
    }
  }
  
  console.log("TESTE: Lista vazia");
  const vazia = new StringLista();
  const substringVazia = vazia.substring(0, 2);
  console.log("Original:", vazia.toString());
  console.log("Substring(0,2):", substringVazia.toString());
  console.log("Tamanho:", substringVazia.length());

  if (substringVazia.length() === 0) {
    console.log("OK - substring de vazia ficou vazia");
  } else {
    console.log("ERRO - deveria estar vazia");
  }
  
  console.log("\nTESTE: Substring normal");
  const nome = new StringLista("Vitor");
  console.log("Original:", nome.toString());
  const subNome = nome.substring(2, 5);
  console.log("Substring(2,5):", subNome.toString());
  console.assert(subNome.toString() === "rna", 
    `ERRO - Esperado "rna" mas veio "${subNome.toString()}"`);

//QUESTÃO 7

//QUESTÃO 8 (Incompleta)


class Pessoa {
    constructor(nome, idade) {
      this.nome = nome;  
      this.idade = idade; 
    }
  }
  
  class ListaPessoas {
    constructor() {
      this.lista = new Lista(); 
    }
  
    adicionar(nome, idade) {  
      const pessoa = new Pessoa(nome, idade);
      this.lista.add(pessoa); 
    }
  
    ordenarPorNome() {
      const pessoas = [];  
      let atual = this.lista.head.proximo;  
      
      while (atual !== null) {  
        pessoas.push(atual.dado);  
        atual = atual.proximo;  
      }
  
      pessoas.sort((a, b) => {
        return a.nome.localeCompare(b.nome) 
      });
  
      const novaLista = new Lista();
      for (let i = pessoas.length - 1; i >= 0; i--) {  
        novaLista.add(pessoas[i]);  
      }

    }

}

const listaTeste = new ListaPessoas();
listaTeste.adicionar("João", 30);  
listaTeste.adicionar("Ana", 25);

const ordenada = listaTeste.ordenarPorNome();  

console.log(ordenada);  