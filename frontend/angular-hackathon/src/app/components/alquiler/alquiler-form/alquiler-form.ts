import { Component, inject, OnInit, signal, input, output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../../core/services/cliente';
import { Cliente } from '../../../core/interfaces/cliente';
import { Alquiler } from '../../../core/interfaces/alquiler';

@Component({
  selector: 'app-alquiler-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alquiler-form.html'
})
export class AlquilerForm implements OnInit {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService); // Inyectamos el servicio

  alquiler = input<Alquiler | null>(null);
  close = output<void>();
  save = output<Alquiler>();

  form: FormGroup;
  clientes = signal<Cliente[]>([]); // Signal para guardar los clientes
  // Agrega esto dentro de tu clase AlquilerForm

  modoManual = signal(false); // Por defecto mostramos la lista


  constructor() {
    this.form = this.fb.group({
      id: [null],
      clienteId: [null, Validators.required],
      dias: [null, Validators.required],
      fechaInicio: [null, Validators.required],
      fechaFin: [null, Validators.required],
      total: [null, Validators.required],
      estado: [""]
    });
  }

  ngOnInit() {
    this.loadClientes();

    setTimeout(() => {
      // 1. Extraemos el valor del Signal llamándolo con ()
      const alquilerActual = this.alquiler(); 

      // 2. Evaluamos el valor extraído
      if (alquilerActual) {
        this.form.patchValue({
          id: alquilerActual.id,
          clienteId: alquilerActual.clienteId,
          dias: alquilerActual.dias,
          fechaInicio: alquilerActual.fechaInicio,
          fechaFin: alquilerActual.fechaFin,
          total: alquilerActual.total,
          estado: alquilerActual.estado
        });
      }
    });
  }

  // Método para obtener la lista del backend
  loadClientes() {
    this.clienteService.getAll().subscribe({
      next: (data) => this.clientes.set(data),
      error: (err) => console.error('Error al cargar clientes', err)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValues = this.form.value;
      const payload = {
        ...formValues,
        total: parseFloat(formValues.total) || 0
      };
      this.save.emit(payload);
    } else {
      this.form.markAllAsTouched();
    }
  }

  toggleModoManual() {
    this.modoManual.update(valor => !valor);
    // Limpiamos el campo al cambiar de modo para evitar enviar datos basura
    this.form.get('clienteId')?.setValue(null); 
  }
}