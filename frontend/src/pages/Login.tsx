import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
};

export default Login;
