import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { addProvas, getMateriasAluno, getProvas } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

import { customSelectStyles } from '../../styles/selectStyles';

import '../Dashboard/Dashboard.css';
import '../Notas/Notas.css';

function Notas() {

	const { user } = useAuth();
	const [materiasAluno, setMateriasAluno] = useState([]);
	const [materias_id, setMateriasId] = useState('');
	const [data_prova, setDataProva] = useState('');
	const [conteudo, setConteudo] = useState('');
	const [selectedHour, setSelectedHour] = useState('00');
	const [selectedMinute, setSelectedMinute] = useState('00');
	const [provas, setProvas] = useState([]);

	const hours = Array.from({ length: 16 }, (_, i) => (i + 6).toString().padStart(2, '0'));
    const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const materiaOptions = materiasAluno.map((materia) => ({
		value: materia.materias_id,
		label: materia.nome_materia,
	}));

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!user || !user.aluno) {
			toast.error("Erro: usuário não encontrado. Por favor, faça login novamente.");
			return;
		}

		const horarioProvaFormatado = `${selectedHour}:${selectedMinute}`

		const provasData = {
			aluno_id: user.aluno.aluno_id,
			materias_id: parseInt(materias_id),
			data_prova: data_prova,
			conteudo: conteudo,
			horario_prova: horarioProvaFormatado,
		};

		console.log('provasData: ', provasData);

		try {
			await addProvas(provasData);
			toast.success("Prova adicionada com sucesso.");

			setMateriasId('');
			setDataProva('');
			setConteudo('');
			setSelectedHour('00');
			setSelectedMinute('00');
		}
		catch (error) {
			toast.error(`Erro ao adicionar nova prova: ${error.message}`);
		}
	};

	const fetchProvas = async () => {
		if (user && user.aluno) {
			try {
				const data = await getProvas(user.aluno.aluno_id);
				setProvas(data);
			} catch (err) {
				console.error("Falha ao obter as provas do aluno: ", err);
				setError(err);
			} finally {
				setLoading(false);
			}
		} else {
			setLoading(false);
		}
	}

	useEffect(() => {
		const fetchMateriasAluno = async () => {
			if (user && user.aluno) {
				try {
					const data = await getMateriasAluno(user.aluno.aluno_id);
					setMateriasAluno(data);
				} catch (err) {
					console.error("Falha ao buscar matérias do aluno: ", err);
					setError(err);
				} finally {
					setLoading(false);
				}
			} else {
				setLoading(false);
			}
		};
		fetchMateriasAluno();
		fetchProvas();
	}, [user]);

	console.log('teste: ', provas);

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
					<h1>Provas</h1>
				</header>

				<div className="notas-layout">
					<div className="card-column">
						<h2>Matérias</h2>

						<ul className="menu-list">

							{provas.map((provas, index) => {
								let dataFormatada = provas.data_prova;
								if (dataFormatada) {
									const dateObj = new Date(dataFormatada);
									const dia = String(dateObj.getDate()).padStart(2, '0');
									const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
									const ano = dateObj.getFullYear();
									dataFormatada = `${dia}/${mes}/${ano}`;
								}
								return (
									<li key={index}>
										<div className="menu-item-content">
											<span className="menu-icon">☆</span>
											<div className="menu-text">
												<span className="menu-label">{provas.nome_materia}</span>
												<span className="menu-description">
													{`Data: ${dataFormatada} | Conteúdo: ${provas.conteudo} | Horário: ${provas.horario_prova}`}
												</span>
											</div>
										</div>
									</li>
								);
							})}

						</ul>
					</div>

					<div className="card-column">
						<form onSubmit={handleSubmit}>

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
								<label htmlFor="data_prova">Data</label>
								<input value={data_prova} onChange={(e) => setDataProva(e.target.value)} type="date" id="data_prova" />
							</div>

							<div className="form-group">
								<label htmlFor="conteudo">Conteudo</label>
								<input value={conteudo} onChange={(e) => setConteudo(e.target.value)} type="text" id="conteudo" placeholder="Qual o conteudo da prova?" />
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

							<button type="submit" className="submit-button">Adicionar</button>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Notas;