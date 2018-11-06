//自动聚焦
Vue.directive("focus", {
  inserted: function(el, binding) {
    el.focus();
    if (binding.value) {
      //e.lfocus();
    }
  }
});
