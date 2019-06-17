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
    }
}