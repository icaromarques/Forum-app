
export class App {
  configureRouter(config, router) {
    this.router = router;

    config.title = 'Forum';
    config.map([
      {route: ['', 'index'],name: 'index',moduleId: 'resources/views/forum' },
      {route: ['question'], name: 'question',moduleId: 'resources/views/question'}
    ]);

    config.mapUnknownRoutes({ redirect: 'navigation-error' });
   
  }
}
