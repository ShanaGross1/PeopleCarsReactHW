using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeopleCarsReactHW.Data;

namespace PeopleCarsReactHW.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getpeople")]
        public List<Person> GetPeople()
        {
            var repo = new PersonRepo(_connectionString);
            return repo.GetPeople();
        }

        [HttpPost("addperson")]
        public void Add(Person person)
        {
            var repo = new PersonRepo(_connectionString);
            repo.Add(person);
        }

        [Route("getbyid")]
        public Person GetById(int id)
        {
            var repo = new PersonRepo(_connectionString);
            return repo.GetById(id);
        }
    }
}
