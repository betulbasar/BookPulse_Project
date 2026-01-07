using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookPulse.Controllers;
using BookPulse.Data;
using BookPulse.DTOs;
using Xunit;

namespace BookPulse.Tests.Unit
{
    public class BooksControllerTests
    {
        private BookPulseDbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<BookPulseDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            return new BookPulseDbContext(options);
        }

        [Fact]
        public async Task GetBooks_ReturnsAllBooks()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var controller = new BooksController(context);

            // Add test data
            context.Books.Add(new BookPulse.Models.Book
            {
                Title = "Test Book",
                Author = "Test Author",
                TotalCopies = 5,
                AvailableCopies = 5
            });
            await context.SaveChangesAsync();

            // Act
            var result = await controller.GetBooks();

            // Assert
            var okResult = Assert.IsType<ActionResult<IEnumerable<BookDto>>>(result);
            var books = Assert.IsType<OkObjectResult>(okResult.Result).Value as IEnumerable<BookDto>;
            Assert.Single(books!);
        }

        [Fact]
        public async Task CreateBook_CreatesNewBook()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var controller = new BooksController(context);

            var createDto = new CreateBookDto
            {
                Title = "New Book",
                Author = "New Author",
                TotalCopies = 10
            };

            // Act
            var result = await controller.CreateBook(createDto);

            // Assert
            var createdResult = Assert.IsType<ActionResult<BookDto>>(result);
            var bookDto = Assert.IsType<CreatedAtActionResult>(createdResult.Result).Value as BookDto;
            Assert.Equal("New Book", bookDto!.Title);
            Assert.Equal(10, bookDto.AvailableCopies);
        }
    }
}

