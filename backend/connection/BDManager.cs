using Microsoft.AspNetCore.SignalR;
using Microsoft.Net.Http.Headers;
using Dapper;
using System.Data.SqlClient;
using System.Data;

namespace backend.connection
{
    //Clase de conexion con la base de datos que utiliza el ORM de Dapper
    public sealed class BDManager{
        private static readonly object lockObj = new();
        private static BDManager? instance;

        private BDManager(){

        }

        //Uso del Patron de Diseño SINGLETON
        public static  BDManager GetInstance{
            get
            {
                lock(lockObj)
                {                    
                    if(instance == null){
                        instance = new BDManager();
                    }
                }
                return instance;
            }       
        }

        // Cadena de conexion que se obtiene externamente
        public string? ConnectionString { get; set; }

        // Metodo para obtener un listado de la base de datos (Dapper)
        public IEnumerable<T>GetData<T>(string sql){
            using var connection = new SqlConnection(ConnectionString);
            connection.Open();
            DefaultTypeMap.MatchNamesWithUnderscores=true;
            return connection.Query<T>(sql);
        }

        // Metodo para obtener un listado de la base de datos pasandoles un parametro (Dapper)
        public IEnumerable<T> GetDataWithParameters<T>(string sql, DynamicParameters dynamicParameters){
            using var connection = new SqlConnection(ConnectionString);
            connection.Open();
            DefaultTypeMap.MatchNamesWithUnderscores=true;
            return connection.Query<T>(sql,dynamicParameters);
        }

        //Metodo para escribir en la base de datos (Dapper)
        public int SetData(string sql, DynamicParameters dynamicParameters){
            using var connection = new SqlConnection(ConnectionString);
            connection.Open();
            DefaultTypeMap.MatchNamesWithUnderscores=true;
            return connection.Execute(sql,dynamicParameters);
        }


//-- Metodos para ejecutar procedimientos almacenados

         // Metodo para ejecutar el proceso almacenado para obener  un listado de la base de datos (Dapper)
        public IEnumerable<T> SPGetData<T>(string storedProcedureName, DynamicParameters parameters)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                DefaultTypeMap.MatchNamesWithUnderscores = true;
                return connection.Query<T>(storedProcedureName, parameters, commandType: CommandType.StoredProcedure);
            }
        }

        // Metodo para obtener un listado de la base de datos pasandoles un parametro (Dapper)
        // Modificando el método GetDataWithParameters para usar un procedimiento almacenado
        public IEnumerable<T> SPGetDataWithParameters<T>(string storedProcedureName, DynamicParameters parameters)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                DefaultTypeMap.MatchNamesWithUnderscores = true;
                return connection.Query<T>(storedProcedureName, parameters, commandType: CommandType.StoredProcedure);
            }
        }

        // Metodo para escribir en la base de datos, utilizando procesos almacenados (Dapper)
        public int SPSetData(string storedProcedureName, DynamicParameters parameters)
        {
            using var connection = new SqlConnection(ConnectionString);
            connection.Open();
            DefaultTypeMap.MatchNamesWithUnderscores = true;
            return connection.Execute(storedProcedureName, parameters, commandType: CommandType.StoredProcedure);
        }       

    }
    
}