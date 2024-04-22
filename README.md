# BGC Scrapper API

Este projeto desenvolvido em Serverless para fazer o scrapper da página de mais vendidos da Americanas. Usa o DynamoDB para salvar os dados e usa Lambda/API gateway para listar os dados.

## Documentação da API

Para acessar a documentação clique no link a seguir que está hospedado no AWS S3:
http://bestsellers-api-doc.s3-website-us-east-1.amazonaws.com/

## Instalação

Este projeto usa variáveis de ambiente, copie o **.env.example** para **.env** e substitua pelas suas configurações da AWS.

Este projeto utiliza Serverless Framework, instale-o em:
https://www.serverless.com/framework/docs/getting-started

Instale o projeto com npm:

```bash
  cd project
  npm install
```

Para rodar o scrapper execute os seguintes comandos

```bash
  serverless invoke local -f scrapper
```
