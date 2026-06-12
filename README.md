# 🤖 BOT DEVELOPER SYSTEM — Telegram Mini App

Профессиональный Telegram Mini App в стиле Cyber Security Dashboard.

## 📁 Структура файлов

```
tg-miniapp/
├── index.html    — главная страница
├── styles.css    — все стили (тема, анимации, компоненты)
├── app.js        — логика, данные, навигация
└── README.md     — эта инструкция
```

## 🚀 Быстрый старт

### 1. Загрузить файлы на хостинг

Подходит любой статический хостинг с HTTPS:
- **Vercel** (бесплатно): `vercel deploy`
- **Netlify** (бесплатно): перетащить папку на netlify.com
- **GitHub Pages**: включить Pages в настройках репозитория
- **Свой сервер**: любой nginx/apache

> ⚠️ **Обязательно HTTPS** — Telegram Mini App работает только по HTTPS.

### 2. Настроить бота через @BotFather

```
/newbot       → создать бота (если нет)
/mybots       → выбрать бота
→ Bot Settings
→ Menu Button  (или через /setmenubutton)
→ Вставить URL вашего хостинга
```

Или через команду:
```
/setmenubutton
→ выбрать бота
→ вставить URL: https://ваш-домен.com/
→ задать название кнопки: "🤖 Открыть сервис"
```

### 3. Персонализация

Откройте `app.js` и измените:

```js
// Контактные данные (в index.html):
// href="https://t.me/yourusername"  → ваш Telegram
// href="https://wa.me/79000000000"  → ваш WhatsApp
// href="mailto:dev@example.com"     → ваш email

// Текст контактов:
// @yourusername → ваш username
// +7 (900) 000-00-00 → ваш номер
// dev@example.com → ваш email

// Статистика (в index.html, секция STATS):
// data-target="120"  → ваше кол-во проектов
// data-target="47"   → ваше кол-во клиентов
```

### 4. Обработка заявок

При отправке формы приложение вызывает `Telegram.WebApp.sendData(json)`.
Чтобы принимать заявки в бот, добавьте в боте обработчик:

**Python (aiogram):**
```python
@dp.message(content_types=['web_app_data'])
async def handle_webapp(message: Message):
    import json
    data = json.loads(message.web_app_data.data)
    await message.answer(
        f"📩 Новая заявка!\n"
        f"👤 Имя: {data['name']}\n"
        f"📱 TG: {data['tg']}\n"
        f"📦 Тип: {data['type']}\n"
        f"💬 Задача: {data['desc']}\n"
        f"💰 Бюджет: {data['budget']}"
    )
```

**Node.js (Telegraf):**
```js
bot.on('web_app_data', (ctx) => {
  const data = JSON.parse(ctx.message.web_app_data.data);
  ctx.reply(`📩 Новая заявка от ${data.name} (${data.tg})`);
});
```

## 🎨 Кастомизация

### Цвета (в styles.css, :root)
```css
--green: #00ff88;   /* неоновый зелёный */
--blue:  #00d9ff;   /* голубой */
--bg:    #050505;   /* фон */
```

### Портфолио (в app.js, PORTFOLIO)
Добавьте/замените объекты в массиве `PORTFOLIO`.

### Услуги (в app.js, SERVICES)
Добавьте/замените объекты в массиве `SERVICES`.

### Отзывы (в app.js, REVIEWS)
Добавьте/замените объекты в массиве `REVIEWS`.

## 📱 Совместимость

- ✅ iOS Telegram
- ✅ Android Telegram  
- ✅ Telegram Desktop
- ✅ Telegram Web

## ⚡ Возможности

- Анимированная сетка и частицы на canvas
- Glitch-эффект заголовка
- Typing effect для подзаголовка
- Animated counters для статистики
- Glassmorphism карточки
- Neon glow hover-эффекты
- Scan line анимация
- Bottom sheet модалка
- Загрузочный экран с прогресс-баром
- Интеграция с Telegram WebApp API (данные юзера, sendData)
- Полная адаптивность

---
Разработано как Telegram Mini App | HTML5 + CSS3 + JS + Telegram WebApp API
