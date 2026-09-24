<div align="center">

<img src="frontend/public/logo.png" alt="EstateLink logo" width="72" />

# EstateLink

**A full-stack real estate marketplace — search, save and list properties.**

<img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/SCSS-1.83-C6538C?style=flat-square&logo=sass&logoColor=white" alt="SCSS" />
<img src="https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
<img src="https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
<img src="https://img.shields.io/badge/Leaflet-Map-2D7D46?style=flat-square&logo=leaflet&logoColor=white" alt="Leaflet" />

</div>

---

## Overview

EstateLink is a MERN-style property marketplace split into two apps:

- **`frontend/`** — React + Vite single page app with client-side routing, SCSS styling and data loaders.
- **`api/`** — Express REST API backed by Prisma ORM and MongoDB, with JWT cookie authentication.

Users can browse and filter listings, open a full property detail page with a map and image slider, save favourites, publish their own listings with cloud image upload, and manage everything from a profile dashboard.

## Features

**Listings**
- Search and filter by city, type (`buy` / `rent`), property type (`apartment`, `house`, `condo`, `land`), bedrooms and price range
- Property detail page with image slider, sanitized rich-text description, sizes, policies and nearby place distances
- Interactive Leaflet / OpenStreetMap map with a pin per listing
- Save & unsave listings (wishlist) with instant UI feedback

**Accounts**
- Register, login and logout with JWT stored in an `httpOnly` cookie, passwords hashed with bcrypt
- Protected routes (`/profile`, `/profile/update`, `/add`) that redirect guests to login
- Profile dashboard with your listings, saved listings, account details and logout
- Update profile (username, email, password, avatar) and delete your account

**Publishing**
- Create a listing with full details: price, address, city, beds/baths, coordinates, type and property type
- Extra detail block: description, utilities/pet/income policy, size and distances to school, bus stop and restaurant
- Multi-image upload through the Cloudinary upload widget
- Owners can delete their own listings

**Messaging**
- REST endpoints for chats and messages: create a chat, list chats, read a conversation, post a message and mark it seen

## Tech stack

| Layer      | Technology |
| ---------- | ---------- |
| Frontend   | React 18, Vite, React Router 6 (data loaders), Axios, DOMPurify, React Quill |
| Styling    | SCSS modules with responsive breakpoints |
| Maps       | Leaflet + react-leaflet (OpenStreetMap tiles) |
| Media      | Cloudinary upload widget |
| Backend    | Node.js, Express 5, cookie-parser, CORS |
| Auth       | JSON Web Tokens (`httpOnly` cookies), bcrypt hashing |
| Database   | MongoDB via Prisma schema (`api/prisma/schema.prisma`) |

## Project structure

```
Estate_App/
├── api/                    # Express REST API
│   ├── app.js              # Server entry point (port 8800)
│   ├── controllers/        # auth, post, user, chat, messages, test
│   ├── routes/             # /api/auth /api/posts /api/users /api/chats /api/messages
│   ├── middleware/         # verifyToken (JWT guard)
│   ├── lib/prisma.js       # Prisma client singleton
│   └── prisma/schema.prisma
├── frontend/               # React + Vite client
│   ├── src/
│   │   ├── routes/         # home, list, single, login, register, profile, new post
│   │   ├── components/     # navbar, card, list, filter, slider, map, chat, searchBar
│   │   ├── context/        # AuthContext (current user)
│   │   └── lib/            # axios instance, route loaders, helpers
│   └── public/             # icons and images
└── estate_images/          # sample property photos
```

## Getting started

### Prerequisites

- Node.js 18+
- A MongoDB database (local or Atlas)
- A Cloudinary account (only needed for uploading listing images)

### 1. API

```bash
cd api
npm install
```

Create `api/.env`:

| Variable         | Description                                        |
| ---------------- | -------------------------------------------------- |
| `DATABASE_URL`   | MongoDB connection string, e.g. `mongodb://localhost:27017/estatelink` |
| `JWT_SECRET_KEY` | Secret used to sign auth tokens                    |
| `CLIENT_URL`     | Frontend origin allowed by CORS, e.g. `http://localhost:5173` |

```bash
npx prisma generate
node app.js          # API runs on http://localhost:8800
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev          # opens http://localhost:5173
```

The client talks to the API through the axios instance in `frontend/src/lib/apiRequset.js` (base URL `http://localhost:8800/api`, cookies sent with every request).

> **Note:** if the API exits with `Cannot find package 'bcrypt'`, install it once with `npm i bcrypt` inside `api/`.

## API reference

| Method   | Endpoint                     | Auth   | Description |
| -------- | ---------------------------- | ------ | ----------- |
| `POST`   | `/api/auth/register`         | –      | Create an account |
| `POST`   | `/api/auth/login`            | –      | Sign in, sets `token` cookie |
| `POST`   | `/api/auth/logout`           | –      | Clear the auth cookie |
| `GET`    | `/api/posts`                 | –      | Listings with `city`, `type`, `property`, `bedroom`, `minPrice`, `maxPrice` filters |
| `GET`    | `/api/posts/:id`             | –      | Single listing incl. details, owner and `isSaved` |
| `POST`   | `/api/posts`                 | ✔      | Create a listing |
| `PUT`    | `/api/posts/:id`             | ✔      | Update a listing |
| `DELETE` | `/api/posts/:id`             | ✔      | Delete own listing |
| `GET`    | `/api/users/profilePosts`    | ✔      | Own + saved listings for the profile page |
| `POST`   | `/api/users/save`            | ✔      | Toggle save on a listing |
| `PUT`    | `/api/users/:id`             | ✔      | Update own profile |
| `DELETE` | `/api/users/:id`             | ✔      | Delete own account |
| `GET`    | `/api/chats`                 | ✔      | Chats for the current user (with receiver) |
| `GET`    | `/api/chats/:id`             | ✔      | Conversation incl. messages, marks seen |
| `POST`   | `/api/chats`                 | ✔      | Start a chat with a user |
| `PUT`    | `/api/chats/read/:id`        | ✔      | Mark a chat as read |
| `POST`   | `/api/messages/:chatId`      | ✔      | Send a message |

`✔` = requires a valid JWT cookie (`api/middleware/verifyToken.js`).
