import Icon from "@/components/Icon";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <Icon name="login" size={20} />
      <h2>Login</h2>
      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
};

export default Login;
