import { bind } from 'utils';

class Component {
  $target;
  props;
  state;
  constructor($target, props) {
    this.init($target, props);
  }

  async init($target, props) {
    this.beforeCreate();

    this.$target = $target;
    this.props = props;

    await this.created();
    this.state = this.initState();
    await this.beforeMount();
    this.render();
    await this.mounted();
  }

  /* lifecycles */
  beforeCreate() {}
  created() {}
  beforeMount() {}
  mounted() {}
  beforeUpdate() {}
  updated() {}
  /* lifecycles */

  /* abstract methods */
  initState() {}
  template() {}
  setEvent() {}
  /* abstract methods */

  render() {
    const template = this.template();
    this.$target.innerHTML = bind.apply(this, [template]);
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.beforeUpdate();
    this.render();
    this.setEvent();
    this.updated();
  }

  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) =>
      children.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }
}

export default Component;
