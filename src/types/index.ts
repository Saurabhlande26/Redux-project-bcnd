export interface UserPayload {
  id: number;
  email: string;
  role: "admin" | "user";
}