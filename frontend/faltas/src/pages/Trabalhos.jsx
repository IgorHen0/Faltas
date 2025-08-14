import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import './Notas.css';

function Notas() {
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
          {/* Coluna da Esquerda */}
          <div className="card-column">
            <h2>Trabalhos</h2>
            <ul className="menu-list">
              <li>
                <div className="menu-item-content">
                  <span className="menu-icon">☆</span>
                  <div className="menu-text">
                    <span className="menu-label">Menu Label</span>
                    <span className="menu-description">Menu description.</span>
                  </div>
                </div>
                <span className="menu-extra">10 A</span>
              </li>
              <li>
                <div className="menu-item-content">
                  <span className="menu-icon">☆</span>
                  <div className="menu-text">
                    <span className="menu-label">Menu Label</span>
                    <span className="menu-description">Menu description.</span>
                  </div>
                </div>
                <span className="menu-extra">10 A</span>
              </li>
              <li>
                <div className="menu-item-content">
                  <span className="menu-icon">☆</span>
                  <div className="menu-text">
                    <span className="menu-label">Menu Label</span>
                    <span className="menu-description">Menu description.</span>
                  </div>
                </div>
                <span className="menu-extra">12 A</span>
              </li>
              <li>
                <div className="menu-item-content">
                  <span className="menu-icon">☆</span>
                  <div className="menu-text">
                    <span className="menu-label">Menu Label</span>
                    <span className="menu-description">Menu description.</span>
                  </div>
                </div>
                <span className="menu-extra">8 A</span>
              </li>
              <li>
                <div className="menu-item-content">
                  <span className="menu-icon">☆</span>
                  <div className="menu-text">
                    <span className="menu-label">Menu Label</span>
                    <span className="menu-description">Menu description.</span>
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
                <label htmlFor="materia">Matéria</label>
                <select id="materia">
                  <option>Value</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="nota">Pontuação</label>
                <input type="text" id="nota" placeholder="Quantos pontos vale?" />
              </div>
              <div className="form-group">
                <label htmlFor="data">Data de entrega</label>
                <input type="date" id="data" placeholder="Value" />
              </div>
              <div className="form-group">
                <label htmlFor="arquivos">Arquivos</label>
                <input type="file" id="arquivos" placeholder="Insira arquivos relacionados ao trabalho, caso haja" />
              </div>
              <button type="submit" className="submit-button">Enviar</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Notas;