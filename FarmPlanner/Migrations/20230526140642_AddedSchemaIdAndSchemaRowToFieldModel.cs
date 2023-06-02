using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FarmPlanner.Migrations
{
    /// <inheritdoc />
    public partial class AddedSchemaIdAndSchemaRowToFieldModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SchemaId",
                table: "Fields",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SchemaRow",
                table: "Fields",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SchemaId",
                table: "Fields");

            migrationBuilder.DropColumn(
                name: "SchemaRow",
                table: "Fields");
        }
    }
}
