"use server"

import { TaskService, CategoryService, NoteService, HabitService, DashboardService } from "./api"

// Función para formatear fechas para la visualización de actividad
function formatDateForActivity(date: Date): string {
  return date.toISOString().split("T")[0]
}

// Función para generar datos de actividad para el calendario
export async function fetchActivityData(type: "tasks" | "notes") {
  try {
    // Obtener todas las tareas o notas
    const items = type === "tasks" ? await TaskService.getAllTasks() : await NoteService.getAllNotes()

    // Crear un mapa de fechas a conteos
    const activityMap = new Map<string, number>()

    // Obtener fechas de los últimos 90 días
    const today = new Date()
    const ninetyDaysAgo = new Date(today)
    ninetyDaysAgo.setDate(today.getDate() - 90)

    // Inicializar todas las fechas con conteo 0
    for (let d = new Date(ninetyDaysAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = formatDateForActivity(d)
      activityMap.set(dateStr, 0)
    }

    // Contar elementos por fecha
    items.forEach((item) => {
      if (item.creation) {
        const dateStr = new Date(item.creation).toISOString().split("T")[0]
        if (activityMap.has(dateStr)) {
          activityMap.set(dateStr, (activityMap.get(dateStr) || 0) + 1)
        }
      }
    })

    // Convertir mapa a array de objetos
    const activityData = Array.from(activityMap.entries()).map(([date, count]) => ({
      date,
      count,
    }))

    return activityData
  } catch (error) {
    console.error(`Error fetching ${type} activity data:`, error)
    throw error
  }
}

// Estadísticas del dashboard
export async function fetchStats() {
  try {
    const stats = await DashboardService.getDashboardStats()
    return {
      tasks: stats.taskCount,
      notes: stats.noteCount,
      habits: stats.habitCount,
      categories: stats.categoryCount,
    }
  } catch (error) {
    console.error("Error fetching stats:", error)
    // Devolver valores predeterminados en caso de error
    return {
      tasks: 0,
      notes: 0,
      habits: 0,
      categories: 0,
    }
  }
}

// Elementos recientes para el dashboard
export async function fetchRecentItems() {
  try {
    // Obtener todos los elementos
    const [tasks, notes, habits] = await Promise.all([
      TaskService.getAllTasks(),
      NoteService.getAllNotes(),
      HabitService.getAllHabits(),
    ])

    // Formatear tareas recientes
    const recentTasks = tasks
      .sort((a, b) => new Date(b.creation || "").getTime() - new Date(a.creation || "").getTime())
      .slice(0, 5)
      .map(({ id, title, creation }) => ({ id, title, creation }))

    // Formatear notas recientes
    const recentNotes = notes
      .sort((a, b) => new Date(b.creation || "").getTime() - new Date(a.creation || "").getTime())
      .slice(0, 5)
      .map(({ id, title, creation }) => ({ id, title, creation }))

    // Formatear hábitos recientes
    const recentHabits = habits
      .sort((a, b) => new Date(b.creation || "").getTime() - new Date(a.creation || "").getTime())
      .slice(0, 5)
      .map(({ id, name: title, creation }) => ({ id, title, creation }))

    return {
      tasks: recentTasks,
      notes: recentNotes,
      habits: recentHabits,
    }
  } catch (error) {
    console.error("Error fetching recent items:", error)
    // Devolver valores predeterminados en caso de error
    return {
      tasks: [],
      notes: [],
      habits: [],
    }
  }
}

// Tareas con categorías
export async function fetchTasks() {
  try {
    const tasks = await TaskService.getAllTasks()
    return tasks
  } catch (error) {
    console.error("Error fetching tasks:", error)
    throw error
  }
}

// Crear una nueva tarea
export async function createTask({
  title,
  description,
  categoryIds = [],
  creation, // Added creation
}: {
  title: string
  description: string
  categoryIds?: number[]
  creation?: Date // Added creation
}) {
  try {
    // Crear la tarea
    const newTask = await TaskService.createTask({ title, description, creation: creation?.toISOString() }) // Added creation

    // Agregar categorías a la tarea
    if (categoryIds.length > 0) {
      await Promise.all(categoryIds.map((categoryId) => TaskService.addCategoryToTask(newTask.id!, categoryId)))
    }

    return { id: newTask.id }
  } catch (error) {
    console.error("Error creating task:", error)
    throw error
  }
}

// Eliminar una tarea
export async function deleteTask(id: number) {
  try {
    await TaskService.deleteTask(id)
    return { success: true }
  } catch (error) {
    console.error("Error deleting task:", error)
    throw error
  }
}

// Notas con categorías
export async function fetchNotes() {
  try {
    const notes = await NoteService.getAllNotes()
    return notes
  } catch (error) {
    console.error("Error fetching notes:", error)
    throw error
  }
}

// Crear una nueva nota
export async function createNote({
  title,
  content,
  categoryIds = [],
  creation, // Added creation
}: {
  title: string
  content: string
  categoryIds?: number[]
  creation?: Date // Added creation
}) {
  try {
    // Crear la nota
    const newNote = await NoteService.createNote({ title, note: content, creation: creation?.toISOString() }); // Added creation

    // Agregar categorías a la nota
    if (categoryIds.length > 0) {
      await Promise.all(
        categoryIds.map((categoryId) =>
          fetch(`${process.env.API_BASE_URL}/notes/${newNote.id}/categories/${categoryId}`, {
            method: "POST",
          }),
        ),
      )
    }

    return { id: newNote.id }
  } catch (error) {
    console.error("Error creating note:", error)
    throw error
  }
}

// Eliminar una nota
export async function deleteNote(id: number) {
  try {
    await NoteService.deleteNote(id)
    return { success: true }
  } catch (error) {
    console.error("Error deleting note:", error)
    throw error
  }
}

// Hábitos con categorías
export async function fetchHabits() {
  try {
    const habits = await HabitService.getAllHabits()
    return habits
  } catch (error) {
    console.error("Error fetching habits:", error)
    throw error
  }
}

// Crear un nuevo hábito
export async function createHabit({
  name,
  categoryIds = [],
  creation, // Added creation
}: {
  name: string
  categoryIds?: number[]
  creation?: Date // Added creation
}) {
  try {
    // Crear el hábito
    const newHabit = await HabitService.createHabit({ name, creation: creation?.toISOString() }); // Added creation

    // Agregar categorías al hábito
    if (categoryIds.length > 0) {
      await Promise.all(
        categoryIds.map((categoryId) =>
          fetch(`${process.env.API_BASE_URL}/habits/${newHabit.id}/categories/${categoryId}`, {
            method: "POST",
          }),
        ),
      )
    }

    return { id: newHabit.id }
  } catch (error) {
    console.error("Error creating habit:", error)
    throw error
  }
}

// Eliminar un hábito
export async function deleteHabit(id: number) {
  try {
    await HabitService.deleteHabit(id)
    return { success: true }
  } catch (error) {
    console.error("Error deleting habit:", error)
    throw error
  }
}

// Categorías
export async function fetchCategories() {
  try {
    const categories = await CategoryService.getAllCategories()
    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

// Crear una nueva categoría
export async function createCategory({ name, description, creation }: { name: string; description: string; creation?: Date }) { // Added creation
  try {
    const newCategory = await CategoryService.createCategory({ name, description, creation: creation?.toISOString() }) // Added creation
    return { id: newCategory.id }
  } catch (error) {
    console.error("Error creating category:", error)
    throw error
  }
}

// Eliminar una categoría
export async function deleteCategory(id: number) {
  try {
    await CategoryService.deleteCategory(id)
    return { success: true }
  } catch (error) {
    console.error("Error deleting category:", error)
    throw error
  }
} 