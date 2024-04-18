export const ENV = {
  PORT: String(process.env.NEXT_PUBLIC_PORT),
  APP_ENV: String(process.env.NEXT_PUBLIC_APP_ENV),
};

export const URL = {
  GATEWAY: String(process.env.NEXT_PUBLIC_API_GATEWAY),
  TRADING: String(process.env.NEXT_PUBLIC_TRADING_PORTAL),
  DASHBOARD: String(process.env.NEXT_PUBLIC_DASHBOARD_PORTAL),
};
