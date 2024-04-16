using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeopleCarsReactHW.Data;
using PeopleCarsReactHW.Web.Models;

namespace PeopleCarsReactHW.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private string _connectionString;

        public CarsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getcars")]
        public List<Car> GetCars(int id)
        {
            var repo = new CarRepo(_connectionString);
            return repo.GetCars(id);
        }

        [HttpPost]
        [Route("addcar")]
        public void Add(Car car)
        {
            var repo = new CarRepo(_connectionString);
            repo.Add(car);
        }

        [HttpPost]
        [Route("deletecars")]
        public void DeleteMany(DeleteCarsViewModel vm)
        {
            var repo = new CarRepo(_connectionString);
            repo.DeleteCars(vm.Id);
        }
    }
}
