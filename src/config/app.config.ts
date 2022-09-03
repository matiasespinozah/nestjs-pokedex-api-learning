export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  mongodb: process.env.MONGODB,
});
