using Microsoft.AspNetCore.Mvc;
using System.Linq;
using GameOfDrones.Services;

using System;
using GameOfDrones.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;


namespace GameOfDrones.Controllers
{

    
     public class ResultController : Controller
     {
          private GameDbContext _context;


          public ResultController(GameDbContext context)
          {
               _context = context;
          }

          [HttpPost]
          [Route("api/updateDb")]  
          public int UpdateGame([FromBody] WinnerPlayer wp)  
          {
               int result = 0;
               try{
                    WinnerPlayer player = ExistPlayer(wp.Name);
                    if(player != null){
                         Console.WriteLine("########################");
                         Console.WriteLine("#####  UPDATING ... ####");
                         Console.WriteLine("########################");
                         player.Wins ++;
                         result = Update(player);
                    }
                    else{
                         Console.WriteLine("########################");
                         Console.WriteLine("#####  CREATING ... ####");
                         Console.WriteLine("########################");
                         result = Create(new WinnerPlayer{Name = wp.Name, Wins = 1});
                    }
               }catch(Exception e){
                    Console.WriteLine("############################");
                    Console.WriteLine("##  APPLICATION FAILS ... ##");
                    Console.WriteLine("##  MESSAGE: "+e.Message+" ... ##");
                    Console.WriteLine("#############################");
               }
               return result;  
          }

          private WinnerPlayer ExistPlayer(String id){
               WinnerPlayer item = _context.WinnerPlayers.Find(id); 
               Console.WriteLine("########################");
               Console.WriteLine("#####  CHECKING ... ####");
               if(item != null)
                    Console.WriteLine(item.ToString());
               else                
               Console.WriteLine("###  USER NOT FOUND  ###");
               Console.WriteLine("########################");
               return item;
          }

          private int Create(WinnerPlayer winnerPlayer){
               _context.WinnerPlayers.Add(winnerPlayer);
               return _context.SaveChanges();
          }

          private int Update(WinnerPlayer winnerPlayer){
               _context.Entry(winnerPlayer).State = EntityState.Modified;  
               _context.SaveChanges(); 
               return 1;
          }

     }



}