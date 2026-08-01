import { AdminConfig, EthicsScenario, LearningUnit, QuizQuestion, SIFTCase } from '../types';

export const defaultAdminConfig: AdminConfig = {
  minPassingScore: 75,
  instructorName: 'Riyan Sanjaya',
  instructorNip: 'Ketua Tim Peneliti Etika Informasi',
  instituteName: 'Program Studi Perpustakaan dan Sains Informasi, Fakultas Ilmu Pendidikan, Universitas Negeri Jakarta',
  moduleTitle: 'E-Modul Etika Informasi: Jelajah Digital untuk Generasi Kritis',
  pinCode: '123456',
  enableAiAssistant: true
};

export const defaultUnits: LearningUnit[] = [
  {
    id: 1,
    unitNumber: 1,
    title: 'Mengenal Etika Informasi di Era Digital',
    subtitle: 'Hakikat Etika Informasi, Urgensi Literasi Digital, dan Tantangan Generasi Digital Native',
    learningObjectives: [
      'Memahami hakikat, definisi, dan fungsi etika informasi sebagai navigasi moral di dunia siber.',
      'Mengidentifikasi bentuk-bentuk pelanggaran etika informasi (hoaks, plagiarisme, pelanggaran privasi, ujaran kebencian).',
      'Menganalisis tantangan generasi digital native (information overload, echo chamber, filter bubble).',
      'Menerapkan prinsip verifikasi dan saring sebelum sharing dalam penggunaan media digital sehari-hari.'
    ],
    summaryPoints: [
      'Etika Informasi adalah cabang etika yang membahas nilai moral dan prinsip yang mengatur perilaku manusia dalam menciptakan, mengakses, menyebarkan, dan menggunakan informasi.',
      'Bayangkan etika informasi seperti "rambu lalu lintas di dunia digital" yang mencegah pengguna mengalami kecelakaan di dunia maya.',
      'Di Indonesia, pelanggaran etika informasi meliputi Hoaks & Disinformasi, Plagiarisme, Pelanggaran Hak Cipta, Pelanggaran Privasi, dan Ujaran Kebencian.',
      'Generasi Digital Native menghadapi tantangan besar: Information Overload, Echo Chamber & Filter Bubble, Kecepatan vs Ketepatan, dan Dualisme Identitas Digital vs Nyata.'
    ],
    video: {
      type: 'gdrive',
      url: 'https://docs.google.com/videos/d/1iJYlVbE6mH172AIPuzvfAr_Rja2N81KLuLIQ29OWzBc/play?usp=sharing',
      title: 'Video Pengantar Unit 1: Mengapa Etika Informasi Penting di Era Digital?',
      duration: 'Pengantar Modul'
    },
    sections: [
      {
        id: 'u1-s1',
        subTitle: '1.1 Hakikat Etika Informasi & Rambu Lalu Lintas Digital',
        paragraphs: [
          'Etika informasi adalah cabang dari etika yang membahas tentang nilai-nilai moral dan prinsip-prinsip yang mengatur perilaku manusia dalam menciptakan, mengakses, menyebarkan, dan menggunakan informasi.',
          'Bayangkan etika informasi seperti rambu lalu lintas di dunia digital. Sama seperti rambu lalu lintas mengatur kendaraan di jalan agar tidak terjadi kecelakaan, etika informasi mengatur kita agar tidak "kecelakaan" di dunia maya, seperti terjerat hukum, merugikan orang lain, atau merusak reputasi diri.',
          'Menurut survei Kominfo, tingkat literasi digital masyarakat Indonesia masih berada pada kategori "sedang". Ini berarti masih banyak masyarakat yang belum mampu membedakan informasi yang benar dan hoaks, sehingga pemahaman etika informasi menjadi modal krusial.'
        ],
        keyTakeaway: 'Etika informasi bertindak sebagai navigasi moral agar kita selamat dan bertanggung jawab saat berinteraksi di ruang siber.',
        interactiveDiagram: {
          id: 'diagram-rambu-digital',
          type: 'process',
          title: 'Diagram Interaktif: 4 Pilar Rambu Lalu Lintas Etika Digital',
          subtitle: 'Klik setiap pilar rambu digital di bawah untuk memahami prinsip navigasi moral saat berinternet',
          imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80',
          imageCaption: 'Kerangka Kerja Rambu Etika Informasi & Literasi Digital Generasi Kritis',
          steps: [
            {
              stepNumber: 1,
              title: 'RAMBU HIJAU (Etika Akses & Atribusi)',
              badge: 'Izin Akses',
              description: 'Selalu gunakan informasi secara sah, jujur, dan cantumkan hak cipta pembuat karya.',
              details: [
                'Hargai karya cipta dengan mencantumkan nama penulis & sumber rujukan.',
                'Gunakan lisensi terbuka (Creative Commons) sesuai peruntukannya.',
                'Hormati hak moral dan hak ekonomi pencipta konten.'
              ],
              color: 'emerald'
            },
            {
              stepNumber: 2,
              title: 'RAMBU KUNING (Verifikasi & Tahan Emosi)',
              badge: 'Waspada',
              description: 'Ambil jeda (Stop) saat menerima kabar heboh sebelum membagikannya ke publik.',
              details: [
                'Waspadai berita bernada emosional atau pemicu amarah massal.',
                'Periksa kebenaran di portal Cek Fakta resmi (Mafindo, TurnBackHoax, Kominfo).',
                'Terapkan teknik Lateral Reading dengan membuka beberapa jendela browser.'
              ],
              color: 'amber'
            },
            {
              stepNumber: 3,
              title: 'RAMBU MERAH (Stop Hoaks & Ujaran Kebencian)',
              badge: 'Larangan Keras',
              description: 'Dilarang keras membagikan hoaks, ujaran kebencian (Hate Speech), dan perundungan siber.',
              details: [
                'Hentikan penyebaran konten berpotensi fitnah dan provokasi SARA.',
                'Hormati undang-undang privasi (UU PDP No. 27/2022 & UU ITE).',
                'Lindungi korban perundungan siber dengan tidak membagikan ulang video pelecehan.'
              ],
              color: 'rose'
            },
            {
              stepNumber: 4,
              title: 'RAMBU BIRU (Privasi & Proteksi Akun)',
              badge: 'Perisai Data',
              description: 'Jaga kerahasiaan identitas pribadi dan aktifkan sistem proteksi keamanan digital.',
              details: [
                'Gunakan password kuat kombinasi huruf, angka, dan simbol.',
                'Aktifkan Otentikasi Dua Faktor (2FA) di semua akun media sosial.',
                'Jangan pernah membagikan KTP, NIK, atau kode OTP perbankan kepada siapapun.'
              ],
              color: 'indigo'
            }
          ]
        },
        tableData: {
          title: 'Tabel 1.1: 5 Bentuk Utama Pelanggaran Etika Informasi di Indonesia',
          headers: ['Bentuk Pelanggaran', 'Sifat & Karakteristik', 'Dampak Utama', 'Contoh Kasus Realitas'],
          rows: [
            ['Hoaks & Disinformasi', 'Informasi palsu yang disengaja/tidak disengaja untuk menyesatkan', 'Kepanikan publik, kekacauan lalu lintas digital, kecemasan massa', 'Berita palsu bencana alam & klaim darurat kesehatan'],
            ['Plagiarisme Akademik', 'Mengakui karya atau gagasan orang lain tanpa mencantumkan sumber', 'Sanksi akademik, degradasi moral, dan hilangnya kepercayaan publik', 'Copy-paste tugas/skripsi tanpa sitasi standar'],
            ['Pelanggaran Hak Cipta', 'Penggunaan, penyebaran, atau pembajakan karya tanpa izin pencipta', 'Kerugian finansial bagi pencipta karya dan pelanggaran hukum', 'Pengunduhan lagu, e-book, atau film bajakan di internet'],
            ['Pelanggaran Privasi', 'Penyebaran data pribadi tanpa persetujuan pemilik data', 'Kebocoran data pribadi, eksploitasi peretasan, dan denda hukum', 'Penyebaran NIK, foto KTP, dan alamat di grup obrolan'],
            ['Ujaran Kebencian & Cyberbullying', 'Komentar bernada provokasi, rasisme, atau perundungan siber', 'Trauma psikologis korban, perpecahan sosial, dan pidana ITE', 'Perundungan di kolom komentar Instagram/TikTok/X']
          ]
        },
        exampleOrCase: {
          title: 'Permasalahan Etika Informasi di Indonesia',
          description: '1. Hoaks & Disinformasi (Kepanikan masyarakat, kerugian materi) - Contoh: Hoaks vaksin & bencana alam.\n2. Plagiarisme (Merusak integritas akademik) - Contoh: Copy-paste tugas/skripsi.\n3. Pelanggaran Hak Cipta (Kerugian ekonomi bagi kreator) - Contoh: Pembajakan e-book, film, dan musik.\n4. Pelanggaran Privasi (Penyalahgunaan data pribadi) - Contoh: Kebocoran data pengguna platform digital.\n5. Ujaran Kebencian (Perpecahan sosial, trauma psikologis) - Contoh: Komentar rasis, SARA, dan cyberbullying di medsos.',
          takeaway: 'Setiap tindakan digital memiliki dampak nyata bagi diri sendiri maupun orang lain.'
        }
      },
      {
        id: 'u1-s2',
        subTitle: '1.2 Generasi Digital Native: Tantangan & Peluang',
        paragraphs: [
          'Generasi muda saat ini adalah bagian dari generasi digital native — generasi yang lahir dan tumbuh bersama teknologi digital. Kalian lebih fasih menggunakan gadget daripada generasi sebelumnya. Namun, fasih secara teknis belum tentu fasih secara etis.',
          'Tantangan Utama Generasi Digital Native:\n1. Information Overload (Informasi Berlebih): Setiap hari kalian terpapar ribuan informasi di lini masa. Mana yang harus dipercaya?\n2. Echo Chamber & Filter Bubble: Algoritma media sosial hanya menampilkan konten yang sesuai dengan minat kalian, membuat kalian sulit melihat sudut pandang lain.\n3. Kecepatan vs Ketepatan: Informasi viral menyebar dalam hitungan menit. Sering kali kita tergoda untuk "share" sebelum memverifikasi.\n4. Identitas Digital vs Identitas Nyata: Kita memiliki dua identitas (di dunia nyata dan di dunia maya). Apakah keduanya sudah sejalan secara etis?',
          'Skenario Etika Penggunaan Informasi Digital (Ketuk Kasus di Bawah untuk Melihat Keputusan):\n• Kasus 1: Mengambil foto estetis dari Pinterest lalu menjadikannya sampul buku jualan komersial tanpa izin pembuat foto -> PELANGGARAN HAK CIPTA! Mengambil keuntungan ekonomi dari karya orang lain tanpa lisensi resmi.\n• Kasus 2: Menggunakan video musik berlisensi Creative Commons (CC BY) di YouTube dengan mencantumkan nama pembuat asli dan link lisensi -> LEGAL & ETIS! Mengikuti ketentuan atribusi karya sesuai lisensi terbuka.\n• Kasus 3: Mengutip 2 kalimat dari rilis resmi portal Kemdikbudristek untuk latar belakang makalah kuliah dengan menyebutkan rujukan -> LEGAL & ETIS! Memenuhi norma integritas akademik dan fair use untuk pendidikan.',
          'Peluang Besar Generasi Digital Native:\n1. Kemampuan mengakses ilmu pengetahuan dari seluruh dunia secara cepat.\n2. Kesempatan untuk belajar hal baru setiap hari dan berkolaborasi secara global.\n3. Potensi menjadi agen perubahan positif dan pelopor literasi digital di masyarakat.'
        ],
        keyTakeaway: 'Kecakapan teknis harus diimbangi dengan kearifan etis agar teknologi menjadi sarana pemberdayaan, bukan penghancur.'
      },
      {
        id: 'u1-s3',
        subTitle: '1.3 Studi Kasus: Ketika Hoaks Bencana Alam Menjadi Viral',
        paragraphs: [
          'Kasus Realitas: Pada tahun 2024, beredar luas di WhatsApp dan Facebook sebuah video yang diklaim sebagai rekaman "gempa bumi dahsyat yang akan terjadi di Jakarta". Video tersebut disertai narasi yang menyesakkan dan ajakan untuk segera mengungsi. Akibatnya, kepanikan melanda warga di beberapa wilayah Jakarta. Banyak yang mengungsi ke tempat yang lebih tinggi, bahkan ada yang sampai meninggalkan pekerjaan.',
          'Fakta Lapangan: Setelah ditelusuri oleh tim cek fakta, video tersebut ternyata adalah rekaman gempa di negara lain yang terjadi beberapa tahun sebelumnya. Tidak ada informasi resmi dari BMKG tentang gempa besar mendadak di Jakarta.',
          'Hasil Survei Generasi Muda: "Saya berharap etika informasi terus dikembangkan dengan materi yang lebih interaktif dan mudah dipahami" (Waw, 20 tahun). "Sulit untuk membedakan antara informasi yang benar dengan hoaks" (Waw, 20 tahun).'
        ],
        keyTakeaway: 'Penyebaran hoaks bencana tidak hanya menimbulkan kecemasan psikologis tetapi juga kelumpuhan aktivitas ekonomi dan publik.',
        exampleOrCase: {
          title: 'Pertanyaan Diskusi Kasus',
          description: '1. Apa yang menyebabkan berita hoaks bencana alam bisa viral dalam hitungan menit?\n2. Apa dampak emosional dan sosial dari penyebaran berita tersebut?\n3. Jika kalian menerima video mengejutkan seperti ini di grup keluarga, langkah awal apa yang harus dilakukan?',
          takeaway: 'Ambil jeda (Stop) dan cek situs resmi BMKG sebelum meneruskan pesan yang memicu ketakutan.'
        },
        caseDiscussion: {
          question: 'Apabila kamu menerima pesan berantai video bencana gempa dahsyat di grup WhatsApp keluarga yang belum jelas kebenarannya, langkah verifikasi etis dan komunikasi apa yang perlu kamu lakukan agar anggota keluarga tidak panik?',
          context: 'Skenario Diskusi Etika Informasi Bencana Alam',
          keyPoints: ['Stop dan tahan tombol share', 'Cek situs resmi BMKG/Kominfo', 'Berikan penjelasan sopan di grup', 'Tampilkan bukti verifikasi resmi'],
          sampleAnswer: 'Langkah pertama adalah STOP dan menahan emosi untuk tidak meneruskan pesan tersebut. Selanjutnya, buka situs resmi BMKG (bmkg.go.id) atau akun resmi @infoBMKG untuk memastikan ada tidaknya rilis darurat resmi. Apabila informasi terbukti hoaks, balasilah pesan di grup keluarga dengan santun beserta tangkapan layar verifikasi resmi BMKG agar paman dan kerabat lainnya tidak diliputi kecemasan semu.'
        }
      }
    ],
    practiceQuiz: [
      {
        id: 'u1-q1',
        question: 'Etika informasi adalah...',
        options: [
          'Aturan tentang cara menggunakan komputer dan perangkat keras',
          'Prinsip moral dalam menciptakan, mengakses, dan menyebarkan informasi',
          'Panduan membuat akun media sosial agar mendapatkan pengikut',
          'Cara memperbanyak konten digital secara otomatis'
        ],
        correctAnswerIndex: 1,
        explanation: 'Etika informasi adalah cabang etika yang membahas nilai-nilai moral dan prinsip-prinsip yang mengatur perilaku manusia dalam mengelola informasi.'
      },
      {
        id: 'u1-q2',
        question: 'Manakah yang termasuk bentuk pelanggaran etika informasi?',
        options: [
          'Mencantumkan sumber rujukan saat mengutip karya tulisan',
          'Memverifikasi berita di portal cek fakta sebelum membagikannya',
          'Menyebarkan hoaks atau berita palsu tanpa melakukan verifikasi',
          'Menggunakan kata sandi yang kuat dan mengaktifkan 2FA'
        ],
        correctAnswerIndex: 2,
        explanation: 'Menyebarkan hoaks tanpa verifikasi melanggar etika informasi karena dapat menyesatkan dan menimbulkan kepanikan publik.'
      },
      {
        id: 'u1-q3',
        question: 'Mengapa generasi digital native sangat rentan terhadap paparan hoaks?',
        options: [
          'Karena mereka tidak bisa menggunakan jaringan internet',
          'Karena arus informasi sangat berlimpah (information overload) dan cepat sehingga sulit diverifikasi',
          'Karena mereka tidak memiliki perangkat gadget pintar',
          'Karena mereka tidak menyukai kegiatan membaca artikel'
        ],
        correctAnswerIndex: 1,
        explanation: 'Information overload dan godaan kecepatan berbagi membuat digital native rentan menyebarkan berita tanpa cek fakta.'
      },
      {
        id: 'u1-q4',
        question: 'Salah satu dampak negatif yang paling nyata dari penyebaran berita hoaks adalah...',
        options: [
          'Meningkatkan pengetahuan dan wawasan masyarakat umum',
          'Mempererat tali persaudaraan dan silaturahmi antarwarga',
          'Menimbulkan kepanikan massa, kecemasan, dan kerugian material',
          'Membantu pemerintah dalam mengambil kebijakan publik'
        ],
        correctAnswerIndex: 2,
        explanation: 'Hoaks sering memicu kepanikan, kekacauan publik, dan kecemasan psikologis.'
      },
      {
        id: 'u1-q5',
        question: 'Apa yang dimaksud dengan fenomena "Filter Bubble" di media sosial?',
        options: [
          'Gelembung sabun yang muncul pada permukaan layar ponsel',
          'Algoritma media sosial yang hanya menampilkan konten sesuai minat pengguna sehingga mempersempit sudut pandang',
          'Fitur khusus untuk menyaring air minum berbasis IoT',
          'Aplikasi editing foto untuk mengubah warna latar belakang'
        ],
        correctAnswerIndex: 1,
        explanation: 'Filter bubble diciptakan oleh algoritma yang mengisolasi pengguna dalam gelembung informasi yang hanya menyetujui pandangannya sendiri.'
      }
    ],
    reflectionPrompt: 'Seberapa sering kamu memeriksa kebenaran informasi sebelum membagikannya ke media sosial atau grup obrolan? Jawab dengan jujur dan tuliskan refleksimu!',
    simulationCases: [
      {
        id: 'u1-sim-1',
        title: 'Simulasi 1: Pesan Berantai Bencana Alam di Grup WhatsApp Keluarga',
        scenarioDescription: 'Di grup WhatsApp keluarga, pamanmu mengirimkan pesan berantai berbunyi: "Peringatan darurat! BMKG memprediksi gempa bumi magnitudo 8.5 akan melanda Jakarta dalam 3 jam ke depan. Harap segera evakuasi keluarga ke luar rumah dan teruskan ke semua orang yang kamu sayangi!". Pesan ini tidak mencantumkan tautan resmi.',
        contextBadge: 'Hoaks & Disinformasi Sektor Publik',
        evidenceItems: [
          'Pesan menggunakan gaya bahasa kepanikan ("Peringatan darurat!", "Teruskan segera!").',
          'BMKG secara konsisten menegaskan bahwa gempa bumi hingga saat ini tidak dapat diprediksi secara tepat jam dan menitnya.',
          'Tidak ada rujukan tautan berita resmi atau siaran pers pemerintah.'
        ],
        options: [
          {
            id: 'opt-1a',
            actionText: 'Segera meneruskan (forward) pesan ke grup teman-teman sekolah dan kampus agar semua orang bersiap-siap.',
            isCorrect: false,
            feedbackTitle: 'Tindakan Keliru! (Memperparah Disinformasi)',
            feedbackDescription: 'Meneruskan pesan panik tanpa verifikasi langsung ke pihak resmi dapat memicu kecemasan publik massal dan kekacauan lalu lintas digital.',
            recommendedSteps: [
              'Selalu terapkan prinsip "Stop" sebelum klik tombol Forward.',
              'Buka situs resmi bmkg.go.id atau kanal berita terverifikasi.',
              'Jangan membagikan prediksi bencana yang tidak bermerek resmi.'
            ]
          },
          {
            id: 'opt-1b',
            actionText: 'Buka situs resmi BMKG (bmkg.go.id) atau X/Twitter @infoBMKG untuk verifikasi. Jika informasi tidak terbukti, tanggapi pesan paman di grup dengan santun disertai bukti tangkapan layar.',
            isCorrect: true,
            feedbackTitle: 'Tindakan Tepat & Bertanggung Jawab! 🎯',
            feedbackDescription: 'Kamu bertindak sebagai pemutus rantai hoaks yang cerdas. Verifikasi di sumber utama dan klarifikasi dengan sopan melindungi anggota keluarga dari kepanikan semu.',
            recommendedSteps: [
              'Langkah 1: Tahan tombol forward (Stop).',
              'Langkah 2: Cek akun resmi BMKG atau portal CekFakta (Investigate).',
              'Langkah 3: Berikan balasan informatif dan santun di grup obrolan (Edukasi).'
            ]
          }
        ]
      },
      {
        id: 'u1-sim-2',
        title: 'Simulasi 2: Tuduhan SARA dan Narasi Provokatif di Instagram',
        scenarioDescription: 'Saat melakukan scrolling Instagram, kamu melihat kiriman Reels dengan judul provokatif: "PARAH! Tokoh A Menghina Suku X!". Video tersebut menampilkan potongan durasi 3 detik saat Tokoh A berbicara. Kolom komentar sudah dipenuhi puluhan ribu ujaran kebencian.',
        contextBadge: 'Echo Chamber & Filter Bubble',
        evidenceItems: [
          'Video dipotong pendek (3 detik) tanpa konteks awal dan akhir pidato.',
          'Judul ditulis dengan huruf kapital provokatif untuk menarik amarah emosional pembaca.'
        ],
        options: [
          {
            id: 'opt-2a',
            actionText: 'Ikut emosi dan menulis komentar kecaman kasar di kiriman tersebut agar terlihat membela kebenaran.',
            isCorrect: false,
            feedbackTitle: 'Tindakan Keliru! (Terjebak Provokasi)',
            feedbackDescription: 'Memberi komentar emosional pada video yang terpotong membuatmu menjadi korban manipulasi disinformasi dan pelanggar netiket.',
            recommendedSteps: [
              'Hindari berkomentar berdasarkan potongan video yang belum jelas.',
              'Cari rekaman video utuh di kanal siaran resmi.',
              'Laporkan kiriman yang mengandung ujaran kebencian SARA.'
            ]
          },
          {
            id: 'opt-2b',
            actionText: 'Cari pidato utuh Tokoh A di YouTube resmi berita untuk melihat konteks kalimat sebenarnya. Jika terbukti video dipotong untuk disinformasi, laporkan kiriman ke platform.',
            isCorrect: true,
            feedbackTitle: 'Tindakan Tepat! (Detektif Berpikir Kritis) 🎯',
            feedbackDescription: 'Kamu berhasil menghindari jebakan filter bubble dan perangkap disinformasi dengan menelusuri konteks asli (Trace claims).',
            recommendedSteps: [
              'Cari video versi penuh (Full Uncut Video).',
              'Perhatikan konteks kalimat utuh pembicara.',
              'Gunakan fitur Report -> Disinformation / Hate Speech di Instagram.'
            ]
          }
        ]
      }
    ],
    checklistItems: [
      'Saya telah memahami pengertian etika informasi dan urgensinya.',
      'Saya dapat mengidentifikasi 5 masalah utama pelanggaran etika informasi di Indonesia.',
      'Saya menyadari tantangan information overload dan filter bubble.',
      'Saya berkomitmen menjadi warga digital yang cerdas, kritis, dan bertanggung jawab.'
    ]
  },
  {
    id: 2,
    unitNumber: 2,
    title: 'Menjadi Detektif Informasi (Verifikasi & Hoaks)',
    subtitle: 'Jenis Informasi Palsu, Ciri-Ciri Hoaks, Metode S.I.F.T., Tools Cek Fakta, dan Deteksi Deepfake AI',
    learningObjectives: [
      'Membedakan misinformasi, disinformasi, dan malinformasi secara tepat.',
      'Mengenali ciri-ciri hoaks dan manipulasi konten visual/AI (deepfake).',
      'Menguasai dan menerapkan metode verifikasi S.I.F.T. (Stop, Investigate, Find, Trace).',
      'Menggunakan platform dan tools cek fakta digital (Mafindo, TurnBackHoax, Kominfo, Reverse Image Search).'
    ],
    summaryPoints: [
      'Membedakan jenis informasi palsu: Misinformasi (salah tanpa niat jahat), Disinformasi (salah dengan sengaja menyesatkan), Malinformasi (fakta benar yang disebar untuk merugikan).',
      'Ciri-ciri utama hoaks: Judul sensasional/provokatif, sumber tidak jelas/anonim, bahasa emosional ("Share sebelum dihapus!"), tidak ada bukti pendukung, dan struktur tulisan buruk.',
      'Metode S.I.F.T. (Michael Caulfield): Stop (Berhenti sejenak), Investigate the Source (Selidiki sumber), Find Better Coverage (Cari liputan lain), Trace Claims to Original Context (Telusuri ke konteks asli).',
      'Manfaatkan platform cek fakta (Mafindo, TurnBackHoax, Kominfo, CekFakta Tempo) serta tools gambar (Google Reverse Image, TinEye, Yandex) dan video (InVID).'
    ],
    video: {
      type: 'gdrive',
      url: 'https://docs.google.com/videos/d/1nwk7Ebr_iX365uBz_qQoWvJZvf4PEPtDcyVV-tkko4g/play?usp=sharing',
      title: 'Video Pengantar Unit 2: Yuk, Jadi Detektif Informasi!',
      duration: 'Verifikasi & Cek Fakta'
    },
    sections: [
      {
        id: 'u2-s1',
        subTitle: '2.1 Mengenal Jenis-Jenis Informasi Palsu & Ciri-Ciri Hoaks',
        paragraphs: [
          'Tidak semua informasi palsu itu sama. Mari kita bedakan tiga jenis utamanya:\n1. Misinformasi: Informasi salah yang disebarkan tanpa niat jahat (contoh: berbagi berita lama yang dianggap masih relevan, tidak sengaja).\n2. Disinformasi: Informasi palsu yang sengaja dibuat dan disebarkan untuk menyesatkan publik (contoh: hoaks politik, propaganda, clickbait, sengaja).\n3. Malinformasi: Informasi berdasarkan fakta benar yang sengaja disebarkan untuk merugikan orang lain (contoh: pembocoran data pribadi, gosip privat, sengaja).',
          'Ancaman terbesar saat ini adalah disinformasi yang diperkuat oleh teknologi AI (Kecerdasan Buatan) seperti Deepfake dan konten buatan AI yang semakin sulit dibedakan dari kenyataan.',
          'Ciri-Ciri Utama Informasi Hoaks:\n1. Judul Sensasional & Provokatif ("Viral!", "Heboh!", "INILAH TANDA KIAMAT!").\n2. Sumber Tidak Jelas ("Menurut seorang pakar..." tanpa menyebut nama/institusi).\n3. Tidak Ada Bukti Pendukung (foto/video buram atau tidak jelas asal-usulnya).\n4. Bahasa Emosional ("Share sebelum dihapus!", memicu amarah/ketakutan).\n5. Tanggal & Waktu Tidak Jelas (informasi lama diungkit kembali seolah baru).\n6. Ejaan & Tata Bahasa Buruk (banyak salah ketik dan kalimat berantakan).'
        ],
        keyTakeaway: 'Mengenali ciri visual dan bahasa hoaks adalah pertahanan pertama sebelum terjebak disinformasi.',
        tableData: {
          title: 'Tabel 2.1: Perbandingan Jenis Informasi Palsu (Misinformasi, Disinformasi, Malinformasi)',
          headers: ['Jenis Informasi', 'Kebenaran Konten', 'Niat / Motif Pengirim', 'Contoh Kasus Digital'],
          rows: [
            ['Misinformasi', 'Salah / Tidak Akurat', 'Tanpa Niat Jahat (Hanya keliru/lupa)', 'Membagikan artikel berita tahun 2018 yang dikira kejadian hari ini'],
            ['Disinformasi', 'Salah / Dibuat-buat', 'Sengaja Menyesatkan & Mencari Keuntungan', 'Membuat video Deepfake AI pidato pejabat atau hoaks politik'],
            ['Malinformasi', 'Fakta Benar', 'Sengaja Disebar untuk Merugikan Orang Lain', 'Membocorkan foto/dokumen medis pribadi seseorang di media sosial']
          ]
        }
      },
      {
        id: 'u2-s2',
        subTitle: '2.2 Metode S.I.F.T. & Ekosistem Alat Cek Fakta Digital',
        paragraphs: [
          'Ilmuwan informasi Michael Caulfield mengembangkan metode S.I.F.T. untuk memverifikasi informasi di internet secara cepat dan sistematis.',
          'Skenario Analisis Cek Fakta & Hoaks (Ketuk Kasus di Bawah untuk Melihat Keputusan):\n• Kasus 1: Pesan berantai WA: "Info A1! Besok terjadi gempa bumi susulan pukul 22.00 WIB, segera kunci rumah dan keluar!" -> HOAKS & DISINFORMASI! Ilmu sains hingga saat ini belum mampu memprediksi waktu gempa secara spesifik. Pesan ini disebar untuk memicu ketakutan massal.\n• Kasus 2: Berita berfoto banjir bandang diklaim terjadi hari ini di Jakarta, ternyata foto lama bencana tahun 2018 -> MISINFORMASI / DISINFORMASI! Penggunaan visual lama tanpa konteks waktu yang benar untuk memancing perhatian publik.\n• Kasus 3: Rilis informasi resmi di situs bmkg.go.id dengan rincian magnitudo, lokasi episentrum, dan pernyataan peneliti seismologi -> INFORMASI VALID & TERPERCAYA! Memenuhi syarat transparansi, keahlian sumber, dan dapat diverifikasi independen.',
          'Alat Cek Fakta yang Bisa Kamu Gunakan:\n1. Platform Cek Fakta Indonesia: Mafindo (mafindo.or.id), TurnBackHoax (turnbackhoax.id), Kominfo Hoax Buster (hoax.kominfo.go.id), CekFakta Tempo (cekfakta.tempo.co).\n2. Tools Verifikasi Gambar: Google Reverse Image Search, TinEye (tineye.com), Yandex Image Search.\n3. Tools Verifikasi Video: InVID Plugin, YouTube Data Viewer, Amnesty International YouTube Dataviewer.\n4. Sumber Data Resmi: BPS, Kemenkes, BMKG, BNPB.'
        ],
        interactiveDiagram: {
          id: 'diagram-sift',
          type: 'process',
          title: 'Diagram Interaktif Alur Verifikasi Metode S.I.F.T.',
          subtitle: 'Klik atau ketuk setiap langkah di bawah untuk melihat panduan tindakan verifikasi lateral',
          imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80',
          imageCaption: 'Visualisasi Praktik Verifikasi Informasi Lateral menggunakan Laptop & Smartphone',
          steps: [
            {
              stepNumber: 1,
              title: 'STOP (Berhenti)',
              badge: 'Langkah 1',
              description: 'Tahan jempol dan emosimu. Hentikan reaksi impulsif sebelum membaca tuntas.',
              details: [
                'Amati reaksi emosional: Apakah judulnya sengaja memicu amarah atau ketakutan?',
                'Tanyakan: "Apakah saya mengenal kredibilitas pembuat informasi ini?"',
                'Hentikan penyebaran otomatis ke grup pertemanan.'
              ],
              color: 'rose'
            },
            {
              stepNumber: 2,
              title: 'INVESTIGATE THE SOURCE',
              badge: 'Langkah 2',
              description: 'Selidiki latar belakang dan rekam jejak penerbit informasi.',
              details: [
                'Buka profil atau halaman "Tentang Kami" dari situs pemuat.',
                'Pastikan media terakreditasi resmi di Dewan Pers.',
                'Waspadai domain berakhiran tidak biasa atau buatan anonim.'
              ],
              color: 'amber'
            },
            {
              stepNumber: 3,
              title: 'FIND BETTER COVERAGE',
              badge: 'Langkah 3',
              description: 'Buka tab baru (lateral reading) dan cari liputan pembanding dari media kredibel.',
              details: [
                'Terapkan teknik Lateral Reading: Buka beberapa jendela peramban sekaligus.',
                'Bandingkan berita di portal kredibel seperti Tempo, Kompas, Antara, atau CekFakta.com.',
                'Perhatikan konsensus fakta dari berbagai lembaga independen.'
              ],
              color: 'emerald'
            },
            {
              stepNumber: 4,
              title: 'TRACE CLAIMS TO ORIGINAL',
              badge: 'Langkah 4',
              description: 'Lacak klaim, foto, atau video kembali ke konteks kejadian yang sebenarnya.',
              details: [
                'Manfaatkan fitur Google Reverse Image Search atau TinEye untuk memverifikasi foto.',
                'Cek apakah potongan video diambil dari peristiwa bertahun-tahun lalu.',
                'Verifikasi rujukan data ke instansi resmi (BPS, BMKG, Kemenkes).'
              ],
              color: 'indigo'
            }
          ]
        },
        conceptCards: [
          {
            letterOrNumber: 'S',
            title: 'Stop (Berhenti Sejenak)',
            badge: 'Langkah 1',
            subtitle: 'Kendalikan Emosi Impulsif',
            description: 'Berhenti sejenak sebelum membaca atau membagikan berita. Tanyakan pada diri sendiri: "Apakah saya tahu topik ini? Apakah emosi saya sedang dipancing?"',
            color: 'rose'
          },
          {
            letterOrNumber: 'I',
            title: 'Investigate the Source',
            badge: 'Langkah 2',
            subtitle: 'Selidiki Kredibilitas Sumber',
            description: 'Cari tahu siapa penulis atau penerbit konten tersebut. Apakah media ini terdaftar resmi di Dewan Pers atau akun anonim pencari panggung?',
            color: 'amber'
          },
          {
            letterOrNumber: 'F',
            title: 'Find Better Coverage',
            badge: 'Langkah 3',
            subtitle: 'Cari Pembanding Kredibel',
            description: 'Buka tab baru dan cari apakah media berita terpercaya lainnya memberitakan hal yang sama. Fokus pada konsensus fakta dari berbagai sumber.',
            color: 'emerald'
          },
          {
            letterOrNumber: 'T',
            title: 'Trace Claims to Original',
            badge: 'Langkah 4',
            subtitle: 'Telusuri Konteks Asli',
            description: 'Lacak foto, video, atau kutipan kembali ke sumber aslinya. Pastikan potongan gambar atau kalimat tidak dipotong di luar konteks sebenarnya.',
            color: 'indigo'
          }
        ],
        keyTakeaway: 'Jangan membaca secara vertikal pada satu situs mencurigakan; bukalah tab baru dan baca secara lateral menggunakan metode SIFT.',
        caseDiscussion: {
          question: 'Jelaskan bagaimana kamu mempraktikkan 4 langkah metode S.I.F.T. (Stop, Investigate, Find, Trace) secara konkrit ketika menemukan kiriman viral di Instagram tentang bahaya suatu produk konsumsi!',
          context: 'Skenario Diskusi Penerapan Metode SIFT',
          keyPoints: ['Stop bereaksi emosional', 'Investigate kredibilitas akun', 'Find better coverage di portal resmi', 'Trace rujukan klaim asal'],
          sampleAnswer: '1. STOP: Berhenti sejenak dan jangan membagikan postingan tersebut. 2. INVESTIGATE: Periksa profil akun pembuat kiriman, apakah lembaga terakreditasi atau sekadar akun clickbait. 3. FIND BETTER COVERAGE: Bukalah tab baru dan cari berita pendukung di BPOM, Kemenkes, atau Mafindo. 4. TRACE: Telusuri asal-usul dokumen ilmiah yang dirujuk. Melalui 4 langkah SIFT ini, kita tidak akan gampang terprovokasi klaim palsu.'
        }
      },
      {
        id: 'u2-s3',
        subTitle: '2.3 Simulasi Detektif & Studi Kasus Deepfake AI Tokoh Publik',
        paragraphs: [
          'Simulasi Posting Viral: "🔥 JANGAN MINUM AIR KEMASAN PLASTIK! WHO telah mengeluarkan peringatan darurat! Semua air kemasan plastik mengandung mikroplastik menyebabkan kanker! Share agar semua tahu!!!" -> Analisis: Tidak menyebutkan nama rujukan resmi, gambar botol menakutkan, tanpa tanggal, penuh tanda seru. Jangan dibagikan! Cek situs resmi WHO.',
          'Studi Kasus Deepfake AI: Seorang tokoh politik tampak dalam video melontarkan pernyataan kontroversial hingga viral. Pakar forensik menemukan ketidakwajaran pada gerakan bibir, kejapan mata, dan artefak piksel digital. Terbukti video dibuat oleh model Deepfake AI.',
          'Hasil Survei Mahasiswa: "Bagaimana cara membedakan informasi hoaks di zaman banyaknya penggunaan AI?" (Yana, 20 tahun). "Tentang bagaimana seseorang memvalidasi informasinya dengan benar sebelum menyebarkannya" (Ifa, 19 tahun).'
        ],
        keyTakeaway: 'Teknologi AI dapat memalsukan suara dan wajah, tetapi kewaspadaan kritis dan verifikasi silang tetap menjadi penawar utamanya.'
      }
    ],
    practiceQuiz: [
      {
        id: 'u2-q1',
        question: 'Manakah yang merupakan ciri-ciri khas berita hoaks?',
        options: [
          'Mencantumkan nama penulis dan lembaga riset kredibel',
          'Menggunakan judul sensasional, provokatif, dan emosional',
          'Dilengkapi dengan data statistik resmi dari BPS',
          'Ditulis oleh jurnalis profesional berlisensi'
        ],
        correctAnswerIndex: 1,
        explanation: 'Hoaks sering menggunakan judul sensasional dan provokatif untuk memicu emosi pembaca agar segera membagikannya.'
      },
      {
        id: 'u2-q2',
        question: 'Metode S.I.F.T. dalam verifikasi informasi digital merupakan singkatan dari...',
        options: [
          'Stop, Investigate the source, Find better coverage, Trace claims to original context',
          'Start, Identify the topic, Format the text, Type the summary',
          'Search, Inspect, Forward, Tag',
          'Share, Inform, Forward, Trust'
        ],
        correctAnswerIndex: 0,
        explanation: 'SIFT dikembangkan Michael Caulfield: Stop, Investigate the source, Find better coverage, Trace claims.'
      },
      {
        id: 'u2-q3',
        question: 'Apa yang dimaksud dengan konten Deepfake?',
        options: [
          'Video dokumenter yang direkam dengan kamera rekaman high-definition',
          'Video atau audio palsu yang direkayasa secara canggih menggunakan teknologi AI',
          'Foto pemandangan alam yang diambil dari jarak jauh',
          'Film animasi 2D untuk konsumsi anak-anak'
        ],
        correctAnswerIndex: 1,
        explanation: 'Deepfake adalah media sintetis buatan AI yang menirukan wajah dan suara seseorang sehingga tampak sangat nyata.'
      },
      {
        id: 'u2-q4',
        question: 'Manakah dari organisasi berikut yang merupakan platform cek fakta independen terdepan di Indonesia?',
        options: [
          'Google News Portal',
          'Wikipedia Bahasa Indonesia',
          'Mafindo (Masyarakat Anti Fitnah Indonesia) / TurnBackHoax.id',
          'YouTube Creator Studio'
        ],
        correctAnswerIndex: 2,
        explanation: 'Mafindo (Masyarakat Anti Fitnah Indonesia) mengelola TurnBackHoax.id untuk memverifikasi rumor dan berita palsu di Indonesia.'
      },
      {
        id: 'u2-q5',
        question: 'Mengapa informasi yang disebarkan di luar konteks aslinya sangat berbahaya?',
        options: [
          'Karena informasinya pasti salah secara total',
          'Karena maknanya bisa berubah drastis dan menyesatkan pemahaman publik',
          'Karena tidak menyertakan gambar pendukung',
          'Karena ukuran kalimatnya terlalu pendek'
        ],
        correctAnswerIndex: 1,
        explanation: 'Memotong konteks asli (out-of-context) dapat memutarkan balik fakta sebenarnya dan menciptakan disinformasi parah.'
      }
    ],
    reflectionPrompt: 'Temukan satu postingan berita yang meragukan di lini masa media sosialmu hari ini. Terapkan metode S.I.F.T. dan tuliskan langkah verifikasi yang kamu lakukan!',
    simulationCases: [
      {
        id: 'u2-sim-1',
        title: 'Simulasi 1: Verifikasi SIFT Berita "Air Minum Kemasan Bahaya Mikroplastik"',
        scenarioDescription: 'Di beranda Facebook, kamu menemukan kiriman bertuliskan: "DARURAT KESEHATAN! WHO resmi melarang minum dari air kemasan botol plastik karena mengandung mikroplastik pemicu kanker instan!". Kiriman tersebut telah dibagikan lebih dari 15.000 kali.',
        contextBadge: 'Metode S.I.F.T. Cek Fakta',
        evidenceItems: [
          'Mengatasnamakan lembaga dunia (WHO) tanpa tautan laporan riset resmi.',
          'Menggunakan klaim ekstrem ("pemicu kanker instan") yang menimbulkan ketakutan massal.'
        ],
        options: [
          {
            id: 'opt-21a',
            actionText: 'Gunakan metode S.I.F.T.: STOP (jangan bagikan), INVESTIGATE (cek siapa pembuat klaim), FIND COVERAGE (buka tab baru dan cari berita di WHO/Kemenkes), TRACE (lacak dokumen rujukan asli).',
            isCorrect: true,
            feedbackTitle: 'Tindakan Tepat! (Metode S.I.F.T. Berhasil) 🎯',
            feedbackDescription: 'Situs resmi WHO menunjukkan penjelasan seimbang tentang riset mikroplastik, dan tidak ada larangan darurat seperti klaim viral. Kamu berhasil mengidentifikasi disinformasi kesehatan.',
            recommendedSteps: [
              'S = Stop sejenak dari tombol share.',
              'I = Investigate kredibilitas akun pembuat kiriman.',
              'F = Find better coverage di portal liputan independen/kemenkes.',
              'T = Trace klaim ke jurnal resmi.'
            ]
          },
          {
            id: 'opt-21b',
            actionText: 'Langsung menyebarkan ke grup pesan instan karena merasa informasi kesehatan sangat darurat.',
            isCorrect: false,
            feedbackTitle: 'Tindakan Keliru! (Mengabaikan Cek Fakta)',
            feedbackDescription: 'Membagikan klaim kesehatan palsu dapat merugikan publik dan menciptakan kepanikan yang tidak berdasar.',
            recommendedSteps: [
              'Selalu verifikasi informasi kesehatan di situs Kemenkes atau WHO.',
              'Gunakan fitur pencarian lateral (buka tab baru).'
            ]
          }
        ]
      },
      {
        id: 'u2-sim-2',
        title: 'Simulasi 2: Menguji Rekaman Video Deepfake AI Pidato Rektor',
        scenarioDescription: 'Beredar video berdurasi 15 detik yang menampilkan sosok Rektor Kampus mengumumkan libur perkuliahan selama 1 bulan dan pengembalian uang UKM 100%. Namun, jika diperhatikan seksama, gerakan bibir Rektor tampak kaku dan kedipan mata tidak alami.',
        contextBadge: 'Deteksi Rekayasa Deepfake AI',
        evidenceItems: [
          'Gerakan bibir dan artikulasi suara kurang sinkron.',
          'Situs resmi kampus dan akun resmi rektorat tidak merilis pengumuman tertulis apapun.'
        ],
        options: [
          {
            id: 'opt-22a',
            actionText: 'Periksa pengumuman resmi di portal kampus (unj.ac.id), gunakan tools verifikasi video InVID, dan laporkan video sintetis buatan AI tersebut.',
            isCorrect: true,
            feedbackTitle: 'Tindakan Tepat! (Deteksi Teknologi AI) 🎯',
            feedbackDescription: 'Kamu berhasil mengenali artefak visual Deepfake AI (gerakan bibir & kejapan mata tak alami) dan memverifikasinya ke kanal resmi.',
            recommendedSteps: [
              'Amati detail fisik: bayangan bibir, ketepatan nada suara, dan tekstur kulit.',
              'Cek kanal komunikasi resmi lembaga/kampus.',
              'Edukasi kawan-kawan bahwa video merupakan hasil generatif AI.'
            ]
          },
          {
            id: 'opt-22b',
            actionText: 'Merayakan pengumuman dan mengunggah kembali video ke TikTok dengan tagar viral.',
            isCorrect: false,
            feedbackTitle: 'Tindakan Keliru!',
            feedbackDescription: 'Menyebarkan video Deepfake tanpa verifikasi dapat menyebabkan sanksi akademik dan pelanggaran etika.',
            recommendedSteps: [
              'Waspada terhadap klaim menggiurkan yang tidak masuk akal.',
              'Cek edaran resmi berbentuk dokumen bersurat tanda tangan digital.'
            ]
          }
        ]
      }
    ],
    checklistItems: [
      'Saya dapat membedakan misinformasi, disinformasi, dan malinformasi.',
      'Saya mengenali ciri-ciri hoaks dan bahasa provokatif.',
      'Saya menguasai dan menerapkan metode S.I.F.T. saat membaca berita.',
      'Saya mengetahui situs cek fakta resmi (Mafindo, TurnBackHoax, Kominfo) dan tools pencari gambar.'
    ]
  },
  {
    id: 3,
    unitNumber: 3,
    title: 'Menjaga Privasi & Keamanan Digital',
    subtitle: 'Klasifikasi Data Pribadi (UU PDP No. 27/2022), Risiko Kebocoran Data, dan 10 Panduan Praktis Keamanan',
    learningObjectives: [
      'Memahami pentingnya pelindungan data pribadi (PDP) dan perbedaan data pribadi spesifik vs umum.',
      'Mengidentifikasi modus kejahatan siber (phishing, malware, social engineering, kebocoran data).',
      'Menerapkan 10 langkah proteksi keamanan siber dasar (kata sandi kuat, 2FA, pembaruan sistem, privasi jaringan).',
      'Mengelola dan meminimalisir risiko jejak digital (digital footprint) pribadi.'
    ],
    summaryPoints: [
      'Data Pribadi menurut UU PDP No. 27 Tahun 2022 dibagi menjadi Data Pribadi Spesifik (kesehatan, biometrik, keuangan, data anak) dan Data Pribadi Umum (nama, alamat, HP, email, tanggal lahir).',
      'Bahaya kebocoran data: Penipuan mengasumsikan korban, pengambilalihan akun (account takeover), pencurian identitas, kerugian finansial, dan gangguan psikologis.',
      'Ancaman siber utama: Phishing (penipuan link/email), Malware (ransomware/spyware), Social Engineering (rekayasa sosial telepon OTP), dan Kebocoran Sisi Layanan.',
      '10 Panduan Praktis Keamanan: Password kuat (12+ karakter), 2FA/Authenticator, Hati-hati link, Privasi medsos, Periksa izin aplikasi, Update OS/antivirus, Jaringan aman (hindari WiFi publik), Backup data, Edukasi diri, Waspada panggilan/pesan.'
    ],
    video: {
      type: 'gdrive',
      url: 'https://docs.google.com/videos/d/1uGQi7fMFVfl6rkRTYKH08xuKzVxrgHQu4Sa20YgxoIY/play?usp=sharing',
      title: 'Video Pengantar Unit 3: Data Pribadimu, Harta Berharga di Dunia Digital',
      duration: 'Keamanan Digital'
    },
    sections: [
      {
        id: 'u3-s1',
        subTitle: '3.1 Data Pribadi: Harta Paling Berharga di Era Digital',
        paragraphs: [
          'Di era digital, data pribadi adalah aset paling berharga. Setiap kali kamu online, kamu meninggalkan jejak digital yang bisa dikumpulkan, dianalisis, dan bahkan disalahgunakan oleh pihak yang tidak bertanggung jawab.',
          'Jenis-Jenis Data Pribadi Menurut UU PDP No. 27 Tahun 2022:\n1. Data Pribadi Spesifik: Data kesehatan, data biometrik (sidik jari, pemindaian wajah), data keuangan (nomor kartu, PIN, OTP), data anak.\n2. Data Pribadi Umum: Nama lengkap, jenis kelamin, kewarganegaraan, agama, nomor telepon, alamat rumah, email, tanggal lahir, riwayat pendidikan.',
          'Dampak Buruk Kebocoran Data:\n1. Penipuan mengatasnamakan dirimu kepada kerabat/teman.\n2. Pengambilalihan (takeover) akun media sosial dan perbankan.\n3. Pencurian identitas untuk pinjaman online ilegal.\n4. Kerugian finansial dan kecemasan psikologis.'
        ],
        keyTakeaway: 'Data pribadi spesifik seperti NIK, nama ibu kandung, dan kode OTP tidak boleh dipublikasikan di platform mana pun.',
        tableData: {
          title: 'Tabel 3.1: Klasifikasi Data Pribadi Berdasarkan UU PDP No. 27 Tahun 2022',
          headers: ['Kategori Data', 'Tingkat Kerahasiaan', 'Elemen Data Spesifik', 'Risiko Jika Bocor / Diretas'],
          rows: [
            ['Data Pribadi Spesifik', 'Sangat Rahasia & Sensitif', 'Data kesehatan, biometrik, keuangan, PIN/OTP, data anak', 'Pencurian saldo rekening, penyalahgunaan identitas pinjol, pemerasan'],
            ['Data Pribadi Umum', 'Rahasia Terbatas', 'Nama lengkap, jenis kelamin, alamat, nomor HP, email', 'Pesan spam, serangan phishing, penipuan mengatasnamakan nama korban']
          ]
        }
      },
      {
        id: 'u3-s2',
        subTitle: '3.2 Memahami Risiko Kebocoran Data & Modus Kejahatan Siber',
        paragraphs: [
          'Memahami berbagai modus ancaman siber adalah langkah utama untuk melindungi kerahasiaan identitas dan aset keuanganmu di dunia maya.',
          'Skenario Privasi & Keamanan Digital (Ketuk Kasus di Bawah untuk Melihat Keputusan):\n• Kasus 1: Mengunggah foto KTP dan sertifikat vaksin dengan NIK terlihat jelas di Instastory -> BERBAHAYA! Potensi kebocoran identitas pribadi yang dapat disalahgunakan untuk pinjaman online ilegal atau penipuan.\n• Kasus 2: Menggunakan jaringan Wifi publik gratis tanpa VPN saat membuka aplikasi Mobile Banking -> BERBAHAYA! Data finansial dan kata sandi dapat disadap melalui teknik Man-in-the-Middle.\n• Kasus 3: Mengaktifkan Otentikasi Dua Faktor (2FA) di WhatsApp & email serta menolak membagikan kode OTP ke siapapun -> AMAN & ETIS! Merupakan tindakan pencegahan proteksi siber standar yang sangat direkomendasikan.'
        ],
        interactiveDiagram: {
          id: 'diagram-cyber-security',
          type: 'comparison',
          title: 'Diagram Interaktif: Perbandingan Pesan Resmi vs Serangan Phishing .APK',
          subtitle: 'Klik atau ketuk poin di bawah untuk membedakan indikator keaslian dan ciri-ciri jebakan siber',
          imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1000&auto=format&fit=crop&q=80',
          imageCaption: 'Perbandingan Visual Indikator Keamanan Akses Digital & Fitur Proteksi Data',
          steps: [
            {
              stepNumber: 1,
              title: 'Waspadai Ekstensi File .APK / Link Palsu',
              badge: 'Ciri Jebakan',
              description: 'Penipu menyamarkan malware sebagai file "Cek Paket .APK" atau "Undangan Pernikahan .APK".',
              details: [
                '🚨 Bahaya File .APK: Menyilangkan izin akses baca SMS sehingga penipu bisa menguras kode OTP perbankanmu.',
                '✅ Tindakan Aman: Hanya unduh aplikasi dari Google Play Store / App Store resmi.'
              ],
              color: 'rose'
            },
            {
              stepNumber: 2,
              title: 'Prinsip Kerahasiaan Kode OTP & PIN',
              badge: 'Kunci Privasi',
              description: 'Kode OTP 6-digit dan PIN Perbankan adalah kunci rahasia utama transaksi digitalmu.',
              details: [
                '🚨 Modus Vishing/Call: Penipu pura-pura panik mengaku CS Bank dan meminta menyebutkan 6 digit OTP.',
                '✅ Aturan Emas: Pegawai Bank / E-Commerce RESMI TIDAK PERNAH meminta OTP / PIN dalam kondisi apapun.'
              ],
              color: 'amber'
            },
            {
              stepNumber: 3,
              title: 'Verifikasi Domain Situs & Akun Terverifikasi',
              badge: 'Cek Domain',
              description: 'Selalu periksa alamat URL (HTTPS + Ikon Gembok) dan badge centang hijau akun resmi.',
              details: [
                '🚨 URL Phishing: Alamat tiruan seperti www.bca-promo-undian.xyz (bukan domain resmi bca.co.id).',
                '✅ Keamanan HTTPS: Pastikan koneksi web dienkripsi dengan HTTPS sebelum memasukkan akun login.'
              ],
              color: 'emerald'
            }
          ]
        },
        conceptCards: [
          {
            letterOrNumber: '1',
            title: 'Phishing (Umpan Palsu)',
            badge: 'Modus 1',
            subtitle: 'Situs & Email Tiruan',
            description: 'Upaya menguras akun pribadi dengan menyamar sebagai lembaga terpercaya (Bank, Kurir, Instansi) melalui link atau situs web tiruan.',
            color: 'rose'
          },
          {
            letterOrNumber: '2',
            title: 'Malware & File .APK',
            badge: 'Modus 2',
            subtitle: 'Virus & Ransomware',
            description: 'Perangkat lunak jahat yang mencuri file atau mengunci perangkat. Sering disamarkan sebagai file undangan pernikahan .APK di WhatsApp.',
            color: 'amber'
          },
          {
            letterOrNumber: '3',
            title: 'Social Engineering',
            badge: 'Modus 3',
            subtitle: 'Manipulasi Psikologis',
            description: 'Rekayasa sosial memanipulasi kepanikan korban via telepon/chat agar menyebutkan kode rahasia OTP atau PIN perbankan.',
            color: 'purple'
          },
          {
            letterOrNumber: '4',
            title: 'Kebocoran Sisi Layanan',
            badge: 'Modus 4',
            subtitle: 'Peretasan Server',
            description: 'Data pribadi pengguna bocor secara massal langsung dari pangkalan data (database) server e-commerce atau aplikasi yang diretas.',
            color: 'indigo'
          }
        ],
        keyTakeaway: 'Kejahatan siber sering kali menyasar kelengah psikologis manusia (human-error) daripada meretas enkripsi komputer.',
        caseDiscussion: {
          question: 'Seorang penipu menelpon temanmu mengaku CS resmi Bank dan meminta kode OTP 6 digit karena klaim akun diretas. Bagaimana tindakan langsung yang akan kamu ambil untuk menyelamatkan akun temanmu?',
          context: 'Skenario Diskusi Penanganan Social Engineering & OTP',
          keyPoints: ['Melarang memberikan OTP', 'Pahami OTP rahasia pribadi', 'Tutup panggilan penipuan', 'Laporkan nomor ke call center bank'],
          sampleAnswer: 'Saya akan langsung melarang keras teman saya untuk menyebutkan atau mengirimkan kode OTP tersebut, karena pihak bank resmi tidak pernah meminta kode OTP. Saya akan menjelaskan bahwa ini adalah modus Social Engineering vishing. Setelah telepon ditutup, saya akan membantu teman saya mengganti kata sandi perbankan dan melaporkan nomor penipu ke saluran resmi.'
        }
      },
      {
        id: 'u3-s3',
        subTitle: '3.3 10 Panduan Praktis Menjaga Privasi & Studi Kasus Phishing Kampus',
        paragraphs: [
          '10 Cara Praktis Melindungi Data Pribadi:\n1. Kata Sandi Kuat (minimal 12 karakter, kombinasi huruf besar/kecil, angka, simbol; contoh: K0mput3r&d4t4#2024!).\n2. Aktifkan Otentikasi Dua Faktor (2FA) menggunakan aplikasi Authenticator (Google Authenticator/Authy).\n3. Berhati-hati dengan Link dan Lampiran (periksa URL sebelum klik).\n4. Atur Privasi Media Sosial (batasi siapa yang bisa melihat data sensitif).\n5. Periksa Izin Aplikasi yang Terpasang (cabut izin yang tidak perlu).\n6. Perbarui Perangkat Lunak Secara Rutin (update OS dan aplikasi).\n7. Gunakan Jaringan Aman (hindari WiFi publik gratis untuk transaksi sensitif).\n8. Backup Data Secara Rutin ke cloud atau penyimpanan eksternal.\n9. Edukasi Diri Sendiri mengenai ancaman siber terbaru.\n10. Waspada terhadap Panggilan dan Pesan Mencurigakan.',
          'Studi Kasus Phishing Kampus: Mahasiswa bernama Nadia menerima email dari "admin@unij.ac.id" (resmi: admin@unj.ac.id) berisi link pembaruan sistem portal. Nadia memasukkan password dan akun emailnya langsung di-takeover peretas untuk mengirimkan spam. Pelajaran: Selalu periksa domain email pengirim dengan teliti!'
        ],
        keyTakeaway: 'Terapkan 10 higiene keamanan digital secara disiplin untuk melindungi identitas dan privasi datamu.'
      }
    ],
    practiceQuiz: [
      {
        id: 'u3-q1',
        question: 'Manakah yang termasuk kategori Data Pribadi Spesifik menurut UU PDP No. 27 Tahun 2022?',
        options: [
          'Nama lengkap sesuai KTP',
          'Data kesehatan dan data biometrik (sidik jari/rekaman wajah)',
          'Alamat domisili rumah',
          'Nomor telepon seluler'
        ],
        correctAnswerIndex: 1,
        explanation: 'Data kesehatan, biometrik, keuangan, dan data anak dikategorikan sebagai Data Pribadi Spesifik yang memerlukan perlindungan ekstra.'
      },
      {
        id: 'u3-q2',
        question: 'Apa yang dimaksud dengan kejahatan Phishing?',
        options: [
          'Olahraga memancing ikan secara virtual di dalam game',
          'Upaya penipuan untuk mendapatkan data pribadi/rahasia dengan menyamar sebagai lembaga terpercaya',
          'Aplikasi khusus untuk mengedit kualitas foto digital',
          'Metode otomatis untuk memperbarui sistem operasi'
        ],
        correctAnswerIndex: 1,
        explanation: 'Phishing adalah teknik manipulasi penipuan untuk mencuri credential/OTP dengan membuat jebakan tautan atau situs palsu.'
      },
      {
        id: 'u3-q3',
        question: 'Manakah dari pilihan berikut yang merupakan contoh pembuatan kata sandi (password) yang kuat?',
        options: [
          '12345678',
          'K0mput3r&d4t4#2024!',
          'namasaya2022',
          'password123'
        ],
        correctAnswerIndex: 1,
        explanation: 'Kata sandi kuat memiliki panjang minimal 12 karakter dan menggabungkan huruf kapital, huruf kecil, angka, serta simbol khusus.'
      },
      {
        id: 'u3-q4',
        question: 'Otentikasi Dua Faktor (2FA) berfungsi untuk...',
        options: [
          'Melakukan proses login dengan dua kata sandi yang sama',
          'Menambahkan lapisan verifikasi keamanan kedua (seperti kode dari aplikasi authenticator) saat login',
          'Memungkinkan dua akun dibuka bersamaan di browser',
          'Mempercepat kecepatan koneksi internet dua kali lipat'
        ],
        correctAnswerIndex: 1,
        explanation: '2FA memastikan akun tetap aman meskipun kata sandi utama bocor, karena memerlukan verifikasi langkah kedua.'
      },
      {
        id: 'u3-q5',
        question: 'Mengapa kita harus sangat berhati-hati saat terhubung dengan jaringan WiFi publik gratis?',
        options: [
          'Karena biaya penggunaan WiFi publik sangat mahal',
          'Karena lalu lintas data pada WiFi publik yang tidak terenkripsi rentan disadap dan diretas oleh orang lain',
          'Karena baterai smartphone akan cepat habis',
          'Karena jaringan WiFi publik selalu lambat'
        ],
        correctAnswerIndex: 1,
        explanation: 'WiFi publik tanpa enkripsi rentan terhadap serangan Man-in-the-Middle (MitM) yang dapat menyadap kata sandi dan data finansial.'
      }
    ],
    reflectionPrompt: 'Periksa pengaturan privasi akun media sosial dan keamanan email utamamu. Berapa banyak dari 10 panduan keamanan digital yang sudah kamu terapkan?',
    simulationCases: [
      {
        id: 'u3-sim-1',
        title: 'Simulasi 1: Menghadapi Pesan Phishing WhatsApp "Undangan Pernikahan .APK"',
        scenarioDescription: 'Kamu menerima pesan WhatsApp dari nomor asing bernama "Panitia Resepsi" mengirimkan file dokumen bernama "Surat_Undangan_Digital.apk" dan meminta kamu membukanya segera.',
        contextBadge: 'Keamanan Cyber & Anti-Phishing',
        evidenceItems: [
          'Pengirim menggunakan nomor seluler pribadi tidak dikenal.',
          'Ekstensi file adalah .APK (Aplikasi Android), bukan dokumen PDF atau image.'
        ],
        options: [
          {
            id: 'opt-31a',
            actionText: 'Jangan mengklik atau mengunduh file .APK tersebut. Blokir nomor pengirim dan laporkan pesan sebagai Spam/Penipuan.',
            isCorrect: true,
            feedbackTitle: 'Tindakan Sangat Tepat! (Mencegah Malware) 🎯',
            feedbackDescription: 'File .APK asing dari pesan penipuan sering kali berisi malware pencuri SMS OTP dan data perbankan (SMS-Stealer). Kamu telah mengamankan HP milikmu.',
            recommendedSteps: [
              'Hindari membuka tautan atau memasang file .APK luar PlayStore.',
              'Hapus pesan dan laporkan nomor ke pihak berwenang (Lapor.go.id/WhatsApp).',
              'Aktifkan Google Play Protect di smartphone.'
            ]
          },
          {
            id: 'opt-31b',
            actionText: 'Mengklik dan mengunduh file karena penasaran siapa teman yang menikah.',
            isCorrect: false,
            feedbackTitle: 'Tindakan Sangat Berbahaya! (Ancaman Kebocoran Data)',
            feedbackDescription: 'Mengunduh file .APK ini akan menginstal virus peretas yang bisa menyadap saldo rekening dan chat WhatsApp secara tersembunyi.',
            recommendedSteps: [
              'Segera putuskan koneksi WiFi/Data jika terlanjur unduh.',
              'Lakukan pemindaian HP dengan Antivirus diperbarui.'
            ]
          }
        ]
      },
      {
        id: 'u3-sim-2',
        title: 'Simulasi 2: Panggilan Telepon Mengaku "Customer Service Bank" Meminta OTP',
        scenarioDescription: 'Seorang penelpon berbicara dengan nada terburu-buru, mengaku dari CS Resmi Bank, dan memberitahukan bahwa ada transaksi mencurigakan senilai Rp 5.000.000 di akunmu. Penelpon meminta kamu menyebutkan 6 digit kode OTP yang baru saja masuk ke SMS-mu.',
        contextBadge: 'Social Engineering & Rekayasa Sosial',
        evidenceItems: [
          'Penelpon menciptakan suasana panik dan mendesak.',
          'Meminta kode OTP rahasia melalui sambungan suara.'
        ],
        options: [
          {
            id: 'opt-32a',
            actionText: 'Segera tutup panggilan telepon! Ingat prinsip dasar: Pihak Bank resmi TIDAK PERNAH meminta kode OTP, PIN, atau Password kepada nasabah.',
            isCorrect: true,
            feedbackTitle: 'Tindakan Tepat! (Perlindungan Financial Data) 🎯',
            feedbackDescription: 'Ini adalah kejahatan Social Engineering vishing (voice phishing). Kamu berhasil menggagalkan peretasan dana rekening perbankanmu.',
            recommendedSteps: [
              'Jaga kerahasiaan OTP seperti kata sandi rahasia.',
              'Hubungi Call Center resmi Bank yang tertera di belakang kartu ATM.',
              'Aktifkan 2FA Authenticator App.'
            ]
          },
          {
            id: 'opt-32b',
            actionText: 'Langsung membacakan kode OTP karena panik uang rekening hilang.',
            isCorrect: false,
            feedbackTitle: 'Tindakan Keliru! (Mengorbankan Keamanan)',
            feedbackDescription: 'Kode OTP adalah kunci akses transaksi. Membagikannya membuat penipu berhasil menguras seluruh tabunganmu.',
            recommendedSteps: [
              'Jangan pernah panik saat menerima panggilan bernada ancaman.',
              'OTP hanya diketik sendiri di aplikasi resmi, tidak dibacakan.'
            ]
          }
        ]
      }
    ],
    checklistItems: [
      'Saya menggunakan kata sandi kuat dan berbeda untuk setiap akun.',
      'Saya telah mengaktifkan 2FA di akun-akun penting.',
      'Saya tidak pernah mengeklik link mencurigakan dari pesan tak dikenal.',
      'Saya tidak membagikan data pribadi sensitif di ruang publik.'
    ]
  },
  {
    id: 4,
    unitNumber: 4,
    title: 'Menghargai Karya Orang Lain (Hak Cipta & Plagiarisme)',
    subtitle: 'Bentuk Plagiarisme, Sitasi Standar APA 7th Edition, Lisensi Creative Commons, dan Etika AI Akademik',
    learningObjectives: [
      'Memahami definisi, 5 bentuk plagiarisme, dan konsekuensi hukum/akademiknya.',
      'Menguasai format penulisan sitasi dan daftar pustaka standar APA 7th Edition.',
      'Mengenali jenis lisensi Creative Commons (CC BY, SA, NC, ND) dan penggunaannya secara legal.',
      'Menerapkan etika penggunaan AI generatif secara transparan dan bertanggung jawab.'
    ],
    summaryPoints: [
      'Plagiarisme adalah tindakan mengambil karya, ide, atau tulisan orang lain dan mengakuinya sebagai karya sendiri.',
      'Bentuk-bentuk Plagiarisme: Plagiarisme Langsung (copy-paste), Plagiarisme Parafrase (ubah kata tanpa sitasi), Plagiarisme Ide, Plagiarisme Sumber, dan Plagiarisme Diri Sendiri (Self-Plagiarism).',
      'Cara Mengutip Benar (APA 7th Edition): In-Text Citation, Parafrase Ilmiah, dan Daftar Pustaka. Manfaatkan tools seperti Mendeley, Zotero, dan Google Scholar.',
      'Hak Cipta melindungi karya kreatif (buku/musik/film 70 tahun setelah pencipta meninggal; program komputer/foto 50 tahun). Lisensi Creative Commons (CC BY, CC BY-SA, CC BY-ND, CC BY-NC, CC0) memfasilitasi berbagi karya secara legal.',
      'Etika Penggunaan AI Akademik: Boleh untuk cari ide/brainstorming, membantu parafrase, periksa tata bahasa; TIDAK boleh untuk menulis seluruh tugas tanpa kontribusi pribadi. Utamakan Transparansi & Verifikasi.'
    ],
    video: {
      type: 'gdrive',
      url: 'https://docs.google.com/videos/d/1vw5QwWFyPqDhi6oOgmexaiVUE5p3vLzGMNyoozX4zos/play?usp=sharing',
      title: 'Video Pengantar Unit 4: Menghargai Karya, Menjunjung Integritas',
      duration: 'Hak Cipta & Sitasi'
    },
    sections: [
      {
        id: 'u4-s1',
        subTitle: '4.1 Apa Itu Plagiarisme & Bentuk-Bentuk Pelanggarannya',
        paragraphs: [
          'Plagiarisme adalah tindakan mengambil karya, ide, atau tulisan orang lain dan mengakuinya sebagai karya sendiri.',
          'Konsekuensi Plagiarisme: Nilai E, skorsing, hingga dikeluarkan dari kampus di bidang akademik; kehilangan pekerjaan dan reputasi hancur di bidang profesional; serta gugatan hukum pelanggaran hak cipta.'
        ],
        conceptCards: [
          {
            letterOrNumber: '1',
            title: 'Plagiarisme Langsung (Direct)',
            badge: 'Bentuk 1',
            subtitle: 'Copy-Paste Tanpa Sitasi',
            description: 'Menyalin kata per kata dari sumber tanpa tanda kutip dan tanpa mencantumkan rujukan asli (contoh: copy-paste langsung dari Wikipedia).',
            color: 'rose'
          },
          {
            letterOrNumber: '2',
            title: 'Plagiarisme Parafrase',
            badge: 'Bentuk 2',
            subtitle: 'Mengubah Kalimat Tanpa Sitasi',
            description: 'Mengubah beberapa sinonom kata tetapi tetap mempertahankan susunan gagasan asli penulis tanpa memberikan kredit rujukan.',
            color: 'amber'
          },
          {
            letterOrNumber: '3',
            title: 'Plagiarisme Ide / Gagasan',
            badge: 'Bentuk 3',
            subtitle: 'Klaim Konsep Orang Lain',
            description: 'Mengambil konsep pemikiran, skema, atau temuan riset orang lain lalu mengklaimnya sebagai ide pemikiran murnimu.',
            color: 'purple'
          },
          {
            letterOrNumber: '4',
            title: 'Plagiarisme Sumber (Fiktif)',
            badge: 'Bentuk 4',
            subtitle: 'Rujukan Palsu',
            description: 'Mencantumkan daftar rujukan fiktif/palsu yang sebenarnya tidak pernah dibaca demi memperbanyak halaman referensi.',
            color: 'blue'
          },
          {
            letterOrNumber: '5',
            title: 'Self-Plagiarism',
            badge: 'Bentuk 5',
            subtitle: 'Daur Ulang Karya Sendiri',
            description: 'Menggunakan kembali karya tulis milik sendiri yang pernah dipublikasikan atau dikumpulkan untuk tugas lain tanpa izin resmi.',
            color: 'teal'
          }
        ],
        keyTakeaway: 'Integritas akademik adalah fondasi kepercayaan intelektual. Jangan pernah mengorbankannya demi kemudahan instan.',
        interactiveDiagram: {
          id: 'diagram-plagiarisme-akademik',
          type: 'process',
          title: 'Diagram Interaktif: 5 Bentuk Utama Plagiarisme Akademik & Panduan Solusinya',
          subtitle: 'Klik atau ketuk tombol bentuk plagiarisme di bawah untuk membuka penjelasan dan langkah pencegahan etisnya',
          imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1000&auto=format&fit=crop&q=80',
          imageCaption: 'Peta Navigasi Integritas Akademik & Panduan Penulisan Bebas Plagiarisme',
          steps: [
            {
              stepNumber: 1,
              title: 'Plagiarisme Langsung (Verbatim)',
              badge: 'Tipe 1',
              description: 'Menyalin kata per kata naskah dari sumber lain tanpa tanda kutip dan atribusi.',
              details: [
                '🚨 Bahaya: Merupakan bentuk kecurangan akademik paling berat.',
                '✅ Solusi Etis: Pakai tanda kutip "..." untuk kutipan pendek (<40 kata) dan cantumkan sitasi APA 7th.'
              ],
              color: 'rose'
            },
            {
              stepNumber: 2,
              title: 'Plagiarisme Parafrase',
              badge: 'Tipe 2',
              description: 'Mengubah beberapa kata tetapi struktur gagasan persis sama tanpa menyebutkan rujukan.',
              details: [
                '🚨 Bahaya: Tetap dikategorikan plagiarisme gagasan walau kata-katanya diganti.',
                '✅ Solusi Etis: Tulis ulang dengan pemahaman mandiri secara utuh dan tetap cantumkan sitasi (Nama, Tahun).'
              ],
              color: 'amber'
            },
            {
              stepNumber: 3,
              title: 'Plagiarisme Gagasan / Konsep',
              badge: 'Tipe 3',
              description: 'Mengambil skema, kerangka pikir, atau temuan riset orang lain lalu mengklaimnya milik pribadi.',
              details: [
                '🚨 Bahaya: Mengabaikan kontribusi intelektual peneliti asli.',
                '✅ Solusi Etis: Berikan apresiasi penuh dengan menyebutkan penemu konsep asli dalam teks.'
              ],
              color: 'purple'
            },
            {
              stepNumber: 4,
              title: 'Self-Plagiarism (Daur Ulang)',
              badge: 'Tipe 4',
              description: 'Mengumpulkan kembali karya milik sendiri yang pernah dipublikasikan tanpa izin/sitasi.',
              details: [
                '🚨 Bahaya: Melanggar kebaruan (novelty) karya ilmiah.',
                '✅ Solusi Etis: Minta izin dosen/penerbit dan sitasi karya terdahulu milik sendiri.'
              ],
              color: 'indigo'
            }
          ]
        },
        tableData: {
          title: 'Tabel 4.1: Perbandingan Hak Moral vs Hak Ekonomi Pencipta Karya Digital',
          headers: ['Jenis Hak Cipta', 'Sifat Perlindungan', 'Cakupan Wewenang Pencipta', 'Apakah Bisa Dialihkan?'],
          rows: [
            ['Hak Moral (Moral Rights)', 'Melekat Abadi pada Pencipta', 'Pencantuman nama pencipta & larangan pengubahan/distorsi karya', 'Tidak dapat dialihkan selama pencipta hidup'],
            ['Hak Ekonomi (Economic Rights)', 'Dapat Berjangka Waktu', 'Mendapatkan imbalan royalti, menjual, menyewakan, atau menglisensikan', 'Dapat dialihkan/dilisensikan melalui perjanjian resmi']
          ]
        }
      },
      {
        id: 'u4-s2',
        subTitle: '4.2 Sitasi Standar APA 7th Edition & Lisensi Creative Commons',
        paragraphs: [
          'Kapan Perlu Mengutip Sumber? Saat mengambil kutipan langsung, memparafrasekan ide orang lain, menggunakan data/statistik riset orang lain, atau mengadaptasi gambar/grafik.',
          'Format Sitasi APA 7th Edition:\n• Kutipan Langsung Pendek: "Menurut Suryono (2021), literasi digital dan etika akademik sangat penting bagi integritas mahasiswa" (hal. 45).\n• Parafrase: Menurut penelitian terbaru, mahasiswa dengan pemahaman literasi informasi tinggi lebih mampu menghindari praktik plagiarisme (Wahid, 2022).\n• Daftar Pustaka Buku: Suryono, B. (2021). Etika Akademik & Hak Cipta Karya Ilmiah. Penerbit Pustaka Pendidikan.\n• Daftar Pustaka Jurnal: Wahid, F. (2022). Literasi Informasi dan Pencegahan Plagiarisme di Perguruan Tinggi. Jurnal Perpustakaan dan Informasi, 14(2), 105-120.\n• Tools Pembantu Sitasi: Mendeley, Zotero, Google Scholar, MyBib.',
          'Hak Cipta & Lisensi Creative Commons (CC):\nHak cipta berlaku hingga 70 tahun setelah pencipta meninggal (buku, musik, film) atau 50 tahun (program komputer, foto). Lisensi CC memfasilitasi penggunaan legal:\n• CC BY: Boleh digunakan dengan mencantumkan nama pencipta.\n• CC BY-SA: Boleh digunakan dengan mencantumkan pencipta & dibagikan dengan lisensi sama.\n• CC BY-ND: Boleh digunakan dengan mencantumkan pencipta tetapi tidak boleh diubah.\n• CC BY-NC: Boleh digunakan untuk non-komersial dengan mencantumkan pencipta.\n• CC0: Bebas digunakan tanpa syarat (Domain Publik).'
        ],
        interactiveDiagram: {
          id: 'diagram-creative-commons',
          type: 'flow',
          title: 'Diagram Interaktif: Hirarki Simbol Lisensi Creative Commons (CC)',
          subtitle: 'Klik atau ketuk simbol lisensi di bawah untuk melihat syarat penggunaan legal dan aturan atribusi karya',
          imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1000&auto=format&fit=crop&q=80',
          imageCaption: 'Glosarium Lisensi Karya Digital Creative Commons & Standar Pengutipan Hak Cipta',
          steps: [
            {
              stepNumber: 1,
              title: 'CC BY (Atribusi Nama)',
              badge: 'Terbebas',
              description: 'Bebas digunakan, diubah, & dikomersialkan, wajib mencantumkan nama pembuat.',
              details: [
                'Atribusi: Cantumkan nama pencipta, judul karya, & link lisensi.',
                'Komersial: Boleh digunakan untuk tujuan komersial/bisnis.',
                'Modifikasi: Boleh disunting dan diubah kembali.'
              ],
              color: 'emerald'
            },
            {
              stepNumber: 2,
              title: 'CC BY-SA (Share-Alike)',
              badge: 'Lisensi Serupa',
              description: 'Karya gubahan wajib dibagikan ulang dengan jenis lisensi yang sama.',
              details: [
                'Atribusi: Wajib cantumkan pembuat asli.',
                'Aturan SA: Hasil editan wajib dilisensikan dengan CC BY-SA pula.'
              ],
              color: 'blue'
            },
            {
              stepNumber: 3,
              title: 'CC BY-NC (Non-Komersial)',
              badge: 'Edukasi / Non-Profit',
              description: 'Hanya boleh dipakai untuk tujuan edukasi & non-profit.',
              details: [
                'Atribusi: Sebutkan identitas pembuat.',
                'Aturan NC: Dilarang keras dipakai untuk jualan/menghasilkan keuntungan.'
              ],
              color: 'amber'
            },
            {
              stepNumber: 4,
              title: 'CC BY-ND (No-Derivatives)',
              badge: 'Utuh Tanpa Edit',
              description: 'Boleh dibagikan utuh, namun tidak boleh diubah/diedit sedikitpun.',
              details: [
                'Atribusi: Cantumkan nama pencipta.',
                'Aturan ND: Dilarang memotong, memanipulasi, atau memotong bentuk karya.'
              ],
              color: 'rose'
            }
          ]
        },
        keyTakeaway: 'Lisensi Creative Commons memudahkan pencipta dan pengguna untuk berbagi karya secara legal dan transparan.',
        tableData: {
          title: 'Tabel 4.2: Panduan Format Sitasi & Daftar Pustaka Standar APA 7th Edition',
          headers: ['Sumber Rujukan', 'Sitasi Dalam Teks (In-text Citation)', 'Format Penulisan Daftar Pustaka (References)'],
          rows: [
            ['Buku Cetak / Digital', '(Suryono, 2021)', 'Suryono, B. (2021). Etika Akademik & Hak Cipta Karya Ilmiah. Penerbit Pustaka Pendidikan.'],
            ['Artikel Jurnal Ilmiah', '(Wahid, 2022)', 'Wahid, F. (2022). Literasi Informasi dan Pencegahan Plagiarisme di Perguruan Tinggi. Jurnal Perpustakaan dan Informasi, 14(2), 105-120.'],
            ['Situs Web / Lembaga Resmi', '(Kemdikbudristek, 2023)', 'Kemdikbudristek. (2023). Panduan Penulisan Karya Ilmiah dan Integritas Akademik. Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. https://kemdikbud.go.id']
          ]
        }
      },
      {
        id: 'u4-s3',
        subTitle: '4.3 Etika AI Akademik, Skenario Interaktif & Studi Kasus Influencer',
        paragraphs: [
          'Kecerdasan Buatan (AI) seperti ChatGPT, Gemini, dan Claude adalah alat bantu populer. Penggunaannya harus etis:\n• Kapan AI BOLEH Digunakan? Mencari ide awal/brainstorming, membantu parafrase kalimat, memeriksa tata bahasa, menjelaskan konsep sulit.\n• Kapan AI TIDAK BOLEH Digunakan? Menulis seluruh tugas tanpa kontribusi pribadi, menggunakan output AI sebagai karya sendiri, mengabaikan kebijakan dosen/kampus.\n• Panduan Etis: Transparansi (sebutkan penggunaan AI), Verifikasi (cek kebenaran informasi AI), Kontribusi Pribadi (pastikan ada gagasan orisinalmu), Patuhi Aturan Kampus.',
          'Skenario Plagiarisme atau Bukan? (Ketuk Kasus di Bawah untuk Melihat Keputusan):\n• Kasus 1: Maya copy-paste 3 paragraf dari buku cetak ke dalam tugas kuliahnya tanpa tanda kutip dan tanpa menyebutkan rujukan -> YA, Plagiarisme Langsung (Verbatim)! Maya mengambil naskah otentik penulis lain secara utuh tanpa atribusi.\n• Kasus 2: Budi memparafrasekan gagasan artikel jurnal ilmiah lalu mengganti beberapa kata tanpa mencantumkan sitasi -> YA, Plagiarisme Parafrase! Walaupun kata-katanya diubah, gagasan pemikiran tersebut tetap milik penulis asli.\n• Kasus 3: Siti menggunakan ChatGPT untuk membantu brainstorming ide judul lalu mengembangkannya secara mandiri dan mencantumkan deklarasi penggunaan AI -> TIDAK Plagiarisme (Praktik Etis & Transparan)! Siti memanfaatkan AI sebagai asisten berpikir awal dan bersikap jujur.',
          'Studi Kasus Influencer Foto: Seorang influencer ber-pengikut jutaan memakai foto estetik milik fotografer kecil tanpa izin untuk konten komersial. Netizen mengecam dan kasusnya dibawa ke ranah hukum. Pelajaran: Selalu minta izin dan cantumkan sumber!'
        ],
        keyTakeaway: 'AI adalah mitra berpikir, bukan pengganti pemikiran kritis orisinalmu.',
        caseDiscussion: {
          question: 'Mengapa menyalin 3 paragraf dari artikel di internet tanpa mencantumkan nama penulis dikategorikan sebagai plagiarisme, dan bagaimana cara menuliskan kembali naskah tersebut agar memenuhi norma ilmiah standar APA 7th Edition?',
          context: 'Skenario Diskusi Integritas Akademik & Anti-Plagiarisme',
          keyPoints: ['Integritas moral akademik', 'Teknik parafrase mandiri', 'Pencantuman sitasi APA 7th', 'Pemeriksaan skor kemiripan'],
          sampleAnswer: 'Tindakan menyalin teks tanpa atribusi melanggar hak moral penulis dan tergolong pencurian gagasan (plagiarisme). Cara memperbaikinya adalah dengan membaca paragraf tersebut, lalu menuliskannya kembali menggunakan susunan kalimat sendiri (parafrase) tanpa mengubah gagasan pokoknya, dan menyertakan sitasi dalam teks seperti (Suryono, 2021) serta mendaftarkannya di Daftar Pustaka.'
        }
      }
    ],
    practiceQuiz: [
      {
        id: 'u4-q1',
        question: 'Plagiarisme didefinisikan sebagai...',
        options: [
          'Tindakan mengutip sumber rujukan dengan format sitasi yang benar',
          'Tindakan mengambil karya, ide, atau tulisan orang lain dan mengakuinya sebagai milik sendiri',
          'Proses menyusun daftar pustaka menggunakan aplikasi manajemen sitasi',
          'Kegiatan membaca dan merangkum buku referensi di perpustakaan'
        ],
        correctAnswerIndex: 1,
        explanation: 'Plagiarisme adalah pengklaiman karya atau ide orang lain sebagai milik pribadi tanpa pengakuan rujukan yang sah.'
      },
      {
        id: 'u4-q2',
        question: 'Manakah dari tindakan berikut yang termasuk ke dalam bentuk plagiarisme?',
        options: [
          'Menulis kalimat parafrase mandiri dengan mencantumkan nama penulis dan tahun',
          'Mengutip kalimat langsung dengan tanda kutip dan mencantumkan halaman sumber',
          'Menyalin kata per kata (copy-paste) teks dari internet ke dalam tugas tanpa tanda kutip dan rujukan',
          'Menyusun daftar pustaka lengkap di akhir makalah'
        ],
        correctAnswerIndex: 2,
        explanation: 'Menyalin teks utuh tanpa tanda kutip dan tanpa menyebutkan sumber dinamakan plagiarisme langsung (verbatim).'
      },
      {
        id: 'u4-q3',
        question: 'Lisensi Creative Commons "CC BY-SA" mengandung arti bahwa karya tersebut...',
        options: [
          'Boleh digunakan tetapi sama sekali tidak boleh diubah atau diedit',
          'Boleh digunakan dengan mencantumkan nama pencipta dan karya turunan harus dibagikan dengan lisensi yang sama',
          'Boleh digunakan secara bebas hanya untuk tujuan komersial',
          'Tidak boleh digunakan atau disebarluaskan sama sekali'
        ],
        correctAnswerIndex: 1,
        explanation: 'CC BY = Attribution (cantumkan pencipta), SA = Share-Alike (lisensi karya turunan harus serupa).'
      },
      {
        id: 'u4-q4',
        question: 'Dalam ranah tugas akademik, kapan teknologi AI (seperti ChatGPT/Gemini) BOLEH digunakan secara etis?',
        options: [
          'Untuk menyuruh AI menulis seluruh isi tugas dari awal hingga akhir tanpa dibaca ulang',
          'Untuk membantu mencari ide awal (brainstorming), mengecek tata bahasa, dan memperkaya sudut pandang riset dengan deklarasi jujur',
          'Untuk menggantikan partisipasi dalam ujian akhir semester',
          'Untuk memalsukan hasil eksperimen laboratorium'
        ],
        correctAnswerIndex: 1,
        explanation: 'AI boleh digunakan sebagai asisten berpikir dan pengedit bahasa, dengan syarat hasil akhir diverifikasi dan dideklarasikan.'
      },
      {
        id: 'u4-q5',
        question: 'Berapa lama jangka waktu perlindungan Hak Cipta berlaku untuk karya cipta berupa buku, film, dan musik?',
        options: [
          '50 tahun sejak karya cipta pertama kali dibuat',
          '25 tahun sejak pendaftaran Hak Cipta',
          '70 tahun setelah penciptanya meninggal dunia',
          'Selamanya tanpa batasan waktu'
        ],
        correctAnswerIndex: 2,
        explanation: 'Untuk karya seni, buku, dan musik, Hak Cipta berlaku selama hidup pencipta ditambah 70 tahun setelah pencipta meninggal.'
      }
    ],
    reflectionPrompt: 'Praktikkan penulisan sitasi gaya APA 7th Edition dari sebuah artikel ilmiah yang kamu baca minggu ini. Apakah kamu sudah terbiasa mengutip sumber dengan jujur?',
    simulationCases: [
      {
        id: 'u4-sim-1',
        title: 'Simulasi 1: Menyusun Tugas Makalah & Penggunaan ChatGPT vs Sitasi APA 7th',
        scenarioDescription: 'Saat menyusun Bab 2 Makalah Etika Informasi, Budi meminta ChatGPT menuliskan 3 paragraf pembahasan. ChatGPT memberikan penjelasan bagus tetapi tidak memberikan rujukan jurnal ilmiah resmi. Apa yang harus Budi lakukan?',
        contextBadge: 'Etika Penulisan & Sitasi APA 7th',
        evidenceItems: [
          'Output AI tidak mencantumkan nama peneliti, tahun, dan nomor halaman rujukan.',
          'Aturan kampus mewajibkan minimal 3 rujukan jurnal bereputasi.'
        ],
        options: [
          {
            id: 'opt-41a',
            actionText: 'Gunakan gagasan AI sebagai pemantik ide awal (brainstorming), lalu cari jurnal pendukung asli di Google Scholar/Perpustakaan, lakukan parafrase mandiri, dan tuliskan sitasi format APA 7th.',
            isCorrect: true,
            feedbackTitle: 'Tindakan Tepat & Etis! (Integritas Akademik) 🎯',
            feedbackDescription: 'Kamu menerapkan AI secara etis sebagai asisten berpikir, sembari menjaga keaslian rujukan ilmiah dan menghindari plagiarisme.',
            recommendedSteps: [
              'Cari artikel jurnal terkait di Google Scholar/Perpustakaan.',
              'Tulis sitasi in-text contoh: (Sanjaya, 2026).',
              'Cantumkan deklarasi penggunaan AI jika diwajibkan dosen.'
            ]
          },
          {
            id: 'opt-41b',
            actionText: 'Langsung menyalin mentah-mentah 3 paragraf dari ChatGPT ke makalah tanpa mengedit dan tanpa rujukan.',
            isCorrect: false,
            feedbackTitle: 'Tindakan Keliru! (Plagiarisme AI)',
            feedbackDescription: 'Menyalin teks AI secara langsung dianggap pelanggaran plagiarisme karya sintetis dan dapat memicu kegagalan kelulusan tugas.',
            recommendedSteps: [
              'Selalu verifikasi klaim AI sebelum dimasukkan ke tulisan.',
              'Gunakan tools manajemen sitasi seperti Mendeley/Zotero.'
            ]
          }
        ]
      },
      {
        id: 'u4-sim-2',
        title: 'Simulasi 2: Penggunaan Foto Ilustrasi Bertanda Lisensi Creative Commons "CC BY-NC"',
        scenarioDescription: 'Siti sedang membuat brosur materi edukasi untuk kegiatan pengabdian masyarakat yang dijual secara berbayar. Siti menemukan foto menarik di Flickr dengan simbol lisensi Creative Commons "CC BY-NC". Bolehkan Siti menggunakannya?',
        contextBadge: 'Lisensi Karya Cipta Creative Commons',
        evidenceItems: [
          'Lisensi tercantum: CC BY-NC (Attribution - Non Commercial).',
          'Tujuan penggunaan: Kegiatan berbayar / komersial.'
        ],
        options: [
          {
            id: 'opt-42a',
            actionText: 'Tidak boleh langsung digunakan untuk kegiatan berbayar, karena lisensi NC (Non-Commercial) melarang penggunaan komersial. Siti harus mencari foto berlisensi CC0/Domain Publik atau meminta izin langsung ke pencipta.',
            isCorrect: true,
            feedbackTitle: 'Tindakan Tepat! (Memahami Lisensi CC) 🎯',
            feedbackDescription: 'Kamu memahami batas hukum lisensi Creative Commons. Kode NC melarang monetisasi karya tanpa izin tertulis khusus.',
            recommendedSteps: [
              'Pahami arti lisensi: BY (Atribusi), NC (Non-Komersial), SA (Share-Alike), ND (No-Derivatives).',
              'Gunakan bank gambar gratis lisensi CC0 seperti Unsplash atau Pixabay.'
            ]
          },
          {
            id: 'opt-42b',
            actionText: 'Tetap menggunakan foto tersebut dan menghapus watermark-nya.',
            isCorrect: false,
            feedbackTitle: 'Tindakan Keliru! (Pelanggaran Hak Cipta)',
            feedbackDescription: 'Menghapus tanda cipta dan melanggar klausal Non-Komersial merupakan bentuk komersialisasi ilegal yang melanggar UU Hak Cipta.',
            recommendedSteps: [
              'Hormati hak moral dan ekonomi para pencipta karya digital.'
            ]
          }
        ]
      }
    ],
    checklistItems: [
      'Saya memahami 5 bentuk plagiarisme dan dampaknya.',
      'Saya menguasai teknik pengutipan dan pembuatan daftar pustaka APA 7th Edition.',
      'Saya mengenali arti simbol lisensi Creative Commons (CC BY, SA, NC, ND).',
      'Saya menggunakan AI secara etis dengan transparansi dan verifikasi mandiri.'
    ]
  },
  {
    id: 5,
    unitNumber: 5,
    title: 'Bijak Bersosial Media (Etika Berkomentar & Berbagi)',
    subtitle: 'Netiket Berkomentar, Penanganan Cyberbullying, Prinsip 5P "Saring Sebelum Sharing" & Game Interaktif',
    learningObjectives: [
      'Memahami 5 aturan emas netiket berkomentar di media sosial.',
      'Mengidentifikasi bentuk-bentuk cyberbullying dan langkah perlindungan diri/penanganannya.',
      'Menerapkan Prinsip 5P (Pahami, Periksa, Perhatikan, Pertimbangkan, Putuskan) sebelum membagikan informasi.',
      'Membangun budaya empati digital dan komitmen saring sebelum sharing.'
    ],
    summaryPoints: [
      'Etika Berkomentar di Media Sosial: Bersikap sopan dan santun, Pikirkan dampak bagi orang lain, Verifikasi fakta sebelum berkomentar, Hargai perbedaan pendapat, dan Jangan menjadi Troll/Buzzer.',
      'Cyberbullying adalah tindakan intimidasi, pelecehan, atau perundungan melalui media digital.',
      'Bentuk Cyberbullying: Penghinaan, Pelecehan, Pengucilan, Doxing (sebar data pribadi), Impersonasi (buat akun palsu), dan Cyberstalking.',
      'Langkah Menghadapi Cyberbullying: Jangan balas, Simpan bukti (screenshot), Blokir & Laporkan akun pelaku, Ceritakan pada orang dewasa/konselor, Jaga kesehatan mental.',
      'Prinsip 5P Sebelum Sharing: Pahami isi, Periksa kebenaran, Perhatikan dampak, Pertimbangkan motif, dan Putuskan secara bijak. Saring sebelum sharing!'
    ],
    video: {
      type: 'gdrive',
      url: 'https://docs.google.com/videos/d/1t58qBjIt_63EZB4c-v70G8ojDUChNILn8sApQIXddMo/play?usp=sharing',
      title: 'Video Pengantar Unit 5: Bijak Bersosial Media di Ruang Publik Digital',
      duration: 'Etika Bersosial Media'
    },
    sections: [
      {
        id: 'u5-s1',
        subTitle: '5.1 Etika Berkomentar di Ruang Publik Media Sosial',
        paragraphs: [
          'Media sosial adalah ruang publik di mana kita bisa berinteraksi dengan banyak orang dari berbagai latar belakang. Namun, kebebasan berpendapat harus selalu diimbangi dengan tanggung jawab moral.',
          'Suara Responden Survei: "Etika berkomentar di media sosial penting karena masyarakat Indonesia masih sering berkomentar dengan bahasa kasar" (Nazwa, 20 tahun). "Etika dalam memberikan pendapat di media sosial" (Mel, 22 tahun).'
        ],
        conceptCards: [
          {
            letterOrNumber: '1',
            title: 'Bersikap Sopan & Santun',
            badge: 'Aturan 1',
            subtitle: 'Bahasa Positif',
            description: 'Gunakan bahasa yang baik, hindari kata-kata kasar/makian, dan sampaikan kritik yang konstruktif dan membangun.',
            color: 'blue'
          },
          {
            letterOrNumber: '2',
            title: 'Pikirkan Dampak Lengkap',
            badge: 'Aturan 2',
            subtitle: 'Empati Komunikasi',
            description: 'Komentarmu bisa dibaca ribuan orang. Pertimbangkan perasaan orang lain dan jangan tulis sesuatu yang kamu sendiri tidak ingin menerimanya.',
            color: 'purple'
          },
          {
            letterOrNumber: '3',
            title: 'Verifikasi Sebelum Berkomentar',
            badge: 'Aturan 3',
            subtitle: 'Berdasarkan Fakta',
            description: 'Jangan pernah berkomentar berdasarkan asumsi, gosip, atau rumor liar. Cek kebenaran fakta terlebih dahulu.',
            color: 'emerald'
          },
          {
            letterOrNumber: '4',
            title: 'Hargai Perbedaan Pendapat',
            badge: 'Aturan 4',
            subtitle: 'Debat Sehat',
            description: 'Berbeda pendapat adalah hal yang wajar. Sampaikan argumen logis berbasis data tanpa menyerang pribadi orang lain (ad hominem).',
            color: 'amber'
          },
          {
            letterOrNumber: '5',
            title: 'Jangan Jadi Troll atau Buzzer',
            badge: 'Aturan 5',
            subtitle: 'Tolak Provokasi',
            description: 'Jangan sengaja memprovokasi, menyebarkan ujaran kebencian, atau ikut-ikutan menjadi buzzer bayaran yang merusak suasana publik.',
            color: 'rose'
          }
        ],
        keyTakeaway: 'Sebelum mengetik, pikirkan. Sebelum mengirim, periksa. Kata-katamu adalah cerminan kepribadianmu.',
        tableData: {
          title: 'Tabel 5.1: Penerapan Netiket Berdasarkan Platform Komunikasi Digital',
          headers: ['Platform Digital', 'Prinsip Netiket Utama', 'Perilaku Dihindari (Don’ts)', 'Perilaku Dianjurkan (Do’s)'],
          rows: [
            ['Grup Obrolan (WA/Telegram)', 'Efisiensi & Penghormatan Waktu', 'Spam pesan berantai tak jelas, mengirim pesan jam istirahat malam', 'Gunakan bahasa santun, konfirmasi berita sebelum share, perkenalkan diri'],
            ['Surat Elektronik (Email Resmi)', 'Formalitas & Klaritas Struktural', 'Subjek kosong, bahasa gaul berlebihan, mengunggah lampiran raksasa', 'Subjek jelas, salam pembuka formal, bahasa lugas, dan penutup sopan'],
            ['Media Sosial (IG/TikTok/X)', 'Kesadaran Ruang Publik', 'Ujaran kebencian, komentar body shaming, flaming war di kolom komentar', 'Kritik konstruktif, hargai perbedaan pendapat, dan sampaikan apresiasi']
          ]
        }
      },
      {
        id: 'u5-s2',
        subTitle: '5.2 Cyberbullying: Bahaya di Balik Layar & Langkah Menghadapinya',
        paragraphs: [
          'Cyberbullying adalah tindakan intimidasi, pelecehan, atau perundungan yang dilakukan melalui media digital.',
          'Bentuk-Bentuk Cyberbullying:\n1. Penghinaan: Mengejek, merendahkan, menyematkan julukan buruk.\n2. Pelecehan: Mengirim pesan mengancam atau menggoda secara seksual.\n3. Pengucilan: Mengeluarkan seseorang dari grup obrolan secara tidak adil.\n4. Doxing: Menyebarkan data pribadi orang lain secara ilegal untuk dipermalukan.\n5. Impersonasi: Membuat akun palsu berpura-pura menjadi korban untuk menyerang reputasinya.\n6. Cyberstalking: Mengikuti dan mengintimidasi aktivitas online korban secara berulang.',
          'Dampak Cyberbullying: Depresi, kecemasan berlebih, penurunan prestasi akademik, isolasi sosial, hingga risiko kesehatan mental parah.',
          'Apa yang Harus Dilakukan Jika Mengalami Cyberbullying?\n1. Jangan Balas: Merespons hanya akan memicu pelaku semakin memprovokasi.\n2. Simpan Bukti: Tangkap layar (screenshot) komentar, pesan, atau bukti akun.\n3. Blokir dan Laporkan: Gunakan fitur blokir dan lapor (report) di platform.\n4. Ceritakan Pada Orang Dewasa: Bicarakan dengan orang tua, guru, atau konselor.\n5. Jaga Kesehatan Mental: Istirahat dari media sosial dan fokus pada hal positif.'
        ],
        keyTakeaway: 'Jangan pernah berdiam diri saat melihat cyberbullying. Jadilah pembela (upstander) dengan melaporkan konten perundungan.',
        caseDiscussion: {
          question: 'Ketika diskusi kelompok di WhatsApp kelas memanas dan seorang anggota mulai melakukan perundungan siber (flaming/cyberbullying) kepada anggota lain, tindakan netiket apa yang paling bijak untuk meredam konflik tersebut?',
          context: 'Skenario Diskusi Etika Komunikasi & Netiket',
          keyPoints: ['Tidak membalas emosi di grup publik', 'Bicara pribadi secara empati (DM)', 'Fokuskan kembali ke agenda tugas', 'Laporkan ke dosen jika berlanjut'],
          sampleAnswer: 'Saya tidak akan terpancing membalas dengan kata-kata emosional di grup publik agar suasana tidak kian memburuk. Saya akan menghubungi teman yang terpancing emosi melalui pesan pribadi (DM) untuk menanyakan kendalanya secara empati. Setelah emosi mereda, saya akan mengajak seluruh anggota kelompok kembali fokus pada diskusi rasional mengenai pembagian tugas.'
        }
      },
      {
        id: 'u5-s3',
        subTitle: '5.3 Saring Sebelum Sharing: Prinsip 5P & Game Filter vs Share',
        paragraphs: [
          'Sebelum membagikan informasi apapun di internet, selalu terapkan Prinsip 5P untuk menjaga ruang digital tetap aman dan bermanfaat.',
          'Game Interaktif: Filter atau Share?\n• Skenario 1: Pesan grup tentang "penemuan obat ajaib COVID-19" dari sumber tak jelas -> FILTER! Informasi dari sumber tak jelas berpotensi hoaks.\n• Skenario 2: Postingan status teman yang mengindikasikan depresi dan dicemooh netizen -> FILTER! Hubungi dia secara pribadi dan beri dukungan.\n• Skenario 3: Artikel dari media resmi terverifikasi tentang kebijakan terbaru BBM -> SHARE! Informasi akurat boleh dibagikan untuk edukasi publik.',
          'Studi Kasus Ujaran Kebencian: Akun B memberikan komentar rasis pada postingan Selebriti A. Komentar menjadi viral, netizen mengecam akun B, dan pelaku akhirnya dilaporkan ke pihak berwajib mendapatkan sanksi sosial serta hukum.'
        ],
        interactiveDiagram: {
          id: 'diagram-5p-filter',
          type: 'infographic',
          title: 'Diagram Interaktif: Corong Penyaringan Informasi Prinsip 5P',
          subtitle: 'Klik atau ketuk setiap tingkatan corong filter di bawah untuk memahami prinsip "Saring Sebelum Sharing"',
          imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1000&auto=format&fit=crop&q=80',
          imageCaption: 'Corong Filter Digital 5P: Pahami, Periksa, Perhatikan, Pertimbangkan, dan Putuskan',
          steps: [
            {
              stepNumber: 1,
              title: 'PAHAMI (P1)',
              badge: 'Filter 1',
              description: 'Pahami konteks secara menyeluruh, jangan cuma baca judul berita clickbait.',
              details: [
                'Baca isi berita dari kalimat pertama hingga akhir.',
                'Perhatikan tanggal publikasi (apakah isu lama yang diposting ulang?).',
                'Pastikan konteks cerita tidak terpotong.'
              ],
              color: 'indigo'
            },
            {
              stepNumber: 2,
              title: 'PERIKSA (P2)',
              badge: 'Filter 2',
              description: 'Verifikasi kebenaran klaim di portal cek fakta atau media terakreditasi.',
              details: [
                'Periksa di platform Mafindo, TurnBackHoax, atau Kominfo.',
                'Cari rujukan data resmi dari kementerian terkait.',
                'Pastikan bukan desas-desus tanpa fakta pendukung.'
              ],
              color: 'emerald'
            },
            {
              stepNumber: 3,
              title: 'PERHATIKAN (P3)',
              badge: 'Filter 3',
              description: 'Analisis dampak psikologis dan sosial jika informasi ini disebarluaskan.',
              details: [
                'Apakah postingan ini memicu ujaran kebencian?',
                'Apakah merusak nama baik seseorang tanpa pembuktian hukum?',
                'Apakah menciptakan ketakutan atau kepanikan tidak berdasar?'
              ],
              color: 'amber'
            },
            {
              stepNumber: 4,
              title: 'PERTIMBANGKAN (P4)',
              badge: 'Filter 4',
              description: 'Pertimbangkan motif di balik pesan dan siapa yang diuntungkan.',
              details: [
                'Apakah pesan ini bermotif komersial/clickbait pencari penonton?',
                'Apakah bertujuan memecah belah kerukunan masyarakat?',
                'Apa keuntungan yang didapat pihak pembuat isu?'
              ],
              color: 'purple'
            },
            {
              stepNumber: 5,
              title: 'PUTUSKAN (P5)',
              badge: 'Keputusan',
              description: 'Ambil keputusan bijak: Loloskan untuk dibagikan (SHARE) atau FILTER (Hentikan).',
              details: [
                'SHARE (Bagikan): Hanya jika konten terverifikasi akurat, mendidik, dan bermanfaat.',
                'FILTER (Hentikan): Jika berpotensi hoaks, ujaran kebencian, atau merugikan orang lain.'
              ],
              color: 'teal'
            }
          ]
        },
        conceptCards: [
          {
            letterOrNumber: 'P1',
            title: 'Pahami',
            badge: 'Prinsip 1',
            subtitle: 'Pahami Isi & Konteks',
            description: 'Pahami benar isi dan konteks informasi secara menyeluruh. Jangan pernah membagikan hanya karena membaca judul yang menghebohkan.',
            color: 'indigo'
          },
          {
            letterOrNumber: 'P2',
            title: 'Periksa',
            badge: 'Prinsip 2',
            subtitle: 'Verifikasi Kebenaran',
            description: 'Periksa kebenaran informasi dari portal resmi (Mafindo, Kominfo, atau situs berita terakreditasi) sebelum menekan tombol bagikan.',
            color: 'emerald'
          },
          {
            letterOrNumber: 'P3',
            title: 'Perhatikan',
            badge: 'Prinsip 3',
            subtitle: 'Analisis Dampak',
            description: 'Perhatikan dampak yang akan ditimbulkan jika informasi ini disebarkan. Apakah mendidik dan membantu, atau memicu kepanikan massal?',
            color: 'amber'
          },
          {
            letterOrNumber: 'P4',
            title: 'Pertimbangkan',
            badge: 'Prinsip 4',
            subtitle: 'Pertimbangkan Motif Usaha',
            description: 'Pertimbangkan motif di balik informasi tersebut. Siapa pembuatnya dan siapa yang diuntungkan jika isu ini menjadi viral?',
            color: 'purple'
          },
          {
            letterOrNumber: 'P5',
            title: 'Putuskan',
            badge: 'Prinsip 5',
            subtitle: 'Ambil Keputusan Bijak',
            description: 'Putuskan secara bijak: Apakah konten ini benar-benar membawa kemanfaatan, atau sebaiknya dihentikan di perangkatmu saja?',
            color: 'teal'
          }
        ],
        keyTakeaway: 'Prinsip 5P memastikan setiap konten yang kita bagikan membawa nilai kemanfaatan, bukan permusuhan.'
      }
    ],
    practiceQuiz: [
      {
        id: 'u5-q1',
        question: 'Etika berkomentar di media sosial yang benar dan bertanggung jawab adalah...',
        options: [
          'Menghina dan mengejek pengguna yang berbeda pendapat',
          'Menggunakan bahasa yang sopan, santun, dan menyampaikan kritik secara membangun',
          'Menyebarkan gosip pribadi tentang teman di kolom komentar',
          'Mengomentari semua postingan orang asing dengan kata-kata provokatif'
        ],
        correctAnswerIndex: 1,
        explanation: 'Netiket berkomentar menuntut kesantunan bahasa, penghormatan pada orang lain, dan argumen berbasis fakta.'
      },
      {
        id: 'u5-q2',
        question: 'Cyberbullying didefinisikan sebagai...',
        options: [
          'Tindakan perundungan fisik yang terjadi di lingkungan sekolah',
          'Tindakan intimidasi, pelecehan, atau perundungan yang dilakukan melalui media digital',
          'Aktivitas olahraga ketangkasan secara daring di jaringan internet',
          'Aplikasi khusus untuk bermain game multiplayer'
        ],
        correctAnswerIndex: 1,
        explanation: 'Cyberbullying adalah segala bentuk perundungan, pelecehan, atau intimidasi yang menggunakan perantara teknologi digital.'
      },
      {
        id: 'u5-q3',
        question: 'Tindakan menyebarkan data pribadi orang lain (seperti nomor HP atau alamat) di media sosial secara ilegal untuk memicu penyerangan netizen disebut...',
        options: [
          'Giving Like',
          'Doxing (Doxxing)',
          'Archiving',
          'Tagging'
        ],
        correctAnswerIndex: 1,
        explanation: 'Doxing adalah tindakan mempublikasikan data pribadi/rahasia seseorang secara ilegal dengan niat jahat.'
      },
      {
        id: 'u5-q4',
        question: 'Urutan 5 langkah dalam Prinsip 5P sebelum membagikan (sharing) informasi adalah...',
        options: [
          'Pahami, Periksa, Perhatikan, Pertimbangkan, Putuskan',
          'Percaya, Pasti, Paham, Perbaiki, Pilih',
          'Puji, Pamer, Pilih, Pakai, Pulang',
          'Pikir, Pasti, Pilih, Pakai, Puas'
        ],
        correctAnswerIndex: 0,
        explanation: 'Prinsip 5P: Pahami isi, Periksa kebenaran, Perhatikan dampak, Pertimbangkan motif, Putuskan dengan bijak.'
      },
      {
        id: 'u5-q5',
        question: 'Jika kamu menyaksikan atau mengalami tindakan cyberbullying di media sosial, langkah tepat yang harus diambil adalah...',
        options: [
          'Ikut-ikutan membully korban di kolom komentar',
          'Mendukung pelaku perundungan agar disukai netizen',
          'Jangan membalas, simpan bukti screenshot, blokir dan laporkan pelaku, serta minta bantuan orang dewasa/pihak berwenang',
          'Membiarkan dan tidak peduli sama sekali'
        ],
        correctAnswerIndex: 2,
        explanation: 'Menyimpan bukti dan melaporkan pelaku adalah tindakan proaktif untuk menghentikan rantai perundungan siber.'
      }
    ],
    reflectionPrompt: 'Pernahkah kamu berada dalam situasi emosional saat ingin membalas komentar kasar di internet? Bagaimana Prinsip 5P dapat membantumu menahan diri?',
    simulationCases: [
      {
        id: 'u5-sim-1',
        title: 'Simulasi 1: Menghadapi Postingan "Ujaran Kebencian & SARA" di Kolom Komentar',
        scenarioDescription: 'Di sebuah postingan berita populer, seseorang menulis komentar berisi ujaran kebencian, makian kasar berbau SARA, dan mengompori netizen lain untuk menyerang individu tertentu.',
        contextBadge: 'Netiket Berkomentar & Anti-Hate Speech',
        evidenceItems: [
          'Komentar berisi ujaran kebencian dan provokasi SARA.',
          'Pelaku memicu amarah dan trolling publik.'
        ],
        options: [
          {
            id: 'opt-51a',
            actionText: 'Terapkan Netiket: Jangan ikut-ikutan berkomentar kasar atau membalas trolling. Gunakan fitur "Report / Laporkan Konten Ujaran Kebencian" pada platform media sosial.',
            isCorrect: true,
            feedbackTitle: 'Tindakan Tepat! (Etika Berkomentar Digital) 🎯',
            feedbackDescription: 'Merespons trolling hanya akan menaikkan algoritma keterlibatan komentar kasar tersebut. Melaporkan konten secara kolektif akan memicu penindakan otomatis platform.',
            recommendedSteps: [
              'Tahan emosi saat membaca komentar provokatif.',
              'Klik opsi Laporkan (Report -> Ujaran Kebencian/Hate Speech).',
              'Edukasi lingkungan agar mengutamakan argumentasi santun.'
            ]
          },
          {
            id: 'opt-51b',
            actionText: 'Membalas komentar dengan makian yang tak kalah kasar agar pelaku merasa jera.',
            isCorrect: false,
            feedbackTitle: 'Tindakan Keliru! (Memperkeruh Konflik)',
            feedbackDescription: 'Membalas makian hanya akan menciptakan rantai kebencian baru dan berisiko membuat akun milikmu terkena sanksi pemblokiran platform.',
            recommendedSteps: [
              'Jangan biarkan emosi menguasai jempolmu saat mengetik.'
            ]
          }
        ]
      },
      {
        id: 'u5-sim-2',
        title: 'Simulasi 2: Penerapan Prinsip 5P "Saring Sebelum Sharing" pada Berita Duka Cita',
        scenarioDescription: 'Sebuah pesan berantai mengabarkan tokoh ternama telah meninggal dunia secara mendadak. Berita tersebut disertai foto kondisi yang memperihatinkan dan ajakan menyebarkan segera ke seluruh grup.',
        contextBadge: 'Prinsip 5P Saring Sebelum Sharing',
        evidenceItems: [
          'Informasi belum dikonfirmasi oleh keluarga atau pers resmi.',
          'Berita mengandung foto sensitif dan elemen provokasi simpati instan.'
        ],
        options: [
          {
            id: 'opt-52a',
            actionText: 'Terapkan Prinsip 5P: Pahami (baca cermat), Periksa (cek media berita nasional), Perhatikan (efek ke keluarga korban), Pertimbangkan (motif sebar), dan Putuskan untuk TIDAK membagikannya sebelum ada kepastian resmi.',
            isCorrect: true,
            feedbackTitle: 'Tindakan Sangat Tepat! (Prinsip 5P Berhasil) 🎯',
            feedbackDescription: 'Seringkali kabar duka tokoh terkenal adalah hoaks atau disinformasi yang merugikan nama baik dan ketenangan keluarga.',
            recommendedSteps: [
              'P = Pahami isi kabar.',
              'P = Periksa situs berita kredibel.',
              'P = Perhatikan empati keluarga.',
              'P = Pertimbangkan manfaat.',
              'P = Putuskan secara bijak (Saring sebelum Sharing).'
            ]
          },
          {
            id: 'opt-52b',
            actionText: 'Langsung membagikan ke 10 grup WhatsApp agar menjadi orang pertama yang mengabarkan.',
            isCorrect: false,
            feedbackTitle: 'Tindakan Keliru! (Penyebar Disinformasi)',
            feedbackDescription: 'Menyebarkan kabar burung atau berita duka palsu dapat menimbulkan kecemasan berat dan luka emosional bagi pihak keluarga.',
            recommendedSteps: [
              'Utamakan verifikasi daripada keinginan menjadi yang tercepat.'
            ]
          }
        ]
      }
    ],
    checklistItems: [
      'Saya menerapkan kesantunan dan netiket saat berkomentar di media sosial.',
      'Saya mengenali bentuk-bentuk cyberbullying (termasuk doxing dan impersonasi).',
      'Saya tahu cara bertindak saat menghadapi perundungan siber (simpan bukti, blokir, lapor).',
      'Saya secara konsisten menerapkan Prinsip 5P "Saring Sebelum Sharing".'
    ]
  }
];

export const defaultFinalQuestions: QuizQuestion[] = [
  {
    id: 'f-1',
    question: 'Apa yang dimaksud dengan etika informasi?',
    options: [
      'Aturan teknis tentang cara menginstal sistem operasi komputer',
      'Prinsip moral dalam mengelola, menciptakan, mengakses, dan menyebarkan informasi',
      'Panduan teknis membuat media sosial untuk promosi bisnis',
      'Cara memperbanyak perangkat komputer secara efisien'
    ],
    correctAnswerIndex: 1,
    explanation: 'Etika informasi adalah prinsip moral dan standar perilaku yang mengatur pengelolaan dan penyebaran informasi.'
  },
  {
    id: 'f-2',
    question: 'Manakah yang BUKAN merupakan ciri-ciri dari informasi hoaks?',
    options: [
      'Menggunakan judul sensasional dan provokatif',
      'Mencantumkan sumber yang jelas, kredibel, dan terverifikasi',
      'Menggunakan bahasa emosional yang memicu amarah atau ketakutan',
      'Tidak memiliki bukti pendukung dan tanggal kejadian yang tidak jelas'
    ],
    correctAnswerIndex: 1,
    explanation: 'Berita yang mencantumkan sumber jelas, kredibel, dan terverifikasi adalah ciri berita valid, bukan hoaks.'
  },
  {
    id: 'f-3',
    question: 'Metode S.I.F.T. untuk verifikasi informasi di internet merupakan singkatan dari...',
    options: [
      'Simple, Interactive, Fast, Trust',
      'Stop, Investigate the source, Find better coverage, Trace claims to original context',
      'Search, Identify, Filter, Track',
      'Share, Inform, Forward, Transform'
    ],
    correctAnswerIndex: 1,
    explanation: 'SIFT oleh Michael Caulfield: Stop, Investigate the source, Find better coverage, Trace claims.'
  },
  {
    id: 'f-4',
    question: 'Menurut UU PDP No. 27 Tahun 2022, manakah yang termasuk dalam kategori Data Pribadi Spesifik?',
    options: [
      'Nama lengkap sesuai identitas',
      'Alamat domisili rumah',
      'Data kesehatan dan data biometrik (sidik jari/wajah)',
      'Nomor telepon seluler'
    ],
    correctAnswerIndex: 2,
    explanation: 'Data kesehatan, biometrik, keuangan, dan data anak diklasifikasikan sebagai Data Pribadi Spesifik.'
  },
  {
    id: 'f-5',
    question: 'Plagiarisme didefinisikan sebagai tindakan...',
    options: [
      'Mengutip karya ilmiah orang lain dengan mencantumkan rujukan yang benar',
      'Mengambil karya, ide, atau tulisan orang lain dan mengakuinya tanpa izin sebagai milik sendiri',
      'Menulis daftar pustaka menggunakan format baku APA 7th Edition',
      'Membaca berbagai buku referensi di perpustakaan'
    ],
    correctAnswerIndex: 1,
    explanation: 'Plagiarisme adalah pengklaiman karya orang lain sebagai karya sendiri tanpa pengakuan rujukan.'
  },
  {
    id: 'f-6',
    question: 'Lisensi Creative Commons "CC BY-SA" berarti...',
    options: [
      'Karya tidak boleh digunakan sama sekali',
      'Karya boleh digunakan dengan mencantumkan nama pencipta dan dibagikan dengan lisensi yang sama',
      'Karya boleh digunakan hanya untuk kepentingan komersial',
      'Karya boleh digunakan tanpa perlu mencantumkan sumber'
    ],
    correctAnswerIndex: 1,
    explanation: 'CC BY = Attribution, SA = Share-Alike (berbagi dengan lisensi yang sama).'
  },
  {
    id: 'f-7',
    question: 'Cyberbullying didefinisikan sebagai...',
    options: [
      'Perundungan yang terjadi secara fisik di tempat umum',
      'Tindakan intimidasi, pelecehan, atau perundungan yang dilakukan melalui media digital',
      'Permainan interaktif online bersama teman',
      'Aplikasi khusus untuk pembelajaran siber'
    ],
    correctAnswerIndex: 1,
    explanation: 'Cyberbullying mencakup perundungan atau intimidasi berbasis media digital.'
  },
  {
    id: 'f-8',
    question: 'Urutan Prinsip 5P sebelum membagikan (sharing) informasi di media sosial adalah...',
    options: [
      'Pahami, Periksa, Perhatikan, Pertimbangkan, Putuskan',
      'Pilih, Pakai, Percaya, Pasti, Puji',
      'Pikir, Paham, Pasti, Pakai, Pulang',
      'Pamer, Pilih, Pakai, Percaya, Pasti'
    ],
    correctAnswerIndex: 0,
    explanation: 'Prinsip 5P: Pahami, Periksa, Perhatikan, Pertimbangkan, Putuskan.'
  },
  {
    id: 'f-9',
    question: 'Apa yang dimaksud dengan fenomena konten Deepfake?',
    options: [
      'Video rekaman profesional dari kamera DSLR',
      'Video atau audio palsu yang direkayasa secara canggih menggunakan teknologi AI',
      'Film dokumenter ilmiah berbasis fakta',
      'Konten edukasi animasi 2D'
    ],
    correctAnswerIndex: 1,
    explanation: 'Deepfake memanfaatkan AI untuk merekayasa wajah dan suara palsu.'
  },
  {
    id: 'f-10',
    question: 'Salah satu dampak negatif utama dari penyebaran disinformasi/hoaks di masyarakat adalah...',
    options: [
      'Meningkatkan literasi dan pengetahuan umum',
      'Menimbulkan kepanikan, ketakutan, dan kerugian finansial/sosial',
      'Mempererat persaudaraan antarwarga',
      'Membantu pemerintah mengambil keputusan instan'
    ],
    correctAnswerIndex: 1,
    explanation: 'Disinformasi merusak tatanan sosial dan memicu kepanikan massa.'
  }
];

export const defaultSiftCases: SIFTCase[] = [
  {
    id: 'sift-1',
    title: 'Peringatan Darurat: Air Kemasan Plastik Mengandung Mikroplastik Penyebab Kanker',
    source: 'Postingan Viral di Media Sosial tanpa Tanggal',
    category: 'Kesehatan',
    text: '🔥 JANGAN MINUM AIR KEMASAN PLASTIK! WHO telah mengeluarkan peringatan darurat! Semua air minum kemasan plastik mengandung mikroplastik berbahaya yang dapat menyebabkan kanker. Segera hentikan konsumsi dan rebus air keran! Share agar semua tahu!!!',
    steps: {
      stop: 'Jeda dulu (Stop). Postingan penuh dengan emoji api, tanda seru, dan klaim darurat tanpa menyertakan dokumen resmi WHO.',
      investigate: 'Cek sumber penerbit (Investigate). Tidak menyebutkan nama divisi WHO, nama peneliti, atau artikel jurnal ilmiah pendukung.',
      findCoverage: 'Cari berita pembanding (Find Better Coverage). Saat mengecek di situs resmi WHO dan Kemenkes, tidak ada larangan darurat seperti yang diklaim.',
      trace: 'Lacak klaim (Trace Claims). Gambar botol plastik menakutkan ternyata diambil dari situs foto stok gratis yang diubah narasinya.'
    },
    verdict: 'Hoaks',
    explanation: 'Ini adalah pesan hoaks berulang yang mengatasnamakan WHO tanpa dasar ilmiah resmi.'
  },
  {
    id: 'sift-2',
    title: 'Video Bencana Alam Gempa Dahsyat di Jakarta tahun 2024',
    source: 'Grup Obrolan Pesan Instan (Forwarded Message)',
    category: 'Sosial Politik',
    text: 'Rekaman video mendadak gempa bumi dahsyat menghancurkan beberapa gedung di Jakarta tadi malam. Warga diminta segera mengungsi ke tempat tinggi!',
    steps: {
      stop: 'Berhenti sejenak (Stop). Jangan langsung meneruskan pesan ke grup keluarga!',
      investigate: 'Periksa pengirim pesan (Investigate). Pesan hanya berupa "Forwarded" tanpa sumber resmi BMKG.',
      findCoverage: 'Cari liputan media (Find Better Coverage). Situs BMKG dan BNPB tidak merilis peringatan gempa bumi besar di Jakarta.',
      trace: 'Telusuri video (Trace Claims). Menggunakan Google Reverse Image / InVID, terbukti video tersebut adalah rekaman gempa di negara lain beberapa tahun lalu.'
    },
    verdict: 'Hoaks',
    explanation: 'Video daur ulang dari kejadian di luar negeri yang dinarasikan ulang untuk memicu kepanikan warga.'
  },
  {
    id: 'sift-3',
    title: 'Penipuan Email Phishing Verifikasi Akun Portal Kampus',
    source: 'Email dari admin@unij.ac.id (Resmi: admin@unj.ac.id)',
    category: 'Teknologi',
    text: 'Pemberitahuan Pembaruan Sistem: Akun Anda akan dinonaktifkan dalam 2 jam jika tidak melakukan verifikasi username dan password di link berikut.',
    steps: {
      stop: 'Tahan hasrat klik link (Stop). Batas waktu 2 jam adalah bentuk urgensi palsu khas phishing.',
      investigate: 'Periksa domain pengirim (Investigate). Alamat email pengirim `unij.ac.id` beda tipis dengan domain resmi `unj.ac.id`.',
      findCoverage: 'Cari pengumuman (Find Better Coverage). Cek pengumuman di portal resmi kampus atau tanyakan langsung ke bagian IT.',
      trace: 'Telusuri tautan (Trace Claims). Link mengarahkan ke halaman login palsu yang meniru tampilan kampus untuk mencuri password.'
    },
    verdict: 'Hoaks',
    explanation: 'Ini adalah serangan Phishing berbahaya. Jangan pernah mengisikan kata sandi di tautan mencurigakan!'
  }
];

export const defaultEthicsScenarios: EthicsScenario[] = [
  {
    id: 'eth-1',
    situation: 'Kamu menemukan foto temanmu dalam kondisi konyol/lucu saat tertidur di kelas. Temanmu belum tahu foto itu diambil. Apa yang kamu lakukan?',
    category: 'Privasi Data',
    learningTip: 'Selalu minta izin (consent) sebelum memublikasikan foto atau video orang lain di media sosial.',
    options: [
      {
        text: 'Langsung mengunggahnya ke Instagram Story untuk bahan candaan tanpa memberitahunya.',
        score: 0,
        rationale: 'Mengunggah foto pribadi seseorang tanpa izin melanggar hak privasi dan berpotensi menjadi perundungan.',
        category: 'Privasi Data'
      },
      {
        text: 'Tunjukkan foto itu ke temanmu terlebih dahulu dan minta izin apakah boleh diunggah.',
        score: 100,
        rationale: 'Sangat etis! Menghormati persetujuan (consent) adalah wujud kesantunan digital yang bertanggung jawab.',
        category: 'Privasi Data'
      },
      {
        text: 'Mengubah foto tersebut menjadi stiker grup obrolan tanpa persetujuannya.',
        score: 30,
        rationale: 'Meski hanya untuk stiker obrolan, mengedarkan foto tanpa izin tetap dapat membuat orang lain tidak nyaman.',
        category: 'Privasi Data'
      }
    ]
  },
  {
    id: 'eth-2',
    situation: 'Kamu sedang mengerjakan tugas kuliah dan menggunakan ChatGPT untuk mencari ide judul skripsi/makalah. Bagaimana cara menggunakan AI secara etis?',
    category: 'Hak Cipta',
    learningTip: 'Gunakan AI sebagai alat bantu perumusan ide (brainstorming), lalu kembangkan secara mandiri dan deklarasikan penggunaannya.',
    options: [
      {
        text: 'Menyalin seluruh output ChatGPT dan mengumpulkannya langsung sebagai karya pribadi tanpa dibaca ulang.',
        score: 0,
        rationale: 'Tindakan ini adalah pelanggaran integritas akademik serius (plagiarisme AI).',
        category: 'Hak Cipta'
      },
      {
        text: 'Menggunakan AI untuk brainstorming ide awal, menyusun ulang gagasan dengan analisis sendiri, serta mencantumkan deklarasi penggunaan AI.',
        score: 100,
        rationale: 'Luar biasa! Kamu memanfaatkan AI sebagai mitra berpikir secara transparan dan bertanggung jawab.',
        category: 'Hak Cipta'
      },
      {
        text: 'Merahasiakan penggunaan AI dan menyalin teks AI dengan sedikit mengubah sinonim kata.',
        score: 25,
        rationale: 'Mengubah sedikit kata tanpa transparansi tetap dikategorikan sebagai upaya mengelabui integritas karya.',
        category: 'Hak Cipta'
      }
    ]
  },
  {
    id: 'eth-3',
    situation: 'Di kolom komentar postingan publik, seseorang menuliskan pendapat yang berbeda denganamu tentang suatu isu. Bagaimana respon etismu?',
    category: 'Sopan Santun Digital',
    learningTip: 'Sampaikan argumen berbasis data dan logika secara santun tanpa menyerang pribadi (ad hominem).',
    options: [
      {
        text: 'Sampaikan argumen balasan secara santun dengan menyertakan data/fakta pendukung yang valid.',
        score: 100,
        rationale: 'Sangat baik! Menjawab perbedaan pendapat dengan fakta dan kesantunan cermin warga digital dewasa.',
        category: 'Sopan Santun Digital'
      },
      {
        text: 'Menyerang pribadi orang tersebut dengan kata-kata kasar dan ejekan.',
        score: 0,
        rationale: 'Serangan ad-hominem melanggar netiket dan menciptakan ruang digital yang toksik.',
        category: 'Sopan Santun Digital'
      },
      {
        text: 'Mengajak teman-temanmu untuk menyerbu (cyber-mobbing) akun media sosial orang tersebut.',
        score: 10,
        rationale: 'Aksi penyerbuan akun massal adalah bentuk perundungan siber yang melanggar hukum dan etika.',
        category: 'Sopan Santun Digital'
      }
    ]
  }
];

export const defaultLikertQuestions: { id: string; dimension: 'Materi' | 'Desain' | 'Fitur' | 'Dampak'; statement: string }[] = [
  // Dimensi A: Materi (Kejelasan & Kualitas Substantif)
  { id: 'lq-1', dimension: 'Materi', statement: 'Sajian materi pada e-modul etika informasi disusun secara runtut, terstruktur, dan komprehensif.' },
  { id: 'lq-2', dimension: 'Materi', statement: 'Penjelasan konsep etika siber, UU PDP No. 27/2022, dan hak cipta disajikan secara intuitif dan mudah dipahami.' },
  { id: 'lq-3', dimension: 'Materi', statement: 'Penyajian studi kasus riil (seperti hoaks bencana & plagiarisme AI) sangat relevan dengan fenomena sosial Generasi Z.' },
  { id: 'lq-4', dimension: 'Materi', statement: 'Gaya bahasa dan rangkuman poin-poin penting membantu mempercepat pemahaman materi setiap bab.' },

  // Dimensi B: Desain Antarmuka, Keterbacaan & UI/UX
  { id: 'lq-5', dimension: 'Desain', statement: 'Tampilan antarmuka (UI/UX) e-modul sangat bersih, modern, dan nyaman dibaca di berbagai ukuran layar.' },
  { id: 'lq-6', dimension: 'Desain', statement: 'Kombinasi warna, tata letak teks, dan tipografi memudahkan fokus saat membaca materi pembelajaran.' },
  { id: 'lq-7', dimension: 'Desain', statement: 'Gambar infografis visual di setiap bab efektif memvisualisasikan hirarki etika dan langkah verifikasi SIFT.' },
  { id: 'lq-8', dimension: 'Desain', statement: 'Navigasi antar bab, daftar isi, dan tombol aksi berfungsi dengan cepat, responsif, dan tanpa kendala.' },

  // Dimensi C: Kebermanfaatan Fitur Interaktif & Multimedia
  { id: 'lq-9', dimension: 'Fitur', statement: 'Fitur Cek Fakta SIFT secara praktis melatih keterampilan memverifikasi berita bohong dan disinformasi.' },
  { id: 'lq-10', dimension: 'Fitur', statement: 'Fitur Penganalisis Plagiarisme memberikan pemahaman nyata mengenai integritas akademik & sitasi APA 7th.' },
  { id: 'lq-11', dimension: 'Fitur', statement: 'Tayangan video pembelajaran interaktif (via QR Code & link streaming) memperjelas konteks pembahasan bab.' },
  { id: 'lq-12', dimension: 'Fitur', statement: 'Simulasi game etika siber dan kuis latihan unit meningkatkan keterlibatan serta motivasi belajar.' },

  // Dimensi D: Dampak Pemahaman Literasi Digital & Sikap Etis
  { id: 'lq-13', dimension: 'Dampak', statement: 'E-modul ini meningkatkan kesadaran saya mengenai pentingnya melindungi data pribadi (UU PDP No. 27/2022).' },
  { id: 'lq-14', dimension: 'Dampak', statement: 'E-modul ini mendorong sikap kritis, bijak, dan tahan emosi (Stop) saat menerima kabar viral di media sosial.' },
  { id: 'lq-15', dimension: 'Dampak', statement: 'Saya merasa lebih percaya diri dan bertanggung jawab dalam menerapkan etika berkomunikasi (netiket) di internet.' },
  { id: 'lq-16', dimension: 'Dampak', statement: 'Secara keseluruhan, e-modul interaktif ini sangat bermanfaat dan layak digunakan sebagai media pembelajaran resmi.' }
];

export const defaultEvaluationsSample = [
  {
    id: 'eval-demo-1',
    studentName: 'Ahmad Fauzi',
    studentNim: '1512621001',
    jenisKelamin: 'Pria',
    pekerjaan: 'Mahasiswa',
    instansi: '',
    ratingFitur: 5,
    ratingSistem: 5,
    ratingMateri: 5,
    likertAnswers: {
      'lq-1': 5, 'lq-2': 5, 'lq-3': 4, 'lq-4': 5, 'lq-5': 5,
      'lq-6': 5, 'lq-7': 5, 'lq-8': 5, 'lq-9': 5, 'lq-10': 5
    },
    feedbackFitur: 'Fitur SIFT dan Cek Plagiarisme sangat membantu simulasi riil.',
    feedbackSistem: 'Tampilan cepat, bersih, dan enak dilihat saat membaca modul.',
    feedbackMateri: 'Materi etika informasi sangat jelas dan aplikatif.',
    submittedAt: '2026-07-28T09:15:00.000Z'
  },
  {
    id: 'eval-demo-2',
    studentName: 'Siti Nurhaliza',
    studentNim: '1512621044',
    jenisKelamin: 'Wanita',
    pekerjaan: 'Mahasiswa',
    instansi: '',
    ratingFitur: 5,
    ratingSistem: 4,
    ratingMateri: 5,
    likertAnswers: {
      'lq-1': 5, 'lq-2': 4, 'lq-3': 5, 'lq-4': 4, 'lq-5': 5,
      'lq-6': 5, 'lq-7': 5, 'lq-8': 4, 'lq-9': 5, 'lq-10': 5
    },
    feedbackFitur: 'Sangat interaktif terutama game studi kasus dan kuis unit.',
    feedbackSistem: 'Sangat responsif di HP.',
    feedbackMateri: 'Penjelasan UU PDP sangat bermanfaat.',
    submittedAt: '2026-07-29T11:20:00.000Z'
  },
  {
    id: 'eval-demo-3',
    studentName: 'Budi Santoso',
    studentNim: '1512621088',
    jenisKelamin: 'Pria',
    pekerjaan: 'Mahasiswa',
    instansi: '',
    ratingFitur: 4,
    ratingSistem: 5,
    ratingMateri: 4,
    likertAnswers: {
      'lq-1': 4, 'lq-2': 4, 'lq-3': 5, 'lq-4': 5, 'lq-5': 4,
      'lq-6': 4, 'lq-7': 5, 'lq-8': 4, 'lq-9': 4, 'lq-10': 5
    },
    feedbackFitur: 'Bagus sekali untuk latihan mendeteksi hoaks.',
    feedbackSistem: 'Antarmuka futuristik tapi simpel.',
    feedbackMateri: 'Bagus dan terstruktur dengan baik.',
    submittedAt: '2026-07-30T14:45:00.000Z'
  }
];
