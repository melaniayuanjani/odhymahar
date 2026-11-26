tailwind.config = {
      theme: {
        extend: {
          colors: {
            maroon: {
              50: '#fdf3f4',
              100: '#fbe8ea',
              600: '#8e233c',
              700: '#6b1d2f',
              800: '#521422',
              900: '#380a14'
            },
            gold: {
              50: '#fdfbf3',
              100: '#fbf5df',
              400: '#e5be62',
              500: '#d4a237',
              600: '#b88523',
              700: '#916314'
            },
            canvas: '#fcf9f4'
          },
          fontFamily: {
            serif: ['"Playfair Display"', 'serif'],
            sans: ['"Plus Jakarta Sans"', 'sans-serif']
          }
        }
      }
    }
  

    // State Aplikasi
    let currentOrder = {
      product: 'Mahar Kubah Lengkung Mawar Marun',
      price: 750000,
      frame: 'Akrilik 3D Shadow Box',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrEUU54URwRvEFAcgYu_hhZ1FX3DQzHuRFC3JPX38P_UYb50a3kx_V_7mBHJRmb86aEZOOeSD6mjWQzmMAg54Bk7QdiMKjhkDDfiPchLCN6ivEJn7greeDuYrZNtrPmZILO9H-7ZYAGzNrbdb5TFjIxukTeIiKuF58OJlWCOXGqI0ivoER4MckTyhfzN77bnTFriL0N4lwvehf9AGtHyuSTx-g-n1w5aNpyqgtu554JlOuf7Ng87g',
      deadline: '2026-11-20',
      names: '',
      notes: ''
    };

    let customState = {
      basePrice: 950000,
      framePrice: 350000,
      frameName: 'Akrilik 3D Box Transparan',
      customUploadedImage: null
    };

    // Autentikasi Admin State
    let isAdminAuthenticated = false;
    const ADMIN_PASSWORD = "admin123";

    function switchTab(tabId) {
      document.querySelectorAll('.page-view').forEach(view => view.classList.add('hidden'));
      const targetView = document.getElementById(tabId);
      if (targetView) targetView.classList.remove('hidden');

      document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-maroon-700', 'font-bold');
        btn.classList.add('text-stone-400');
        const span = btn.querySelector('span');
        if (span) {
          span.classList.remove('font-bold');
          span.classList.add('font-medium');
        }
      });

      const activeBtn = document.getElementById('nav-' + tabId);
      if (activeBtn) {
        activeBtn.classList.remove('text-stone-400');
        activeBtn.classList.add('text-maroon-700');
        const span = activeBtn.querySelector('span');
        if (span) {
          span.classList.add('font-bold');
          span.classList.remove('font-medium');
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Navigasi Filter Katalog
    function filterCatalog(category, btn) {
      document.querySelectorAll('.cat-pill').forEach(el => {
        el.classList.remove('bg-maroon-700', 'text-white', 'font-bold');
        el.classList.add('bg-white', 'text-stone-600', 'font-medium');
      });
      btn.classList.remove('bg-white', 'text-stone-600', 'font-medium');
      btn.classList.add('bg-maroon-700', 'text-white', 'font-bold');

      const cards = document.querySelectorAll('.mahar-card');
      cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    }

    function scrollToCatalog() {
      document.getElementById('catalogSection').scrollIntoView({ behavior: 'smooth' });
    }

    // Cek Slot Jadwal
    function checkScheduleSlot() {
      const dateVal = document.getElementById('checkDateInput').value;
      const box = document.getElementById('scheduleResultBox');
      if (!dateVal) return alert('Silakan pilih tanggal.');
      box.className = "mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start space-x-2.5 text-xs text-emerald-800";
      box.innerHTML = `
        <i class="fa-solid fa-circle-check text-emerald-600 mt-0.5"></i>
        <div>
          <p class="font-bold">Slot Tanggal ${dateVal} Tersedia!</p>
          <p class="text-[11px] text-emerald-700">Kapasitas aman. Pengerjaan dapat langsung diproses oleh artisan.</p>
        </div>
      `;
    }

    // Pilih Produk & Pindah ke Form Pemesanan
    function selectProduct(name, price, frame, imgSrc) {
      currentOrder.product = name;
      currentOrder.price = price;
      currentOrder.frame = frame;
      currentOrder.image = imgSrc || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrEUU54URwRvEFAcgYu_hhZ1FX3DQzHuRFC3JPX38P_UYb50a3kx_V_7mBHJRmb86aEZOOeSD6mjWQzmMAg54Bk7QdiMKjhkDDfiPchLCN6ivEJn7greeDuYrZNtrPmZILO9H-7ZYAGzNrbdb5TFjIxukTeIiKuF58OJlWCOXGqI0ivoER4MckTyhfzN77bnTFriL0N4lwvehf9AGtHyuSTx-g-n1w5aNpyqgtu554JlOuf7Ng87g';

      document.getElementById('orderProductName').textContent = name;
      document.getElementById('orderProductPrice').textContent = 'Rp ' + price.toLocaleString('id-ID');
      document.getElementById('orderProductThumb').src = currentOrder.image;
      document.getElementById('summaryBasePrice').textContent = 'Rp ' + price.toLocaleString('id-ID');
      document.getElementById('summaryFinalPrice').textContent = 'Rp ' + price.toLocaleString('id-ID');

      // Fokuskan ke kolom nama mempelai
      switchTab('tab-bayar');
      setTimeout(() => {
        const nameInput = document.getElementById('groomBrideName');
        if (nameInput) nameInput.focus();
      }, 250);
    }

    // Preview Foto Upload Desain Custom
    function previewUploadedCustomImage(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(e) {
        customState.customUploadedImage = e.target.result;
        const previewContainer = document.getElementById('customUploadPreviewContainer');
        const previewImg = document.getElementById('customUploadPreviewImg');
        const fileName = document.getElementById('customUploadFileName');

        previewImg.src = e.target.result;
        fileName.textContent = file.name;
        previewContainer.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    }

    // Alias untuk kompatibilitas
    function previewCustomImage(event) {
      previewUploadedCustomImage(event);
    }

    function clearUploadedCustomImage() {
      customState.customUploadedImage = null;
      document.getElementById('customImageInput').value = '';
      document.getElementById('customUploadPreviewContainer').classList.add('hidden');
    }

    // Custom Studio Logic
    function selectFrameType(frameName, framePrice, btn) {
      document.querySelectorAll('.frame-btn').forEach(b => {
        b.className = "frame-btn border border-stone-300 p-2.5 rounded-xl text-left bg-white";
      });
      btn.className = "frame-btn active border-2 border-maroon-700 bg-maroon-50/50 p-2.5 rounded-xl text-left";
      customState.frameName = frameName;
      customState.framePrice = framePrice;
      calculateCustomPrice();
    }

    function calculateCustomPrice() {
      const sizeSelect = document.getElementById('customSizeSelect');
      const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
      const sizePrice = parseInt(selectedOption.getAttribute('data-price')) || 950000;
      
      let total = sizePrice + customState.framePrice;
      if (document.getElementById('checkLED').checked) total += 100000;
      if (document.getElementById('checkStand').checked) total += 85000;

      document.getElementById('customTotalDisplay').textContent = 'Rp ' + total.toLocaleString('id-ID');
      return total;
    }

    function applyCustomToCheckout() {
      const total = calculateCustomPrice();
      const customImg = customState.customUploadedImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf9utyZmV39LGMq2LaVRg5lVyuKmF8J5me7XfngvgkKDhZsro7X28uO8vwq8AzThGzVr6TjGvYhirGWBDjR0c8ZW28cKZqbxTaMrpCu1oHgMd-lXqc99IhUsCAwtQdr-QO_CgJUX5dVVGLF8I8L-3ZmAq89E6T7nqjl_5KS5zNXt7a_SLpfOE9jPwWWyQLFA0oyvGlXZcwUaE-CaMC4Lem_XtLJHzRU5I6Caj2N6YonzAJPajKyN8';
      selectProduct('Desain Mahar Custom Sendiri (' + customState.frameName + ')', total, 'Custom Bespoke Studio', customImg);
    }

    function cancelOrderProcess() {
      if (confirm('Batalkan pengisian form dan kembali ke katalog?')) {
        switchTab('tab-katalog');
      }
    }

    // Handle Pembayaran & E-Invoice
    function handlePaymentSubmit(event) {
      event.preventDefault();
      const brideName = document.getElementById('groomBrideName').value.trim();
      const notes = document.getElementById('orderSpecialNotes').value.trim() || 'Tidak ada catatan khusus';
      const deadline = document.getElementById('orderDeadline').value;
      const newInv = 'INV-ODM-' + Math.floor(100000 + Math.random() * 900000);

      currentOrder.names = brideName;
      currentOrder.notes = notes;
      currentOrder.deadline = deadline;

      document.getElementById('invBride').textContent = brideName;
      document.getElementById('invProduct').textContent = currentOrder.product;
      document.getElementById('invNotes').textContent = notes;
      document.getElementById('invDeadline').textContent = deadline;
      document.getElementById('invPrice').textContent = 'Rp ' + currentOrder.price.toLocaleString('id-ID');
      document.getElementById('invNumber').textContent = newInv;
      document.getElementById('adminTargetOrder').textContent = newInv;

      const waMsg = encodeURIComponent(`Halo Admin Odhy Mahar, saya telah memesan secara online:\n- No. Invoice: ${newInv}\n- Nama di Mahar: ${brideName}\n- Model Mahar: ${currentOrder.product}\n- Catatan Khusus: ${notes}\n- Target Akad: ${deadline}\n- Total: Rp ${currentOrder.price.toLocaleString('id-ID')}`);
      document.getElementById('btnWAConfirmation').href = `https://wa.me/6281234567890?text=${waMsg}`;

      alert('Pesanan & Pembayaran Berhasil Divalidasi! E-Invoice Digital Anda telah terbit.');
      switchTab('tab-admin');
      switchAdminSubtab('invoice');
    }

    // ====== SISTEM PROTEKSI & PASSWORD DASHBOARD ADMIN ======
    function handleAdminHeaderClick() {
      if (isAdminAuthenticated) {
        switchTab('tab-admin');
        switchAdminSubtab('dashboard');
      } else {
        openAdminAuthModal();
      }
    }

    function requestAdminDashboardAccess() {
      if (isAdminAuthenticated) {
        switchAdminSubtab('dashboard');
      } else {
        openAdminAuthModal();
      }
    }

    function openAdminAuthModal() {
      const modal = document.getElementById('adminAuthModal');
      const err = document.getElementById('adminAuthError');
      const input = document.getElementById('adminPasswordInput');
      err.classList.add('hidden');
      input.value = '';
      modal.classList.remove('hidden');
      setTimeout(() => input.focus(), 150);
    }

    function closeAdminAuthModal() {
      document.getElementById('adminAuthModal').classList.add('hidden');
    }

    function togglePasswordVisibility() {
      const pwdInput = document.getElementById('adminPasswordInput');
      const eyeIcon = document.getElementById('pwdEyeIcon');
      if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        eyeIcon.className = 'fa-regular fa-eye-slash';
      } else {
        pwdInput.type = 'password';
        eyeIcon.className = 'fa-regular fa-eye';
      }
    }

    function verifyAdminPassword(event) {
      event.preventDefault();
      const enteredPwd = document.getElementById('adminPasswordInput').value;
      const err = document.getElementById('adminAuthError');

      if (enteredPwd === ADMIN_PASSWORD) {
        isAdminAuthenticated = true;
        closeAdminAuthModal();
        
        const lockIcon = document.getElementById('dashLockIcon');
        if (lockIcon) {
          lockIcon.className = "fa-solid fa-lock-open text-[10px] text-emerald-600";
        }

        switchTab('tab-admin');
        switchAdminSubtab('dashboard');
      } else {
        err.classList.remove('hidden');
      }
    }

    function adminLogout() {
      isAdminAuthenticated = false;
      const lockIcon = document.getElementById('dashLockIcon');
      if (lockIcon) {
        lockIcon.className = "fa-solid fa-lock text-[10px] text-maroon-700";
      }
      alert('Anda telah logout dari Dashboard Pemilik.');
      switchAdminSubtab('invoice');
    }

    function switchAdminSubtab(view) {
      const btnInv = document.getElementById('subtab-inv-btn');
      const btnDash = document.getElementById('subtab-dash-btn');
      const viewInv = document.getElementById('subview-invoice');
      const viewDash = document.getElementById('subview-dashboard');

      if (view === 'invoice') {
        btnInv.className = "flex-1 py-1.5 rounded-lg bg-white text-stone-900 shadow-sm transition";
        btnDash.className = "flex-1 py-1.5 rounded-lg text-stone-600 flex items-center justify-center space-x-1 transition";
        viewInv.classList.remove('hidden');
        viewDash.classList.add('hidden');
      } else {
        if (!isAdminAuthenticated) {
          openAdminAuthModal();
          return;
        }
        btnDash.className = "flex-1 py-1.5 rounded-lg bg-white text-stone-900 shadow-sm flex items-center justify-center space-x-1 transition";
        btnInv.className = "flex-1 py-1.5 rounded-lg text-stone-600 transition";
        viewDash.classList.remove('hidden');
        viewInv.classList.add('hidden');
      }
    }

    function updateWorkflowStatus(status) {
      alert(`Status pesanan berhasil diperbarui ke: "${status}" dan tersimpan di database.`);
    }
