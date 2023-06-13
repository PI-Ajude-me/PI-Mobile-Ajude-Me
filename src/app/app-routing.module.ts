import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/shared/auth-guard-service';
import { EventosPageModule } from './dashboard/eventos/eventos.module';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home-tab',
    loadChildren: () => import('./dashboard/home-tab/home-tab.module').then( m => m.HomeTabPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./dashboard/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'duvida',
    loadChildren: () => import('./dashboard/duvida/duvida.module').then( m => m.DuvidaPageModule)
  },
  {
    path: 'acesso',
    loadChildren: () => import('./acesso/acesso.module').then( m => m.AcessoPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./dashboard/eventos/eventos.module').then( m => m.EventosPageModule)
  },

/*
  {path:'', component: StudentInformationComponent},
  {path:'student-info', redirectTo:'', pathMatch:'full'},*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
