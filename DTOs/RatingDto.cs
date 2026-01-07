namespace BookPulse.DTOs
{
    public class RatingDto
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public string BookTitle { get; set; } = string.Empty;
        public int MemberId { get; set; }
        public string MemberName { get; set; } = string.Empty;
        public int LoanId { get; set; }
        public int Score { get; set; }
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateRatingDto
    {
        public int LoanId { get; set; }
        public int Score { get; set; }
        public string? Comment { get; set; }
    }
}


