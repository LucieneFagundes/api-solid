# App
GymPass style app.

[![DeepScan grade](https://deepscan.io/api/teams/21339/projects/24820/branches/767608/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=21339&pid=24820&bid=767608)


## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-ins em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Requisitos de negócio)

- [x] O usuário não poderá se cadastrar com um e-mail já existente;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não funcionais)

- [x] A senha do usário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um bando PostgreSQL;
- [x] Todas as listas de dados precisam estar paginada com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)
