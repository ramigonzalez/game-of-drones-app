using System.Collections.Generic;
using System.Linq;
using GameOfDrones.Entities;
namespace GameOfDrones.Services
{
     public static class GameDbContextExtensions
     {
          public static void CreateSeedData(this GameDbContext context)
          {
               if (context.WinnerPlayers.Any())
                    return;
               var winnerPlayers = new List<WinnerPlayer>()
               {
                    new WinnerPlayer()
                    {
                        Name = "Ramiro",
                        Wins = 10
                    },
                    new WinnerPlayer()
                    {
                        Name = "Diego",
                        Wins = 9
                    },
                    new WinnerPlayer()
                    {
                        Name = "Bruno",
                        Wins = 8
                    }
               };
               context.AddRange(winnerPlayers);
               context.SaveChanges();
          }
     }
}