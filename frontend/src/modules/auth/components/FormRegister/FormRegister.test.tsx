import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FormRegister } from "./FormRegister";
import { MemoryRouter, Route, Routes } from "react-router-dom";

function renderWithRouter() {
  render(
    <MemoryRouter initialEntries={["/register"]}>
      <Routes>
        <Route path="/register" element={<FormRegister />} />
      </Routes>
    </MemoryRouter>
  );
}

// Helper para acceder a elementos comunes
function initialTestElement() {
  return {
    nameInput: screen.getByLabelText(/nombre completo/i),
    emailInput: screen.getByLabelText(/email/i),
    passwordInput: screen.getByTestId(/contraseña-input/i),
    confirmPasswordInput: screen.getByLabelText(/confirmar contraseña/i),
    submitButton: screen.getByRole("button", { name: /crear cuenta/i }),
  };
}

describe("RegisterForm", () => {
  it("Renderiza correctamente el formulario", () => {
    renderWithRouter();

    const {
      nameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    } = initialTestElement();

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Inicia Sesion/i })
    ).toHaveAttribute("href", "/login");
  });

  it("Muestra errores si los campos están vacios", async () => {
    renderWithRouter();

    const { submitButton } = initialTestElement();

    // Disparamos la acción sin llenar los campos
    fireEvent.click(submitButton);

    expect(await screen.findByText("El nombre es obligatorio"));
    expect(await screen.findByText("El email es obligatorio"));
    expect(await screen.findByText("Mínimo 8 caracteres"));
    expect(await screen.findByText("Confirmar contraseña es obligatorio"));
  });

  it("Muestra un error si el email no es válido", async () => {
    renderWithRouter();
    const { emailInput, submitButton } = initialTestElement();

    // Rellenamos el input email con un correo invalido
    fireEvent.change(emailInput, { target: { value: "correo invalido" } });

    // Disparamos la acción del boton submit
    fireEvent.click(submitButton);

    const invalidMessage = await screen.findByText("Email inválido");
    expect(invalidMessage).toBeInTheDocument();
  });

  it("Muestra un error si el passsword no es válido", async () => {
    renderWithRouter();
    const { passwordInput, submitButton } = initialTestElement();

    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText(
        "Debe contener al menos una mayúscula y un número"
      )
    ).toBeInTheDocument();
  });

  it("Muestra un error si las contraseñas no coinciden", async () => {
    renderWithRouter();
    const { passwordInput, confirmPasswordInput, submitButton } =
      initialTestElement();

    fireEvent.change(passwordInput, { target: { value: "Password12" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Password123" },
    });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("Las contraseñas no coinciden")
    ).toBeInTheDocument();
  });

  it("Permite alternar la visibilidad del campo password", () => {
    renderWithRouter();
    const { passwordInput } = initialTestElement();

    //Icon Visibile
    const iconsOn = screen.getAllByRole("img", { name: /icon visibility/i });
    expect(iconsOn).toHaveLength(2);

    //Valor input type password
    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(iconsOn[0]); // clic en el primero
    expect(passwordInput).toHaveAttribute("type", "text");

    //Icon Visibile
    const iconsOff = screen.getAllByRole("img", {
      name: /icon visibilityOff/i,
    });
    expect(iconsOff).toHaveLength(2);
    fireEvent.click(iconsOff[0]); // clic en el primero
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("Permite alternar la visibilidad del campo confirmar password", () => {
    renderWithRouter();
    const { passwordInput } = initialTestElement();

    //Icon Visibile
    const iconsOn = screen.getAllByRole("img", { name: /icon visibility/i });
    expect(iconsOn).toHaveLength(2);

    //Valor input type password
    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(iconsOn[1]); // clic en el primero
    expect(passwordInput).toHaveAttribute("type", "text");

    //Icon Visibile
    const iconsOff = screen.getAllByRole("img", {
      name: /icon visibilityOff/i,
    });
    expect(iconsOff).toHaveLength(2);
    fireEvent.click(iconsOff[1]); // clic en el primero
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("Envía el formulario cuando los datos son válidos", async () => {
    renderWithRouter();

    const {
      nameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    } = initialTestElement();

    fireEvent.change(nameInput, {
      target: { value: "pedro" },
    });

    fireEvent.change(emailInput, {
      target: { value: "correo@valido.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "Password123" },
    });

    fireEvent.change(confirmPasswordInput, {
      target: { value: "Password123" },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText(/El nombre es obligatorio/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/El email es obligatorio/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Mínimo 8 caracteres/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Confirmar contraseña es obligatoria/i)
      ).not.toBeInTheDocument();
    });
  });
});
