using Microsoft.EntityFrameworkCore;
using GameOfDrones.Entities;
namespace GameOfDrones.Services
{
     public class GameDbContext : DbContext
     {
          public DbSet<WinnerPlayer> WinnerPlayers { get; set; }
          public GameDbContext(
               DbContextOptions<GameDbContext> options)
               : base(options)
          {
               Database.EnsureCreated();
          }
     }
}