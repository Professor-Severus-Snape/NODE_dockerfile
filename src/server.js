import app from './app.js';
import config from './config/index.js';

const startServer = async() => {
  try {
    app.listen(config.port, () =>
      console.log(
        `The server is running on http://localhost:${config.port}/api`,
      ),
    );
  } catch (error) {
    console.error(error);
  }
};

export default startServer;
