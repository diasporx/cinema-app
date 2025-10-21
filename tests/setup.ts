import { vi } from 'vitest'
import { ref } from 'vue'

// Mock Vue's ref function globally
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    ref: vi.fn((value) => ({ value }))
  }
})