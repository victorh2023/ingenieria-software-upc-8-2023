
using System.Data;
using backend.connection;
using backend.entidades;
using Dapper;
using Microsoft.AspNetCore.SignalR;

namespace backend.servicios
{
    public static class PedidoServicios
    {
        public static IEnumerable<T> ObtenerTodo<T>(){
            const string sql = "select TOP 5 * from pedido ORDER BY FECHA_REGISTRO DESC";
            return BDManager.GetInstance.GetData<T>(sql);
            // const string storedProcedureName = "GetPedido";
            // var parameters = new DynamicParameters(); // Agrega parámetros si es necesario
            // return BDManager.GetInstance.SPGetData<T>(storedProcedureName, parameters);
        }

        public static T ObtenerById<T>(int id){
            const string sql = "select * from pedido where ID = @Id and estado_registro = 1 ";
            // const string storedProcedureName = "GetPedidoById";
            var parameter = new DynamicParameters();
            parameter.Add("id", id, DbType.Int64);
            var result = BDManager.GetInstance.GetDataWithParameters<T>(sql, parameter);
           // var result =  BDManager.GetInstance.SPGetDataWithParameters<T>(storedProcedureName, parameter);
            return result.FirstOrDefault();                      
        }

        public static int InsertPedido(Pedido pedido){
            const string sql = "INSERT INTO [dbo].[PEDIDO]([ID_USUARIO], [FECHA_PEDIDO]) VALUES (@id_usuario, @fechaPedido) ";
            // const string storedProcedureName = "InsertPedido";
            var parameter = new DynamicParameters();
            parameter.Add("id_usuario", pedido.IdUsuario, DbType.Int64);
            parameter.Add("fechaPedido", pedido.FechaPedido, DbType.DateTime);
            var result = BDManager.GetInstance.SetData(sql, parameter);
            // var result = BDManager.GetInstance.SPSetData(storedProcedureName, parameter);
            return result;
        }   

        public static int UpdatePedido(Pedido pedido)
        {
            const string sql = "UPDATE [PEDIDO] SET [ID_USUARIO] = @id_usuario, [FECHA_PEDIDO] = @fechaPedido WHERE [ID] = @id";
            //const string storedProcedureName = "UpdatePedido";
            var parameter = new DynamicParameters();
            parameter.Add("id", pedido.Id, DbType.Int32);            
            parameter.Add("id_usuario", pedido.IdUsuario, DbType.Int32);
            parameter.Add("fechaPedido", pedido.FechaPedido, DbType.DateTime);
            var result = BDManager.GetInstance.SetData(sql, parameter);
            //var result = BDManager.GetInstance.SPSetData(storedProcedureName, parameter);
            return result;
        }

        public static int DeletePedido(int id)
        {
            const string sql = "DELETE FROM [PEDIDO] WHERE [ID] = @id";
            //const string storedProcedureName = "DeletePedido";
            var parameter = new DynamicParameters();
            parameter.Add("id", id, DbType.Int32);
            var result = BDManager.GetInstance.SetData(sql, parameter);
            // var result = BDManager.GetInstance.SPSetData(storedProcedureName, parameter);
            return result;
        } 
        

    }
}