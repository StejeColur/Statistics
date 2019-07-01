using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Entities
{
	public class CutterList
	{
        public int Id { get; set; }
        public string Cutter_name { get; set; }
        public int Time_Runed { get; set; }
        public string Time_units { get; set; }
        public List<Tools> Tools { get; set; }

    }
}