<template>
    <div>
        <div ref="commonEchartRef" :style="{ height: height, width: width }"></div>
    </div>
</template>
<script setup lang='ts'>
import { ref, onMounted, watchEffect } from 'vue'
import useEcharts from '@/hooks/useEcharts';
//接收父组件传递的参数
//withDefaults:设置默认值
const props = withDefaults(defineProps<{
    width?: string,
    height: string,
    optios: any
}>(), {
    width: '100%',
    height: '360px'
})
//定义ref属性
const commonEchartRef = ref<HTMLElement>()
onMounted(() => {
    //叹号：断定commonEchartRef.value存在
    const { setOptions, resize } = useEcharts(commonEchartRef.value!)
    watchEffect(() => {
        setOptions(props.optios)
    })
    //自适应
    window.addEventListener('resize', () => {
        resize();
    })
})

</script>
<style scoped lang='scss'>
</style>