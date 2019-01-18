using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace GameOfDrones.Entities
{
     public class WinnerPlayer
     {
          
          [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
          [Key]
          [MaxLength(100)]
          public string Name { get; set; }

          public int Wins { get; set; }

          override
          public string ToString(){ return "PLAYER NAME: " + Name + " \nWINS: " + Wins;}
    }
}