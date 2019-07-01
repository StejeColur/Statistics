using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Entities
{
    public class Job
    {
        [Key]
        public int Id { get; set; }
        public string original_filename  { get; set; }
        public string cut_start { get; set; }
        public string cut_end { get; set; }
        public double idle_time_unload_load_time { get; set; }
        public double idle_time_registration_help { get; set; }
        public double idle_time_plotter_offline { get; set; }
        public double idle_time_paused { get; set; }
        public int total_duration { get; set; }
        public string total_duration_unit { get; set; }
        public int copies { get; set; }
        public string media { get; set; }
        public string production_mode { get; set; }
        public string type { get; set; }
        public string canceled { get; set; }
        public int cutter_id { get; set; }
    }
}