

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/input/input";

import addIcon from "@/shared/image/icons/add2.svg";
import infoImage from "@/shared/image/webp/info.webp";
import { Calendar } from "@/features/auth/register-step2/ui/Calendar";
import { CategorySelect } from "@/features/auth/register-step2/ui/CategorySelect";
import { CitySelect } from "@/features/auth/register-step2/ui/CitySelect";
import { GenderSelect } from "@/features/auth/register-step2/ui/GenderSelect";
import { SubcategorySelect } from "@/features/auth/register-step2/ui/SubcategorySelect";
import styles from "./RegisterStep2.module.scss";

interface RegisterStep2FormValues {
  name: string;
  birthDate: string;
  gender: string;
  cityId: string;
  categoryId: string;
  subcategoryId: string;
}

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Имя обязательно")
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(50, "Имя не должно превышать 50 символов"),
  birthDate: yup.string().required("Дата рождения обязательна"),
  gender: yup.string().required("Пол обязателен").test(
    "gender-selected",
    "Выберите пол",
    (value) => Boolean(value)
  ),
  cityId: yup.string().required("Город обязателен").test(
    "city-selected",
    "Выберите город",
    (value) => Boolean(value)
  ),
  categoryId: yup.string().required("Категория обязательна").test(
    "category-selected",
    "Выберите категорию",
    (value) => Boolean(value)
  ),
  subcategoryId: yup.string().required("Подкатегория обязательна").test(
    "subcategory-selected",
    "Выберите подкатегорию",
    (value) => Boolean(value)
  ),
});

export const RegisterStep2 = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid, submitCount },
  } = useForm<RegisterStep2FormValues>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      birthDate: "",
      gender: "",
      cityId: "",
      categoryId: "",
      subcategoryId: "",
    },
  });

  // Значения из формы нужны для зависимых полей и подписей в кастомных селектах.
  const selectedCategoryId = useWatch({ control, name: "categoryId" });

  // Освобождаем blob URL превью, чтобы не оставлять лишние ссылки в памяти.
  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleBack = () => navigate("/register");
  const handleContinue = () => {
    void handleSubmit(onSubmit)();
  };

  const onSubmit = (data: RegisterStep2FormValues) => {
    localStorage.setItem("registerStep2", JSON.stringify(data));
    navigate("/register/step-3");
  };

  const showSubcategoryError = submitCount > 0 && Boolean(errors.subcategoryId);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section className={styles.formSection}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Загрузка аватара вынесена в отдельную кнопку, чтобы клик был предсказуемым. */}
            <div className={styles.avatarField}>
              <button
                type="button"
                className={styles.avatarButton}
                onClick={handleAvatarClick}
                aria-label="Загрузить аватар"
              >
                <Avatar src={avatarPreview || undefined} size={72} />
                <span className={styles.addIconWrapper}>
                  <img src={addIcon} alt="" className={styles.addIcon} />
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className={styles.hiddenInput}
              />
            </div>

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

            {/* Дата и пол стоят в одной строке, как в макете. */}
            <div className={styles.row}>
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <Calendar
                    label="Дата рождения"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.birthDate?.message}
                  />
                )}
              />

              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <GenderSelect
                    label="Пол"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.gender?.message}
                  />
                )}
              />
            </div>

            {/* Город открывается как dropdown с поиском, чтобы было удобнее искать по списку. */}
            <Controller
              name="cityId"
              control={control}
              render={({ field }) => (
                <CitySelect
                  label="Город"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.cityId?.message}
                />
              )}
            />

            {/* Категория и подкатегория сделаны как раскрывающиеся панели с вариантами выбора. */}
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <CategorySelect
                  label="Категория навыка, которому хотите научиться"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.categoryId?.message}
                  onResetSubcategory={() =>
                    setValue("subcategoryId", "", {
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
                  label="Подкатегория навыка, которому хотите научиться"
                  categoryId={selectedCategoryId || ""}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.subcategoryId?.message}
                  showError={showSubcategoryError}
                />
              )}
            />

            {/* Основные действия формы: возврат назад и переход дальше только после валидации. */}
            <div className={styles.buttons}>
              <Button variant="secondary" onClick={handleBack}>
                Назад
              </Button>
              <Button
                variant="primary"
                onClick={handleContinue}
                disabled={!isValid}
              >
                Продолжить
              </Button>
            </div>
          </form>
        </section>

        {/* Правая колонка статична и не зависит от состояния формы. */}
        <aside className={styles.infoSection}>
          <div className={styles.imageWrapper}>
            <img
              src={infoImage}
              alt="Иллюстрация профиля"
              className={styles.image}
            />
          </div>
          <h3 className={styles.infoTitle}>Расскажите немного о себе</h3>
          <p className={styles.infoText}>
            Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена
          </p>
        </aside>
      </div>
    </div>
  );
};
