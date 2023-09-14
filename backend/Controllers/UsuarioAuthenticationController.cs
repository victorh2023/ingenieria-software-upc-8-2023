
using backend.connection;
using backend.entidades;
using backend.servicios;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;
[EnableCors("DevelopmentCors")]
[ApiController]
[Route("api/[controller]")]
public class UsuarioAuthenticationController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly string? connectionString;

    public UsuarioAuthenticationController(IConfiguration configuration)
    {
        _configuration = configuration;
        connectionString = _configuration["SqlConnectionString:DefaultConnection"];
        BDManager.GetInstance.ConnectionString = connectionString;
        // BDManager.GetInstance.ConnectionString = "workstation id=database-hermes.mssql.somee.com;packet size=4096;user id=hcayalo_SQLLogin_1;pwd=2itb6kw6gc;data source=database-hermes.mssql.somee.com;persist security info=False;initial catalog=database-hermes";
    }


    [HttpGet]
    [Route("UserLogin")]
    public IActionResult userLogin([FromQuery] string user, [FromQuery] string pass)
    {
        try
        {
            var result = UsuarioLoginServicios.ObtenerByUserAndPass<Usuarios>(user, pass);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost]
    [Route("CambiarContrasenia")]
    public IActionResult cambiarContrasenia(Usuarios usuarios, [FromQuery] string oldPass, [FromQuery] string newPass)
    {
        if (usuarios.Password == oldPass.ToString())
        {
            try
            {
                var result = UsuarioLoginServicios.changeUserPassword(usuarios, newPass);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        else {
            return StatusCode(500, "Pass incorrecto: "+newPass.ToString());;
        };

    }
}