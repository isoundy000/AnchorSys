import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "app/login/login.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'albumList/:page', loadChildren: "app/albumList/albumList.module#AlbumListModule" },
  { path: 'albumEdit/:id', loadChildren: "app/albumEdit/albumEdit.module#AlbumEditModule" },
  { path: 'albumAudioEdit/:id', loadChildren: "app/albumAudioEdit/albumAudioEdit.module#AlbumAudioEditModule" },
  { path: '**', component: LoginComponent }
];

export const AppRoutes = routes;
