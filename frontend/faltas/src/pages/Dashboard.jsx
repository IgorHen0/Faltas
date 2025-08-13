import React from 'react';
import './Auth.css'; // Você pode criar um CSS específico para o Dashboard se preferir

function Dashboard() {
    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2 className="auth-title">Bem-vindo ao seu Dashboard!</h2>
                <p className="auth-subtitle">Aqui você poderá gerenciar suas informações.</p>
                {/* Adicione aqui o conteúdo do seu dashboard */}
            </div>
             <div className="auth-image">
                <img src="/ufmg.jpg" alt="Decorative Plant" />
            </div>
        </div>
    );
}

export default Dashboard;