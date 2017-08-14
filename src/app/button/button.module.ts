import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ButtonComponent],
  bootstrap: [ButtonComponent],
  exports: [ButtonComponent]
})
export class ButtonModule { }