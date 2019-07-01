using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using server.Entities;

namespace server.Helpers
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Cutter> cutter { get; set; }
        public DbSet<Job> job { get; set; }
        public DbSet<Layer> layer { get; set; }
    }
}