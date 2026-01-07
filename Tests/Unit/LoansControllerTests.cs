using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookPulse.Controllers;
using BookPulse.Data;
using BookPulse.DTOs;
using BookPulse.Models;
using Xunit;

namespace BookPulse.Tests.Unit
{
    public class LoansControllerTests
    {
        private BookPulseDbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<BookPulseDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            return new BookPulseDbContext(options);
        }

        [Fact]
        public async Task CreateLoan_DecreasesAvailableCopies()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var controller = new LoansController(context);

            var book = new Book
            {
                Title = "Test Book",
                Author = "Test Author",
                TotalCopies = 5,
                AvailableCopies = 5
            };
            var member = new Member
            {
                FirstName = "John",
                LastName = "Doe",
                Email = "john@test.com",
                IsActive = true
            };

            context.Books.Add(book);
            context.Members.Add(member);
            await context.SaveChangesAsync();

            var createDto = new CreateLoanDto
            {
                BookId = book.Id,
                MemberId = member.Id,
                LoanDays = 14
            };

            // Act
            var result = await controller.CreateLoan(createDto);

            // Assert
            var createdResult = Assert.IsType<ActionResult<LoanDto>>(result);
            Assert.NotNull(createdResult.Result);

            // Verify available copies decreased
            var updatedBook = await context.Books.FindAsync(book.Id);
            Assert.Equal(4, updatedBook!.AvailableCopies);
        }

        [Fact]
        public async Task ReturnLoan_IncreasesAvailableCopies()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var controller = new LoansController(context);

            var book = new Book
            {
                Title = "Test Book",
                Author = "Test Author",
                TotalCopies = 5,
                AvailableCopies = 4
            };
            var member = new Member
            {
                FirstName = "John",
                LastName = "Doe",
                Email = "john@test.com",
                IsActive = true
            };
            var loan = new Loan
            {
                BookId = book.Id,
                MemberId = member.Id,
                LoanDate = DateTime.UtcNow,
                DueDate = DateTime.UtcNow.AddDays(14),
                IsReturned = false
            };

            context.Books.Add(book);
            context.Members.Add(member);
            context.Loans.Add(loan);
            await context.SaveChangesAsync();

            var returnDto = new ReturnLoanDto { LoanId = loan.Id };

            // Act
            var result = await controller.ReturnLoan(returnDto);

            // Assert
            var okResult = Assert.IsType<ActionResult<LoanDto>>(result);
            Assert.NotNull(okResult.Result);

            // Verify available copies increased
            var updatedBook = await context.Books.FindAsync(book.Id);
            Assert.Equal(5, updatedBook!.AvailableCopies);

            // Verify loan is marked as returned
            var updatedLoan = await context.Loans.FindAsync(loan.Id);
            Assert.True(updatedLoan!.IsReturned);
        }
    }
}

