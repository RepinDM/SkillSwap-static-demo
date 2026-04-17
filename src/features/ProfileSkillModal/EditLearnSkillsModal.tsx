import { Button } from "@/shared/ui/Button/Button";
import { useEffect } from "react";
import {
  useForm,
  Controller,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { selectCategoryItems, selectStatus } from "@/services/slices/skillCardsSlice";

import styles from "./EditLearnSkillsModal.module.scss";
import { saveLearnSkills } from "@/services/actions/skills";

type SkillItem = {
  categoryId: string;
  subcategoryId: string;
};

type FormValues = {
  skills: SkillItem[];
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: SkillItem[];
  currentTeachSkill: {
    title: string;
    description: string;
    subcategoryId: string;
    imageUrls: string[];
  };
};

export const EditLearnSkillsModal = ({
  isOpen,
  onClose,
  initialData,
  currentTeachSkill,
}: Props) => {
  const categoryItems = useAppSelector(selectCategoryItems);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      skills: [{ categoryId: "", subcategoryId: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const watchedSkills = useWatch({
    control,
    name: "skills",
  });

  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const isSaving = status === "loading";

  useEffect(() => {
    if (!isOpen) return;

    if (initialData?.length) {
      reset({
        skills: initialData,
      });
    } else {
      reset({
        skills: [{ categoryId: "", subcategoryId: "" }],
      });
    }
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  const onSubmit = (data: FormValues) => {
    dispatch(saveLearnSkills({
      skills: data.skills,
      currentTeachSkill,
    }));
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Хочу научиться</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.list}>
            {fields.map((field, index) => {
              const categoryId =
                watchedSkills?.[index]?.categoryId || "";

              const subcategories =
                categoryItems.find(
                  (c) => c.id === Number(categoryId)
                )?.subcategories || [];

              return (
                <div key={field.id} className={styles.row}>
                  {/* CATEGORY */}
                  <Controller
                    control={control}
                    name={`skills.${index}.categoryId`}
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
                    name={`skills.${index}.subcategoryId`}
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

                  {/* REMOVE */}
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => remove(index)}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          {/* ADD */}
          <button
            type="button"
            className={styles.addBtn}
            onClick={() =>
              append({ categoryId: "", subcategoryId: "" })
            }
          >
            + Добавить навык
          </button>

          {/* ACTIONS */}
          <div className={styles.actions}>
            <Button variant="secondary" type="button" onClick={onClose}>
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