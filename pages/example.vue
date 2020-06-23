<template>
  <div class="container">
    <Button>示例</Button>
    <Icon class="el-icon-edit"></Icon>
    <ElInput v-model="input" placeholder="请输入内容"></ElInput>
  </div>
</template>

<script>
import { Button, Icon, Message, Input } from 'element-ui'
export default {
  components: {
    Icon,
    ElInput: Input,
    Button
  },
  data() {
    return {
      input: 123
    }
  },
  mounted() {
    Message({
      type: 'warning',
      message: '21343'
    })
    console.log('111') //eslint-disable-line
  }
}
</script>

<style scoped></style>
