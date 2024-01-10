import "./Login.css";

function Login() {
  return (
    <>
      <div className="login-box">
        <div className="login-left">
          <div className="login-left-header">
            <img className="login-logo" src="/src/assets/images/logo_ynov_campus_nantes_white.svg" alt="nantes ynov campus logo" />
            <p className="login-desc">Bienvenue dans la vie étudiante de Nantes Ynov Campus ! Accedez à l’interface qui vous permet de participer à la vie étudiante.</p>
          </div>
          <button className="login-register-button">Créer un compte</button>
        </div>
        <div className="login-right">
          <h2 className="login-title">Connexion</h2>
          <div className="login-inputs">
            <label htmlFor="login-email">Adresse mail :</label>
            <input type="email" name="login-email" id="login-email" />
            <label htmlFor="login-password">Mot de passe :</label>
            <input type="password" name="login-password" id="login-password" />
          </div>
          <button className="login-button-login" type="submit">Connexion</button>
          <a className="login-forgot-password" href="/forgot-password">Mot de passe oublié ?</a>
        </div>
      </div>
    </>
  )
};

export default Login;