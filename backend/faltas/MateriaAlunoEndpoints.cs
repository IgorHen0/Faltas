using System.Security.Permissions;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

public static class MateriaAlunoEndpoints
{
    public static void MapMateriaAlunoEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/add_materia", async ([FromBody] MateriaAlunoDto materia_aluno, MySqlConnection db) =>
        {
            if (string.IsNullOrWhiteSpace(materia_aluno.dias_semana) || string.IsNullOrWhiteSpace(materia_aluno.horario_aula))
            {
                return Results.BadRequest("Dias da semana e horário são obrigatórios.");
            }

            try
            {
                var sql = "INSERT INTO materias_aluno";

                return Results.Ok(new { message = "Matéria cadastrada com sucesso." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao cadastrar matéria: {ex.Message}");
                return Results.Problem("Ocorreu um erro ao cadastrar a matéria.");
            }
        });
    }
}