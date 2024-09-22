import { useContext, useEffect } from "react";
import { LetoContext, RequestContext, SubReq } from "./Home";
import { useForm } from "@inertiajs/react";
import RegisComplete from "./Components/RegisComplete";
import { useState } from "react";

const Registration = () => {
    const [visibility, setVisibility] = useState(true) 
    const [custRequest, setCustRequest] = useContext(RequestContext);
    const [leto, setLeto] = useContext(LetoContext)
    const [submitted, setSubmitted] = useContext(SubReq)
    const { data, setData, post, processing, errors } = useForm({
        nama: '',//
        email: '',//
        alamat: '', 
        notel: '', //
        nik: '', //
        ktp: null, //
        coordinate: '',
        password: '', //
      })
      
      useEffect(() => {
          setData({
              ...data,
              alamat: `${custRequest.address}`,
              coordinate: `${leto[0]}, ${leto[1]}`
          })
      }, [leto, custRequest.address])
      function submit(e) {
        e.preventDefault()
        post('/request')
        setVisibility(false)
        setSubmitted(true)
      }
      const sk = [
        "1) Sistem pembayaran adalah Pra bayar untuk setiap bulannya, dimulai ketika layanan internet mulai aktif.",
        "2) Pembayaran layanan bulan pertama / biaya instalasi wajib dibayarkan dihari itu juga kepada petugas aktivasi kami sebelum internet aktif, apabila kami tidak diterima pembayaran, maka pengaktifan layanan internet akan kami tunda sampai adanya pembayaran.",
        "3) Kontrak berlangganan minimal selama 1 tahun, apabila berhenti sebelum masa kontrak, maka diwajibkan menutup biaya abonemen sampai akhir masa kontrak yang tersisa. ",
        "4) Perangkat yang digunakan adalah milik Maxnet+, dan dipinjamkan selama berlangganan. ",
        "5) Kabel untuk instalasi maksimal 300 mtr, Jika jarak melebihi, dikenakan biaya tambahan Rp 2.000/meter.",
        "6) Jika instalasi melibatkan rumah warga dan atau fasilitas umum untuk menambat kabel, maka pelanggan wajib minta ijin terlebih dahulu kepada yang berwenang.",
        "7) Pelanggan tidak diperbolehkan merubah konfigurasi/setingan dan memindahkan perangkat Maxnet+ tanpa sepengetahuan perusahaan.",
        "8) Instalasi hanya dilakukan 1 kali selama berlangganan, apabila menghendaki pemindahan perangkat / relokasi atas permintaan pelanggan sendiri, akan dikenakan biaya tambahan sebesar biaya instalasi (Rp 250.000).",
        "9) Perubahan Layanan berupa Up Grade kapasitas dapat diajukan dan dilayani sesuai dengan tanggal jatuh tempo.",
        "10) Perubahan Layanan berupa Down Grade kapasitas HANYA dapat diajukan dan dilayani MINIMAL jika sudah berlangganan selama 3 bulan dan jarak dengan ODP sesuai dengan ketentuan yang berlaku. Pengajuan Down Grade maksimal 1X dalam 1 tahun.",
        "11) Untuk layanan kami adalah layanan broadband yang dimana kecepatannya bersifat UP TO."
      ]
    return ( 
        <>
            <div className={ visibility ? `container w-1/2 m-auto mt-17` : 'hidden'}>
                <h1 className="text-2xl text-center mb-7">REGISTRASI PEMASANGAN BARU</h1>
                <div className="sk">
                    <h1>Syarat & Ketentuan</h1>
                    { sk.map((s) => (
                        <p key={ sk.indexOf(s) }>{ s }</p>
                    ))}
                </div>
                <div className="nb mt-3 mb-5">
                    <strong>*REGISTRASI hanya akan mendaftarkan permintaan pemasangan WiFi. Kami akan menghubungi anda sebelum pemasangan diproses.</strong>
                </div>
                <form onSubmit={submit} encType="multipart/form-data">
                    <label>Nama Lengkap : </label>
                    <input className='block rounded-md mb-7 w-full px-2 py-2 mt-3' type="text" value={data.nama} onChange={e => setData('nama', e.target.value)} placeholder='nama'/>
                    {errors.nama && <div>{errors.nama}</div>}

                    <label>Email : </label>
                    <input className='w-full block rounded-md mb-7 px-2 py-2 mt-3' type="email" value={data.email} onChange={e => setData('email', e.target.value)} placeholder='email'/>
                    {errors.email && <div>{errors.email}</div>}
                    
                    <label>Alamat : </label>
                    <input className='w-full block rounded-md mb-7 px-2 py-2 mt-3 bg-gray-300 text-gray-500 cursor-not-allowed' type="text" placeholder={ data.alamat } value={ data.alamat } />
                    {errors.alamat && <div>{errors.alamat}</div>}

                    <label>No Telepon (Whatsapp) : </label>
                    <input className='w-full block rounded-md mb-7 px-2 py-2 mt-3' type="text" value={data.notel} onChange={e => setData('notel', e.target.value)} placeholder='notel'/>
                    {errors.notel && <div>{errors.notel}</div>}

                    <label>NIK : </label>
                    <input className='w-full block rounded-md mb-7 px-2 py-2 mt-3' type="text" value={data.nik} onChange={e => setData('nik', e.target.value)} placeholder='nik'/>
                    {errors.nik && <div>{errors.nik}</div>}

                    <label>Password : </label>
                    <input className='w-full block rounded-md mb-7 px-2 py-2 mt-3' type="password" value={data.password} onChange={e => setData('password', e.target.value)} placeholder='password'/>
                    {errors.password && <div>{errors.password}</div>}

                    <label>Koordinate Pemasangan : </label>
                    <input className='w-full block rounded-md mb-7 px-2 py-2 mt-3 bg-gray-300  text-gray-500 cursor-not-allowed' type="text" value={ data.coordinate } placeholder={ data.coordinate }  />
                    {errors.coordinate && <div>{errors.coordinate}</div>}

                    <label>Foto KTP : </label>
                    <input className='w-full block rounded-md mb-7 px-2 py-2 mt-3' type="file" onChange={e => setData('ktp', e.target.files[0])} />
                    {errors.ktp && <div>{errors.ktp}</div>}
                    
                    <button type="submit" disabled={processing}>register</button>
                </form>
            </div>
        </>
     );
}
 
export default Registration;