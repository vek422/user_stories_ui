using c_;

public class AdminController
{
    private Admin admin;

    public AdminController(Admin admin)
    {
        this.admin = admin;
    }
    private enum AdminOptions
    {
        CreateAccount = 1,
        ViewAccount = 2,
        UpdateAccount = 3,
        DeleteAccount = 4,
        Logout = 5,
    }

    void ViewAccountController()
    {
        PrintCustomerList(admin.GetAllCustomers());
        Console.Write("Enter Account Number ( 0 to exit) : ");
        int account_number = Convert.ToInt32(Console.ReadLine());
        if (account_number == 0)
            return;

        DisplayCustomerDetails(admin.GetCustomerByAccountNumber(account_number));
    }
    void PrintMenu()
    {
        Console.Clear();
        Console.WriteLine("---Admin Menu---");
        Console.WriteLine("1. Create Account");
        System.Console.WriteLine("2. View accounts");
        System.Console.WriteLine("3. Update Account details");
        System.Console.WriteLine("4. Delete Account ");
        System.Console.WriteLine("5. Logout");
    }
    void CreateCustomerController()
    {
        Console.Clear();
        Console.WriteLine("---Creating New Account---");

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
        double initial_deposit = Convert.ToDouble(Console.ReadLine());

        Console.Write("Enter Password : ");
        string password = Console.ReadLine();

        Console.Write("Confirm Password : ");
        string confirm_password = Console.ReadLine();


        if (password != confirm_password)
        {
            Console.WriteLine("The Passwords do not match");
            Console.WriteLine("Exiting");
            return;
        }

        Customer newCustomer = admin.CreateAccount(addhar_number, name, email, address, contact_number, pan_number, initial_deposit, password);

        Console.WriteLine($"New Customer Created Successfully with Account Number {newCustomer.account_number}");

    }

    public void DisplayCustomerDetails(Customer customer)
    {
        if (customer == null)
        {
            Console.WriteLine("Invalid Customer");
            return;
        }
        Console.Clear();
        Console.WriteLine("---Customer Details---");
        Console.WriteLine($"Name:{customer.Name}");
        Console.WriteLine($"Account Number:{customer.account_number}");
        Console.WriteLine($"Aadhar Number: {customer.AadharNumber}");
        Console.WriteLine($"Address : {customer.Address}");
        Console.WriteLine($"Email : {customer.Email}");
        Console.WriteLine($"Contact Number : {customer.ContactNumber}");
        Console.WriteLine($"Pan Number : {customer.PanNumber}");
        Console.WriteLine($"Account Balance : {customer.Balance}");

    }

    void PrintCustomerList(List<Customer> customers)
    {
        Console.WriteLine("Account Number");
        foreach (var customer in customers)
        {
            Console.WriteLine($"{customer.account_number}{new string(' ', 9)}{customer.Name}");
        }
    }
    void UpdateCustomerController()
    {

        PrintCustomerList(admin.GetAllCustomers());

        Console.Write("Enter Account Number to Proceed ( 0 to exit): ");
        int account_number = Convert.ToInt32(Console.ReadLine());

        Customer customer = admin.GetCustomerByAccountNumber(account_number);

        Console.WriteLine("Enter the fields one by one if you want to skip just press enter without entering any value");

        Console.Write("Email : ");
        string email = Console.ReadLine();

        Console.Write("Contact Number : ");
        string contact_number = Console.ReadLine();

        Console.Write("Address : ");
        string address = Console.ReadLine();

        Customer updatedCustomer = admin.UpdateCustomer(customer, email, contact_number, address);
        DisplayCustomerDetails(updatedCustomer);
    }

    void DeleteCustomerController()
    {
        PrintCustomerList(admin.GetAllCustomers());
        Console.Write($"Enter Account Number (0 to cancel) : ");
        int account_number = Convert.ToInt32(Console.ReadLine());
        if (account_number == 0)
            return;

        Customer customer = admin.GetCustomerByAccountNumber(account_number);
        DisplayCustomerDetails(customer);
        Console.Write("Are you sure you want to delete this customer? (y/N): ");
        char confirmation = (char)Console.Read();
        if (confirmation == 'y')
        {
            if (admin.DeleteCustomer(customer))
            {
                Console.WriteLine("Customer Deleted Successfully");
            }
            else
            {
                Console.WriteLine("Error in Deleting Customer");
            }
        }
        else
        {
            Console.WriteLine("Customer Deletion Aborted");

        }
        Console.WriteLine("Press Any Key to Continue...");
        Console.ReadKey();

    }
    public void Controller()
    {

        int ch = 0;
        while (ch != 5)
        {
            PrintMenu();
            System.Console.Write("Enter your choice : ");
            ch = Convert.ToInt32(Console.ReadLine());

            var choice = (AdminOptions)ch;
            switch (choice)
            {
                case AdminOptions.CreateAccount:
                    {
                        CreateCustomerController();
                        break;
                    }
                case AdminOptions.ViewAccount:
                    {
                        ViewAccountController();
                        break;
                    }
                case AdminOptions.UpdateAccount:
                    {
                        UpdateCustomerController();
                        break;
                    }
                case AdminOptions.DeleteAccount:
                    {
                        DeleteCustomerController();
                        break;
                    }
            }
            Console.WriteLine("press any key to continue...");
            Console.ReadKey();
        }
    }
}