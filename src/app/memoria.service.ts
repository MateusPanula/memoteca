import { database } from 'src/app/firebase-config';
import { ref, set, get, update, remove, push } from 'firebase/database';

interface Memoria {
    id: string;
    nome: string;
    data: string;
    descricao: string;
    imagemBase64: string;
}

export class MemoriaService {
    private tabela = 'memorias';

    private dadosMemoria: Memoria = {
        nome: '',
        data: '',
        descricao: '',
        imagemBase64: '',
        id: ''
    };

    constructor() { }

    setDadosMemoria(nome: string, data: string, descricao: string, imagemBase64: string, id?: string) {
        if (id) {
            this.dadosMemoria.id = id;
        } else {
            this.dadosMemoria.id = '';
        }
        this.dadosMemoria.nome = nome;
        this.dadosMemoria.data = data;
        this.dadosMemoria.descricao = descricao;
        this.dadosMemoria.imagemBase64 = imagemBase64;
    }

   getDadosMemoria() {
        return this.dadosMemoria;
    }

    async cadastrarMemoria() {
        try {
            const todosIDs = await this.buscarTodasMemorias();
            const numeros = Object.keys(todosIDs || {}).map(id => Number(id.replace('memoria_', ''))).filter(num => num > 0);
            const id = `memoria_${numeros.length ? Math.max(...numeros) + 1 : 1}`;
            const memoriaRef = ref(database, `${this.tabela}/${id}`);
            await set(memoriaRef, (({ id, ...r }) => r)(this.dadosMemoria));
        } catch (error) {
            console.error('Erro ao cadastrar memória:', error);
        }
    }

    async buscarMemoria(): Promise<any | undefined> {
        try {
            const memoriaRef = ref(database, `${this.tabela}/${this.dadosMemoria.id}`);
            const dados = await get(memoriaRef);
            var dadosTratados = dados.val();
            if (dados.exists()) {
                this.dadosMemoria.nome = dadosTratados.nome;
                this.dadosMemoria.data = dadosTratados.data;
                this.dadosMemoria.descricao = dadosTratados.descricao;
                this.dadosMemoria.imagemBase64 = dadosTratados.imagemBase64;
            } else {
                console.warn("Dados não encontrados.");
            }
        } catch (error) {
            console.error('Erro ao buscar memória:', error);
        }
    }

    async buscarTodasMemorias() {
        try {
            const todasRef = ref(database, this.tabela);
            const dados = await get(todasRef);
            return dados.exists() ? dados.val() : null;
        } catch (error) {
            console.error('Erro ao buscar todas as memórias:', error);
        }
    }

    async atualizarMemoria() {
        try {
            const memoriaRef = ref(database, `${this.tabela}/${this.dadosMemoria.id}`);
            await update(memoriaRef, (({ id, ...r }) => r)(this.dadosMemoria));
        } catch (error) {
            console.error('Erro ao atualizar memória:', error);
        }
    }

    async apagarMemoria() {
        try {
            const memoriaRef = ref(database, `${this.tabela}/${this.dadosMemoria.id}`);
            await remove(memoriaRef);
        } catch (error) {
            console.error('Erro ao apagar memória:', error);
        }
    }
}
