import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import './Materias.css';

function Materias() {

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

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
                <header className="main-header">
                    <h1>Matérias</h1>
                </header>

                <div className="materias-content-area">
                    <div className="materias-filters">
                        <div className="form-group">
                            <label htmlFor="materia">Matéria</label>
                            <select id="materia">
                                <option>Value</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sala">Sala</label>
                            <input type="text" id="sala" placeholder="Value" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dia">Dias da Semana</label>
                            <select id="dia">
                                <option>Value</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="horario">Horário</label>
                            <div className="time-selector">
                                <select aria-label="Horas">
                                    {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
                                </select>
                                <select aria-label="Minutos">
                                    {minutes.map(minute => <option key={minute} value={minute}>{minute}</option>)}
                                </select>
                            </div>
                        </div>
                        <button className="add-time-button">Adicionar</button>
                    </div>

                    <div>
                        <h2>Heading</h2>
                        <p className="card-subtitle">Heading</p>
                        <ul className="menu-list">
                            <li>
                                <div className="menu-item-content">
                                    <span className="menu-icon">☆</span>
                                    <div className="menu-text">
                                        <span className="menu-label">Menu Label</span>
                                        <span className="menu-description">Menu description.</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="menu-item-content">
                                    <span className="menu-icon">☆</span>
                                    <div className="menu-text">
                                        <span className="menu-label">Menu Label</span>
                                        <span className="menu-description">Menu description.</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="menu-item-content">
                                    <span className="menu-icon">☆</span>
                                    <div className="menu-text">
                                        <span className="menu-label">Menu Label</span>
                                        <span className="menu-description">Menu description.</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="menu-item-content">
                                    <span className="menu-icon">☆</span>
                                    <div className="menu-text">
                                        <span className="menu-label">Menu Label</span>
                                        <span className="menu-description">Menu description.</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="menu-item-content">
                                    <span className="menu-icon">☆</span>
                                    <div className="menu-text">
                                        <span className="menu-label">Menu Label</span>
                                        <span className="menu-description">Menu description.</span>
                                    </div>
                                </div>  
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Materias;