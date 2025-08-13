using System.Security.Cryptography;
using Dapper;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Mvc;

public static class LoginEndpoints
{
    public static void MapLoginEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/login", async ([FromBody] LoginDto login, MySqlConnection db) =>
        {
            if (string.IsNullOrWhiteSpace(login.email) || string.IsNullOrWhiteSpace(login.senha))
            {
                return Results.BadRequest("Email e senha são obrigatórios.");
            }

            try
            {
                var sql = "SELECT senha FROM aluno WHERE email = @Email";
                var senhaSegura = await db.QuerySingleOrDefaultAsync<string>(sql, new { Email = login.email });

                if (senhaSegura == null)
                {
                    return Results.Problem("Email ou senha inválidos.", statusCode: 401);
                }

                var parts = senhaSegura.Split(':');
                if (parts.Length != 2)
                {
                    return Results.Problem("Formato de senha armazenado inválido.");
                }

                var hashedPasswordFromDb = parts[0];
                var saltFromDb = Convert.FromBase64String(parts[1]);

                const int keySize = 64;
                const int iterations = 350000;
                HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;

                var hashToVerify = Rfc2898DeriveBytes.Pbkdf2(
                    System.Text.Encoding.UTF8.GetBytes(login.senha),
                    saltFromDb,
                    iterations,
                    hashAlgorithm,
                    keySize
                );

                var hashedPasswordToVerify = Convert.ToBase64String(hashToVerify);

                if (hashedPasswordFromDb == hashedPasswordToVerify)
                {
                    return Results.Ok(new { message = "Login realizado com sucesso!" });
                }
                else
                {
                    return Results.Problem("Email ou senha inválidos.", statusCode: 401);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao fazer login: {ex.Message}");
                return Results.Problem("Ocorreu um erro ao tentar fazer login.");
            }
        });
    }
}