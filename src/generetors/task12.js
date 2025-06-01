import utils from '../utils/utils';

export default function generateTask12() {
  // Структура папок и файлов
  const fileSystem = {
    'Документы': {
      'Школа': {
        'сочинение.txt': '',
        'реферат.pdf': '',
        'презентация.pptx': ''
      },
      'Работа': {
        'отчет.docx': '',
        'книга.pdf': '',
        'данные.xlsx': ''
      }
    },
    'Медиа': {
      'Фото': {
        'отпуск.jpg': '',
        'день_рождения.png': ''
      },
      'Музыка': {
        'хит.mp3': '',
        'классика.wav': ''
      }
    }
  };

  // Список всех возможных расширений
  const allExtensions = ['txt', 'pdf', 'docx', 'pptx', 'xlsx', 'jpg', 'png', 'mp3', 'wav'];
  
  // Выбираем случайное расширение
  const targetExtension = utils.randomItem(allExtensions);
  
  // Выбираем случайную папку для поиска
  const folderNames = Object.keys(fileSystem);
  const targetFolder = utils.randomItem(folderNames);
  
  // Функция для подсчета файлов с нужным расширением
  function countFiles(folder, ext) {
    let count = 0;
    
    function traverse(current) {
      Object.keys(current).forEach(key => {
        if (typeof current[key] === 'object') {
          traverse(current[key]); // Это папка, идем глубже
        } else {
          // Это файл, проверяем расширение
          const fileExt = key.split('.').pop().toLowerCase();
          if (fileExt === ext) {
            count++;
          }
        }
      });
    }
    
    traverse(folder);
    return count;
  }
  
  // Подсчитываем файлы с нужным расширением
  const answer = countFiles(fileSystem[targetFolder], targetExtension);

  return {
    folder: targetFolder,
    extension: targetExtension,
    answer,
    explanation: `В папке ${targetFolder} найдено ${answer} файлов с расширением .${targetExtension}`
  };
}