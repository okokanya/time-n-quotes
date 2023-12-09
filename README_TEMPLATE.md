# Название ПРОЕКТА

## Разработка

Подготовка окружения и установка зависимостей.

```bash
python3.9 -m venv .venv
source .venv/bin/activate
(.venv) $ pip install -U pip
(.venv) $ pip install -r requirements.txt
```

Подготовка локальных настроек. Создаём файл **settings_local.py** на основе шаблона и заполняем поля <...>. Так как настройки содержат чувствительную информацию, то их нельзя добавлять в репозиторий исходного кода.

```bash
cp rr/settings_local_tmpl.py rr/settings_local.py
```

Проверка, запуск unit-тестов, запуск миграций БД и создание суперпользователя.

```bash
./manage.py check
./manage.py test
./manage.py migrate
```

### Docker

Запустить базу данных PostgreSQL.

```bash
docker-compose up -d
```

Восстановить базу данных из дампа.

```bash
docker exec -i your_name_db pg_restore -U your_user_name --no-owner -d your_password < ./db_dumps/rr2.db.dump
```

Остановить базу данных.

```bash
docker-compose down
```
