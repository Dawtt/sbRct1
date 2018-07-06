




# sbRct1

##Important Configuration Files & Commands
- full run (commands from root directory mostly)
    - `yarn install` or `npm install`: install dependencies for node.js based on `package.json`.
    - `react-scripts build` builds the JS codebase which the node server will serve. This is code from Facebook's `create-react-app` which includes webpack.
    - `mvn clean` compiles java code & dependencies
    - `mvn spring:boot run` should run the backend java server & front-end node server.
- `/package.json` 
    - lists dependencies for node.
    - `npm install` or `yarn install` will create the `/node_modules` directory containing node dependencies.
    - `scripts` is a section which has scripted commands. Intellij can run these from the file itself.
- `pom.xml` The configuration file for Spring Boot.
- `webpack.config` Configuration file for webpack. Facebook's `react-scripts build` does some kind of magic abstraction with this. If you `eject` from Facebook's scripts, the build files will be placed into the app without that higher abstraction.
- `/src/main/resources/templates/index.html` The default start page from Spring.
- `/public/index.html` The default start page from `create-react-app`.
_____
Code put together from spring.io guide at
https://spring.io/guides/tutorials/react-and-spring-data-rest/
Files contain comments from the guide explaining code, throughout
_____
Running Notes:
    /sbrct1$ sudo npm install
    /sbrct1$ npm run-script build
        *this will run webpack
    /sbrct1$ mvn spring-boot:run
    open localhost:8080

-----
Production Notes:
    Possibly, a webserver will need node.js, npm, and java installed in someway. 
    mvnw may need to replace mvn. Does this allow usage of maven on a server without installing maven? Better to install maven? Does this complicate upgrades?
    on the walkthrough npm installation via pom.xml: " (This ensures the binaries are NOT pulled under source control, and can be cleaned out with clean)."
Note: The following must be done manually, and is not included in the pom.xml as in the original guide:
Some work needs to be done understanding the relationship between maven, node.js, spring boot, and the jvm here.
    This works on my computer, because node & java are installed. So how to deploy on different types of webservers.
    
-----
This little plugin perform multiple steps:

The install-node-and-npm command will install node.js and it’s package management tool, npm, into the target folder. (This ensures the binaries are NOT pulled under source control, and can be cleaned out with clean).

The npm command will execute the npm binary with the provided argument (install). This installs modules defined in package.json.

The webpack command will execute webpack binary, which compiles all the JavaScript code based on webpack.config.js.

These steps are run in sequence, essentially installing node.js, downloading JavaScript modules, and building the JS bits.

-----

Refresher, some commands used in guide:
$ curl localhost:8080/api/employees/1
curl -X POST localhost:8080/api/employees -d "{\"firstName\": \"Bilbo\", \"lastName\": \"Baggins\", \"description\": \"burglar\"}" -H "Content-Type:application/json"
curl "http://localhost:8080/api/employees?page=1&size=2"
curl "localhost:8080/api/employees?size=2"

When using "&" in URL query parameters, the command line thinks it’s a line break. Wrap the whole URL with quotation marks to bypass that.







