namespace BookPulse.DTOs
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string? ISBN { get; set; }
        public int TotalCopies { get; set; }
        public int AvailableCopies { get; set; }
        public decimal? AverageRating { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateBookDto
    {
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string? ISBN { get; set; }
        public int TotalCopies { get; set; }
    }

    public class UpdateBookDto
    {
        public string? Title { get; set; }
        public string? Author { get; set; }
        public string? ISBN { get; set; }
        public int? TotalCopies { get; set; }
    }
}

