# WORKSHOP - GRAPHQL IN A NUTSHELL 🌰
*O que é? Onde mora? O que come?*

## Apresentação da "problemática":

Imagino que muitos aqui já estejam familiarizados com o conceito de API Rest, entretanto, para os que não estão, vou fazer uma breve explicação.

Atualmente temos diversas aplicações serem feitas única e exclusivamente desenvolvidas para rodar na internet, sendo assim *"consumidas"* por navegadores em desktops, notebooks e dispositos móveis. Nesse contexto, as empresas sentiram a necessidade de alimentar essas aplicações (que iam desde sistemas de estoque, contabilidade, ERP à redes sociais) com dados a todo momento. 
Com essas duas problemáticas em mente (sofwares sendo acessados pela Web e empresas precisando alimentar seus sistemas) começou a se pensar em algum tipo de soluçao de software que permitisse essa conversa entre sistema e usuários.
Durante anos, diversas alternativas surgiram e, de uma forma geral, essas aplicações ficaram conhecidas como **APIs**.

>O acrônimo **API** que provém do inglês **Application Programming Interface** (Em português, significa Interface de Programação de Aplicações), trata-se de um conjunto de rotinas e padrões estabelecidos e documentados por uma aplicação A, para que outras aplicações consigam utilizar as funcionalidades desta aplicação A, sem precisar conhecer detalhes da implementação do software.

Tendo falado sobre a parte de API, explicarei sobre o Rest. 
O **REST** ou **Representational State Transfer** foi definido nos anos 2000 e é o conceito até então mais utilizado para a criação de web services. Esse conceito utiliza os métodos HTTP como GET, POST, PUT, DELETE entre outros para determinar uma operação que quem está enviando deseja fazer.
Para que isso ocorra, ele trabalha com esquema de rotas, ou seja, para cada operação você precisa designar uma rota específica (uma rota nada mais é do que um caminho) para que ela ocorra.

| Métodos | Rotas                             | Responsabilidade                     |
| ------- | --------------------------------- | ------------------------------------ |
| GET     | http://exemplo.com/usuarios/      | Retorna todos os usários cadastrados |
| GET     | http://exemplo.com/usuarios/{id}/ | Retorna um usuário específico        |
| POST    | http://exemplo.com/usuarios/      | Cria um novo usuário                 |
| PUT     | http://exemplo.com/usuarios/{id}/ | Edita um usuário específico          |
| DELETE  | http://exemplo.com/usuarios/{id}/ | Deleta um usuário específico         |

Com todo esse conhecimento em mãos, podemos imaginar então que quanto maior a complexidade de informações requerida pelo cliente da nossa aplicação, maior é o número de rotas que nossa API precisa possuir, certo? Bem, esse foi justamente um dos estopins para o surgimento do **graphql** ---não somente esse, veremos a seguir---.

## Graphql em si:

Criado pelo Facebook em 2012 o GraphQL é uma nova maneira de expor dados do servidor além do conceito REST. Foi criado a partir de um problema que a equipe de desenvolvimento teve quando começaram a fazer o aplicativo da rede social. Muitos dados retornados pela API REST que eram utilizados na plataforma WEB e não eram utilizados no aplicativo, isso acabava tendo um consumo desnecessário da banda (overfetching).

O conceito criado é muito conhecido como uma linguagem de consulta para APIs, imagine como um SQL para banco de dados. Você consegue enviar uma QUERY no BODY de uma requisição com métodos GET ou POST para o servidor pedindo exatamente o que você quer. Isso diminui consideravelmente a criação de APIs para cada estrutura de dados.

```grapqhql
{
    users {
        id
        name
        team {
            name
        }
    }
}
```
<small>Exemplo de query para buscar usuários e retornar seus dados</small>

Se você ainda está se questionando sobre a praticidade do graphql, mostrarei na prática dois códigos diferentes e **SIMPLES** que realizam as mesmas tarefas. Um em modelo [Rest](testExpress/index.js) e outro utilizando [graphql](testGraphql/index.js). Os dois foram desenvolvidos por mim em node.js.
Depois mostrarei um código que realiza tarefas mais complexas, como consultar consultar uma API externa e gravar dados em um banco de dados NoSQL.


## Referências:
1. [Becode](https://becode.com.br/o-que-e-api-rest-e-restful/)
2. [Medium](https://medium.com/@jcc0xp/graphql-vs-rest-pensando-de-uma-forma-inovadora-a89c0d514a0d)
3. [Graphql](https://graphql.org/)
4. [Apollo Server](https://www.apollographql.com/)