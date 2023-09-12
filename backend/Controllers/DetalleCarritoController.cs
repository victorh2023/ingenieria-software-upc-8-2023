using backend.connection;
using backend.entidades;
using backend.servicios;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DetalleCarritoController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly string? connectionString;

    public DetalleCarritoController(IConfiguration configuration)
    {
        _configuration = configuration;
        connectionString = _configuration["SqlConnectionString:DefaultConnection"];
        BDManager.GetInstance.ConnectionString = connectionString;
        // BDManager.GetInstance.ConnectionString = "workstation id=database-hermes.mssql.somee.com;packet size=4096;user id=hcayalo_SQLLogin_1;pwd=2itb6kw6gc;data source=database-hermes.mssql.somee.com;persist security info=False;initial catalog=database-hermes";
    }

    [HttpGet]
    [Route("GetAllDetalleCarrito")]
    public IActionResult GetAllDetalleCarrito()
    {
        try
        {
            var result = DetalleCarritoServicios.ObtenerTodo<DetalleCarrito>();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet]
    [Route("GetDetalleCarritoById")]
    public IActionResult GetDetalleCarritoById([FromQuery]int id)
    {
        try
        {
            var result = DetalleCarritoServicios.ObtenerById<DetalleCarrito>(id);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost]
    [Route("AddDetalleCarrito")]
    public IActionResult AddDetalleCarrito(DetalleCarrito detalleCarrito){
        try{
            var result = DetalleCarritoServicios.InsertDetalleCarrito(detalleCarrito);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    } 

        [HttpPut]
    [Route("UpdateDetalleCarrito")]
    public IActionResult UpdateDetalleCarrito(DetalleCarrito detalleCarrito)
    {
        try
        {
            var result = DetalleCarritoServicios.UpdateDetalleCarrito(detalleCarrito);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete]
    [Route("DeleteDetalleCarrito")]
    public IActionResult DeleteDetalleCarrito([FromQuery]int id)
    {
        try
        {
            var result = DetalleCarritoServicios.DeleteDetalleCarrito(id);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}