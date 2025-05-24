const provinsiDropdown = document.getElementById("provinsi");
const kotaDropdown = document.getElementById("kota");
const kecamatanDropdown = document.getElementById("kecamatan");
const kelurahanDropdown = document.getElementById("kelurahan");

// Memuat daftar provinsi
fetch("https://wilayah.id/api/provinces.json")
    .then(response => response.json())
    .then(data => {
        data.data.forEach(provinsi => {
            const option = document.createElement("option");
            option.value = provinsi.code;
            option.textContent = provinsi.name;
            provinsiDropdown.appendChild(option);
        });
    });

// Memuat daftar kota berdasarkan provinsi
provinsiDropdown.addEventListener("change", function () {
    const provinsiId = this.value;
    if (provinsiId) {
        fetch(`https://wilayah.id/api/regencies/${provinsiId}.json`)
            .then(response => response.json())
            .then(data => {
                kotaDropdown.innerHTML = '<option value="">-- Pilih Kota --</option>';
                data.data.forEach(kota => {
                    const option = document.createElement("option");
                    option.value = kota.code;
                    option.textContent = kota.name;
                    kotaDropdown.appendChild(option);
                });
            });
    } else {
        kotaDropdown.innerHTML = '<option value="">-- Pilih Kota --</option>';
    }
});

// Memuat daftar kecamatan berdasarkan kota
kotaDropdown.addEventListener("change", function () {
    const kotaId = this.value;
    if (kotaId) {
        fetch(`https://wilayah.id/api/districts/${kotaId}.json`)
            .then(response => response.json())
            .then(data => {
                kecamatanDropdown.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
                data.data.forEach(kecamatan => {
                    const option = document.createElement("option");
                    option.value = kecamatan.code;
                    option.textContent = kecamatan.name;
                    kecamatanDropdown.appendChild(option);
                });
            });
    } else {
        kecamatanDropdown.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
    }
});

// Memuat daftar kelurahan berdasarkan kecamatan
kecamatanDropdown.addEventListener("change", function () {
    const kecamatanId = this.value;
    if (kecamatanId) {
        fetch(`https://wilayah.id/api/villages/${kecamatanId}.json`)
            .then(response => response.json())
            .then(data => {
                kelurahanDropdown.innerHTML = '<option value="">-- Pilih Kelurahan/Desa --</option>';
                data.data.forEach(kelurahan => {
                    const option = document.createElement("option");
                    option.value = kelurahan.code;
                    option.textContent = kelurahan.name;
                    kelurahanDropdown.appendChild(option);
                });
            });
    } else {
        kelurahanDropdown.innerHTML = '<option value="">-- Pilih Kelurahan/Desa --</option>';
    }
});
