import { createApp } from "vue";
import ElementPlus from "element-plus";

import App from "./App.vue";
import router from "./routes";
import "./style.css";

const app = createApp(App);
app.use(router);
app.use(ElementPlus);

app.mount("#app");
