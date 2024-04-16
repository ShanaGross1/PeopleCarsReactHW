using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeopleCarsReactHW.Data
{
    public class CarRepo
    {
        private readonly string _connectionString;
        public CarRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Car> GetCars(int id)
        {
            using var context = new PeopleCarsDataContext(_connectionString);
            return context.Cars.Where(c => c.PersonId == id).ToList();
        }

        public void Add(Car car)
        {
            using var context = new PeopleCarsDataContext(_connectionString);
            context.Cars.Add(car);
            context.SaveChanges();
        }

        public void DeleteCars(int id)
        {
            using var context = new PeopleCarsDataContext(_connectionString);
            var carsToDelete = context.Cars.Where(c => c.PersonId == id);
            context.Cars.RemoveRange(carsToDelete);
            context.SaveChanges();
        }
    }
}
