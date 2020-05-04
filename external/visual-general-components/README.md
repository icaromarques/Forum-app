* Os arquivos na pasta src servem apenas como modelo. Esses arquivos devem ser removidos na publicação do novo componente.
* Alterar o arquivo package.json com as informações do componente (name, version, etc)
* A execução do teste utiliza os diretórios informados em 'loadFiles' e 'serveFiles' no arquivo karma.conf.js.




------ Build ---------
* Instalar dependências
--> npm install

* Instalar gulp globalmente
--> npm install gulp -g

* Build
--> gulp build



------ Tests ---------

* Instalar karma-cli globalmente
--> npm install karma-cli -g

* Instalar jspm globalmente
--> npm install jspm -g

* Instalar dependências jspm
--> jspm install

* Testes
--> karma start ou gulp test
