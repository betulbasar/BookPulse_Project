using Microsoft.EntityFrameworkCore;
using BookPulse.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrEmpty(connectionString))
{
    // Use InMemory database for testing when no connection string is provided
    builder.Services.AddDbContext<BookPulseDbContext>(options =>
        options.UseInMemoryDatabase("BookPulseDb"));
}
else
{
    // Use PostgreSQL when connection string is provided
    builder.Services.AddDbContext<BookPulseDbContext>(options =>
        options.UseNpgsql(connectionString));
}

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
// Swagger is always enabled for API documentation
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "BookPulse API V1");
    c.RoutePrefix = "swagger";
});

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();

// Root endpoint - redirect to Swagger
app.MapGet("/", () => Results.Redirect("/swagger"));

app.MapControllers();

// Ensure database is created (for InMemory or initial PostgreSQL setup)
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<BookPulseDbContext>();
    
    // For PostgreSQL, use migrations instead
    if (context.Database.IsInMemory())
    {
        context.Database.EnsureCreated();
    }
}

app.Run();


