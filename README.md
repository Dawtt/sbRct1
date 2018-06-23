




# sbRct1
_____
Code put together from spring.io guide at
https://spring.io/guides/tutorials/react-and-spring-data-rest/
Files contain comments from the guide explaining code, throughout
_____
Running Notes:
    /target$ sudo npm install
    /target$ npm run-script build
        *this will run webpack
    /sbrct1$ mvn spring-boot:run




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







