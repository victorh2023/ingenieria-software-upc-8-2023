namespace backend.entidades
{
    public class DetallePedido : Common
    {
        public int IdPedido{get; set;}  
        public int IdProducto{get; set;}      
        public int IdProveedor{get; set;}   
        public int Cantidad{get; set;}   

    }
}