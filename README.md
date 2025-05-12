# Проект - тестовое задание авито
## Для начала работы, необходимо:
  - Открыть консль
  - Выбрать папку в которую клонировать проект(На Win: `cd folderName`)
  - Ввести в консоли `git clone URL`
  - Перейти в проет и ввести `npm install`, для скачивания всех зависимостей
  - `npm start` запускает проект на url указанном в environment(.env) и состоит из localhost+PORT, стандартынй порт - 3002 
  - api:
    - /apiKey - принимает json {"key": OpenAIApiKey}, получить можно OpenAIApi('https://openai.com/api/')
- Использованный стек:
  - nodejs+express