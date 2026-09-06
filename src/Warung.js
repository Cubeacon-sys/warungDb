/**
 * Pusat Inventaris Warung
 * Copyright (c) 2026 Wisam Yassar Mahardika
 * Licensed under the MIT License
 */

import { useState, useEffect } from 'react'
import { supabase } from './supabase'

export function useWarung() {
    const [produkList, setProdukList] = useState([])
    const [loading, setLoading] = useState(false)
    const [pesan, setPesan] = useState('')

    const [editId, setEditId] = useState(null)
    const [namaProduk, setNamaProduk] = useState('')
    const [hargaModal, setHargaModal] = useState('')
    const [hargaJual, setHargaJual] = useState('')
    const [stokSisa, setStokSisa] = useState('')
    const [kategori, setKategori] = useState('Makanan / Minuman')

    useEffect(() => {
	ambilDataProduk()
    }, [])

    const ambilDataProduk = async () => {
	const { data, error } = await supabase
	      .from('produk')
	      .select('*')
	      .order('id', { ascending: false })

	if (error) {
	    setPesan('Gagal mengambil data: ' + error.message)
	} else {
	    setProdukList(data || [])
	}
    }

    const handleSimpan = async (e) => {
	e.preventDefault()
	setLoading(true)
	setPesan('')

	const payload = {
	    nama_produk: namaProduk,
	    harga_modal: Number(hargaModal),
	    harga_jual: Number(hargaJual),
	    stok_sisa: Number(stokSisa),
	    kategori: kategori
	}

	if (editId) {
	    const { error } = await supabase
		  .from('produk')
		  .update(payload)
		  .eq('id', editId)

	    if (error) {
		setPesan('Gagal mengubah data: ' + error.message)
	    } else {
		setPesan('Data barang berhasil diperbarui!')
		resetForm()
		ambilDataProduk()
	    }
	} else {
	    const { error } = await supabase
		  .from('produk')
		  .insert([payload])

	    if (error) {
		setPesan('Gagal menambah barang: ' + error.message)
	    } else {
		setPesan('Barang baru berhasil ditambahkan!')
		resetForm()
		ambilDataProduk()
	    }
	}
	setLoading(false)
    }

    const mulaiEdit = (item) => {
	setEditId(item.id)
	setNamaProduk(item.nama_produk)
	setHargaModal(item.harga_modal)
	setHargaJual(item.harga_jual)
	setStokSisa(item.stok_sisa)
	setKategori(item.kategori)
    }

    const resetForm = () => {
	setEditId(null)
	setNamaProduk('')
	setHargaModal('')
	setHargaJual('')
	setStokSisa('')
	setKategori('Makanan / Minuman')
    }

    const handleHapus = async (id, nama) => {
	const yakin = confirm(`Hapus "${nama}" dari catatan?`)
	if (!yakin) return

	const { error } = await supabase
	      .from('produk')
	      .delete()
	      .eq('id', id)

	if (error) {
	    setPesan('Gagal menghapus: ' + error.message)
	} else {
	    setPesan('Barang berhasil dihapus.')
	    ambilDataProduk()
	}
    }

    const totalJenis = produkList.length
    const totalStok = produkList.reduce((acc, item) => acc + (Number(item.stok_sisa) || 0), 0)
    const stokHampirHabis = produkList.filter((item) => item.stok_sisa < 5)

    return {
	produkList,
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
	stokHampirHabis
    }
}
