import { Component, inject, OnInit, signal } from '@angular/core';
import { ClienteForm } from '../cliente-form/cliente-form';
import { Cliente } from '../../../core/interfaces/cliente';
import { ClienteService } from '../../../core/services/cliente';
import {CommonModule}  from '@angular/common';
@Component({
  selector: 'app-cliente-list',
  imports: [ClienteForm, CommonModule],
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.css',
})
export class ClienteList implements OnInit{
  private studentService = inject(ClienteService);
  
  Clientes = signal<Cliente[]>([]);
  isModalOpen = signal(false);
  selectedStudent = signal<Cliente | null>(null);

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAll().subscribe({
      next: (data) => this.Clientes.set(data), // Actualizamos la signal con .set()
      error: (err) => console.error('Error cargando datos', err)
    });
  }

  openModal(item?: Cliente) {
    this.selectedStudent.set(item || null);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedStudent.set(null);
  }

  handleSave(item: Cliente) {
    if (item.id) {
      this.studentService.update(item.id, item).subscribe(() => {
        this.loadStudents();
        this.closeModal();
      });
    } else {
      this.studentService.create(item).subscribe(() => {
        this.loadStudents();
        this.closeModal();
      });
    }
  }

  toggleStatus(student: Cliente) {
    if (!student.id) return;
    
    const request = student.estado === 'Activo'
      ? this.studentService.logicalDelete(student.id)
      : this.studentService.restore(student.id);

    request.subscribe(() => this.loadStudents());
  }

  // --- BORRADO FÍSICO (Descomentar para usar) ---
  
  deleteStudentFisico(id: string | undefined) {
    if (!id) return;
    
    // Alerta nativa de confirmación antes del DELETE real a la BD
    if (confirm('¿Estás seguro de que deseas eliminar este registro permanentemente?')) {
      this.studentService.physicalDelete(id).subscribe({
        next: () => this.loadStudents(),
        error: (err) => console.error('Error al eliminar físicamente', err)
      });
    }
  }

}
