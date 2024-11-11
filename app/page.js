"use client";

import { useEffect, useState } from "react";

const Page = () => {
  const [nama, inputNama] = useState("");
  const [password, inputPassword] = useState("");
  const [daftar, setDaftar] = useState("");
  const [edit, setEdit] = useState(false);
  const [newnama, setNewNama] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [editId, setEditId] = useState(null);

  // fetch Daftar Pengguna
  const fetchPengguna = async () => {
    const res = await fetch(
      "https://rubjklajffvincvatbaw.supabase.co/rest/v1/pengguna?order=id.desc",
      {
        headers: {
          "Content-Type": "application/json",
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1YmprbGFqZmZ2aW5jdmF0YmF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNjMxMjcsImV4cCI6MjA0NTgzOTEyN30.Ie4Xon490NqR3stqLq1DGI25EZHGjhnUjLYTPtROwmU",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1YmprbGFqZmZ2aW5jdmF0YmF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNjMxMjcsImV4cCI6MjA0NTgzOTEyN30.Ie4Xon490NqR3stqLq1DGI25EZHGjhnUjLYTPtROwmU`,
        },
      }
    );

    const data = await res.json();
    setDaftar(data);
  };

  // fetch pertama kali diakses
  useEffect(() => {
    fetchPengguna();
  }, []);

  // Menambahkan Daftar Pengguna Baru
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://rubjklajffvincvatbaw.supabase.co/rest/v1/pengguna",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1YmprbGFqZmZ2aW5jdmF0YmF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNjMxMjcsImV4cCI6MjA0NTgzOTEyN30.Ie4Xon490NqR3stqLq1DGI25EZHGjhnUjLYTPtROwmU",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1YmprbGFqZmZ2aW5jdmF0YmF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNjMxMjcsImV4cCI6MjA0NTgzOTEyN30.Ie4Xon490NqR3stqLq1DGI25EZHGjhnUjLYTPtROwmU`,
        },
        body: JSON.stringify({ name: nama, pass: password }),
      }
    );

    if (response.ok) {
      // console.log("namanya: " + nama);
      // console.log("passwordnya: " + password);

      fetchPengguna();
      inputNama("");
      inputPassword("");
    } else {
      console.log("errors");
    }
  };

  // Delete Data Pengguna
  const handleDelete = async (id) => {
    // console.log("data: " + id);
    const isConfirmed = window.confirm(
      "Apakah anda yakin akan menghapus data?"
    );

    if (isConfirmed) {
      try {
        const res = await fetch(
          `https://rubjklajffvincvatbaw.supabase.co/rest/v1/pengguna?id=eq.${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              apikey:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1YmprbGFqZmZ2aW5jdmF0YmF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNjMxMjcsImV4cCI6MjA0NTgzOTEyN30.Ie4Xon490NqR3stqLq1DGI25EZHGjhnUjLYTPtROwmU",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1YmprbGFqZmZ2aW5jdmF0YmF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNjMxMjcsImV4cCI6MjA0NTgzOTEyN30.Ie4Xon490NqR3stqLq1DGI25EZHGjhnUjLYTPtROwmU`,
            },
          }
        );

        if (res.ok) {
          console.log("data dengan id: " + id + " berhasil dihapus");
          fetchPengguna();
        } else {
          console.log("gagal hapus data!");
        }
      } catch (error) {
        console.log("terjadi kesalahan: ", error);
      }
    } else {
      console.log("data tidak jadi dihapus!");
    }
  };

  // Edit Data Pengguna
  const toggleEdit = () => {
    setEdit(!edit);
  };

  const editPengguna = (id) => {
    // console.log("edit data dengan id: " + id);

    setEditId(id);

    const fetchDataEdit = async () => {
      const res = await fetch(
        `https://rubjklajffvincvatbaw.supabase.co/rest/v1/pengguna?id=eq.${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1YmprbGFqZmZ2aW5jdmF0YmF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNjMxMjcsImV4cCI6MjA0NTgzOTEyN30.Ie4Xon490NqR3stqLq1DGI25EZHGjhnUjLYTPtROwmU",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1YmprbGFqZmZ2aW5jdmF0YmF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNjMxMjcsImV4cCI6MjA0NTgzOTEyN30.Ie4Xon490NqR3stqLq1DGI25EZHGjhnUjLYTPtROwmU`,
          },
        }
      );

      const data = await res.json();
      // console.log(data[0]);

      setNewNama(data[0].name);
      setNewPassword(data[0].pass);
      toggleEdit();
    };

    fetchDataEdit();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editId) return;

    // console.log(newnama + newpassword);
    // console.log("menerima id" + editId);

    const response = await fetch(
      `https://rubjklajffvincvatbaw.supabase.co/rest/v1/pengguna?id=eq.${editId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1YmprbGFqZmZ2aW5jdmF0YmF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNjMxMjcsImV4cCI6MjA0NTgzOTEyN30.Ie4Xon490NqR3stqLq1DGI25EZHGjhnUjLYTPtROwmU",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1YmprbGFqZmZ2aW5jdmF0YmF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNjMxMjcsImV4cCI6MjA0NTgzOTEyN30.Ie4Xon490NqR3stqLq1DGI25EZHGjhnUjLYTPtROwmU`,
        },
        body: JSON.stringify({ name: newnama, pass: newpassword }),
      }
    );

    if (response.ok) {
      toggleEdit();
      fetchPengguna();
    } else {
      console.log("update data gagal!");
    }
  };

  return (
    <div className="p-5">
      <h2 className="font-bold text-xl mb-2">INPUT PENGGUNA BARU</h2>
      <form className="mb-5 flex align-middle" onSubmit={handleSubmit}>
        <input
          className="border px-2 py-1 mr-4"
          type="text"
          placeholder="Nama Pengguna"
          value={nama}
          onChange={(e) => inputNama(e.target.value)}
        />
        <input
          className="border px-2 py-1 mr-4"
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => inputPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-3 py-2">
          TAMBAH PENGGUNA
        </button>
      </form>
      <h2 className="font-bold text-xl mb-2">TAMBAHKAN DATA PENGGUNA</h2>
      {daftar ? (
        daftar.map((pengguna) => (
          <div key={pengguna.id} className="mb-4">
            <h2>{pengguna.name}</h2>
            <p>{pengguna.pass}</p>
            <button
              className="bg-red-600 text-white px-4 py-1 mt-2 mr-2"
              onClick={() => handleDelete(pengguna.id)}
            >
              Hapus
            </button>
            <button
              className="bg-green-600 text-white px-4 py-1 mt-2"
              onClick={() => editPengguna(pengguna.id)}
            >
              Edit
            </button>
          </div>
        ))
      ) : (
        <div>loading....</div>
      )}
      {/* modal edit */}
      {edit && (
        <div className="modal-box">
          <div className="modal-content">
            <div className="flex items-center justify-between mb-5">
              <div className="font-bold text-xl">EDIT PENGGUNA</div>
              <div
                onClick={toggleEdit}
                className="font-extrabold text-xl bg-gray-100 px-2 cursor-pointer"
              >
                X
              </div>
            </div>
            <form
              className="mb-5 flex align-middle"
              onSubmit={handleEditSubmit}
              id="edit-form"
            >
              <input
                className="border px-2 py-1 mr-4"
                type="text"
                placeholder="Nama Baru"
                value={newnama}
                onChange={(e) => setNewNama(e.target.value)}
              />
              <input
                className="border px-2 py-1 mr-4"
                type="text"
                placeholder="Password Baru"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-3 py-2"
              >
                UPDATE PENGGUNA
              </button>
            </form>
          </div>
        </div>
      )}
      <style jsx>{`
        .modal-box {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default Page;
