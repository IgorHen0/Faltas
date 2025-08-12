import React from 'react';
import './Auth.css';

function Login({ onNavigate }) {

    const handleNavigate = (e) => {
        e.preventDefault();
        onNavigate('signup');
    }

  return (
    <div className="auth-container">
       <div className="auth-form">
        <p className="auth-header-link">Login</p>
        <h2 className="auth-title">Bem-vindo de volta!</h2>
        <p className="auth-subtitle">Digite suas credenciais para acessar sua conta</p>
        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Digite seu email" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" placeholder="******" />
            <a href="#" className="forgot-password">esqueceu a senha?</a>
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>
        {/* <div className="social-login">
          <button className="social-button google">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
            Sign in with Google
          </button>
        </div> */}
        <p className="auth-footer">
          Não tem uma conta? <a href="#" onClick={handleNavigate}>Cadastrar</a>
        </p>
      </div>
      <div className="auth-image">
        <img src="/ufmg.jpg" alt="Decorative Plant" />
      </div>
    </div>
  );
}

export default Login;