# BookPulse_Project

BookPulse: a SQL Server–based library management database project.

## Project Description

BookPulse is a database-driven application designed to manage a small library's key operations, including book inventory, member registration, and loan tracking. The system allows members to borrow and return books, while automatically updating available stock. After returning a book, users can rate it between 1 and 5. The database stores these ratings and automatically updates each book's average rating using SQL triggers.

Main entities include Books, Members, Loans, and Ratings. The project demonstrates normalization, foreign key relationships, and SQL automation through triggers and views.

## Technology Stack

- **.NET 8.0**
- **ASP.NET Core Web API**
- **Entity Framework Core** (Code First approach)
- **PostgreSQL** (production) / **InMemory** (testing)
- **xUnit** (testing)

## Project Structure

```
BookPulse_Project/
├── Controllers/          # API Controllers
│   ├── BooksController.cs
│   ├── MembersController.cs
│   ├── LoansController.cs
│   └── RatingsController.cs
├── Models/              # Entity Models
│   ├── Book.cs
│   ├── Member.cs
│   ├── Loan.cs
│   └── Rating.cs
├── Data/                # DbContext
│   └── BookPulseDbContext.cs
├── DTOs/                # Data Transfer Objects
│   ├── BookDto.cs
│   ├── MemberDto.cs
│   ├── LoanDto.cs
│   └── RatingDto.cs
└── Tests/               # Unit Tests
    └── Unit/
        ├── BooksControllerTests.cs
        └── LoansControllerTests.cs
```

## Setup Instructions

### 1. Restore Dependencies

```bash
dotnet restore
```

### 2. Testing Without Database (InMemory)

The project is configured to use InMemory database by default when no connection string is provided. You can test the application immediately:

```bash
dotnet run
```

The API will be available at `https://localhost:5001` or `http://localhost:5000`

### 3. Connect to PostgreSQL

When you're ready to connect to PostgreSQL:

1. Update `appsettings.json` or `appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=BookPulseDb;Username=your_username;Password=your_password"
  }
}
```

2. Create initial migration:

```bash
dotnet ef migrations add InitialCreate
```

3. Apply migration to database:

```bash
dotnet ef database update
```

4. Run the application:

```bash
dotnet run
```

### 4. Running Tests

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

- ✅ Code First approach with Entity Framework Core
- ✅ PostgreSQL support (ready for production)
- ✅ InMemory database for testing without database setup
- ✅ RESTful API with full CRUD operations
- ✅ Automatic stock management (available copies update on loan/return)
- ✅ Rating system with average calculation
- ✅ Unit tests with xUnit
- ✅ Swagger/OpenAPI documentation

## Future Enhancements

- SQL triggers for automatic average rating calculation
- Additional features to improve and expand the system
