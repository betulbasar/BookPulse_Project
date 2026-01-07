using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookPulse.Models
{
    public class Rating
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Book))]
        public int BookId { get; set; }

        [Required]
        [ForeignKey(nameof(Member))]
        public int MemberId { get; set; }

        [Required]
        [ForeignKey(nameof(Loan))]
        public int LoanId { get; set; }

        [Required]
        [Range(1, 5)]
        public int Score { get; set; }

        [StringLength(1000)]
        public string? Comment { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual Book Book { get; set; } = null!;
        public virtual Member Member { get; set; } = null!;
        public virtual Loan Loan { get; set; } = null!;
    }
}

