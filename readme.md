# GoIT Node.js

## _Contact collection_

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок

### Запросы

#### _Аутентификация:_

| Action | HTTP Method | Route                                   |
| ------ | ----------- | --------------------------------------- |
| SignUp | POST        | [http://localhost:5999/api/auth/signup] |
| Login  | POST        | [http://localhost:5999/api/auth/login]  |
| Logout | POST        | [http://localhost:5999/api/auth/logout] |

#### _Доступ к данным пользователя:_

| Action                    | HTTP Method | Route                                     |
| ------------------------- | ----------- | ----------------------------------------- |
| Get current user          | GET         | [http://localhost:5999/api/users/current] |
| Change user' subscription | PATCH       | [http://localhost:5999/api/users/]        |

> Note: subscription принимает значения `['starter', 'pro', 'business']`

#### _Доступ к контактам (для зарегистрированных пользователей):_

| Action                | HTTP Method | Route                                                    |
| --------------------- | ----------- | -------------------------------------------------------- |
| List contacts         | GET         | [http://localhost:5999/api/contacts]                     |
| Add contact           | POST        | [http://localhost:5999/api/contacts/:contactId]          |
| Get contact           | GET         | [http://localhost:5999/api/contacts/:contactId]          |
| Remove contact        | DELETE      | [http://localhost:5999/api/contacts/:contactId]          |
| Update contact        | PUT         | [http://localhost:5999/api/contacts/:contactId]          |
| Update contact status | PATCH       | [http://localhost:5999/api/contacts/:contactId/favorite] |

> Note: List contacts использует пагинацию `?page=1&limit=20` и фильтр по полю "favorite" `?favorite=true` (_true_ или _false_)
