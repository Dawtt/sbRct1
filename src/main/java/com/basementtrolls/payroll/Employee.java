
/*
This entity is used to track employee information. In this case, their name and job description.
Spring Data REST isn’t confined to JPA. It supports many NoSQL data stores
*/

/*
@Data is a Project Lombok annotation to autogenerate getters, setters, constructors, toString, hash, equals, and other things. It cuts down on the boilerplate.
*/
@Data

/**
@Entity is a JPA annotation that denotes the whole class for storage in a relational table.
**/
@Entity
public class Employee {

	/*
	@Id and @GeneratedValue are JPA annotations to note the primary key and that is generated automatically when needed.
	*/
	private @Id @GeneratedValue Long id;
	private String firstName;
	private String lastName;
	private String description;

	private Employee() {}

	public Employee(String firstName, String lastName, String description) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.description = description;
	}
}