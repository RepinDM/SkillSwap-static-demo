import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./EditTeachSkillModal.module.scss";
import { Button } from "@/shared/ui/Button/Button";

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
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
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
        <h2>Редактировать навык</h2>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input className={styles.input} {...register("title")} />
          <textarea className={styles.textarea} {...register("description")} />

          <div className={styles.buttons}>
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