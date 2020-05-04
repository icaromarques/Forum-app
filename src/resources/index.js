export function configure(config) {
  config.globalResources([
    "resources/elements/nav/navbar",
    "resources/elements/copyright/copyright",
    'resources/elements/components/header',
    'resources/elements/components/form-item',    
    'resources/elements/components/window-header',
    'resources/elements/components/window-footer',
    'resources/attributes/mask',
    'resources/value-converters/date-format'
  ]);
}
