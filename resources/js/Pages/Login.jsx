import { useForm } from "@inertiajs/react";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";


const Login = () => {
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        password: '',
    })

    function submit(e) {
        e.preventDefault()
        post('/login/sent')
    }
    return ( 
        <>
            <Nav />
            <div className="login-container w-1/3 m-auto mt-12">
                <div className="login-head flex justify-start items-center mb-7">
                    <span className="material-symbols-outlined inline">login</span>
                    <span className="text-xl">Login</span>
                </div>

                <form method='POST' action='login/sent' onSubmit={submit}>
                    <label>Username : </label>
                    <input className="block w-full p-2 rounded-md mt-2 mb-3" type='text' placeholder="username" value={ data.name } onChange={e => setData('name', e.target.value)} />
                    { errors.name && <div>{errors.name}</div>}

                    <label>Password : </label>
                    <input className="block w-full p-2 rounded-md mt-2 mb-3" type='password' placeholder="password" value={ data.password } onChange={e => setData('password', e.target.value)} />
                    { errors.password && <div>{errors.password}</div>}
                    <button type='submit' className="bg-prim px-3 py-2 rounded-md text-white w-full m-auto block" disabled={processing}>login</button>
                </form>
            </div>
            <Footer />
        </>
     );
}
 
export default Login;