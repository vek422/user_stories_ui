using System;
using System.Reflection.Metadata.Ecma335;
namespace c_
{
    
public class Admin
{
    
    private readonly string _userId = "admin";
    private readonly string _password = "pass@123";

    readonly private Dictionary<string, Customer> _users;

    public Admin(Dictionary<string, Customer> users)
    {   
        this._users = users;
        
    }

    public bool ValidateCredentials(string userId, string password)
    {
        return userId.Equals(_userId) && password.Equals(_password);
    }

    private void CreateAccount()
    {
        Console.Clear();
        Console.WriteLine("What is ")    
    }

    public void Controller()
    {
            int ch = 0;
            while (ch != 5)
            {
                Console.WriteLine("---Menu---");
                Console.WriteLine("1. Create Account");
                System.Console.WriteLine("2. View accounts");
                System.Console.WriteLine("3. Update Account details");
                System.Console.WriteLine("4. Delete Account ");
                System.Console.WriteLine("5. Logout");

                System.Console.Write("Enter your choice : ");
                ch = Convert.ToInt32(Console.ReadLine());

                switch (ch)
                {
                    
                }
            }
    }
}
}