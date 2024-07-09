import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { LoadingComponent } from '../loading/loading.component';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, LoadingComponent, MatCardModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  versao = '1.0'
  loginForm: UntypedFormGroup;
  loading: boolean = false
  showError = false
  mensagemError = 'Verifique seus dados de acesso, login inválido !'

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['renan.celso@gmail.com', [Validators.required, Validators.email]],
      password: ['kiko339133', Validators.required],
    });
  }

  ngOnInit() {

  }

  login() {
    if (this.loginForm.valid) {
      this.showError = false
      this.loading = true
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password)
        .pipe(finalize(() => this.setLoading(false)))
        .pipe(catchError(() => {
          this.showError = true;
          this.toastr.error('Erro!', 'E-mail ou senha inválidos!', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing'
          });
          console.log('loading......', this.loading);
          this.cd.detectChanges();
          return EMPTY;
        }))
        .subscribe({
          next: (response) => {
            localStorage.setItem('token', response);
            this.authService.usuarioLogadoEv.emit(true);
            this.router.navigate(['/']);
            this.toastr.success('Bem vindo!', 'Seu bosta!', {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing'
            });
            this.cd.detectChanges()
          }
        });
    }
  }

  private setLoading(status: boolean) {
    this.loading = status
    this.cd.detectChanges()
  }
}
