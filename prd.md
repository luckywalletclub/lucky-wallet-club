# Product Requirements Document (PRD)

## 1. Amaç
Telegram üzerinde, kullanıcıların cüzdan görsellerine tıklayarak puan (ör: “Peels” yerine “Wallet Points”) topladığı, marketten yeni cüzdanlar alıp click kapasitesini artırabildiği, görevler ve streaklerle motivasyonun yüksek tutulduğu, reklam izleyerek boost kazanabildiği ve rekabetçi bir leaderboard ile sosyal etkileşimi teşvik eden bir clicker oyunu geliştirmek.

## 2. Hedef Kitle
- Telegram kullanıcıları (özellikle oyun, kripto, NFT, koleksiyon ilgisi olanlar)
- Basit, eğlenceli, ödüllü ve sosyal oyunları sevenler
- Günlük olarak uygulamaya girip puan toplamak isteyenler

## 3. Temel Oyun Mekanikleri
### 3.1. Ana Menü (Home)
- Ortada büyük bir cüzdan görseli (kullanıcının aktif cüzdanı)
- Kullanıcı, cüzdana tıkladıkça puan toplar (“Wallet Points”)
- Günlük click limiti (ör: default 500, marketten alınan cüzdanlarla artar)
- Toplam puan ve günlük kalan click hakkı gösterilir
- Click streak: Belirli aralıklarla (ör: 100, 200, 300 click) reklam izleyerek click başına puan çarpanı (x2, x3) kazanma imkanı

### 3.2. Market (Market)
- Farklı cüzdanlar (görsel ve nadirlik farkı)
- Her cüzdanın günlük click limiti ve puan çarpanı farklı
- Kullanıcı puan veya başka bir oyun içi para ile yeni cüzdanlar satın alabilir
- Satın alınan cüzdanlar “Bag”/“Inventory” ekranında listelenir, istenen cüzdan “Equip” edilerek ana menüde aktif edilir

### 3.3. Bag / Inventory
- Kullanıcının sahip olduğu tüm cüzdanlar
- Her cüzdanın adı, görseli, günlük click limiti, çarpanı, “Equip” ve “Sell” butonları
- Satılan cüzdanlar karşılığında puan veya oyun içi para alınır

### 3.4. Görevler (Tasks)
- Günlük/haftalık görevler (ör: 100 click yap, marketten cüzdan al, reklam izle, arkadaş davet et)
- Her görev tamamlandığında puan veya özel ödül kazanılır
- Her 3 görev tamamlandığında ekstra ödül (ör: yeni cüzdan, click hakkı, boost)

### 3.5. Boost / Streak
- Belirli click milestone’larında (ör: 100, 200, 300 click) reklam izleyerek click başına puan çarpanı (x2, x3) kazanma
- Streak bozulmazsa çarpan artar, bozulursa sıfırlanır

### 3.6. Leaderboard
- Günlük, haftalık, toplam puan sıralaması
- En çok puan toplayanlar ödüllendirilir (ileride token ödülü entegre edilebilir)
- Arkadaş davetiyle ekstra puan veya ödül kazanma

## 4. Ekstra Özellikler ve Öneriler
- Referans Sistemi: Kullanıcılar referans linkiyle arkadaş davet edebilir, her davet ödül kazandırır.
- Reklam Entegrasyonu: Boost ve ekstra click hakkı için reklam izleme (AdMob, AdSense, vs.)
- Bildirimler: Günlük click hakkı dolduğunda, görev tamamlandığında, markette yeni ürün çıktığında bildirim.
- Tema ve UI: Renkli, eğlenceli, mobil uyumlu ve Telegram WebApp’e uygun modern arayüz.
- Güvenlik: Hileye karşı click rate limit, backend doğrulama, kullanıcı kimliği Telegram’dan alınacak.

## 5. Teknik Gereksinimler
- Frontend: React.js veya Phaser.js (clicker ve animasyon için)
- Backend: Node.js (Express), MongoDB (kullanıcı, puan, cüzdan, görev, leaderboard verisi)
- Telegram Bot: Node.js (Telegraf veya node-telegram-bot-api)
- WebApp: Telegram WebApp API ile kullanıcı doğrulama
- Reklam: WebApp içinde video reklam SDK’sı veya harici reklam entegrasyonu

## 6. Minimum Viable Product (MVP)
- Ana menüde clicker ve puan toplama
- Günlük click limiti
- Marketten cüzdan satın alma ve equip etme
- Görevler ve ödüller
- Leaderboard
- Basit referans sistemi
- Reklam izleyerek boost alma

## 7. Gelişim ve Gelecek Planı
- Token entegrasyonu ve ödül dağıtımı
- NFT veya blockchain ile cüzdanların gerçek sahipliği
- Daha fazla görev, cüzdan ve sosyal özellik
- Mobil uygulama veya web dışında farklı platformlara açılım

## 8. Başarı Kriterleri
- Günlük aktif kullanıcı sayısı
- Toplam click ve puan miktarı
- Görev ve market etkileşimi
- Reklam izlenme oranı
- Arkadaş davetiyle gelen yeni kullanıcı sayısı

## 9. Riskler ve Önlemler
- Hileli click: Backend rate limit, anti-bot koruması
- Reklam engelleyici: Alternatif ödül sistemleri
- Telegram API değişiklikleri: Güncel dokümantasyon takibi

## 10. Notlar ve İlham
- Banana oyunu gibi, kullanıcıyı günlük olarak uygulamaya çekmek ve sosyal etkileşimi artırmak ana hedef.
- Oyun içi ekonomi ve ödül sistemi, ileride token ile büyütülebilir.
- Kullanıcıya sürekli yeni hedefler ve ödüller sunmak, motivasyonu yüksek tutar. 

## 11. Ekstra Öneriler ve Dikkat Edilmesi Gerekenler

- **Token Vaadi ve Regülasyon:**  Token ödülü vaat etmek, bazı ülkelerde yasal riskler doğurabilir. “Puanlar ileride token ile değiştirilebilir” gibi esnek bir dil kullanmak daha güvenli olur.

- **Anti-bot ve Hile:**  Clicker oyunlarında bot ve otomasyon riski çok yüksek. Rate limit, captcha, davranış analizi gibi önlemler şart.

- **Reklam İzleme:**  Kullanıcılar reklam izlemeye zorlanırsa sıkılabilir. Boost ve ekstra haklar için reklam izleme opsiyonel olmalı, ana ilerleme reklam izlemeye bağlı olmamalı.

- **Puan Enflasyonu:**  Çok fazla puan veya ödül dağıtılırsa, ileride token ekonomisi zarar görebilir. Puan/ödül dengesi iyi ayarlanmalı.

- **Market ve Koleksiyon Derinliği:**  Başlangıçta az sayıda cüzdan ve basit market yeterli, ama zamanla yeni cüzdanlar, skinler, upgrade sistemleri eklenmeli.

- **Sosyal Etkileşim:**  Arkadaşlarla yarışma, takım kurma, grup görevleri gibi sosyal özellikler eklenirse oyun daha uzun ömürlü olur.

- **Koleksiyon ve Özelleştirme:**  Cüzdanlara skin, renk, animasyon gibi özelleştirmeler ekle. Nadir cüzdanlar, upgrade sistemi, limited edition gibi koleksiyon motivasyonları ekle.

- **Ekstra Mini Oyunlar:**  Sadece clicker değil, arada şans oyunu, quiz, puzzle gibi mini oyunlar da ekleyebilirsin.

- **Kullanıcıya Şeffaflık:**  Token ödülü ileride gelecekse, “puanlarınız ileride token ile değiştirilebilir” gibi net ama yasal olarak esnek bir dil kullan.

- **Mobil ve Telegram WebApp Uyumu:**  UI/UX’i tamamen mobil ve Telegram WebApp’e uygun, hızlı ve sade tut.

- **Başlangıçta MVP’ye Odaklan:**  Ana clicker, market, görev, leaderboard ve referans sistemiyle başla. Token ve karmaşık ekonomi işini ileride ekle. 