import { Routes, RouterModule } from '@angular/router';
import { AlbumEditComponent } from "app/albumEdit/albumEdit.component";

const routes: Routes = [
  {
    path: '',
    component: AlbumEditComponent
  },
];

export const AlbumEditRoutes = RouterModule.forChild(routes);
