import { useEffect, useRef, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useAppSelector } from "@/services/hooks";
import { selectCategoryItems } from "@/services/slices/skillCardsSlice";

import styles from "./EditTeachSkillModal.module.scss";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/input/input";

import galleryAddIcon from "@/shared/image/icons/gallery-add.svg";
import crossIcon from "@/shared/image/icons/cross.svg";

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
  initialData?: {
    title: string;
    description: string;
  };
};

export const EditTeachSkillModal = ({
  isOpen,
  onClose,
  initialData,
}: Props) => {
  const categoryItems = useAppSelector(selectCategoryItems);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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

  // INIT
  useEffect(() => {
    if (!isOpen) return;

    reset({
      title: initialData?.title || "",
      description: initialData?.description || "",
      categoryId: "",
      subcategoryId: "",
      images: [],
    });

    setImagePreviews([]);
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  // IMAGES (простая логика как в регистрации)
  const processFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    const current = getValues("images") || [];

    const updated = [...current, ...newFiles].slice(0, 7);

    setValue("images", updated);
    setImagePreviews(updated.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (index: number) => {
    const current = getValues("images") || [];
    const updated = current.filter((_, i) => i !== index);

    setValue("images", updated);
    setImagePreviews(updated.map((f) => URL.createObjectURL(f)));
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
    console.log(data);
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

          {/* PREVIEWS */}
          <div className={styles.imagePreviewList}>
            {imagePreviews.map((src, i) => (
              <div key={i} className={styles.imagePreviewItem}>
                <img src={src} />
                <button type="button" onClick={() => removeImage(i)}>
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

            <Button type="submit" variant="primary">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};