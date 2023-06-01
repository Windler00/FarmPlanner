using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FarmPlanner.Migrations
{
    /// <inheritdoc />
    public partial class AddRowQuantityAndWidth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Rows",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Width",
                table: "Rows",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Rows");

            migrationBuilder.DropColumn(
                name: "Width",
                table: "Rows");
        }
    }
}
