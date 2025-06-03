// Importa a função que ativa o modo de produção do Angular
import { enableProdMode } from '@angular/core';

// Importa a plataforma para executar a aplicação no navegador
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Importa o módulo principal da aplicação
import { AppModule } from './app/app.module';

// Importa as configurações do ambiente (ex: development ou production)
import { environment } from './environments/environment';

// Se o ambiente for de produção, ativa o modo de produção do Angular
// Isso remove mensagens de log e verificações desnecessárias, melhorando a performance
if (environment.production) {
  enableProdMode();
}

// Inicializa a aplicação Angular usando o módulo principal (AppModule)
// Se houver erro durante a inicialização, ele será exibido no console
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
