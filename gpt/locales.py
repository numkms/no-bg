import json
import os

# Путь к папке с локализациями
LOCALES_DIR = 'locales'

# Переводы фразы "How to use?" для каждого языка
HOW_TO_USE_TRANSLATIONS = {
    'cn.json': {
        "how_to_use": "如何使用？"
    },
    'de.json': {
        "how_to_use": "Wie benutzt man?"
    },
    'en.json': {
        "how_to_use": "How to use?"
    },
    'es.json': {
        "how_to_use": "¿Cómo usar?"
    },
    'fr.json': {
        "how_to_use": "Comment utiliser?"
    },
    'hi.json': {
        "how_to_use": "कैसे उपयोग करें?"
    },
    'id.json': {
        "how_to_use": "Bagaimana cara menggunakan?"
    },
    'it.json': {
        "how_to_use": "Come usare?"
    },
    'ja.json': {
        "how_to_use": "使い方？"
    },
    'kk.json': {
        "how_to_use": "Қалай қолдануға болады?"
    },
    'ko.json': {
        "how_to_use": "사용 방법?"
    },
    'ky.json': {
        "how_to_use": "Кантип колдонуу керек?"
    },
    'ms.json': {
        "how_to_use": "Bagaimana cara menggunakan?"
    },
    'pt.json': {
        "how_to_use": "Como usar?"
    },
    'ru.json': {
        "how_to_use": "Как использовать?"
    },
    'th.json': {
        "how_to_use": "วิธีใช้?"
    },
    'tr.json': {
        "how_to_use": "Nasıl kullanılır?"
    },
    'uz.json': {
        "how_to_use": "Qanday foydalaniladi?"
    },
    'vi.json': {
        "how_to_use": "Cách sử dụng?"
    }
}

def add_how_to_use_translations():
    # Проверяем существование папки locales
    if not os.path.exists(LOCALES_DIR):
        print(f"Папка {LOCALES_DIR} не существует!")
        return

    for filename, translation in HOW_TO_USE_TRANSLATIONS.items():
        filepath = os.path.join(LOCALES_DIR, filename)
        
        try:
            # Читаем существующий файл
            if os.path.exists(filepath):
                with open(filepath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
            else:
                data = {}
            
            # Добавляем перевод, только если его еще нет
            if "how_to_use" not in data:
                data.update(translation)
                
                # Записываем обратно
                with open(filepath, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                    f.write('\n')  # Добавляем перенос строки в конец файла
                
                print(f"Добавлен перевод в файл: {filename}")
            else:
                print(f"Перевод уже существует в файле: {filename} (пропуск)")
            
        except Exception as e:
            print(f"Ошибка при обработке файла {filename}: {str(e)}")

if __name__ == '__main__':
    add_how_to_use_translations()
    print("Готово! Все файлы обработаны.")