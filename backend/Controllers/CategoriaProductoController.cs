using backend.connection;
using backend.entidades;
using backend.servicios;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriaProductoController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly string? connectionString;

    public CategoriaProductoController(IConfiguration configuration)
    {
        _configuration = configuration;
        connectionString = _configuration["SqlConnectionString:DefaultConnection"];
        BDManager.GetInstance.ConnectionString = connectionString;
        // BDManager.GetInstance.ConnectionString = "workstation id=database-hermes.mssql.somee.com;packet size=4096;user id=hcayalo_SQLLogin_1;pwd=2itb6kw6gc;data source=database-hermes.mssql.somee.com;persist security info=False;initial catalog=database-hermes";
    }

    [HttpGet]
    [Route("GetAllCategoriaProducto")]
    public IActionResult GetAllCategoriaProducto()
    {
        try
        {
            var result = CategoriaProductoServicios.ObtenerTodo<CategoriaProducto>();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet]
    [Route("GetCategoriaProductoById")]
    public IActionResult GetCategoriaProductoById([FromQuery]int id)
    {
        try
        {
            var result = CategoriaProductoServicios.ObtenerById<CategoriaProducto>(id);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost]
    [Route("AddCategoriaProducto")]
    public IActionResult AddCategoriaProducto(CategoriaProducto categoriaProducto){
        try{
            var result = CategoriaProductoServicios.InsertCategoriaProducto(categoriaProducto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    } 

    [HttpPut]
    [Route("UpdateCategoriaProducto")]
    public IActionResult UpdateCategoriaProducto(CategoriaProducto categoriaProducto)
    {
        try
        {
            var result = CategoriaProductoServicios.UpdateCategoriaProducto(categoriaProducto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete]
    [Route("DeleteCategoriaProducto")]
    public IActionResult DeleteCategoriaProducto([FromQuery]int id)
    {
        try
        {
            var result = CategoriaProductoServicios.DeleteCategoriaProducto(id);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }




}