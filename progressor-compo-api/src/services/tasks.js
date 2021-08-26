let tasks = [];
const storageKey = "tasks-vue3-compo-api-draft";

////////////////////////
function create(task) {
  // On ajoute la nouvelle task (c'est la dernière saisie qui se retrouvera en tête) puis toutes celles qui pééxistaient à l'aide du spread opérator
  if (tasks === null) {
    tasks = [];
  }
  tasks = [task, ...tasks];
  console.log("tasks", tasks);
  save();
}
////////////////////////
function read() {
  tasks = retrieveTasks();
  return tasks;
}
////////////////////////
function updateTask(task) {
  // findIndex : renvoie l'indice du premier élément du tableau qui satisfait une condition
  // pour chaque task on veut vérifier si son id est égal à l'id de la task passé en paramètre:

  const index = tasks.findIndex((t) => t.id === task.id);
  console.log("index", index);
  if (index === -1) {
    // ce qui veut dire que la task n'a pas été trouvée dans le tableau et bien on sort de cette fonction:

    return;
  }
  tasks[index] = task;
  save();
}
////////////////////////
function deleteTask(id) {
  // filter nous retourne un nouveau tableau avec les éléments qui passent la condition.
  //  ici, il contiendra tous sauf la tâche à supprimer
  tasks = tasks.filter((t) => t.id !== id);
  save();
}
////////////////////////
function convertCase(temporalityKebabCase) {
  let result;
  switch (temporalityKebabCase) {
    case "short-term":
      result = "court terme";
      break;
    case "medium-term":
      result = "moyen terme";
      break;
    case "long-term":
      result = "long terme";
      break;
    default:
      result = temporalityKebabCase;
      break;
  }
  return result;
}
////////////////////////
// Pour sauvegarder dans le LOCAL STORAGE:
// on a pas besoin d'ajouter ces 2 fonctions au tableau des export car elles seront à usage interne
function save() {
  // Pour accéder au localStorage c'est quelque chose de natif donc mis à disposition:
  // Le localStorage ne peut contenir que des string donc on fait un JSON.stringify()
  // setItem() : pour enregistrer un item
  // 1er arg : une clef et la bonne pratique est la déclarer dans une constante
  // 2eme arg : ce que l'on veut stocker
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}
////////////////////////
// Pour récupérer nos tâches depuis le LOCAL STORAGE:
function retrieveTasks() {
  // getItem() :pour récupérer un item par le nom de sa clef

  const fromLocalstorage = localStorage.getItem(storageKey);
  // Comme il est stringifier, il faut maintenant à le parser:

  return JSON.parse(fromLocalstorage);
}
////////////////////////
// On rend la fonction à l'aide d'un export par défaut qui sera un objet qui aura comme propriété create qui correspondra à la méthode create. Idem pour read et convertCase:

export default {
  create,
  read,
  updateTask,
  deleteTask,
  convertCase,
};
