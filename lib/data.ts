"use server"

// Sample data to replace database queries
// This mimics the structure of your database tables

// Sample categories
let categories = [
  {
    id: 1,
    name: "Trabajo",
    description: "Elementos relacionados con el trabajo",
    creation: "2023-12-15T09:00:00Z",
  },
  {
    id: 2,
    name: "Personal",
    description: "Tareas y notas personales",
    creation: "2023-12-15T09:05:00Z",
  },
  {
    id: 3,
    name: "Salud",
    description: "Salud y fitness",
    creation: "2023-12-15T09:10:00Z",
  },
  {
    id: 4,
    name: "Aprendizaje",
    description: "Actividades educativas",
    creation: "2023-12-15T09:15:00Z",
  },
]

// Sample tasks
let tasks = [
  {
    id: 1,
    title: "Completar propuesta de proyecto",
    description: "Redactar la propuesta inicial para el nuevo cliente",
    creation: "2023-12-20T10:30:00Z",
  },
  {
    id: 2,
    title: "Ir al supermercado",
    description: "Comprar frutas, verduras y leche",
    creation: "2023-12-21T14:45:00Z",
  },
  {
    id: 3,
    title: "Correr por la mañana",
    description: "Correr 5km en el parque",
    creation: "2023-12-22T08:00:00Z",
  },
  {
    id: 4,
    title: "Estudiar PostgreSQL",
    description: "Aprender sobre diseño de bases de datos y consultas SQL",
    creation: "2023-12-23T16:20:00Z",
  },
  {
    id: 5,
    title: "Reunión con el equipo",
    description: "Discutir el progreso del proyecto actual",
    creation: "2024-01-05T09:30:00Z",
  },
  {
    id: 6,
    title: "Preparar presentación",
    description: "Crear diapositivas para la reunión del viernes",
    creation: "2024-01-12T11:15:00Z",
  },
  {
    id: 7,
    title: "Revisar documentación",
    description: "Leer la documentación actualizada del proyecto",
    creation: "2024-01-18T14:00:00Z",
  },
  {
    id: 8,
    title: "Actualizar CV",
    description: "Añadir proyectos recientes al currículum",
    creation: "2024-01-25T17:45:00Z",
  },
  {
    id: 9,
    title: "Llamar al médico",
    description: "Programar cita para chequeo anual",
    creation: "2024-02-02T10:00:00Z",
  },
  {
    id: 10,
    title: "Pagar facturas",
    description: "Pagar facturas de servicios públicos",
    creation: "2024-02-10T16:30:00Z",
  },
  {
    id: 11,
    title: "Limpiar el garaje",
    description: "Organizar y limpiar el garaje",
    creation: "2024-02-15T09:00:00Z",
  },
  {
    id: 12,
    title: "Planificar vacaciones",
    description: "Investigar destinos y precios para las vacaciones de verano",
    creation: "2024-02-22T13:45:00Z",
  },
  {
    id: 13,
    title: "Comprar regalo de cumpleaños",
    description: "Encontrar un regalo para el cumpleaños de mamá",
    creation: "2024-03-01T11:30:00Z",
  },
  {
    id: 14,
    title: "Revisar plan de ahorro",
    description: "Actualizar y revisar el plan de ahorro mensual",
    creation: "2024-03-08T15:20:00Z",
  },
  {
    id: 15,
    title: "Actualizar software",
    description: "Instalar actualizaciones pendientes en el ordenador",
    creation: "2024-03-14T09:45:00Z",
  },
]

// Sample notes
let notes = [
  {
    id: 1,
    title: "Ideas de proyecto",
    content:
      "Lista de ideas potenciales de proyectos para Q2:\n- Aplicación móvil para seguimiento de fitness\n- Rediseño de plataforma de comercio electrónico\n- Sistema de recomendación de contenido con IA",
    creation: "2023-12-18T11:30:00Z",
  },
  {
    id: 2,
    title: "Lista de compras",
    content:
      "Artículos para comprar este fin de semana:\n- Comestibles\n- Zapatillas nuevas para correr\n- Regalo de cumpleaños para mamá",
    creation: "2023-12-19T09:15:00Z",
  },
  {
    id: 3,
    title: "Plan de entrenamiento",
    content:
      "Rutina de ejercicio semanal:\n- Lunes: Parte superior del cuerpo\n- Miércoles: Parte inferior del cuerpo\n- Viernes: Cardio\n- Sábado: Cuerpo completo",
    creation: "2023-12-20T17:45:00Z",
  },
  {
    id: 4,
    title: "Recetas saludables",
    content:
      "Recetas para probar:\n- Ensalada de quinoa con verduras asadas\n- Batido de proteínas con frutas del bosque\n- Pollo al horno con hierbas",
    creation: "2024-01-08T12:30:00Z",
  },
  {
    id: 5,
    title: "Libros para leer",
    content:
      "Lista de lectura 2024:\n- 'Atomic Habits' de James Clear\n- 'Deep Work' de Cal Newport\n- 'The Psychology of Money' de Morgan Housel",
    creation: "2024-01-15T16:45:00Z",
  },
  {
    id: 6,
    title: "Objetivos trimestrales",
    content:
      "Objetivos para Q1 2024:\n- Completar curso online de desarrollo web\n- Establecer rutina de ejercicio consistente\n- Leer al menos 3 libros",
    creation: "2024-01-22T10:15:00Z",
  },
  {
    id: 7,
    title: "Ideas de decoración",
    content:
      "Ideas para redecorar el salón:\n- Cambiar el sofá por uno modular\n- Añadir plantas de interior\n- Instalar nuevas estanterías",
    creation: "2024-02-05T14:30:00Z",
  },
  {
    id: 8,
    title: "Películas recomendadas",
    content: "Películas para ver:\n- 'Everything Everywhere All at Once'\n- 'The Shawshank Redemption'\n- 'Parasite'",
    creation: "2024-02-12T19:00:00Z",
  },
  {
    id: 9,
    title: "Planificación financiera",
    content:
      "Pasos para mejorar finanzas personales:\n- Crear presupuesto mensual\n- Establecer fondo de emergencia\n- Revisar inversiones actuales",
    creation: "2024-02-19T11:45:00Z",
  },
  {
    id: 10,
    title: "Ideas de regalo",
    content:
      "Ideas de regalo para cumpleaños y aniversarios:\n- Experiencias (conciertos, clases, viajes)\n- Libros personalizados\n- Tecnología útil",
    creation: "2024-03-03T13:20:00Z",
  },
  {
    id: 11,
    title: "Frases inspiradoras",
    content:
      "Frases para recordar:\n- 'El éxito es la suma de pequeños esfuerzos repetidos día tras día.'\n- 'No es lo que sabes, es lo que haces con lo que sabes.'\n- 'La disciplina es elegir entre lo que quieres ahora y lo que quieres más.'",
    creation: "2024-03-10T16:15:00Z",
  },
]

// Sample habits
let habits = [
  {
    id: 1,
    name: "Meditación diaria",
    creation: "2023-12-15T10:00:00Z",
  },
  {
    id: 2,
    name: "Revisión semanal",
    creation: "2023-12-16T11:30:00Z",
  },
  {
    id: 3,
    name: "Ejercicio matutino",
    creation: "2023-12-17T08:45:00Z",
  },
]

// Relationship tables
let taskCategories = [
  { taskId: 1, categoryId: 1 }, // Work task
  { taskId: 2, categoryId: 2 }, // Personal task
  { taskId: 3, categoryId: 3 }, // Health task
  { taskId: 4, categoryId: 4 }, // Learning task
  { taskId: 5, categoryId: 1 },
  { taskId: 6, categoryId: 1 },
  { taskId: 7, categoryId: 4 },
  { taskId: 8, categoryId: 2 },
  { taskId: 9, categoryId: 3 },
  { taskId: 10, categoryId: 2 },
  { taskId: 11, categoryId: 2 },
  { taskId: 12, categoryId: 2 },
  { taskId: 13, categoryId: 2 },
  { taskId: 14, categoryId: 2 },
  { taskId: 15, categoryId: 1 },
]

let noteCategories = [
  { noteId: 1, categoryId: 1 }, // Work note
  { noteId: 2, categoryId: 2 }, // Personal note
  { noteId: 3, categoryId: 3 }, // Health note
  { noteId: 4, categoryId: 3 },
  { noteId: 5, categoryId: 4 },
  { noteId: 6, categoryId: 1 },
  { noteId: 7, categoryId: 2 },
  { noteId: 8, categoryId: 2 },
  { noteId: 9, categoryId: 2 },
  { noteId: 10, categoryId: 2 },
  { noteId: 11, categoryId: 4 },
]

let habitCategories = [
  { habitId: 1, categoryId: 3 }, // Health habit
  { habitId: 2, categoryId: 1 }, // Work habit
  { habitId: 3, categoryId: 3 }, // Health habit
]

let noteTasks = [
  { noteId: 1, taskId: 1 }, // Project ideas note linked to project proposal task
  { noteId: 2, taskId: 2 }, // Shopping list note linked to grocery shopping task
  { noteId: 3, taskId: 3 }, // Workout plan note linked to morning run task
]

let habitTasks = [
  { habitId: 3, taskId: 3 }, // Morning exercise habit linked to morning run task
]

let habitNotes = [
  { habitId: 3, noteId: 3 }, // Morning exercise habit linked to workout plan note
]

// Helper function to get the next ID for a collection
function getNextId(collection) {
  return Math.max(0, ...collection.map((item) => item.id)) + 1
}

// Dashboard stats
export async function fetchStats() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    tasks: tasks.length,
    notes: notes.length,
    habits: habits.length,
    categories: categories.length,
  }
}

// Recent items for dashboard
export async function fetchRecentItems() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.creation).getTime() - new Date(a.creation).getTime())
    .slice(0, 5)
    .map(({ id, title, creation }) => ({ id, title, creation }))

  const recentNotes = [...notes]
    .sort((a, b) => new Date(b.creation).getTime() - new Date(a.creation).getTime())
    .slice(0, 5)
    .map(({ id, title, creation }) => ({ id, title, creation }))

  const recentHabits = [...habits]
    .sort((a, b) => new Date(b.creation).getTime() - new Date(a.creation).getTime())
    .slice(0, 5)
    .map(({ id, name: title, creation }) => ({ id, title, creation }))

  return {
    tasks: recentTasks,
    notes: recentNotes,
    habits: recentHabits,
  }
}

// Activity data for calendar heatmap
export async function fetchActivityData(type: "tasks" | "notes") {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const collection = type === "tasks" ? tasks : notes

  // Get dates from the last 90 days
  const today = new Date()
  const ninetyDaysAgo = new Date(today)
  ninetyDaysAgo.setDate(today.getDate() - 90)

  // Create a map of dates to counts
  const activityMap = new Map()

  // Initialize all dates with 0 count
  for (let d = new Date(ninetyDaysAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0]
    activityMap.set(dateStr, 0)
  }

  // Count items per date
  collection.forEach((item) => {
    const dateStr = new Date(item.creation).toISOString().split("T")[0]
    if (activityMap.has(dateStr)) {
      activityMap.set(dateStr, activityMap.get(dateStr) + 1)
    }
  })

  // Add some random activity for demonstration
  for (let i = 0; i < 30; i++) {
    const randomDaysAgo = Math.floor(Math.random() * 90)
    const randomDate = new Date(today)
    randomDate.setDate(today.getDate() - randomDaysAgo)
    const dateStr = randomDate.toISOString().split("T")[0]
    if (activityMap.has(dateStr)) {
      activityMap.set(dateStr, activityMap.get(dateStr) + Math.floor(Math.random() * 3))
    }
  }

  // Convert map to array of objects
  const activityData = Array.from(activityMap.entries()).map(([date, count]) => ({
    date,
    count,
  }))

  return activityData
}

// Tasks with categories
export async function fetchTasks() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return tasks.map((task) => {
    const taskCategoryIds = taskCategories.filter((tc) => tc.taskId === task.id).map((tc) => tc.categoryId)

    const taskCats = categories.filter((cat) => taskCategoryIds.includes(cat.id)).map(({ id, name }) => ({ id, name }))

    return {
      ...task,
      categories: taskCats,
    }
  })
}

// Create a new task
export async function createTask({ title, description, categoryIds = [] }) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  const newTaskId = getNextId(tasks)
  const newTask = {
    id: newTaskId,
    title,
    description,
    creation: new Date().toISOString(),
  }

  tasks.push(newTask)

  // Add task categories
  categoryIds.forEach((categoryId) => {
    taskCategories.push({
      taskId: newTaskId,
      categoryId,
    })
  })

  return { id: newTaskId }
}

// Delete a task
export async function deleteTask(id) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Remove task categories
  taskCategories = taskCategories.filter((tc) => tc.taskId !== id)

  // Remove note tasks
  noteTasks = noteTasks.filter((nt) => nt.taskId !== id)

  // Remove habit tasks
  habitTasks = habitTasks.filter((ht) => ht.taskId !== id)

  // Remove the task
  tasks = tasks.filter((task) => task.id !== id)

  return { success: true }
}

// Notes with categories
export async function fetchNotes() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  return notes.map((note) => {
    const noteCategoryIds = noteCategories.filter((nc) => nc.noteId === note.id).map((nc) => nc.categoryId)

    const noteCats = categories.filter((cat) => noteCategoryIds.includes(cat.id)).map(({ id, name }) => ({ id, name }))

    return {
      ...note,
      categories: noteCats,
    }
  })
}

// Create a new note
export async function createNote({ title, content, categoryIds = [] }) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  const newNoteId = getNextId(notes)
  const newNote = {
    id: newNoteId,
    title,
    content,
    creation: new Date().toISOString(),
  }

  notes.push(newNote)

  // Add note categories
  categoryIds.forEach((categoryId) => {
    noteCategories.push({
      noteId: newNoteId,
      categoryId,
    })
  })

  return { id: newNoteId }
}

// Delete a note
export async function deleteNote(id) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Remove note categories
  noteCategories = noteCategories.filter((nc) => nc.noteId !== id)

  // Remove note tasks
  noteTasks = noteTasks.filter((nt) => nt.noteId !== id)

  // Remove habit notes
  habitNotes = habitNotes.filter((hn) => hn.noteId !== id)

  // Remove the note
  notes = notes.filter((note) => note.id !== id)

  return { success: true }
}

// Habits with categories
export async function fetchHabits() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  return habits.map((habit) => {
    const habitCategoryIds = habitCategories.filter((hc) => hc.habitId === habit.id).map((hc) => hc.categoryId)

    const habitCats = categories
      .filter((cat) => habitCategoryIds.includes(cat.id))
      .map(({ id, name }) => ({ id, name }))

    return {
      ...habit,
      categories: habitCats,
    }
  })
}

// Create a new habit
export async function createHabit({ name, categoryIds = [] }) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  const newHabitId = getNextId(habits)
  const newHabit = {
    id: newHabitId,
    name,
    creation: new Date().toISOString(),
  }

  habits.push(newHabit)

  // Add habit categories
  categoryIds.forEach((categoryId) => {
    habitCategories.push({
      habitId: newHabitId,
      categoryId,
    })
  })

  return { id: newHabitId }
}

// Delete a habit
export async function deleteHabit(id) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Remove habit categories
  habitCategories = habitCategories.filter((hc) => hc.habitId !== id)

  // Remove habit tasks
  habitTasks = habitTasks.filter((ht) => ht.habitId !== id)

  // Remove habit notes
  habitNotes = habitNotes.filter((hn) => hn.habitId !== id)

  // Remove the habit
  habits = habits.filter((habit) => habit.id !== id)

  return { success: true }
}

// Categories
export async function fetchCategories() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return categories
}

// Create a new category
export async function createCategory({ name, description }) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  const newCategoryId = getNextId(categories)
  const newCategory = {
    id: newCategoryId,
    name,
    description,
    creation: new Date().toISOString(),
  }

  categories.push(newCategory)

  return { id: newCategoryId }
}

// Delete a category
export async function deleteCategory(id) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Remove task categories
  taskCategories = taskCategories.filter((tc) => tc.categoryId !== id)

  // Remove note categories
  noteCategories = noteCategories.filter((nc) => nc.categoryId !== id)

  // Remove habit categories
  habitCategories = habitCategories.filter((hc) => hc.categoryId !== id)

  // Remove the category
  categories = categories.filter((category) => category.id !== id)

  return { success: true }
}

