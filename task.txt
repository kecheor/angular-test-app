Создать Angular SPA с авторизацией и управлением списком заметок, используя Akita как state management, RxJS для реактивности и Guards для защиты маршрутов.Аутентификация
* Страница логина (/login) с простыми полями email/password.
* Успешный логин — мок (напр., email: test@test.com, password: 123456), сохраняется токен (в localStorage или memory).
* Стейт авторизации управляется через Akita Store (AuthStore):
 * isAuthenticated$, token, userEmail
* Guards:
 * AuthGuard — доступ к /notes только если залогинен
 * LoginGuard — если уже авторизован, редиректит с /login на /notes
 Заметки
* Страница /notes (защищённая)
* Отображает список заметок: title, content, createdAt, status
* Возможности:
 * Добавление новой заметки (через форму)
 * Удаление заметки
 * Изменение статуса (active/completed).
Все заметки — управляются через Akita Store:
* NotesStore, NotesQuery, NotesService
* Можно использовать createEntityStore, EntityState
 RxJsВсе взаимодействие со стейтом — через Observables
Использовать: switchMap, tap, delay, catchError, combineLatest — где уместно
Фейковая задержка при логине/добавлении заметки (timer(1000) или delay(1000))