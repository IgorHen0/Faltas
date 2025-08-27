import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFaltas, getProvas, getTrabalhos, getFaltasSemana } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

import './Dashboard.css';

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

    const ignoredWords = ['E', 'DA', 'DO', 'DAS', 'DOS'];
    const getInitials = (name) => {
        if (!name) return '';
        return name.split(' ').filter(word => !ignoredWords.includes(word)).map(word => word[0]).join('').toUpperCase();
    };

    const { user } = useAuth();
    const [qtdFaltas, setQtdFaltas] = useState([]);
    const [proxProva, setProxProva] = useState([]);
    const [proxTrabalho, setProxTrabalho] = useState([]);
    const [faltasSemana, setFaltasSemana] = useState([]);

    const fetchProva = async () => {
        if (user && user.aluno) {
            try {
                const data = await getProvas(user.aluno.aluno_id);
                setProxProva(data);
            } catch (err) {
                console.error("Falha ao obter provas: ", err);
            }
        }
    }

    const fetchTrabalho = async () => {
        if (user && user.aluno) {
            try {
                const data = await getTrabalhos(user.aluno.aluno_id);
                setProxTrabalho(data);
            } catch (err) {
                console.log("Falha ao obter trabalhos: ", err);
            }
        }
    }

    const fetchFaltasSemana = async () => {
        if (user && user.aluno) {
            try {
                const data = await getFaltasSemana(user.aluno.aluno_id);
                setFaltasSemana(data);
            } catch (err) {
                console.log("Falha ao obter faltas da semana: ", err);
            }
        }
    }

    console.log(faltasSemana[0]);

    useEffect(() => {
        const fetchQtdFaltas = async () => {
            if (user && user.aluno) {
                try {
                    const data = await getFaltas(user.aluno.aluno_id);
                    setQtdFaltas(data);
                } catch (err) {
                    console.error("Falha ao buscar quantidade de faltas: ", err);
                }
            }
        };
        fetchQtdFaltas();
        fetchProva();
        fetchTrabalho();
        fetchFaltasSemana();
    }, [user]);

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
                                <p className="widget-value">
                                    {faltasSemana?.[0]?.total ?? 0}
                                </p>
                            </div>
                        </div>

                        <div className="widget">
                            <div className="widget-icon-container">
                                <span className="widget-icon">📝</span>
                            </div>
                            <div className="widget-content">
                                <p className="widget-title">Próxima Prova</p>
                                <p className="widget-value">
                                    {proxProva.length > 0 ?
                                        `${getInitials(proxProva[0].nome_materia)} - ${new Date(proxProva[0].data_prova).toLocaleDateString('pt-BR')}`
                                        : 'Não há próximas provas'
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="widget">
                            <div className="widget-icon-container">
                                <span className="widget-icon">📅</span>
                            </div>
                            <div className="widget-content">
                                <p className="widget-title">Próximo Trabalho</p>
                                <p className="widget-value">
                                    {proxTrabalho.length > 0 ?
                                        `${getInitials(proxTrabalho[0].nome_materia)} - ${new Date(proxTrabalho[0].data_trabalho).toLocaleDateString('pt-BR')}`
                                        : 'Não há próximos trabalhos'
                                    }
                                </p>
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
                                {qtdFaltas.map((faltas, index) => (
                                    <li key={index} className="event-item"> 
                                        <div className="event-details">
                                            <p className="event-title">{faltas.nome_materia}</p>
                                        </div>
                                        <span className="day">{faltas.total_faltas}</span>
                                    </li>
                                ))}
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