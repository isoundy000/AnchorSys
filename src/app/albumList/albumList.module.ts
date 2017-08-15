import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumListComponent } from './albumList.component';
import { AlbumListRoutes } from "app/albumList/albumList.routing";
import { DropDownListModule } from "app/dropDownList/dropDownList.module";
import { InputModule } from "app/input/input.module";
import { ButtonModule } from "app/button/button.module";

@NgModule({
    declarations: [AlbumListComponent],
    imports: [
        CommonModule,
        AlbumListRoutes,
        DropDownListModule,
        InputModule,
        ButtonModule
    ]
})
export class AlbumListModule { }