using Microsoft.EntityFrameworkCore;
using BookPulse.Models;

namespace BookPulse.Data
{
    public class BookPulseDbContext : DbContext
    {
        public BookPulseDbContext(DbContextOptions<BookPulseDbContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Loan> Loans { get; set; }
        public DbSet<Rating> Ratings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Book configuration
            modelBuilder.Entity<Book>(entity =>
            {
                entity.HasIndex(e => e.ISBN).IsUnique();
                entity.Property(e => e.AverageRating).HasPrecision(3, 2);
            });

            // Member configuration
            modelBuilder.Entity<Member>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();
            });

            // Loan configuration
            modelBuilder.Entity<Loan>(entity =>
            {
                entity.HasOne(l => l.Book)
                    .WithMany(b => b.Loans)
                    .HasForeignKey(l => l.BookId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(l => l.Member)
                    .WithMany(m => m.Loans)
                    .HasForeignKey(l => l.MemberId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Rating configuration
            modelBuilder.Entity<Rating>(entity =>
            {
                entity.HasOne(r => r.Book)
                    .WithMany(b => b.Ratings)
                    .HasForeignKey(r => r.BookId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(r => r.Member)
                    .WithMany(m => m.Ratings)
                    .HasForeignKey(r => r.MemberId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(r => r.Loan)
                    .WithMany()
                    .HasForeignKey(r => r.LoanId)
                    .OnDelete(DeleteBehavior.Restrict);

                // A member can only rate a book once per loan
                entity.HasIndex(r => new { r.MemberId, r.LoanId }).IsUnique();
            });
        }
    }
}


