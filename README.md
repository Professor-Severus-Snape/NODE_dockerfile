# Домашнее задание к занятию «Docker: контейнеризация приложения»

## Задание 1 — контейнеризация

Контейнеризировать приложение «Библиотека» и опубликовать его на hub.docker.com.

### Критерии выполнения
В результате выполнения задания в исходном коде приложения должен появиться Dockerfile. А в публичном репозитории, созданном пользователем на hub.docker.com, — образ.

## Задание 2 — микросервисы

Добавьте в приложение счётчик просмотра книг:
- счётчик увеличивается при каждом просмотре книги,
- за хранение значения счётчика отвечает отдельное приложение,
- данные счётчика хранятся на диске и переживают рестарт приложения или контейнера.

Используйте docker-compose для разработки приложения в контейнере.

### Критерии выполнения

1. Создано контейнеризированное приложение Node.js, обрабатывающее два роута:
   - увеличить счётчик — `POST /counter/:bookId/incr`
   - получить значение счётчика — `GET /counter/:bookId`
1. В основном приложении при просмотре книги реализованы:
   - увеличение счётчика,
   - отображение значения счётчика;
1. Создан docker-compose.yml, запуск которого поднимает оба приложения и позволяет продемонстрировать работу счётчика.

В исходном коде приложения должен появиться docker-compose.yml.

## Реализация:
1. Проект является продолжением [работы](https://github.com/Professor-Severus-Snape/NODE_MVC) с библиотекой `Express`.
1. Образ основного приложения `library` опубликован [здесь](https://hub.docker.com/repository/docker/professorseverussnape/library/general).
1. Образ микросервиса `counter` опубликован [здесь](https://hub.docker.com/repository/docker/professorseverussnape/counter/general).
1. Интеграция `library`, `counter` и `Redis` реализована через файлы docker-compose.dev.yml и docker-compose.prod.yml в корне данного репозитория с возможностью одновременного запуска за счёт создания project names через `-p dev` и `-p prod`:
   - Запуск в режиме development - `docker compose -f docker-compose.dev.yml -p dev up --build`.
   - Завершение работы в режиме development - `docker compose -f docker-compose.dev.yml -p dev down`.
   - Запуск в режиме production - `docker compose -f docker-compose.prod.yml -p prod up`.
   - Завершение работы в режиме production - `docker compose -f docker-compose.prod.yml -p prod down`.
