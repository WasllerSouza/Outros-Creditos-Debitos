import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ConsultaLotesPageComponent
} from './feature/outros-creditos-debitos/pages/consulta-lotes/consulta-lotes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConsultaLotesPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'outros-creditos-debitos';
}
