const JWT_KEY = "jwt";

export default class JwtProxy {
  static setJwt(jwt: string, target: "local" | "session") {
    this.clearJwt();
    if (target === "local") {
      localStorage.setItem(JWT_KEY, jwt);
    } else {
      sessionStorage.setItem(JWT_KEY, jwt);
    }
  }

  static clearJwt() {
    localStorage.removeItem(JWT_KEY);
    sessionStorage.removeItem(JWT_KEY);
  }

  static getJWT() {
    // 先从session拿，拿不到再找local
    const session = sessionStorage.getItem(JWT_KEY);
    if (session && session.length > 0) return session;

    const local = localStorage.getItem(JWT_KEY);
    return local;
  }
}
