using backend.connection;
using backend.entidades;
using backend.servicios;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DetallePedidoController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly string? connectionString;

    public DetallePedidoController(IConfiguration configuration)
    {
        _configuration = configuration;
        connectionString = _configuration["SqlConnectionString:DefaultConnection"];
        BDManager.GetInstance.ConnectionString = connectionString;
        // BDManager.GetInstance.ConnectionString = "workstation id=database-hermes.mssql.somee.com;packet size=4096;user id=hcayalo_SQLLogin_1;pwd=2itb6kw6gc;data source=database-hermes.mssql.somee.com;persist security info=False;initial catalog=database-hermes";
    }

    [HttpGet]
    [Route("GetAllDetallePedido")]
    public IActionResult GetAllDetallePedido()
    {
        try
        {
            var result = DetallePedidoServicios.ObtenerTodo<DetallePedido>();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet]
    [Route("GetDetallePedidoById")]
    public IActionResult GetDetallePedidoById([FromQuery]int id_pedido,[FromQuery]int id_producto)
    {
        try
        {
            var result = DetallePedidoServicios.ObtenerById<DetallePedido>(id_pedido,id_producto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost]
    [Route("AddDetallePedido")]
    public IActionResult AddDetallePedido(DetallePedido detallePedido){
        try{
            var result = DetallePedidoServicios.InsertDetallePedido(detallePedido);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    } 

        [HttpPut]
    [Route("UpdateDetallePedido")]
    public IActionResult UpdateDetallePedido(DetallePedido detallePedido)
    {
        try
        {
            var result = DetallePedidoServicios.UpdateDetallePedido(detallePedido);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete]
    [Route("DeleteDetallePedido")]
    public IActionResult DeleteDetallePedido([FromQuery]int id_pedido,[FromQuery]int id_producto)
    {
        try
        {
            var result = DetallePedidoServicios.DeleteDetallePedido(id_pedido,id_producto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}