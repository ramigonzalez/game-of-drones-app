using Microsoft.AspNetCore.Mvc;
namespace GameOfDrones.Controllers
{
     [Route("/home")]
     [Route("/")]
     public class HomeController : Controller
     {
          public IActionResult Index()
          {
               return View();
          }
     }
}