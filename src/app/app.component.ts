import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ContentComponent } from './components/content/content.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContentComponent, LoginComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {
  title = 'amorela';
  logado = false;

  constructor(
    private authService: AuthService
  ) {
    this.authService.usuarioLogadoEv.subscribe(logado => this.logado = logado)
  }
}
