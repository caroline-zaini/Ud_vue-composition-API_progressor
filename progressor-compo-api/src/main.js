// les imports sans accolades sont des import par défaut avec le mot clef export default {}
import { createApp } from "vue";
import App from "./App.vue";
// C'est un proxy entre nous et internet donc si on n'a pas internet, l'application sera quand même accessible du faite que le serviceWorker aura mis en cache des éléments. Ca se met automatiquement quand on choisi de mettre l'option PWA lors de la création de l'app:
import "./registerServiceWorker";
import router from "./router";

createApp(App).use(router).mount("#app");
