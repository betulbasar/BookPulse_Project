# BookPulse_Project

BookPulse: A PostgreSQL-based library management system with React frontend.

## Project Description

BookPulse is a database-driven application designed to manage a small library's key operations, including book inventory, member registration, and loan tracking. The system allows members to borrow and return books, while automatically updating available stock. After returning a book, users can rate it between 1 and 5. The database stores these ratings and automatically updates each book's average rating using SQL triggers.

Main entities include Books, Members, Loans, and Ratings. The project demonstrates normalization, foreign key relationships, and SQL automation through triggers and views.

## Technology Stack

- **Backend**
  - **.NET 8.0**
  - **ASP.NET Core Web API**
  - **Entity Framework Core** (Code First approach)
  - **PostgreSQL** (production) / **InMemory** (testing)
  - **xUnit** (testing)
- **Frontend**
  - **React 18 + TypeScript**
  - **Vite**
  - **React Router**
  - **TanStack Query (React Query)**
  - **Axios**
  - **React Hook Form + Zod**
  - **Tailwind CSS**

## Project Structure

```
BookPulse_Project/
├── Controllers/          # API Controllers
│   ├── BooksController.cs
│   ├── MembersController.cs
│   ├── LoansController.cs
│   └── RatingsController.cs
├── Models/               # Entity Models
│   ├── Book.cs
│   ├── Member.cs
│   ├── Loan.cs
│   └── Rating.cs
├── Data/                 # DbContext
│   └── BookPulseDbContext.cs
├── DTOs/                 # Data Transfer Objects
│   ├── BookDto.cs
│   ├── MemberDto.cs
│   ├── LoanDto.cs
│   └── RatingDto.cs
├── frontend/             # React + TypeScript frontend
│   ├── src/
│   │   ├── components/   # UI components (common, books, members, loans)
│   │   ├── pages/        # Pages (Dashboard, Books, Members, Loans)
│   │   ├── services/     # API service wrappers (Axios)
│   │   ├── types/        # Shared TypeScript types (Book, Member, Loan, Rating)
│   │   └── index.css     # Global styles (Tailwind CSS)
│   └── vite.config.ts    # Vite config + dev server
└── Tests/                # Unit Tests
    └── Unit/
        ├── BooksControllerTests.cs
        └── LoansControllerTests.cs
```

## Setup Instructions (Backend + Frontend)

### 1. Backend Setup

#### 1.1 Restore Dependencies

```bash
dotnet restore
```

#### 1.2 Configure PostgreSQL

Update `appsettings.json` or `appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=BookPulseDb;Username=your_username;Password=your_password"
  }
}
```

Create and apply migrations:

```bash
dotnet ef migrations add InitialCreate   # only on first setup
dotnet ef database update
```

#### 1.3 Run Backend

```bash
dotnet run
```

The API will be available at `http://localhost:5000` and Swagger UI at `http://localhost:5000/swagger`.

### 2. Frontend Setup (`frontend/`)

```bash
cd frontend
npm install
npm run dev
```

The React app will be available at `http://localhost:5173`.

> **Note:** The frontend makes API requests to the backend at `http://localhost:5000/api`. If you change the port, update the `baseURL` value in `frontend/src/services/api.ts`.

### 3. Running Tests (Backend)

```bash
cd Tests
dotnet test
```

## API Endpoints

### Books
- `GET /api/Books` - Get all books
- `GET /api/Books/{id}` - Get book by ID
- `POST /api/Books` - Create a new book
- `PUT /api/Books/{id}` - Update a book
- `DELETE /api/Books/{id}` - Delete a book

### Members
- `GET /api/Members` - Get all members
- `GET /api/Members/{id}` - Get member by ID
- `POST /api/Members` - Register a new member
- `PUT /api/Members/{id}` - Update a member
- `DELETE /api/Members/{id}` - Delete a member

### Loans
- `GET /api/Loans` - Get all loans
- `GET /api/Loans/{id}` - Get loan by ID
- `POST /api/Loans` - Create a new loan (borrow a book)
- `POST /api/Loans/return` - Return a book

### Ratings
- `GET /api/Ratings` - Get all ratings
- `GET /api/Ratings/{id}` - Get rating by ID
- `GET /api/Ratings/book/{bookId}` - Get ratings for a specific book
- `POST /api/Ratings` - Create a rating (after returning a book)

## Swagger Documentation

When running in Development mode, Swagger UI is available at:
- `https://localhost:5001/swagger` or `http://localhost:5000/swagger`

## Features

### Backend
- ✅ Code First approach with Entity Framework Core
- ✅ PostgreSQL support (ready for production)
- ✅ InMemory database for testing without database setup
- ✅ RESTful API with full CRUD operations
- ✅ Automatic stock management (available copies update on loan/return)
- ✅ Rating system with average calculation
- ✅ Unit tests with xUnit
- ✅ Swagger/OpenAPI documentation

### Frontend
- ✅ Modern React + TypeScript UI
- ✅ Responsive design with Tailwind CSS
- ✅ Dashboard with statistics and overview
- ✅ Book management (list, add, search, delete)
- ✅ Member management (list, add, search, delete)
- ✅ Loan management (borrow, return, filter)
- ✅ Form validation with React Hook Form + Zod
- ✅ Real-time data fetching with TanStack Query

## Future Enhancements

- SQL triggers for automatic average rating calculation
- Additional features to improve and expand the system
