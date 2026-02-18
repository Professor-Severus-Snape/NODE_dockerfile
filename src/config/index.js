// делаем файл .env в корне проекта необязательным (защита от падений):
try {
  process.loadEnvFile();
} catch {}

export default {
  port: process.env.PORT || 3000,
};
