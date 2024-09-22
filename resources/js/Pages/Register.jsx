import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import { useForm } from "@inertiajs/react";

const Register = () => {

    const {data, setData, post, processing, errors} = useForm({
        name: '',
        email: '',
        password: ''
    })
    
    function submit(e) {
        e.preventDefault()
        post('/regis/sent')
        
    }

    return ( 
        <>
            <Nav />
            <div className='mt-10 w-2/3 m-auto'>
                <h1 className="text-center text-2xl">Temporary Register Center</h1>
                <p className="text-center ">MAXNET+ Management</p>
                <form method='post' action='/regis/sent' onSubmit={submit} className="w-1/2 m-auto mt-7">
                <label>Username :</label>
                <input className='block px-3 py-2 rounded-md w-full mt-2 mb-2'type='text' value={data.name} onChange={e => setData('name', e.target.value)} placeholder="username" />
                {errors.name && <div>{errors.name}</div>}
                
                <label>Email :</label>
                <input className='block px-3 py-2 rounded-md w-full mt-2 mb-2'type='email' value={data.email} onChange={e => setData('email', e.target.value)} placeholder="email" />
                {errors.email && <div>{errors.email}</div>}

                <label>Password :</label>
                <input className='block px-3 py-2 rounded-md w-full mt-2 mb-2'type='password' value={data.password} onChange={e => setData('password', e.target.value)} placeholder="password" />
                {errors.password && <div>{errors.password}</div>}
                <button type='submit' className="bg-prim px-3 py-2 rounded-md text-white w-full m-auto block" disabled={processing}>register</button>
                </form>
            </div>
            <Footer />
        </>
     );
}
 
export default Register;