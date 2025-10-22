import { ref, type Ref } from 'vue'

export interface Alert {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

const alerts: Ref<Alert[]> = ref([])

export const useAlert = () => {
  const addAlert = (alert: Omit<Alert, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    const newAlert: Alert = { id, ...alert }
    alerts.value.push(newAlert)

    if (alert.duration) {
      setTimeout(() => {
        removeAlert(id)
      }, alert.duration)
    }
  }

  const removeAlert = (id: string) => {
    const index = alerts.value.findIndex(alert => alert.id === id)
    if (index > -1) {
      alerts.value.splice(index, 1)
    }
  }

  const clearAlerts = () => {
    alerts.value = []
  }

  return {
    alerts: readonly(alerts),
    addAlert,
    removeAlert,
    clearAlerts
  }
}