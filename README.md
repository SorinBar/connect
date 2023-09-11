# Connect

---

### Prerequisites:

-   node - 18.17.0
-   npm - 9.8.1
-   docker
-   docker-compose

---

### Setup

##### Database:

    .../connect:
    docker compose up -d

##### Backend:

    .../connect/backend:
    npm install

##### Frontend:

    .../connect/spa:
    npm install

---

#### Migrations

    .../connect/backend:
    npm run migrations

---
