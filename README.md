# Connect

##### Connect is a versatile and user-friendly mobile application designed to streamline the process of sharing your contact information with ease. With Connect, you can effortlessly create a QR code that acts as a gateway to your digital profile, allowing others to access your contact details and explore your online presence.

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

### Migrations

    .../connect/backend:
    docker start connectDb
    npm run migrations

---

### Run

    ...connect/spa:
    npm start
    .../connect/backend:
    npm run dev
