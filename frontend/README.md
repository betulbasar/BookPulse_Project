# BookPulse Frontend

BookPulse kütüphane yönetim sisteminin React + TypeScript + Vite ile geliştirilmiş frontend uygulaması.

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Build önizleme
npm run preview
```

## 📦 Teknolojiler

- **React 18** - UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **Vite** - Build tool
- **React Router** - Sayfa yönlendirme
- **TanStack Query** - Server state yönetimi
- **Axios** - HTTP client
- **React Hook Form** - Form yönetimi
- **Zod** - Schema validasyonu
- **Tailwind CSS** - Stil kütüphanesi
- **Lucide React** - İkonlar

## 🏗️ Proje Yapısı

```
src/
├── components/       # Yeniden kullanılabilir bileşenler
│   ├── common/      # Genel bileşenler (Button, Input, Card, Modal)
│   ├── books/       # Kitap bileşenleri
│   ├── members/     # Üye bileşenleri
│   └── loans/       # Ödünç bileşenleri
├── pages/           # Sayfa bileşenleri
├── services/        # API servisleri
├── types/           # TypeScript tipleri
└── App.tsx          # Ana uygulama bileşeni
```

## 🔧 Yapılandırma

### API Base URL

API base URL'i `src/services/api.ts` dosyasında yapılandırılır:

```typescript
const api = axios.create({
  baseURL: 'https://localhost:5001/api', // Backend API URL'i
  // ...
})
```

Backend'iniz farklı bir portta çalışıyorsa bu URL'i güncelleyin.

## 📝 Özellikler

- ✅ Dashboard - İstatistikler ve özet bilgiler
- ✅ Kitaplar - Liste, ekleme, silme, arama
- ✅ Üyeler - Liste, ekleme, silme, arama
- ✅ Ödünçler - Ödünç alma, iade etme, filtreleme
- ✅ Responsive tasarım
- ✅ Form validasyonu
- ✅ Loading states
- ✅ Error handling

## 🎨 Stil

Tailwind CSS kullanılmaktadır. Renk paleti `tailwind.config.js` dosyasında tanımlanmıştır.

## 🔗 Backend Entegrasyonu

Frontend, backend API'sine HTTP istekleri gönderir. Backend'in çalışır durumda olması ve CORS yapılandırmasının doğru olması gerekir.

Backend CORS yapılandırması `Program.cs` dosyasında zaten yapılmış durumda:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

## 📚 Kullanım

1. Backend'i çalıştırın (`dotnet run`)
2. Frontend'i çalıştırın (`npm run dev`)
3. Tarayıcıda `http://localhost:5173` adresine gidin

## 🐛 Sorun Giderme

### CORS Hatası
Backend'inizin CORS yapılandırmasını kontrol edin.

### API Bağlantı Hatası
- Backend'in çalıştığından emin olun
- `src/services/api.ts` dosyasındaki baseURL'i kontrol edin
- Backend portunu kontrol edin (varsayılan: 5001)

### Build Hatası
```bash
npm install
npm run build
```
