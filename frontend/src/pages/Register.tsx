import Icon from "@/components/Icon";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <Icon name="register" size={20} />
      <h2>Registro</h2>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
};

export default Register;
