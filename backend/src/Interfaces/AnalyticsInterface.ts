export default interface Analytics {
  analytics_id: number;
  url_id: number;
  request_timestamp: Date;
  device_type: string;
  os_type: string;
  country: string;
  city: string;
}
