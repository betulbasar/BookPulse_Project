# BookPulse Test Talimatları

## 🚀 Hızlı Başlangıç

### 1. Backend'i Başlatın (İlk Terminal)

```bash
# Proje kök dizininde
dotnet run
```

Backend başarıyla çalıştığında şu mesajı göreceksiniz:
```
Now listening on: http://localhost:5000
```

✅ Backend hazır! Swagger UI: http://localhost:5000/swagger

---

### 2. Frontend'i Başlatın (İkinci Terminal)

Yeni bir terminal açın ve:

```bash
# Frontend klasörüne gidin
cd frontend

# Frontend'i başlatın
npm run dev
```

Frontend başarıyla çalıştığında şu mesajı göreceksiniz:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

✅ Frontend hazır! Tarayıcıda açın: http://localhost:5173

---

## 📝 Test Senaryoları

### Senaryo 1: Dashboard'u Görüntüleme
1. Tarayıcıda http://localhost:5173 açın
2. Dashboard sayfasında istatistikleri görün
3. Toplam kitap, aktif üye, aktif ödünç sayılarını kontrol edin

### Senaryo 2: Kitap Ekleme
1. "Kitaplar" menüsüne tıklayın
2. "Yeni Kitap Ekle" butonuna tıklayın
3. Formu doldurun:
   - Kitap Başlığı: "Suç ve Ceza"
   - Yazar: "Fyodor Dostoyevski"
   - ISBN: "978-975-08-1234-5" (opsiyonel)
   - Toplam Kopya Sayısı: 5
4. "Kaydet" butonuna tıklayın
5. Kitabın listeye eklendiğini görün

### Senaryo 3: Üye Ekleme
1. "Üyeler" menüsüne tıklayın
2. "Yeni Üye Ekle" butonuna tıklayın
3. Formu doldurun:
   - Ad: "Ahmet"
   - Soyad: "Yılmaz"
   - Email: "ahmet@example.com"
   - Telefon: "0555-123-4567" (opsiyonel)
4. "Kaydet" butonuna tıklayın
5. Üyenin listeye eklendiğini görün

### Senaryo 4: Kitap Ödünç Verme
1. "Ödünçler" menüsüne tıklayın
2. "Yeni Ödünç" butonuna tıklayın
3. Formu doldurun:
   - Kitap: Dropdown'dan bir kitap seçin (sadece mevcut kopyası olanlar görünür)
   - Üye: Dropdown'dan bir üye seçin (sadece aktif üyeler görünür)
   - Ödünç Süresi: 14 (varsayılan)
4. "Kaydet" butonuna tıklayın
5. Ödünçün listeye eklendiğini görün
6. Kitabın mevcut kopya sayısının azaldığını kontrol edin (Kitaplar sayfasında)

### Senaryo 5: Kitap İade Etme
1. "Ödünçler" sayfasında "Aktif" filtresine tıklayın
2. İade etmek istediğiniz ödünç için "İade Et" butonuna tıklayın
3. Onay mesajını kabul edin
4. Ödüncün "İade Edilmiş" durumuna geçtiğini görün
5. Kitabın mevcut kopya sayısının arttığını kontrol edin

### Senaryo 6: Arama Özelliği
1. Kitaplar sayfasında arama kutusuna "Suç" yazın
2. İlgili kitapların filtrelendiğini görün
3. Üyeler sayfasında bir üye adı veya email'i arayın
4. Sonuçların filtrelendiğini görün

---

## ⚠️ Sorun Giderme

### Backend Başlamıyor
- PostgreSQL'in çalıştığından emin olun
- `appsettings.json` dosyasındaki connection string'i kontrol edin
- Veritabanı migration'larının yapıldığından emin olun:
  ```bash
  dotnet ef database update
  ```

### Frontend Başlamıyor
- Node.js'in yüklü olduğundan emin olun: `node --version`
- Bağımlılıkları yükleyin: `npm install`
- Port 5173'in kullanımda olmadığından emin olun

### API Bağlantı Hatası
- Backend'in çalıştığından emin olun (http://localhost:5000/swagger)
- Frontend'teki API URL'ini kontrol edin: `frontend/src/services/api.ts`
- Tarayıcı konsolunda (F12) hata mesajlarını kontrol edin

### CORS Hatası
- Backend'in CORS yapılandırmasını kontrol edin (`Program.cs`)
- Backend'i yeniden başlatın

---

## 🎯 Başarı Kriterleri

✅ Backend çalışıyor ve Swagger'da API'ler görünüyor
✅ Frontend çalışıyor ve sayfalar yükleniyor
✅ Kitaplar eklenebiliyor, görüntülenebiliyor ve silinebiliyor
✅ Üyeler eklenebiliyor, görüntülenebiliyor ve silinebiliyor
✅ Ödünçler oluşturulabiliyor ve iade edilebiliyor
✅ Arama ve filtreleme çalışıyor
✅ Form validasyonları çalışıyor

---

## 📞 Yardım

Sorun yaşıyorsanız:
1. Tarayıcı konsolunu açın (F12)
2. Network sekmesinde API isteklerini kontrol edin
3. Backend loglarını kontrol edin
4. Hata mesajlarını not edin
