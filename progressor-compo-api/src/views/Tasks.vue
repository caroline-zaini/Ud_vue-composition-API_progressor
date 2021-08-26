<template>
  <div>
    <!-- On reçoit à l'enfant Modal la props task qui contient taskToEdit. On reçoit de l'enfant l'évènement updateTask qui exécutera la fonction updateTask() ainsi que cancel qui exécutera cancelEdit -->
    <!-- La modal s'affichera si isInEditMode sera à true grâce à la fonction toggle -->
    <Modal
      v-if="isInEditMode"
      :task="taskToEdit"
      @updatetask="updateTask($event)"
      @cancel="cancelEdit"
    />
    <input
      type="text"
      placeholder="filtrer"
      v-model="letters"
      @keyup="filter"
    />
    <!-- Bouton radio: -->
    <div class="radio-filters">
      <!-- comme le label pointe sur all, l'input doit avoir un id du même nom -->
      <label for="all">
        <input type="radio" id="all" value="" v-model="selectedTemporality" />
        toutes
      </label>
      <!-- selectedTemporality prendra lors du clique la valeur de short-term ou une chaîne vide ou medium-term ou long-term -->
      <label for="short-term">
        <input
          type="radio"
          id="short-term"
          value="short-term"
          v-model="selectedTemporality"
        />
        court terme
      </label>
      <label for="medium-term">
        <input
          type="radio"
          id="medium-term"
          value="medium-term"
          v-model="selectedTemporality"
        />
        moyen terme
      </label>
      <label for="long-term">
        <input
          type="radio"
          id="long-term"
          value="long-term"
          v-model="selectedTemporality"
        />
        long terme
      </label>
    </div>
    <!-- Avec v-if, on enlève et on rajoute du DOM, contrairement à v-show qui utilise du css pour masquer ou montrer: -->
    <div v-show="tasksFiltered && tasksFiltered.length > 0">
      <div class="task" v-for="task in tasksFiltered" :key="task.id">
        <h3>{{ task.name }}</h3>
        <p>{{ task.description }}</p>
        <p>Echéance : {{ convertCase(task.temporality) }}</p>
        <div>
          <!-- si on passe directement la fonction deleteTask, ça nous supprimerait toutes les tâches car elle a besoin d'avoir l'id, c'est pour cela qu'il faut appeler une fonction qui dans le corps de cette fonction appelera la fonction daleTask -->
          <button class="small" @click="() => deleteTask(task.id)">
            suppr
          </button>
          <button class="small" @click="() => toggle(task)">modif</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import tasksService from "@/services/tasks.js";
import Modal from "../components/Modal.vue";
export default {
  components: {
    Modal,
  },
  setup() {
    const tasks = ref([]);
    const letters = ref("");
    const selectedTemporality = ref("");
    let tasksFiltered = ref([]);
    let isInEditMode = ref(false);
    let taskToEdit = ref(null);
    // on injecte les résultats de read dans tasks:
    tasks.value = tasksService.read();
    // pour afficher les tasks au chargement:
    filter();
    console.log("mounted | tasks", tasks.value);
    ///////////////////////
    function convertCase(temporality) {
      return tasksService.convertCase(temporality);
    }
    ///////////////////////
    function filter() {
      if (letters.value.length === 0) {
        // on affiche toutes les tasks:
        tasksFiltered.value = tasks.value;
      } else {
        // on filtre sur toutes les task en minuscule qui contient letters et on affecte à taskFiltered:
        // filter va renvoyer un nouveau tableau avec les valeurs qui passe la condition
        tasksFiltered.value = tasks.value.filter((t) =>
          t.name.toLocaleLowerCase().includes(letters.value.toLocaleLowerCase())
        );
      }
      // Filtre sur la temporalité :
      // S'il y a quelque chose de sélectionné
      if (selectedTemporality.value !== "") {
        tasksFiltered.value = tasksFiltered.value.filter(
          (t) => t.temporality === selectedTemporality.value
        );
      }
    }
    ///////////////////////
    function toggle(task) {
      taskToEdit.value = task;
      isInEditMode.value = true;
    }
    ///////////////////////
    function updateTask(task) {
      tasksService.updateTask(task);
      //   Récupérer les dernières tasks pour mettre à jour:
      tasks.value = tasksService.read();
      filter();
      //   pour fermer la modal:
      cancelEdit();
    }
    ///////////////////////
    function cancelEdit() {
      isInEditMode.value = false;
      taskToEdit.value = null;
    }
    ///////////////////////
    function deleteTask(id) {
      tasksService.deleteTask(id);
      // Pour mettre à jour :
      tasks.value = tasksService.read();
      // Permet de rafraîchir le contenu de taskFiltered:
      filter();
    }
    ///////////////////////
    // watch détecte tout changement sur la propriété
    // Prend la valeur qu'on veut surveiller et un callback :
    watch(selectedTemporality, (newValue, oldValue) => {
      console.log("newValue: ", newValue, "oldValue: ", oldValue);
      //   Si on a sélectionné un temporalité avec le bouton radio:
      if (newValue !== "") {
        filter();
      } else {
        // take everything then filter
        tasksFiltered.value = tasks.value;
        filter();
      }
    });
    return {
      // comporte une propriété tasks dont la valeur sera tasks ... :
      tasks,
      letters,
      selectedTemporality,
      tasksFiltered,
      convertCase,
      filter,
      deleteTask,
      isInEditMode,
      taskToEdit,
      toggle,
      updateTask,
      cancelEdit,
    };
  },
};
</script>

<style>
.task {
  margin: 10px 15px;
  border: 3px solid #42b983;
  border-radius: 5px;
}
.radio-filters {
  display: flex;
  justify-content: center;
}
.small {
  width: 45px;
}
</style>
