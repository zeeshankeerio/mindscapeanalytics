/**
 * Dashboard Test Utilities
 * 
 * Helper functions to test dashboard functionality
 */

/**
 * Validates that all dashboard routes are accessible
 * @returns Promise that resolves with test results
 */
export async function testDashboardRoutes() {
  const routes = [
    '/dashboard',
    '/dashboard/models',
    '/dashboard/projects',
    '/dashboard/datasets',
    '/dashboard/insights',
    '/dashboard/analytics',
    '/dashboard/assistant',
    '/dashboard/chat',
    '/dashboard/api-docs',
    '/dashboard/team',
    '/dashboard/settings',
    '/dashboard/docs',
    '/dashboard/knowledge',
    '/dashboard/profile',
    '/dashboard/roi',
    '/dashboard/vision',
  ]

  const results = await Promise.all(
    routes.map(async (route) => {
      try {
        const response = await fetch(route, { method: 'HEAD' })
        return {
          route,
          status: response.status,
          ok: response.ok,
        }
      } catch (error) {
        return {
          route,
          status: 500,
          ok: false,
          error: (error as Error).message,
        }
      }
    })
  )

  return results
}

/**
 * Checks if all dashboard components are properly loaded
 * @param container The DOM container to check
 * @returns Object with test results
 */
export function validateDashboardComponents(container: HTMLElement) {
  return {
    sidebar: !!container.querySelector('[data-test-id="dashboard-sidebar"]'),
    header: !!container.querySelector('[data-test-id="dashboard-header"]'),
    main: !!container.querySelector('main'),
    statCards: !!container.querySelector('[data-test-id="stat-cards"]'),
    breadcrumb: !!container.querySelector('[data-test-id="breadcrumb-nav"]'),
  }
}

/**
 * Simulates data loading in the dashboard
 * @param delay Delay in milliseconds
 * @returns Promise that resolves after the delay
 */
export function simulateDataLoading(delay = 1500) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
} 