import {bindable} from 'aurelia-framework';

export class TesterCustomElement {
  
  namee;
  loading = false;
  spinnerClass = {
    overlay: '',
    spinner: 'central-spinner'
  };
  @bindable entity;
  @bindable description = 'role';
  @bindable label = 'Hero';
  @bindable placeholder = 'Search for a hero ... ';
  @bindable emptyResult = 'No hero found !';
  @bindable limit = 4;
  @bindable displayProperty = "name";
  @bindable statusProperty = "ativo";
  @bindable responseProperty = "value";
  @bindable onSelected;
  @bindable query;
  
  @bindable entity1 = {
      "id": 1,
      "name": "Caio",
      "role": "Kryptonian Freak"
  };
  @bindable description1 = 'role';
  @bindable label1 = 'Other Hero';
  @bindable placeholder1 = 'Search for another hero ... ';
  @bindable emptyResult1 = 'No hero found !';
  @bindable limit1 = 4;
  @bindable displayProperty1 = "name"
  @bindable responseProperty1 = "value";
  @bindable query1;

  @bindable style = {
    container: 'vs-ac',
    input: 'vs-ac-input',
    input_selected: 'vs-ac-input-selected',
    label: 'vs-ac-label',
    close_button: 'vs-ac-close',
    wrapper: 'vs-ac-list',
    list_container: 'vs-ac-list-container',
    loader: 'vs-ac-loader',
    empty_result: 'vs-ac-empty',
    disabled: 'disabled'
  };

  constructor(){
    setInterval(() => {
      //this.loading = !this.loading;
    }, 10000);
  }
  request(){
    let promise = new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve({
            status: {code:0},
            value: [
              {
                  "id": 1,
                  "name": "Superman",
                  "role": "Kryptonian Freak",
                  "ativo": true
              },
              {
                  "id": 2,
                  "name": "Wonderwoman",
                  "role": "Amazon Lover",
                  "ativo": true
              },
              {
                  "id": 3,
                  "name": "Flash",
                  "role": "Scarlet Speedster",
                  "ativo": true
              },
              { 
                  "id": 4,
                  "name": "Batman",
                  "role": "Billionaire",
                  "ativo": true
              },
              { 
                  "id": 5,
                  "name": "Aquaman",
                  "role": "Atlantis King",
                  "ativo": false
              },
              { 
                  "id": 6,
                  "name": "Green Lantern",
                  "role": "Earth Protector",
                  "ativo": false
              },
              { 
                  "id": 7,
                  "name": "Nightwing",
                  "role": "Night Avenger",
                  "ativo": true
              },
              { 
                  "id": 8,
                  "name": "Black Canary",
                  "role": "Dark Bird",
                  "ativo": true
              },
              { 
                  "id": 9,
                  "name": "White Canary",
                  "role": "Silent Assassin",
                  "ativo": true
              },
              { 
                  "id": 10,
                  "name": "Atom",
                  "role": "Smallest Trouble",
                  "ativo": true
              },
              { 
                  "id": 11,
                  "name": "Green Arrow",
                  "role": "Green Batman",
                  "ativo": false
              },
              { 
                  "id": 12,
                  "name": "Cyborg",
                  "role": "Vic Stone",
                  "ativo": true
              },
              { 
                  "id": 13,
                  "name": "Shazam",
                  "role": "God's Choosen",
                  "ativo": true
              },
              { 
                  "id": 14,
                  "name": "Nuclear",
                  "role": "Atomic Blaster",
                  "ativo": false
              }
            ].filter((x) => x[this.displayProperty].includes(this.query))
          });
        }, 0);
      }
      catch(e) {
        reject(e);
      }
    });
    return promise;
  }
  afterRequest = () => {
    return console.log('Function executed after request!');
  }
}
