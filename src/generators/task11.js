import utils from '../utils/utils';

export default function generateTask11() {
  // Создаем структуру файлов и папок
  const folders = {
    'Документы': {
      'Школа': {
        'Сочинение.txt': 'На летние каникулы...',
        'Реферат.pdf': 'История Древнего мира...'
      },
      'Работа': {
        'Отчет.docx': 'Годовой отчет за 2023...'
      }
    },
    'Медиа': {
      'Фото': {
        'Отдых.jpg': 'Фото с моря...',
        'Школа.png': 'Последний звонок...'
      },
      'Музыка': {
        'Плейлист1.mp3': 'Лучшие хиты...',
        'Плейлист2.mp3': 'Ретро волна...'
      }
    }
  };

  // Выбираем случайную папку и файл
  const folderNames = Object.keys(folders);
  const selectedFolder = utils.randomItem(folderNames);
  const subFolders = folders[selectedFolder];
  const subFolderNames = Object.keys(subFolders);
  
  // Собираем все файлы
  const allFiles = [];
  subFolderNames.forEach(subFolder => {
    const files = subFolders[subFolder];
    Object.keys(files).forEach(fileName => {
      allFiles.push({
        path: `${selectedFolder}/${subFolder}/${fileName}`,
        content: files[fileName]
      });
    });
  });

  // Выбираем случайный файл и фрагмент текста
  const selectedFile = utils.randomItem(allFiles);
  const sentences = selectedFile.content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const selectedText = utils.randomItem(sentences).trim() + '.';

  return {
    folder: selectedFolder,
    fileContent: selectedFile.content,
    searchText: selectedText,
    answer: selectedFile.path.split('/').pop(), // только имя файла
    explanation: `Файл находится в: ${selectedFile.path}`
  };
}