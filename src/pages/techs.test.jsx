import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, vi, test } from "vitest";
import TechsTable from '../pages/techs';

vi.mock('../data/db.json', () => ({
  default: { // Defino default para la prueba
    techs: [
      {
        id: 1,
        nombre: 'DANIEL',
        apellido: 'LORENZO',
        celular: '123456789',
        correo: 'DL@example.com',
        dni: '12345678',
        fecha_nacimiento: '1990-01-01'
      },
      {
        id: 2,
        nombre: 'ANTONIO',
        apellido: 'EL BANDERAS',
        celular: '987654321',
        correo: 'AEB@example.com',
        dni: '87654321',
        fecha_nacimiento: '1992-05-12'
      }
    ]
  }
}));

describe('TechsTable', () => {
  test('debe renderizar la tabla con los técnicos', () => {
    render(<TechsTable />);
    expect(screen.getByText('Técnicos')).toBeInTheDocument();
    expect(screen.getByText('DANIEL')).toBeInTheDocument();
    expect(screen.getByText('ANTONIO')).toBeInTheDocument();
  });

  test('debe filtrar los técnicos por nombre', () => {
    render(<TechsTable />);
    const searchInput = screen.getByPlaceholderText('Buscar');
    fireEvent.change(searchInput, { target: { value: 'DANIEL' } });
    expect(screen.getByText('DANIEL')).toBeInTheDocument();
    expect(screen.queryByText('ANTONIO')).not.toBeInTheDocument();
  });

  test('debe abrir el modal para agregar un técnico', () => {
    render(<TechsTable />);
    const addButton = screen.getByText('Agregar tecnico');
    fireEvent.click(addButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
