import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Input } from "@/shared/ui/input/input";
import editPhotoIcon from "@/shared/image/icons/edit-photo.svg";
import editIcon from "@/shared/image/icons/edit.svg";
import eyeIcon from "@/shared/image/icons/eye.svg";
import eyeSlashIcon from "@/shared/image/icons/eye-slash.svg";
import { Calendar } from "@/features/auth/register-step2/ui/Calendar";
import { CitySelect } from "@/features/auth/register-step2/ui/CitySelect";
import { GenderSelect } from "@/features/auth/register-step2/ui/GenderSelect";
import styles from "./PersonalSection.module.scss";
import { useAppSelector } from "@/services/hooks";
import { selectUser } from "@/services/slices/authSlice";

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ABOUT_MAX_LENGTH = 300;

const PersonalSection = () => {
  const currentUser = useAppSelector(selectUser);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Инициализируем стейт данными из Redux
  const [email, setEmail] = useState(currentUser?.email || "");
  const [name, setName] = useState(currentUser?.name || "");
  const [birthDate, setBirthDate] = useState<string>(
    currentUser?.birthDate
      ? new Date(currentUser.birthDate).toISOString().split("T")[0]
      : ""
  );
  const [gender, setGender] = useState(currentUser?.gender || "");
  const [city, setCity] = useState(currentUser?.city?.id?.toString() || "");
  const [about, setAbout] = useState(currentUser?.about || "");
  const [avatarPreview, setAvatarPreview] = useState(currentUser?.avatar || "");

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [editableFields, setEditableFields] = useState({
    email: false,
    name: false,
    about: false,
  });

  // Если пользователь загрузился позже (например после перезагрузки) — обновляем поля
  useEffect(() => {
    if (!currentUser) return;
    setEmail(currentUser.email || "");
    setName(currentUser.name || "");
    setBirthDate(currentUser.birthDate || "");
    setGender(currentUser.gender || "");
    setCity(currentUser.city?.id?.toString() || "");
    setAbout(currentUser.about || "");
    setAvatarPreview(currentUser.avatar || "");
  }, [currentUser]);

  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const emailError = useMemo(() => {
    if (!email.trim()) return undefined;
    return EMAIL_REGEXP.test(email) ? undefined : "Введите корректный email";
  }, [email]);

  const aboutError = useMemo(() => {
    if (about.length <= ABOUT_MAX_LENGTH) return undefined;
    return `Максимум ${ABOUT_MAX_LENGTH} символов`;
  }, [about]);

  const isFormValid = !emailError && !aboutError;

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (avatarPreview?.startsWith("blob:")) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const enableFieldEditing = (field: "email" | "name" | "about") => {
    setEditableFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleSave = async () => {
    // TODO: отправить на бэкенд когда появится эндпоинт
    console.log("Сохранить:", { email, name, birthDate, gender, city, about });
  };

  return (
    <div className={styles.section}>
      <div className={styles.formColumn}>
        <div className={styles.field}>
          <Input
            label="Почта"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите почту"
            error={emailError}
            disabled={!editableFields.email}
            iconRight={
              <button
                type="button"
                className={styles.editIconButton}
                onClick={() => enableFieldEditing("email")}
                aria-label="Редактировать почту"
              >
                <img src={editIcon} alt="" />
              </button>
            }
          />
        </div>

        <button
          type="button"
          className={styles.passwordLink}
          onClick={() => setShowPasswordFields((prev) => !prev)}
        >
          Изменить пароль
        </button>

        {showPasswordFields && (
          <div className={styles.passwordFields}>
            <div className={styles.field}>
              <label className={styles.label}>Старый пароль</label>
              <div className={styles.passwordInputWrap}>
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Введите старый пароль"
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                >
                  <img src={showCurrentPassword ? eyeSlashIcon : eyeIcon} alt="" />
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Новый пароль</label>
              <div className={styles.passwordInputWrap}>
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Введите новый пароль"
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  <img src={showNewPassword ? eyeSlashIcon : eyeIcon} alt="" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.field}>
          <Input
            label="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя"
            disabled={!editableFields.name}
            iconRight={
              <button
                type="button"
                className={styles.editIconButton}
                onClick={() => enableFieldEditing("name")}
                aria-label="Редактировать имя"
              >
                <img src={editIcon} alt="" />
              </button>
            }
          />
        </div>

        <div className={styles.row}>
          <Calendar
            label="Дата рождения"
            value={birthDate}
            onChange={setBirthDate}
          />
          <GenderSelect
            label="Пол"
            value={gender}
            onChange={setGender}
          />
        </div>

        <div className={styles.field}>
          <CitySelect
            label="Город"
            value={city}
            onChange={setCity}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>О себе</label>
          <div className={styles.textareaWrap}>
            <textarea
              className={`${styles.textarea} ${aboutError ? styles.textareaError : ""}`}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Расскажите немного о себе"
              disabled={!editableFields.about}
            />
            <button
              type="button"
              className={`${styles.editIconButton} ${styles.textareaEditButton}`}
              onClick={() => enableFieldEditing("about")}
              aria-label="Редактировать описание"
            >
              <img src={editIcon} alt="" />
            </button>
          </div>
          <div className={styles.textareaFooter}>
            {aboutError ? (
              <span className={styles.errorText}>{aboutError}</span>
            ) : (
              <span className={styles.hintText}>До {ABOUT_MAX_LENGTH} символов</span>
            )}
            <span className={styles.counter}>{about.length}/{ABOUT_MAX_LENGTH}</span>
          </div>
        </div>

        <div className={styles.buttonRow}>
          <Button disabled={!isFormValid} onClick={handleSave}>
            Сохранить
          </Button>
        </div>
      </div>

      <div className={styles.visualColumn}>
        <div className={styles.avatarWrap}>
          <Avatar src={avatarPreview || undefined} alt="Фото профиля" size={244} />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleAvatarChange}
            className={styles.hiddenInput}
          />
          <button
            type="button"
            className={styles.avatarEditButton}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Изменить фото профиля"
          >
            <img src={editPhotoIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalSection;