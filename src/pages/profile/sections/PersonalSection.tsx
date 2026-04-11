import { Controller, useForm } from "react-hook-form";
import styles from "./PersonalSection.module.scss";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Input } from "@/shared/ui/input";
import { GenderSelect } from "@/features/auth/register-step2/ui/GenderSelect";
import { Calendar } from "@/features/auth/register-step2/ui/Calendar";
import { CitySelect } from "@/features/auth/register-step2/ui/CitySelect";
import EditPhoto from "@/shared/image/icons/gallery-edit.svg";
import EditIcon from "@/shared/image/icons/edit.svg";

import { useEffect } from "react";
import { Button } from "@/shared/ui/Button/Button";

import { MOCK_USER } from "../mock_user";

interface PersonalFormValues {
  email: string;
  name: string;
  birthDate: string;
  gender: string;
  cityId: string;
  about: string;
}

const PersonalSection = () => {
  const { control, reset } = useForm<PersonalFormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      birthDate: "",
      gender: "",
      cityId: "",
      about: "",
    },
  });

  useEffect(() => {
    reset({
      email: MOCK_USER.email,
      name: MOCK_USER.name,
      birthDate: MOCK_USER.birthDate,
      gender: MOCK_USER.gender,
      cityId: MOCK_USER.cityId,
      about: MOCK_USER.about,
    });
  }, [reset]);

  return (
    <div className={styles.main}>
      <section className={styles.about}>
        <div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                label="Почта"
                placeholder="Введите вашу почту"
                value={field.value}
                onChange={field.onChange}
                iconRight={<img src={EditIcon} alt="Редактировать" />}
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                label="Имя"
                placeholder="Введите ваше имя"
                value={field.value}
                onChange={field.onChange}
                iconRight={<img src={EditIcon} alt="Редактировать" />}
              />
            )}
          />
          <div className={styles.row}>
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
          <div className={styles.field}>
            <label className={styles.label}>О себе</label>
            <textarea
              className={styles.textarea}
              placeholder="Напишите что-нибудь о себе"
            />
          </div>
        </div>
        <Button>Сохранить</Button>
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
              <img src={EditPhoto} alt="" className={styles.addIcon} />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default PersonalSection;
