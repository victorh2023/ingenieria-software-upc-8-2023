using backend.connection;
using backend.entidades;
using backend.servicios;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PedidoController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly string? connectionString;

    public PedidoController(IConfiguration configuration)
    {
        _configuration = configuration;
        connectionString = _configuration["SqlConnectionString:DefaultConnection"];
        BDManager.GetInstance.ConnectionString = connectionString;
        // BDManager.GetInstance.ConnectionString = "workstation id=database-hermes.mssql.somee.com;packet size=4096;user id=hcayalo_SQLLogin_1;pwd=2itb6kw6gc;data source=database-hermes.mssql.somee.com;persist security info=False;initial catalog=database-hermes";
    }

    [HttpGet]
    [Route("GetAllPedido")]
    public IActionResult GetAllPedido()
    {
        try
        {
            var result = PedidoServicios.ObtenerTodo<Pedido>();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet]
    [Route("GetPedidoById")]
    public IActionResult GetPedidoById([FromQuery]int id)
    {
        try
        {
            var result = PedidoServicios.ObtenerById<Pedido>(id);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost]
    [Route("AddPedido")]
    public IActionResult AddPedido(Pedido pedido){
        try{
            var result = PedidoServicios.InsertPedido(pedido);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    } 

    [HttpPut]
    [Route("UpdatePedido")]
    public IActionResult UpdatePedido(Pedido pedido)
    {
        try
        {
            var result = PedidoServicios.UpdatePedido(pedido);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete]
    [Route("DeletePedido")]
    public IActionResult DeletePedido([FromQuery]int id)
    {
        try
        {
            var result = PedidoServicios.DeletePedido(id);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }


}