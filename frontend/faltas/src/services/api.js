const API_URL = 'http://localhost:5077/api';

export const loginUser = async (credentials) => {
	const response = await fetch(`${API_URL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || 'Erro ao fazer login');
	}

	return response.json();
};

export const signupUser = async (userData) => {
	const response = await fetch(`${API_URL}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || 'Erro ao cadastrar');
	}

	return response.json();
};

export const getMaterias = async () => {
	const response = await fetch(`${API_URL}/materias`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Erro ao buscar a matéria");
	}

	return response.json();
};

export const registerMateria = async (materiaData) => {
	const response = await fetch(`${API_URL}/add_materia`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
        body: JSON.stringify(materiaData),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Erro ao cadastrar a matéria");
	}

	return response.json();
}

export const getMateriasAluno = async (aluno_id) => {
    const response = await fetch(`${API_URL}/aluno/${aluno_id}/materias`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao buscar as matérias do aluno");
    }

    return response.json();
};

export const addFaltas = async (data) => {
	const response = await fetch(`${API_URL}/add_faltas`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Erro ao adicionar falta");
	}

	return response.json();
}

export const getFaltas = async (aluno_id, materias_id) => {
	const response = await fetch(`${API_URL}/aluno/${aluno_id}/faltas`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Erro ao recuperar número de faltas.");
	}

	return response.json();
}

export const addProvas = async (provaData) => {
	const response = await fetch(`${API_URL}/add_provas`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(provaData),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Erro ao inserir nova data de prova.");
	}

	return response.json();
}

export const getProvas = async (aluno_id) => {
	const response = await fetch(`${API_URL}/aluno/${aluno_id}/provas`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Erro ao obter as provas do aluno.");
	}

	return response.json();
}

export const addTrabalhos = async (trabalhosData) => {
	const response = await fetch(`${API_URL}/add_trabalhos`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(trabalhosData),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Erro ao adicionar trabalho.");
	}

	return response.json();
}

export const getTrabalhos = async (aluno_id) => {
	const response = await fetch(`${API_URL}/aluno/${aluno_id}/trabalhos`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Erro ao obter trabalhos.");
	}

	return response.json();
}