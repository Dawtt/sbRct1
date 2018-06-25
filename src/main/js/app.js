'use strict';
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
In the previous section, you hardcoded the path to /api/employees. Instead, the ONLY path you should hardcode is the root.
 */
const follow = require('./follow'); // function to hop multiple links by "rel"

const root = '/api';

/*
class Foo extends React.Component{…​} is the method to create a React component.
*/
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {employees: [], attributes: [], pageSize: 2, links: {}};
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
	}

    // tag::follow-2[]
    loadFromServer(pageSize) {
        follow(client, root, [
            {rel: 'employees', params: {size: pageSize}}]
        ).then(employeeCollection => {
            return client({
                method: 'GET',
                path: employeeCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                return employeeCollection;
            });
        }).done(employeeCollection => {
            this.setState({
                employees: employeeCollection.entity._embedded.employees,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: employeeCollection.entity._links});
        });
    }
    // end::follow-2[]

    // tag::create[]
    onCreate(newEmployee) {
	    /*Once again, use the follow() function to navigate to the employees resource where POST operations are performed. In this case, there was no need to apply any parameters, so the string-based array of rels is fine. In this situation, the POST call is returned. This allows the next then() clause to handle processing the outcome of the POST.*/
        follow(client, root, ['employees']).then(employeeCollection => {
            return client({
                method: 'POST',
                path: employeeCollection.entity._links.self.href,
                entity: newEmployee,
                headers: {'Content-Type': 'application/json'}
            })
        }).then(response => {
            return follow(client, root, [
                {rel: 'employees', params: {'size': this.state.pageSize}}]);
            /*New records are typically added to the end of the dataset. Since you are looking at a certain page, it’s logical to expect the new employee record to not be on the current page. To handle this, you need to fetch a new batch of data with the same page size applied. That promise is returned for the final clause inside done().*/
        }).done(response => {
            /*Since the user probably wants to see the newly created employee, you can then use the hypermedia controls and navigate to the last entry. This introduces the concept of paging in our UI.*/
            if (typeof response.entity._links.last != "undefined") {
                this.onNavigate(response.entity._links.last.href);
            } else {
                this.onNavigate(response.entity._links.self.href);
            }
            /*First time using a promise-based API? Promises are a way to kick of asynchronous operations and then register a function to respond when the task is done. Promises are designed to be chained together to avoid "callback hell".
            * The secret thing to remember with promises is that then() functions need to return something, whether it’s a value or another promise. done() functions do NOT return anything, and you don’t chain anything after it. In case you haven’t noticed yet, client (which is an instance of rest from rest.js) as well as the follow function return promises.*/
            /*ex:
            when.promise(async_func_call())
	        .then(function(results) {
		        //process the outcome of async_func_call
             })
            .then(function(more_results) {
                //process the previous then() return value
            })
            .done(function(yet_more) {
                //process the previous then() and wrap things up.
            });
            */
        });
    }
    // end::create[]

    // tag::delete[]
    /*The behavior to apply after deleting a record with a page-based UI is a bit tricky. In this case, it reloads the whole data from the server, applying the same page size. Then it shows the first page. If you are deleting the last record on the last page, it will jump to the first page.*/
    onDelete(employee) {
        client({method: 'DELETE', path: employee._links.self.href}).done(response => {
            this.loadFromServer(this.state.pageSize);
        });

    }
    // end::delete[]

    // tag::navigate[]
    onNavigate(navUri) {
        client({method: 'GET', path: navUri}).done(employeeCollection => {
            this.setState({
                employees: employeeCollection.entity._embedded.employees,
                attributes: this.state.attributes,
                pageSize: this.state.pageSize,
                links: employeeCollection.entity._links
            });
        });
    }
    // end::navigate[]

    // tag::update-page-size[]
    updatePageSize(pageSize) {
        if (pageSize !== this.state.pageSize) {
            /*Because a new page size causes changes to all the navigation links, it’s best to refetch the data and start from the beginning.*/
            this.loadFromServer(pageSize);
        }
    }
    // end::update-page-size[]


    // tag::follow-1[]
	/*
	componentDidMount is the API invoked after React renders a component in the DOM.
	*/
	componentDidMount() {

        /*
        In this code, the function loads data via client, a Promise compliant instance of rest.js. When it is done retrieving from /api/employees, it then invokes the function inside done() and set’s the state based on it’s HAL document (response.entity._embedded.employees). You might remember the structure of curl /api/employees earlier and see how it maps onto this structure.

		client({method: 'GET', path: '/api/employees'}).done(response => {
			this.setState({employees: response.entity._embedded.employees});
		});
        */
        this.loadFromServer(this.state.pageSize);

	}
    // end::follow-1[]
	/*
	render is the API to "draw" the component on the screen.
	 */
    render() {
        return (
            <div>
                <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
                <EmployeeList employees={this.state.employees}
                              links={this.state.links}
                              pageSize={this.state.pageSize}
                              onNavigate={this.onNavigate}
                              onDelete={this.onDelete}
                              updatePageSize={this.updatePageSize}/>
            </div>
        )
    }
}

// tag::create-dialog[]
class CreateDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        /*The handleSubmit() function first stops the event from bubbling further up the hierarchy.*/
        e.preventDefault();
        var newEmployee = {};
        /*It then uses the same JSON Schema attribute property to find each <input> using React.findDOMNode(this.refs[attribute])*/
        this.props.attributes.forEach(attribute => {
            /*this.refs is a way to reach out and grab a particular React component by name. In that sense, you are ONLY getting the virtual DOM component. To grab the actual DOM element you need to use React.findDOMNode().*/
            newEmployee[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });
        /*After iterating over every input and building up the newEmployee object, we invoke a callback to onCreate() the new employee. This function is up top inside App.onCreate and was provided to this React component as another property.*/
        this.props.onCreate(newEmployee);

        // clear out the dialog's inputs
        this.props.attributes.forEach(attribute => {
            ReactDOM.findDOMNode(this.refs[attribute]).value = '';
        });

        // Navigate away from the dialog to hide it.
        window.location = "#";
    }

    render() {
        var inputs = this.props.attributes.map(attribute =>
            <p key={attribute}>
                <input type="text" placeholder={attribute} ref={attribute} className="field" />
            </p>
        );

        return (
            /*Inside this component’s top-level <div> is an anchor tag and another <div>. The anchor tag is the button to open the dialog. And the nested <div> is the hidden dialog itself. In this example, you are use pure HTML5 and CSS3. No JavaScript at all! */
            <div>
                <a href="#createEmployee">Create</a>

                {/*Nestled inside <div id="createEmployee"> is a form where your dynamic list of input fields are injected followed by the Create button. That button has an onClick={this.handleSubmit} event handler. This is the React way of registering an event handler.*/}
                <div id="createEmployee" className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Create new employee</h2>

                        <form>
                            {inputs}
                            <button onClick={this.handleSubmit}>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}
// end::create-dialog[]

/*
Uppercase is convention for React components
 */
class EmployeeList extends React.Component{
    constructor(props) {
        super(props);
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    // tag::handle-page-size-updates[]
    handleInput(e) {
        /*stops the event from bubbling up.*/
        e.preventDefault();
        /*it uses the ref attribute of the <input> to find the DOM node and extract its value, all through React’s findDOMNode() helper function. */
        var pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
        /*tests if the input is really a number by checking if it’s a string of digits.*/
        if (/^[0-9]+$/.test(pageSize)) {
            /*If so, it invokes the callback, sending the new page size to the App React component. If not, the character just entered is stripped off the input.*/
            this.props.updatePageSize(pageSize);
        } else {
            ReactDOM.findDOMNode(this.refs.pageSize).value =
                pageSize.substring(0, pageSize.length - 1);
        }
    }
    // end::handle-page-size-updates[]

    // tag::handle-nav[]

    /*Each of these functions intercepts the default event and stops it from bubbling up. Then it invokes the onNavigate() function with the proper hypermedia link*/
    handleNavFirst(e){
        e.preventDefault();
        this.props.onNavigate(this.props.links.first.href);
    }

    handleNavPrev(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.prev.href);
    }

    handleNavNext(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.next.href);
    }

    handleNavLast(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.last.href);
    }
    // end::handle-nav[]

    // tag::employee-list-render[]


    render() {

        var employees = this.props.employees.map(employee =>
            <Employee key={employee._links.self.href} employee={employee} onDelete={this.props.onDelete}/>
        );
        /*conditionally display the controls based on which links appear in the hypermedia links*/
        /*As in the previous section, it still transforms this.props.employees into an array of <Element /> components. Then it builds up an array of navLinks, an array of HTML buttons.*/
        var navLinks = [];
        if ("first" in this.props.links) {
            navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
        }
        /*Because React is based on XML, you can’t put "<" inside the <button> element. You must instead use the encoded version.*/
        if ("prev" in this.props.links) {
            navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
        }
        if ("next" in this.props.links) {
            navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
        }
        if ("last" in this.props.links) {
            navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
        }

        /*
        Using JavaScript’s map function, this.props.employees is transformed from an array of employee records into an array of <Element /> React components
        * */
        //var employees = this.props.employees.map(employee =>
			/*
			* This shows a new React component (note the uppercase format) being created along with two properties: key and data. These are supplied the values from employee._links.self.href and employee.
			* Whenever you work with Spring Data REST, the self link IS the key for a given resource. React needs a unique identifer for child nodes, and _links.self.href is perfect.
			* */
            /* <Employee key={employee._links.self.href} employee={employee}/>
            */

			/*
			Whenever you work with Spring Data REST, the self link IS the key for a given resource. React needs a unique identifer for child nodes, and _links.self.href is perfect.
			 */
        return (
            <div>
                <input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
                <table>
                    <tbody>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                    {employees}
                    </tbody>
                </table>
                <div>
                    {navLinks}
                </div>
            </div>
        )
    }
    // end::employee-list-render[]
        /*
        Finally, you return an HTML table wrapped around the array of employees built with mapping.
         */
/*        return (
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
        )*/
		/*
		Worried about mixing logic with your structure? React’s APIs encourage nice, declarative structure combined with state and properties. Instead of mixing a bunch of unrelated JavaScript and HTML, React encourages building simple components with small bits of related state and properties that work well together. It lets you look at a single component and understand the design. Then they are easy to combine together for bigger structures.
		 */
}

class Employee extends React.Component{
/*This updated version of the Employee component shows an extra entry at the end of the row, a delete button. It is registered to invoke this.handleDelete when clicked upon. The handleDelete() function can then invoke the callback passed down while supplying the contextually important this.props.employee record.*/

    /*This shows again that it is easiest to manage state in the top component, in one place. This might not always be the case, but oftentimes, managing state in one place makes it easier to keep straight and simpler. By invoking the callback with component-specific details (this.props.onDelete(this.props.employee)), it is very easy to orchestrate behavior between components.*/
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }
    /*Deleting entries is much easier. Get a hold of its HAL-based record and apply DELETE to its self link.*/
    handleDelete() {
        /*Tracing the onDelete() function back to the top at App.onDelete, you can see how it operates*/
        this.props.onDelete(this.props.employee);
    }
    render() {
        return (
        	/*
        	a single HTML table row wrapped around the employee’s three properties. The property itself is this.props.employee. Notice how passing in a JavaScript object makes it easy to pass along data fetched from the server?
        	 */
            <tr>
                <td>{this.props.employee.firstName}</td>
                <td>{this.props.employee.lastName}</td>
                <td>{this.props.employee.description}</td>
                <td>
                    <button onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('react')
)