import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <h2>Registro</h2>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
};

export default Register;
