import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { LoginComponent } from './pages/login/login.component';
import { SelectCompanyComponent } from './pages/select-company/select-company.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { UserRegistryComponent } from './pages/user-registry/user-registry.component';
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';
import { AddUserOverlayComponent } from './components/add-user-overlay/add-user-overlay.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: AnnouncementsComponent, canActivate: [AuthGuard] },
  {
    path: 'select-company',
    component: SelectCompanyComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'teams',
    component: TeamsComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-registry',
    component: UserRegistryComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: '**',
    component: AnnouncementsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
