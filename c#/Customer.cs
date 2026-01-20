using System.Runtime.InteropServices;

namespace c_;

public class Customer
{   

    public int account_number;
    public string AadharNumber;
    public string Name;
    public string Email;
    public string Address;
    public string ContactNumber;

    public string PanNumber;
    public int Balance;
    public string Password;

    public Customer(string AadharNumber, string Name, string Email, string Address,string ContactNumber,string PanNumber, int Balance, string Password)
    {

        if(string.IsNullOrWhiteSpace(Name) || Name.Length > 50) throw new ArgumentException("Invalid Value for name");
        
        if(string.IsNullOrWhiteSpace(Address) || Address.Length > 100) throw new ArgumentException("Invalid Value for address");

        if(string.IsNullOrWhiteSpace(ContactNumber) || ContactNumber.Length > 10) throw new ArgumentException("Invalid value for Contact Number");
    
        if(string.IsNullOrWhiteSpace(PanNumber) || PanNumber.Length > 10) throw new ArgumentException("Invalid value for the Pan Number");

        if(!IsPassValid(Password))
            new ArgumentException("Password should contain atleast 1 Uppercase 1 LowerCase and 1 Special Char");
        
        this.account_number = GenerateAccountNumber();
        this.AadharNumber = AadharNumber;
        this.Name = Name;
        this.Email = Email;
        this.Address = Address;
        this.ContactNumber = ContactNumber;   
        this.PanNumber = PanNumber;
        this.Balance = Balance;
        this.Password = Password;
    }
    private int GenerateAccountNumber()
    {
        Random rnd = new Random();
        return rnd.Next(1000, 9999);
    }
    private bool IsPassValid(string password)
    {
        return password.Any(char.IsUpper) && 
               password.Any(char.IsLower) && 
               password.Any(x=>!char.IsLetterOrDigit(x) && !char.IsWhiteSpace(x));
    }

    
}