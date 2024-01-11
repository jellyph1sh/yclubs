import "./Register.css";

function Register() {
  return (
    <>
      <div className="register-box">
        <div className="register-left">
          <div className="register-left-header">
            <img className="register-logo" src="/src/assets/images/logo_ynov_campus_nantes_white.svg" alt="nantes ynov campus logo" />
            <p className="register-desc">Bienvenue dans la vie étudiante de Nantes Ynov Campus ! Accedez à l’interface qui vous permet de participer à la vie étudiante.</p>
          </div>
          <button className="register-login-button">Connexion</button>
        </div>
        <div className="register-right">
          <h2 className="register-title">Inscription</h2>
          <div className="register-inputs">
            <div className="register-identity">
              <div className="register-identity-firstname">
                <label htmlFor="register-firstname">Prénom :</label>
                <input type="text" name="register-firstname" id="register-firstname" />
              </div>
              <div className="register-identity-lastname">
                <label htmlFor="register-lastname">Nom :</label>
                <input type="text" name="register-firstname" id="register-firstname" />
              </div>
            </div>
            <label htmlFor="register-email">Adresse mail :</label>
            <input type="email" name="register-email" id="register-email" />
            <label htmlFor="register-password">Mot de passe :</label>
            <input type="password" name="register-password" id="register-password" />
          </div>
          <button className="register-button-register" type="submit">Créer un compte</button>
        </div>
      </div>
    </>
  )
};

export default Register;