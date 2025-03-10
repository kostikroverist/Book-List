# Demo Book List

## Project Overview
Demo Book List is a CRUD React application built within a REST architecture. The application consists of two main pages:
- **Dashboard**: Displays a list of books with filtering options and management actions.
- **Add/Edit Book**: Allows users to add or modify book records.

## Features
### Dashboard
- Displays books in a table with the following columns:
  - **Book Title**
  - **Author Name**
  - **Category**
  - **ISBN**
  - **Created At** (format: `12 March 2022, 8:35 AM`)
  - **Modified At** (format: `13 March 2022, 1:48 PM`)
  - **Actions** (Edit, Delete, Deactivate/Reactivate)
- Filtering options:
  - Show All
  - Show Active (default)
  - Show Deactivated
- Sticky footer with a GitHub link.

### Book Management
- **Add/Edit a Book**
  - Form fields:
    - Book Title (required)
    - Author Name (required)
    - Category (select, required)
    - ISBN (required)
  - Validation to ensure all required fields are filled.
  - New books are stored in the database and displayed in the table.
  - Editing a book updates the record in the database.

### Additional Functionalities
- **Deactivate/Reactivate**: Highlights records accordingly.
- **Delete**: Only available for deactivated books.
- **Timezones**: Display times based on the user's timezone.
- **Fake REST API**: Uses `json-server` for backend operations.

## Installation & Setup
### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Clone the Repository
```sh
git clone https://github.com/kostikroverist/Book-List.git
cd demo-book-list
```

### Install Dependencies
```sh
npm install
# or
yarn install
```

### Run the Development Server
```sh
npm run dev
# or
yarn dev
```

### Run the JSON Server (Fake Backend)
```sh
npm run server
# or
yarn server
```
The backend will be running at `http://localhost:5000`.

### Build the Project
```sh
npm run build
# or
yarn build
```



## Fix for JSON Server Auto-Reload Issue
By default, changes in `db.json` cause a page reload. To prevent this, the Vite server configuration includes:
```js
server: {
  watch: {
    ignored: ["**/db.json"]
  }
}
```
This prevents unnecessary page reloads when updating the database.

## Technologies Used
- React.js
- Vite
- Tailwind CSS
- JSON Server
- TypeScript




