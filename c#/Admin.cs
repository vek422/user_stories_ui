using System;
using System.ComponentModel;
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

   private Customer? GetCustomerByAccountNumber(int account_number)
    {
        Customer customer;
        try
        {
            customer = _users[account_number];
        }catch(KeyNotFoundException e)
        {
            customer = null;
            Console.WriteLine($"The Account number {account_number} is invalid");
        }
        return customer;
    }

    private void CreateAccount()
    {
        try
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

            
        var newCustomer = new Customer(addhar_number,name, email, address, contact_number, pan_number, initial_deposit, pass );

        this._users[newCustomer.account_number] = newCustomer;
        Console.WriteLine($"New Customer is created with Account Number : {newCustomer.account_number}");
        
        }catch(ArgumentException e)
        {
            Console.WriteLine($"Cannot create new customer : {e.Message}");
        }catch(Exception e)
        {
            Console.WriteLine("Something Went wrong");
        }
        
    }

    private void DisplayCustomerList()
        {
            Console.WriteLine("Account Number   Name");
            foreach(var (account_number, customer) in _users)
            {
                Console.WriteLine($"{account_number}  {new string(' ',10)} {customer.Name}");
            }
        }

    private void UpdateCustomer()
    {
        try
        {    
            DisplayCustomerList();
            Console.Write("Enter an account number from above list to update the record (0 to cancel) : ");

            int account_number = Convert.ToInt32(Console.ReadLine());
            if(account_number == 0)
            {
                return;
            }

            var customer = GetCustomerByAccountNumber(account_number);
            if(customer == null)
            {
                Console.WriteLine($"Cannot Find Customer with the account Number {account_number}");
                return;
            }
            DisplayCustomerDetails(customer);

            Console.WriteLine("Enter the fields one by one if you want to skip just press enter without entering any value");

            Console.Write("Email : ");
            string email = Console.ReadLine();

            Console.Write("Contact Number : ");
            string contact_number = Console.ReadLine();

            Console.Write("Address : ");
            string address = Console.ReadLine();
            
            if(!email.IsWhiteSpace() || !string.IsNullOrEmpty(email))
            {
                customer.Email = email;
            }
            if(!contact_number.IsWhiteSpace() || !string.IsNullOrEmpty(contact_number))
            {
                customer.ContactNumber = contact_number;
            } 
            if(!address.IsWhiteSpace() || !string.IsNullOrEmpty(address))
            {
                customer.Address = address;
            }

            Console.WriteLine("Updated customer details press any key to view the details");
            Console.ReadKey();
            DisplayCustomerDetails(customer);

            
        }catch(Exception e)
        {
            Console.WriteLine("Something Went Wrong");
        }
        
    }
    private void DisplayCustomerDetails(Customer customer)
    {
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
                    case 2:{
                        while(true){
                            Console.Clear();
                            DisplayCustomerList();
                            if(_users.Count == 0)
                            {
                                Console.WriteLine("No Customers Available");
                                break;
                            }
                            Console.Write("Enter Account number to view details of customer (0 to exit) : ");

                            try
                            {
                            int account_number = Convert.ToInt32(Console.ReadLine());
                            if(account_number == 0)
                                break;

                            DisplayCustomerByAccountNumber(account_number);
                            Console.WriteLine("Press any key o get back to previos menu...");
                            Console.ReadKey();
                            }
                            catch (Exception e)
                            {
                                Console.WriteLine("Something went wrong");
                            }
                        }
                        break;
                    }
                    case 3:{
                        UpdateCustomer();
                        break;
                    }
                }
                Console.WriteLine("press any key to continue...");
                Console.ReadKey();



                        
            }
    }
}
