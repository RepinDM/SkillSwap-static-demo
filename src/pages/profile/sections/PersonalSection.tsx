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
import { useAppSelector, useAppDispatch } from "@/services/hooks";
import { selectUser } from "@/services/slices/authSlice";
import { editUser } from "@/services/actions/editUser";

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ABOUT_MAX_LENGTH = 300;
const MIN_PASSWORD_LENGTH = 6;

const formatBirthDate = (birthDate?: string) => {
  if (!birthDate) return "";
  const parsedDate = new Date(birthDate);
  return Number.isNaN(parsedDate.getTime())
    ? birthDate
    : parsedDate.toISOString().split("T")[0];
};

const PersonalSection = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [email, setEmail] = useState(currentUser?.email || "");
  const [name, setName] = useState(currentUser?.name || "");
  const [birthDate, setBirthDate] = useState<string>(
    formatBirthDate(currentUser?.birthDate)
  );
  const [gender, setGender] = useState(currentUser?.gender || "");
  const [city, setCity] = useState(currentUser?.city?.id?.toString() || "");
  const [about, setAbout] = useState(currentUser?.about || "");
  const [avatarPreview, setAvatarPreview] = useState(
    currentUser?.avatar || ""
  );

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [editableFields, setEditableFields] = useState({
    email: false,
    name: false,
    about: false,
  });

  useEffect(() => {
    return () => {
      if (avatarPreview?.startsWith("blob:")) {
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

  // Валидация пароля — только если поля открыты и хотя бы одно заполнено
  const newPasswordError = useMemo(() => {
    if (!showPasswordFields || !newPassword) return undefined;
    if (newPassword.length < MIN_PASSWORD_LENGTH)
      return `Минимум ${MIN_PASSWORD_LENGTH} символов`;
    return undefined;
  }, [newPassword, showPasswordFields]);

  const isPasswordSectionValid = useMemo(() => {
    if (!showPasswordFields) return true;
    // Если секция открыта но поля пустые — не блокируем сохранение
    if (!currentPassword && !newPassword) return true;
    // Если заполнено хотя бы одно — оба должны быть валидны
    return !!currentPassword && !!newPassword && !newPasswordError;
  }, [showPasswordFields, currentPassword, newPassword, newPasswordError]);

  const isFormValid =
    !emailError && !aboutError && !newPasswordError && isPasswordSectionValid;

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (avatarPreview?.startsWith("blob:")) URL.revokeObjectURL(avatarPreview);
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const enableFieldEditing = (field: "email" | "name" | "about") => {
    setEditableFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleSave = async () => {
    setPasswordError(null);
    setSaveSuccess(false);
    setIsSaving(true);

    try {
      await dispatch(
        editUser({
          email,
          name,
          birthDate,
          gender,
          city,
          about,
          ...(avatarFile && { avatar: avatarFile }),
          ...(showPasswordFields && currentPassword && newPassword
            ? { currentPassword, newPassword }
            : {}),
        })
      ).unwrap();

      // Успех
      setSaveSuccess(true);
      setEditableFields({ email: false, name: false, about: false });

      // Сбрасываем поля пароля после успешного сохранения
      if (showPasswordFields && currentPassword && newPassword) {
        setCurrentPassword("");
        setNewPassword("");
        setShowPasswordFields(false);
      }

    } catch (error: unknown) {
      // Бэкенд вернул ошибку — проверяем, связана ли она с паролем
      // Формат ответа зависит от бэкенда, адаптируй поле под реальный ключ
      const err = error as Record<string, unknown>;

      if (err?.currentPassword || err?.password || err?.detail) {
        const msg =
          (err.currentPassword as string) ||
          (err.password as string) ||
          (err.detail as string) ||
          "Неверный старый пароль";
        setPasswordError(msg);
      } else {
        setPasswordError("Произошла ошибка при сохранении");
      }
    } finally {
      setIsSaving(false);
    }
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
          onClick={() => {
            setShowPasswordFields((prev) => !prev);
            setPasswordError(null);
            setCurrentPassword("");
            setNewPassword("");
          }}
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
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    setPasswordError(null); // сбрасываем ошибку при вводе
                  }}
                  placeholder="Введите старый пароль"
                  error={passwordError ?? undefined}
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
                  error={newPasswordError}
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

        {/* остальные поля без изменений */}
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
          <Calendar label="Дата рождения" value={birthDate} onChange={setBirthDate} />
          <GenderSelect label="Пол" value={gender} onChange={setGender} />
        </div>

        <div className={styles.field}>
          <CitySelect label="Город" value={city} onChange={setCity} />
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
          <div className={styles.buttonBlock}>
            <Button disabled={!isFormValid || isSaving} onClick={handleSave}>
              {isSaving ? "Сохранение..." : "Сохранить"}
            </Button>
            {saveSuccess && (
              <span className={styles.successText}>Данные сохранены!</span>
            )}
          </div>
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
