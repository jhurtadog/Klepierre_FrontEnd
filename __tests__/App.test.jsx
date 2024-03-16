import React from "react";
import { expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

test("<App /> Cargar el Inicio de Sesion y revisar que todo se carga correcto", () => {
  render(<App />);
  expect(screen.getByText("Inicia sesión")).toBeInTheDocument();
  const titulo = screen.getByTestId("titulo");
  expect(titulo.tagName).toBe("H1");
  expect(titulo.tagName).not.toBe("H2");
  expect(titulo.textContent).toBe("Inicia sesión");
});

test("<App /> Validacion del Formulario", () => {
  render(<App />);
  const btnSubmit = screen.getByTestId("btn-submit");
  fireEvent.click(btnSubmit);
  const alerta = screen.getByTestId("alerta");
  expect(alerta).toBeInTheDocument;
  expect(alerta.textContent).toBe("Todos los campos son obligatorios");
});

test("<App /> Validacion del Formulario Inicio Sesion y Home", async () => {
  render(<App />);
  userEvent.type(screen.getByTestId("email"), "jose@correo.com");
  userEvent.type(screen.getByTestId("password"), "123456");
  const btnSubmit = screen.getByTestId("btn-submit");
  await userEvent.click(btnSubmit);
  const alerta = await screen.queryByTestId("alerta");
  const tituloHeader = await screen.queryByTestId("El Tiempo");
  expect(alerta).not.toBeInTheDocument;
  expect(tituloHeader).toBeInTheDocument;
});
