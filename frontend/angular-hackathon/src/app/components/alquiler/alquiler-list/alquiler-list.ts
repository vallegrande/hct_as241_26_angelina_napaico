import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlquilerForm } from '../alquiler-form/alquiler-form';
import { AlquilerService } from '../../../core/services/alquiler';
import { ClienteService } from '../../../core/services/cliente';
import { Alquiler } from '../../../core/interfaces/alquiler';
import { Cliente } from '../../../core/interfaces/cliente';

@Component({
  selector: 'app-alquiler-list',
  standalone: true,
  imports: [AlquilerForm, CommonModule],
  templateUrl: './alquiler-list.html',
  styleUrl: './alquiler-list.css',
})
export class AlquilerList implements OnInit {
  private alquilerService = inject(AlquilerService);
  private clienteService = inject(ClienteService);

  Alquileres = signal<Alquiler[]>([]);
  isModalOpen = signal(false);
  selectedAlquiler = signal<Alquiler | null>(null);

  // Mapa id → nombre completo
  private clientesMap = new Map<string, string>();

  ngOnInit(): void {
    this.loadClientes();
    this.loadAlquiler();
  }

  loadClientes() {
    this.clienteService.getAll().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientesMap.clear();
        clientes.forEach(c => {
          if (c.id) this.clientesMap.set(c.id, `${c.nombres} ${c.apellidos}`);
        });
      },
      error: (err) => console.error('Error cargando clientes', err)
    });
  }

  // Método para usar en el template
  getNombreCliente(clienteId: string): string {
    return this.clientesMap.get(clienteId) ?? clienteId.slice(-6);
  }

  loadAlquiler() {
    this.alquilerService.getAll().subscribe({
      next: (data) => this.Alquileres.set(data),
      error: (err) => console.error('Error cargando datos', err)
    });
  }

  openModal(alquiler?: Alquiler) {
    this.selectedAlquiler.set(alquiler || null);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedAlquiler.set(null);
  }

  handleSave(alquiler: Alquiler) {
    if (alquiler.id) {
      this.alquilerService.update(alquiler.id, alquiler).subscribe({
        next: () => { this.loadAlquiler(); this.closeModal(); },
        error: (err) => alert(err.error?.message || 'Error al actualizar')
      });
    } else {
      this.alquilerService.create(alquiler).subscribe({
        next: () => { this.loadAlquiler(); this.closeModal(); },
        error: (err) => alert(err.error?.message || 'Error al guardar. Verifica que los días coincidan con las fechas.')
      });
    }
  }

  changeEstado(alquiler: Alquiler, nuevoEstado: string) {
    if (!alquiler.id) return;
    this.alquilerService.updateEstado(alquiler.id, nuevoEstado).subscribe({
      next: () => this.loadAlquiler(),
      error: (err) => console.error('Error al cambiar el estado', err)
    });
  }

  deletePhysical(id: string | undefined) {
    if (!id) return;
    if (confirm('¿Estás seguro de que deseas eliminar este alquiler permanentemente? Esta acción no se puede deshacer.')) {
      this.alquilerService.physicalDelete(id).subscribe({
        next: () => this.loadAlquiler(),
        error: (err) => console.error('Error al eliminar físicamente', err)
      });
    }
  }
}