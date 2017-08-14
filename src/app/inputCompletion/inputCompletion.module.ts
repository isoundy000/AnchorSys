import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCompletionComponent } from './inputCompletion.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [InputCompletionComponent],
  bootstrap: [InputCompletionComponent],
  exports: [InputCompletionComponent]
})
export class InputCompletionModule { }