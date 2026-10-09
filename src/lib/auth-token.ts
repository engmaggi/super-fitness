const TOKEN_KEY = "accessToken"
export const AUTH_SESSION_CLEARED_EVENT = "auth:session-cleared"

export function getAuthToken() {
  const cookies = document.cookie.split("; ")

  const tokenCookie = cookies.find((cookie) =>
    cookie.startsWith(`${TOKEN_KEY}=`),
  )

  if (tokenCookie) {
    const token = decodeURIComponent(tokenCookie.slice(TOKEN_KEY.length + 1))
    if (token) return token
  }

  const legacyToken =
    localStorage.getItem("token") || sessionStorage.getItem("token")
  if (!legacyToken) return null

  setAuthToken(legacyToken)
  return legacyToken
}

export function setAuthToken(token: string) {
  document.cookie = [
    `${TOKEN_KEY}=${encodeURIComponent(token)}`,
    "Path=/",
    "SameSite=Lax",
  ].join("; ")
  localStorage.removeItem("token")
  sessionStorage.removeItem("token")
}

export function clearAuthToken() {
  document.cookie = [
    `${TOKEN_KEY}=`,
    "Path=/",
    "Max-Age=0",
    "SameSite=Lax",
  ].join("; ")
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  sessionStorage.removeItem("token")
  window.dispatchEvent(new Event(AUTH_SESSION_CLEARED_EVENT))
}
