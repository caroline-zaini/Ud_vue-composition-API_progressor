<template>
  <!-- Home est un smart component  -->
  <div class="home">
    <HelloWorld msg="Progressor compo-api)" />
    <!-- createtask est envoyé avec emit depuis le composant enfant -->
    <Form @createtask="addTask" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Form from "@/components/Form.vue";
// on a un export par défaut dans task.js donc on peut le nommé comme on veut ici taskService :
import tasksService from "@/services/tasks.js";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Form,
  },
  setup() {
    // data car on passe task en paramètre de l'emit :
    function addTask(data) {
      console.log("Home.vue | addTask()", data);
      tasksService.create(data);
    }
    return {
      addTask,
    };
  },
};
</script>
