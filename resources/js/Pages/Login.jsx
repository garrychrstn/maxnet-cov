import Nav from "./Components/Nav";

const Login = () => {
    return ( 
        <>
            <Nav />
            <div className="login-container">
                <span class="material-symbols-outlined">login</span>
                <h1>Login to your </h1>

                <form method='POST' action='login/sent'>
                    <label>Username : </label>
                    <input type='text' name='username' placeholder="username" />

                    <label>Password : </label>
                    <input type='password' name='password' placeholder="password" />
                </form>
            </div>
        </>
     );
}
 
export default Login;