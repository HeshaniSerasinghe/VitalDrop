import ballerina/http;

service /donation on new http:Listener(8080) {

    resource function post register(Donor donor) returns json {
        // Perform validation checks
        json validationResult = validateDonor(donor);
        if (validationResult != ()) {
            
            return validationResult;
        }

        // If validation passes, return success message (or proceed with database operations)
        return {"status": "success", "message": "Validation successful."};
    }

    // Validation function for donor form data
    function validateDonor(Donor donor) returns json? {
        if (donor.name == "") {
            return {"status": "error", "message": "Name is required."};
        }

        if (!isValidEmail(donor.email)) {
            return {"status": "error", "message": "Invalid email format."};
        }

        if (!isValidPhoneNumber(donor.phone)) {
            return {"status": "error", "message": "Invalid phone number."};
        }

        if (donor.age < 18 || donor.age > 65) {
            return {"status": "error", "message": "Age must be between 18 and 65."};
        }

        if (!isValidBloodType(donor.bloodType)) {
            return {"status": "error", "message": "Invalid blood type."};
        }

        return (); // No errors, validation passed
    }

    // Email validation function
    function isValidEmail(string email) returns boolean {
        // Basic email pattern check
        if (email.matches("\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b")) {
            return true;
        }
        return false;
    }

    // Phone number validation (digits only and 10 characters long)
    function isValidPhoneNumber(string phone) returns boolean {
        if (phone.length() == 10 && phone.matches("\\d+")) {
            return true;
        }
        return false;
    }

    // Blood type validation
    function isValidBloodType(string bloodType) returns boolean {
        string[] validBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
        foreach var type in validBloodTypes {
            if (bloodType == type) {
                return true;
            }
        }
        return false;
    }
}

// Define the Donor record to match the form fields
type Donor record {
    string name;
    string email;
    string phone;
    int age;
    string bloodType;
};
