using System.Security.Cryptography;
using Dapper;
using MySql.Data.MySqlClient;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddTransient<MySqlConnection>(_ => new MySqlConnection(connectionString));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
    );
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

// Endpoint para cadastro do aluno
app.MapPost("/api/aluno", async (AlunoDto aluno, MySqlConnection db) =>
{
    if (string.IsNullOrWhiteSpace(aluno.nome_aluno) || string.IsNullOrWhiteSpace(aluno.email) || string.IsNullOrWhiteSpace(aluno.senha))
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

    try
    {
        var sql = "INSERT INTO aluno (nome_aluno, email, senha) VALUES (@Nome, @Email, @Senha)";
        var result = await db.ExecuteAsync(sql, new { Nome = aluno.nome_aluno, Email = aluno.email, Senha = senhaSegura });

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

app.Run();

public record AlunoDto(string nome_aluno, string email, string senha);