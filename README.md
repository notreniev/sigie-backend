### SGIE - Backend

Este projeto foi desenvolvimento em NodeJS como banco de dados Postgres como base de dados principal da aplicação e MongoDB para armazenamento de logs. Foi utilizado um pattern chamado Strategy Pattern que visa a utilização de dois bancos de dados simultâneos. Esta aplicação serve de backend para a aplicação SIGIE de Gerenciamento de Instituições de Ensino.

A aplicação está desenvolvida utilizando docker e para rodar basta executar o comando:

### docker-compose up

### Rodar o comando a seguir para criar o usuário do mongoDB
docker exec -it sigie-node-api_mongo_1 mongo --host localhost -u root -p root --authenticationDatabase admin --eval "db.getSiblingDB('sgidb').createUser({user: 'root', pwd: 'root', roles: [{role: 'readWrite', db: 'sgidb'}]})"

