using System.Data;
using backend.connection;
using Dapper;


namespace backend.servicios
{
    public static class UsuarioLoginServicios
    {
        //Busca un usuario por usuario y contrasenia
        public static T ObtenerByUserAndPass<T>(string user, string pass){
            const string storedProcedureName = "SearchUserByUserAndPass";
            var parameter = new DynamicParameters();
            parameter.Add("@UserName", user, DbType.String);
            parameter.Add("@Password", pass, DbType.String);
            var result =  BDManager.GetInstance.SPGetDataWithParameters<T>(storedProcedureName, parameter);
            return result.FirstOrDefault();
        }

    }
}