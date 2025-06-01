import utils from '../utils/utils';

export default function generateTask7() {
  // Генерация случайных данных для URL
  const protocols = ['http', 'https', 'ftp'];
  const domains = ['mail', 'school', 'exam', 'test', 'oge'];
  const domainZones = ['ru', 'com', 'org', 'net'];
  const fileNames = ['document', 'file', 'image', 'data'];
  const fileExtensions = ['pdf', 'doc', 'txt', 'jpg'];

  // Создаем компоненты URL
  const protocol = utils.randomItem(protocols);
  const domain = `${utils.randomItem(domains)}.${utils.randomItem(domainZones)}`;
  const fileName = `${utils.randomItem(fileNames)}.${utils.randomItem(fileExtensions)}`;

  // Создаем сегменты URL
  const segments = [
    protocol,
    '://',
    domain.split('.')[0] + '.',
    domain.split('.')[1],
    '/',
    fileName.split('.')[0] + '.',
    fileName.split('.')[1]
  ];

  // Перемешиваем сегменты и нумеруем
  const shuffledSegments = utils.shuffle(segments.map((seg, i) => ({
    segment: seg,
    originalIndex: i
  })));

  // Формируем правильный ответ (последовательность номеров)
  const answer = segments.map((_, i) => 
    shuffledSegments.findIndex(item => item.originalIndex === i) + 1
  ).join('');

  return {
    fileName,
    domain,
    protocol,
    segments: shuffledSegments.map((item, i) => ({
      number: i + 1,
      text: item.segment
    })),
    answer,
    explanation: `Правильная последовательность: ${protocol}://${domain}/${fileName}`
  };
}