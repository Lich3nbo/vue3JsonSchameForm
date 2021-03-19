const Ajv = require("ajv").default
const localize = require("ajv-i18n")


const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      // format: 'test'
      // test: true,
      minLength: 10,
      errorMessage: {
        type: '类型必须是字符串',
        // minLength: '长度必须是10'
      }
    },
    age: {
      type: 'number'
    },
    pets: {
      type: 'array'
    },
    isWorker: {
      type: 'boolean'
    },
  },
  required: ['name', 'age']
}
const ajv = new Ajv({ allErrors: true}) // options can be passed, e.g. {allErrors: true}
require('ajv-errors')(ajv)


ajv.addKeyword({
  keyword: 'test',
  // validate: (schema, data) => {
  //   console.log(schema, data, '---------------');
  //   return data === 'hh'
  // },
  // compile: (sch, parentSchema) => {
  //   console.log(sch, parentSchema, '---------');
  //   return (data) =>  data === 'hh'
  // },
  macro: (sch, parentSchema) => {
    console.log(sch, parentSchema, '---------');
    return {
      minLength: 10
    }
  },
  metaSchema: {
    type: 'boolean'
  }
})

// ajv.addFormat('test',(data)=>{
//   console.log(data, '----------------');
//   return 'haha' === data
// })


const validate = ajv.compile(schema) // 创建编译器

const validData = {
  name: 'hh',
  age: 18,
  pets: ['momo', 'mingjiu'],
  isWorker: true
}

const valid = validate(validData)
if (!valid) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}