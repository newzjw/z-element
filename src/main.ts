import { library } from '@fortawesome/fontawesome-svg-core';
// Font Awesome 图标组件
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createApp } from 'vue';
import App from './App.vue';
import './styles/index.css';
// fas 代表"Font Awesome Solid"（Font Awesome实心样式），它是Font Awesome库中实心样式图标的集合。
// 将所有实心样式图标添加到Font Awesome库中，使它们可以在Vue组件中使用。
library.add(fas);
// 创建Vue应用实例
const app = createApp(App)

// 全局注册FontAwesomeIcon组件
// app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');
