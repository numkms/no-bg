import json
import os

# Путь к папке с локализациями
LOCALES_DIR = 'locales'

# Переводы для каждого языка
TRANSLATIONS = {
    'cn.json': {
        "tutorial": "上传图片 - 只需从设备中选择文件。\n稍等片刻 - 我们将在几秒钟内处理您的图片。\n下载结果 - 点击图片块右上角的“下载”按钮。\n\n完成！🎉 现在您的图片已保存在设备上。🚀"
    },
    'de.json': {
        "tutorial": "Bild hochladen – wählen Sie einfach eine Datei von Ihrem Gerät aus.\nWarten Sie kurz – wir verarbeiten Ihr Bild in Sekundenschnelle.\nErgebnis herunterladen – klicken Sie auf die Schaltfläche „Herunterladen“ in der rechten Ecke des Bildblocks.\n\nFertig! 🎉 Jetzt ist Ihr Bild auf Ihrem Gerät gespeichert. 🚀"
    },
    'en.json': {
        "tutorial": "Upload an image – just select a file from your device.\nWait a bit – we'll process your picture in seconds.\nDownload the result – click the \"Download\" button in the top-right corner of the image block.\n\nDone! 🎉 Now your image is saved on your device. 🚀"
    },
    'es.json': {
        "tutorial": "Sube una imagen – simplemente selecciona un archivo de tu dispositivo.\nEspera un poco – procesaremos tu imagen en segundos.\nDescarga el resultado – haz clic en el botón \"Descargar\" en la esquina superior derecha del bloque de la imagen.\n\n¡Listo! 🎉 Ahora tu imagen está guardada en tu dispositivo. 🚀"
    },
    'fr.json': {
        "tutorial": "Téléchargez une image – sélectionnez simplement un fichier depuis votre appareil.\nAttendez un peu – nous traiterons votre image en quelques secondes.\nTéléchargez le résultat – cliquez sur le bouton \"Télécharger\" dans le coin supérieur droit du bloc d'image.\n\nTerminé ! 🎉 Votre image est maintenant enregistrée sur votre appareil. 🚀"
    },
    'hi.json': {
        "tutorial": "एक छवि अपलोड करें – बस अपने डिवाइस से एक फ़ाइल चुनें।\nथोड़ा प्रतीक्षा करें – हम आपकी तस्वीर को कुछ सेकंड में संसाधित कर देंगे।\nपरिणाम डाउनलोड करें – छवि ब्लॉक के शीर्ष-दाएं कोने में \"डाउनलोड\" बटन पर क्लिक करें।\n\nहो गया! 🎉 अब आपकी छवि आपके डिवाइस पर सहेजी गई है। 🚀"
    },
    'id.json': {
        "tutorial": "Unggah gambar – cukup pilih file dari perangkat Anda.\nTunggu sebentar – kami akan memproses gambar Anda dalam hitungan detik.\nUnduh hasilnya – klik tombol \"Unduh\" di sudut kanan atas blok gambar.\n\nSelesai! 🎉 Sekarang gambar Anda tersimpan di perangkat Anda. 🚀"
    },
    'it.json': {
        "tutorial": "Carica un'immagine – seleziona semplicemente un file dal tuo dispositivo.\nAttendi un po' – elaboreremo la tua immagine in pochi secondi.\nScarica il risultato – clicca sul pulsante \"Scarica\" nell'angolo in alto a destra del blocco immagine.\n\nFatto! 🎉 Ora la tua immagine è salvata sul tuo dispositivo. 🚀"
    },
    'ja.json': {
        "tutorial": "画像をアップロード – デバイスからファイルを選択するだけです。\n少し待つ – 数秒で画像を処理します。\n結果をダウンロード – 画像ブロックの右上にある「ダウンロード」ボタンをクリックします。\n\n完了！🎉 これで画像がデバイスに保存されました。🚀"
    },
    'kk.json': {
        "tutorial": "Сурет жүктеңіз – құрылғыңыздан файлды таңдаңыз.\nБіраз күтіңіз – біз суретті бірнеше секундта өңдейміз.\nНәтижені жүктеңіз – сурет блогының оң жақ жағындағы \"Жүктеу\" түймесін басыңыз.\n\nДайын! 🎉 Енді суретіңіз құрылғыңызда сақталды. 🚀"
    },
    'ko.json': {
        "tutorial": "이미지 업로드 – 장치에서 파일을 선택하세요.\n잠시 기다리세요 – 몇 초 안에 이미지를 처리합니다.\n결과 다운로드 – 이미지 블록의 오른쪽 상단에 있는 \"다운로드\" 버튼을 클릭하세요.\n\n완료! 🎉 이제 이미지가 장치에 저장되었습니다. 🚀"
    },
    'ky.json': {
        "tutorial": "Сүрөт жүктөө – түзмөктөн файлды тандаңыз.\nБир аз күтө туруңуз – биз сүрөтүңүздү бир нече секундада иштеп чыгабыз.\nНатыйжаны жүктөө – сүрөт блогунун оң жак бурчунан \"Жүктөө\" баскычын басыңыз.\n\nАякталды! 🎉 Эми сүрөтүңүз түзмөктө сакталды. 🚀"
    },
    'ms.json': {
        "tutorial": "Muat naik imej – pilih fail dari peranti anda.\nTunggu sebentar – kami akan memproses gambar anda dalam beberapa saat.\nMuat turun hasilnya – klik butang \"Muat Turun\" di sudut kanan atas blok imej.\n\nSelesai! 🎉 Sekarang imej anda disimpan dalam peranti anda. 🚀"
    },
    'pt.json': {
        "tutorial": "Carregue uma imagem – basta selecionar um arquivo do seu dispositivo.\nEspere um pouco – processaremos sua imagem em segundos.\nBaixe o resultado – clique no botão \"Baixar\" no canto superior direito do bloco de imagem.\n\nPronto! 🎉 Agora sua imagem está salva no seu dispositivo. 🚀"
    },
    'ru.json': {
        "tutorial": "Загрузите изображение – просто выберите файл с вашего устройства.\nПодождите немного – мы обработаем вашу картинку в считанные секунды.\nСкачайте результат – нажмите кнопку «Скачать» в правом углу блока с изображением.\n\nГотово! 🎉 Теперь ваше изображение у вас на устройстве. 🚀"
    },
    'th.json': {
        "tutorial": "อัปโหลดภาพ – เพียงเลือกไฟล์จากอุปกรณ์ของคุณ\nรอสักครู่ – เราจะประมวลผลภาพของคุณในไม่กี่วินาที\nดาวน์โหลดผลลัพธ์ – คลิกปุ่ม \"ดาวน์โหลด\" ที่มุมขวาบนของบล็อกภาพ\n\nเสร็จแล้ว! 🎉 ตอนนี้ภาพของคุณถูกบันทึกลงในอุปกรณ์แล้ว 🚀"
    },
    'tr.json': {
        "tutorial": "Bir resim yükleyin – cihazınızdan bir dosya seçin.\nBiraz bekleyin – resminizi saniyeler içinde işleyeceğiz.\nSonucu indirin – resim bloğunun sağ üst köşesindeki \"İndir\" düğmesine tıklayın.\n\nTamamlandı! 🎉 Artık resminiz cihazınıza kaydedildi. 🚀"
    },
    'uz.json': {
        "tutorial": "Rasm yuklang – qurilmangizdan faylni tanlang.\nBiroz kuting – biz rasmni bir necha soniyada ishlab chiqamiz.\nNatijani yuklab oling – rasm blokining o‘ng burchagidagi \"Yuklab olish\" tugmasini bosing.\n\nTayyor! 🎉 Endi rasm qurilmangizda saqlangan. 🚀"
    },
    'vi.json': {
        "tutorial": "Tải lên hình ảnh – chỉ cần chọn tệp từ thiết bị của bạn.\nChờ một chút – chúng tôi sẽ xử lý hình ảnh của bạn trong vài giây.\nTải kết quả – nhấp vào nút \"Tải xuống\" ở góc trên bên phải của khối hình ảnh.\n\nHoàn tất! 🎉 Bây giờ hình ảnh của bạn đã được lưu trên thiết bị. 🚀"
    }
}

def update_locale_files():
    # Проверяем существование папки locales
    if not os.path.exists(LOCALES_DIR):
        print(f"Папка {LOCALES_DIR} не существует!")
        return

    for filename, translation in TRANSLATIONS.items():
        filepath = os.path.join(LOCALES_DIR, filename)
        
        try:
            # Читаем существующий файл
            if os.path.exists(filepath):
                with open(filepath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
            else:
                data = {}
            
            # Добавляем перевод
            data.update(translation)
            
            # Записываем обратно
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
                f.write('\n')  # Добавляем перенос строки в конец файла
            
            print(f"Обновлен файл: {filename}")
            
        except Exception as e:
            print(f"Ошибка при обработке файла {filename}: {str(e)}")

if __name__ == '__main__':
    update_locale_files()
    print("Готово! Все файлы обновлены.")