using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeopleCarsReactHW.Data
{
    public class PersonRepo
    {
        private readonly string _connectionString;
        public PersonRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetPeople()
        {
            using var context = new PeopleCarsDataContext(_connectionString);
            return context.People.Include(p => p.Cars).ToList();
        }

        public void Add(Person person)
        {
            using var context = new PeopleCarsDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public Person GetById (int id)
        {
            using var context = new PeopleCarsDataContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }
    }
}
