/**
 * Pusat Inventaris Warung
 * Copyright (c) 2026 Wisam Yassar Mahardika
 * Licensed under the MIT License
 */

import { useState, useEffect } from 'react'
import { useWarung } from './Warung'
import { supabase } from './supabase'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export default function App() {
    const [session, setSession] = useState(null)

    const handleLogout = async () => {
	const { error } = await supabase.auth.signOut()
	if (error) console.error('Log out Error: ', error.message)
    }

    const {
	produkList = [],
	loading,
	pesan,
	editId,
	namaProduk, setNamaProduk,
	hargaModal, setHargaModal,
	hargaJual, setHargaJual,
	stokSisa, setStokSisa,
	kategori, setKategori,
	handleSimpan,
	mulaiEdit,
	resetForm,
	handleHapus,
	totalJenis,
	totalStok,
	stokHampirHabis = []
    } = useWarung()

    useEffect(() => {
	supabase.auth.getSession().then(({ data: { session } }) => {
	    setSession(session)
	})

	const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
	    setSession(session)
	})

	return () => subscription.unsubscribe()
    }, [])

    if (!session) {
	return (
	    <div className="min-h-screen bg-white text-black font-sans p-8 md:p-20 flex flex-col justify-center items-center selection:bg-black selection:text-white">
		<div className="w-full max-w-sm border border-black p-8 md:p-12">
		    <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-6">
			Warung App Login
		    </div>
		    <h2 className="text-3xl font-light tracking-tighter mb-8">
			Masuk ke Pusat Inventaris.
		    </h2>
		    <Auth
			supabaseClient={supabase}
			appearance={{
			    theme: ThemeSupa,
			    variables: {
				default: {
				    colors: {
					brand: 'black',
					brandAccent: '#404040',
				    },
				},
			    },
			}}
			providers={[]}
		    />
		</div>
	    </div>
	)
    }

    return (
	<div className="min-h-screen bg-white text-black font-sans p-8 md:p-20 lg:p-28 selection:bg-black selection:text-white">
	    {/* GARIS ATAS & METADATA */}
	    <div className="border-b border-black pb-4 mb-20 flex justify-between items-end">
		<span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
		    Warung App
		</span>
		<div className="flex gap-6 items-center">
		    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
			Admin
		    </span>
		    <button
			onClick={handleLogout}
			className="font-mono text-xs uppercase tracking-widest text-neutral-500"
		    >
			<span>
			    Logout
			</span>
		    </button>
		</div>
	    </div>

	    {/* Judul */}
	    <header className="mb-24">
		<h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-none mb-8">
		    Pusat Inventaris<br />Warung.
		</h1>
		<p className="text-sm md:text-base font-normal text-neutral-600 max-w-xl leading-relaxed">
		    <i>Web App</i> inventaris warung. <br /> Dibuat untuk keperluan presentasi KIK <i>(Kreativitas, Inovasi, dan Kewirausahaan)</i>
		</p>
	    </header>

	    {/* STRIP STATUS PESAN */}
	    {pesan && (
		<div className="border-t border-b border-black py-4 mb-20 font-mono text-xs uppercase tracking-widest">
		    STATUS: {pesan}
		</div>
	    )}

	    {/* METRIK DATA (METRICS) */}
	    <section className="border-t border-black pt-12 pb-24 mb-24">
		<div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
		    <div>
			<span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
			    01. Total Jenis Barang
			</span>
			<p className="text-5xl md:text-7xl font-light tracking-tighter">
			    {totalJenis}
			</p>
		    </div>

		    <div>
			<span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
			    02. Total Unit Stok
			</span>
			<p className="text-5xl md:text-7xl font-light tracking-tighter">
			    {totalStok}
			</p>
		    </div>

		    <div>
			<span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
			    03. Stok Menipis (&lt; 5)
			</span>
			<p className="text-5xl md:text-7xl font-light tracking-tighter">
			    {stokHampirHabis?.length || 0}
			</p>
		    </div>
		</div>
	    </section>

	    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 border-t border-black pt-20">
		{/* Formulir Input */}
		<div className="lg:col-span-5 space-y-16">
		    <div>
			<div className="flex justify-between items-baseline mb-12">
			    <h2 className="text-2xl font-light tracking-tight uppercase">
				{editId ? 'Ubah Data Barang' : 'Tambah Barang Baru'}
			    </h2>
			    {editId && (
				<button
				    onClick={resetForm}
				    className="font-mono text-xs uppercase tracking-widest hover:underline text-neutral-500 cursor-pointer"
				>
				    Batal
				</button>
			    )}
			</div>

			<form onSubmit={handleSimpan} className="space-y-12">
			    <div>
				<label className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
				    01. Nama Barang
				</label>
				<input
				    type="text"
				    required
				    placeholder="Minyak Goreng 1L"
				    value={namaProduk}
				    onChange={(e) => setNamaProduk(e.target.value)}
				    className="w-full bg-transparent border-b border-black rounded-none py-3 text-2xl font-light text-black placeholder-neutral-300 focus:outline-none focus:border-black"
				/>
			    </div>

			    <div>
				<label className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
				    02. Kategori / Jenis
				</label>
				<select
				    value={kategori}
				    onChange={(e) => setKategori(e.target.value)}
				    className="w-full bg-transparent border-b border-black rounded-none py-3 text-xl font-light text-black focus:outline-none focus:border-black cursor-pointer"
				>
				    <option value="Makanan / Minuman">Makanan / Minuman</option>
				    <option value="Sembako">Sembako</option>
				    <option value="Kebutuhan Rumah">Kebutuhan Rumah</option>
				    <option value="Rokok / Lainnya">Rokok / Lainnya</option>
				</select>
			    </div>

			    <div className="grid grid-cols-2 gap-8">
				<div>
				    <label className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
					03. Modal (Rp)
				    </label>
				    <input
					type="number"
					inputMode="numeric"
					required
					placeholder="0"
					value={hargaModal}
					onChange={(e) => setHargaModal(e.target.value)}
					className="w-full bg-transparent border-b border-black rounded-none py-3 text-2xl font-light text-black placeholder-neutral-300 focus:outline-none focus:border-black"
				    />
				</div>

				<div>
				    <label className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
					04. Jual (Rp)
				    </label>
				    <input
					type="number"
					inputMode="numeric"
					required
					placeholder="0"
					value={hargaJual}
					onChange={(e) => setHargaJual(e.target.value)}
					className="w-full bg-transparent border-b border-black rounded-none py-3 text-2xl font-light text-black placeholder-neutral-300 focus:outline-none focus:border-black"
				    />
				</div>
			    </div>

			    <div>
				<label className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
				    05. Stok Sisa
				</label>
				<input
				    type="number"
				    inputMode="numeric"
				    required
				    placeholder="0"
				    value={stokSisa}
				    onChange={(e) => setStokSisa(e.target.value)}
				    className="w-full bg-transparent border-b border-black rounded-none py-3 text-2xl font-light text-black placeholder-neutral-300 focus:outline-none focus:border-black"
				/>
			    </div>

			    <button
				type="submit"
				disabled={loading}
				className="group pt-4 text-left font-normal text-xl hover:underline focus:outline-none flex items-center gap-3 disabled:opacity-30 cursor-pointer"
			    >
				<span>{loading ? 'Memproses...' : editId ? 'Simpan Perubahan' : 'Simpan Data Barang'}</span>
				<span className="transition-transform group-hover:translate-x-2">→</span>
			    </button>
			</form>
		    </div>
		</div>

		{/* Daftar Katalog */}
		<div className="lg:col-span-7 space-y-12">
		    <div className="flex justify-between items-baseline">
			<h2 className="text-2xl font-light tracking-tight uppercase">
			    Katalog Inventaris
			</h2>
			<span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
			    Total {produkList?.length || 0} Items
			</span>
		    </div>

		    {produkList?.length === 0 ? (
			<div className="py-16 text-neutral-400 font-light text-xl border-t border-black">
			    Data produk masih kosong.
			</div>
		    ) : (
			<div className="divide-y divide-black border-t border-b border-black">
			    {produkList?.map((item, index) => (
				<div key={item.id} className="py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
				    <div className="space-y-2">
					<div className="flex items-center gap-4">
					    <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
						{String(index + 1).padStart(2, '0')}
					    </span>
					    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
						{item.kategori}
					    </span>
					    {item.stok_sisa < 5 && (
						<span className="font-mono text-xs uppercase tracking-widest text-black underline">
						    Stok Menipis
						</span>
					    )}
					</div>

					<h3 className="text-3xl font-light tracking-tight">
					    {item.nama_produk}
					</h3>

					<p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
					    Modal: Rp {Number(item.harga_modal).toLocaleString('id-ID')}
					</p>
				    </div>

				    <div className="sm:text-right space-y-3 w-full sm:w-auto">
					<div>
					    <p className="text-3xl font-light tracking-tight">
						Rp {Number(item.harga_jual).toLocaleString('id-ID')}
					    </p>
					    <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mt-1">
						Stok Sisa: {item.stok_sisa} Pcs
					    </p>
					</div>

					<div className="flex sm:justify-end gap-6 pt-2">
					    <button
						onClick={() => mulaiEdit(item)}
						className="font-mono text-xs uppercase tracking-widest hover:underline text-black cursor-pointer"
					    >
						Edit
					    </button>
					    <button
						onClick={() => handleHapus(item.id, item.nama_produk)}
						className="font-mono text-xs uppercase tracking-widest hover:underline text-black cursor-pointer"
					    >
						Hapus
					    </button>
					</div>
				    </div>
				</div>
			    ))}
			</div>
		    )}
		</div>
	    </div>

	    {/* Footer */}
	    <footer className="mt-32 pt-8 border-t border-black flex justify-between items-center font-mono text-xs uppercase tracking-widest text-neutral-400">
		<span>Wisam Yassar Mahardika</span>
		<span>KIK</span>
	    </footer>
	</div>
    )
}
