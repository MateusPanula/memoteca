import { Component, OnInit } from '@angular/core';
import { MemoriaService } from 'src/app/memoria.service';

interface Memoria {
  nome: string;
  imagemBase64: string;
  descricao: string;
  data: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  public memorias: { id: string; memoria: Memoria }[] = [];
  public memoriasFiltradas: { id: string; memoria: Memoria }[] = [];
  public pesquisa: string = '';

  constructor(private memoriaService: MemoriaService) { }

  ngOnInit(): void {
    this.carregarCards();
  }

  async carregarCards() {
    try {
      const dados = await this.memoriaService.buscarTodasMemorias();
      if (dados) {
        this.memorias = Object.entries(dados).map(([id, memoria]) => ({
          id: id,
          memoria: memoria as Memoria
        }));
        this.memoriasFiltradas = [...this.memorias];
      }
    } catch (error) {
      console.error('Erro ao carregar as memórias:', error);
    }
  }

  filtrarMemorias() {
    const textoBusca = this.pesquisa.toLowerCase();
    this.memoriasFiltradas = this.memorias.filter(item => 
      item.memoria.nome.toLowerCase().includes(textoBusca)
    );
  }
}
