import { Component, ViewChild, OnInit } from '@angular/core';
import { MemoriaService } from 'src/app/memoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CadastrarComponent } from 'src/app/cadastrar/cadastrar.component';
import { EditarComponent } from 'src/app/editar/editar.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit {
  id: string = '';
  nome: string = '';
  data: string = '';
  descricao: string = '';
  imagem: string = '';
  textoBotao: string = 'Alterar';
  textoTitulo: string = 'Visualizar';
  paginaAtual: any = this.router.url;

  @ViewChild(CadastrarComponent) cadastrar!: CadastrarComponent;
  @ViewChild(EditarComponent) editar!: EditarComponent;

  constructor(private memoriaService: MemoriaService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    if (this.paginaAtual == "/Cadastrar") {
      this.textoBotao = "Cadastrar";
      this.textoTitulo = "Cadastrar";
    }
    else {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.memoriaService.setDadosMemoria("", "", "", "", id);
        this.preencherDados();
        this.id = id;
      }
    }

  }

  async excluirMemoria(){
    if(confirm("Deseja apagar esta memória?")){
      this.memoriaService.apagarMemoria();
      this.router.navigate(['/']);
    }   
  }

  async preencherDados() {
    await this.memoriaService.buscarMemoria();
    const dados = this.memoriaService.getDadosMemoria();
    this.nome = dados.nome;
    this.data = dados.data;
    this.descricao = dados.descricao;
    this.imagem = dados.imagemBase64;
  }

  async enviarDados() {
    const imagem = document.getElementById("imagem") as HTMLInputElement;
    if (this.nome == "") {
      this.enviarMensagem("Digite um nome válido!", "red");
    } else if (this.data == "") {
      this.enviarMensagem("Digite uma data válida!", "red");
    } else if (this.descricao == "") {
      this.enviarMensagem("Digite uma descrição válida!", "red");
    } else if ((!imagem.files?.[0] || !imagem.files[0].type.startsWith('image/')) && (this.paginaAtual == "/Cadastrar")) {
      this.enviarMensagem("Anexe uma imagem válida!", "red");
    } else {
      const imagemBase64 = await this.imagemBase64();
      if (this.paginaAtual == "/Cadastrar") {
        if (imagemBase64) {
          this.memoriaService.setDadosMemoria(this.nome, this.data, this.descricao, imagemBase64, "");
          try {
            await this.memoriaService.cadastrarMemoria();
            this.enviarMensagem('Cadastrado com sucesso!', 'green');
          } catch (error) {
            console.error('Erro ao cadastrar memória!');
          }
        }
      } else {
        if (imagemBase64) {
          await this.memoriaService.setDadosMemoria(this.nome, this.data, this.descricao, imagemBase64, this.id);
        } else {
          await this.memoriaService.setDadosMemoria(this.nome, this.data, this.descricao, this.imagem, this.id);
        }
        try {
          await this.memoriaService.atualizarMemoria();
          this.enviarMensagem('Atualizado com sucesso!', 'green');
          setTimeout(() => { this.router.navigate(['/']); }, 1300);
        } catch (error) {
          console.error('Erro ao atualizar memória!');
        }
      }
      setTimeout(() => { this.enviarMensagem('', 'red'); }, 3000);
      this.limparCampos();
    }
  }

  async imagemBase64(): Promise<string | undefined> {
    const input = document.getElementById("imagem") as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  enviarMensagem(messagem: string, color: string) {
    const alerta = document.getElementsByClassName("alerta")[0] as HTMLInputElement;
    alerta.textContent = messagem;
    alerta.style.color = color;
  }

  limparCampos() {
    this.nome = "";
    this.data = "";
    this.descricao = "";
    const imagem = document.getElementById("imagem") as HTMLInputElement;
    imagem.value = "";
    this.imagem = "";
  }

  async alterarImagem() {
    const imagemBase64 = await this.imagemBase64();
    if (imagemBase64) {
      this.imagem = imagemBase64;
    } else {
      this.imagem = '';
    }
  }
}
