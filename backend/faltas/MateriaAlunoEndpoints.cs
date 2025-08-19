using System.Security.Permissions;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI.Common;

public static class MateriaAlunoEndpoints
{
    public static void MapMateriaAlunoEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/add_materia", async ([FromBody] MateriaAlunoDto materia_aluno, MySqlConnection db) =>
        {
            if (string.IsNullOrWhiteSpace(materia_aluno.dias_semana) || string.IsNullOrWhiteSpace(materia_aluno.horario_aula)
                || string.IsNullOrWhiteSpace(materia_aluno.sala) || materia_aluno.materias_id <= 0)
            {
                return Results.BadRequest("Todos os campos são obrigatórios.");
            }

            try
            {
                var sql = @"INSERT INTO materia_aluno(aluno_id, materias_id, status, semestre, dias_semana, horario_aula, sala) 
                            VALUES (@aluno_id, @materias_id, @status, @semestre, @dias_semana, @horario_aula, @sala)";
                var result = await db.ExecuteAsync(sql, new
                {
                    aluno_id = materia_aluno.aluno_id,
                    materias_id = materia_aluno.materias_id,
                    status = materia_aluno.status,
                    semestre = materia_aluno.semestre,
                    dias_semana = materia_aluno.dias_semana,
                    horario_aula = materia_aluno.horario_aula,
                    sala = materia_aluno.sala
                });

                if (result > 0)
                {
                    return Results.Ok(new { message = "Matéria cadastrada com sucesso." });
                }
                return Results.Problem("Não foi possível cadastrar a matéria");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao cadastrar matéria: {ex.Message}");
                return Results.Problem("Ocorreu um erro ao cadastrar a matéria.");
            }
        });

        app.MapGet("/api/aluno/{aluno_id}/materias", async (int aluno_id, MySqlConnection db) =>
        {
            try
            {
                var sql =
                        @"SELECT
                            m.nome_materia, ma.sala, ma.dias_semana, ma.horario_aula
                        FROM
                            materia_aluno ma
                        JOIN
                            materias m ON ma.materias_id = m.materias_id
                        WHERE
                            ma.aluno_id = @aluno_id AND ma.status = 'Cursando'";
                var materias = await db.QueryAsync<MateriaAlunoInfo>(sql, new { aluno_id });
                return Results.Ok(materias);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar as matérias em curso: {ex.Message}");
                return Results.Problem("Ocorreu um erro ao buscar as matérias em curso");
            }
        });
    }
}