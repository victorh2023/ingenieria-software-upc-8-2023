namespace backend.Autorizacion.Funcionalidades.entidades
{
    public class Funcionalidad
    {

    public int ID { get; set; }

    public string? NOMBRE { get; set; }

    public string? DESCRIPCION { get; set; }

    public string? USUARIO_REGISTRO { get; set; }

    public DateTime FECHA_REGISTRO { get; set; }

    public int ESTADO_REGISTRO { get; set; }
    }
}