import { TOKEN_NAME } from "core/constants/Defaults";
import Token from "core/models/Token";
import jwtDecode from "jwt-decode";

export function getUserName() {
  const token = getDecodedToken();

  if (token) {
    const { name } = token;
    return name;
  }

  return "";
}

export function getToken() {
  return localStorage.getItem(TOKEN_NAME) || "";
}

export function removeToken() {
  localStorage.removeItem(TOKEN_NAME);
}

export function getRole() {
  const token = getDecodedToken();

  if (token) {
    const { role } = token;
    return role;
  }

  return null;
}

export function getName() {
  const token = getDecodedToken();
  if (token) {
    const { name } = token;
    return name;
  }
  return "";
}

export function getDecodedToken() {
  const token = getToken();

  try {
    return jwtDecode<Token>(token);
  } catch {
    return null;
  }
}
