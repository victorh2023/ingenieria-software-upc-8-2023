namespace backend.Autorizacion.RolesUsuarios.entidades
{
public class RolesUsuarios
    {
    public int ID { get; set; }

    public string? NOMBRE_ROL { get; set; }

    public string? DESCRIPCION { get; set; }

    public string? USUARIO_REGISTRO { get; set; }

    public DateTime FECHA_REGISTRO { get; set; }

    public int ESTADO_REGISTRO { get; set; }
    }
}






