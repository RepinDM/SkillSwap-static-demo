//1. Верстка личного кабинета
//2. Смена пароля, инпуты Имя, Почта, О себе заблокированы до нажатия на иконка изменить
//3.

import { Controller, useForm } from "react-hook-form";
import styles from "./PersonalSection.module.scss";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Input } from "@/shared/ui/input";
import { GenderSelect } from "@/features/auth/register-step2/ui/GenderSelect";
import { Calendar } from "@/features/auth/register-step2/ui/Calendar";
import { CitySelect } from "@/features/auth/register-step2/ui/CitySelect";
import EditPhoto from "@/shared/image/icons/gallery-edit.svg";
import EditIcon from "@/shared/image/icons/edit.svg";

import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/Button/Button";

import { MOCK_USER } from "../mock_user";

interface PersonalFormValues {
  email: string;
  name: string;
  birthDate: string;
  gender: string;
  cityId: string;
  about: string;
  password: string;
}

const PersonalSection = () => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const handleEditClick = (field: string) => {
    setEditingField(field);
  };

  const {
    control,
    reset,
    register,
    setValue,
    formState: { isSubmitting, isDirty },
  } = useForm<PersonalFormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      birthDate: "",
      gender: "",
      cityId: "",
      about: "",
      password: "",
    },
  });

  useEffect(() => {
    reset(MOCK_USER);
  }, [reset]);


  return (
    <form className={styles.main} >
      <section className={styles.about}>
        <div>
          {/* Почта */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                label="Почта"
                placeholder="Введите вашу почту"
                value={field.value}
                onChange={field.onChange}
                disabled={editingField !== "email"}
                iconRight={
                  <button
                    type="button"
                    onClick={() => handleEditClick("email")}
                    aria-label="Редактировать почту"
                  >
                    <img src={EditIcon} alt="" />
                  </button>
                }
              />
            )}
          />
          {/* Изменить пароль */}
          <div>
            {!isEditingPassword ? (
              <button
                type="button"
                className={styles.passwordLink}
                onClick={() => setIsEditingPassword(true)}
              >
                <span>Изменить пароль</span>
              </button>
            ) : (
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Введите новый пароль",
                  minLength: { value: 6, message: "Минимум 6 символов" },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    type="password"
                    label="Новый пароль"
                    placeholder="Придумайте пароль"
                    error={fieldState.error?.message}
                    iconRight={
                      <button
                        type="button"
                        onClick={() => {
                          setValue("password", "");
                          setIsEditingPassword(false);
                        }}
                      >
                        ✕
                      </button>
                    }
                  />
                )}
              />
            )}
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
                disabled={editingField !== "name"}
                iconRight={
                  <button
                    type="button"
                    onClick={() => handleEditClick("name")}
                    aria-label="Редактировать имя"
                  >
                    <img src={EditIcon} alt="" />
                  </button>
                }
              />
            )}
          />
          {/* Дата + Пол */}
          <div>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <Calendar
                  label="Дата рождения"
                  value={field.value}
                  onChange={field.onChange}
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
                />
              )}
            />
          </div>
          {/* Город */}
          <Controller
            name="cityId"
            control={control}
            render={({ field }) => (
              <CitySelect
                label="Город"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {/* О себе */}
          <div className={styles.field}>
            <label className={styles.label}>О себе</label>

            <textarea
              className={styles.textarea}
              placeholder="Напишите что-нибудь о себе..."
              disabled={editingField !== "about"}
              {...register("about")}
              autoFocus={editingField === "about"}
            />
            <button
              type="button"
              className={styles.editButton}
              onClick={() => handleEditClick("about")}
              aria-label="Редактировать"
            >
              <img src={EditIcon} alt="" />
            </button>
          </div>
        </div>
        <Button disabled={isSubmitting || !isDirty}>
          {isSubmitting ? "Сохранение..." : "Сохранить"}
        </Button>
      </section>
      <section className={styles.photo}>
        <div className={styles.avatarField}>
          <button
            type="button"
            className={styles.avatarButton}
            aria-label="Загрузить аватар"
          >
            <Avatar src={MOCK_USER.avatar} size={244} />
            <span className={styles.editPhoto}>
              <img
                src={EditPhoto}
                alt="Изменить или добавить фото"
                className={styles.addIcon}
              />
            </span>
          </button>
        </div>
      </section>
    </form>
  );
};

export default PersonalSection;
