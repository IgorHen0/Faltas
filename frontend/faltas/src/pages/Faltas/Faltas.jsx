import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import '../Dashboard/Dashboard.css';
import '../Faltas/Faltas.css';

function Faltas() {

	return (
		<div className="dashboard-container">
			<aside className="sidebar">
				<div className="user-icon">
					<span><Link to="/dashboard">&#x1F464;</Link></span>
				</div>
				<nav className="sidebar-nav">
					<ul>
						{/* Atualize os links para usar o onNavigate */}
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
					{/* Coluna da Esquerda */}
					<div className="card-column">
						<h2>Absence Records</h2>
						<p className="card-subtitle">List of student absences</p>
						<ul className="menu-list">
							<li>
								<div className="menu-item-content">
									<span className="menu-icon">☆</span>
									<div className="menu-text">
										<span className="menu-label">Estrutura de Dados</span>
										<span className="menu-description">4 absences</span>
									</div>
								</div>
								<span className="menu-extra">10 A</span>
							</li>
							<li>
								<div className="menu-item-content">
									<span className="menu-icon">☆</span>
									<div className="menu-text">
										<span className="menu-label">Matemática Discreta</span>
										<span className="menu-description">2 absences</span>
									</div>
								</div>
								<span className="menu-extra">10 A</span>
							</li>
							<li>
								<div className="menu-item-content">
									<span className="menu-icon">☆</span>
									<div className="menu-text">
										<span className="menu-label">Fund. Teórica da Computação</span>
										<span className="menu-description">6 absences</span>
									</div>
								</div>
								<span className="menu-extra">12 A</span>
							</li>
							<li>
								<div className="menu-item-content">
									<span className="menu-icon">☆</span>
									<div className="menu-text">
										<span className="menu-label">Cálculo I</span>
										<span className="menu-description">1 absence</span>
									</div>
								</div>
								<span className="menu-extra">8 A</span>
							</li>
							<li>
								<div className="menu-item-content">
									<span className="menu-icon">☆</span>
									<div className="menu-text">
										<span className="menu-label">Algoritmos e Lógica de Programação</span>
										<span className="menu-description">0 absences</span>
									</div>
								</div>
								<span className="menu-extra">6 A</span>
							</li>
						</ul>
					</div>

					{/* Coluna da Direita */}
					<div className="card-column">
						<form>
							<div className="form-group">
								<label htmlFor="name">Name</label>
								<input type="text" id="name" placeholder="Value" />
							</div>
							<div className="form-group">
								<label htmlFor="surname">Surname</label>
								<input type="text" id="surname" placeholder="Value" />
							</div>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input type="email" id="email" placeholder="Value" />
							</div>
							<div className="form-group">
								<label htmlFor="message">Message</label>
								<textarea id="message" rows="4" placeholder="Value"></textarea>
							</div>
							<button type="submit" className="submit-button">Submit</button>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Faltas;