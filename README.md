# Meu Semestre
'Meu Semestre' é um sistema de gerenciamento acadêmico projetado para ajudar estudantes a acompanhar seu progresso na faculdade. Com ele, os alunos podem registrar e monitorar suas faltas, matérias, provas e trabalhos, tudo em um só lugar.  

**Atenção**: Este projeto ainda está em desenvolvimento. Novas funcionalidades e melhorias serão adicionadas em breve.  

## Funcionalidades  
O sistema oferece as seguintes funcionalidades para auxiliar os estudantes em sua jornada acadêmica:  

- Controle de Faltas: Adicione e visualize o número de faltas em cada matéria.
- Gerenciamento de Matérias: Cadastre as matérias que está cursando no semestre.
- Agenda de Provas: Insira as datas e os conteúdos das próximas provas.
- Controle de Trabalhos: Acompanhe os trabalhos, suas datas de entrega e os pontos que valem.
- Dashboard Intuitivo: Tenha uma visão geral do seu semestre, com informações sobre as próximas avaliações e o total de faltas.  

## Como funciona  
'Meu Semestre' é construido com uma arquitetura cliente-servidor, que consiste em:  
- **Frontend:** Uma interface de usuário moderna e interativa desenvolvida com React, que permite aos alunos interagir com o sistema de forma fácil e intuitiva.  
- **Backend:** Um servidor robusto construído com .NET e C#, que processa todas as regras de negócio e gerencia a comunicação com o banco de dados.  
- **Banco de dados:** Um banco de dados MySQL é utilizado para armazenar todas as informações dos alunos, como dados pessoais, matérias, faltas, provas e trabalhos.  

A aplicação funciona da seguinte maneira: o frontend, desenvolvido em React, envia solicitações para o backend por meio de uma API. O backend, por sua vez, processa essas solicitações, interage com o banco de dados MySQL para ler ou gravar dados e retorna as informações para o frontend, que as exibe ao usuário.  
