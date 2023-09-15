using System.Data;
using backend.connection;
using backend.Autorizacion.RolesUsuarios.entidades;
using Dapper;

namespace backend.servicios
{
    public static class RolesUsuariosServicios
    {
        public static IEnumerable<RolesUsuarios> ObtenerTodos()
        {
            const string sql = "SELECT * FROM ROLES_USUARIO";
            return BDManager.GetInstance.GetData<RolesUsuarios>(sql);
        }

        public static RolesUsuarios ObtenerRolPorId(int id)
        {
            const string sql = "SELECT * FROM ROLES_USUARIO WHERE ID = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);
            var result = BDManager.GetInstance.GetDataWithParameters<RolesUsuarios>(sql, parameters);

            return result.FirstOrDefault();
        }

        public static int InsertarRol(RolesUsuarios rol)
        {
            const string sql = "INSERT INTO ROLES_USUARIO (NOMBRE_ROL, DESCRIPCION, USUARIO_REGISTRO, FECHA_REGISTRO, ESTADO_REGISTRO) VALUES (@NombreRol, @Descripcion, @UsuarioRegistro, @FechaRegistro, @EstadoRegistro)";
            var parameters = new DynamicParameters();
            parameters.Add("NombreRol", rol.NOMBRE_ROL, DbType.String);
            parameters.Add("Descripcion", rol.DESCRIPCION, DbType.String);
            parameters.Add("UsuarioRegistro", rol.USUARIO_REGISTRO, DbType.String);
            parameters.Add("FechaRegistro", rol.FECHA_REGISTRO, DbType.DateTime);
            parameters.Add("EstadoRegistro", rol.ESTADO_REGISTRO, DbType.Int32);

            return BDManager.GetInstance.SetData(sql, parameters);
        }

        public static int ActualizarRol(RolesUsuarios rol)
        {
            const string sql = "UPDATE ROLES_USUARIO SET NOMBRE_ROL = @NombreRol, DESCRIPCION = @Descripcion, USUARIO_REGISTRO = @UsuarioRegistro, FECHA_REGISTRO = @FechaRegistro, ESTADO_REGISTRO = @EstadoRegistro WHERE ID = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", rol.ID, DbType.Int32);
            parameters.Add("NombreRol", rol.NOMBRE_ROL, DbType.String);
            parameters.Add("Descripcion", rol.DESCRIPCION, DbType.String);
            parameters.Add("UsuarioRegistro", rol.USUARIO_REGISTRO, DbType.String);
            parameters.Add("FechaRegistro", rol.FECHA_REGISTRO, DbType.DateTime);
            parameters.Add("EstadoRegistro", rol.ESTADO_REGISTRO, DbType.Int32);

            return BDManager.GetInstance.SetData(sql, parameters);
        }

        public static int EliminarRol(int id)
        {
            const string sql = "DELETE FROM ROLES_USUARIO WHERE ID = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);

            return BDManager.GetInstance.SetData(sql, parameters);
        }
    }
}