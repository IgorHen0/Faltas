import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './Auth.css';

function Signup() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [curso, setCurso] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const aluno = {
            nome_aluno: nome,
            email: email,
            senha: senha,
            curso: curso
        };

        try {
            const response = await fetch('http://localhost:5077/api/aluno', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aluno)
            });

            if(response.ok) {
                toast.success('Cadastro realizado com sucesso!');
                onNavigate('login');
            } else {
                const errorData = await response.json();
                toast.error(`Erro ao cadastrar: ${errorData.message} || Tente novamente.`);
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            toast.error('Erro ao conectar com o servidor. Tente novamente mais tarde.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <p className="auth-header-link">Sign up</p>
                <h2 className="auth-title">Cadastro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Nome</label>
                        <input type="text" id="name" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite seu nome" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="curso">Curso</label>
                        <input type="text" id="curso" value={curso} onChange={(e) => setCurso(e.target.value)} placeholder="Digite seu curso" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <div className="password-group">
                            <input type={showPassword ? "text" : "password"} value={senha} onChange={(e) => setSenha(e.target.value)} id="password" placeholder="******" />
                            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="auth-button">Cadastrar</button>
                </form>
                <p className="auth-footer">
                    Já tem uma conta? <Link to="/Login">Entrar</Link>
                </p>
            </div>
            <div className="auth-image">
                <img src="/ufmg.jpg" alt="UFMG" />
            </div>
        </div>
    );
}

export default Signup;