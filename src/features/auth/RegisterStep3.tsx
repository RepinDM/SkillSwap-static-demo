import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { Logo } from '../../shared/ui/Logo/Logo';
import { Button } from '../../shared/ui/Button/Button';
import { Input } from '../../shared/ui/input/input';
import galleryAddIcon from '../../shared/image/icons/gallery-add.svg';
import boardImage from '../../shared/image/webp/board.webp';
import styles from './RegisterStep3.module.scss';

// Моковые данные
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

interface IRegisterStep3Form {
  skillName: string;
  categoryId: string;
  subcategoryId: string;
  description: string;
  images: File[];
}

const validationSchema = yup.object({
  skillName: yup
    .string()
    .required('Название навыка обязательно')
    .min(2, 'Название должно содержать минимум 2 символа')
    .max(50, 'Название не должно превышать 50 символов'),
  categoryId: yup.string().required('Категория обязательна').test('not-empty', 'Выберите категорию', (value) => {
    return value !== undefined && value !== '';
  }),
  subcategoryId: yup.string().required('Подкатегория обязательна').test('not-empty', 'Выберите подкатегорию', (value) => {
    return value !== undefined && value !== '';
  }),
  description: yup
    .string()
    .required('Описание обязательно')
    .min(10, 'Описание должно содержать минимум 10 символов')
    .max(100, 'Описание не должно превышать 100 символов'),
  images: yup
    .mixed<File[]>()
    .test('has-images', 'Добавьте хотя бы одно изображение', (value) => {
      return value !== undefined && value !== null && value.length > 0;
    })
    .test('max-images', 'Можно добавить не более 5 изображений', (value) => {
      return !value || value.length <= 5;
    }),
});

export const RegisterStep3 = () => {
  const navigate = useNavigate();
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<IRegisterStep3Form>({
    resolver: yupResolver(validationSchema) as any,
    mode: 'onChange',
    defaultValues: {
      skillName: '',
      categoryId: '',
      subcategoryId: '',
      description: '',
      images: [],
    },
  });

  const selectedCategoryId = watch('categoryId');

  // Получение доступных подкатегорий
  const getAvailableSubcategories = () => {
    if (!selectedCategoryId || selectedCategoryId === '') return [];
    return SUBCATEGORIES[Number(selectedCategoryId)] || [];
  };

  // Обработка выбора файлов
  const processFiles = (files: FileList | null) => {
    if (!files) return;
    
    const currentImages = watch('images') || [];
    const newFiles = Array.from(files);
    const totalImages = [...currentImages, ...newFiles];
    
    if (totalImages.length > 5) {
      alert('Можно добавить не более 5 изображений');
      return;
    }
    
    setValue('images', totalImages);
  };

  // Обработка клика по области Drag&Drop
  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  // Обработка выбора файлов через input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  // Обработка Drag & Drop
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    processFiles(e.dataTransfer.files);
  };

  // Отправка формы
  const onSubmit = (data: IRegisterStep3Form) => {
    const formDataToSend = {
      skillName: data.skillName,
      categoryId: Number(data.categoryId),
      subcategoryId: Number(data.subcategoryId),
      description: data.description,
      images: data.images,
    };
    
    console.log('Form data:', formDataToSend);
    
    // Сохраняем данные из всех шагов
    const step2Data = localStorage.getItem('registerStep2');
    const step1Data = localStorage.getItem('registerStep1');
    
    const completeRegistrationData = {
      step1: step1Data ? JSON.parse(step1Data) : null,
      step2: step2Data ? JSON.parse(step2Data) : null,
      step3: {
        skillName: data.skillName,
        categoryId: Number(data.categoryId),
        subcategoryId: Number(data.subcategoryId),
        description: data.description,
        imagesCount: data.images.length,
      },
    };
    
    localStorage.setItem('registrationComplete', JSON.stringify(completeRegistrationData));
    
    // Временный переход на главную страницу
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Logo />
        <Button variant="secondary" onClick={handleBack}>
          ← Вернуться назад
        </Button>
      </header>

      <div className={styles.stepsBlock}>
        <h2 className={styles.stepsTitle}>Шаг 3 из 3</h2>
        <div className={styles.progressBar}>
          <div className={styles.progressStepActive} />
          <div className={styles.progressStepActive} />
          <div className={styles.progressStepActive} />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Controller
              name="skillName"
              control={control}
              render={({ field }) => (
                <Input
                  label="Название навыка"
                  placeholder="Введите название навыка"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.skillName?.message}
                />
              )}
            />

            <div className={styles.field}>
              <label className={styles.label}>Категория навыка</label>
              <select
                className={`${styles.select} ${errors.categoryId ? styles.error : ''}`}
                {...register('categoryId')}
              >
                <option value="">Выберите категорию навыка</option>
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

            <div className={styles.field}>
              <label className={styles.label}>Подкатегория навыка</label>
              <select
                className={`${styles.select} ${errors.subcategoryId ? styles.error : ''}`}
                {...register('subcategoryId')}
                disabled={!selectedCategoryId || selectedCategoryId === ''}
              >
                <option value="">Выберите подкатегорию навыка</option>
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

            <div className={styles.field}>
              <label className={styles.label}>Описание</label>
              <textarea
                className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
                placeholder="Коротко опишите, чему можете научить"
                rows={4}
                {...register('description')}
              />
              {errors.description && (
                <span className={styles.errorMessage}>{errors.description.message}</span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Фото навыка</label>
              <div
                className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ''} ${errors.images ? styles.error : ''}`}
                onClick={handleDropZoneClick}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className={styles.dropZoneContent}>
                  <p className={styles.dropZoneText}>
                    Перетащите или выберите изображения навыка
                  </p>
                  <div className={styles.galleryButton}>
                    <img src={galleryAddIcon} alt="Gallery" className={styles.galleryIcon} />
                    <span>Выбрать изображения</span>
                  </div>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className={styles.hiddenInput}
              />
              {errors.images && (
                <span className={styles.errorMessage}>{errors.images.message}</span>
              )}
            </div>

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

        <div className={styles.infoSection}>
          <div className={styles.imageWrapper}>
            <img
              src={boardImage}
              alt="Information"
              className={styles.image}
            />
          </div>
          <h3 className={styles.infoTitle}>Укажите, чем вы готовы поделиться</h3>
          <p className={styles.infoText}>
            Так другие люди смогут увидеть ваши предложения и предложить вам обмен!
          </p>
        </div>
      </div>
    </div>
  );
};