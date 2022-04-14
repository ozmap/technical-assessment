# Solução API de usuários

## Requerimentos
- NodeJS e Yarn instalados.


Para testes:
- Docker e docker-compose instalados.


 Para "deploy"
- Docker, minikube e kubectl instalados.

## Setup local
A partir de /users-api
- `yarn install` para instalar as dependências.
- `docker-compose up -d` para subir os containers de teste: Redis e MariaDB.

### Início local
-`yarn start` para iniciar o programa localmente.

### Testes
-`yarn test` para rodar os testes.

## Setup kubernetes
A partir de /users-api
- `eval $(minikube docker-env)` para trocar o docker-daemon para o do minikube no terminal atual.
- `docker build . -t "node-mysql-app"` para inicializar a imagem docker no minikube.
- `kubectl apply -f kube/namespaces/` para inicializar os namespaces.
- `kubectl apply -f kube` para inicializar os serviços.
- `minikube tunnel` para poder acessar o app pelo localhost.

Limpeza
- `kubectl delete namespaces app` para deletar o namespace app.
- `kubectl delete namespaces db` para deletar o namespace db.
- `kubectl delete namespaces redis` para deletar o namespace redis.