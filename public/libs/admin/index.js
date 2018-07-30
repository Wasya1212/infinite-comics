class AdminPanelTypes {
  constructor() {
    this.types = {};
    this.types_names = [];
    this.dom_renderer_element = null;
  }

  get Types() {
    return this.types_names.join(',');
  }

  declareType(type_name, dom_view, options = {}) {
    if (typeof type_name !== 'string') {
      throw Error("Error declare new type: 'type name must be a String type!'");
    }
    if (!isNode(dom_view)) {
      throw Error("dom_view must be a DOM element");
    }

    let upperTypeName = type_name.toUpperCase();

    this.types[upperTypeName] = Object.create(null);

    this.types[upperTypeName].name = type_name;
    this.types[upperTypeName].renderer = dom_view;
    this.types_names.push(upperTypeName);

    // create an dom item in accordance with the type
    let dom_params = {
      classNames: options.classNames || [],
      id: options.id || '',
      beforeCreate: options.beforeCreate || function () {},
      afterCreate: options.afterCreate || function () {},
      getData: options.getData || function () {},
      setData: options.setData || function () {}
    };

    this.types[upperTypeName].createDOM = () => {
      dom_params.beforeCreate();

      let $_elementContainer = document.createElement('div');

      try {
        $_elementContainer.classList.add('admin-panel-element');
        $_elementContainer.id = dom_params.id;
        $_elementContainer.setAttribute('panelType', upperTypeName);
        $_elementContainer.appendChild(dom_view.cloneNode(true));

        dom_params.classNames.forEach(className => {
          $_elementContainer.classList.add(className);
        });
      } catch (err) {
        throw new Error(err);
      } finally {
        dom_params.afterCreate();
      }

      return {
        dom_view: $_elementContainer,
        getData: () => {
          dom_params.getData($_elementContainer);
        }
      };
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

class AdminScheme {
  constructor(name, container) {
    this.name = name;
    this.field = Object.create(null);
    this.$_container = container;
  }

  addField(admin_type, name) {
    if (!name) {
      throw Error("Plese enter scheme name!");
    }

    this.field[name] = Object.create(null);

    this.field[name].value = null;
    this.field[name].title = name;
    this.field[name].type_name = admin_type.name;

    let {dom_view, getData} = admin_type.createDOM();

    this.field[name].dom_view = dom_view;
    this.field[name].getData = getData;

    // this.field[name].validation = function() {
    //   this.dom_view.onChange(function(e) {
    //     this.value = this.type.getData();
    //   });
    //   validation(this.value, this.dom_view);
    // }
  }

  getData() {
    let data = Object.create(null);

    for (let field in this.field) {
      data[field] = this.field[field].getData();
    }

    return data;
  }
}

class AdminPanelController {
  constructor($_container) {
    // parent element for all contoller DOM elements
    this.$_container = $_container;

    // create control input types
    this.types = new AdminPanelTypes();

    let STRING_VIEW = data => {
      return document.createElement('input');
    }

    this.types.declareType('String', STRING_VIEW(), {
      getData: container => {
        console.log(container);
        return container.querySelector('input') || null;
      }
    });
    this.types.declareType('Text', STRING_VIEW());
    this.types.declareType('Check', STRING_VIEW());
    this.types.declareType('MultiCheck', STRING_VIEW());
    this.types.declareType('File', STRING_VIEW());
    this.types.declareType('MultiFile', STRING_VIEW());
    this.types.declareType('Baseobj', STRING_VIEW());

    this.schemes = [];
    this.scheme = Object.create(null);
  }

  addScheme(scheme_name, scheme_fields = {}) {
    if (!scheme_name) {
      throw Error("Plese enter scheme name");
    };

    this.scheme[scheme_name] = new AdminScheme(scheme_name);

    for (let field in scheme_fields) {
      if (!this.types.checkType(scheme_fields[field].type)) {
        throw Error("Field type not declareted in admin panel!");
      }
      this.scheme[scheme_name].addField(scheme_fields[field].type, field);
    }

    return this.scheme[scheme_name];
  }

  get Types() {
    return this.types.types;
  }

  init() {
    this.clearMainContainer();

    let $_shemes_menu = this.buildSidePanel();
    let $_schema_data = this.getSchemaData(this.Schemes['characters']);

    this.$_schema_container = document.createElement('section');
    this.$_data_container = document.createElement('section');

    this.$_schema_container.appendChild($_shemes_menu);
    this.$_data_container.appendChild($_schema_data);

    this.$_container.appendChild(this.$_schema_container);
    this.$_container.appendChild(this.$_data_container);
  }

  buildSidePanel() {
    let $_schemes_panel = document.createElement('nav');
    $_schemes_panel.classList.add('admin-schemes');

    Object.keys(this.Schemes).forEach(scheme => {
      let $_scheme_switcher = document.createElement('li');

      $_scheme_switcher.textContent = scheme;
      $_schemes_panel.appendChild($_scheme_switcher);
    });

    return $_schemes_panel;
  }

  getSchemaData(schema) {
    let $_data_grid = document.createElement('h1');

    console.log(schema);

    $_data_grid.textContent = "hello world";
    return $_data_grid;
  }

  clearMainContainer() {
    this.$_container.innerHTML = '';
  }

  get Schemes() {
    return this.scheme;
  }
}

function isNode(o){
  return (
    typeof Node === "object" ? o instanceof Node :
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
  );
}
