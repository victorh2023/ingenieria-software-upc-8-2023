
using System.Data;
using backend.connection;
using backend.entidades;
using Dapper;
using Microsoft.AspNetCore.SignalR;

namespace backend.servicios
{
    public static class DetallePedidoServicios
    {
        public static IEnumerable<T> ObtenerTodo<T>(){
            const string sql = "select TOP 5 * from DETALLE_PEDIDO  ORDER BY FECHA_REGISTRO DESC";
            return BDManager.GetInstance.GetData<T>(sql);
            // const string storedProcedureName = "GetAllDetallesCarrito";
            // var parameters = new DynamicParameters(); // Agrega parámetros si es necesario
            // return BDManager.GetInstance.SPGetData<T>(storedProcedureName, parameters);
        }

        public static T ObtenerById<T>(int id_pedido,int id_producto){
            const string sql = "select * from DETALLE_PEDIDO where  [ID_PEDIDO] = @id_pedido AND [ID_PRODUCTO] = @id_producto and estado_registro = 1 ";
            // const string storedProcedureName = "GetDetallePedidoPorId";
            var parameter = new DynamicParameters();
            parameter.Add("id_pedido", id_pedido, DbType.Int64);
            parameter.Add("id_producto", id_producto, DbType.Int64);
            var result = BDManager.GetInstance.GetDataWithParameters<T>(sql, parameter);
            // var result =  BDManager.GetInstance.SPGetDataWithParameters<T>(storedProcedureName, parameter);
            return result.FirstOrDefault();                      
        }

        public static int InsertDetallePedido(DetallePedido detallePedido){
            //const string storedProcedureName = "InsertDetallePedido";
            const string sql ="INSERT INTO [dbo].[DETALLE_PEDIDO]([ID_PEDIDO], [ID_PRODUCTO], [ID_PROVEEDOR], [CANTIDAD])VALUES (@id_pedido, @id_producto, @id_proveedor, @cantidad);";
            var parameter = new DynamicParameters();
            parameter.Add("id_pedido", detallePedido.IdPedido, DbType.Int32);
            parameter.Add("id_producto", detallePedido.IdProducto, DbType.Int32);
            parameter.Add("id_proveedor", detallePedido.IdProveedor, DbType.Int32);
            parameter.Add("cantidad", detallePedido.Cantidad, DbType.Int32);
            //var result = BDManager.GetInstance.SPSetData(storedProcedureName, parameter);
            var result = BDManager.GetInstance.SetData(sql, parameter);
            return result;
        }    

        public static int UpdateDetallePedido(DetallePedido detallePedido)
        {
            const string sql = "UPDATE [DETALLE_PEDIDO]SET [ID_PROVEEDOR] = @id_proveedor,[CANTIDAD] = @cantidad WHERE [ID_PEDIDO] = @id_pedido AND [ID_PRODUCTO] = @id_producto;" ;
            // const string storedProcedureName = "UpdateDetallePedido";
            var parameter = new DynamicParameters();
            parameter.Add("id_pedido", detallePedido.IdPedido, DbType.Int32);
            parameter.Add("id_producto", detallePedido.IdProducto, DbType.Int32);
            parameter.Add("id_proveedor", detallePedido.IdProveedor, DbType.Int32);
            parameter.Add("cantidad", detallePedido.Cantidad, DbType.Int32);
            var result = BDManager.GetInstance.SetData(sql, parameter);
            // var result = BDManager.GetInstance.SPSetData(storedProcedureName, parameter);
            return result;
        }

        public static int DeleteDetallePedido(int id_pedido,int id_producto)
        {
            const string sql = "DELETE FROM [DETALLE_PEDIDO] WHERE [ID_PEDIDO] = @id_pedido AND [ID_PRODUCTO] = @id_producto;";
            // const string storedProcedureName = "DeleteDetallePedido";
            var parameter = new DynamicParameters();
            parameter.Add("id_pedido", id_pedido, DbType.Int32);
            parameter.Add("id_producto", id_producto, DbType.Int32);
            var result = BDManager.GetInstance.SetData(sql, parameter);
            // var result = BDManager.GetInstance.SPSetData(storedProcedureName, parameter);
            return result;
        }

    }
}