using c_;

public class Program
{
    
    public static void Main()
    {
        var users = new Dictionary<int, Customer>();
        Admin admin = new Admin(users);

        admin.Controller();
    }
}