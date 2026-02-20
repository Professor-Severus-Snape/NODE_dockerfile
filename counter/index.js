import express from 'express';
import redis from 'redis';

const PORT = process.env.PORT || 4000;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const app = express();

const client = redis.createClient({
  url: REDIS_URL,
  socket: { connectTimeout: 2000 }, // таймаут подключения (если Redis отвалился)
  // eslint-disable-next-line camelcase
  retry_strategy: () => new Error('Retry disabled'), // отключаем бесконечные переподключения
});

// ловим ошибки подключения к Redis:
client.on('error', (err) => {
  console.error('Redis client error:', err);
});

(async() => {
  try {
    await client.connect(); // подключение к Redis
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Could not connect to Redis:', err);
  }
})();

// увеличение значения счётчика книги:
app.post('/counter/:bookId/incr', async(req, res) => {
  const { bookId } = req.params;

  const key = `book:${bookId}`; // ключ
  const views = client.isReady ? await client.incr(key).catch(() => 0) : 0; // значение

  res.json({ bookId, views: Number(views) });
});

// получение текущего значения счётчика:
app.get('/counter/:bookId', async(req, res) => {
  const { bookId } = req.params;

  const key = `book:${bookId}`; // ключ

  // NB! Redis по ключу в качестве значения вернёт null или string со значением счетчика:
  const views = (client.isReady && (await client.get(key).catch(() => 0))) || 0;

  res.json({ bookId, views: Number(views) });
});

try {
  app.listen(PORT, () =>
    console.log(`Counter microservice started on port ${PORT}`),
  );
} catch (error) {
  console.error(error);
}
