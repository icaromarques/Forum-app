* O view-model test/unit/validation-test possui um exemplo de como deverá ser utilizado o componente.
* Necessário alterar arquivo aurelia.json. Exemplo abaixo:
  {
	"name": "visual-validation",
	"path": "../node_modules/visual-validation/dist/commonjs",
	"main": "index",
    "resources": ["**/*.js"]
  }

* Adicionar componente como plugin no arquivo main.js. Ex.: plugin('visual-validation') 
  
  
------ Build ---------
* Instalar dependências
--> npm install

* Instalar gulp globalmente
--> npm --registry https://registry.npmjs.org install -g gulp

* Build
--> gulp build



------ Tests ---------

* Instalar karma-cli globalmente
--> npm --registry https://registry.npmjs.org install -g karma-cli

* Instalar jspm globalmente
--> npm --registry https://registry.npmjs.org install -g jspm

* Instalar dependências jspm
--> jspm install

* Testes
--> karma start ou gulp test
