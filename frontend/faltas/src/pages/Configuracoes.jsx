import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import './Configuracoes.css';

function Configuracoes() {
    const [activeTab, setActiveTab] = useState('personal');

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="user-icon">
                    <span><Link to="/dashboard">&#x1F464;</Link></span>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li><Link to="/faltas">Faltas</Link></li>
                        <li><Link to="/materias">Matérias</Link></li>
                        <li><Link to="/notas">Notas</Link></li>
                        <li><Link to="/provas">Provas</Link></li>
                        <li><Link to="/trabalhos">Trabalhos</Link></li>
                        <li><Link to="/configuracoes">Configurações</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className="main-content">
                <div className="settings-header">
                    <div className="user-info">
                        <h2>Nome do Aluno</h2>
                        <p>email@aluno.com</p>
                    </div>
                    <button className="save-button">Salvar Alterações</button>
                </div>

                <div className="settings-nav">
                    <button
                        className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
                        onClick={() => setActiveTab('personal')}
                    >
                        Personal
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        Security
                    </button>
                </div>

                <div className="settings-content">
                    {activeTab === 'personal' && (
                        <div className="settings-card">
                            <h3>Informações Pessoais</h3>
                            <p>Atualize seus dados e informações de contato.</p>
                            <form className="personal-info-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="nome">Nome</label>
                                        <input type="text" id="nome" defaultValue="Nome do Aluno" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" defaultValue="email@aluno.com" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="curso">Curso</label>
                                    <input type="text" id="curso" defaultValue="Ciência da Computação" />
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="settings-card">
                            <h3>Senha e Segurança</h3>
                            <p>Gerencie sua senha.</p>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="current-password">Senha Atual</label>
                                    <input type="password" id="current-password" placeholder="Digite sua senha atual" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="new-password">Nova Senha</label>
                                    <input type="password" id="new-password" placeholder="Digite a nova senha" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirm-password">Confirmar Nova Senha</label>
                                    <input type="password" id="confirm-password" placeholder="Confirme a nova senha" />
                                </div>
                                <button type="submit" className="update-password-button">Atualizar Senha</button>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Configuracoes;