class Component {
  $target;
  // $props;
  $state;
  constructor($target) {
    this.$target = $target;
    // this.$props = $props;
    this.render();
  }
  setup() {}
  mounted() {}
  template() {
    return '';
  }
  async render() {
    await this.setup();
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
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
