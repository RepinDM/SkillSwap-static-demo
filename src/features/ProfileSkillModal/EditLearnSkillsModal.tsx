import { Button } from "@/shared/ui/Button/Button";
import { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import styles from "./EditLearnSkillsModal.module.scss";


type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    name: string;
  }[];
};

export const EditLearnSkillsModal = ({
  isOpen,
  onClose,
  initialData,
}: Props) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      skills: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  useEffect(() => {
    if (initialData?.length) {
      reset({
        skills: initialData,
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data: any) => {
    console.log(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Хочу научиться</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.list}>
            {fields.map((field, index) => (
              <div key={field.id} className={styles.row}>
                <Controller
                  control={control}
                  name={`skills.${index}.name`}
                  render={({ field }) => (
                    <input className={styles.input} {...field} />
                  )}
                />

                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => remove(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            className={styles.addBtn}
            onClick={() => append({ name: "" })}
          >
            + Добавить навык
          </button>

          <div className={styles.actions}>
            <Button variant="secondary" type="button" onClick={onClose}>
              Отмена
            </Button>
            <Button variant="primary" type="submit">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};