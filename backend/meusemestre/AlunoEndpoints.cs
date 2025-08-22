using System.Security.Cryptography;
using Dapper;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Mvc;

public static class AlunoEndpoints
{
    public static void MapAlunoEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/aluno", async (AlunoDto aluno, MySqlConnection db) =>
        {
            if (string.IsNullOrWhiteSpace(aluno.nome_aluno) || string.IsNullOrWhiteSpace(aluno.email) || string.IsNullOrWhiteSpace(aluno.senha) || 
                string.IsNullOrWhiteSpace(aluno.curso))
            {
                return Results.BadRequest("Todos os campos são obrigatórios.");
            }

            const int keySize = 64;
            const int iterations = 350000;
            HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;

            var salt = RandomNumberGenerator.GetBytes(keySize);
            var hash = Rfc2898DeriveBytes.Pbkdf2(
                System.Text.Encoding.UTF8.GetBytes(aluno.senha),
                salt,
                iterations,
                hashAlgorithm,
                keySize
            );

            var hashedPassword = Convert.ToBase64String(hash);
            var saltString = Convert.ToBase64String(salt);

            var senhaSegura = $"{hashedPassword}:{saltString}";

            string curso = aluno.curso.ToUpper();

            try
            {
                var sql = "INSERT INTO aluno (nome_aluno, email, senha, curso) VALUES (@Nome, @Email, @Senha, @Curso)";
                var result = await db.ExecuteAsync(sql, new { Nome = aluno.nome_aluno, Email = aluno.email, Senha = senhaSegura, Curso = curso });

                if (result > 0)
                {
                    return Results.Ok(new { message = "Cadastro realizado com sucesso!" });
                }
                return Results.Problem("Não foi possível realizar o cadastro.");
            }
            catch (MySqlException ex) when (ex.Number == 1062)
            {
                return Results.Conflict(new { message = "O e-mail informado já está em uso." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao cadastrar aluno: {ex.Message}");
                return Results.Problem("Ocorreu um erro ao tentar cadastrar o aluno.");
            }
        });
    }
}