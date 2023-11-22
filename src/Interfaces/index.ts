interface User {
  user_id: number;
  email: string;
  password_hash: string;
  created_at: Date;
  is_admin: Boolean;
}

interface Url {
  url_id: number;
  original_url: string;
  short_url_key: string;
  user_id: number;
  created_at: Date;
}

interface Analytics {
  analytics_id: number;
  url_id: number;
  request_timestamp: Date;
  device_type: string;
  os_type: string;
  country: string;
  city: string;
}

export { User, Url, Analytics };
