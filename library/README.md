# Основное приложение «Библиотека»

## Описание:
1. Приложение «Библиотека» опубликовано как Docker-образ [здесь](https://hub.docker.com/repository/docker/professorseverussnape/library/general).
1. Интегрируется с микросервисом-счётчиком и базой данных (Redis) через docker-compose.
1. Cкрипты в package.json предусматривают возможность упрощённого ввода docker-команд:
   - сборка development- и production- образов,
   - отправка production-образа на Docker Hub,
   - поднятие контейнеров из development- и production- образов.
