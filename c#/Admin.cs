using System;
using c_;


public class Admin
{
    
    private readonly string _userId = "admin";
    private readonly string _password = "pass@123";

    readonly private Dictionary<int, Customer> _users;

    public Admin(Dictionary<int, Customer> users)
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
        Console.WriteLine("---Creating New Account---");
        // take the necessary inputs
        Console.Write("Customer Aadhar Number : ");
        string addhar_number = Console.ReadLine();
        Console.Write("Customer Name : ");
        string name = Console.ReadLine();

        Console.Write("Email : ");
        string email = Console.ReadLine();

        Console.Write("Address : ");
        string address = Console.ReadLine();

        Console.Write("Contact Number : ");
        string contact_number = Console.ReadLine();

        Console.Write("Pan Number : ");
        string pan_number = Console.ReadLine();

        Console.Write("Initial Deposit : ");
        int initial_deposit = Convert.ToInt32(Console.ReadLine());
        
        Console.Write("Enter Password : ");
        string pass = Console.ReadLine();

        Console.Write("Confirm Password : ");
        string confirm_pass = Console.ReadLine();

        if(pass!= confirm_pass)
        {
            Console.WriteLine("The Passwords do not match");
            Console.WriteLine("Exiting");        
        }

            try
            {
                var newCustomer = new Customer(addhar_number,name, email, address, contact_number, pan_number, initial_deposit, pass );

                this._users[newCustomer.account_number] = newCustomer;
            }
            catch(ArgumentException e)
            {
                Console.WriteLine($"Cannot create new customer : {e.Message}");
            }
    }

    private void DisplayCustomerList()
        {
            Console.WriteLine("Account Number ");
            foreach(var (account_number, customer) in _users)
            {
                Console.WriteLine($"{account_number}  {new string(' ',10)} {customer.Name}");
            }
        }
    public void Controller()
    {       
        
            int ch = 0;
            while (ch != 5)
            {
                Console.Clear();
                Console.WriteLine("---Admin Menu---");
                Console.WriteLine("1. Create Account");
                System.Console.WriteLine("2. View accounts");
                System.Console.WriteLine("3. Update Account details");
                System.Console.WriteLine("4. Delete Account ");
                System.Console.WriteLine("5. Logout");

                System.Console.Write("Enter your choice : ");
                ch = Convert.ToInt32(Console.ReadLine());

                switch (ch)
                {
                    case 1:
                        CreateAccount();
                        break;
                    case 2:
                        DisplayCustomerList();
                        
                        break;
                }
                Console.WriteLine("press any key to continue...");
                Console.ReadKey();
                        
            }
    }
}
