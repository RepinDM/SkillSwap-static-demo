import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { Button } from '../../shared/ui/Button/Button';
import { Input } from '../../shared/ui/input/input';
import galleryAddIcon from '../../shared/image/icons/gallery-add.svg';
import crossIcon from '../../shared/image/icons/cross.svg';
import boardImage from '../../shared/image/webp/board.webp';
import { CategorySelect } from './register-step2/ui/CategorySelect';
import { SubcategorySelect } from './register-step2/ui/SubcategorySelect';
import styles from './RegisterStep3.module.scss';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { clearRegister, selectStep1, selectStep2, selectStep3, setStep3 } from '@/services/slices/registerSlice';
import type { TSkill } from '@/entities/skill/types';
import { TeachSkillModal } from '../TeachSkillModal/components/SkillModal/TeachSkillModal';
import { ExchangeCreatedModal } from '../ExchangeCreatedModal/ExchangeCreatedModal';
import { createDemoSession } from '@/api/demo-auth';
import { fileToDataUrl, saveDemoTeachSkill } from '@/api/demo-data';
import { getUserSkills } from '@/api/skillswap-api';
import { setAuthData } from '@/services/slices/authSlice';
import type { TUserAuth } from '@/entities/user/types';

interface IRegisterStep3Form {
  skillName: string;
  categoryId: string;
  subcategoryId: string;
  description: string;
  images: File[];
}

type RegisterResponse = {
  accessToken: string;
  refreshToken: string;
  user: TUserAuth;
};

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
    .max(300, 'Описание не должно превышать 300 символов'),
  images: yup
    .array()
    .of(yup.mixed<File>().required())
    .default([])
    .test('has-images', 'Добавьте хотя бы одно изображение', (value) => {
      return Array.isArray(value) && value.length > 0;
    })
    .test('max-images', 'Можно добавить не более 7 изображений', (value) => {
      return Array.isArray(value) && value.length <= 7;
    }),
});

export const RegisterStep3 = () => {
  const navigate = useNavigate();

  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [skillPreview, setSkillPreview] = useState<TSkill | null>(null);

  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const [registerResponse, setRegisterResponse] = useState<RegisterResponse | null>(null);

  const step1 = useAppSelector(selectStep1);
  const step2 = useAppSelector(selectStep2);
  const step3 = useAppSelector(selectStep3);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid, submitCount },
  } = useForm<IRegisterStep3Form>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      skillName: step3?.skillName || "",
      categoryId: step3?.categoryId || "",
      subcategoryId: step3?.subcategoryId || "",
      description: step3?.description || "",
      images: step3?.images || [],
    },
  });

  useEffect(() => {
    if (!step3) return;

    setValue("skillName", step3.skillName);
    setValue("categoryId", step3.categoryId);
    setValue("subcategoryId", step3.subcategoryId);
    setValue("description", step3.description);
  }, [step3, setValue]);

  const selectedCategoryId = useWatch({
    control,
    name: 'categoryId',
  });

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

  useEffect(() => {
    return () => {
      clearPreviews(imagePreviews);
    };
  }, [clearPreviews, imagePreviews]);

  // Обработка добавления новых файлов
  const processFiles = useCallback((newFilesList: FileList | null) => {
    if (!newFilesList) return;
    
    const newFiles = Array.from(newFilesList);
    const currentFiles = getValues('images') || [];
    const totalFiles = [...currentFiles, ...newFiles];
    
    if (totalFiles.length > 7) {
      alert('Можно добавить не более 7 изображений');
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

  const onSubmit = (data: IRegisterStep3Form) => {
    dispatch(setStep3(data));

    const preview: TSkill = {
      title: data.skillName,
      description: data.description,
      images: imagePreviews,
      subcategory: {
        name: "Подкатегория",
        category: { name: "Категория" }
      }
    } as TSkill;

    setSkillPreview(preview);
    setShowSkillModal(true);
  };

  const handleConfirmSubmit = async () => {
  if (!step3) return;

  try {
    const gender = step2?.gender === "female" ? "female" : "male";
    const data: RegisterResponse = createDemoSession({
      id: Date.now(),
      email: step1?.email || "demo@skillswap.local",
      name: step2?.name || "Пользователь",
      birthDate: step2?.birthDate,
      gender,
      about: step2?.about,
      avatar: step2?.avatar ? await fileToDataUrl(step2.avatar) : undefined,
      city: { id: Number(step2?.cityId) || 0, name: "Не указан" },
    });
    const catalogData = await getUserSkills();
    await saveDemoTeachSkill(catalogData, data.user.id, {
      title: step3.skillName,
      description: step3.description,
      subcategoryId: step3.subcategoryId,
      images: step3.images,
      existingImageUrls: [],
    });
    setRegisterResponse(data);
    setShowSkillModal(false);
    setShowSuccessModal(true);
  } catch {
    return;
  }
};

  const handleBack = () => {
    navigate('/register/step-2');
  };

  const showSubcategoryError = submitCount > 0 && Boolean(errors.subcategoryId);

  return (
    <>
      <div className={styles.container}>
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

              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <CategorySelect
                    label="Категория навыка"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.categoryId?.message}
                    onResetSubcategory={() =>
                      setValue('subcategoryId', '', {
                        shouldDirty: true,
                      })
                    }
                  />
                )}
              />

              <Controller
                name="subcategoryId"
                control={control}
                render={({ field }) => (
                  <SubcategorySelect
                    label="Подкатегория навыка"
                    categoryId={selectedCategoryId || ''}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.subcategoryId?.message}
                    showError={showSubcategoryError}
                  />
                )}
              />

              <div className={styles.field}>
                <label className={styles.label}>Описание</label>
                <textarea
                  className={`${styles.textarea} ${errors.description ? styles.textareaError : ''}`}
                  placeholder="Коротко опишите, чему можете научить"
                  rows={4}
                  {...register('description')}
                />
                {errors.description && (
                  <span className={styles.errorMessage}>{errors.description.message}</span>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Изображения навыка</label>
                
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
                  <Button type="submit" variant="primary" disabled={!isValid}>
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

      {skillPreview && (
        <TeachSkillModal
          isOpen={showSkillModal}
          teachSkill={skillPreview}
          onEdit={() => setShowSkillModal(false)}
          onDone={handleConfirmSubmit}
        />
      )}

      <ExchangeCreatedModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);

          if (registerResponse?.accessToken && registerResponse?.refreshToken && registerResponse?.user) {
            dispatch(setAuthData({
              accessToken: registerResponse.accessToken,
              refreshToken: registerResponse.refreshToken,
              user: registerResponse.user,
            }));
          }

          dispatch(clearRegister());
          navigate("/");
        }}
      />
    </>
  );
};
