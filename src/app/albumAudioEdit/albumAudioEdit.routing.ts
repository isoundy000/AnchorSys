import { Routes, RouterModule } from '@angular/router';
import { AlbumAudioEditComponent } from "app/albumAudioEdit/albumAudioEdit.component";
import { ScenicChoiceComponent } from "app/scenicChoice/scenicChoice.component";
import { ScenicEditComponent } from "app/scenicEdit/scenicEdit.component";

const routes: Routes = [
  {
    path: '',
    component: AlbumAudioEditComponent,
    children: [
      //loadChildren: "app/scenicChoice/scenicChoice.module#ScenicChoiceModule"
      { path: 'scenicChoice/:id', component: ScenicChoiceComponent },
      { path: 'scenicEdit/:id', component: ScenicEditComponent }
      //loadChildren: "app/scenicEdit/scenicEdit.module#ScenicEditModule"
    ]
  }
];

export const AlbumAudioEditRoutes = RouterModule.forChild(routes);
