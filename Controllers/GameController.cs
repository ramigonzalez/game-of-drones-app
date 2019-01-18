using Microsoft.AspNetCore.Mvc;
using System.Linq;
using GameOfDrones.Services;

using System;
using GameOfDrones.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace GameOfDrones.Controllers
{

     public class GameController : Controller
     {
          private GameDbContext _context;


          public GameController(GameDbContext context)
          {
               _context = context;
          }


          [HttpGet]
          [Route("api/statics")]
          public IActionResult GetWinners()
          {
               Console.WriteLine("################################");
               Console.WriteLine("#####  FETCHING HISTORY ... ####");
               Console.WriteLine("#####  " + _context.WinnerPlayers.Count() + " ITEMS RECEIVED.");
               Console.WriteLine("#################################");
               var orderedGames = _context.WinnerPlayers.OrderByDescending(x => x.Wins);
               return Ok(orderedGames);
          }

     }



}