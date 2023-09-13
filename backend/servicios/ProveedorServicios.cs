
using System.Data;
using backend.connection;
using backend.entidades;
using Dapper;
using Microsoft.AspNetCore.SignalR;

namespace backend.servicios
{
    public static class ProveedorServicios
    {
        public static IEnumerable<T> ObtenerTodo<T>(){
            const string sql = "SELECT TOP 5 * FROM PROVEEDOR ORDER BY FECHA_REGISTRO DESC";            
            return BDManager.GetInstance.GetData<T>(sql);
             
            // const string storedProcedureName = "GetAllProducts";
            // var parameters = new DynamicParameters(); // Agrega parámetros si es necesario
            // return BDManager.GetInstance.SPGetData<T>(storedProcedureName, parameters);
        }

        public static T ObtenerById<T>(int id){
            const string sql = "select * from proveedor where ID = @Id and estado_registro = 1 ";
            var parameter = new DynamicParameters();
            parameter.Add("id", id, DbType.Int64);
            var result = BDManager.GetInstance.GetDataWithParameters<T>(sql, parameter);

            // const string storedProcedureName = "GetProveedorById";
            // var result =  BDManager.GetInstance.SPGetDataWithParameters<T>(storedProcedureName, parameter);
            return result.FirstOrDefault();                      
        }

        public static int InsertProveedor(Proveedor proveedor){
            const string sql = "INSERT INTO [dbo].[PROVEEDOR] ([RAZON_SOCIAL], [NIT], [DIRECCION], [NOMBRE_PROVEEDOR], [TELEFONO], [EMAIL]) VALUES (@nombre, @nit, @direccion, @nombre_proveedor, @telefono, @email)";
            var parameter = new DynamicParameters();
            parameter.Add("nombre", proveedor.Nit, DbType.String);
            parameter.Add("nit", proveedor.Nit, DbType.String);
            parameter.Add("direccion", proveedor.Direccion, DbType.String);
            parameter.Add("nombre_proveedor", proveedor.NombreProveedor, DbType.String);
            parameter.Add("telefono", proveedor.Telefono, DbType.String);
            parameter.Add("email", proveedor.Email, DbType.String);
            var result = BDManager.GetInstance.SetData(sql, parameter);

             // const string storedProcedureName = "InsertProveedor";
            // var result = BDManager.GetInstance.SPSetData(storedProcedureName, parameter);
            return result;
        }    

         public static int UpdateProveedor(Proveedor proveedor)
        {
            const string sql = "UPDATE [PROVEEDOR] SET [NIT] = @nit, [DIRECCION] = @direccion, [NOMBRE_PROVEEDOR] = @nombre_proveedor, [TELEFONO] = @telefono, [EMAIL] = @email WHERE [ID] = @id";
            var parameter = new DynamicParameters();
            parameter.Add("id", proveedor.Id, DbType.String);
            parameter.Add("nombre", proveedor.Nit, DbType.String);
            parameter.Add("nit", proveedor.Nit, DbType.String);
            parameter.Add("direccion", proveedor.Direccion, DbType.String);
            parameter.Add("nombre_proveedor", proveedor.NombreProveedor, DbType.String);
            parameter.Add("telefono", proveedor.Telefono, DbType.String);
            parameter.Add("email", proveedor.Email, DbType.String);
            var result = BDManager.GetInstance.SetData(sql, parameter);

            // const string storedProcedureName = "UpdateProveedor";
            // var result = BDManager.GetInstance.SPSetData(storedProcedureName, parameter);
            return result;
        }

        public static int DeleteProveedor(int id)
        {
            const string sql = "DELETE FROM [PROVEEDOR] WHERE [ID] = @id";
            var parameter = new DynamicParameters();
            parameter.Add("id", id, DbType.Int32);
            var result = BDManager.GetInstance.SetData(sql, parameter);
            
            // const string storedProcedureName = "DeleteProveedor";
            // var result = BDManager.GetInstance.SPSetData(storedProcedureName, parameter);
            return result;
        }

    }
}