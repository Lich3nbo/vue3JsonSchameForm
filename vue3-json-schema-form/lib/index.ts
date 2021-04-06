import { defineComponent, h } from "@vue/runtime-core"

export default defineComponent({
  setup(p, { slots }) {
    return () => h("div", "this is form")
  },
})
