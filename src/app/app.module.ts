import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// import { AlbumListComponent } from './albumList/albumList.component';
// import { DropDownListComponent } from './dropDownList/dropDownList.component';
// import { InputComponent } from './input/input.component';
// import { ButtonComponent } from './button/button.component';
// import { AlbumEditComponent } from './albumEdit/albumEdit.component';
// import { TextareaComponent } from './textarea/textarea.component';
// import { UploadCoverMapComponent } from './uploadCoverMap/uploadCoverMap.component';
// import { AlbumAudioEditComponent } from './albumAudioEdit/albumAudioEdit.component';
// import { InputCompletionComponent } from './inputCompletion/inputCompletion.component';


import { ApiService } from "./service/api.service";


import { LocalStorage } from './service/local.storage';
import { UploadService } from "app/service/upload.service";
import { DropDownListModule } from "app/dropDownList/dropDownList.module";
import { UiService } from "app/service/ui.service";
import { AppRoutes } from "app/app.routing";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    //DropDownListComponent,
    //InputComponent,
    //ButtonComponent,
    //AlbumEditComponent,
    // TextareaComponent,
    // UploadCoverMapComponent,
    //ScenicEditComponent,
    //AlbumAudioEditComponent,
    // ScenicChoiceComponent,
    // InputCompletionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    DropDownListModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    UploadService,
    ApiService,
    UiService,
    LocalStorage,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
