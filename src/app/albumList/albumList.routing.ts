import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from "app/albumList/albumList.component";

const routes: Routes = [
  {  
    path:'',
    component:AlbumListComponent
  },
];

export const AlbumListRoutes = RouterModule.forChild(routes);
