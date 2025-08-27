using Dapper;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Mvc;

public static class ObtemFaltasSemana
{
    public static void MapObtemFaltasSemana(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/aluno/{aluno_id}/faltas_semana", async (int aluno_id, MySqlConnection db) =>
        {
            try
            {
                var sql = @"
                            SELECT COUNT(faltas_id) AS total
                            FROM faltas f
                            JOIN materia_aluno ma
                            ON ma.materia_aluno_id = f.materia_aluno_id
                            WHERE (YEARWEEK(data, 1) = YEARWEEK(CURDATE(), 1)) AND aluno_id = @aluno_id";
                var faltas_semana = await db.QueryAsync<FaltasSemana>(sql, new { aluno_id });
                return Results.Ok(faltas_semana);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao obter faltas da semana: {ex.Message}");
                return Results.Problem("Erro ao obter faltas da semana");
            }
        });
    }
}