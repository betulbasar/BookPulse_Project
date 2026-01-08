using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace BookPulse.Data
{
    public class BookPulseDbContextFactory : IDesignTimeDbContextFactory<BookPulseDbContext>
    {
        public BookPulseDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<BookPulseDbContext>();
            
            // For design-time (migrations), use a placeholder connection string
            // The actual connection string will be read from appsettings.json at runtime
            optionsBuilder.UseNpgsql("Host=localhost;Database=BookPulseDb;Username=postgres;Password=postgres");

            return new BookPulseDbContext(optionsBuilder.Options);
        }
    }
}


