const TOKEN_KEY = "accessToken"

export function getAuthToken() {
  const cookies = document.cookie.split("; ")

  const tokenCookie = cookies.find((cookie) =>
    cookie.startsWith(`${TOKEN_KEY}=`),
  )

  if (!tokenCookie) {
    return null
  }

  return decodeURIComponent(tokenCookie.split("=")[1])
}

export function setAuthToken(token: string) {
  document.cookie = [
    `${TOKEN_KEY}=${encodeURIComponent(token)}`,
    "Path=/",
    "SameSite=Lax",
  ].join("; ")
}

export function clearAuthToken() {
  document.cookie = [
    `${TOKEN_KEY}=`,
    "Path=/",
    "Max-Age=0",
    "SameSite=Lax",
  ].join("; ")
}
