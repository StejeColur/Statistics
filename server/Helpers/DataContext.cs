using Microsoft.EntityFrameworkCore;
using server.Entities;

namespace server.Helpers
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Cutter> cutter { get; set; }
    }
}