# Гайд по деплою и обновлению Node.js приложения на Ubuntu сервере

## 🚀 Первоначальная настройка (делается один раз)

### Установка необходимого ПО
```bash
# Обновляем пакеты
sudo apt-get update

# Устанавливаем Git, Node.js и npm
sudo apt-get install -y git nodejs npm

# Устанавливаем PM2 глобально
sudo npm install pm2 -g

# Клонируем репозиторий (замените URL на ваш)
git clone https://github.com/KirillBobkov/nonverbal-programming-nodejs.git nonverbal-programming-nodejs

cd nonverbal-programming-nodejs

# добавить env файл!!!

# Устанавливаем зависимости
npm install

# Собираем проект
npm run build

# Запускаем приложение
pm2 start npm --name "nonverbal-programming" -- run start:prod

# Настраиваем автозапуск PM2 после перезагрузки сервера
pm2 startup
pm2 save
```

---

## 🔄 Обновление приложения (регулярно)

### Когда у вас есть новый код в GitHub:

1. **Подключитесь к серверу:**
```bash
ssh root@ВАШ_IP_АДРЕС
```

2. **Перейдите в папку проекта:**
```bash
cd nonverbal-programming-nodejs
```

3. **Скачайте последние изменения:**
```bash
git pull origin main
```

4. **Обновите зависимости (если добавлялись новые пакеты):**
```bash
npm install
```

5. **Пересоберите проект:**
```bash
npm run build
```

6. **Перезапустите приложение:**
```bash
pm2 restart nonverbal-programming
```

---

## 📋 Полезные команды PM2

### Управление приложением:
```bash
# Посмотреть статус всех приложений
pm2 status

# Посмотреть логи приложения
pm2 logs nonverbal-programming

# Посмотреть логи в реальном времени
pm2 logs nonverbal-programming --lines 50

# Остановить приложение
pm2 stop nonverbal-programming

# Запустить приложение
pm2 start nonverbal-programming

# Перезапустить приложение
pm2 restart nonverbal-programming

# Удалить приложение из PM2
pm2 delete nonverbal-programming

# Очистить логи
pm2 flush
```

### Мониторинг:
```bash
# Посмотреть использование ресурсов
pm2 monit

# Показать детальную информацию о приложении
pm2 show nonverbal-programming
```

---

## 🆘 Быстрое решение проблем

### Если приложение не запускается:
```bash
# Посмотрите логи ошибок
pm2 logs nonverbal-programming --err

# Проверьте, собрался ли проект
ls -la dist/

# Попробуйте запустить вручную для отладки
npm run start:prod
```

### Если нужно откатиться к предыдущей версии:
```bash
# Посмотрите последние коммиты
git log --oneline -10

# Откатитесь к нужному коммиту (замените HASH на нужный)
git reset --hard COMMIT_HASH

# Пересоберите и перезапустите
npm run build
pm2 restart nonverbal-programming
```

### Если нужно очистить кеш npm:
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

---

## 🔥 Экспресс-команда для быстрого обновления

Создайте скрипт для автоматизации. Создайте файл `update.sh`:

```bash
#!/bin/bash
echo "🔄 Обновляем приложение..."

# Скачиваем изменения
git pull origin main

# Устанавливаем зависимости
npm install

# Собираем проект
npm run build

# Перезапускаем приложение
pm2 restart nonverbal-programming

echo "✅ Приложение обновлено!"

# Показываем статус
pm2 status
```

Сделайте файл исполняемым:
```bash
chmod +x update.sh
```

Теперь для обновления просто запускайте:
```bash
./update.sh
```

---

## 💡 Советы по безопасности

1. **Всегда проверяйте логи после обновления:**
```bash
pm2 logs nonverbal-programming --lines 20
```

2. **Делайте бэкап перед крупными обновлениями:**
```bash
# Создайте ветку с текущим состоянием
git checkout -b backup-$(date +%Y%m%d)
git checkout main
```

3. **Настройте GitHub Webhooks для автоматического деплоя** (продвинутый уровень)

---

## 🎯 Чек-лист после каждого обновления

- [ ] `git pull` выполнен успешно
- [ ] `npm install` прошел без ошибок  
- [ ] `npm run build` создал файлы в папке `dist/`
- [ ] `pm2 restart` выполнен
- [ ] `pm2 status` показывает статус "online"
- [ ] Логи не содержат критических ошибок
- [ ] Приложение отвечает на тестовый запрос 