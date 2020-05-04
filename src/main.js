// regenerator-runtime is to support async/await syntax in ESNext.
// If you target latest browsers (have native support), or don't use async/await, you can remove regenerator-runtime.
import 'regenerator-runtime/runtime';
import 'bootstrap';
import environment from './environment';
import 'aurelia-fetch-client';
import {I18N, TCustomAttribute} from 'aurelia-i18n';
import {AppRouter} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import Backend from 'i18next-xhr-backend';


export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')    
    .globalResources('bootstrap/css/bootstrap.css')
    .plugin('visual-validation')    
    .plugin('visual-general-components')
    .plugin('aurelia-dialog', config => {
      config.useDefaults();
      config.settings.lock = true;
      config.settings.startingZIndex = 10001;
      config.settings.keyboard = true;
    })
    .plugin('aurelia-i18n', (instance) => {
      let aliases = ['t', 'i18n'];
      // add aliases for 't' attribute
      TCustomAttribute.configureAliases(aliases);

      // register backend plugin
      instance.i18next.use(Backend);

      // adapt options to your needs (see http://i18next.com/docs/options/)
      // make sure to return the promise of the setup method, in order to guarantee proper loading
      return instance.setup({
        backend: {                                  // <-- configure backend settings
          loadPath: './locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
        },
        attributes: aliases,
        lng : 'pt',
        fallbackLng : 'en',
        debug : false
      }).then(()=>{
        const router = aurelia.container.get(AppRouter);
        router.transformTitle = title => instance.tr(title);

        const eventAggregator = aurelia.container.get(EventAggregator);
        eventAggregator.subscribe('i18n:locale:changed', () => {
          router.updateTitle();
        });
      })
    });

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  //Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');
  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader');

  aurelia.start().then(() => aurelia.setRoot());
}
