interface Token {
  name: string;
  id: number;
  email: string;
  iat: number;
  exp: number;
  role:Roles
}

export type Roles = "super_admin" | "area_admin" | null

export default Token;

