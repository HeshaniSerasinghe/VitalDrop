import ballerina/http;
import ballerina/mysql;
import ballerina/sql;

configurable string dbUser = "root";
configurable string dbPassword = "Jayavihan@2002";
configurable string dbHost = "localhost";
configurable string dbName = "vitaldrop";

listener http:Listener signupListener = new (8080);

// Create MySQL client to connect to the database
mysql:Client dbClient = check new ({
    host: dbHost,
    port: 3306,
    name: dbName,
    username: dbUser,
    password: dbPassword
});

service /signup on signupListener {

    // POST method to handle signup
    resource function post registerUser(http:Caller caller, http:Request req) returns error? {
        json signupData = check req.getJsonPayload();

        // Extract data from JSON payload
        string username = check signupData.username.toString();
        string phone = check signupData.phone.toString();
        string password = check signupData.password.toString();

        // Insert data into the database
        string insertQuery = "INSERT INTO users (username, phone, password) VALUES (?, ?, ?)";
        sql:ParameterizedQuery query = `INSERT INTO users (username, phone, password) VALUES (${username}, ${phone}, ${password})`;

        var result = dbClient->execute(query);

        if result is sql:UpdateResult {
            // Respond with success message
            check caller->respond("User registered successfully");
        } else {
            // Handle error if the data insertion fails
            check caller->respond("Error registering user");
        }
    }
}
