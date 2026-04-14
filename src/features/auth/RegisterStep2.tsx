import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch, type Resolver } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/input/input";

import addIcon from "@/shared/image/icons/add2.svg";
import crossIcon from "@/shared/image/icons/cross.svg";
import infoImage from "@/shared/image/webp/info.webp";
import { Calendar } from "@/features/auth/register-step2/ui/Calendar";
import { CategorySelect } from "@/features/auth/register-step2/ui/CategorySelect";
import { CitySelect } from "@/features/auth/register-step2/ui/CitySelect";
import { GenderSelect } from "@/features/auth/register-step2/ui/GenderSelect";
import { SubcategorySelect } from "@/features/auth/register-step2/ui/SubcategorySelect";
import styles from "./RegisterStep2.module.scss";
import { setStep2 } from "@/services/slices/registerSlice";
import { useAppDispatch } from "@/services/hooks";

interface LearnSkill {
  categoryId: string;
  subcategoryId: string;
}

interface RegisterStep2FormValues {
  name: string;
  birthDate: string;
  gender: string;
  cityId: string;
  learnSkills?: LearnSkill[];
}

const validationSchema = yup.object({
  name: yup.string().required("Имя обязательно").min(2).max(50),
  birthDate: yup.string().required("Дата рождения обязательна"),
  gender: yup.string().required("Пол обязателен").test(
    "gender-selected", "Выберите пол", (v) => Boolean(v)
  ),
  cityId: yup.string().required("Город обязателен").test(
    "city-selected", "Выберите город", (v) => Boolean(v)
  ),
  learnSkills: yup.array().of(
    yup.object({
      categoryId: yup.string().required("Категория обязательна").test(
        "cat", "Выберите категорию", (v) => Boolean(v)
      ),
      subcategoryId: yup.string().required("Подкатегория обязательна").test(
        "sub", "Выберите подкатегорию", (v) => Boolean(v)
      ),
    })
  ).min(1),
});

export const RegisterStep2 = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid, submitCount },
  } = useForm<RegisterStep2FormValues>({
    resolver: yupResolver(validationSchema) as Resolver<RegisterStep2FormValues>,
    mode: "onChange",
    defaultValues: {
      name: "",
      birthDate: "",
      gender: "",
      cityId: "",
      learnSkills: [{ categoryId: "", subcategoryId: "" }],
    },
  });

  // useFieldArray управляет динамическим списком навыков
  const { fields, append, remove } = useFieldArray({
    control,
    name: "learnSkills",
  });

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleBack = () => navigate("/register");
  const handleContinue = () => void handleSubmit(onSubmit)();

  const onSubmit = (data: RegisterStep2FormValues) => {
    dispatch(
      setStep2({
        ...data,
        learnSkills: data.learnSkills ?? [],
        avatar: avatarFile,
      })
    );

    navigate("/register/step-3");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section className={styles.formSection}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

            {/* Аватар */}
            <div className={styles.avatarField}>
              <button type="button" className={styles.avatarButton} onClick={handleAvatarClick}>
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

            {/* Имя */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input label="Имя" placeholder="Введите ваше имя"
                  value={field.value} onChange={field.onChange}
                  error={errors.name?.message}
                />
              )}
            />

            {/* Дата и пол */}
            <div className={styles.row}>
              <Controller name="birthDate" control={control}
                render={({ field }) => (
                  <Calendar label="Дата рождения" value={field.value}
                    onChange={field.onChange} error={errors.birthDate?.message}
                  />
                )}
              />
              <Controller name="gender" control={control}
                render={({ field }) => (
                  <GenderSelect label="Пол" value={field.value}
                    onChange={field.onChange} error={errors.gender?.message}
                  />
                )}
              />
            </div>

            {/* Город */}
            <Controller name="cityId" control={control}
              render={({ field }) => (
                <CitySelect label="Город" value={field.value}
                  onChange={field.onChange} error={errors.cityId?.message}
                />
              )}
            />

            {/* Динамический список навыков "хочу научиться" */}
            <div className={styles.learnSkillsList}>
              {fields.map((field, index) => (
                <LearnSkillRow
                  key={field.id}
                  index={index}
                  control={control}
                  errors={errors}
                  submitCount={submitCount}
                  setValue={setValue}
                  canRemove={fields.length > 1}
                  onRemove={() => remove(index)}
                />
              ))}
            </div>

            {/* Кнопка добавить ещё навык */}
            <Button
              type="button"
              variant="secondary"
              onClick={() => append({ categoryId: "", subcategoryId: "" })}
            >
              + Добавить ещё навык
            </Button>

            {/* Кнопки навигации */}
            <div className={styles.buttons}>
              <Button variant="secondary" onClick={handleBack}>Назад</Button>
              <Button variant="primary" onClick={handleContinue} disabled={!isValid}>
                Продолжить
              </Button>
            </div>
          </form>
        </section>

        <aside className={styles.infoSection}>
          <div className={styles.imageWrapper}>
            <img src={infoImage} alt="Иллюстрация профиля" className={styles.image} />
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

// Вынесено в отдельный компонент чтобы useWatch работал на конкретный индекс
const LearnSkillRow = ({
  index, control, errors, submitCount, setValue, canRemove, onRemove,
}: {
  index: number;
  control: any;
  errors: any;
  submitCount: number;
  setValue: any;
  canRemove: boolean;
  onRemove: () => void;
}) => {
  const selectedCategoryId = useWatch({
    control,
    name: `learnSkills.${index}.categoryId`,
  });

  const showSubcategoryError =
    submitCount > 0 && Boolean(errors.learnSkills?.[index]?.subcategoryId);

  return (
    <div className={styles.learnSkillRow}>
      {canRemove && (
        <button type="button" className={styles.removeSkillBtn} onClick={onRemove}>
          <img src={crossIcon} alt="Удалить" />
        </button>
      )}

      <Controller
        name={`learnSkills.${index}.categoryId`}
        control={control}
        render={({ field }) => (
          <CategorySelect
            label="Категория навыка, которому хотите научиться"
            value={field.value}
            onChange={field.onChange}
            error={errors.learnSkills?.[index]?.categoryId?.message}
            onResetSubcategory={() =>
              setValue(`learnSkills.${index}.subcategoryId`, "", { shouldDirty: true })
            }
          />
        )}
      />

      <Controller
        name={`learnSkills.${index}.subcategoryId`}
        control={control}
        render={({ field }) => (
          <SubcategorySelect
            label="Подкатегория навыка, которому хотите научиться"
            categoryId={selectedCategoryId || ""}
            value={field.value}
            onChange={field.onChange}
            error={errors.learnSkills?.[index]?.subcategoryId?.message}
            showError={showSubcategoryError}
          />
        )}
      />
    </div>
  );
};