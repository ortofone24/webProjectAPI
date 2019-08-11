using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebProject.API.Data;
using WebProject.API.Dtos;
using WebProject.API.Models;

namespace WebProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repository;
        public AuthController(IAuthRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            
            /* Ustawiamy w przypadku gdy jest zwykły kontroler nie API
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            */

            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if(await _repository.UserExists(userForRegisterDto.Username))
            {
                return BadRequest("Użytkownik o takiej nazwie juz istnieje !");
            }

            var userToCreate = new User
            {
                Username = userForRegisterDto.Username
            };

            var createdUser = await _repository.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }
    }
}