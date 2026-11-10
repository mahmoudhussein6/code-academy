# Code Academy API Documentation

**Version:** 1.0\
**Base URL (Production):**
`https://code-academy-pmlv-nu.vercel.app/api`\
**Content-Type:** `application/json`

> This document is based on the uploaded backend `src` folder. It
> documents the routes and behavior implemented in the source code. It
> does not assume endpoints that are not present.

## 1. Overview

The API provides: - Authentication and current-user information. -
Learning paths, courses, and lessons. - Lesson completion and learner
progress summary.

### Route groups

  Group            Base path     Purpose
  ---------------- ------------- --------------------------------------------
  Health           `/health`     API health check
  Authentication   `/auth`       Register, login, logout, current user
  Learning paths   `/paths`      List paths and get path details
  Courses          `/courses`    List courses and get course details
  Lessons          `/lessons`    List lessons and get lesson details
  Progress         `/progress`   Complete lessons and read progress summary

## 2. Environments and request conventions

Use the production base URL above, or locally:

`http://localhost:5000/api`

All request bodies must be JSON. For browser requests, the backend sets
an HTTP-only cookie named `token`. The authentication middleware also
accepts a bearer token:

`Authorization: Bearer <JWT>`

For cross-origin browser requests that rely on cookies, send credentials
(for example, `credentials: "include"` with `fetch` or
`withCredentials: true` with Axios). The frontend origin must be
included in the backend `CLIENT_URL` configuration.

## 3. Authentication

JWTs are signed using `JWT_SECRET` and expire after **7 days**. The
token payload contains `id`, `email`, `role`, and `name`.

### POST `/auth/register`

Create a student account.

**Request body**

``` json
{
  "name": "Mahmoud",
  "email": "student@example.com",
  "password": "secret123"
}
```

  Field        Type       Required Validation
  ------------ -------- ---------- -----------------------
  `name`       string          Yes At least 2 characters
  `email`      string          Yes Valid email
  `password`   string          Yes At least 6 characters

**Success:** `201 Created`

``` json
{
  "message": "تم إنشاء الحساب بنجاح",
  "token": "<jwt>",
  "user": {
    "id": "<user-id>",
    "name": "Mahmoud",
    "email": "student@example.com",
    "role": "student",
    "avatar": "<avatar-url>"
  }
}
```

The response also sets the HTTP-only `token` cookie.

**Errors** - `400`: Invalid input or email already registered. - `500`:
Server error while creating the account.

### POST `/auth/login`

Authenticate an existing user.

**Request body**

``` json
{
  "email": "student@example.com",
  "password": "secret123"
}
```

**Success:** `200 OK`

``` json
{
  "message": "تم تسجيل الدخول بنجاح",
  "token": "<jwt>",
  "user": {
    "id": "<user-id>",
    "name": "Mahmoud",
    "email": "student@example.com",
    "role": "student",
    "avatar": "<avatar-url>"
  }
}
```

The response also sets the HTTP-only `token` cookie.

**Errors** - `400`: Invalid request data. - `401`: Email or password is
incorrect. - `500`: Server error while logging in.

### POST `/auth/logout`

Clear the authentication cookie.

**Authentication:** No authentication middleware is applied to this
route.

**Success:** `200 OK`

``` json
{
  "message": "تم تسجيل الخروج بنجاح"
}
```

### GET `/auth/me`

Get the authenticated user's public profile.

**Authentication:** Required. Send the cookie or bearer token.

**Success:** `200 OK`

``` json
{
  "user": {
    "id": "<user-id>",
    "name": "Mahmoud",
    "email": "student@example.com",
    "role": "student",
    "avatar": "<avatar-url>"
  }
}
```

**Errors** - `401`: Missing, expired, or invalid token. - `404`: User
not found.

## 4. Health check

### GET `/health`

Check whether the API process is responding.

**Success:** `200 OK`

``` json
{
  "status": "ok",
  "message": "Code Academy API is running smoothly",
  "timestamp": "2026-11-08T22:35:24.497Z"
}
```

This route is registered before the database initialization middleware.
A successful health response therefore confirms the API process is
responding, but does not by itself prove MongoDB is connected.

## 5. Learning paths

The paths endpoints use optional authentication. Without a valid login
they return public curriculum data with zero user progress. With a valid
token, progress fields are calculated for that user.

### GET `/paths`

Get all learning paths.

**Success:** `200 OK` --- JSON array.

Each item contains the path fields (such as `slug`, `title`,
`shortTitle`, `description`, `level`, `icon`, `color`, `isPrimary`,
`status`, and `estimatedHours`) plus:

  -------------------------------------------------------------------------
  Field                     Type                    Meaning
  ------------------------- ----------------------- -----------------------
  `coursesCount`            number                  Number of courses in
                                                    the path

  `totalLessons`            number                  Total lessons across
                                                    its courses

  `completedLessonsCount`   number                  Completed lessons for
                                                    the current user

  `progressPercentage`      number                  Completion percentage,
                                                    rounded to an integer
  -------------------------------------------------------------------------

### GET `/paths/:slug`

Get one path and its nested courses, modules, and lessons.

**Example:** `/paths/frontend-development`

**Success:** `200 OK`

Returns the path object with: - `courses`: courses belonging to the
path. - Each course's modules and lessons. - Each nested lesson has a
`completed` boolean. - Each course has `totalLessons`,
`completedLessons`, and `progressPercentage`. - The path has
`totalLessons`, `completedLessons`, and `progressPercentage`.

**Errors** - `400`: Missing path slug. - `404`: Learning path not
found. - `500`: Failed to retrieve path.

## 6. Courses

Course endpoints use optional authentication. When a valid user is
supplied, course progress is included.

### GET `/courses`

Get all courses.

**Optional query parameters**

  Parameter   Type     Meaning
  ----------- -------- --------------------------------------
  `path`      string   Filter courses by learning-path slug

**Examples** - `/courses` - `/courses?path=frontend-development`

**Success:** `200 OK` --- JSON array. Each course includes its stored
course fields plus:

  -----------------------------------------------------------------------
  Field                   Type                    Meaning
  ----------------------- ----------------------- -----------------------
  `totalLessons`          number                  Total lessons across
                                                  all modules

  `completedLessons`      number                  Completed lessons for
                                                  the current user

  `progressPercentage`    number                  Completion percentage,
                                                  rounded to an integer
  -----------------------------------------------------------------------

### GET `/courses/:slug`

Get a single course by slug.

**Example:** `/courses/html-fundamentals`

**Success:** `200 OK`

Returns the course object. Each module's lessons include a `completed`
boolean. The course also includes `totalLessons`, `completedLessons`,
and `progressPercentage`.

**Errors** - `400`: Missing course slug. - `404`: Course not found. -
`500`: Failed to retrieve course.

## 7. Lessons

Lesson endpoints use optional authentication.

### GET `/lessons`

Get all lessons.

**Optional query parameters**

  Parameter   Type     Meaning
  ----------- -------- -------------------------------
  `course`    string   Filter lessons by course slug

**Examples** - `/lessons` - `/lessons?course=html-fundamentals`

**Success:** `200 OK` --- JSON array. Each lesson includes its lesson
fields and a `completed` boolean.

### GET `/lessons/:slug`

Get a lesson and its navigation context.

**Example:** `/lessons/what-is-html-and-web-basics`

**Success:** `200 OK`

``` json
{
  "lesson": {
    "slug": "lesson-slug",
    "courseSlug": "course-slug",
    "moduleSlug": "module-slug",
    "order": 1,
    "title": "Lesson title",
    "summary": "Lesson summary",
    "readTimeMinutes": 5,
    "contentMarkdown": "Lesson content"
  },
  "isCompleted": false,
  "course": {
    "slug": "course-slug",
    "title": "Course title",
    "pathSlug": "path-slug",
    "modules": []
  },
  "navigation": {
    "previousLesson": null,
    "nextLesson": {
      "slug": "next-lesson-slug",
      "title": "Next lesson",
      "courseSlug": "course-slug"
    }
  }
}
```

The `lesson` object may also contain: - `interactiveExercise`:
instructions and optional initial HTML, CSS, JavaScript, and solution. -
`quiz`: question, options, correct option index, and explanation.

`previousLesson` or `nextLesson` is `null` when there is no lesson in
that direction.

**Errors** - `400`: Missing lesson slug. - `404`: Lesson not found. -
`500`: Failed to retrieve lesson.

## 8. Progress

Both progress routes use optional authentication in the current
implementation.

### POST `/progress/complete`

Mark a lesson as completed or update its completion record.

**Request body**

``` json
{
  "lessonSlug": "what-is-html-and-web-basics",
  "courseSlug": "html-fundamentals",
  "pathSlug": "frontend-development",
  "quizCompleted": true
}
```

  -------------------------------------------------------------------------
  Field             Type                          Required Meaning
  ----------------- ---------------- --------------------- ----------------
  `lessonSlug`      string                             Yes Lesson slug

  `courseSlug`      string                             Yes Course slug

  `pathSlug`        string                             Yes Learning-path
                                                           slug

  `quizCompleted`   boolean                             No Whether the quiz
                                                           was completed;
                                                           converted using
                                                           JavaScript
                                                           `Boolean(...)`
  -------------------------------------------------------------------------

**Success:** `200 OK`

``` json
{
  "message": "تم حفظ التقدم بنجاح!",
  "progress": {
    "userId": "<user-id-or-guest_user>",
    "lessonSlug": "what-is-html-and-web-basics",
    "courseSlug": "html-fundamentals",
    "pathSlug": "frontend-development",
    "completed": true,
    "completedAt": "<date>",
    "quizCompleted": true
  }
}
```

When a valid token is present, progress is stored against that user's
ID. Without a valid token, the current implementation uses the shared ID
`guest_user`.

**Errors** - `400`: One or more required identifiers are missing. -
`500`: Failed to save progress.

### GET `/progress/summary`

Get the current user's progress summary.

**Success:** `200 OK`

``` json
{
  "totalCompleted": 1,
  "completedLessons": [
    "what-is-html-and-web-basics"
  ],
  "badges": [
    {
      "id": "first_step",
      "title": "الخطوة الأولى",
      "description": "أتممت درسك الأول في الأكاديمية بنجاح!",
      "icon": "Sparkles",
      "date": "متحققة"
    }
  ],
  "streakDays": 3
}
```

Badges are generated by server-side rules: - `first_step`: at least one
completed lesson. - `html_master`: a completed lesson slug starts with
`html-`. - `css_wizard`: a completed lesson slug starts with `css-` or
`flexbox-`. - `js_ninja`: a completed lesson slug starts with `js-`,
`dom-`, or `async-`. - `fast_learner`: at least five completed lessons.

**Important:** `streakDays` is currently hard-coded to `3`; it is not
calculated from activity dates.

## 9. Data models (response shape overview)

### User

-   `id` (response field), `name`, `email`, `role`, `avatar`
-   The database stores `passwordHash`; it is not returned in
    authentication responses.

### Learning path

-   `slug`, `title`, `shortTitle`, `description`, `level`, `icon`,
    `color`, `isPrimary`, `status`, `estimatedHours`
-   `level`: `beginner`, `intermediate`, or `advanced`.
-   `status`: `available` or `coming-soon`.

### Course

-   `slug`, `pathSlug`, `order`, `title`, `shortTitle`, `description`,
    `topics`, `icon`, `color`, `level`, `estimatedHours`, `modules`,
    `status`
-   `status`: `available` or `coming-soon`.

### Lesson

-   `slug`, `courseSlug`, `moduleSlug`, `order`, `title`, `summary`,
    `readTimeMinutes`, `contentMarkdown`, optional
    `interactiveExercise`, optional `quiz`.

### Progress

-   `userId`, `lessonSlug`, `courseSlug`, `pathSlug`, `completed`,
    `completedAt`, `quizCompleted`.

## 10. Common status codes

  -----------------------------------------------------------------------
  Status                              Meaning
  ----------------------------------- -----------------------------------
  `200`                               Request succeeded

  `201`                               Resource created

  `400`                               Invalid input or missing required
                                      data

  `401`                               Authentication required or
                                      credentials invalid

  `404`                               Requested resource not found

  `500`                               Unexpected server/controller error

  `503`                               Backend service initialization
                                      failed, commonly database
                                      connection failure
  -----------------------------------------------------------------------

## 11. Frontend integration examples

### Fetch paths

``` ts
const response = await fetch(`${API_URL}/paths`);
if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}
const paths = await response.json();
```

### Fetch paths with cookie authentication

``` ts
const response = await fetch(`${API_URL}/paths`, {
  credentials: 'include',
});
if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}
const paths = await response.json();
```

### Complete a lesson with Axios

``` ts
await api.post('/progress/complete', {
  lessonSlug,
  courseSlug,
  pathSlug,
  quizCompleted,
});
```

Ensure the shared Axios instance uses the correct API base URL and
`withCredentials: true` if relying on cookies.

## 12. Important implementation notes and recommended fixes

These notes describe behavior visible in the uploaded source and are
important before using the API in production.

1.  **Progress routes are not protected.** `/progress/complete` and
    `/progress/summary` use `optionalAuth`, not `requireAuth`. Anyone
    can submit progress, and unauthenticated users all share the
    `guest_user` record. If progress must belong to an individual
    learner, change these routes to `requireAuth` and remove the guest
    fallback.
2.  **Logout cookie options should match login options.** Login/register
    set `httpOnly`, production `secure`, and `sameSite: 'lax'`;
    `clearCookie` currently does not pass matching options. Configure
    clearing with matching cookie options so browser cookie deletion is
    reliable.
3.  **JWT fallback secret exists in source.** Both auth controller and
    middleware have a fallback secret. Production must always define a
    strong `JWT_SECRET`; ideally fail startup if it is missing instead
    of using a fallback.
4.  **Registration/login error responses expose `error.message`.**
    Consider logging detailed errors on the server and returning a
    generic message to clients in production.
5.  **Health check does not verify MongoDB.** `/health` responds before
    database initialization. If deployment monitoring needs database
    readiness, add a separate readiness endpoint that checks the DB
    connection.
6.  **Progress summary streak is static.** `streakDays` is always `3`
    until real streak calculation is implemented.
7.  **No pagination or admin CRUD endpoints are present** in the
    uploaded route files. This documentation therefore only lists the
    implemented read endpoints and progress/auth operations.

## 13. Quick endpoint reference

  Method   Endpoint               Auth behavior
  -------- ---------------------- -----------------------------------
  GET      `/health`              Public
  POST     `/auth/register`       Public
  POST     `/auth/login`          Public
  POST     `/auth/logout`         Public
  GET      `/auth/me`             Required
  GET      `/paths`               Optional
  GET      `/paths/:slug`         Optional
  GET      `/courses`             Optional
  GET      `/courses/:slug`       Optional
  GET      `/lessons`             Optional
  GET      `/lessons/:slug`       Optional
  POST     `/progress/complete`   Optional (current implementation)
  GET      `/progress/summary`    Optional (current implementation)
