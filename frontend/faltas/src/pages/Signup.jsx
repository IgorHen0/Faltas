import React, { useState } from 'react';
import './Auth.css';

function Signup({ onNavigate }) {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleNavigate = (e) => {
        e.preventDefault();
        onNavigate('login');
    }

    return (
        <div className="auth-container">
            <div className="auth-form">
                <p className="auth-header-link">Sign up</p>
                <h2 className="auth-title">Cadastro</h2>
                <form>
                    <div className="input-group">
                        <label htmlFor="name">Nome</label>
                        <input type="text" id="name" placeholder="Digite seu nome" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Digite seu email" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <div className="password-group">
                            <input type={showPassword ? "text" : "password"} id="password" placeholder="******" />
                            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="auth-button">Cadastrar</button>
                </form>
                {/* <div className="social-login">
                <button className="social-button google">
                    <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
                    Sign in with Google
                </button>
            </div> */}
                <p className="auth-footer">
                    Já tem uma conta? <a href="#" onClick={handleNavigate}>Entrar</a>
                </p>
            </div>
            <div className="auth-image">
                <img src="../public/ufmg.jpg" alt="UFMG" />
            </div>
        </div>
    );
}

export default Signup;