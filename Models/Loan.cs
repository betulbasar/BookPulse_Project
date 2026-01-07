using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookPulse.Models
{
    public class Loan
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
        public DateTime LoanDate { get; set; } = DateTime.UtcNow;

        public DateTime? ReturnDate { get; set; }

        public DateTime DueDate { get; set; }

        public bool IsReturned { get; set; } = false;

        // Navigation properties
        public virtual Book Book { get; set; } = null!;
        public virtual Member Member { get; set; } = null!;
    }
}


