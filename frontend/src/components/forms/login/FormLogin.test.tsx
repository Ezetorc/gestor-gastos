import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { FormLogin } from "./FormLogin";
import { vi } from "vitest";

//Crea una función mock (simulada) para el método login.
const loginMock = vi.fn();
vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    login: loginMock,
    error: null,
  }),
}));

// Función para renderizar el componente de inicio de sesión dentro de un contexto de enrutamiento
function renderWithRouter() {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes>
        <Route path="/login" element={<FormLogin />} />
        <Route path="/register" element={<div>Registro</div>} />
      </Routes>
    </MemoryRouter>
  );
}

// Helper para acceder a elementos comunes
function initialTestElement() {
  return {
    emailInput: screen.getByLabelText(/email/i),
    passwordInput: screen.getByLabelText(/contraseña/i),
    submitButton: screen.getByRole("button", { name: /iniciar sesión/i }),
  };
}

describe("LoginForm", () => {
  it("Renderiza correctamente el formulario", () => {
    renderWithRouter();
    const { emailInput, passwordInput, submitButton } = initialTestElement();

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /ícono de login/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/regístrate/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Regístrate/i })).toHaveAttribute(
      "href",
      "/register"
    );
  });

  it("Muestra errores si los campos están vacíos", async () => {
    renderWithRouter();
    const { submitButton } = initialTestElement();

    // Disparamos la acción sin llenar los campos
    fireEvent.click(submitButton);

    // Verificar errores (esperando a que aparezcan en el DOM)
    expect(
      await screen.findByText(/el email es obligatorio/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/la contraseña debe tener al menos 8 caracteres/i)
    ).toBeInTheDocument();

    // Verificar atributos ARIA para accesibilidad
    expect(screen.getByLabelText(/email/i)).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(screen.getByLabelText(/contraseña/i)).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("Muestra un error si el email no es válido", async () => {
    renderWithRouter();
    const { emailInput, submitButton } = initialTestElement();

    fireEvent.change(emailInput, { target: { value: "correo invalido" } });
    fireEvent.click(submitButton);

    const invalidMessage = await screen.findByText(/email inválido/i);
    expect(invalidMessage).toBeInTheDocument();
  });

  it("Muestra un error si el passsword no es válido", async () => {
    renderWithRouter();
    const { passwordInput, submitButton } = initialTestElement();

    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText(
        /Debe contener al menos una mayúscula y un número/i
      )
    ).toBeInTheDocument();
  });

  it("Permite alternar la visibilidad del campo password", () => {
    renderWithRouter();
    const { passwordInput } = initialTestElement();

    //Icon Visibile
    const iconOn = screen.getByRole("img", {
      name: /icon visibility/i,
    });
    //IconOff No Visible
    expect(screen.queryByLabelText(/icon visibilityOff /i)).toBeNull();
    // Valor inicial: type password
    expect(passwordInput).toHaveAttribute("type", "password");

    //Acción para ver la contraseña
    fireEvent.click(iconOn);
    //Icon No Visible
    expect(screen.queryByLabelText(/icon visibility /i)).toBeNull();
    //Valor input type text
    expect(passwordInput).toHaveAttribute("type", "text");
    //IconOff Visible
    const iconOff = screen.getByRole("img", {
      name: /icon visibilityOff/i,
    });

    //Acción para ocultar la contraseña
    fireEvent.click(iconOff);
    //Valor input type password
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("Envía el formulario cuando los datos son válidos", async () => {
    renderWithRouter();

    const { emailInput, passwordInput, submitButton } = initialTestElement();

    fireEvent.change(emailInput, {
      target: { value: "correo@valido.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "Password123" },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        id: "a",
        nombre: "pedro",
        email: "correo@valido.com",
      });
    });
  });
});
