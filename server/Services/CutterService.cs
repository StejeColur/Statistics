using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using server.Entities;
using server.Helpers;

namespace server.Services
{
    public interface ICutterService
    {
        IEnumerable<Cutter> GetAll();
        Cutter GetById(int id);
        Cutter GetByIdSQL(int id);
        List<CutterList> GetMachineInfo(string start, string end);
    }

    public class CutterService : ICutterService
    {
        private DataContext _context;

        public CutterService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<Cutter> GetAll()
        {
            return _context.cutter;
        }

        public Cutter GetById(int id)
        {
            return _context.cutter.Find(id);
        }

        public Cutter GetByIdSQL(int id)
        {
            var cutterId = new MySqlParameter("@id", id);
            var cutter = _context.cutter
                .FromSql("SELECT * FROM cutter WHERE id = @id", cutterId).FirstOrDefault();
            return cutter;
        }

        public List<CutterList> GetMachineInfo(string start, string end)
        {
            var tempListCutterList = new List<CutterList>();
            var cutterList = from c in _context.cutter
                             select new { c.Id, c.name };

            foreach (var cutter in cutterList)
            {
                var tempCutterList = new CutterList();
                var tempListTool = new List<Tools>();
                tempCutterList.Id = cutter.Id;
                tempCutterList.Cutter_name = cutter.name;

                var cutterListTime =
                    from j in _context.job
                    where j.cutter_id == cutter.Id
                    where (DateTime.Parse(j.cut_start).CompareTo(DateTime.Parse(start)) >= 0 &&
                    DateTime.Parse(j.cut_start).CompareTo(DateTime.Parse(end)) <= 0)
                    select new
                    {
                        Id =j.Id,
                        TotalDuration = j.total_duration,
                        LoadDuration = j.idle_time_unload_load_time,
                        RegDuration = j.idle_time_registration_help,
                        OffDuration = j.idle_time_plotter_offline,
                        PausedDuration = j.idle_time_paused
                    };

                var cutterListTimeRuned = cutterListTime.ToList();
                double TotalDuration = cutterListTimeRuned.Sum(item => item.TotalDuration);
                double LoadDuration = cutterListTimeRuned.Sum(item => item.LoadDuration);
                double RegDuration = cutterListTimeRuned.Sum(item => item.RegDuration);
                double OffDuration = cutterListTimeRuned.Sum(item => item.OffDuration);
                double PausedDuration = cutterListTimeRuned.Sum(item => item.PausedDuration);

                int TimeRuned = (int)(TotalDuration - LoadDuration - RegDuration - OffDuration - PausedDuration);

                tempCutterList.Time_Runed = TimeRuned;

                List<int> jobIdList = new List<int>();
                foreach (var job in cutterListTimeRuned) {
                    jobIdList.Add(job.Id);
                }


                var toolUsedOnMachine =
                    from l in _context.layer
                    where jobIdList.Contains(l.job_id)
                    group l by l.tool into layerGroup
                    select new
                    {
                        Tool = layerGroup.Key,
                        Meters = layerGroup.Sum(x => x.tool_meters),
                    };

                foreach (var item in toolUsedOnMachine)
                {
                    var tempTool = new Tools();
                    tempTool.Name = item.Tool;
                    tempTool.Meters = item.Meters;

                    tempListTool.Add(tempTool);
                }
                tempCutterList.Tools = tempListTool;
                tempListCutterList.Add(tempCutterList);
            }
            return tempListCutterList;
        }
    }
}