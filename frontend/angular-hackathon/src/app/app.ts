import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteList } from './components/cliente/cliente-list/cliente-list';
import { AlquilerList } from './components/alquiler/alquiler-list/alquiler-list';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ClienteList, AlquilerList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  activeTab = signal<'clientes' | 'alquileres'>('clientes');

  setTab(tab: 'clientes' | 'alquileres') {
    this.activeTab.set(tab);
  }
}
