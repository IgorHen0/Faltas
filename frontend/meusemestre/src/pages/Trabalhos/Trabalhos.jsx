import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import { getMateriasAluno, addTrabalhos, getTrabalhos } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

import { customSelectStyles } from '../../styles/selectStyles';

import '../Dashboard/Dashboard.css';
import '../Notas/Notas.css';

function Trabalhos() {

	const { user } = useAuth();
	const [materiasAluno, setMateriasAluno] = useState([]);
	const [materias_id, setMateriasId] = useState('');

	const [nomeTrabalho, setNomeTrabalho] = useState('');
	const [pontos, setPontos] = useState('');
	const [dataTrabalho, setDataTrabalho] = useState('');
	const [trabalhos, setTrabalhos] = useState([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const materiaOptions = materiasAluno.map((materia) => ({
		value: materia.materias_id,
		label: materia.nome_materia,
	}));

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!user  || !user.aluno) {
			toast.error("Erro: usuário não encontrado. Por favor, faça login novamente.");
			return;
		}

		const trabalhosData = {
			aluno_id: user.aluno.aluno_id,
			materias_id: parseInt(materias_id),
			nome_trabalho: nomeTrabalho,
			pontos: pontos,
			data_trabalho: dataTrabalho,
		};

		try {
			await addTrabalhos(trabalhosData);
			toast.success("Trabalho adicionado com sucesso.");

			setMateriasId('');
			setPontos('');
			setDataTrabalho('');
		}
		catch (error) {
			toast.error(`Erro ao adicionar trabalho: ${error.message}`);
		}
	};

	const fetchTrabalhos = async () => {
		if (user && user.aluno) {
			try {
				const data = await getTrabalhos(user.aluno.aluno_id);
				console.log('dados recebidoss: ', data);
				setTrabalhos(data);
			}
			catch (err) {
				console.error("Erro ao obter trabalhos: ", err)
				setError(err);
			}
			finally {
				setLoading(false);
			}
		}
		else {
			setLoading(false);
		}
	};

	useEffect(() => {
		const fetchMateriasAluno = async () => {
			if (user && user.aluno) {
				try {
					const data = await getMateriasAluno(user.aluno.aluno_id);
					setMateriasAluno(data);
				}
				catch (error) {
					console.error("Erro ao buscar matérias do aluno: ", error);
					setError(error);
				}
				finally {
					setLoading(false);
				}
			}
			else {
				setLoading(false);
			}
		};
		fetchMateriasAluno();
		fetchTrabalhos();
	}, [user]);

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
					<h1>Trabalhos</h1>
				</header>

				<div className="notas-layout">
					<div className="card-column">
						<h2>Trabalhos</h2>

						<ul className="menu-list">

							{trabalhos.map((trabalhos, index) => {
								let dataFormatada = trabalhos.data_trabalho;
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
												<span className="menu-label">{trabalhos.nome_materia}</span>
												<span className="menu-description">
													{`Nome: ${trabalhos.nome_trabalho} | Data: ${dataFormatada} | Pontos: ${trabalhos.pontos}`}
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
								<label htmlFor="nome_trabalho">Nome</label>
								<input value={nomeTrabalho} onChange={(e) => setNomeTrabalho(e.target.value)} type="text" id="nome_trabalho" placeholder="Nome do trabalho" />
							</div>

							<div className="form-group">
								<label htmlFor="pontos">Pontos</label>
								<input value={pontos} onChange={(e) => setPontos(e.target.value)} type="number" id="pontos" placeholder="Quantos pontos vale?" />
							</div>

							<div className="form-group">
								<label htmlFor="data_trabalho">Data de entrega</label>
								<input value={dataTrabalho} onChange={(e) => setDataTrabalho(e.target.value)} type="date" id="data_trabalho" placeholder="Value" />
							</div>

							<button type="submit" className="submit-button">Enviar</button>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Trabalhos;