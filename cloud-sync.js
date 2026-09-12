/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CLOUD SYNC & REALTIME MULTIPLAYER ENGINE — FEBI UNIVERSITAS TAZKIA
 * Firebase Cloud Firestore Integration for Bahan Ajar Digital & Live Games
 * Project: akuntansi-syariah
 * ═══════════════════════════════════════════════════════════════════════════
 */

// 1. Firebase Configuration (Project: akuntansi-syariah)
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBTtfB_3j33f_8KBqri7GkkukV8uj7-8Nc",
  authDomain: "akuntansi-syariah.firebaseapp.com",
  projectId: "akuntansi-syariah",
  storageBucket: "akuntansi-syariah.firebasestorage.app",
  messagingSenderId: "335898738265",
  appId: "1:335898738265:web:11175c94b92d929ceb3b48",
  measurementId: "G-3N3W7V0195"
};

// 2. Global State, PIN Gate & Firestore Instance
let db = null;
let isDbReady = false;
const readyCallbacks = [];

let currentStudent = {
  nim: localStorage.getItem('tazkia_student_nim') || '',
  nama: localStorage.getItem('tazkia_student_nama') || ''
};

// 3. Default Confidential PINs (Dapat diubah dosen di Dashboard Dosen)
const DEFAULT_COURSE_PINS = {
  'SIA': '3021',    // Sistem Informasi Akuntansi
  'ADA': '3011',    // Applied Data Analytics
  'BIV': '3012',    // Business Intelligence & Visualization
  'DOSEN': '7788'   // Dashboard Dosen
};

let activeCoursePins = { ...DEFAULT_COURSE_PINS };

// Helper: Run callback when Firebase DB is ready
window.onCloudSyncReady = function(cb) {
  if (isDbReady && db) {
    cb(db);
  } else {
    readyCallbacks.push(cb);
  }
};

function markDbReady(firestoreInstance) {
  db = firestoreInstance;
  isDbReady = true;
  window.firebaseDb = db;
  console.log("✓ Firebase Firestore 'akuntansi-syariah' siap digunakan!");
  checkCourseAccessPin();
  checkStudentIdentity();
  while (readyCallbacks.length > 0) {
    const cb = readyCallbacks.shift();
    try { cb(db); } catch (e) { console.error("Error in readyCallback:", e); }
  }
  window.dispatchEvent(new CustomEvent('cloud-sync-ready', { detail: { db } }));
}

// 4. Confidential Course PIN Gate Engine
function detectCurrentCourse() {
  const path = decodeURIComponent(window.location.pathname);
  if (path.includes('Sistem Informasi Akuntansi')) return 'SIA';
  if (path.includes('Applied Data Analytics')) return 'ADA';
  if (path.includes('Business Intelligence')) return 'BIV';
  if (path.includes('dashboard-dosen')) return 'DOSEN';
  return null; // Portal index.html bebas diakses untuk melihat katalog
}

function checkCourseAccessPin() {
  const courseCode = detectCurrentCourse();
  if (!courseCode) return;

  window.onCloudSyncReady(dbInstance => {
    // Sinkronkan PIN dari Firestore 'settings/access_pins' jika ada perubahan oleh Dosen
    dbInstance.collection('settings').doc('access_pins').onSnapshot(doc => {
      if (doc.exists) {
        activeCoursePins = { ...DEFAULT_COURSE_PINS, ...doc.data() };
      }
      validateCoursePin(courseCode);
    }, err => {
      validateCoursePin(courseCode);
    });
  });
}

function validateCoursePin(courseCode) {
  const requiredPin = activeCoursePins[courseCode] || DEFAULT_COURSE_PINS[courseCode];
  const unlocked = localStorage.getItem('tazkia_pin_unlocked_' + courseCode);

  if (unlocked === requiredPin) {
    const lockModal = document.getElementById('coursePinModal');
    if (lockModal) lockModal.remove();
    document.body.style.overflow = '';
  } else {
    showPinModal(courseCode, requiredPin);
  }
}

function showPinModal(courseCode, requiredPin) {
  if (!document.body) {
    document.addEventListener('DOMContentLoaded', () => showPinModal(courseCode, requiredPin));
    return;
  }

  let modal = document.getElementById('coursePinModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'coursePinModal';
    document.body.style.overflow = 'hidden';

    const courseNames = {
      'SIA': 'Sistem Informasi Akuntansi (AKS-302)',
      'ADA': 'Applied Data Analytics (DAT-301)',
      'BIV': 'Business Intelligence & Visualization (BIV-301)',
      'DOSEN': 'Dashboard Monitoring & Rekap Nilai Dosen'
    };

    modal.innerHTML = `
      <div style="position:fixed;inset:0;background:rgba(7,15,28,.97);backdrop-filter:blur(10px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:18px">
        <div style="background:#121826;border:2px solid #D46020;border-radius:14px;padding:32px 24px;max-width:400px;width:100%;color:#fff;box-shadow:0 20px 50px rgba(0,0,0,.8);font-family:'Source Sans 3',sans-serif;text-align:center">
          <div style="font-size:42px;margin-bottom:8px">🔒</div>
          <h3 style="font-family:'Amiri',serif;font-size:24px;margin:0 0 6px;color:#FFB885">Kunci Akses Kelas</h3>
          <p style="font-size:13.5px;color:#CBD5E1;margin-bottom:6px">Mata Kuliah: <strong style="color:#38BDF8">${courseNames[courseCode] || courseCode}</strong></p>
          <p style="font-size:12px;color:#94A3B8;margin-bottom:18px">Materi ini bersifat <em>confidential</em>. Masukkan PIN 4 digit yang dibagikan oleh Dosen di dalam kelas untuk membuka akses.</p>
          
          <div style="margin-bottom:18px">
            <input type="password" id="inputCoursePin" maxlength="8" placeholder="••••" style="width:100%;padding:12px;border-radius:8px;border:1.5px solid #334155;background:#0F172A;color:#FFD488;font-size:22px;letter-spacing:.3em;text-align:center;box-sizing:border-box;font-family:'Source Code Pro',monospace;outline:none">
          </div>

          <button onclick="submitCoursePin('${courseCode}')" style="width:100%;background:linear-gradient(135deg,#D46020,#E88030);color:#fff;border:none;border-radius:8px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;transition:all .15s;box-shadow:0 4px 16px rgba(212,96,32,.3)">🔓 Buka Akses Materi ✓</button>
          
          <div style="margin-top:16px">
            <a href="${courseCode === 'DOSEN' ? 'index.html' : '../../index.html'}" style="color:#94A3B8;font-size:12.5px;text-decoration:none">← Kembali ke Portal Utama</a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    setTimeout(() => {
      const input = document.getElementById('inputCoursePin');
      if (input) {
        input.focus();
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') submitCoursePin(courseCode);
        });
      }
    }, 100);
  }
}

window.submitCoursePin = function(courseCode) {
  const input = document.getElementById('inputCoursePin');
  if (!input) return;
  const typedPin = input.value.trim();
  const requiredPin = activeCoursePins[courseCode] || DEFAULT_COURSE_PINS[courseCode];

  if (typedPin === requiredPin) {
    localStorage.setItem('tazkia_pin_unlocked_' + courseCode, requiredPin);
    const modal = document.getElementById('coursePinModal');
    if (modal) modal.remove();
    document.body.style.overflow = '';
    showCloudToast(`Akses <strong>${courseCode}</strong> berhasil terbuka!`);
  } else {
    input.value = '';
    input.style.borderColor = '#EF4444';
    alert("❌ PIN Salah! Silakan tanyakan PIN akses yang benar kepada Dosen pengampu di kelas.");
    input.focus();
  }
};

// 3. Initialize Firebase SDK from CDN
(function initFirebase() {
  if (window.firebase && window.firebase.firestore) {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    markDbReady(firebase.firestore());
  } else {
    // Dynamically load Firebase App & Firestore if not present
    const s1 = document.createElement('script');
    s1.src = "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js";
    s1.onload = () => {
      const s2 = document.createElement('script');
      s2.src = "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js";
      s2.onload = () => {
        if (!firebase.apps.length) {
          firebase.initializeApp(FIREBASE_CONFIG);
        }
        markDbReady(firebase.firestore());
      };
      document.head.appendChild(s2);
    };
    document.head.appendChild(s1);
  }
})();

// 4. Modal Identitas Mahasiswa (NIM & Nama)
function checkStudentIdentity(forcePrompt = false) {
  if (!document.body) {
    document.addEventListener('DOMContentLoaded', () => checkStudentIdentity(forcePrompt));
    return;
  }
  if (!currentStudent.nim || !currentStudent.nama || forcePrompt) {
    showIdentityModal();
  } else {
    updateTopStudentBadge();
  }
}

function showIdentityModal() {
  if (!document.body) {
    document.addEventListener('DOMContentLoaded', () => showIdentityModal());
    return;
  }
  let modal = document.getElementById('studentIdModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'studentIdModal';
    modal.innerHTML = `
      <div style="position:fixed;inset:0;background:rgba(7,15,28,.88);backdrop-filter:blur(6px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:18px">
        <div style="background:#121826;border:1.5px solid #22304A;border-radius:12px;padding:26px 22px;max-width:390px;width:100%;color:#fff;box-shadow:0 14px 40px rgba(0,0,0,.6);font-family:'Source Sans 3',sans-serif">
          <div style="font-size:32px;text-align:center;margin-bottom:6px">🎓</div>
          <h3 style="font-family:'Amiri',serif;font-size:22px;text-align:center;margin:0 0 6px;color:#38BDF8">Identitas Mahasiswa</h3>
          <p style="font-size:12.5px;color:#94A3B8;text-align:center;margin-bottom:16px">Masukkan NIM &amp; Nama Anda untuk sinkronisasi nilai kuis, praktikum, dan skor game ke Cloud.</p>
          
          <div style="margin-bottom:12px">
            <label style="display:block;font-size:12px;font-weight:700;color:#CBD5E1;margin-bottom:4px">NIM Mahasiswa:</label>
            <input type="text" id="inputStudentNIM" placeholder="Contoh: 2310112001" value="${currentStudent.nim}" style="width:100%;padding:10px 12px;border-radius:6px;border:1px solid #334155;background:#0F172A;color:#fff;font-size:14px;box-sizing:border-box">
          </div>

          <div style="margin-bottom:18px">
            <label style="display:block;font-size:12px;font-weight:700;color:#CBD5E1;margin-bottom:4px">Nama Lengkap:</label>
            <input type="text" id="inputStudentNama" placeholder="Nama Mahasiswa" value="${currentStudent.nama}" style="width:100%;padding:10px 12px;border-radius:6px;border:1px solid #334155;background:#0F172A;color:#fff;font-size:14px;box-sizing:border-box">
          </div>

          <button onclick="saveStudentIdentity()" style="width:100%;background:linear-gradient(135deg,#D46020,#E88030);color:#fff;border:none;border-radius:8px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;transition:opacity .15s">Simpan &amp; Hubungkan Cloud ✓</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
}

function saveStudentIdentity() {
  const nimInput = document.getElementById('inputStudentNIM');
  const namaInput = document.getElementById('inputStudentNama');
  if (!nimInput || !namaInput) return;

  const nim = nimInput.value.trim();
  const nama = namaInput.value.trim();

  if (!nim || !nama) {
    alert("Mohon isi NIM dan Nama Lengkap Anda!");
    return;
  }

  currentStudent.nim = nim;
  currentStudent.nama = nama;
  localStorage.setItem('tazkia_student_nim', nim);
  localStorage.setItem('tazkia_student_nama', nama);

  // Sync to Firestore collection 'users'
  window.onCloudSyncReady((dbInstance) => {
    dbInstance.collection('users').doc(nim).set({
      nim: nim,
      nama: nama,
      lastActive: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true })
      .then(() => {
        console.log("✓ User data tersinkronisasi ke Firestore collection 'users'");
        showCloudToast(`Identitas <strong>${nama} (${nim})</strong> terhubung ke Cloud!`);
      })
      .catch(err => {
        console.error("Error saving user:", err);
        showCloudToast(`Gagal menghubungkan profil: ${err.message}`, true);
      });
  });

  const modal = document.getElementById('studentIdModal');
  if (modal) modal.remove();
  updateTopStudentBadge();
}

function updateTopStudentBadge() {
  if (!document.body) {
    document.addEventListener('DOMContentLoaded', () => updateTopStudentBadge());
    return;
  }

  let badge = document.getElementById('topStudentBadge');
  if (!badge) {
    const topbarRight = document.querySelector('.topbar-right') || document.querySelector('.topbar');
    badge = document.createElement('div');
    badge.id = 'topStudentBadge';
    if (topbarRight) {
      badge.style.cssText = "display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);border-radius:14px;padding:4px 12px;font-size:12px;color:#fff;cursor:pointer;margin-right:8px;transition:all .15s";
      topbarRight.insertBefore(badge, topbarRight.firstChild);
    } else {
      // Floating pill on top-right if no .topbar
      badge.style.cssText = "position:fixed;top:10px;right:14px;z-index:9998;display:flex;align-items:center;gap:6px;background:#0C1D30;border:1.5px solid #1B7898;border-radius:20px;padding:6px 14px;font-size:12px;color:#fff;box-shadow:0 4px 12px rgba(0,0,0,.3);cursor:pointer;font-family:'Source Sans 3',sans-serif";
      document.body.appendChild(badge);
    }
    badge.onclick = () => showIdentityModal();
  }

  if (badge) {
    if (currentStudent.nama && currentStudent.nim) {
      badge.innerHTML = `👤 <strong>${currentStudent.nama}</strong> (${currentStudent.nim}) ✏️`;
      badge.title = "Klik untuk mengganti NIM / Nama";
    } else {
      badge.innerHTML = `🎓 <span style="color:#FFB885;font-weight:700">Isi NIM &amp; Nama</span> ⚠️`;
      badge.title = "Klik untuk mengisi identitas mahasiswa";
    }
  }
}

// 5. Toast Notification System
function showCloudToast(message, isError = false) {
  let toast = document.getElementById('cloudSyncToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cloudSyncToast';
    toast.style.cssText = "position:fixed;bottom:24px;right:24px;z-index:99999;padding:12px 20px;border-radius:10px;font-size:13.5px;font-weight:600;color:#fff;box-shadow:0 8px 24px rgba(0,0,0,.4);transition:all .3s;font-family:'Source Sans 3',sans-serif;display:flex;align-items:center;gap:10px";
    document.body.appendChild(toast);
  }
  toast.style.background = isError ? 'linear-gradient(135deg, #991B1B, #DC2626)' : 'linear-gradient(135deg, #065F46, #059669)';
  toast.style.border = isError ? '1px solid #F87171' : '1px solid #34D399';
  toast.innerHTML = (isError ? '⚠️ ' : '☁️ ') + message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 4000);
}

// 6. Submit Skor Kuis / Tugas Praktikum ke Cloud Firestore
window.saveScoreToCloud = function(pertemuan, aktivitas, skor, total, detail = {}) {
  if (!currentStudent.nim) {
    showIdentityModal();
    return;
  }

  window.onCloudSyncReady(async (dbInstance) => {
    const record = {
      nim: currentStudent.nim,
      nama: currentStudent.nama,
      pertemuan: pertemuan,
      aktivitas: aktivitas,
      skor: skor,
      total: total,
      persentase: Math.round((skor / total) * 100),
      detail: detail,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      timestampClient: new Date().toISOString()
    };

    try {
      // Save to 'quiz' collection
      await dbInstance.collection('quiz').add(record);
      console.log(`✓ Skor ${aktivitas} ${pertemuan} berhasil tersimpan di Cloud Firestore!`);
      showCloudToast(`Skor <strong>${aktivitas}</strong> (${skor}/${total}) berhasil tersimpan di Cloud Firestore!`);
    } catch (err) {
      console.error("Gagal menyimpan skor ke cloud:", err);
      showCloudToast(`Gagal menyimpan ke Cloud: ${err.message}. Periksa tab Rules di Firebase!`, true);
    }
  });
};

// 6. REALTIME MULTIPLAYER GAME ROOM ENGINE (P02 Games)
window.RealtimeGameEngine = {
  activeRoomId: 'BMT-ARENA-02',
  listenerUnsubscribe: null,
  leaderboardUnsubscribe: null,

  // Bergabung atau membuat Room Game
  joinRoom: function(roomId, teamName, onUpdateCallback) {
    this.activeRoomId = roomId || 'BMT-ARENA-02';
    window.onCloudSyncReady(dbInstance => {
      const roomRef = dbInstance.collection('games').doc(this.activeRoomId);

      // Initial setup room if not exists
      roomRef.get().then(doc => {
        if (!doc.exists) {
          roomRef.set({
            title: "Ekspedisi Transaksi BMT P02",
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            activeCaseIndex: 0,
            teams: {
              "Tim 1: Wadiah": { score: 0, members: 0 },
              "Tim 2: Murabahah": { score: 0, members: 0 },
              "Tim 3: Mudharabah": { score: 0, members: 0 },
              "Tim 4: Ijarah": { score: 0, members: 0 }
            }
          });
        }
      }).catch(err => console.error("Error checking game room:", err));

      // Realtime Listener using Firestore onSnapshot
      if (this.listenerUnsubscribe) this.listenerUnsubscribe();
      this.listenerUnsubscribe = roomRef.onSnapshot(doc => {
        if (doc.exists && onUpdateCallback) {
          onUpdateCallback(doc.data());
        }
      }, err => console.error("Error listening to game room:", err));
    });
  },

  // Update Nilai Skor Tim Realtime (untuk Proyektor Dosen / Tim)
  updateTeamScoreRealtime: function(teamName, pointDelta) {
    window.onCloudSyncReady(dbInstance => {
      const roomRef = dbInstance.collection('games').doc(this.activeRoomId);
      
      dbInstance.runTransaction(async transaction => {
        const doc = await transaction.get(roomRef);
        if (!doc.exists) return;
        const data = doc.data();
        const teams = data.teams || {};
        if (teams[teamName]) {
          teams[teamName].score = Math.max(0, (teams[teamName].score || 0) + pointDelta);
        } else {
          teams[teamName] = { score: Math.max(0, pointDelta), members: 0 };
        }
        transaction.update(roomRef, { teams: teams, lastUpdated: firebase.firestore.FieldValue.serverTimestamp() });
      }).catch(err => console.error("Error updating team score:", err));
    });
  },

  // Submit Skor Individu / Pasangan ke Live Leaderboard
  submitPlayerScore: function(playerScore, comboCount, roundCompleted) {
    if (!currentStudent.nim) {
      showIdentityModal();
      return;
    }
    window.onCloudSyncReady(dbInstance => {
      const roomRef = dbInstance.collection('games').doc(this.activeRoomId);

      const playerEntry = {
        nim: currentStudent.nim,
        nama: currentStudent.nama,
        score: playerScore,
        combo: comboCount,
        round: roundCompleted,
        updatedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      };

      roomRef.collection('players').doc(currentStudent.nim).set(playerEntry, { merge: true })
        .then(() => console.log("✓ Live score terkirim ke Leaderboard Cloud!"))
        .catch(err => console.error("Error submitting player score:", err));
    });
  },

  // Listen to Top Players Realtime Leaderboard
  listenLeaderboard: function(onLeaderboardChange) {
    window.onCloudSyncReady(dbInstance => {
      if (this.leaderboardUnsubscribe) this.leaderboardUnsubscribe();
      this.leaderboardUnsubscribe = dbInstance.collection('games').doc(this.activeRoomId).collection('players')
        .orderBy('score', 'desc')
        .limit(10)
        .onSnapshot(snapshot => {
          const players = [];
          snapshot.forEach(doc => players.push(doc.data()));
          if (onLeaderboardChange) onLeaderboardChange(players);
        }, err => console.error("Error listening leaderboard:", err));
    });
  }
};
