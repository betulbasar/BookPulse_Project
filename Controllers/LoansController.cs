using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookPulse.Data;
using BookPulse.DTOs;
using BookPulse.Models;

namespace BookPulse.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoansController : ControllerBase
    {
        private readonly BookPulseDbContext _context;

        public LoansController(BookPulseDbContext context)
        {
            _context = context;
        }

        // GET: api/Loans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoanDto>>> GetLoans()
        {
            var loans = await _context.Loans
                .Include(l => l.Book)
                .Include(l => l.Member)
                .Select(l => new LoanDto
                {
                    Id = l.Id,
                    BookId = l.BookId,
                    BookTitle = l.Book.Title,
                    MemberId = l.MemberId,
                    MemberName = $"{l.Member.FirstName} {l.Member.LastName}",
                    LoanDate = l.LoanDate,
                    ReturnDate = l.ReturnDate,
                    DueDate = l.DueDate,
                    IsReturned = l.IsReturned
                })
                .ToListAsync();

            return Ok(loans);
        }

        // GET: api/Loans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LoanDto>> GetLoan(int id)
        {
            var loan = await _context.Loans
                .Include(l => l.Book)
                .Include(l => l.Member)
                .FirstOrDefaultAsync(l => l.Id == id);

            if (loan == null)
            {
                return NotFound();
            }

            var loanDto = new LoanDto
            {
                Id = loan.Id,
                BookId = loan.BookId,
                BookTitle = loan.Book.Title,
                MemberId = loan.MemberId,
                MemberName = $"{loan.Member.FirstName} {loan.Member.LastName}",
                LoanDate = loan.LoanDate,
                ReturnDate = loan.ReturnDate,
                DueDate = loan.DueDate,
                IsReturned = loan.IsReturned
            };

            return Ok(loanDto);
        }

        // POST: api/Loans
        [HttpPost]
        public async Task<ActionResult<LoanDto>> CreateLoan(CreateLoanDto createLoanDto)
        {
            var book = await _context.Books.FindAsync(createLoanDto.BookId);
            if (book == null)
            {
                return NotFound("Book not found");
            }

            var member = await _context.Members.FindAsync(createLoanDto.MemberId);
            if (member == null)
            {
                return NotFound("Member not found");
            }

            if (!member.IsActive)
            {
                return BadRequest("Member is not active");
            }

            if (book.AvailableCopies <= 0)
            {
                return BadRequest("No available copies of this book");
            }

            var loan = new Loan
            {
                BookId = createLoanDto.BookId,
                MemberId = createLoanDto.MemberId,
                LoanDate = DateTime.UtcNow,
                DueDate = DateTime.UtcNow.AddDays(createLoanDto.LoanDays)
            };

            // Decrease available copies
            book.AvailableCopies--;

            _context.Loans.Add(loan);
            await _context.SaveChangesAsync();

            var loanDto = new LoanDto
            {
                Id = loan.Id,
                BookId = loan.BookId,
                BookTitle = book.Title,
                MemberId = loan.MemberId,
                MemberName = $"{member.FirstName} {member.LastName}",
                LoanDate = loan.LoanDate,
                ReturnDate = loan.ReturnDate,
                DueDate = loan.DueDate,
                IsReturned = loan.IsReturned
            };

            return CreatedAtAction(nameof(GetLoan), new { id = loan.Id }, loanDto);
        }

        // POST: api/Loans/return
        [HttpPost("return")]
        public async Task<ActionResult<LoanDto>> ReturnLoan(ReturnLoanDto returnLoanDto)
        {
            var loan = await _context.Loans
                .Include(l => l.Book)
                .Include(l => l.Member)
                .FirstOrDefaultAsync(l => l.Id == returnLoanDto.LoanId);

            if (loan == null)
            {
                return NotFound("Loan not found");
            }

            if (loan.IsReturned)
            {
                return BadRequest("Book has already been returned");
            }

            loan.IsReturned = true;
            loan.ReturnDate = DateTime.UtcNow;

            // Increase available copies
            loan.Book.AvailableCopies++;

            await _context.SaveChangesAsync();

            var loanDto = new LoanDto
            {
                Id = loan.Id,
                BookId = loan.BookId,
                BookTitle = loan.Book.Title,
                MemberId = loan.MemberId,
                MemberName = $"{loan.Member.FirstName} {loan.Member.LastName}",
                LoanDate = loan.LoanDate,
                ReturnDate = loan.ReturnDate,
                DueDate = loan.DueDate,
                IsReturned = loan.IsReturned
            };

            return Ok(loanDto);
        }
    }
}

