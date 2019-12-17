### SGIE

A aplicação está desenvolvida utilizando docker e para rodar basta executar o comando:

### docker-compose up

Rodar o comando a seguir para criar o usuário do mongoDB
### docker exec -it sigie-node-api_mongo_1 mongo --host localhost -u root -p root --authenticationDatabase admin --eval "db.getSiblingDB('sgidb').createUser({user: 'root', pwd: 'root', roles: [{role: 'readWrite', db: 'sgidb'}]})"

