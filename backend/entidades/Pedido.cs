namespace backend.entidades
{
    public class Pedido : Common
    {
        public int Id{get; set;}
        public int IdUsuario{get; set;}      
        public DateTime FechaPedido{get; set;}

    }
}