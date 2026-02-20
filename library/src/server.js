import app from './app.js';
import config from './config/index.js';

const { PORT } = config;

const startServer = async() => {
  try {
    app.listen(PORT, () =>
      console.log(`The server is running on http://localhost:${PORT}`),
    );
  } catch (error) {
    console.error(error);
  }
};

export default startServer;
