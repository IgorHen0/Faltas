import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { getMaterias, registerMateria, getMateriasAluno } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

import CustomMultiSelect from '../../components/common/CustomMultiSelect';
import { customSelectStyles } from '../../styles/selectStyles';

import '../Dashboard/Dashboard.css';
import '../Materias/Materias.css';

function Materias() {

    const { user } = useAuth();

    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedDias, setSelectedDias] = useState([]);
    const [materias_id, setMateriasId] = useState('');
    const [status, setStatus] = useState('Cursando');
    const [sala, setSala] = useState('');

    const [selectedHour, setSelectedHour] = useState('00');
    const [selectedMinute, setSelectedMinute] = useState('00');

    const [materiasAluno, setMateriasAluno] = useState([]);

    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = now.getMonth() + 1;
    const semestre = (month >= 1 && month <= 7) ? `${year}/1` : `${year}/2`;

    const hours = Array.from({ length: 16 }, (_, i) => (i + 6).toString().padStart(2, '0'));
    const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

    const diasDaSemanaOptions = [
        { value: 'Segunda', label: 'Segunda-feira' },
        { value: 'Terça', label: 'Terça-feira' },
        { value: 'Quarta', label: 'Quarta-feira' },
        { value: 'Quinta', label: 'Quinta-feira' },
        { value: 'Sexta', label: 'Sexta-feira' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.aluno) {
            toast.error("Erro: Usuário não encontrado. Por favor, faça login novamente.");
            return;
        }

        const diasSemanaString = selectedDias.join(', ');
        const horarioFormatado = `${selectedHour}:${selectedMinute}`;

        const materiaData = {
            aluno_id: user.aluno.aluno_id,
            materias_id: parseInt(materias_id),
            status: status,
            semestre: semestre,
            dias_semana: diasSemanaString,
            horario_aula: horarioFormatado,
            sala: sala
        };

        try {
            await registerMateria(materiaData);
            toast.success('Matéria adicionada com sucesso.');

            setMateriasId('');
            setSala('');
            setSelectedDias([]);
            setSelectedHour('00');
            setSelectedMinute('00');
            fetchMateriasAluno();
        } catch (error) {
            toast.error(`Erro ao adicionar matéria: ${error.message}`);
        }
    }

    const fetchMateriasAluno = async () => {
        if (user && user.aluno) {
            try {
                const data = await getMateriasAluno(user.aluno.aluno_id);
                setMateriasAluno(data);
            } catch (err) {
                console.error("Falha ao buscar matérias do aluno: ", err);
            }
        }
    };

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
        fetchMateriasAluno();
    }, [user]);

    if (!user || !user.aluno) {
        return <div>Carregando informações do usuário...</div>;
    }

    const materiaOptions = materias.map((materia) => ({
        value: materia.materias_id,
        label: materia.nome_materia,
    }));

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
                    <form onSubmit={handleSubmit}>
                        <div className="materias-filters">
                            
                            <div className="form-group">
                                <label htmlFor="materia">Matéria</label>
                                <Select
                                    id="materia"
                                    value={materiaOptions.find(opt => opt.value === materias_id) || null}
                                    onChange={(selected) => setMateriasId(selected ? selected.value : '')}
                                    options={materiaOptions}
                                    isDisabled={loading || error}
                                    placeholder={loading ? "Carregando..." : "Selecione uma matéria"}
                                    isSearchable
                                    styles={customSelectStyles}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="sala">Sala</label>
                                <input type="text" value={sala} onChange={(e) => setSala(e.target.value)} id="sala" placeholder="Digite a sala de aula" />
                            </div>

                            <div className="form-group">
                                <label>Dias da Semana</label>
                                <CustomMultiSelect
                                    options={diasDaSemanaOptions}
                                    selectedValues={selectedDias}
                                    onChange={setSelectedDias}
                                    placeholder="Selecione os dias"
                                    limit={3}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="horario">Horário</label>
                                <div className="time-selector">
                                    <select aria-label="Horas" value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)}>
                                        <option value="00" disabled>00</option>
                                        {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
                                    </select>
                                    <select aria-label="Minutos" value={selectedMinute} onChange={(e) => setSelectedMinute(e.target.value)}>
                                        {minutes.map(minute => <option key={minute} value={minute}>{minute}</option>)}
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="addMateria">Adicionar</button>
                        </div>
                    </form>

                    <div>
                        <h2>Matérias em curso</h2>
                        <p className="card-subtitle">Semestre atual: <strong>{semestre}</strong></p>

                        <ul className="menu-list">
                            {materiasAluno.map((materia, index) => (
                                <li key={index}>
                                    <div className="menu-item-content">
                                        <span className="menu-icon">☆</span>
                                        <div className="menu-text">
                                            <span className="menu-label">{materia.nome_materia}</span>
                                            <span className="menu-description">{`Sala: ${materia.sala} | Dias: ${materia.dias_semana} | Horário: ${materia.horario_aula}`}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default Materias;