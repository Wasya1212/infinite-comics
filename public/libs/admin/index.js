class AdminPanelTypes {
  constructor() {
    this.types = {};
    this.types_names = [];
    this.dom_renderer_element = null;
  }

  get Types() {
    return this.types_names.join(',');
  }

  declareType(type_name, dom_view) {
    if (typeof type_name !== 'string') {
      throw Error("Error declare new type: 'type name must be a String type!'");
    }

    let upperTypeName = type_name.toUpperCase();

    this.types[upperTypeName] = Object.create(null);

    this.types[upperTypeName].name = type_name;
    this.types[upperTypeName].renderer = () => {};
    this.types_names.push(upperTypeName);

    this.types[upperTypeName].create = (options = {}) => {
      // create an dom item in accordance with the type
      let dom_params = {
        classNames: options.classNames || [],
        id: options.id || null,
        beforeCreate: options.beforeCreate || function () {},
        afterCreate: options.afterCreate || function () {}
      };

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
      try {
        $_elementContainer.appendChild(dom_view);
      } catch (err) {
        throw Error("Enter dom view container");
      }

      dom_params.afterCreate();

      this.dom_renderer_element = $_elementContainer;

      // function for getting data
      // from dom_renderer_element
      this.types[upperTypeName].renderer = this.dom_renderer_element;
    }
  }

  checkType(type) {
    try {
      return this.types[type.name.toUpperCase()] ? true : false;
    } catch(err) {
      throw Error("Plese enter correct TYPE!");
    }
  }
}

class AdminPanelController {
  constructor($_container) {
    // parent element for all contoller DOM elements
    this.$_container = $_container;

    // create control input types
    this.types = new AdminPanelTypes();

    let STRING_VIEW = document.createElement('input');

    this.types.declareType('String', STRING_VIEW);
    this.types.declareType('Text');
    this.types.declareType('Check');
    this.types.declareType('Multicheck');
    this.types.declareType('File');
    this.types.declareType('Baseobj');

    this.schemes = [];
  }

  addScheme(scheme_name, scheme_fields = []) {
    if (!scheme_name) {
      throw Error("Plese enter scheme name");
    }
    if (!(scheme_fields instanceof Array)) {
      throw Error("Fields (second parameter) must be array of field objects");
    }

    let fields = [];

    for (let i = 0; i < scheme_fields.length; i++) {
      let schemeType = scheme_fields[i].type;

      if (!this.types.checkType(schemeType)) {
        console.error("Field type not declareted in admin panel!");
      } else {
        schemeType.create({
          classNames: scheme_fields[i].classNames,
          id: scheme_fields[i].id,
          beforeCreate: scheme_fields[i].beforeCreate,
          afterCreate: scheme_fields[i].afterCreate
        });

        fields.push({
          type: schemeType.name,
          dom_view: schemeType.renderer
        });
      }
    }

    this.schemes.push({
      name: scheme_name.toString(),
      fields: fields
    });
  }

  get Types() {
    return this.types.types;
  }

  init() {
    this.$_container.innerHTML = '';
    this.schemes[0].fields.forEach(field => {
      this.$_container.appendChild(field.dom_view);
    });
  }
}
