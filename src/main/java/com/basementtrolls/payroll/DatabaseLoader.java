package com.basementtrolls.payroll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


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
		this.repository.save(new Employee("Bilbo", "Baggins", "burglar"));
		this.repository.save(new Employee("Gandalf", "the Grey", "wizard"));
		this.repository.save(new Employee("Samwise", "Gamgee", "gardener"));
		this.repository.save(new Employee("Meriadoc", "Brandybuck", "pony rider"));
		this.repository.save(new Employee("Peregrin", "Took", "pipe smoker"));
	}
/*
One of the biggest, most powerful features of Spring Data is its ability to write JPA queries for you. This not only cuts down on your development time, but also reduces the risk of bugs and errors. Spring Data looks at the name of methods in a repository class and figures out the operation you need including saving, deleting, and finding.

That is how we can write an empty interface and inherit already built save, find, and delete operations.
*/


}