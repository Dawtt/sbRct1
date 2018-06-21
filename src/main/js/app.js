const React = require('react');
const ReactDOM = require('react-dom');

/*
In the App component, an array of employees is fetched from the Spring Data REST backend and stored in this component’s state data.

React components have two types of data: state and properties.

State is data that the component is expected to handle itself. It is also data that can fluctuate and change. To read the state, you use this.state. To update it, you use this.setState(). Every time this.setState() is called, React updates the state, calculates a diff between the previous state and the new state, and injects a set of changes to the DOM on the page. This results a fast and efficient updates to your UI.

The common convention is to initialize state with all your attributes empty in the constructor. Then you lookup data from the server using componentDidMount and populate your attributes. From there on, updates can be driven by user action or other events.

Properties encompass data that is passed into the component. Properties do NOT change but are instead fixed values. To set them, you assign them to attributes when creating a new component and you’ll soon see.

JavaScript doesn’t lock down data structures like other languages. You can try to subvert properties by assigning values, but this doesn’t work with React’s differential engine and should be avoided.
In this code, the function loads data via client, a Promise compliant instance of rest.js. When it is done retrieving from /api/employees, it then invokes the function inside done() and set’s the state based on it’s HAL document (response.entity._embedded.employees). You might remember the structure of curl /api/employees earlier and see how it maps onto this structure.

When the state is updated, the render() function is invoked by the framework. The employee state data is included in creation of the <EmployeeList /> React component as an input parameter.
 */
/*
client is custom code that configures rest.js to include support for HAL, URI Templates, and other things. It also sets the default Accept request header to application/hal+json.
 */
const client = require('./client');

/*
class Foo extends React.Component{…​} is the method to create a React component.
*/
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {employees: []};
	}

	/*
	componentDidMount is the API invoked after React renders a component in the DOM.
	*/
	componentDidMount() {

        /*
        In this code, the function loads data via client, a Promise compliant instance of rest.js. When it is done retrieving from /api/employees, it then invokes the function inside done() and set’s the state based on it’s HAL document (response.entity._embedded.employees). You might remember the structure of curl /api/employees earlier and see how it maps onto this structure.
		*/
		client({method: 'GET', path: '/api/employees'}).done(response => {
			this.setState({employees: response.entity._embedded.employees});
		});
	}

	/*
	render is the API to "draw" the component on the screen.
	 */
	render() {
		return (
			<EmployeeList employees={this.state.employees}/>
		)
	}
}
/*
Uppercase is convention for React components
 */
class EmployeeList extends React.Component{
    render() {
        /*
        Using JavaScript’s map function, this.props.employees is transformed from an array of employee records into an array of <Element /> React components
        * */
        var employees = this.props.employees.map(employee =>

			/*
			* This shows a new React component (note the uppercase format) being created along with two properties: key and data. These are supplied the values from employee._links.self.href and employee.
			* Whenever you work with Spring Data REST, the self link IS the key for a given resource. React needs a unique identifer for child nodes, and _links.self.href is perfect.
			* */
            <Employee key={employee._links.self.href} employee={employee}/>
			/*
			Whenever you work with Spring Data REST, the self link IS the key for a given resource. React needs a unique identifer for child nodes, and _links.self.href is perfect.
			 */
        );
        /*
        Finally, you return an HTML table wrapped around the array of employees built with mapping.
         */
        return (
            <table>
                <tbody>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Description</th>
                </tr>
                {employees}
                </tbody>
            </table>
        )
		/*
		Worried about mixing logic with your structure? React’s APIs encourage nice, declarative structure combined with state and properties. Instead of mixing a bunch of unrelated JavaScript and HTML, React encourages building simple components with small bits of related state and properties that work well together. It lets you look at a single component and understand the design. Then they are easy to combine together for bigger structures.
		 */
    }
}

class Employee extends React.Component{
    render() {
        return (
        	/*
        	a single HTML table row wrapped around the employee’s three properties. The property itself is this.props.employee. Notice how passing in a JavaScript object makes it easy to pass along data fetched from the server?
        	 */
            <tr>
                <td>{this.props.employee.firstName}</td>
                <td>{this.props.employee.lastName}</td>
                <td>{this.props.employee.description}</td>
            </tr>
        )
    }
}ReactDOM.render(
    <App />,
    document.getElementById('react')
)