import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RequestsTable from "../pages/requests";

vi.mock("../data/db.json", () => ({
  default: {
    solicitud: [
      {
        id: 1,
        titulo: "Reparación de laptop",
        cliente: "DANIEL LORENZO",
        producto: "Laptop GEY-MER",
        estado: "En proceso",
        tecnico: "CARLOS MENDOZA"
      }
    ]
  }
}));

describe("RequestsTable", () => {
  beforeEach(() => {
    render(<RequestsTable />);
  });

  it("debe renderizar la tabla con las solicitudes", () => {
    expect(screen.getByText("Lista de Solicitudes")).toBeInTheDocument();
    expect(screen.getByText("Reparación de laptop")).toBeInTheDocument();
    expect(screen.getByText("DANIEL LORENZO")).toBeInTheDocument();
  });

  it("debe filtrar las solicitudes por título", () => {
    const searchInput = screen.getByPlaceholderText("Buscar");
    fireEvent.change(searchInput, { target: { value: "Reparación" } });
    expect(screen.getByText("Reparación de laptop")).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "Otro" } });
    expect(screen.queryByText("Reparación de laptop")).toBeNull();
  });

  it("debe abrir el modal para agregar una solicitud", () => {
    const addButton = screen.getByText("Agregar Solicitud");
    fireEvent.click(addButton);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
