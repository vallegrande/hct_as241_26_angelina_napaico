import { Component, effect, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../../core/interfaces/cliente';
@Component({
  selector: 'app-cliente-form',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css',
})
export class ClienteForm {
  cliente = input<Cliente | null>(null);
  close = output<void>();
  save = output<Cliente>();

  form: FormGroup;
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      id: [null],
      dni: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: ['', Validators.required],
      correo: ['', Validators.required],
      licencia: ['', Validators.required],
      /*description: [''],*/
      estado: ["Activo"]
    });

    // Reacciona automáticamente cuando el input 'student' cambia
    effect(() => {
      const currentStudent = this.cliente();
      if (currentStudent) {
        this.form.patchValue(currentStudent);
      } else {
        this.form.reset({ estado: "Activo" });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }
}
