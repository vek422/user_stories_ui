using System.Diagnostics;
using c_;

public class Program
{

    public static void Main()
    {
        var users = new Dictionary<int, Customer>();
        Admin admin = new(users);

        CustomerController customerController = new CustomerController(users);
        while (true)
        {
            Console.Clear();
            Console.WriteLine("Log in as");
            Console.WriteLine("1. Admin\n2.Customer");
            int ch = Convert.ToInt32(Console.ReadLine());
            switch (ch)
            {
                case 1:
                    {
                        Console.Write("Enter Username : ");
                        string userName = Console.ReadLine();
                        Console.Write("Enter Password : ");
                        string password = Console.ReadLine();
                        if (admin.ValidateCredentials(userName, password))
                        {
                            AdminController adminController = new(admin);
                            adminController.Controller();
                        }
                        else
                        {
                            Console.WriteLine("Invalid Credentials");
                        }
                        break;
                    }
                case 2:
                    {
                        Console.Write("Enter Account Number : ");
                        int account_number = Convert.ToInt32(Console.ReadLine());
                        Console.Write("Enter Password : ");
                        string password = Console.ReadLine();
                        Customer customer = customerController.ValidateCustomer(account_number, password);
                        if (customer == null)
                        {
                            Console.WriteLine("Invalid Credentials...");
                            Console.ReadKey();
                            break;
                        }
                        customerController.Controller(customer);
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }

    }
}