import { mockUser } from './mock-data';

/**
 * Get the current user - always returns the mock user
 * since we're bypassing authentication
 */
export function getCurrentUser() {
  return mockUser;
}

/**
 * Check if the user is authenticated
 * This always returns true since we're bypassing auth
 */
export function isAuthenticated() {
  return true;
}

/**
 * Check if the user has a specific permission
 * Since we're bypassing auth, this will just check if the permission
 * exists in the mock user's permissions array
 */
export function hasPermission(permission: string) {
  return mockUser.permissions.includes(permission);
}

/**
 * Get the user's subscription plan
 */
export function getUserSubscription() {
  return mockUser.subscription;
}

/**
 * Check if the user's subscription is active
 */
export function hasActiveSubscription() {
  return mockUser.subscription.status === 'active';
} 