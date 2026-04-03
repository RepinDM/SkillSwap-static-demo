import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { Logo } from '../../shared/ui/Logo/Logo';
import { Button } from '../../shared/ui/Button/Button';
import { Input } from '../../shared/ui/input/input';
import { Avatar } from '../../shared/ui/Avatar/Avatar';
import addIcon from '../../shared/image/icons/add2.svg';
import infoImage from '../../shared/image/webp/info.webp';
import styles from './RegisterStep2.module.scss';

// Моковые данные
const GENDERS = [
  { value: '', label: 'Не указан' },
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
];

const CITIES = [
  { id: 1, name: 'Москва' },
  { id: 2, name: 'Санкт-Петербург' },
  { id: 3, name: 'Новосибирск' },
  { id: 4, name: 'Екатеринбург' },
  { id: 5, name: 'Казань' },
  { id: 6, name: 'Нижний Новгород' },
];

const CATEGORIES = [
  { id: 1, name: 'Бизнес и карьера', slug: 'business-career' },
  { id: 2, name: 'Творчество и искусство', slug: 'creativity-art' },
  { id: 3, name: 'Иностранные языки', slug: 'foreign-languages' },
  { id: 4, name: 'Образование и развитие', slug: 'education-development' },
  { id: 5, name: 'Дом и уют', slug: 'home-comfort' },
  { id: 6, name: 'Здоровье и лайфстайл', slug: 'health-lifestyle' },
];

const SUBCATEGORIES: Record<number, { id: number; name: string }[]> = {
  1: [
    { id: 1, name: 'Маркетинг и реклама' },
    { id: 2, name: 'Управление проектами' },
    { id: 3, name: 'Финансы и инвестиции' },
  ],
  2: [
    { id: 4, name: 'Музыка и звук' },
    { id: 5, name: 'Рисование и иллюстрация' },
    { id: 6, name: 'Фотография и видео' },
  ],
  3: [
    { id: 7, name: 'Английский' },
    { id: 8, name: 'Французский' },
    { id: 9, name: 'Немецкий' },
    { id: 10, name: 'Испанский' },
  ],
  4: [
    { id: 11, name: 'Навыки обучения' },
    { id: 12, name: 'Когнитивные техники' },
    { id: 13, name: 'Тайм-менеджмент' },
  ],
  5: [
    { id: 14, name: 'Приготовление еды' },
    { id: 15, name: 'Ремонт' },
    { id: 16, name: 'Садоводство' },
  ],
  6: [
    { id: 17, name: 'Йога и медитация' },
    { id: 18, name: 'Питание и ЗОЖ' },
    { id: 19, name: 'Фитнес' },
  ],
};

// Тип для формы - все поля строковые
interface IRegisterStep2Form {
  name: string;
  birthDate: string;
  gender: string;
  cityId: string;
  categoryId: string;
  subcategoryId: string;
  skillName: string;
}

// Схема валидации
const validationSchema = yup.object({
  name: yup
    .string()
    .required('Имя обязательно')
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов'),
  birthDate: yup
    .string()
    .required('Дата рождения обязательна')
    .test('is-valid-date', 'Введите корректную дату', (value) => {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime()) && date <= new Date();
    }),
  gender: yup.string().required('Пол обязателен'),
  cityId: yup.string().required('Город обязателен').test('not-empty', 'Выберите город', (value) => {
    return value !== undefined && value !== '';
  }),
  categoryId: yup.string().required('Категория обязательна').test('not-empty', 'Выберите категорию', (value) => {
    return value !== undefined && value !== '';
  }),
  subcategoryId: yup.string().required('Подкатегория обязательна').test('not-empty', 'Выберите подкатегорию', (value) => {
    return value !== undefined && value !== '';
  }),
  skillName: yup
    .string()
    .required('Название навыка обязательно')
    .min(2, 'Название должно содержать минимум 2 символа')
    .max(100, 'Название не должно превышать 100 символов'),
});

export const RegisterStep2 = () => {
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
 const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IRegisterStep2Form>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      birthDate: '',
      gender: '',
      cityId: '',
      categoryId: '',
      subcategoryId: '',
      skillName: '',
    },
  });

  const selectedCategoryId = watch('categoryId');

  // Получение доступных подкатегорий
  const getAvailableSubcategories = () => {
    if (!selectedCategoryId || selectedCategoryId === '') return [];
    return SUBCATEGORIES[Number(selectedCategoryId)] || [];
  };

  // Обработка загрузки аватарки
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
      console.log('Selected file:', file);
    }
  };

  // Отправка формы
  const onSubmit = (data: IRegisterStep2Form) => {
    // Преобразуем строковые ID в числа для отправки на сервер
    const formDataToSend = {
      name: data.name,
      birthDate: data.birthDate,
      gender: data.gender,
      cityId: Number(data.cityId),
      categoryId: Number(data.categoryId),
      subcategoryId: Number(data.subcategoryId),
      skillName: data.skillName,
      avatar: avatarPreview,
    };
    
    console.log('Form data:', formDataToSend);
    localStorage.setItem('registerStep2', JSON.stringify(formDataToSend));
    navigate('/register/step-3');
  };

  // Возврат назад
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      {/* Хедер */}
      <header className={styles.header}>
        <Logo />
        <Button variant="secondary" onClick={handleBack}>
          ← Вернуться назад
        </Button>
      </header>

      {/* Блок Steps */}
      <div className={styles.stepsBlock}>
        <h2 className={styles.stepsTitle}>Шаг 2 из 3</h2>
        <div className={styles.progressBar}>
          <div className={styles.progressStepActive} />
          <div className={styles.progressStepActive} />
          <div className={styles.progressStepInactive} />
        </div>
      </div>

      {/* Основной контент */}
      <div className={styles.content}>
        {/* Левая часть - форма */}
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Аватар */}
            <div className={styles.avatarField}>
              <div className={styles.avatarWrapper} onClick={handleAvatarClick}>
                <Avatar src={avatarPreview || undefined} size={72} />
                <div className={styles.addIconWrapper}>
                  <img src={addIcon} alt="Add" className={styles.addIcon} />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className={styles.hiddenInput}
              />
            </div>

            {/* Имя */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  label="Имя"
                  placeholder="Введите ваше имя"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.name?.message}
                />
              )}
            />

            {/* Дата рождения и Пол */}
            <div className={styles.row}>
              <div className={styles.fieldHalf}>
                <label className={styles.label}>Дата рождения</label>
                <input
                  type="date"
                  className={`${styles.input} ${errors.birthDate ? styles.error : ''}`}
                  {...register('birthDate')}
                />
                {errors.birthDate && (
                  <span className={styles.errorMessage}>{errors.birthDate.message}</span>
                )}
              </div>

              <div className={styles.fieldHalf}>
                <label className={styles.label}>Пол</label>
                <select
                  className={`${styles.select} ${errors.gender ? styles.error : ''}`}
                  {...register('gender')}
                >
                  {GENDERS.map((gender) => (
                    <option key={gender.value} value={gender.value}>
                      {gender.label}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <span className={styles.errorMessage}>{errors.gender.message}</span>
                )}
              </div>
            </div>

            {/* Город */}
            <div className={styles.field}>
              <label className={styles.label}>Город</label>
              <select
                className={`${styles.select} ${errors.cityId ? styles.error : ''}`}
                {...register('cityId')}
              >
                <option value="">Не указан</option>
                {CITIES.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.cityId && (
                <span className={styles.errorMessage}>{errors.cityId.message}</span>
              )}
            </div>

            {/* Категория навыка */}
            <div className={styles.field}>
              <label className={styles.label}>
                Категория навыка, которому хотите научиться
              </label>
              <select
                className={`${styles.select} ${errors.categoryId ? styles.error : ''}`}
                {...register('categoryId')}
              >
                <option value="">Выберите категорию</option>
                {CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <span className={styles.errorMessage}>{errors.categoryId.message}</span>
              )}
            </div>

            {/* Подкатегория навыка */}
            <div className={styles.field}>
              <label className={styles.label}>
                Подкатегория навыка, которому хотите научиться
              </label>
              <select
                className={`${styles.select} ${errors.subcategoryId ? styles.error : ''}`}
                {...register('subcategoryId')}
                disabled={!selectedCategoryId || selectedCategoryId === ''}
              >
                <option value="">Выберите подкатегорию</option>
                {getAvailableSubcategories().map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
              {errors.subcategoryId && (
                <span className={styles.errorMessage}>{errors.subcategoryId.message}</span>
              )}
            </div>

            {/* Название навыка */}
            <Controller
              name="skillName"
              control={control}
              render={({ field }) => (
                <Input
                  label="Название навыка, которому хотите научиться"
                  placeholder="Например: Создание сайтов"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.skillName?.message}
                />
              )}
            />

            {/* Кнопки */}
            <div className={styles.buttons}>
              <Button variant="secondary" onClick={handleBack}>
                Назад
              </Button>
              <Button variant="primary" disabled={!isValid}>
                Продолжить
              </Button>
            </div>
          </form>
        </div>

        {/* Правая часть - информационный блок */}
        <div className={styles.infoSection}>
          <div className={styles.imageWrapper}>
            <img
              src={infoImage}
              alt="Information"
              className={styles.image}
            />
          </div>
          <h3 className={styles.infoTitle}>Расскажите немного о себе</h3>
          <p className={styles.infoText}>
            Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена
          </p>
        </div>
      </div>
    </div>
  );
};