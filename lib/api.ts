// Definición de tipos basados en las entidades de la API
export interface Task {
  id?: number
  title: string
  description: string
  creation?: string
  categories?: Category[]
  notes?: Note[]
  habits?: Habit[]
}

export interface Category {
  id?: number
  name: string
  description: string
  creation?: string
  tasks?: Task[]
  notes?: Note[]
  habits?: Habit[]
}

export interface Note {
  id?: number
  title: string
  note: string // Contenido de la nota
  creation?: string
  categories?: Category[]
  tasks?: Task[]
  habits?: Habit[]
}

export interface Habit {
  id?: number
  name: string
  creation?: string
  categories?: Category[]
  notes?: Note[]
  tasks?: Task[]
}

export interface DashboardStats {
  categoryCount: number
  taskCount: number
  noteCount: number
  habitCount: number
  totalEntities: number
}

// URL base de la API
const API_BASE_URL = "http://localhost:8080"

// Función genérica para manejar errores de fetch
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Error ${response.status}: ${errorText}`)
  }
  return response.json() as Promise<T>
}

// Servicios para Tasks
export const TaskService = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/tasks`)
    return handleResponse<Task[]>(response)
  },

  getTaskById: async (id: number): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`)
    return handleResponse<Task>(response)
  },

  createTask: async (task: Task): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
    return handleResponse<Task>(response)
  },

  updateTask: async (id: number, task: Task): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
    return handleResponse<Task>(response)
  },

  deleteTask: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Error ${response.status}: ${errorText}`)
    }
  },

  getTaskCategories: async (id: number): Promise<Category[]> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}/categories`)
    return handleResponse<Category[]>(response)
  },

  addCategoryToTask: async (taskId: number, categoryId: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/categories/${categoryId}`, {
      method: "POST",
    })
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Error ${response.status}: ${errorText}`)
    }
  },

  removeCategoryFromTask: async (taskId: number, categoryId: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/categories/${categoryId}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Error ${response.status}: ${errorText}`)
    }
  },
}

// Servicios para Categories
export const CategoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE_URL}/categories`)
    return handleResponse<Category[]>(response)
  },

  getCategoryById: async (id: number): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`)
    return handleResponse<Category>(response)
  },

  createCategory: async (category: Category): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    })
    return handleResponse<Category>(response)
  },

  updateCategory: async (id: number, category: Category): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    })
    return handleResponse<Category>(response)
  },

  deleteCategory: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Error ${response.status}: ${errorText}`)
    }
  },

  searchCategoriesByName: async (name: string): Promise<Category[]> => {
    const response = await fetch(`${API_BASE_URL}/categories/search/by-name?name=${encodeURIComponent(name)}`)
    return handleResponse<Category[]>(response)
  },
}

// Servicios para Notes
export const NoteService = {
  getAllNotes: async (): Promise<Note[]> => {
    const response = await fetch(`${API_BASE_URL}/notes`)
    return handleResponse<Note[]>(response)
  },

  getNoteById: async (id: number): Promise<Note> => {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`)
    return handleResponse<Note>(response)
  },

  createNote: async (note: Note): Promise<Note> => {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
    return handleResponse<Note>(response)
  },

  updateNote: async (id: number, note: Note): Promise<Note> => {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
    return handleResponse<Note>(response)
  },

  deleteNote: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Error ${response.status}: ${errorText}`)
    }
  },
}

// Servicios para Habits
export const HabitService = {
  getAllHabits: async (): Promise<Habit[]> => {
    const response = await fetch(`${API_BASE_URL}/habits`)
    return handleResponse<Habit[]>(response)
  },

  getHabitById: async (id: number): Promise<Habit> => {
    const response = await fetch(`${API_BASE_URL}/habits/${id}`)
    return handleResponse<Habit>(response)
  },

  createHabit: async (habit: Habit): Promise<Habit> => {
    const response = await fetch(`${API_BASE_URL}/habits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habit),
    })
    return handleResponse<Habit>(response)
  },

  updateHabit: async (id: number, habit: Habit): Promise<Habit> => {
    const response = await fetch(`${API_BASE_URL}/habits/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habit),
    })
    return handleResponse<Habit>(response)
  },

  deleteHabit: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/habits/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Error ${response.status}: ${errorText}`)
    }
  },
}

// Servicios para Dashboard
export const DashboardService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await fetch(`${API_BASE_URL}/dashboard-stats`)
    return handleResponse<DashboardStats>(response)
  },
}

