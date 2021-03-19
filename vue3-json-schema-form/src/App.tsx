import { createApp, defineComponent, h, reactive, ref, Ref } from "vue"

import { createUseStyles } from "vue-jss"

import MonacoEditor from "./components/MonacoEditor"

function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}

const useStyles = createUseStyles({
  editor: {
    minHeight: 400,
  },
})

const schema = {
  type: "string",
}

export default defineComponent({
  setup() {
    const schemaRef: Ref<any> = ref(schema)

    const handleCodeChange = (code: string) => {
      let schema: any
      try {
        schema = JSON.parse(code)
      } catch (err) {
        console.log(
          "%c 🥕 err: ",
          "font-size:20px;background-color: #93C0A4;color:#fff;",
          err,
        )
      }
      schemaRef.value = schema
    }
    const classesRef = useStyles()
    // 闭包  响应式数据发生改变 return 的函数会执行一次
    return () => {
      const code = toJson(schemaRef.value)
      const classes = classesRef.value
      // 子函数可以访问父函数的变量
      return (
        <div>
          <MonacoEditor
            code={code}
            onChange={handleCodeChange}
            title="Schema"
            class={classes.editor}
          />
        </div>
      )
    }
  },
})
