namespace BookPulse.DTOs
{
    public class LoanDto
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public string BookTitle { get; set; } = string.Empty;
        public int MemberId { get; set; }
        public string MemberName { get; set; } = string.Empty;
        public DateTime LoanDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsReturned { get; set; }
    }

    public class CreateLoanDto
    {
        public int BookId { get; set; }
        public int MemberId { get; set; }
        public int LoanDays { get; set; } = 14; // Default 14 days
    }

    public class ReturnLoanDto
    {
        public int LoanId { get; set; }
    }
}

