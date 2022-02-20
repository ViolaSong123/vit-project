/**
 * 部门模块的校验规则
 */
import {reactive} from 'vue'
export default function useBaseModel() {
    const rules = reactive({})
    return {
        rules
    }
}