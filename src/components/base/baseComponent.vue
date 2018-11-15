<template>

</template>

<script>
  export default {
    name: "baseComponent",

    /**
     * 初始化数据
     */
    data() {
      return {}
    },

    /**
     * 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
     *
     */
    beforeCreate() {

    },

    /**
     *
     * 在实例创建完成后被立即调用
     * 类型 Function
     */
    created() {

    },

    /**
     * 在挂载开始之前被调用
     */
    beforeMount() {

    },

    /**
     *
     * 页面视图渲染完毕
     */
    mounted: function () {
      this.$nextTick(function () {
        if (!(this.init instanceof Function)) {
          throw new Error("组件必须实现 init 方法用于组件初始化");
        } else if (!(this.getValue instanceof Function)) {
          throw new Error("组件必须实现 getValue 方法用于组件初始化");
        } else if (!(this.clearValue instanceof Function)) {
          throw new Error("组件必须实现 clearValue 方法用于组件初始化");
        } else if (!(this.initValue instanceof Function)) {
          throw new Error("组件必须实现 initValue 方法用于组件初始化");
        }
      })
    },

    /**
     * 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
     */
    beforeUpdate() {

    },

    /**
     * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
     */
    updated() {

    },

    /**
     * keep-alive 组件激活时调用。
     */
    activated() {

    },

    /**
     * keep-alive 组件停用时调用。
     */
    deactivated() {

    },


    /**
     * 实例销毁之前调用。
     * 在这一步，实例仍然完全可用。
     */
    beforeDestroy() {
      this.clearValue();
      if (this.destroy) {
        this.destroy();
      }
    },
    /**
     * Vue 实例销毁后调用。调用后，
     * Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
     */
    destroyed() {
    },

    /**
     * 当捕获一个来自子孙组件的错误时被调用。
     * 此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。
     * 此钩子可以返回 false 以阻止该错误继续向上传播。
     */
    errorCaptured() {

    },

    /**
     * 事件处理
     * 方法中的 this 自动绑定为 Vue 实例
     */
    methods: {
      /**
       * 组件初始化
       */
      // init,
      /**
       * 获取组件的数据
       */
      // getValue,
      /**
       * 清空组件的默认值
       */
      // clearValue,
      /**
       * 异步获取数据后渲染数据
       */
      // initValue,
      /**
       * 释放组件数据
       */
      // destroy,
    }


  }
</script>

<style scoped>

</style>
