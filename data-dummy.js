/**
 * DATA DUMMY - Sistem Pengajuan Kendaraan Dinas
 * Gunakan data ini untuk development tanpa API
 */

// ==================== DATA PENGGUNA ====================
const DUMMY_USERS = {
  admin: {
    id: 1,
    email: 'admin@dinas.gov.id',
    name: 'Administrator',
    role: 'admin',
    unit: 'Dinas Koperasi dan UKM'
  },
  user1: {
    id: 2,
    email: 'user@dinas.gov.id',
    name: 'Budi Santoso',
    role: 'user',
    unit: 'Bidang Perencanaan'
  },
  user2: {
    id: 3,
    email: 'user2@dinas.gov.id',
    name: 'Siti Nurhaliza',
    role: 'user',
    unit: 'Bidang Operasional'
  }
};

// ==================== DATA PENGAJUAN ====================
const DUMMY_REQUESTS = [
  {
    id: 1,
    nama_pegawai: 'Budi Santoso',
    nip: '196501151990031001',
    unit_eselon: 'Bidang Perencanaan',
    tanggal_penggunaan: '2024-02-15',
    waktu_penjemputan: '08:00',
    waktu_pengembalian: '12:00',
    tujuan: 'Rapat koordinasi di Kementerian Koperasi',
    jumlah_penumpang: 3,
    keterangan: 'Rapat rutin bulanan',
    status: 'approved',
    created_at: '2024-02-10',
    updated_at: '2024-02-10'
  },
  {
    id: 2,
    nama_pegawai: 'Siti Nurhaliza',
    nip: '197203091998032001',
    unit_eselon: 'Bidang Operasional',
    tanggal_penggunaan: '2024-02-20',
    waktu_penjemputan: '09:30',
    waktu_pengembalian: '14:30',
    tujuan: 'Kunjungan lapangan ke UMKM Binaan',
    jumlah_penumpang: 2,
    keterangan: 'Monitoring usaha bersama',
    status: 'pending',
    created_at: '2024-02-12',
    updated_at: '2024-02-12'
  },
  {
    id: 3,
    nama_pegawai: 'Ahmad Wijaya',
    nip: '198105021999021002',
    unit_eselon: 'Sekretariat',
    tanggal_penggunaan: '2024-02-25',
    waktu_penjemputan: '07:00',
    waktu_pengembalian: '10:00',
    tujuan: 'Antar Kepala Dinas ke acara resmi',
    jumlah_penumpang: 1,
    keterangan: 'Kegiatan resmi Dinas',
    status: 'rejected',
    created_at: '2024-02-08',
    updated_at: '2024-02-09'
  },
  {
    id: 4,
    nama_pegawai: 'Dewi Lestari',
    nip: '197612251997032001',
    unit_eselon: 'Bidang Keuangan',
    tanggal_penggunaan: '2024-02-28',
    waktu_penjemputan: '08:00',
    waktu_pengembalian: '11:00',
    tujuan: 'Sosialisasi program bantuan modal',
    jumlah_penumpang: 4,
    keterangan: 'Penyuluhan ke daerah',
    status: 'pending',
    created_at: '2024-02-13',
    updated_at: '2024-02-13'
  },
  {
    id: 5,
    nama_pegawai: 'Hendra Kusuma',
    nip: '196708301991031003',
    unit_eselon: 'Bidang Perencanaan',
    tanggal_penggunaan: '2024-03-05',
    waktu_penjemputan: '10:00',
    waktu_pengembalian: '13:00',
    tujuan: 'Survei lokasi UMKM baru',
    jumlah_penumpang: 2,
    keterangan: 'Kegiatan survei',
    status: 'approved',
    created_at: '2024-02-11',
    updated_at: '2024-02-11'
  },
  {
    id: 6,
    nama_pegawai: 'Lisa Pratami',
    nip: '198312102000022002',
    unit_eselon: 'Bidang Operasional',
    tanggal_penggunaan: '2024-03-10',
    waktu_penjemputan: '08:30',
    waktu_pengembalian: '15:00',
    tujuan: 'Workshop kewirausahaan di Provinsi',
    jumlah_penumpang: 5,
    keterangan: 'Workshop dan pelatihan',
    status: 'pending',
    created_at: '2024-02-14',
    updated_at: '2024-02-14'
  }
];

// ==================== DATA KENDARAAN ====================
const DUMMY_VEHICLES = [
  {
    id: 1,
    nama_kendaraan: 'Toyota Avanza',
    plat_nomor: 'B 1234 ABC',
    status_kendaraan: 'tersedia',
    kapasitas: 7,
    tahun_produksi: 2020,
    kondisi: 'Baik'
  },
  {
    id: 2,
    nama_kendaraan: 'Honda CRV',
    plat_nomor: 'B 5678 XYZ',
    status_kendaraan: 'tersedia',
    kapasitas: 5,
    tahun_produksi: 2019,
    kondisi: 'Baik'
  },
  {
    id: 3,
    nama_kendaraan: 'Daihatsu Ayla',
    plat_nomor: 'B 9012 DEF',
    status_kendaraan: 'dalam_perjalanan',
    kapasitas: 5,
    tahun_produksi: 2021,
    kondisi: 'Baik'
  }
];

// ==================== STATISTIK ====================
const DUMMY_STATS = {
  total: DUMMY_REQUESTS.length,
  pending: DUMMY_REQUESTS.filter(r => r.status === 'pending').length,
  approved: DUMMY_REQUESTS.filter(r => r.status === 'approved').length,
  rejected: DUMMY_REQUESTS.filter(r => r.status === 'rejected').length,
  vehicles_available: DUMMY_VEHICLES.filter(v => v.status_kendaraan === 'tersedia').length,
  vehicles_total: DUMMY_VEHICLES.length
};

// ==================== FUNGSI HELPER ====================

/**
 * Get semua pengajuan
 */
function getDummyRequests() {
  return DUMMY_REQUESTS;
}

/**
 * Get pengajuan berdasarkan status
 */
function getDummyRequestsByStatus(status) {
  return DUMMY_REQUESTS.filter(r => r.status === status);
}

/**
 * Get pengajuan berdasarkan user
 */
function getDummyRequestsByUser(nama_pegawai) {
  return DUMMY_REQUESTS.filter(r => r.nama_pegawai === nama_pegawai);
}

/**
 * Get pengajuan berdasarkan ID
 */
function getDummyRequestById(id) {
  return DUMMY_REQUESTS.find(r => r.id === id);
}

/**
 * Get statistik
 */
function getDummyStats() {
  return DUMMY_STATS;
}

/**
 * Get semua kendaraan
 */
function getDummyVehicles() {
  return DUMMY_VEHICLES;
}

/**
 * Get kendaraan tersedia
 */
function getDummyAvailableVehicles() {
  return DUMMY_VEHICLES.filter(v => v.status_kendaraan === 'tersedia');
}

/**
 * Format tanggal Indonesia
 */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}

/**
 * Format status menjadi label
 */
function formatStatus(status) {
  const labels = {
    pending: 'Menunggu',
    approved: 'Disetujui',
    rejected: 'Ditolak',
    tersedia: 'Tersedia',
    dalam_perjalanan: 'Dalam Perjalanan'
  };
  return labels[status] || status;
}

/**
 * Buat badge HTML
 */
function createBadge(status) {
  const classes = {
    pending: 'badge-pending',
    approved: 'badge-approved',
    rejected: 'badge-rejected'
  };
  return `<span class="badge ${classes[status]}">${formatStatus(status)}</span>`;
}

/**
 * Tambah pengajuan baru (simulasi)
 */
function addDummyRequest(newRequest) {
  const request = {
    id: Math.max(...DUMMY_REQUESTS.map(r => r.id)) + 1,
    status: 'pending',
    created_at: new Date().toISOString().split('T')[0],
    updated_at: new Date().toISOString().split('T')[0],
    ...newRequest
  };
  DUMMY_REQUESTS.push(request);
  updateDummyStats();
  return request;
}

/**
 * Update status pengajuan (simulasi)
 */
function updateDummyRequestStatus(id, newStatus) {
  const request = DUMMY_REQUESTS.find(r => r.id === id);
  if (request) {
    request.status = newStatus;
    request.updated_at = new Date().toISOString().split('T')[0];
    updateDummyStats();
  }
  return request;
}

/**
 * Update statistik
 */
function updateDummyStats() {
  DUMMY_STATS.total = DUMMY_REQUESTS.length;
  DUMMY_STATS.pending = DUMMY_REQUESTS.filter(r => r.status === 'pending').length;
  DUMMY_STATS.approved = DUMMY_REQUESTS.filter(r => r.status === 'approved').length;
  DUMMY_STATS.rejected = DUMMY_REQUESTS.filter(r => r.status === 'rejected').length;
}
