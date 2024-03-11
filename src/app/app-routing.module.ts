import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/AuthGuard.model';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/banco',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'banco',
    loadChildren: () =>
      import('./modules/banco/banco.module').then((m) => m.BancoModule),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/banco', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
