export interface Script {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  price: string;
  rating: number;
  downloads: number;
  category: string;
  image: string;
  tags: string[];
  features: string[];
  compatibility: string[];
  author: string;
  lastUpdate: string;
}

export const scriptsData: Script[] = [
  {
    id: 1,
    title: "Auto Farm Ultimate",
    description: "Автоматическая ферма для большинства игр Roblox. Поддержка 50+ игр.",
    fullDescription: "Самый продвинутый скрипт автоматической фермы для Roblox. Поддерживает более 50 популярных игр, включая Blox Fruits, Pet Simulator, Adopt Me и многие другие. Умная система обхода античитов, настраиваемые параметры фарма, автосохранение прогресса.",
    price: "199₽",
    rating: 4.9,
    downloads: 15420,
    category: "Фарм",
    image: "/img/678ed511-631e-48e9-b4b1-4b896787a686.jpg",
    tags: ["автофарм", "универсальный", "многоигровой"],
    features: [
      "Поддержка 50+ игр",
      "Обход античитов",
      "Настраиваемые параметры",
      "Автосохранение",
      "24/7 работа"
    ],
    compatibility: ["Synapse X", "KRNL", "Fluxus", "Script-Ware"],
    author: "FarmMaster",
    lastUpdate: "2024-01-15"
  },
  {
    id: 2,
    title: "Speed Hack Pro",
    description: "Увеличение скорости персонажа с защитой от античитов.",
    fullDescription: "Профессиональный спид хак с продвинутой системой защиты. Плавное увеличение скорости без рывков, настраиваемая скорость от 16 до 500, автоматическое отключение при обнаружении админов.",
    price: "149₽",
    rating: 4.7,
    downloads: 8930,
    category: "Читы",
    image: "/img/d49096c0-91d8-499e-a34a-709b7e33a6fd.jpg",
    tags: ["скорость", "обход", "безопасный"],
    features: [
      "Настраиваемая скорость",
      "Защита от обнаружения",
      "Плавное ускорение",
      "Автоотключение",
      "Hotkey управление"
    ],
    compatibility: ["Synapse X", "KRNL", "Fluxus"],
    author: "SpeedDemon",
    lastUpdate: "2024-01-12"
  },
  {
    id: 3,
    title: "ESP Vision",
    description: "Видение сквозь стены и обнаружение игроков в радиусе.",
    fullDescription: "Продвинутый ESP с множеством настроек. Показывает игроков через стены, их здоровье, дистанцию, оружие. Настраиваемые цвета для команд, индикаторы угрозы, работает во всех играх.",
    price: "299₽",
    rating: 4.8,
    downloads: 12100,
    category: "Визуализация",
    image: "/img/07f54808-c290-479b-aa0d-035b9cf09958.jpg",
    tags: ["esp", "визуализация", "pvp"],
    features: [
      "Видение через стены",
      "Показ здоровья",
      "Индикатор дистанции",
      "Настраиваемые цвета",
      "Командные режимы"
    ],
    compatibility: ["Synapse X", "Script-Ware", "KRNL"],
    author: "VisionHacker",
    lastUpdate: "2024-01-10"
  },
  {
    id: 4,
    title: "GUI Builder",
    description: "Конструктор интерфейсов для создания собственных меню.",
    fullDescription: "Мощный инструмент для создания пользовательских интерфейсов. Drag&Drop редактор, готовые шаблоны, экспорт в код, поддержка анимаций и эффектов.",
    price: "399₽",
    rating: 4.6,
    downloads: 5670,
    category: "Инструменты",
    image: "/img/07f54808-c290-479b-aa0d-035b9cf09958.jpg",
    tags: ["gui", "конструктор", "ui"],
    features: [
      "Drag&Drop редактор",
      "Готовые шаблоны",
      "Экспорт кода",
      "Анимации",
      "Responsive дизайн"
    ],
    compatibility: ["Synapse X", "Script-Ware", "KRNL", "Fluxus"],
    author: "UICreator",
    lastUpdate: "2024-01-08"
  },
  {
    id: 5,
    title: "Aimbot Elite",
    description: "Точное наведение с настраиваемыми параметрами для шутеров.",
    fullDescription: "Профессиональный аимбот для FPS игр в Roblox. Плавное наведение, предсказание движения, настраиваемая зона прицеливания, защита от обнаружения.",
    price: "249₽",
    rating: 4.5,
    downloads: 9850,
    category: "Читы",
    image: "/img/d49096c0-91d8-499e-a34a-709b7e33a6fd.jpg",
    tags: ["aimbot", "шутер", "точность"],
    features: [
      "Плавное наведение",
      "Предсказание движения",
      "Настраиваемая зона",
      "Защита от VAC",
      "Hotkey система"
    ],
    compatibility: ["Synapse X", "Script-Ware"],
    author: "AimPro",
    lastUpdate: "2024-01-14"
  },
  {
    id: 6,
    title: "Pet Auto Hatch",
    description: "Автоматическое открытие яиц и управление питомцами.",
    fullDescription: "Специализированный скрипт для Pet Simulator и подобных игр. Автоматическое открытие яиц, продажа слабых питомцев, оптимизация инвентаря.",
    price: "179₽",
    rating: 4.4,
    downloads: 7200,
    category: "Фарм",
    image: "/img/678ed511-631e-48e9-b4b1-4b896787a686.jpg",
    tags: ["питомцы", "автооткрытие", "pet simulator"],
    features: [
      "Автооткрытие яиц",
      "Умная продажа",
      "Оптимизация инвентаря",
      "Статистика",
      "Множественные аккаунты"
    ],
    compatibility: ["KRNL", "Fluxus", "Delta"],
    author: "PetMaster",
    lastUpdate: "2024-01-11"
  }
];

export const categories = [
  "Все",
  "Фарм",
  "Читы", 
  "Визуализация",
  "Инструменты"
];