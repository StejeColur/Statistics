using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Entities
{
    public class Layer
    {
        [Key]
        public int Id { get; set; }
        public int job_id { get; set; }
        public string name { get; set; }
        public string tool { get; set; }
        public int tool_meters { get; set; }
        public int tool_seconds { get; set; }
        public int tool_activations { get; set; }



    }
}