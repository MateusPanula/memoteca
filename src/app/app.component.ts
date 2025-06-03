// Importa o decorador @Component do Angular, usado para definir um componente
import { Component } from '@angular/core';

// Declara o componente com o decorador @Component
@Component({
  // Define o seletor HTML que será usado para renderizar este componente
  // No caso, <app-root> será usado dentro do index.html
  selector: 'app-root',

  // Define o arquivo HTML que representa a visualização deste componente
  templateUrl: './app.component.html',

  // Define o(s) arquivo(s) de estilo aplicados a este componente
  styleUrls: ['./app.component.css']
})
// Classe que implementa o componente AppComponent
// Aqui você pode declarar variáveis, métodos, e lógica do componente
export class AppComponent {
  // Propriedade chamada title que será usada no template HTML, se necessário
  title = 'memoteca';
}
