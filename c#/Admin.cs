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

    public Customer? GetCustomerByAccountNumber(int account_number)
    {
        Customer customer = null;
        try
        {
            customer = _users[account_number];
        }
        catch (KeyNotFoundException e)
        {
            Console.WriteLine($"The Account number {account_number} is invalid");
        }
        return customer;
    }

    public Customer? CreateAccount(string addhar_number, string name, string email, string address, string contact_number, string pan_number, double initial_deposit, string password)
    {
        try
        {
            var newCustomer = new Customer(addhar_number, name, email, address, contact_number, pan_number, initial_deposit, password);
            this._users[newCustomer.account_number] = newCustomer;
            return newCustomer;
        }
        catch (ArgumentException e)
        {
            Console.WriteLine($"Cannot create new customer : {e.Message}");
        }
        return null;

    }

    public List<Customer> GetAllCustomers()
    {
        var customerList = new List<Customer>();
        foreach (var (_, customer) in _users)
        {
            customerList.Add(customer);
        }
        return customerList;
    }

    public Customer UpdateCustomer(Customer customer, string email, string contact_number, string address)
    {

        if (!string.IsNullOrWhiteSpace(email) || !string.IsNullOrEmpty(email))
        {
            customer.Email = email;
        }
        if (!string.IsNullOrWhiteSpace(contact_number) || !string.IsNullOrEmpty(contact_number))
        {
            customer.ContactNumber = contact_number;
        }
        if (!string.IsNullOrWhiteSpace(address) || !string.IsNullOrEmpty(address))
        {
            customer.Address = address;
        }

        return customer;

    }

    public bool DeleteCustomer(Customer customer)
    {
        return _users.Remove(customer.account_number);
    }

}
