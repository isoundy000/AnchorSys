import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownListComponent } from './dropDownList.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DropDownListComponent],
  bootstrap:[DropDownListComponent],
  exports:[DropDownListComponent]
})
export class DropDownListModule { }