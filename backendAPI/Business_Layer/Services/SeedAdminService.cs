using Business_Layer.IServices;
using DataAccessLayer.data;
using DataAccessLayer.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Layer.Services
{
	public class SeedAdminService : ISeedAdminService
	{
		private readonly APIDbContext _dbContext;

		public SeedAdminService(APIDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<bool> SeedAdminUser()
		{
			string adminEmail = "akj@gmail.com";
			string adminPassword = "akj@12345";
			string adminName = "Admin User 2";
			string phone = "9955470616";

			var adminUser = await _dbContext.Registers.FirstOrDefaultAsync(u => u.email == adminEmail);
			if (adminUser != null)
			{
				return false; // Admin user already exists, no need to seed
			}

			var admin = new Register
			{
				ID = Guid.NewGuid(),
				email = adminEmail,
				password = adminPassword,
				name = adminName,
				phone = phone,
				registrationType = "admin"
				// Set other admin user properties as needed
			};

			_dbContext.Registers.Add(admin);
			await _dbContext.SaveChangesAsync();

			return true;
		}
	}

}
