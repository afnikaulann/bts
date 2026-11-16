// bts_site_config.js - Default data and storage manager for BTS Ticketing Website + Analytics & Orders Tracker

const DEFAULT_CONFIG = {
  general: {
    eventTag: "Concert Tour 2026",
    eventTitle: "BTS WORLD TOUR 'ARIRANG' IN KUALA LUMPUR",
    eventDates: "Saturday & Sunday, 12 - 13 Dec 2026",
    eventVenue: "TM Stadium Nasional, Bukit Jalil, Kuala Lumpur",
    eventTimes: "Show starts at 8:00 PM (Doors open 5:00 PM)",
    waNumber: "6285696525184",
    posterImage: "bts-poster.jpg",
    vendorImage: "tour-vendors.png",
    siteTitle: "BTS WORLD TOUR 'ARIRANG' IN KUALA LUMPUR | Live Nation Malaysia",
    sectionTitle: "Daftar Harga Tiket BTS Resmi",
    sectionSubtitle: "BTS WORLD TOUR 'ARIRANG' Kuala Lumpur 2026 | TM Stadium Nasional, Bukit Jalil, Kuala Lumpur",
    infoScheduleGate: "03:00 PM",
    infoScheduleSoundcheck: "04:30 PM",
    infoScheduleDoors: "05:00 PM",
    infoScheduleConcert: "08:00 PM",
    infoVenueDesc: "TM Stadium Nasional Bukit Jalil, Kuala Lumpur, Malaysia.",
    infoTransportDesc: "LRT Sri Petaling Line ke Stesen LRT Bukit Jalil (hanya 200m berjalan kaki).",
    infoParkingDesc: "Parkir Zon A, B, dan C Bukit Jalil (disarankan datang awal).",
    infoProhibited: "• Kamera DSLR/Mirrorless, lensa tele/zoom, drone, dan tongsis / tripod.\n• Minuman/makanan dari luar, botol kaca, kaleng, dan senjata tajam.\n• Banner atau lightstick non-resmi berukuran melebihi A4.",
    footerCopyright: "© 2026 Live Nation Malaysia. All rights reserved. BTS WORLD TOUR 'ARIRANG' OFFICIAL TICKETING."
  },
  bankInfo: {
    bankName: "BCA",
    accountNumber: "8735091241",
    accountHolder: "GLOBAL TICKET CENTER",
    qrisImage: ""
  },
  tickets: [
    {
      id: "vip",
      key: "VIP",
      name: "Soundcheck VIP Package",
      badgeColor: "#dc2626",
      isVip: true,
      desc1: "Floor Seating (Red Zone: A1-A6, C1-C6)",
      desc2: "• Priority Soundcheck Access",
      price: "RM 1.288",
      numericPrice: 4500000
    },
    {
      id: "cat1",
      key: "CAT1",
      name: "CAT 1",
      badgeColor: "#ea580c",
      isVip: false,
      desc1: "Floor Seating (Orange Zone: B1-B12, D1-D12)",
      desc2: "• Stage View",
      price: "RM 988",
      numericPrice: 3450000
    },
    {
      id: "cat2",
      key: "CAT2",
      name: "CAT 2",
      badgeColor: "#db2777",
      isVip: false,
      desc1: "Lower Tier Level 1 (Pink Zone: 111-118, 128-135)",
      desc2: "",
      price: "RM 838",
      numericPrice: 2950000
    },
    {
      id: "cat3",
      key: "CAT3",
      name: "CAT 3",
      badgeColor: "#9333ea",
      isVip: false,
      desc1: "Lower Tier Level 1 (Purple Zone: 102-110, 119-127)",
      desc2: "",
      price: "RM 738",
      numericPrice: 2580000
    },
    {
      id: "cat4",
      key: "CAT4",
      name: "CAT 4",
      badgeColor: "#2563eb",
      isVip: false,
      desc1: "Mid Tier Level 2 (Dark Blue Zone: 209-216, 226-233)",
      desc2: "",
      price: "RM 638",
      numericPrice: 2230000
    },
    {
      id: "cat5",
      key: "CAT5",
      name: "CAT 5",
      badgeColor: "#0284c7",
      isVip: false,
      desc1: "Mid Tier Level 2 (Light Blue Zone: 201-208, 217-225)",
      desc2: "",
      price: "RM 538",
      numericPrice: 1880000
    },
    {
      id: "cat6",
      key: "CAT6",
      name: "CAT 6",
      badgeColor: "#a3e635",
      isVip: false,
      desc1: "Upper Tier Level 3 (Lime Green Zone: 311-318, 327-334)",
      desc2: "",
      price: "RM 438",
      numericPrice: 1530000
    },
    {
      id: "cat7",
      key: "CAT7",
      name: "CAT 7",
      badgeColor: "#10b981",
      isVip: false,
      desc1: "Upper Tier Level 3 (Green Zone: 301-310, 319-326)",
      desc2: "",
      price: "RM 338",
      numericPrice: 1180000
    }
  ]
};

const BTS_CONFIG_KEY = "BTS_SITE_CONFIG_V1";
const BTS_AUTH_KEY = "BTS_ADMIN_AUTH";
const BTS_ORDERS_KEY = "BTS_ORDERS_LIST_V1";
const BTS_ANALYTICS_KEY = "BTS_ANALYTICS_V1";
const BTS_LOGS_KEY = "BTS_CLICK_LOGS_V1";

// Helper functions for config
function getSiteConfig() {
  try {
    const saved = localStorage.getItem(BTS_CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        general: { ...DEFAULT_CONFIG.general, ...(parsed.general || {}) },
        bankInfo: { ...DEFAULT_CONFIG.bankInfo, ...(parsed.bankInfo || {}) },
        tickets: parsed.tickets && parsed.tickets.length > 0 ? parsed.tickets : DEFAULT_CONFIG.tickets
      };
    }
  } catch (e) {
    console.error("Error reading config from localStorage:", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
}

function saveSiteConfig(newConfig) {
  try {
    localStorage.setItem(BTS_CONFIG_KEY, JSON.stringify(newConfig));
    return true;
  } catch (e) {
    console.error("Error saving config:", e);
    return false;
  }
}

function resetSiteConfig() {
  try {
    localStorage.removeItem(BTS_CONFIG_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

// ==================== VISITOR & CLICK TRACKER ====================
// URL Endpoint Backend GTC (dapat diubah sesuai domain backend produksi)
const GTC_BACKEND_API = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'http://localhost:3000';

function trackVisitor() {
  try {
    const now = Date.now();
    let analytics = JSON.parse(localStorage.getItem(BTS_ANALYTICS_KEY) || '{"totalViews":0,"uniqueVisitors":0,"daily":{}}');
    analytics.totalViews = (analytics.totalViews || 0) + 1;

    let visitorId = localStorage.getItem("BTS_VISITOR_UUID");
    if (!visitorId) {
      visitorId = 'user_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem("BTS_VISITOR_UUID", visitorId);
      analytics.uniqueVisitors = (analytics.uniqueVisitors || 0) + 1;
    }

    const today = new Date().toISOString().split('T')[0];
    if (!analytics.daily[today]) {
      analytics.daily[today] = { views: 0, clicks: 0 };
    }
    analytics.daily[today].views += 1;

    localStorage.setItem(BTS_ANALYTICS_KEY, JSON.stringify(analytics));

    // Kirim sinkronisasi ke Backend Admin GTC
    fetch(`${GTC_BACKEND_API}/api/public/track/view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId: visitorId,
        pageUrl: window.location.href,
        userAgent: navigator.userAgent
      }),
      keepalive: true
    }).catch(function(e) {});
  } catch (e) {
    console.error("Error tracking visitor:", e);
  }
}

function trackUserClick(actionName, details) {
  try {
    const visitorId = localStorage.getItem("BTS_VISITOR_UUID") || 'anon_visitor';
    const log = {
      id: 'log_' + Date.now() + '_' + Math.floor(Math.random() * 100),
      timestamp: new Date().toLocaleString('id-ID'),
      action: actionName,
      details: details || '',
      url: window.location.pathname
    };

    let logs = JSON.parse(localStorage.getItem(BTS_LOGS_KEY) || '[]');
    logs.unshift(log);
    if (logs.length > 200) logs = logs.slice(0, 200); // keep recent 200
    localStorage.setItem(BTS_LOGS_KEY, JSON.stringify(logs));

    // Update analytics click count
    let analytics = JSON.parse(localStorage.getItem(BTS_ANALYTICS_KEY) || '{"totalViews":0,"uniqueVisitors":0,"daily":{}}');
    const today = new Date().toISOString().split('T')[0];
    if (!analytics.daily[today]) {
      analytics.daily[today] = { views: 0, clicks: 0 };
    }
    analytics.daily[today].clicks = (analytics.daily[today].clicks || 0) + 1;
    localStorage.setItem(BTS_ANALYTICS_KEY, JSON.stringify(analytics));

    // Kirim sinkronisasi ke Backend Admin GTC
    fetch(`${GTC_BACKEND_API}/api/public/track/click`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId: visitorId,
        elementType: 'CLICK',
        elementLabel: actionName + (details ? ' - ' + details : ''),
        metadata: {
          pageUrl: window.location.href,
          hostname: window.location.hostname,
          action: actionName,
          details: details
        }
      }),
      keepalive: true
    }).catch(function(e) {});
  } catch (e) {
    console.error("Error tracking click:", e);
  }
}

function getVisitorStats() {
  try {
    return JSON.parse(localStorage.getItem(BTS_ANALYTICS_KEY) || '{"totalViews":0,"uniqueVisitors":0,"daily":{}}');
  } catch (e) {
    return { totalViews: 0, uniqueVisitors: 0, daily: {} };
  }
}

function getClickLogs() {
  try {
    return JSON.parse(localStorage.getItem(BTS_LOGS_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function clearClickLogs() {
  localStorage.removeItem(BTS_LOGS_KEY);
}

// ==================== ORDERS / TRANSAKSI MANAGEMENT ====================
function getOrders() {
  try {
    const orders = JSON.parse(localStorage.getItem(BTS_ORDERS_KEY));
    if (orders && Array.isArray(orders)) {
      return orders;
    }
    // Seed initial dummy sample orders to match the user's screenshot layout immediately
    const initialOrders = [
      {
        id: "GTC-88921",
        date: "16 Nov 2026 18:20",
        customerName: "Ahmad Fauzi",
        phone: "08123456789",
        email: "ahmad.fauzi@gmail.com",
        ticketName: "Soundcheck VIP Package",
        ticketCategory: "VIP",
        seat: "A1 - Row 1-05",
        priceFormatted: "RM 1.288",
        priceNumber: 4500000,
        status: "PAID" // PAID, PENDING, CANCEL
      },
      {
        id: "GTC-88922",
        date: "16 Nov 2026 18:35",
        customerName: "Siti Rahmawati",
        phone: "08569876543",
        email: "sitirahma@yahoo.com",
        ticketName: "CAT 1",
        ticketCategory: "CAT1",
        seat: "B2 - Row 5-10",
        priceFormatted: "RM 988",
        priceNumber: 3450000,
        status: "PAID"
      },
      {
        id: "GTC-88923",
        date: "16 Nov 2026 18:42",
        customerName: "Dina Kartika",
        phone: "08781122334",
        email: "dinakartika99@gmail.com",
        ticketName: "CAT 2",
        ticketCategory: "CAT2",
        seat: "Sec 111 - Row 8-12",
        priceFormatted: "RM 838",
        priceNumber: 2950000,
        status: "PENDING"
      },
      {
        id: "GTC-88924",
        date: "16 Nov 2026 18:50",
        customerName: "Budi Santoso",
        phone: "08967788990",
        email: "budisantoso@gmail.com",
        ticketName: "Soundcheck VIP Package",
        ticketCategory: "VIP",
        seat: "C1 - Row 1-02",
        priceFormatted: "RM 1.288",
        priceNumber: 4500000,
        status: "PENDING"
      }
    ];
    localStorage.setItem(BTS_ORDERS_KEY, JSON.stringify(initialOrders));
    return initialOrders;
  } catch (e) {
    return [];
  }
}

function saveOrder(order) {
  try {
    const orders = getOrders();
    orders.unshift(order);
    localStorage.setItem(BTS_ORDERS_KEY, JSON.stringify(orders));
    return true;
  } catch (e) {
    return false;
  }
}

function updateOrderStatus(orderId, newStatus) {
  try {
    const orders = getOrders();
    const target = orders.find(o => o.id === orderId);
    if (target) {
      target.status = newStatus;
      localStorage.setItem(BTS_ORDERS_KEY, JSON.stringify(orders));
      return true;
    }
  } catch (e) {}
  return false;
}

function deleteOrder(orderId) {
  try {
    let orders = getOrders();
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem(BTS_ORDERS_KEY, JSON.stringify(orders));
    return true;
  } catch (e) {}
  return false;
}

// Admin credentials helper
const DEFAULT_ADMIN = {
  username: "admin",
  password: "admin123@bts"
};

function checkAdminAuth() {
  return sessionStorage.getItem(BTS_AUTH_KEY) === "true";
}

function loginAdmin(username, password) {
  const customAdmin = JSON.parse(localStorage.getItem("BTS_ADMIN_CREDENTIALS") || "null") || DEFAULT_ADMIN;
  if (username === customAdmin.username && password === customAdmin.password) {
    sessionStorage.setItem(BTS_AUTH_KEY, "true");
    return { success: true };
  }
  return { success: false, message: "Username atau password salah!" };
}

function logoutAdmin() {
  sessionStorage.removeItem(BTS_AUTH_KEY);
}

function updateAdminCredentials(newUsername, newPassword) {
  localStorage.setItem("BTS_ADMIN_CREDENTIALS", JSON.stringify({
    username: newUsername,
    password: newPassword
  }));
}
