export const company = {
  name: "Автоэксперт",
  city: "Белгород",
  phone: "+79040920381",
  phoneDisplay: "+7 (904) 092-03-81",
  address: "Белгород, ул. Мичурина, 79Б",
  vk: "https://vk.ru/deteilingtoall",
  avito: "https://www.avito.ru/belgorod/predlozheniya_uslug/antikorroziynaya_obrabotka_dnischa_arok_4538782513",
  maps: "https://yandex.ru/maps/-/CXrsYMly",
  reviewsUrl: "https://yandex.ru/maps/org/avtoekspert/36627590361/reviews/",
};

export const navigation = [
  { label: "Услуги", href: "#services" },
  { label: "Работы", href: "#works" },
  { label: "Цены", href: "#prices" },
  { label: "Контакты", href: "#contacts" },
];

export const photos = {
  anticor: { src: "/images/optimized/anticor.webp", width: 1215, height: 892, alt: "Нанесение антикоррозийного состава на днище автомобиля" },
  suspension: { src: "/images/optimized/suspension.webp", width: 533, height: 400, alt: "Подвеска и колёсная арка после обработки" },
  underbody: { src: "/images/optimized/underbody.webp", width: 533, height: 400, alt: "Защитное покрытие на днище автомобиля" },
  preparation: { src: "/images/optimized/preparation.webp", width: 500, height: 377, alt: "Кузов автомобиля укрыт перед антикоррозийной обработкой" },
  polishing: { src: "/images/optimized/polishing.webp", width: 1600, height: 1196, alt: "Мастер полирует капот автомобиля" },
  headlights: { src: "/images/optimized/headlights-before-after.webp", width: 960, height: 720, alt: "Сравнение фар до и после полировки: слева мутная поверхность, справа прозрачная" },
  body: { src: "/images/optimized/body-before-after.webp", width: 800, height: 600, alt: "Сравнение кузова после и до полировки: слева обработанный участок, справа видны круговые царапины" },
  polishingResult: { src: "/images/optimized/polishing-result.webp", width: 1600, height: 1197, alt: "Отражение освещения на капоте после полировки кузова" },
  headlightsPolishing: { src: "/images/optimized/headlights-polishing.webp", width: 1600, height: 900, alt: "Фара автомобиля во время полировки, кузов вокруг фары защищён малярной лентой" },
  soundproofing: { src: "/images/optimized/soundproofing.webp", width: 1000, height: 750, alt: "Салон автомобиля со снятой обшивкой и нанесёнными шумоизоляционными материалами" },
};

export const services = [
  { id: "anticor", number: "01", title: "Антикоррозийная обработка", price: 18000, description: "Защита днища, колёсных арок и скрытых полостей. Подготовка поверхности и нанесение составов поэтапно.", photo: photos.anticor },
  { id: "detailing", number: "02", title: "Детейлинг", price: 2500, description: "Внимание к состоянию и внешнему виду автомобиля. Обсудим необходимые работы и подберём уход.", photo: photos.polishing },
  { id: "coating", number: "03", title: "Нанесение защитного покрытия", price: 2500, description: "Дополнительная защита поверхности автомобиля. Состав и зоны нанесения согласуем перед началом работ." },
  { id: "polishing", number: "04", title: "Полировка", price: 5000, description: "Работа с поверхностью лакокрасочного покрытия: возвращаем блеск и устраняем поверхностные дефекты.", photo: photos.polishingResult },
  { id: "headlights", number: "05", title: "Полировка фар", price: 1000, description: "Восстановление прозрачности внешней поверхности фар.", photo: photos.headlightsPolishing },
  { id: "soundproofing", number: "06", title: "Шумоизоляция авто", price: null, description: "Работа с шумоизоляцией салона автомобиля. Зоны обработки, материалы и объём работ согласуем перед началом.", photo: photos.soundproofing },
];

export const principles = [
  { title: "Подготовка до нанесения", text: "Разборка, мойка днища со специальной химией и пескоструем, затем сушка. Защита начинается с подготовки поверхности." },
  { title: "Кузов под защитой", text: "Перед нанесением составов укрываем автомобиль. Обрабатываем нужные участки, сохраняя остальные поверхности чистыми." },
  { title: "Внимание к скрытым зонам", text: "Первый состав наносим в скрытые полости, на днище и арки. Дополнительный второй состав — на днище и колёсные арки." },
];

export const processSteps = [
  { title: "Приёмка автомобиля", text: "Принимаем автомобиль для антикоррозийной обработки и согласуем объём работ." },
  { title: "Разборка", text: "Разбираем необходимые элементы для доступа к обрабатываемым участкам." },
  { title: "Мойка и пескоструй", text: "Моем днище с применением специальной химии и пескоструя." },
  { title: "Сушка", text: "Просушиваем автомобиль перед нанесением защитных составов." },
  { title: "Упаковка автомобиля", text: "Укрываем кузов и поверхности, которые не должны контактировать с составом." },
  { title: "Первый состав", text: "Обрабатываем скрытые полости, днище и колёсные арки." },
  { title: "Дополнительный второй состав", text: "Наносим второй состав только на днище и колёсные арки." },
  { title: "Сборка", text: "Возвращаем снятые элементы автомобиля на место." },
  { title: "Двери, багажник и капот", text: "Обрабатываем двери, крышку багажника и капот." },
  { title: "Моторный отсек", text: "Выполняем обработку моторного отсека." },
  { title: "Дополнительные работы", text: "При необходимости выполняем сварочные и малярные работы." },
];

export const gallery = [
  { ...photos.anticor, title: "Нанесение защитного состава", label: "Антикоррозийная обработка" },
  { ...photos.underbody, title: "Защита днища", label: "Днище" },
  { ...photos.suspension, title: "Обработка подвески и арок", label: "Подвеска и арки" },
];

export const processPhases = [
  { title: "Подготовка", description: "Готовим поверхность и защищаем кузов.", start: 0, end: 5 },
  { title: "Нанесение защиты", description: "Поэтапно наносим антикоррозийные составы.", start: 5, end: 7 },
  { title: "Завершение", description: "Собираем автомобиль и обрабатываем остальные зоны.", start: 7, end: 11 },
];

export const comparisons = [
  { ...photos.headlights, title: "Полировка фар", description: "Прозрачность, которую видно.", order: "На фото: слева — до, справа — после." },
  { ...photos.body, title: "Полировка кузова", description: "Разница — в отражении.", order: "На фото: слева — после, справа — до." },
];

type CustomerReview = {
  id: string;
  author: string;
  level: string;
  date: string;
  dateTime: string | null;
  rating: number;
  pinned: boolean;
  text: string;
  source: "Avito" | "Яндекс Карты";
  sourceUrl: string;
  service?: string;
  excerpt?: boolean;
};

export const reviews: CustomerReview[] = [
  {
    id: "avito-kristina",
    author: "Кристина",
    level: "Клиент",
    date: "20 октября",
    dateTime: null,
    rating: 5,
    pinned: false,
    source: "Avito",
    sourceUrl: company.avito,
    service: "Антикоррозийная обработка днища и арок",
    excerpt: true,
    text: "Мастер Андрей сделал отличную обработку авто с зачисткой. … Хотелось бы также отметить, что мастер качественно и ответственно подходит к делу.",
  },
  {
    id: "avito-grin",
    author: "Грин",
    level: "Клиент",
    date: "10 октября",
    dateTime: null,
    rating: 5,
    pinned: false,
    source: "Avito",
    sourceUrl: company.avito,
    service: "Антикоррозийная обработка днища и арок",
    text: "Мастер своего дела",
  },
  {
    id: "avito-sergey",
    author: "Сергей",
    level: "Клиент",
    date: "27 сентября",
    dateTime: null,
    rating: 5,
    pinned: false,
    source: "Avito",
    sourceUrl: company.avito,
    service: "Антикоррозийная обработка днища и арок",
    text: "Работы были выполнены качественно и профессионально",
  },
  {
    id: "avito-leonid",
    author: "Леонид",
    level: "Клиент",
    date: "25 сентября",
    dateTime: null,
    rating: 5,
    pinned: false,
    source: "Avito",
    sourceUrl: company.avito,
    service: "Антикоррозийная обработка днища и арок",
    text: "Андрей отличный мастер, сделал все быстро и четко, как договаривались, цена отличная 🤝",
  },
  {
    id: "avito-yury-august",
    author: "Юрий",
    level: "Клиент",
    date: "19 августа",
    dateTime: null,
    rating: 5,
    pinned: false,
    source: "Avito",
    sourceUrl: company.avito,
    service: "Антикоррозийная обработка днища и арок",
    text: "Быстро, качественно, недорого.\nВсё как договаривались.",
  },
  {
    id: "avito-konstantin",
    author: "Константин",
    level: "Клиент",
    date: "19 августа",
    dateTime: null,
    rating: 5,
    pinned: false,
    source: "Avito",
    sourceUrl: company.avito,
    service: "Антикоррозийная обработка днища и арок",
    text: "Сделал антикоррозийную обработку авто, всё отлично! Ответственный подход и быстрые сроки исполнения!",
  },
  {
    id: "avito-yury-june",
    author: "Юрий",
    level: "Клиент",
    date: "23 июня",
    dateTime: null,
    rating: 5,
    pinned: false,
    source: "Avito",
    sourceUrl: company.avito,
    service: "Полировка кузова автомобиля",
    text: "Полировка кузова и нанесение керамики. Приехал на осмотр, договорились по цене и срокам. Всё было выполнено качественно и в указанный срок. Андрей был всегда на связи. Цены очень демократичные, качество отличное. Рекомендую данного мастера. Спасибо большое",
  },
  {
    id: "avito-arseny",
    author: "Арсений",
    level: "Клиент",
    date: "15 декабря 2024",
    dateTime: "2024-12-15",
    rating: 5,
    pinned: false,
    source: "Avito",
    sourceUrl: company.avito,
    service: "Антикоррозийная обработка днища",
    text: "Работу выполнили хорошо, дали много советов. К своей работе подходят ответственно, обращают внимание на мелочи.",
  },
  {
    id: "avito-dmitry",
    author: "Дмитрий",
    level: "Покупатель",
    date: "4 декабря 2024",
    dateTime: "2024-12-04",
    rating: 5,
    pinned: false,
    source: "Avito",
    sourceUrl: company.avito,
    service: "Покупка Asic antminer s9i — не автоуслуга",
    text: "Все как в описании ОК",
  },
  {
    id: "hainatsuuuuu",
    source: "Яндекс Карты",
    sourceUrl: company.reviewsUrl,
    author: "hainatsuuuuu .",
    level: "Знаток города 3 уровня",
    date: "7 октября",
    dateTime: null,
    rating: 5,
    pinned: true,
    text: "Отличные ребята , быстро не дорого и качественно сделали обработку днища , еще пригоним пару машин !",
  },
  {
    id: "alexej-sergejewitsch",
    source: "Яндекс Карты",
    sourceUrl: company.reviewsUrl,
    author: "Alexej Sergejewitsch",
    level: "Знаток города 3 уровня",
    date: "25 июня 2025",
    dateTime: "2025-06-25",
    rating: 5,
    pinned: false,
    text: 'Огромное спасибо команде СТО за профессионализм и оперативность! Мой автомобиль был в надежных руках. Все работы выполнены качественно и в срок. Обязательно буду рекомендовать друзьям!"',
  },
  {
    id: "rostislav-smirnov",
    source: "Яндекс Карты",
    sourceUrl: company.reviewsUrl,
    author: "Ростислав Смирнов",
    level: "Знаток города 3 уровня",
    date: "7 октября",
    dateTime: null,
    rating: 5,
    pinned: false,
    text: "Делали шумоизоляцию дверей, стало намного тише и музыка заиграла по другому, подсказали по обработке думаю в ближайшее время сделаем!",
  },
  {
    id: "kirill-golovchenko",
    source: "Яндекс Карты",
    sourceUrl: company.reviewsUrl,
    author: "кирилл головченко",
    level: "Знаток города 7 уровня",
    date: "9 января 2024",
    dateTime: "2024-01-09",
    rating: 5,
    pinned: false,
    text: "отличные ребята 👍",
  },
];
