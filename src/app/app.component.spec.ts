// Importa o módulo TestBed, que fornece métodos para configurar o ambiente de testes do Angular
import { TestBed } from '@angular/core/testing';

// Importa o módulo de testes de rotas, necessário quando usamos o Router em componentes
import { RouterTestingModule } from '@angular/router/testing';

// Importa o componente que será testado (AppComponent)
import { AppComponent } from './app.component';

// Descreve o conjunto de testes para o componente AppComponent
describe('AppComponent', () => {

  // beforeEach() é executado antes de cada teste para configurar o ambiente de testes
  beforeEach(async () => {
    // Configura o módulo de teste com as dependências necessárias
    await TestBed.configureTestingModule({
      // Importa o RouterTestingModule, essencial para testar componentes que dependem do roteamento
      imports: [
        RouterTestingModule
      ],
      // Declara os componentes que serão testados (no caso, apenas o AppComponent)
      declarations: [
        AppComponent
      ],
    }).compileComponents(); // Compila os componentes para o ambiente de teste
  });

  // Teste 1: Verifica se o componente foi criado corretamente
  it('should create the app', () => {
    // Cria o componente para testar
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance; // Instancia o componente

    // Verifica se o componente foi criado com sucesso
    expect(app).toBeTruthy();
  });

  // Teste 2: Verifica se o título do componente é 'memoteca'
  it(`should have as title 'memoteca'`, () => {
    // Cria o componente novamente
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Verifica se a propriedade 'title' é igual a 'memoteca'
    expect(app.title).toEqual('memoteca');
  });

  // Teste 3: Verifica se o título é renderizado corretamente no template
  it('should render title', () => {
    // Cria o componente novamente
    const fixture = TestBed.createComponent(AppComponent);

    // Detecta mudanças no template (força o Angular a processar o template)
    fixture.detectChanges();

    // Acessa o conteúdo renderizado no DOM
    const compiled = fixture.nativeElement as HTMLElement;

    // Verifica se o texto 'memoteca app is running!' está presente na página
    expect(compiled.querySelector('.content span')?.textContent).toContain('memoteca app is running!');
  });
});
