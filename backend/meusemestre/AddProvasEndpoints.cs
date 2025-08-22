using Dapper;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Mvc;

public static class AddProvasEndpoints
{
    public static void MapAddProvas(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/add_provas", async ([FromBody] ProvasDto provas, MySqlConnection db) =>
        {
            if (string.IsNullOrWhiteSpace(provas.data_prova) || string.IsNullOrWhiteSpace(provas.conteudo) ||
                string.IsNullOrWhiteSpace(provas.horario_prova) || provas.aluno_id <= 0)
            {
                return Results.BadRequest("Todos os campos devem ser preenchidos.");
            }

            try
            {

                var sqlId = @"SELECT materia_aluno_id FROM materia_aluno WHERE aluno_id = @aluno_id AND materias_id = @materias_id";
                var materiaAlunoId = await db.QueryFirstOrDefaultAsync<int?>(sqlId, new
                {
                    aluno_id = provas.aluno_id,
                    materias_id = provas.materias_id
                });

                if (materiaAlunoId == null)
                {
                    Results.BadRequest("Usuário não encontrado.");
                }

                var sql = @"INSERT INTO provas(materia_aluno_id, data_prova, conteudo, horario_prova)
                            VALUES(@materia_aluno_id, @data_prova, @conteudo, @horario_prova)";
                var result = await db.ExecuteAsync(sql, new
                {
                    materia_aluno_id = materiaAlunoId,
                    data_prova = provas.data_prova,
                    conteudo = provas.conteudo,
                    horario_prova = provas.horario_prova,
                });

                if (result > 0)
                {
                    return Results.Ok(new { message = "Prova adicionada com sucesso." });
                }

                return Results.Problem("Não foi possível adicionar nova prova.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao adicionar nova prova: {ex.Message}");
                return Results.Problem("Ocorreu um erro ao adicionar nova prova.");
            }
        });

        app.MapGet("/api/aluno/{aluno_id}/provas", async (int aluno_id, MySqlConnection db) =>
        {
            try
            {
                var sql = @"
                            SELECT
                                m.nome_materia,
                                p.data_prova,
                                p.conteudo,
                                p.horario_prova
                            FROM
                                materia_aluno ma
                            LEFT JOIN
                                provas p ON ma.materia_aluno_id = p.materia_aluno_id
                            JOIN
                                materias m ON m.materias_id = ma.materias_id
                            WHERE
                                ma.aluno_id = @aluno_id
                                AND p.data_prova >= CURDATE()
                            ORDER BY
                                p.data_prova ASC
                            LIMIT 5";
                var provas = await db.QueryAsync<Provas>(sql, new { aluno_id });
                return Results.Ok(provas);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao obter as provas do aluno: {ex.Message}");
                return Results.Problem("Erro ao obter as provas do aluno.");
            }
        });
    }
}