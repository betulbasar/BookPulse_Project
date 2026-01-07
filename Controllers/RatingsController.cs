using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookPulse.Data;
using BookPulse.DTOs;
using BookPulse.Models;

namespace BookPulse.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatingsController : ControllerBase
    {
        private readonly BookPulseDbContext _context;

        public RatingsController(BookPulseDbContext context)
        {
            _context = context;
        }

        // GET: api/Ratings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RatingDto>>> GetRatings()
        {
            var ratings = await _context.Ratings
                .Include(r => r.Book)
                .Include(r => r.Member)
                .Select(r => new RatingDto
                {
                    Id = r.Id,
                    BookId = r.BookId,
                    BookTitle = r.Book.Title,
                    MemberId = r.MemberId,
                    MemberName = $"{r.Member.FirstName} {r.Member.LastName}",
                    LoanId = r.LoanId,
                    Score = r.Score,
                    Comment = r.Comment,
                    CreatedAt = r.CreatedAt
                })
                .ToListAsync();

            return Ok(ratings);
        }

        // GET: api/Ratings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RatingDto>> GetRating(int id)
        {
            var rating = await _context.Ratings
                .Include(r => r.Book)
                .Include(r => r.Member)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (rating == null)
            {
                return NotFound();
            }

            var ratingDto = new RatingDto
            {
                Id = rating.Id,
                BookId = rating.BookId,
                BookTitle = rating.Book.Title,
                MemberId = rating.MemberId,
                MemberName = $"{rating.Member.FirstName} {rating.Member.LastName}",
                LoanId = rating.LoanId,
                Score = rating.Score,
                Comment = rating.Comment,
                CreatedAt = rating.CreatedAt
            };

            return Ok(ratingDto);
        }

        // GET: api/Ratings/book/5
        [HttpGet("book/{bookId}")]
        public async Task<ActionResult<IEnumerable<RatingDto>>> GetRatingsByBook(int bookId)
        {
            var ratings = await _context.Ratings
                .Include(r => r.Book)
                .Include(r => r.Member)
                .Where(r => r.BookId == bookId)
                .Select(r => new RatingDto
                {
                    Id = r.Id,
                    BookId = r.BookId,
                    BookTitle = r.Book.Title,
                    MemberId = r.MemberId,
                    MemberName = $"{r.Member.FirstName} {r.Member.LastName}",
                    LoanId = r.LoanId,
                    Score = r.Score,
                    Comment = r.Comment,
                    CreatedAt = r.CreatedAt
                })
                .ToListAsync();

            return Ok(ratings);
        }

        // POST: api/Ratings
        [HttpPost]
        public async Task<ActionResult<RatingDto>> CreateRating(CreateRatingDto createRatingDto)
        {
            var loan = await _context.Loans
                .Include(l => l.Book)
                .Include(l => l.Member)
                .FirstOrDefaultAsync(l => l.Id == createRatingDto.LoanId);

            if (loan == null)
            {
                return NotFound("Loan not found");
            }

            if (!loan.IsReturned)
            {
                return BadRequest("Cannot rate a book that has not been returned");
            }

            // Check if rating already exists for this loan
            if (await _context.Ratings.AnyAsync(r => r.LoanId == createRatingDto.LoanId))
            {
                return BadRequest("This loan has already been rated");
            }

            if (createRatingDto.Score < 1 || createRatingDto.Score > 5)
            {
                return BadRequest("Rating score must be between 1 and 5");
            }

            var rating = new Rating
            {
                BookId = loan.BookId,
                MemberId = loan.MemberId,
                LoanId = createRatingDto.LoanId,
                Score = createRatingDto.Score,
                Comment = createRatingDto.Comment
            };

            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();

            // Note: In a real scenario, the average rating would be updated by a SQL trigger
            // For now, we'll calculate it manually
            await UpdateBookAverageRating(loan.BookId);

            var ratingDto = new RatingDto
            {
                Id = rating.Id,
                BookId = rating.BookId,
                BookTitle = loan.Book.Title,
                MemberId = rating.MemberId,
                MemberName = $"{loan.Member.FirstName} {loan.Member.LastName}",
                LoanId = rating.LoanId,
                Score = rating.Score,
                Comment = rating.Comment,
                CreatedAt = rating.CreatedAt
            };

            return CreatedAtAction(nameof(GetRating), new { id = rating.Id }, ratingDto);
        }

        private async Task UpdateBookAverageRating(int bookId)
        {
            var averageRating = await _context.Ratings
                .Where(r => r.BookId == bookId)
                .AverageAsync(r => (decimal?)r.Score);

            var book = await _context.Books.FindAsync(bookId);
            if (book != null)
            {
                book.AverageRating = averageRating.HasValue ? Math.Round(averageRating.Value, 2) : null;
                await _context.SaveChangesAsync();
            }
        }
    }
}


