using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FarmPlanner.Migrations
{
    /// <inheritdoc />
    public partial class AddedSeedLengthHeightWidth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Height",
                table: "Seeds",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Length",
                table: "Seeds",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Width",
                table: "Seeds",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Height",
                table: "Seeds");

            migrationBuilder.DropColumn(
                name: "Length",
                table: "Seeds");

            migrationBuilder.DropColumn(
                name: "Width",
                table: "Seeds");
        }
    }
}
