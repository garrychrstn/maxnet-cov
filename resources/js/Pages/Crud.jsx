import { useState } from 'react'
import { useForm } from '@inertiajs/react'

const Crud = () => {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        email: '',
        alamat: '',
        notel: '',
        nik: '',
        ktp: null,
        coordinate: '',
        password: '',
      })
      
      function submit(e) {
        e.preventDefault()
        post('/request')
      }
      
    return ( 
        <>
            <form onSubmit={submit}>
                <input className='block rounded-md mb-7 px-2 py-2' type="text" value={data.nama} onChange={e => setData('nama', e.target.value)} placeholder='nama'/>
                {errors.nama && <div>{errors.nama}</div>}

                <input className='block rounded-md mb-7 px-2 py-2' type="email" value={data.email} onChange={e => setData('email', e.target.value)} placeholder='email'/>
                {errors.email && <div>{errors.email}</div>}
                
                <input className='block rounded-md mb-7 px-2 py-2' type="text" value={data.alamat} onChange={e => setData('alamat', e.target.value)} placeholder='alamat'/>
                {errors.alamat && <div>{errors.alamat}</div>}

                <input className='block rounded-md mb-7 px-2 py-2' type="text" value={data.notel} onChange={e => setData('notel', e.target.value)} placeholder='notel'/>
                {errors.notel && <div>{errors.notel}</div>}

                <input className='block rounded-md mb-7 px-2 py-2' type="text" value={data.nik} onChange={e => setData('nik', e.target.value)} placeholder='nik'/>
                {errors.nik && <div>{errors.nik}</div>}

                <input className='block rounded-md mb-7 px-2 py-2' type="file" onChange={e => setData('ktp', e.target.files[0])} />
                {errors.ktp && <div>{errors.ktp}</div>}

                <input className='block rounded-md mb-7 px-2 py-2' type="password" value={data.password} onChange={e => setData('password', e.target.value)} placeholder='password'/>
                {errors.password && <div>{errors.password}</div>}

                <input className='block rounded-md mb-7 px-2 py-2' type="text" value={data.coordinate} onChange={e => setData('coordinate', e.target.value)} placeholder='coordinate'/>
                {errors.coordinate && <div>{errors.coordinate}</div>}

                <button type="submit" disabled={processing}>register</button>
            </form>        
        </>
     );
}
 
export default Crud;