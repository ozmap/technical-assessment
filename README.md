# Avaliação Técnica

<a id="sumario"></a>
## 0. Sumário

<!-- TOC -->
  * [Introdução](#introducao)
  * [O desafio](#odesafio)
    * [Parte 1: API de usuários](#parteum)
    * [Parte 2: Agregador de URLs](#partedois)
  * [Submissão da solução](#submissao)
<!-- /TOC -->

<a id="introducao"></a>
## 1. Introdução

O teor deste desafio é bastante voltado a alguns problemas que resolvemos com frequência, e vai nos ajudar a descobrir como você raciocina e quais são suas habilidades.

Como constantemente precisamos pensar em formas diferentes de resolver os desafios que enfrentamos, acreditamos que uma base teórica sólida é mais importante que apenas ser bom em uma linguagem ou framework. Além disso queremos ver o seu melhor, e por isso não é preciso ficar limitado às tecnologias exigidas na descrição da vaga.

<a id="odesafio"></a>
## 2. O desafio

O desafio consiste em 2 problemas técnicos parecidos com os que enfrentamos na vida real.
A resolução deles não necessariamente requer a implementação de um mega-projeto, porém ambos precisam de um certo conhecimento para serem resolvidos.

Leia atentamente os enunciados dos problemas, pois apesar de não haver nenhuma pegadinha, os detalhes importam.

Outros requisitos do projeto incluem:
* Deve funcionar em um ambiente Linux;
* Deve ter testes automatizados;
* Deve ter um README explicando como instalar as dependências, executar as soluções e os testes.

<a id="parteum"></a>
### Parte 1: API de usuários

Precisamos de uma API para receber a atualização de dados cadastrais de usuários. Ela deve receber um corpo no formato JSON, onde o tamanho varia desde alguns poucos kB até alguns GB.
Experiências anteriores mostram que alguns clientes costumam enviar o mesmo corpo repetidas vezes ao longo de um curto espaço de tempo.
Isso nos causou alguns problemas, como o fato de ter que escalar nossos bancos de dados muito além do necessário afim de aguentar a carga extra desnecessária.
Para evitar que isto ocorra, precisamos que esta API negue requisições que tem o mesmo corpo num intervalo de 10 minutos.

Aqui está um exemplo do comportamento esperado:
```bash
# 2021-11-15T13:00:00 - primeira requisição, durante 10 minutos requests com o mesmo corpo serão negadas
curl -XPOST http://your-api.ozmap.com.br/v1/users -d '[{"id": "123", "name": "Ada Lovelace"}]' #=> 201 CREATED

# 2021-11-15T13:09:59 - mesmo corpo que a request anterior.
curl -XPOST http://your-api.ozmap.com.br/v1/users -d '[{"id": "123", "name": "Ada Lovelace"}]' #=> 403 FORBIDDEN

# 2021-11-15T13:10:00 - agora a API deve voltar a aceitar o corpo
curl -XPOST http://your-api.ozmap.com.br/v1/users -d '[{"id": "123", "name": "Ada Lovelace"}]' #=> 201 CREATED
```
Como esta API atenderá milhares de requisições simultâneas, ela precisa funcionar em um cluster.
É esperado que o comportamento descrito acima se mantenha, independente do nó que receber a requisição.

<a id="partedois"></a>
### Parte 2: Agregador de URLs

Recebemos um dump com lista de URLs de imagens de usuários (avatares) que vamos utilizar para manter nossa base de dados atualizada.
Este dump contém imagens de milhões de usuários e URLs, e é atualizado a cada 10 minutos:

```json
{"userId": "uid2", "image": "http://api.ozmap.com.br/test-platform/6.png"}
{"userId": "uid1", "image": "http://api.ozmap.com.br/test-platform/1.png"}
{"userId": "uid1", "image": "http://api.ozmap.com.br/test-platform/2.png"}
{"userId": "uid1", "image": "http://api.ozmap.com.br/test-platform/7.png"}
{"userId": "uid1", "image": "http://api.ozmap.com.br/test-platform/3.png"}
{"userId": "uid1", "image": "http://api.ozmap.com.br/test-platform/1.png"}
{"userId": "uid2", "image": "http://api.ozmap.com.br/test-platform/5.png"}
{"userId": "uid2", "image": "http://api.ozmap.com.br/test-platform/4.png"}
```

As URLs pertencem a uma empresa terceirizada que hospeda a maioria destas imagens, e ela nos cobra um valor fixo por cada request.
Já sabemos que o dump de origem não tem uma boa confiabilidade, pois encontramos várias imagens repetidas e boa parte delas também retornam status 404.
Como não é interessante atualizar nossa base com dados ruins, filtramos apenas as URLs que retornam status 200.

O processo de atualização deve receber como input um dump sanitizado, onde o formato é ligeiramente diferente da entrada:

```json
{"userId": "uid1", "images": ["http://api.ozmap.com.br/test-platform/1.png", "http://api.ozmap.com.br/test-platform/2.png", "http://api.ozmap.com.br/test-platform/7.png"]}
{"userId": "uid2", "images": ["http://api.ozmap.com.br/test-platform/3.png", "http://api.ozmap.com.br/test-platform/5.png", "http://api.ozmap.com.br/test-platform/6.png"]}
```

Para diminuir a quantidade de requests necessárias para validar as URLs, decidimos limitar a quantidade de imagens por usuário em até 3.
O seu objetivo é criar um programa que gera o dump final no menor tempo possível e com o mínimo de requests desnecessárias (já que existe um custo fixo por requisição).

O arquivo [input-dump.tar](./resources/input-dump.tar) é um exemplo do dump de entrada. E você pode usá-lo para testar sua implementação.
Também criamos uma api que responde as URLs do `input-dump.tar`. Ela é apenas um mock, mas vai te ajudar a implementar a solução do desafio. Para executá-la, basta:

```shell
cd images-api
npm install
npm run start
```

<a id="submissao"></a>
## 3. Submissão da solução

De modo que a sua solução seja passível de ser avaliada, a mesma deverá ser submetida segundo as estipulações listadas abaixo:

* Realizar o fork deste repositório;
* Alterar a visibilidade do fork para privada;
* Adicionar como contribuidores os seguintes usuários:
  - [José Raupp (raupp)](https://github.com/raupp)
* Publicar os seus commits em um branch, como o nome no formato `solution/[your-github-username]`.

[**Voltar para o sumário**](#sumario)
