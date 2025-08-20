import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { addFaltas, getMateriasAluno } from '../../services/api';

import '../Dashboard/Dashboard.css';
import '../Faltas/Faltas.css';

function Faltas() {

	const { user } = useAuth();
	const [materiasAluno, setMateriasAluno] = useState([]);
	const [materias_id, setMateriasId] = useState('');
	const [data, setData] = useState('');
	const [motivo, setMotivo] = useState('');

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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
	}, [user]);

    const materiaOptions = materiasAluno.map((materia) => ({
        value: materia.materias_id,
        label: materia.nome_materia,
    }));

    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#eb8729ff' : '#ccc',
            boxShadow: state.isFocused ? '0 0 0 2px rgba(74, 144, 226, 0.2)' : 'none',
            borderRadius: '8px',
            padding: '2px 4px',
            minHeight: '38px',
            '&:hover': { borderColor: '#eb8729ff' },
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#888',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#f0f8ff' : 'white',
            color: '#333',
            cursor: 'pointer',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#333',
        }),
    };

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!user || !user.aluno) {
			toast.error("Erro: usuário não encontrado. Por favor, faça login novamente.");
			return;
		}

		const faltasData = {
			aluno_id: user.aluno.aluno_id,
			materias_id: parseInt(materias_id),
			data: data,
			motivo: motivo
		};

		console.log('teste: ', faltasData);

		try{
			await addFaltas(faltasData);
			toast.success('Falta adicionada com sucesso.');

			setMateriasId('');
			setData('');
			setMotivo('');
		}
		catch (error) {
			toast.error(`Erro ao adicionar falta: ${error.message}`);
		}	
	}

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
					<h1>Faltas</h1>
				</header>

				<div className="faltas-layout">
					<div className="card-column">
						<h2>Quantidade de faltas</h2>
						<p className="card-subtitle">Lista de faltas por matéria</p>
						<ul className="menu-list">
							<li>
								<div className="menu-item-content">
									<span className="menu-icon">☆</span>
									<div className="menu-text">
										<span className="menu-label">Estrutura de Dados</span>
									</div>
								</div>
								<span className="menu-extra">10 A</span>
							</li>
							<li>
								<div className="menu-item-content">
									<span className="menu-icon">☆</span>
									<div className="menu-text">
										<span className="menu-label">Matemática Discreta</span>
									</div>
								</div>
								<span className="menu-extra">10 A</span>
							</li>
							<li>
								<div className="menu-item-content">
									<span className="menu-icon">☆</span>
									<div className="menu-text">
										<span className="menu-label">Fund. Teórica da Computação</span>
									</div>
								</div>
								<span className="menu-extra">12 A</span>
							</li>
							<li>
								<div className="menu-item-content">
									<span className="menu-icon">☆</span>
									<div className="menu-text">
										<span className="menu-label">Cálculo I</span>
									</div>
								</div>
								<span className="menu-extra">8 A</span>
							</li>
							<li>
								<div className="menu-item-content">
									<span className="menu-icon">☆</span>
									<div className="menu-text">
										<span className="menu-label">Algoritmos e Lógica de Programação</span>
									</div>
								</div>
								<span className="menu-extra">6 A</span>
							</li>
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
								<label htmlFor="data">Data</label>
								<input value={data} onChange={(e) => setData(e.target.value)} type="date" id="data" />
							</div>

							<div className="form-group">
								<label htmlFor="motivo">Motivo</label>
								<input type="text" id="motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Escreva o motivo da falta" />
							</div>

							<button type="submit" className="submit-button">Adicionar</button>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Faltas;