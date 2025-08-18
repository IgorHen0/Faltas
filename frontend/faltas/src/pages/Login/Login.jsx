import { useState } from 'react';
import { toast } from 'react-toastify';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { loginUser } from '../../services/api';
import './Auth.css';

function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !senha) {
            toast.warn('Por favor, preencha todos os campos.');
            return;
        }

        const credentials = {
            email: email,
            senha: senha
        };

        try {
            await loginUser(credentials);
            toast.success('Login realizado com sucesso!');
            window.location.href = '/dashboard';
        } catch (error) {
            toast.error(`Erro ao fazer login: ${error.message}`);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-form">
                <p className="auth-header-link">Login</p>
                <h2 className="auth-title">Bem-vindo de volta!</h2>
                <p className="auth-subtitle">Digite suas credenciais para acessar sua conta</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <div className="password-group">
                            <input type={showPassword ? "text" : "password"} id="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="******" />
                            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                        <a href="#" className="forgot-password">esqueceu a senha?</a>
                    </div>
                    <button type="submit" className="auth-button">Login</button>
                </form>
                <p className="auth-footer">
                    Não tem uma conta? <Link to="/signup">Cadastrar</Link>
                </p>
            </div>
            <div className="auth-image">
                <img src="/ufmg.jpg" alt="Decorative Plant" />
            </div>
        </div>
    );
}

export default Login;