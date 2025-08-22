using Dapper;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI.Common;

public static class AddTrabalhosEndpoints
{
    public static void MapAddTrabalhos(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/add_trabalhos", async ([FromBody] TrabalhosDto trabalhos, MySqlConnection db) =>
        {
            if (string.IsNullOrWhiteSpace(trabalhos.nome_trabalho) || string.IsNullOrWhiteSpace(trabalhos.data_trabalho) || trabalhos.pontos <= 0 ||
                trabalhos.aluno_id <= 0 || trabalhos.materias_id <= 0)
            {
                return Results.BadRequest("Todos os campos devem ser preenchidos.");
            }

            try
            {
                var sqlId = "SELECT materia_aluno_id FROM materia_aluno WHERE aluno_id = @aluno_id AND materias_id = @materias_id";
                var materiaAlunoId = await db.QueryFirstOrDefaultAsync<int?>(sqlId, new
                {
                    aluno_id = trabalhos.aluno_id,
                    materias_id = trabalhos.materias_id,
                });

                if (materiaAlunoId == null)
                {
                    Results.BadRequest("Usuário não encontrado.");
                }

                var sql = @"INSERT INTO trabalhos(materia_aluno_id, nome_trabalho, data_trabalho, pontos)
                            VALUES(@materia_aluno_id, @nome_trabalho, @data_trabalho, @pontos)";
                var result = await db.ExecuteAsync(sql, new
                {
                    materia_aluno_id = materiaAlunoId,
                    nome_trabalho = trabalhos.nome_trabalho,
                    data_trabalho = trabalhos.data_trabalho,
                    pontos = trabalhos.pontos
                });

                if (result > 0)
                {
                    return Results.Ok(new { message = "Trabalho adicionado com sucesso." });
                }

                return Results.Problem("Não foi possível adicionar novo trabalho.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao adicionar novo trabalho: {ex.Message}");
                return Results.Problem("Ocorreu um erro ao adicionar novo trabalho.");
            }
        });

        app.MapGet("/api/aluno/{aluno_id}/trabalhos", async (int aluno_id, MySqlConnection db) =>
        {
            try
            {
                var sql = @"
                            SELECT
                                m.nome_materia,
                                t.nome_trabalho,
                                t.data_trabalho,
                                t.pontos
                            FROM
                                materia_aluno ma
                            LEFT JOIN
                                trabalhos t ON t.materia_aluno_id = ma.materia_aluno_id
                            JOIN
                                materias m ON m.materias_id = ma.materias_id
                            WHERE
                                ma.aluno_id = @aluno_id
                                AND t.data_trabalho >= CURDATE()
                            ORDER BY
                                t.data_trabalho ASC
                            LIMIT 5";
                var trabalhos = await db.QueryAsync<Trabalhos>(sql, new { aluno_id });
                return Results.Ok(trabalhos);
                            
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao obter os trabalhos do aluno: {ex.Message}");
                return Results.Problem("Erro ao obter os trabalhos do aluno.");
            }
        });
    }
}