interface Token {
  name: string;
  id: number;
  email: string;
  iat: number;
  exp: number;
  role:"judge" | "admin"
}

export default Token;

