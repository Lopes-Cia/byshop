import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/lib/schemas"

export const MOCK_AUTH_USER = {
  email: "demo@ecommerce.local",
  password: "demo123",
  firstName: "Demo",
  lastName: "User",
} as const

interface AuthStore {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true })

        // Mock login - in a real app, you'd make an API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        if (email !== MOCK_AUTH_USER.email || password !== MOCK_AUTH_USER.password) {
          set({ isLoading: false })
          throw new Error("Email ou senha inválidos.")
        }

        const mockUser: User = {
          id: "mock-1",
          email: MOCK_AUTH_USER.email,
          firstName: MOCK_AUTH_USER.firstName,
          lastName: MOCK_AUTH_USER.lastName,
        }

        set({ user: mockUser, isLoading: false })
      },

      signup: async (email, password, firstName, lastName) => {
        set({ isLoading: true })

        // Mock signup - in a real app, you'd make an API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        const mockUser: User = {
          id: "mock-1",
          email,
          firstName,
          lastName,
        }

        set({ user: mockUser, isLoading: false })
      },

      logout: () => {
        set({ user: null })
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
