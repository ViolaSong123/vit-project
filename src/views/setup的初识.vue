<template>
  <span>{{ count }}</span>
</template>
 <script lang="ts">
import { defineComponent, ref } from "vue"
export default defineComponent({
    setup(props, ctx) {
        let count = ref(0)
        console.log(count)

        return {
            count
        }
    }
})
 </script>
 <style scoped>

     
 </style>