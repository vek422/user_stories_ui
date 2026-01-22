using c_;
public class CustomerController
{
    private Dictionary<int, Customer> _users;
    public CustomerController(Dictionary<int, Customer> users)
    {
        this._users = users
;
    }

    public Customer? ValidateCustomer(int account_number, string Password)
    {
        if (!_users.ContainsKey(account_number))
        {
            return null;
        }
        if (_users[account_number].Password == Password)
        {
            return _users[account_number];
        }
        return null;

    }
    public void Controller(Customer customer)
    {

        while (true)
        {
            Console.Clear();
            Console.WriteLine("Customer Menu");
            Console.WriteLine("1. Deposit Amount");
            Console.WriteLine("2. Withdraw Money");
            Console.WriteLine("3. Check Balance");
            Console.WriteLine("4. Logout");
            Console.Write("Enter you choice : ");
            int ch = Convert.ToInt32(Console.ReadLine());

            switch (ch)
            {
                case 1:
                    {
                        double Amount = Convert.ToDouble(Console.ReadLine());
                        customer.Deposit(Amount);
                        break;
                    }
                case 2:
                    {
                        double amount = Convert.ToDouble(Console.ReadLine());
                        customer.Withdraw(amount);
                        break;
                    }
                case 3:
                    {
                        customer.DisplayBalance();
                        break;
                    }
                case 4:
                    {
                        return;
                    }
            }
            Console.WriteLine("Press Any key to continue..");
            Console.ReadKey();
        }
    }
}