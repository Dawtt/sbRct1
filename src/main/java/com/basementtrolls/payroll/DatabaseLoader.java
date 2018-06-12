
/*
This class is marked with Spring’s @Component annotation so that it is automatically picked up by @SpringBootApplication
*/
@Component
/*
It implements Spring Boot’s CommandLineRunner so that it gets run after all the beans are created and registered.
*/
public class DatabaseLoader implements CommandLineRunner {

	private final EmployeeRepository repository;

	@Autowired
	/*
	It uses constructor injection and autowiring to get Spring Data’s automatically created EmployeeRepository.
	*/
	public DatabaseLoader(EmployeeRepository repository) {
		this.repository = repository;
	}

	@Override
	/*
	The run() method is invoked with command line arguments, loading up your data.
	*/
	public void run(String... strings) throws Exception {
		this.repository.save(new Employee("Frodo", "Baggins", "ring bearer"));
	}
/*
One of the biggest, most powerful features of Spring Data is its ability to write JPA queries for you. This not only cuts down on your development time, but also reduces the risk of bugs and errors. Spring Data looks at the name of methods in a repository class and figures out the operation you need including saving, deleting, and finding.

That is how we can write an empty interface and inherit already built save, find, and delete operations.
*/


}