using backend.connection;
using backend.entidades;
using backend.servicios;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarritoCompraController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly string? connectionString;

    public CarritoCompraController(IConfiguration configuration)
    {
        _configuration = configuration;
        connectionString = _configuration["SqlConnectionString:DefaultConnection"];
        BDManager.GetInstance.ConnectionString = connectionString;
        // BDManager.GetInstance.ConnectionString = "workstation id=database-hermes.mssql.somee.com;packet size=4096;user id=hcayalo_SQLLogin_1;pwd=2itb6kw6gc;data source=database-hermes.mssql.somee.com;persist security info=False;initial catalog=database-hermes";
    }

    [HttpGet]
    [Route("GetAllCarritoCompra")]
    public IActionResult GetAllCarritoCompra()
    {
        try
        {
            var result = CarritoCompraServicios.ObtenerTodo<CarritoCompra>();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet]
    [Route("GetCarritoCompraById")]
    public IActionResult GetCarritoCompraById([FromQuery]int id)
    {
        try
        {
            var result = CarritoCompraServicios.ObtenerById<CarritoCompra>(id);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost]
    [Route("AddCarritoCompra")]
    public IActionResult AddCarritoCompra(CarritoCompra carritoCompra){
        try{
            var result = CarritoCompraServicios.InsertCarritoCompra(carritoCompra);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    } 

    [HttpPut]
    [Route("UpdateCarritoCompra")]
    public IActionResult UpdateCarritoCompra(CarritoCompra carritoCompra)
    {
        try
        {
            var result = CarritoCompraServicios.UpdateCarritoCompra(carritoCompra);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete]
    [Route("DeleteCarritoCompra")]
    public IActionResult DeleteCarritoCompra([FromQuery]int id)
    {
        try
        {
            var result = CarritoCompraServicios.DeleteCarritoCompra(id);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }


}