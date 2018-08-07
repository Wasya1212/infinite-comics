class AdminPanelTypes {
  constructor() {
    this.types = {};
    this.types_names = [];
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
        getData: dom_params.getData
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
  constructor(name, getBaseData = done => done([])) {
    this.name = name;
    this.field = Object.create(null);
    this.operations = Object.create(null);
    this.getBaseData = getBaseData;
    this.fields = [];
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

  setData(options = {}) {
    this.fields = [];

    if (options.beforeCreate) {
      options.beforeCreate();
    }

    let getShemaData = new Promise((resolve, reject) => {
      this.getBaseData(resolve);
    });

    return getShemaData
      .then(data => {
        data.forEach(element => {
          let fullField = Object.assign({}, this.field);

          for (let field_name in fullField) {
            fullField[field_name] = Object.assign({}, fullField[field_name], {
              value: element[field_name] || 'NULL'
            });
          }

          this.fields.push(fullField);
        });

        if (options.afterCreate) {
          options.afterCreate(this.field);
        }

        return this.fields;
      });
  }

  addOperation(operation_name, options = {}) {
    let fields = Object.assign({}, this.field);

    if (options.visible) {
      fields = {};
      options.visible.forEach(field => {
        fields[field] = this.field[field];
      }, this);
    }

    if (options.invisible) {
      options.invisible.forEach(field => {
        delete fields[field];
      });
    }

    if (options.unwritable) {
      options.unwritable.forEach(field => {
        fields[field].dom_view.classList.add('unwritable');
      });
    }

    Object.keys(fields).forEach(field => {
      let newDOM = fields[field].dom_view.cloneNode(true);
      
      fields[field] = Object.assign({}, fields[field], {
        dom_view: newDOM,
        getData: () => this.field[field].getData(newDOM)
      });
    });

    this.operations[operation_name] = {
      getFields() {
        return fields;
      },
      getData() {
        let data = Object.create(null);

        Object.keys(fields).forEach(field_name => {
          data[field_name] = fields[field_name].getData();
        });

        return data;
      }
    }
  }

  use(operation_name) {
    if (!this.operations[operation_name]) {
      throw Error(`Operation ${operation_name} in ${this.name} scheme is not defined`);
    }

    return this.operations[operation_name].getFields();
  }
}

class AdminPanelController {
  constructor($_container) {
    // parent element for all contoller DOM elements
    this.$_container = $_container;

    this.$_schema_container = document.createElement('section');
    this.$_data_container = document.createElement('section');
    this.$_operations_container = document.createElement('aside');

    this.$_container.appendChild(this.$_schema_container);
    this.$_container.appendChild(this.$_data_container);
    this.$_container.appendChild(this.$_operations_container);

    // create control input types
    this.types = new AdminPanelTypes();

    let STRING_VIEW = data => {
      return document.createElement('input');
    }

    this.types.declareType('String', STRING_VIEW(), {
      getData: container => {
        let $_data_container = container.querySelector('input');
        let data = $_data_container.value;
        // console.log(data);
        return data || null;
      }
    });
    this.types.declareType('Text', STRING_VIEW(), {
      getData: data_container => {
        alert(data_container);
      }
    });
    this.types.declareType('Check', STRING_VIEW());
    this.types.declareType('MultiCheck', STRING_VIEW());
    this.types.declareType('File', STRING_VIEW());
    this.types.declareType('MultiFile', STRING_VIEW());
    this.types.declareType('Baseobj', STRING_VIEW());

    this.schemes = [];
    this.scheme = Object.create(null);
  }

  addScheme(scheme_name, scheme_fields = {}, baseData) {
    if (!scheme_name) {
      throw Error("Plese enter scheme name");
    };

    this.scheme[scheme_name] = new AdminScheme(scheme_name, baseData);

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
    let $_shemes_menu = this.buildSidePanel();
    let $_schema_data = this.buildSchemaDataTable(this.Schemes['characters']);
    let $_schema_operations = this.buildOperationsPanel(this.Schemes['characters']);

    this.$_schema_container.appendChild($_shemes_menu);
    this.$_data_container.appendChild($_schema_data);
    this.$_operations_container.appendChild($_schema_operations);
  }

  buildSidePanel() {
    let $_schemes_panel = document.createElement('nav');
    $_schemes_panel.classList.add('admin-schemes');

    Object.keys(this.Schemes).forEach(scheme => {
      let $_scheme_switcher = document.createElement('li');
      $_scheme_switcher.textContent = scheme;
      $_scheme_switcher.addEventListener('click', e => {
        this.clearContainer(this.$_data_container);
        this.$_data_container.appendChild(this.buildSchemaDataTable(this.Schemes[scheme]));
      });

      $_schemes_panel.appendChild($_scheme_switcher);
    });

    return $_schemes_panel;
  }

  buildOperationsPanel(schema) {
    let $_operations_panel = document.createElement('ul');
    $_operations_panel.classList.add('admin-schemes');

    for (let operation_key in schema.operations) {
      let $_operation_block = document.createElement('li');
      $_operation_block.textContent = operation_key;
      $_operation_block.addEventListener('click', e => {
        e.preventDefault();

        this.clearContainer(this.$_data_container);
        this.$_data_container.appendChild(this.buildOperationView(schema.operations[operation_key]));
      });

      $_operations_panel.appendChild($_operation_block);
    }

    return $_operations_panel;
  }

  buildOperationView(operation) {
    let operationFields = operation.getFields();

    let $_operation_section = document.createElement('div');
    $_operation_section.classList.add('operation-section');

    Object.keys(operationFields).forEach(field => {
      let $_field_container = document.createElement('div');
      $_field_container.classList.add('operation-section__field');

      let $_field_title = document.createElement('div');
      $_field_title.classList.add('operation-section__field-title');
      $_field_title.textContent = field;

      $_field_container.appendChild($_field_title);
      $_field_container.appendChild(operationFields[field].dom_view);

      $_operation_section.appendChild($_field_container);
    }, this);

    let $_confirm_button = document.createElement('button');
    $_confirm_button.textContent = "Confirm";
    $_confirm_button.addEventListener('click', e => {
      e.preventDefault();
      console.log(operation.getData(), "ss");
    });

    $_operation_section.appendChild($_confirm_button);

    return $_operation_section;
  }

  buildSchemaDataTable(schema) {
    let $_data_grid = document.createElement('table');
    let $_data_grid_items_title_container = document.createElement('tr');

    $_data_grid.classList.add('database-view');

    for (let key in schema.field) {
      let $_data_grid_item_title = document.createElement('th');
      $_data_grid_item_title.classList.add('database-item-title');
      $_data_grid_item_title.textContent = key.toString();

      $_data_grid_items_title_container.appendChild($_data_grid_item_title);
    }

    $_data_grid.appendChild($_data_grid_items_title_container);

    schema.setData()
      .then(fields => {
        fields.forEach(field => {
          let $_data_grid_items_container = document.createElement('tr');

          for (let key in field) {
            let $_data_grid_item = document.createElement('td');
            $_data_grid_item.classList.add('database-item');

            let $_grid_item_column = document.createElement('span');
            $_grid_item_column.classList.add('database-item-column');
            $_grid_item_column.textContent = JSON.stringify(field[key].value);

            $_data_grid_item.appendChild($_grid_item_column);

            $_data_grid_items_container.appendChild($_data_grid_item);
          }

          $_data_grid.appendChild($_data_grid_items_container);
        });
      });

    return $_data_grid;
  }

  clearContainer(container) {
    container.innerHTML = '';
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
