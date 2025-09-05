# Shopping List App (React + TS + Vite + Redux + JSON Server)

Meets the full brief:
- Register/Login (AES encrypted passwords using crypto-js)
- Protected routes
- Profile (view/update fields + change password)
- CRUD shopping lists (name, quantity, notes, category, image upload)
- Search + Sort synced with URL (`q`, `sort`) and reactive to URL changes
- Share list public link `/share/:id`
- Redux Toolkit for state
- JSON Server for persistence
- React-Toastify notifications
- At least 3 class components (NavBar, ShoppingListItem; convert more if desired)

## Quick start
```bash
npm install
npm run server   # http://localhost:5000
npm start        # http://localhost:3000
```
Use the seeded account to test:
- Email: `demo@example.com`
- Password: `demo-secret-key` (if not working, register a new user)

## Branching
- Work on `dev` branch and commit frequently.
- Open PRs to `main` after review.

## Notes
- Encryption is demo-only (AES); do not use in production.
- Images are stored as Base64 in `db.json`.
