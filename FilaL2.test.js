import Fila from './Fila.js';
import Pilha from './Pilha.js';


//QUESTÃO 1

class PilhaUsandoFilas {
    constructor(tamanho = 5) {
        this.fila1 = new Fila(tamanho);
        this.fila2 = new Fila(tamanho);
        this.tamanho = tamanho;
    }

    push(elemento) {
        if (this.fila1.isFull()) {
            throw new Error("Pilha overflow");
        }
        
        while (!this.fila1.isEmpty()) {
            this.fila2.enqueue(this.fila1.front());
            this.fila1.dequeue();
        }
        
        this.fila1.enqueue(elemento);
        
        while (!this.fila2.isEmpty()) {
            this.fila1.enqueue(this.fila2.front());
            this.fila2.dequeue();
        }
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("Pilha underflow");
        }
        return this.fila1.dequeue();
    }

    top() {
        if (this.isEmpty()) {
            throw new Error("Pilha está vazia");
        }
        return this.fila1.front();
    }

    isEmpty() {
        return this.fila1.isEmpty();
    }

    isFull() {
        return this.fila1.isFull();
    }

    size() {
        return this.fila1.length();
    }

    clear() {
        this.fila1.clear();
        this.fila2.clear();
    }
}

describe('PilhaUsandoFilas', () => {
    let pilha;

    beforeEach(() => {
        pilha = new PilhaUsandoFilas(3);
    });

    test('push e top', () => {
        pilha.push(10);
        expect(pilha.top()).toBe(10);
        pilha.push(20);
        expect(pilha.top()).toBe(20);
        pilha.push(30);
        expect(pilha.top()).toBe(30);
    });

    test('pop', () => {
        pilha.push(10);
        pilha.push(20);
        expect(pilha.pop()).toBeUndefined();
        expect(pilha.top()).toBe(10);
    });

    test('Vazio', () => {
        expect(pilha.isEmpty()).toBeTruthy();
        pilha.push(10);
        expect(pilha.isEmpty()).toBeFalsy();
    });

    test('Cheio', () => {
        expect(pilha.isFull()).toBeFalsy();
        pilha.push(10);
        pilha.push(20);
        pilha.push(30);
        expect(pilha.isFull()).toBeTruthy();
    });

    test('Tamanho', () => {
        expect(pilha.size()).toBe(0);
        pilha.push(10);
        expect(pilha.size()).toBe(1);
        pilha.push(20);
        expect(pilha.size()).toBe(2);
    });

    test('Clear', () => {
        pilha.push(10);
        pilha.push(20);
        pilha.clear();
        expect(pilha.isEmpty()).toBeTruthy();
    });

});

//QUESTÃO 2

class FilaUsandoPilhas {
    constructor(tamanho = 5) {
        this.pilhaEntrada = new Pilha(tamanho);
        this.pilhaSaida = new Pilha(tamanho);
        this.tamanho = tamanho;
    }

    enqueue(elemento) {
        if (this.isFull()) {
            throw new Error("Fila overflow");
        }
        while (!this.pilhaSaida.isEmpty()) {
            this.pilhaEntrada.push(this.pilhaSaida.top());
            this.pilhaSaida.pop();
        }
        this.pilhaEntrada.push(elemento);
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Fila underflow");
        }
        while (!this.pilhaEntrada.isEmpty()) {
            this.pilhaSaida.push(this.pilhaEntrada.top());
            this.pilhaEntrada.pop();
        }
        const elementoRemovido = this.pilhaSaida.top();
        this.pilhaSaida.pop();
        return elementoRemovido;
    }

    front() {
        if (this.isEmpty()) {
            throw new Error("está Vazia");
        }
        while (!this.pilhaEntrada.isEmpty()) {
            this.pilhaSaida.push(this.pilhaEntrada.top());
            this.pilhaEntrada.pop();
        }
        const primeiro = this.pilhaSaida.top();
        while (!this.pilhaSaida.isEmpty()) {
            this.pilhaEntrada.push(this.pilhaSaida.top());
            this.pilhaSaida.pop();
        }
        return primeiro;
    }

    isEmpty() {
        return this.pilhaEntrada.isEmpty() && this.pilhaSaida.isEmpty();
    }

    isFull() {
        return this.pilhaEntrada.length() + this.pilhaSaida.length() === this.tamanho;
    }

    size() {
        return this.pilhaEntrada.length() + this.pilhaSaida.length();
    }

    clear() {
        this.pilhaEntrada.clear();
        this.pilhaSaida.clear();
    }
}

describe('FilaUsandoPilhas', () => {
    let fila;

    beforeEach(() => {
        fila = new FilaUsandoPilhas(3);
    });

    test('enqueue e front', () => {
        fila.enqueue(10);
        expect(fila.front()).toBe(10);
        fila.enqueue(20);
        expect(fila.front()).toBe(10); 
    });

    test('dequeue', () => {
        fila.enqueue(10);
        fila.enqueue(20);
        expect(fila.dequeue()).toBe(10);
        expect(fila.dequeue()).toBe(20);
    });

    test('isEmpty', () => {
        expect(fila.isEmpty()).toBeTruthy();
        fila.enqueue(10);
        expect(fila.isEmpty()).toBeFalsy();
    });

    test('isFull', () => {
        fila.enqueue(10);
        fila.enqueue(20);
        fila.enqueue(30);
        expect(fila.isFull()).toBeTruthy();
    });

    test('size', () => {
        expect(fila.size()).toBe(0);
        fila.enqueue(10);
        expect(fila.size()).toBe(1);
        fila.enqueue(20);
        expect(fila.size()).toBe(2);
    });

    test('clear', () => {
        fila.enqueue(10);
        fila.enqueue(20);
        fila.clear();
        expect(fila.isEmpty()).toBeTruthy();
    });

    test('Fila overflow', () => {
        fila.enqueue(10);
        fila.enqueue(20);
        fila.enqueue(30);
        expect(() => fila.enqueue(40)).toThrow("Fila overflow");
    });

    test('Fila underflow', () => {
        expect(() => fila.dequeue()).toThrow("Fila underflow");
    });

});

//QUESTÃO 3 

//QUESTÃO 4

function intercalarFilas(fila1, fila2) {
    const filaIntercalada = new Fila(fila1.size + fila2.size);

    while (!fila1.isEmpty() || !fila2.isEmpty()) {
        if (!fila1.isEmpty()) {
            filaIntercalada.enqueue(fila1.front());
            fila1.dequeue();
        }
        if (!fila2.isEmpty()) {
            filaIntercalada.enqueue(fila2.front());
            fila2.dequeue();
        }
    }

    return filaIntercalada;
}

test('intercalar filas', () => {
    const fila1 = new Fila(5);
    const fila2 = new Fila(5);

    fila1.enqueue(1);
    fila1.enqueue(3);
    fila1.enqueue(5);
    fila2.enqueue(2);
    fila2.enqueue(4);
    fila2.enqueue(6);

    const resultado = intercalarFilas(fila1, fila2);
    expect(resultado.front()).toBe(1);
    resultado.dequeue();
    expect(resultado.front()).toBe(2);
    resultado.dequeue();
    expect(resultado.front()).toBe(3);
    resultado.dequeue();
    expect(resultado.front()).toBe(4);
    resultado.dequeue();
    expect(resultado.front()).toBe(5);
    resultado.dequeue();
    expect(resultado.front()).toBe(6);
});

//QUESTÃO 5

//QUESTÃO 6

function reverterFila(fila) {
    if (fila.isEmpty()) {
        return new Fila(fila.size); 
    }

    const elemento = fila.front(); 
    fila.dequeue(); 

    const filaRevertida = reverterFila(fila); 
    filaRevertida.enqueue(elemento); 

    return filaRevertida;
}

test('Reverte fila [1, 2, 3] para [3, 2, 1]', () => {
    const fila = new Fila(5);
    fila.enqueue(1);
    fila.enqueue(2);
    fila.enqueue(3);

    const revertida = reverterFila(fila);
    expect(revertida.front()).toBe(3);
    revertida.dequeue();
    expect(revertida.front()).toBe(2);
    revertida.dequeue();
    expect(revertida.front()).toBe(1);
});
