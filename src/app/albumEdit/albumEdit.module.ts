import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumEditComponent } from './albumEdit.component';
import { InputModule } from "app/input/input.module";
import { DropDownListModule } from "app/dropDownList/dropDownList.module";
import { AlbumEditRoutes } from "app/albumEdit/albumEdit.routing";
import { InputCompletionModule } from "app/inputCompletion/inputCompletion.module";
import { TextareaModule } from "app/textarea/textarea.module";
import { UploadCoverMapModule } from "app/uploadCoverMap/uploadCoverMap.module";
import { ButtonModule } from "app/button/button.module";

@NgModule({
  declarations: [AlbumEditComponent],
  imports: [
    CommonModule,
    AlbumEditRoutes,
    DropDownListModule,
    InputModule,
    InputCompletionModule,
    TextareaModule,
    UploadCoverMapModule,
    ButtonModule
  ]
})
export class AlbumEditModule { }