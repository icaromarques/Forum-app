/**
 * @author Daniel Falci - 20/09/17
 **/

import {inject, ViewCompiler, ViewResources, Container, ViewSlot, CompositionEngine, createOverrideContext} from 'aurelia-framework';

/**
 * Classe
 */
@inject(ViewCompiler, ViewResources, Container, CompositionEngine)
export class VSViewCreator{

  constructor(compiler, resources, container, compositionEngine){
    this.compiler = compiler;
    this.resources = resources;
    this.container = container;
    this.compositionEngine = compositionEngine;
  }


  /**
   * Cria, dinâmicamente, um determinado template do aurelia
   * @param viewModel O caminho da view model a ser criada
   * @param parentHtml O elemento onde o item deve ser ancorado. Quando não especificado, faz anchor no document
   * @param container Container de DI a ser utilizado pela nova viewmodel. Por default, utiliza um container filho do containre do próprio VSViewCompiler
   * @param parentType O tipo de elemento html a ser criado
   * @param controllerHandler Um callback opcional para tratar a viewModel diretamente, antes da inicialização do componente
   * @returns viewSlot:*, parentHTML:*, {function()} Elemento que carrega o componente, bem como o seu callback para destruição dinâmica
   */
  createFromViewModel(viewModel, parentHtml =null, container = null, parentType = 'div', controllerHandler = null, closeHandler=null){

    if (container == null)
      container = this.container.createChild();

    let createdTag = false;
    if (parentHtml == null) {
      parentHtml = document.createElement(parentType);
      createdTag = true;
    }

    let viewSlot = new ViewSlot(parentHtml, true);

    let instruction = {
      container:container,
      viewModel:viewModel,
      host:parentHtml,
      viewSlot:viewSlot
    };


    this.compositionEngine.compose(instruction).then((controller)=>{
      viewSlot.bind();
      viewSlot.attached();
      if (controllerHandler != null)
        controllerHandler(controller.viewModel, parentHtml, viewSlot);
    });

    if (createdTag)
      document.body.appendChild(parentHtml);

    let close = (params) => {
      parentHtml.remove(viewSlot);
      viewSlot.unbind();
      if (closeHandler == null) {
        if (createdTag)
          $(parentHtml).parent().remove(parentHtml);
      }else{
        closeHandler(params, parentHtml);
      }
    };
    return {viewSlot, parentHtml, close};

  }


  /**
   *
   * @param htmlText Uma string contendo o texto html a ser empregado! é necessário que este texto se inicie com as tags template
   * @param viewModel O viewModel a ser utilizado pelo htmlText passado
   * @param parentHtml O elemento html onde o novo componente será ancorado
   * @param container O container de DI a ser utilizado
   * @param parentType O tipo de tag a ser utilizado quando o parentHtml é nulo. O valor default é uma div
   * @returns {{viewSlot: *, parentHtml: *, close: (function())}} O elemento criado para carregar o componente e um callback responsável por destruí-lo
   */
  createFromHtmlText(htmlText, viewModel, parentHtml = null, container=null, parentType='div'){
    let viewFactory = this.compiler.compile(htmlText, this.resources);
    let view = viewFactory.create((container !=null)?container:this.container.createChild());

    let createdTag = false;

    if (parentHtml == null) {
      parentHtml = document.createElement(parentType);
      createdTag = true;
    }

    //não roda o ciclo de vida
    view.bind(viewModel, createOverrideContext(viewModel));

    //adiciona o elemento ao container informado
    let viewSlot = new ViewSlot(parentHtml, true);
    viewSlot.add(view);
    viewSlot.attached();

    if (createdTag)
      document.body.appendChild(parentHtml);

    //retorna um handle para o destruir a view.
    let close = () => {
      viewSlot.remove(view);
      view.unbind();
      if (createdTag)
        $(parentHtml).parent().remove(parentHtml);
    };
    return {viewSlot, parentHtml, close};
  }

}
