<template>
  <div>
    <!-- Form est un dumb component  -->
    <h3>Créer une tâche</h3>
    <!-- On écoute l'évènement submit -->
    <!-- prevent est un modificateur d'évènement. POur ne pas que la page se rafraîchisse -->
    <!-- POUR AVOIR LE FOCUS SUR l'input, On peut accéder à ref depuis le template -->
    <form @submit.prevent="createTask">
      <input
        type="text"
        placeholder="Nom de la tâche"
        v-model="name"
        ref="txtName"
      /><br />
      <textarea
        cols="30"
        rows="10"
        placeholder="Description de la tâche"
        v-model="description"
      ></textarea
      ><br />
      <select v-model="temporality">
        <!-- On veut la valeur sinon ce sera littérallement tempo.value -->
        <!-- key pour avoir une meilleure performance -->
        <option
          v-for="tempo in temporalityTypes"
          :value="tempo.value"
          :key="tempo.id"
        >
          {{ tempo.name }}
        </option></select
      ><br />
      <!-- si on ne fait pas le binding on aurait littéralement isFormValid et pas le variable: -->
      <button :disabled="!isFormValid">Créer</button>
    </form>
  </div>
</template>

<script>
// il faut importer une fonction qui s'appelle ref. :
import { ref, onMounted, computed } from "vue";
export default {
  name: "Form",
  // on doit mettre le nom de l'emits qu'on a créé:
  emits: ["createtask"],
  // Grâce à setup on créer des références qui nous permettent de pointer quelque chose qui sera associer au champs texte
  // props : sont les props passés au composent
  // contexte est un objet qui comporte beaucoup de méthodes utilitaires dont la méthode emit.
  setup(props, context) {
    ////////////////////////////////////////
    // ref : Quand on associera le name avec le template ça récupèrera les saisies faites par l'utilisateur.
    // ref va créer un objet qui aura une propriété value
    // ref("") au départ se sera une chaîne vide
    const name = ref("");
    const description = ref("");
    const temporalityTypes = ref([
      {
        id: 1,
        name: "court terme",
        value: "short-term",
      },
      {
        id: 2,
        name: "moyen terme",
        value: "medium-term",
      },
      {
        id: 3,
        name: "long terme",
        value: "long-term",
      },
    ]);
    const temporality = ref("");
    let txtName = ref(null);
    // computed est une fonction qui prend en paramètre une fonction:
    const isFormValid = computed(() => {
      if (
        name.value !== "" &&
        description.value !== "" &&
        temporality.value !== ""
      ) {
        return true;
      } else {
        return false;
      }
    });
    ////////////////////////////////////////
    function createTask() {
      const task = {
        // nombre de miliseconde écoulées depuis le 1er jan 1970
        id: Date.now(),
        // value permet de récupérer la saisie rentrée par l'user grâce à v-model
        name: name.value,
        description: description.value,
        temporality: temporality.value,
      };
      // Pour enlever l'erreur :
      console.log("task", task);
      // on appel ce custom event createTask en minuscule (pour ne pas avoir de problème de casse) et on envoie la task qu'on a créée :
      context.emit("createtask", task);
      resetForm();
    }
    ////////////////////////////////////////
    // Pour vider le formulaire visuellement :
    function resetForm() {
      name.value = "";
      description.value = "";
      temporality.value = "";
      // Pour avoir LE FOCUS lors de l'envoie du form:
      txtName.value.focus();
    }
    ////////////////////////////////////////
    // Utilisation de onMounted (quand le composant est monté donc au chargement de la page) pour LE FOCUS:
    onMounted(() => {
      txtName.value.focus();
    });

    // Pour que ces propriétés soient accessibles depuis le template il faut retourner un objet qui aura un ensemble de clef / valeur:
    return {
      name,
      description,
      temporalityTypes,
      temporality,
      createTask,
      txtName,
      isFormValid,
    };
  },
};
</script>

<style scoped>
/* scoped pour que ce style ne s'applique qu'à ce component */
input,
textarea,
select,
button {
  width: 90%;
  margin: 5px 10px;
}
</style>
