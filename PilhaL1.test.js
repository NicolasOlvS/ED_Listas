import Pilha from "../src/Pilha";

let p;

beforeEach(() => {
    p = new Pilha();
})

//QUESTÃO 1

test("'ABACAXI' retornar 'IXACABA'", () => {
    expect(inverte("ABACAXI")).toBe("IXACABA");
});

function inverte(palavra) {
    const pilha = new Pilha(palavra.length); 
    for (let i = 0; i < palavra.length; i++) {
        pilha.push(palavra[i]);
    }

    let palavraInvertida = "";

    while (!pilha.isEmpty()) {
        palavraInvertida += pilha.top(); 
        pilha.pop(); 
    }
    return palavraInvertida;
}

//QUESTÃO 2

//QUESTÃO 3

test("[1, 2, 3, 4, 5] => [5, 2, 3, 4, 1]", () => {
    p.push(1);
    p.push(2);
    p.push(3);
    p.push(4);
    p.push(5);
    trocaBaseTopoBurra(p);
    expect(p.pop()).toBe(1); 
    expect(p.pop()).toBe(4);
    expect(p.pop()).toBe(3);
    expect(p.pop()).toBe(2);
    expect(p.pop()).toBe(5); 
});

function trocaBaseTopoBurra(pilha) {
    if (pilha.isEmpty()) return;

    let elementos = [];
    while (!pilha.isEmpty()) {
        elementos.push(pilha.top());
        pilha.pop();
    }
    let temp = elementos[0];
    elementos[0] = elementos[elementos.length - 1];
    elementos[elementos.length - 1] = temp;

    for (let i = elementos.length - 1; i >= 0; i--) {
        pilha.push(elementos[i]);
    }
}

//QUESTÃO 4

test("10 para binário", () => {
    expect(decimalParaBinario(10)).toBe("1010");
});

test("0 para binário", () => {
    expect(decimalParaBinario(0)).toBe("0");
});

test("25 para binário", () => {
    expect(decimalParaBinario(25)).toBe("11001");
});

function decimalParaBinario(numeroDecimal) {
    if (numeroDecimal === 0) return "0"; 

    const pilha = new Pilha();
    let numero = numeroDecimal;

    while (numero > 0) {
        pilha.push(numero % 2);
        numero = Math.floor(numero / 2);
    }

    let binario = "";

    while (!pilha.isEmpty()) {
        binario += pilha.top();
        pilha.pop();
    }

    return binario;
}

//QUESTÃO 5 

function verificaDelimitadores(expressao) {
    const pilha = new Pilha();
    
    for (let i = 0; i < expressao.length; i++) {
        const char = expressao[i];
        if (char === '(' || char === '[') {
            pilha.push(char);
        } 
        else if (char === ')' || char === ']') {
            if (pilha.isEmpty()) {
                return false;
            }
            const topo = pilha.top();
            pilha.pop();
            if ((char === ')' && topo !== '(') || (char === ']' && topo !== '[')) {
                return false;
            }
        }
    }


    return pilha.isEmpty();
}

test("Expressão correta", () => {
    expect(verificaDelimitadores("[ ( ) [ ( ) ] ] ( )")).toBe(true);
});

test("Expressão errada", () => {
    expect(verificaDelimitadores("( ( ) ]")).toBe(false);
});

//QUESTÃO 6

//QUESTÃO 7

function removeDuplicatasErrada(pilha) {
    const elementosVistos = new Set();
    const pilhaAux = new Pilha();
    while (!pilha.isEmpty()) {
        pilhaAux.push(pilha.top());
        pilha.pop();
    }
    
        while (!pilhaAux.isEmpty()) {
        const elemento = pilhaAux.top();
        pilhaAux.pop();
        
        if (!elementosVistos.has(elemento)) {
            pilha.push(elemento);
            elementosVistos.add(elemento);
        }
    }
    
        const resultado = [];
    while (!pilha.isEmpty()) {
        resultado.push(pilha.top());
        pilha.pop();
    }
    
    return resultado.reverse();
}

test("Remover Duplicações", () => {
    const p = new Pilha();
    [3, 7, 3, 2, 7, 1, 4, 2].forEach(num => p.push(num));
    
    const resultado = removeDuplicatasErrada(p);
    expect(resultado).toEqual([3, 7, 2, 1, 4]);
});

//QUESTÃO 8 

class PilhaDePratos {
    constructor(capacidadePorPilha) {
        this.pilhas = [[]]; 
        this.capacidade = capacidadePorPilha;
    }

    empilha(x) {
        if (this.pilhas.length === 0) { 
            this.pilhas.push([]);
        }
        
        if (this.pilhas[this.pilhas.length - 1].length >= this.capacidade) {
            this.pilhas.push([]);
        }
        
        this.pilhas[this.pilhas.length - 1].push(x);
    }

    desempilha() {
        if (this.pilhas.length === 0) {
            return null;
        }
        
        const ultimaPilha = this.pilhas[this.pilhas.length - 1];
        
        if (ultimaPilha.length === 0) {
            this.pilhas.pop(); 
            return this.desempilha(); 
        }
        
        const prato = ultimaPilha.pop();
        
        if (ultimaPilha.length === 0) {
            this.pilhas.pop();
        }
        
        return prato;
    }
}

const pilha = new PilhaDePratos(3);
pilha.empilha(5);
pilha.empilha(10);
pilha.empilha(15);
pilha.empilha(20);

console.log(pilha.desempilha()); 
console.log(pilha.desempilha()); 