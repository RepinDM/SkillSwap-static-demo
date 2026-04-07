import { useState } from 'react';
import { Input } from '../../shared/ui/input/input';
import styles from './FilterSidebar.module.scss';
import crossIcon from '../../shared/image/icons/cross.svg';
import chevronDownIcon from '../../shared/image/icons/chevron-down.svg';
import chevronUpIcon from '../../shared/image/icons/chevron-up.svg';

// Временные типы для будущей логики
interface FiltersSidebarProps {
  values?: any;
  onChange?: (values: any) => void;
}

// Хардкоженные данные
const ALL_CATEGORIES = [
  { id: 1, name: 'Бизнес и карьера', slug: 'business-career' },
  { id: 2, name: 'Творчество и искусство', slug: 'creativity-art' },
  { id: 3, name: 'Иностранные языки', slug: 'foreign-languages' },
  { id: 4, name: 'Образование и развитие', slug: 'education-development' },
  { id: 5, name: 'Дом и уют', slug: 'home-comfort' },
  { id: 6, name: 'Здоровье и лайфстайл', slug: 'health-lifestyle' },
  { id: 7, name: 'Технологии и IT', slug: 'tech-it' },
  { id: 8, name: 'Спорт и фитнес', slug: 'sports-fitness' },
  { id: 9, name: 'Кулинария', slug: 'cooking' },
  { id: 10, name: 'Фотография и видео', slug: 'photo-video' },
];

// Первые 5 категорий для начального отображения
const INITIAL_CATEGORIES = ALL_CATEGORIES.slice(0, 5);
const HIDDEN_CATEGORIES = ALL_CATEGORIES.slice(5);

// Подкатегории для примера (для каждой категории)
const SUBCATEGORIES: Record<number, { id: number; name: string }[]> = {
  1: [
    { id: 1, name: 'Маркетинг и реклама' },
    { id: 2, name: 'Управление проектами' },
    { id: 3, name: 'Финансы и инвестиции' },
    { id: 4, name: 'Стартапы' },
  ],
  2: [
    { id: 5, name: 'Музыка и звук' },
    { id: 6, name: 'Рисование и иллюстрация' },
    { id: 7, name: 'Фотография и видео' },
    { id: 8, name: 'Дизайн' },
  ],
  3: [
    { id: 9, name: 'Английский' },
    { id: 10, name: 'Французский' },
    { id: 11, name: 'Немецкий' },
    { id: 12, name: 'Испанский' },
    { id: 13, name: 'Китайский' },
  ],
  4: [
    { id: 14, name: 'Навыки обучения' },
    { id: 15, name: 'Когнитивные техники' },
    { id: 16, name: 'Тайм-менеджмент' },
    { id: 17, name: 'Память и внимание' },
  ],
  5: [
    { id: 18, name: 'Приготовление еды' },
    { id: 19, name: 'Ремонт' },
    { id: 20, name: 'Садоводство' },
    { id: 21, name: 'Декор' },
  ],
  6: [
    { id: 22, name: 'Йога и медитация' },
    { id: 23, name: 'Питание и ЗОЖ' },
    { id: 24, name: 'Фитнес' },
    { id: 25, name: 'Ментальное здоровье' },
  ],
  7: [
    { id: 26, name: 'Программирование' },
    { id: 27, name: 'Data Science' },
    { id: 28, name: 'DevOps' },
    { id: 29, name: 'Кибербезопасность' },
  ],
  8: [
    { id: 30, name: 'Футбол' },
    { id: 31, name: 'Баскетбол' },
    { id: 32, name: 'Теннис' },
    { id: 33, name: 'Плавание' },
  ],
  9: [
    { id: 34, name: 'Выпечка' },
    { id: 35, name: 'Национальная кухня' },
    { id: 36, name: 'Десерты' },
    { id: 37, name: 'Веганская кухня' },
  ],
  10: [
    { id: 38, name: 'Портретная съемка' },
    { id: 39, name: 'Пейзажная съемка' },
    { id: 40, name: 'Видеомонтаж' },
    { id: 41, name: 'Цветокоррекция' },
  ],
};

// Все города
const ALL_CITIES = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Красноярск', 'Челябинск', 'Самара', 'Ростов-на-Дону'];
const INITIAL_CITIES = ALL_CITIES.slice(0, 5);
const HIDDEN_CITIES = ALL_CITIES.slice(5);

export const FiltersSidebar = ({ /* values, onChange */ }: FiltersSidebarProps) => {
  // Состояния для аккордеона категорий
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});
  
  // Состояния для "показать все"
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);

  // Временно хардкоженные значения (потом будут из пропсов)
  const [mainRadioValue, setMainRadioValue] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<Record<number, number[]>>({});
  const [authorGenderValue, setAuthorGenderValue] = useState('any');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleCategoryCheckboxChange = (categoryId: number, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, categoryId]);
    } else {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));

      setSelectedSubcategories(prev => {
        const newState = { ...prev };
        delete newState[categoryId];
        return newState;
      });
      
      // ИСПРАВЛЕНИЕ ПУНКТА 2: Закрываем подкатегории при снятии галочки с категории
      setExpandedCategories(prev => ({
        ...prev,
        [categoryId]: false
      }));
    }
  };

  const handleSubcategoryCheckboxChange = (categoryId: number, subcategoryId: number, checked: boolean) => {
    setSelectedSubcategories(prev => {
      const currentSubs = prev[categoryId] || [];
      let newSubs;
      if (checked) {
        newSubs = [...currentSubs, subcategoryId];
      } else {
        newSubs = currentSubs.filter(id => id !== subcategoryId);
      }
      
      if (newSubs.length === 0) {
        const { [categoryId]: _, ...rest } = prev;
        return rest;
      }
      
      return { ...prev, [categoryId]: newSubs };
    });
  };

  const handleCityCheckboxChange = (city: string, checked: boolean) => {
    if (checked) {
      setSelectedCities(prev => [...prev, city]);
    } else {
      setSelectedCities(prev => prev.filter(c => c !== city));
    }
  };

  const handleReset = () => {
    setMainRadioValue('all');
    setSelectedCategories([]);
    setSelectedSubcategories({});
    setAuthorGenderValue('any');
    setSelectedCities([]);
    setShowAllCategories(false);
    setShowAllCities(false);
    // Сброс состояний аккордеона
    setExpandedCategories({});
  };

  // Функция для переключения "Все категории"
  const toggleAllCategories = () => {
    setShowAllCategories(!showAllCategories);
  };

  // Функция для переключения "Все города"
  const toggleAllCities = () => {
    setShowAllCities(!showAllCities);
  };

  const displayedCategories = showAllCategories ? ALL_CATEGORIES : INITIAL_CATEGORIES;
  const displayedCities = showAllCities ? ALL_CITIES : INITIAL_CITIES;

  return (
    <aside className={styles.sidebar}>
      {/* Заголовок */}
      <div className={styles.header}>
        <h3 className={styles.title}>Фильтры (2)</h3>
        <button className={styles.resetButton} onClick={handleReset}>
          Сбросить
          <img src={crossIcon} alt="Сбросить" className={styles.resetIcon} />
        </button>
      </div>

      {/* Основной блок фильтров */}
      <div className={styles.filtersWrapper}>
        {/* Radio группа основная */}
        <div className={styles.filterGroup}>
          <div className={styles.radioGroup}>
            <Input
              type="radio"
              name="mainFilter"
              label="Всё"
              value="all"
              checked={mainRadioValue === 'all'}
              onChange={() => setMainRadioValue('all')}
            />
            <Input
              type="radio"
              name="mainFilter"
              label="Хочу научиться"
              value="wantLearn"
              checked={mainRadioValue === 'wantLearn'}
              onChange={() => setMainRadioValue('wantLearn')}
            />
            <Input
              type="radio"
              name="mainFilter"
              label="Могу научить"
              value="canTeach"
              checked={mainRadioValue === 'canTeach'}
              onChange={() => setMainRadioValue('canTeach')}
            />
          </div>
        </div>

        {/* Категории навыков */}
        <div className={styles.filterGroup}>
          <div className={styles.sectionHeader}>
            <h4 className={styles.sectionTitle}>Навыки</h4>
          </div>
          
          <div className={styles.categoriesList}>
            {displayedCategories.map((category) => (
              <div key={category.id} className={styles.categoryItem}>
                <div className={styles.categoryHeader}>
                  <div className={styles.checkboxWrapper}>
                    <Input
                      type="checkbox"
                      label={category.name}
                      checked={selectedCategories.includes(category.id)}
                      onChange={(e) => handleCategoryCheckboxChange(category.id, e.target.checked)}
                    />
                  </div>
                  {/* Стрелка показывается только если категория выбрана */}
                  {selectedCategories.includes(category.id) && (
                    <button
                      className={styles.accordionButton}
                      onClick={() => toggleCategory(category.id)}
                      aria-label={expandedCategories[category.id] ? 'Свернуть' : 'Развернуть'}
                    >
                      <img 
                        src={expandedCategories[category.id] ? chevronUpIcon : chevronDownIcon} 
                        alt={expandedCategories[category.id] ? 'Свернуть' : 'Развернуть'}
                        width={24}
                        height={24}
                      />
                    </button>
                  )}
                </div>
                
                {expandedCategories[category.id] && SUBCATEGORIES[category.id] && (
                  <div className={styles.subcategoriesList}>
                    {SUBCATEGORIES[category.id].map((subcategory) => (
                      <div key={subcategory.id} className={styles.subcategoryItem}>
                        <Input
                          type="checkbox"
                          label={subcategory.name}
                          checked={(selectedSubcategories[category.id] || []).includes(subcategory.id)}
                          onChange={(e) => handleSubcategoryCheckboxChange(category.id, subcategory.id, e.target.checked)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* ИСПРАВЛЕНИЕ ПУНКТА 1: Кнопка всегда видна, меняется текст и иконка */}
          <button
            className={styles.showAllButton}
            onClick={toggleAllCategories}
          >
            {showAllCategories ? 'Скрыть категории' : 'Все категории'}
            <img 
              src={showAllCategories ? chevronUpIcon : chevronDownIcon} 
              alt={showAllCategories ? 'Свернуть' : 'Развернуть'}
              width={20}
              height={20}
            />
          </button>
        </div>

        {/* Пол автора */}
        <div className={styles.filterGroup}>
          <h4 className={styles.sectionTitle}>Пол автора</h4>
          <div className={styles.radioGroup}>
            <Input
              type="radio"
              name="authorGender"
              label="Не имеет значения"
              value="any"
              checked={authorGenderValue === 'any'}
              onChange={() => setAuthorGenderValue('any')}
            />
            <Input
              type="radio"
              name="authorGender"
              label="Мужской"
              value="male"
              checked={authorGenderValue === 'male'}
              onChange={() => setAuthorGenderValue('male')}
            />
            <Input
              type="radio"
              name="authorGender"
              label="Женский"
              value="female"
              checked={authorGenderValue === 'female'}
              onChange={() => setAuthorGenderValue('female')}
            />
          </div>
        </div>

        {/* Город */}
        <div className={styles.filterGroup}>
          <div className={styles.sectionHeader}>
            <h4 className={styles.sectionTitle}>Город</h4>
          </div>
          
          <div className={styles.citiesList}>
            {displayedCities.map((city) => (
              <div key={city} className={styles.cityItem}>
                <Input
                  type="checkbox"
                  label={city}
                  checked={selectedCities.includes(city)}
                  onChange={(e) => handleCityCheckboxChange(city, e.target.checked)}
                />
              </div>
            ))}
          </div>
          
          {/* ИСПРАВЛЕНИЕ ПУНКТА 1: Кнопка всегда видна, меняется текст и иконка */}
          <button
            className={styles.showAllButton}
            onClick={toggleAllCities}
          >
            {showAllCities ? 'Скрыть города' : 'Все города'}
            <img 
              src={showAllCities ? chevronUpIcon : chevronDownIcon} 
              alt={showAllCities ? 'Свернуть' : 'Развернуть'}
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </aside>
  );
};