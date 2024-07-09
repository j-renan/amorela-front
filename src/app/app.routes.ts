import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContentComponent } from './components/content/content.component';

export const routes: Routes = [
  { path: '', component: ContentComponent },
  //{ path: '/principal', component: ContentComponent },
  { path: 'logout', component: LoginComponent }
  //{path: '**', component: LoginComponent}

];
