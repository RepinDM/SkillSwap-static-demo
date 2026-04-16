import { useEffect, useRef, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { selectCategoryItems, selectStatus } from "@/services/slices/skillCardsSlice";

import styles from "./EditTeachSkillModal.module.scss";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/input/input";

import galleryAddIcon from "@/shared/image/icons/gallery-add.svg";
import crossIcon from "@/shared/image/icons/cross.svg";
import { saveTeachSkill } from "@/services/actions/skills";

type FormData = {
  title: string;
  description: string;
  categoryId: string;
  subcategoryId: string;
  images: File[];
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  currentLearnSkills: { subcategoryId: string }[];
  initialData?: {
    title: string;
    description: string;
    imageUrls?: string[];
    categoryId?: string;
    subcategoryId?: string;
  };
};

export const EditTeachSkillModal = ({
  isOpen,
  onClose,
  initialData,
  currentLearnSkills,
}: Props) => {
  const categoryItems = useAppSelector(selectCategoryItems);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const previewUrlsRef = useRef<string[]>([]);
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectStatus);
  const isSaving = status === "loading";

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      subcategoryId: "",
      images: [],
    },
  });

  const selectedCategoryId = useWatch({
    control,
    name: "categoryId",
  });

  const prevCategoryIdRef = useRef<string>("");

  useEffect(() => {
    if (!isOpen || !initialData) return;

    prevCategoryIdRef.current = initialData.categoryId || "";

    reset({
      title: initialData.title,
      description: initialData.description,
      categoryId: initialData.categoryId || "",
      subcategoryId: initialData.subcategoryId || "",
      images: [],
    });

    setExistingImageUrls(initialData.imageUrls || []);
    setImagePreviews([]);
  }, [isOpen, initialData, reset]);

  // Сбрасываем subcategoryId только если категория реально изменилась пользователем
  useEffect(() => {
    if (selectedCategoryId === prevCategoryIdRef.current) return;
    prevCategoryIdRef.current = selectedCategoryId;
    setValue("subcategoryId", "");
  }, [selectedCategoryId, setValue]);

  const removeExistingImage = (index: number) => {
    setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  const processFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    const current = getValues("images") || [];
    const updated = [...current, ...newFiles].slice(0, 7);

    // очистка старых URL
    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));

    const newUrls = updated.map((file) => URL.createObjectURL(file));
    previewUrlsRef.current = newUrls;

    setValue("images", updated);
    setImagePreviews(newUrls);
  };

  const removeImage = (index: number) => {
    const current = getValues("images") || [];
    const updated = current.filter((_, i) => i !== index);

    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));

    const newUrls = updated.map((file) => URL.createObjectURL(file));
    previewUrlsRef.current = newUrls;

    setValue("images", updated);
    setImagePreviews(newUrls);
  };

  // DRAG & DROP
  const handleDropZoneClick = () => fileInputRef.current?.click();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    processFiles(e.dataTransfer.files);
  };

  const onSubmit = (data: FormData) => {
    dispatch(saveTeachSkill({
      ...data,
      existingImageUrls,
      currentLearnSkills,
    }));
    onClose();
  };

  const subcategories =
    categoryItems.find((c) => c.id === Number(selectedCategoryId))
      ?.subcategories || [];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Редактировать навык</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

          {/* TITLE */}
          <Input
            label="Название"
            placeholder="Введите название"
            {...register("title")}
            onChange={(e) => setValue("title", e.target.value)}
          />

          {/* DESCRIPTION */}
          <Input
            label="Описание"
            placeholder="Введите описание"
            {...register("description")}
            onChange={(e) => setValue("description", e.target.value)}
          />

          {/* CATEGORY */}
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <select {...field} className={styles.select}>
                <option value="">Категория</option>
                {categoryItems.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
          />

          {/* SUBCATEGORY */}
          <Controller
            control={control}
            name="subcategoryId"
            render={({ field }) => (
              <select {...field} className={styles.select}>
                <option value="">Подкатегория</option>
                {subcategories.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            )}
          />

          {/* UPLOAD */}
          <div
            className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ""}`}
            onClick={handleDropZoneClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <img src={galleryAddIcon} />
            <p>Перетащите или выберите изображения</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            hidden
            onChange={(e) => processFiles(e.target.files)}
          />

          <div className={styles.imagePreviewList}>
            {existingImageUrls.map((src, i) => (
              <div key={`existing-${i}`} className={styles.imagePreviewItem}>
                <img src={src} className={styles.previewImage} />
                {/**input НЕ менять на компонент Input */}
                <input
                  type="hidden"
                  name="existingTeachSkillImages"
                  value={src}
                />

                <button
                  type="button"
                  className={styles.removeImageBtn}
                  onClick={() => removeExistingImage(i)}
                >
                  <img src={crossIcon} />
                </button>
              </div>
            ))}

            {imagePreviews.map((src, i) => (
              <div key={`new-${i}`} className={styles.imagePreviewItem}>
                <img src={src} className={styles.previewImage} />
                <button
                  type="button"
                  className={styles.removeImageBtn}
                  onClick={() => removeImage(i)}
                >
                  <img src={crossIcon} />
                </button>
              </div>
            ))}
          </div>

          {/* BUTTONS */}
          <div className={styles.buttons}>
            <Button type="button" variant="secondary" onClick={onClose}>
              Отмена
            </Button>

            <Button type="submit" variant="primary" disabled={isSaving}>
              {isSaving ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};