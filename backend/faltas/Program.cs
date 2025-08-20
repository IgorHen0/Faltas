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

app.UseCors("AllowFrontend");

// Mapeia os endpoints
app.MapAlunoEndpoints();
app.MapLoginEndpoints();
app.MapMateriaEndpoints();
app.MapMateriaAlunoEndpoints();
app.MapAddFaltas();

app.Run();

public record AlunoDto(string nome_aluno, string email, string senha, string curso);
public record LoginDto(string email, string senha);
public record MateriaDto(int materias_id, string codigo_materia, string nome_materia);
public record MateriaAlunoDto(int aluno_id, int materias_id, string status, string semestre, string dias_semana, string horario_aula, string sala);
public record MateriaAlunoInfo(int materias_id, string nome_materia, string sala, string dias_semana, string horario_aula);
public record FaltasDto(int aluno_id, int materias_id, string data, string motivo);