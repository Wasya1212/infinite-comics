class AdminPanelTypes {
  constructor() {
    this.types = [];
    this.types_names = [];
    this.dom_renderer_element = null;
    this.dom_renderer_data = null;
  }

  get Types() {
    return this.types_names.join(',');
  }

  declareType(type_name, dom_view, dom_data_getter, params = {}) {
    if (typeof type_name !== 'string') {
      throw Error("Error declare new type: 'type name must be a String type!'");
    }

    let newType = Object.create(null);
    let upperTypeName = type_name.toUpperCase();

    newType[upperTypeName] = type_name;

    // create an dom item in accordance with the type
    let dom_params = {
      classNames: params.classNames || [],
      id: params.id || null,
      beforeCreate: params.beforeCreate || function () {},
      afterCreate: params.afterCreate || function () {}
    };

    newType.create = () => {
      dom_params.beforeCreate();

      let $_elementContainer = document.createElement('div');

      $_elementContainer.classList.add('admin-panel-element');

      dom_params.classNames.forEach(className => {
        $_elementContainer.classList.add(className);
      });

      if (dom_params.id) {
        $_elementContainer.id = dom_params.id;
      }

      $_elementContainer.setAttribute('panelType', upperTypeName);

      // dom view is a simple html element
      // that will display the element element
      // of a particular type
      $_elementContainer.appendChild(dom_view);

      dom_params.afterCreate();

      this.dom_renderer_element = $_elementContainer;
    }

    // function for getting data
    // from dom_renderer_element
    newType.renderer = this.dom_renderer_element;

    this.types.push(newType);
    this.types_names.push(upperTypeName);
  }

  checkType(type) {
    return this.types.includes(type.toString());
  }
}

let AdminTypes = new AdminPanelTypes();

AdminTypes.declareType('string');
AdminTypes.declareType('echo');
AdminTypes.declareType('naruto');

alert(AdminTypes.Types);

class AdminPanelController {
  constructor($_container) {
    // parent element for all contoller DOM elements
    this.$_container = $_container;

    // control input types
    this.types = {
      STRING: 'String',
      TEXT: 'Text',
      CHECK: 'Check',
      MULTICHECK: 'Multicheck',
      FILE: 'File',
      BASEOBJ: 'Baseobj'
    };
  }

  static get Types() {
    return this.types;
  }

  addInput() {

  }

  init() {

  }
}
