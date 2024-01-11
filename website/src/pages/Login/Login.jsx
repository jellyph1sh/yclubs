import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/api/users/login", {email: e.target.email.value, password: e.target.password.value})
      .then((res) => {
        console.log(res.data.isLogin)
        if (res.data.isLogin) {
          navigate("/");
          return;
        }
        navigate("/login")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="login-box">
        <div className="login-left">
          <div className="login-left-header">
            <img className="login-logo" src="/src/assets/images/logo_ynov_campus_nantes_white.svg" alt="nantes ynov campus logo" />
            <p className="login-desc">Bienvenue dans la vie étudiante de Nantes Ynov Campus ! Accedez à l’interface qui vous permet de participer à la vie étudiante.</p>
          </div>
          <button className="login-register-button" onClick={() => {navigate("/register")}}>Créer un compte</button>
        </div>
        <div className="login-right">
          <h2 className="login-title">Connexion</h2>
          <form onSubmit={loginUser}>
            <div className="login-inputs">
              <label htmlFor="email">Adresse mail :</label>
              <input type="email" name="email" id="login-email" />
              <label htmlFor="password">Mot de passe :</label>
              <input type="password" name="password" id="login-password" />
            </div>
            <button className="login-button-login" type="submit">Connexion</button>
          </form>
          <a className="login-forgot-password" href="/forgot-password">Mot de passe oublié ?</a>
        </div>
      </div>
    </>
  )
};

export default Login;