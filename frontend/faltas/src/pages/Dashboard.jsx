import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './Dashboard.css';
import Faltas from './Faltas';

function Dashboard() {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = now.getMonth() + 1;
    let semestre;
    if (month >= 1 && month <= 7) {
        semestre = `${year}/1`;
    } else {
        semestre = `${year}/2`;
    }

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="user-icon">
                    <span><Link to="/dashboard">&#x1F464;</Link></span>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li><Link to="/Faltas">Faltas</Link></li>
                        <li><Link to="/Materias">Matérias</Link></li>
                        <li><Link to="/Notas">Notas</Link></li>
                        <li><Link to="/Provas">Provas</Link></li>
                        <li><Link to="/Trabalhos">Trabalhos</Link></li>
                        <li><Link to="/Configuracoes">Configurações</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className="main-content">
                <header className="main-header">
                    <h1>Dashboard Overview</h1>
                </header>
                <div className="widgets-grid">
                    <div className="widget-row four-cols">
                        <div className="widget">
                            <div className="widget-icon-container">
                                <span className="widget-icon">👥</span>
                            </div>
                            <div className="widget-content">
                                <p className="widget-title">Semestre Letivo</p>
                                <p className="widget-value">{semestre}</p>
                            </div>
                        </div>
                        <div className="widget">
                            <div className="widget-icon-container">
                                <span className="widget-icon">📚</span>
                            </div>
                            <div className="widget-content">
                                <p className="widget-title">Faltas Essa Semana</p>
                                <p className="widget-value">0</p>
                            </div>
                        </div>
                        <div className="widget">
                            <div className="widget-icon-container">
                                <span className="widget-icon">📝</span>
                            </div>
                            <div className="widget-content">
                                <p className="widget-title">Próxima Prova/Lista</p>
                                <p className="widget-value">15/08 - MD</p>
                            </div>
                        </div>
                        <div className="widget">
                            <div className="widget-icon-container">
                                <span className="widget-icon">📅</span>
                            </div>
                            <div className="widget-content">
                                <p className="widget-title">Próximo Trabalho</p>
                                <p className="widget-value">05/09 - ED</p>
                            </div>
                        </div>
                    </div>

                    <div className="widget-row two-cols">

                        <div className="widget-large">
                            <div className="upcoming-events-header">
                                <span className="header-icon">🗓️</span>
                                <h3>Faltas Totais</h3>
                            </div>
                            <ul className="events-list">
                                <li className="event-item">
                                    <div className="event-details">
                                        <p className="event-title">MD</p>
                                    </div>
                                    <div className="event-date">
                                        <span className="day">0</span>
                                    </div>
                                </li>
                                <li className="event-item">
                                    <div className="event-details">
                                        <p className="event-title">FTC</p>
                                    </div>
                                    <div className="event-date">
                                        <span className="day">0</span>
                                    </div>
                                </li>
                                <li className="event-item">
                                    <div className="event-details">
                                        <p className="event-title">ED</p>
                                    </div>
                                    <div className="event-date">
                                        <span className="day">0</span>
                                    </div>
                                </li>
                                <li className="event-item">
                                    <div className="event-details">
                                        <p className="event-title">ALC</p>
                                    </div>
                                    <div className="event-date">
                                        <span className="day">0</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="widget-large">
                            <div className="upcoming-events-header">
                                <span className="header-icon">🗓️</span>
                                <h3>Próximos Eventos</h3>
                            </div>
                            <ul className="events-list">
                                <li className="event-item">
                                    <div className="event-details">
                                        <p className="event-title">Prova MD</p>
                                        <p className="event-time">10:00 AM</p>
                                    </div>
                                    <div className="event-date">
                                        <span className="month">Jan</span>
                                        <span className="day">28</span>
                                    </div>
                                </li>
                                <li className="event-item">
                                    <div className="event-details">
                                        <p className="event-title">Lista FTC</p>
                                        <p className="event-time">7:00 PM</p>
                                    </div>
                                    <div className="event-date">
                                        <span className="month">Jan</span>
                                        <span className="day">30</span>
                                    </div>
                                </li>
                                <li className="event-item">
                                    <div className="event-details">
                                        <p className="event-title">Trabalho MD</p>
                                        <p className="event-time">6:00 PM</p>
                                    </div>
                                    <div className="event-date">
                                        <span className="month">Feb</span>
                                        <span className="day">1</span>
                                    </div>
                                </li>
                                <li className="event-item">
                                    <div className="event-details">
                                        <p className="event-title">Prova ALC</p>
                                        <p className="event-time">7:30 PM</p>
                                    </div>
                                    <div className="event-date">
                                        <span className="month">Feb</span>
                                        <span className="day">3</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;