import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useRef, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { Logo } from '../../shared/ui/Logo/Logo';
import { Button } from '../../shared/ui/Button/Button';
import { Input } from '../../shared/ui/input/input';
import galleryAddIcon from '../../shared/image/icons/gallery-add.svg';
import crossIcon from '../../shared/image/icons/cross.svg';
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
    .max(200, 'Описание не должно превышать 200 символов'),
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
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
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
  const selectedSubcategory = watch('subcategoryId');
  const currentImages = watch('images') || [];

  // Получение доступных подкатегорий
  const getAvailableSubcategories = () => {
    if (!selectedCategoryId || selectedCategoryId === '') return [];
    return SUBCATEGORIES[Number(selectedCategoryId)] || [];
  };

 // Создание превью для файлов
  const createPreviews = useCallback((files: File[]) => {
    return files.map(file => URL.createObjectURL(file));
  }, []);

  // Очистка превью (важно для предотвращения утечек памяти)
  const clearPreviews = useCallback((previewsToClear: string[]) => {
    previewsToClear.forEach(preview => URL.revokeObjectURL(preview));
  }, []);

  // Обновление превью при изменении images
  const updatePreviews = useCallback((files: File[]) => {
    setImagePreviews(prev => {
      clearPreviews(prev);
      return createPreviews(files);
    });
  }, [createPreviews, clearPreviews]);

  // Обработка добавления новых файлов
  const processFiles = useCallback((newFilesList: FileList | null) => {
    if (!newFilesList) return;
    
    const newFiles = Array.from(newFilesList);
    const currentFiles = getValues('images') || [];
    const totalFiles = [...currentFiles, ...newFiles];
    
    if (totalFiles.length > 5) {
      alert('Можно добавить не более 5 изображений');
      return;
    }
    
    setValue('images', totalFiles, { shouldValidate: true });
    updatePreviews(totalFiles);
  }, [setValue, getValues, updatePreviews]);

  // Удаление изображения
  const removeImage = useCallback((indexToRemove: number) => {
    const currentFiles = getValues('images') || [];
    const newFiles = currentFiles.filter((_, index) => index !== indexToRemove);
    
    setValue('images', newFiles, { shouldValidate: true });
    
    // Очищаем превью удаленного файла
    const removedPreview = imagePreviews[indexToRemove];
    if (removedPreview) {
      URL.revokeObjectURL(removedPreview);
    }
    
    // Обновляем превью для оставшихся файлов
    const newPreviews = createPreviews(newFiles);
    setImagePreviews(newPreviews);
  }, [setValue, getValues, imagePreviews, createPreviews]);

  // Обработка клика по области Drag&Drop
  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  // Обработка выбора файлов через input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    // Очищаем input, чтобы можно было выбрать те же файлы снова
    e.target.value = '';
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
        imageNames: data.images.map(f => f.name),
      },
    };
    
    localStorage.setItem('registrationComplete', JSON.stringify(completeRegistrationData));
    
    // Очищаем превью перед переходом
    clearPreviews(imagePreviews);
    // Временный переход на главную страницу
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleClose = () => {
    navigate(-3);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Logo />
        <div className={styles.closeButtonWrapper}>
          <Button variant="secondary" onClick={handleClose} iconRight={<img src={crossIcon} alt="Close" />}>
            Закрыть
          </Button>
        </div>
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
                className={`${styles.select} ${!selectedCategoryId ? styles.selectPlaceholder : ''} ${errors.categoryId ? styles.error : ''}`}
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
                className={`${styles.select} ${!selectedSubcategory ? styles.selectPlaceholder : ''} ${errors.subcategoryId ? styles.error : ''}`}
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
              <label className={styles.label}>Фото навыка ({currentImages.length}/5)</label>
              
              {/* Область Drag&Drop */}
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
              
              {/* Превью загруженных изображений */}
              {imagePreviews.length > 0 && (
                <div className={styles.imagePreviewList}>
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className={styles.imagePreviewItem}>
                      <img src={preview} alt={`Preview ${index + 1}`} className={styles.previewImage} />
                      <button
                        type="button"
                        className={styles.removeImageBtn}
                        onClick={() => removeImage(index)}
                        aria-label="Удалить изображение"
                      >
                        <img src={crossIcon} alt="Удалить" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {errors.images && (
                <span className={styles.errorMessage}>{errors.images.message}</span>
              )}
            </div>

            <div className={styles.buttons}>
              <div className={styles.buttonWrapper}>
                <Button variant="secondary" onClick={handleBack}>
                  Назад
                </Button>
              </div>
              <div className={styles.buttonWrapper}>
                <Button variant="primary" onClick={handleSubmit(onSubmit)} disabled={!isValid}>
                  Продолжить
                </Button>
              </div>
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