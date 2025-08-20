using Dapper;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Mvc;

public static class AddFaltasEndpoints
{
    public static void MapAddFaltas(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/add_faltas", async ([FromBody] FaltasDto faltas, MySqlConnection db) =>
        {
            if (string.IsNullOrWhiteSpace(faltas.data) || string.IsNullOrWhiteSpace(faltas.motivo) || faltas.materias_id <= 0)
            {
                return Results.BadRequest("Todos os campos devem ser preenchidos.");
            }

            try
            {
                var sqlId = @"SELECT materia_aluno_id FROM materia_aluno WHERE aluno_id = @aluno_id AND materias_id = @materias_id";
                var materiaAlunoId = await db.QueryFirstOrDefaultAsync<int?>(sqlId, new
                {
                    aluno_id = faltas.aluno_id,
                    materias_id = faltas.materias_id
                });

                if (materiaAlunoId == null)
                {
                    return Results.BadRequest("Relação aluno/matéria não encontrada.");
                }

                var sql = @"INSERT INTO faltas(materia_aluno_id, data, motivo)
                            VALUES(@materia_aluno_id, @data, @motivo)";
                var result = await db.ExecuteAsync(sql, new
                {
                    materia_aluno_id = materiaAlunoId,
                    data = faltas.data,
                    motivo = faltas.motivo
                });

                if (result > 0)
                {
                    return Results.Ok(new { message = "Falta cadastrada com sucesso." });
                }

                return Results.Problem("Não foi possível adicionar a falta");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao adicionar nova falta: {ex.Message}");
                return Results.Problem("Ocorreu um erro ao adicionar nova falta.");
            }
        });
    }
}