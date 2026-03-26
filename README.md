#  SkillSwap

SkillSwap — это веб-приложение для обмена навыками между разработчиками.
Пользователи могут делиться знаниями, искать наставников и создавать заявки на обучение.

---


#  Структура проекта

```
src/
├── api/        # Работа с данными (fetch, localStorage)
├── app/        # Инициализация приложения (store, routes, styles)
├── entities/   # Сущности (Skill, User, Request)
├── features/   # Бизнес-логика (auth, skills, favorites, requests)
├── widgets/    # Крупные UI-блоки
├── pages/      # Страницы
├── shared/     # Общие компоненты, хуки, утилиты
└── main.tsx    # Точка входа

public/
└── db/         # JSON-моки данных
```

---

#  Описание слоёв

##  `api/`

Работа с данными.

**Содержит:**

* запросы к `skills.json`, `users.json`
* работу с `localStorage`

**Важно:**

*  Нет JSX
*  Нет UI



*  Только функции работы с данными

---

##  `app/`

Корень приложения.

**Содержит:**

* `store/` — Redux store
* `routes/` — маршруты и ProtectedRoute
* `styles/` — глобальные стили
* `App.tsx` — корневой компонент

---

##  `entities/`

Сущности домена.

**Примеры:**

* Skill
* User
* Request

**Содержит:**

* типы (`types.ts`)
* модели данных

**Важно:**

*  Нет сложной логики
*  Нет роутов

---

##  `features/`

Пользовательские действия (бизнес-логика).

**Примеры:**

* авторизация (`auth`)
* каталог навыков (`skills`)
* избранное (`favorites`)
* заявки (`requests`)

**Содержит:**

* state (Redux slices)
* selectors
* UI, связанный с логикой

---

##  `widgets/`

Крупные UI-блоки.

**Примеры:**

* Header
* Footer
* SkillCard
* FiltersBar
* RequestsList

**Важно:**

*  Состоят из нескольких компонентов
*  Не базовые элементы (не кнопки!)

---

##  `pages/`

Страницы приложения.

**Примеры:**

* HomePage
* SkillPage
* LoginPage
* ProfilePage
* FavoritesPage
* CreateSkillPage

**Важно:**

* собирают UI из `widgets + features`
*  не содержат сложной логики

---

## `shared/`

Общие инструменты.

### `shared/ui/`

Базовые компоненты:

* Button
* Input
* Modal
* Loader

### `shared/hooks/`

Общие хуки:

* useDebounce
* useLocalStorage

### `shared/lib/`

Утилиты:

* constants
* helpers
* validation

---

##  `public/db/`

Моки данных.

**Содержит:**

* `skills.json`
* `users.json`

---

# Основные страницы

* `/` — каталог навыков
* `/skill/:id` — страница навыка
* `/login` — вход
* `/register` — регистрация
* `/profile` — профиль (protected)
* `/favorites` — избранное
* `/create` — создание навыка (protected)
* `*` — 404

---

#  Установка и запуск

```bash
git clone <repo>
cd skillswap
npm install
npm run dev
```

---

# Проверка проекта

```bash
npm run lint
npm run build
npm run test
```

---

# Правила разработки

##  Структура

* entities — только модели
* features — логика действий
* widgets — крупные UI-блоки
* pages — сборка экранов
* shared — переиспользуемые элементы


---

##  Ветки

```
main
feature/*
```




#  Подсказка для команды

Если не знаешь, куда положить код:

| Что это               | Куда         |
| --------------------- | ------------ |
| Тип (Skill, User)     | entities     |
| Логика (auth, filter) | features     |
| Карточка, Header      | widgets      |
| Страница              | pages        |
| Кнопка, Input         | shared/ui    |
| Хук                   | shared/hooks |
| API / localStorage    | api          |
| Router / store        | app          |

---


