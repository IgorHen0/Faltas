import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMaterias } from '../../services/api';

// 1. Importe o novo componente
import CustomMultiSelect from '../../components/common/CustomMultiSelect';

import '../Dashboard/Dashboard.css';
import '../Materias/Materias.css';

function Materias() {

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDias, setSelectedDias] = useState([]); // Este estado continua o mesmo

    // 2. Defina as opções para os dias da semana
    const diasDaSemanaOptions = [
        { value: 'Segunda', label: 'Segunda-feira' },
        { value: 'Terça', label: 'Terça-feira' },
        { value: 'Quarta', label: 'Quarta-feira' },
        { value: 'Quinta', label: 'Quinta-feira' },
        { value: 'Sexta', label: 'Sexta-feira' }
    ];

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const data = await getMaterias();
                setMaterias(data);
            } catch(err) {
                setError(err.message);
                console.error("Falha ao buscar matérias: ", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMaterias();
    }, []);

    // A função 'handleDiaChange' não é mais necessária aqui.

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                {/* ...código da sidebar sem alterações... */}
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

                        {/* ...outros form-groups... */}
                        <div className="form-group">
                            <label htmlFor="materia">Matéria</label>
                            <select id="materia" disabled={loading}>
                                <option value="" disabled selected>
                                    {loading ? 'Carregando...' : 'Selecione uma matéria'}
                                </option>
                                {error ? (
                                    <option disabled>Erro ao carregar matérias</option>
                                ) : (
                                    materias.map((materia, index) => (
                                        <option key={index} value={materia.nome_materia}>
                                            {materia.nome_materia}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="sala">Sala</label>
                            <input type="text" id="sala" placeholder="Digite a sala de aula" />
                        </div>

                        {/* 3. Substitua o <select> antigo pelo novo componente */}
                        <div className="form-group">
                            <label>Dias da Semana</label>
                            <CustomMultiSelect
                                options={diasDaSemanaOptions}
                                selectedValues={selectedDias}
                                onChange={setSelectedDias}
                                placeholder="Selecione até 3 dias"
                                limit={3}
                            />
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
                        {/* ...resto do seu JSX sem alterações... */}
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