using backend.connection;
using backend.Autorizacion.RolesUsuarios.entidades;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using backend.servicios;
namespace backend.Controllers
{
    [EnableCors("DevelopmentCors")]
    [ApiController]
    [Route("api/[controller]")]
    public class RolesUsuariosController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly string? connectionString;

        public RolesUsuariosController(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration["SqlConnectionString:DefaultConnection"];
            BDManager.GetInstance.ConnectionString = connectionString;
        }

        [HttpGet]
        [Route("GetAllRolesUsuarios")]
        public IActionResult GetAllRolesUsuarios()
        {
            try
            {
                var result = RolesUsuariosServicios.ObtenerTodos();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("GetRolesUsuarioById")]
        public IActionResult GetRolesUsuarioById([FromQuery]int id)
        {
            try
            {
                var result = RolesUsuariosServicios.ObtenerRolPorId(id);
                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Route("AddRolesUsuario")]
        public IActionResult AddRolesUsuario(RolesUsuarios rol)
        {
            try
            {
                var result = RolesUsuariosServicios.InsertarRol(rol);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        [Route("UpdateRolesUsuario")]
        public IActionResult UpdateRolesUsuario(RolesUsuarios rol)
        {
            try
            {
                var result = RolesUsuariosServicios.ActualizarRol(rol);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteRolesUsuario")]
        public IActionResult DeleteRolesUsuario([FromQuery]int id)
        {
            try
            {
                var result = RolesUsuariosServicios.EliminarRol(id);
                if (result > 0)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}