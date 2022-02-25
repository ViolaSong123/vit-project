import { getCurrentInstance, ComponentInternalInstance } from "vue";

export default function useInstance() {
  // as=>添加断言，不要用ctx,因为它只在开发环境能拿到值，生产环境拿不到，如果要拿实例的话，取proxy
  const { appContext, proxy } =
    getCurrentInstance() as ComponentInternalInstance;
  const global = appContext.config.globalProperties;
  return {
    proxy,
    global,
  };
}
