function SignUp() {
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = {
        username: e.target.username.value,
        phone: e.target.phone.value,
        password: e.target.password.value,
      };
  
      const response = await fetch("http://localhost:8080/signup/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.text();
      alert(result);  // Show the result from the backend
    };
  
    return (
      <>
        <div className="form">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" required /><br />
            <input type="tel" name="phone" placeholder="Phone Number" /><br />
            <input type="password" name="password" placeholder="Password" required /><br />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required /><br />
            <input type="submit" value="Sign Up" />
          </form>
        </div>
      </>
    );
  }
  
  export default SignUp;
  