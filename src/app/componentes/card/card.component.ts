import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() nome: string = '';
  @Input() imagemBase64: string = '';
  @Input() id: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void { }

  mostrarCard(id: string) {
    this.router.navigate(['/Editar', id]);
  }
}
