export const ENV = {
  PORT: String(process.env.PORT),
  NODE_ENV: String(process.env.NODE_ENV),
};

export const URL = {
  GATEWAY: String(process.env.API_GATEWAY),
  TRADING: String(process.env.TRADING_PORTAL),
  DASHBOARD: String(process.env.DASHBOARD_PORTAL),
};
