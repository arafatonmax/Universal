const SESSION_KEY = 'user_session';

export function saveUserSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getUserSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

export function clearUserSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn() {
  return !!getUserSession();
}