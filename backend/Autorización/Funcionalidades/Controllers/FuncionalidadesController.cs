using backend.connection;
using backend.Autorizacion.Funcionalidades.entidades;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using backend.servicios;
namespace backend.Controllers
{
    [EnableCors("DevelopmentCors")]
    [ApiController]
    [Route("api/[controller]")]
    public class FuncionalidadesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly string? connectionString;

        public FuncionalidadesController(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration["SqlConnectionString:DefaultConnection"];
            BDManager.GetInstance.ConnectionString = connectionString;
        }

        [HttpGet]
        [Route("GetAllFuncionalidades")]
        public IActionResult GetAllFuncionalidades()
        {
            try
            {
                var result = FuncionalidadesServicios.ObtenerTodo<Funcionalidad>();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("GetFuncionalidadById")]
        public IActionResult GetFuncionalidadById([FromQuery]int id)
        {
            try
            {
                var result = FuncionalidadesServicios.ObtenerFuncionalidadPorId<Funcionalidad>(id);
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
        [Route("AddFuncionalidad")]
        public IActionResult AddFuncionalidad(Funcionalidad funcionalidad)
        {
            try
            {
                var result = FuncionalidadesServicios.InsertarFuncionalidad(funcionalidad);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        [Route("UpdateFuncionalidad")]
        public IActionResult UpdateFuncionalidad(Funcionalidad funcionalidad)
        {
            try
            {
                var result = FuncionalidadesServicios.ActualizarFuncionalidad(funcionalidad);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteFuncionalidad")]
        public IActionResult DeleteFuncionalidad([FromQuery]int id)
        {
            try
            {
                var result = FuncionalidadesServicios.EliminarFuncionalidad(id);
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