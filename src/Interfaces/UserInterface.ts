export default interface User {
  user_id: number;
  email: string;
  password_hash: string;
  created_at: Date;
  is_admin: Boolean;
}
