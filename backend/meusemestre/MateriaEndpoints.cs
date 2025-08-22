using System.Security.Permissions;
using Dapper;
using MySql.Data.MySqlClient;

public static class MateriaEndpoints
{
    public static void MapMateriaEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/materias", async (MySqlConnection db) =>
        {
            try
            {
                var sql = "SELECT * FROM materias ORDER BY nome_materia";
                var materias = await db.QueryAsync<MateriaDto>(sql);
                return Results.Ok(materias);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar matérias: {ex.Message}");
                return Results.Problem("Ocorreu um erro ao buscar a lista de matérias.");
            }
        });
    }
}