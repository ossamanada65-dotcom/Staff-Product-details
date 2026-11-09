(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const toast = $('#toast');
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2600);
  }

  const ui = {
    en: {
      navCaption: [
        'Operations',
        'Planning',
      ],
      nav: [
        'Dashboard',
        'Alerts',
        'Inventory',
        'Products',
        'AI forecast',
        'Purchase orders',
        'Suppliers',
        'Reports',
      ],
      back: 'Products',
      subtitle: 'Product details',
      staff: 'Warehouse staff',
      userName: 'User Name',
      userRole: 'Warehouse staff',
      avatar: 'UN',
      search: 'Search products, SKUs...',
      fields: [
        'Category',
        'SKU',
        'Sell price (EGP)',
      ],
      barcodeButton: 'Generate barcode',
      footer: '© 2027 Smart Warehouse. All rights reserved.',
      notifications: 'You’re all caught up.',
      noHistory: 'Product list is not available in this preview.',
    },
    ar: {
      barcodeButton: '\u0625\u0646\u0634\u0627\u0621 \u0628\u0627\u0631\u0643\u0648\u062f',
      userName: '\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645',
      userRole: '\u0645\u0648\u0638\u0641 \u0627\u0644\u0645\u062e\u0632\u0646',
      avatar: '\u0623\u0645',
      navCaption: [
        'العمليات',
        'التخطيط',
      ],
      nav: [
        'لوحة التحكم',
        'التنبيهات',
        'المخزون',
        'المنتجات',
        'توقعات الذكاء الاصطناعي',
        'أوامر الشراء',
        'الموردون',
        'التقارير',
      ],
      back: 'المنتجات',
      subtitle: 'تفاصيل المنتج',
      staff: 'موظف المخزن',
      search: 'ابحث عن المنتجات أو رموز SKU...',
      fields: [
        'الفئة',
        'رمز SKU',
        'سعر البيع (جنيه مصري)',
      ],
      footer: '© 2027 سمارت ويرهاوس. جميع الحقوق محفوظة.',
      notifications: 'لا توجد إشعارات جديدة.',
      noHistory: 'قائمة المنتجات غير متاحة في هذه المعاينة.',
    }
  };

  function setLanguage(language) {
    const copy = ui[language] || ui.en;
    const arabic = language === 'ar';
    document.documentElement.lang = arabic ? 'ar' : 'en';
    document.documentElement.dir = arabic ? 'rtl' : 'ltr';
    $$('.nav-caption').forEach((item, index) => {
      item.textContent = copy.navCaption[index];
    });
    $$('.nav-link > span:not(.nav-count)').forEach((item, index) => {
      item.textContent = copy.nav[index];
    });
    $('.back-link span').textContent = copy.back;
    $('.page-subtitle').textContent = copy.subtitle;
    $('.staff-chip span').textContent = copy.staff;
    $('.account-copy strong').textContent = copy.userName;
    $('.account-copy span').textContent = copy.userRole;
    $('.avatar').textContent = copy.avatar;
    $('.search-box input').placeholder = copy.search;
    $$('.field > span').forEach((item, index) => {
      item.textContent = copy.fields[index];
    });
    $('#generateBarcodeButton').setAttribute('aria-label', copy.barcodeButton);
    $('.page-footer').textContent = copy.footer;
    $('.search-box input').setAttribute('aria-label', copy.search);
    $$('.language-button').forEach(button => {
      const selected = button.dataset.language === language;

      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }

  $$('.language-button').forEach(button => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });

  $('#backButton').addEventListener('click', () => {
    if (window.history.length > 1) window.history.back();
    else {
      const language = document.documentElement.lang === 'ar' ? 'ar' : 'en';
      showToast(ui[language].noHistory);
    }
  });
  $('.notification-button').addEventListener('click', () => {
    const language = document.documentElement.lang === 'ar' ? 'ar' : 'en';
    showToast(ui[language].notifications);
  });
})();
