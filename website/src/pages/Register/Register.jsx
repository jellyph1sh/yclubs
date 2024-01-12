import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const RegisterAccount = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/api/users/add", {email: e.target.email.value, firstname: e.target.firstname.value, lastname: e.target.lastname.value, password: e.target.password.value})
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="register-box">
        <div className="register-left">
          <div className="register-left-header">
            <img className="register-logo" src="/src/assets/images/logo_ynov_campus_nantes_white.svg" alt="nantes ynov campus logo" />
            <p className="register-desc">Bienvenue dans la vie étudiante de Nantes Ynov Campus ! Accedez à l’interface qui vous permet de participer à la vie étudiante.</p>
          </div>
          <button className="register-login-button" onClick={() => {navigate("/login")}}>Connexion</button>
        </div>
        <div className="register-right">
          <h2 className="register-title">Inscription</h2>
          <form onSubmit={RegisterAccount}>
            <div className="register-inputs">
              <div className="register-identity">
                <div className="register-identity-firstname">
                  <label htmlFor="register-firstname">Prénom :</label>
                  <input type="text" name="firstname" id="register-firstname" />
                </div>
                <div className="register-identity-lastname">
                  <label htmlFor="register-lastname">Nom :</label>
                  <input type="text" name="lastname" id="register-lastname" />
                </div>
              </div>
              <label htmlFor="register-email">Adresse mail :</label>
              <input type="email" name="email" id="register-email" />
              <label htmlFor="register-password">Mot de passe :</label>
              <input type="password" name="password" id="register-password" />
            </div>
            <button className="register-button-register" type="submit">Créer un compte</button>
          </form>
        </div>
      </div>
    </>
  )
};

export default Register;