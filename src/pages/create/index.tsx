import { useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { EditTeachSkillModal } from "@/features/ProfileSkillModal/EditTeachSkillModal";
import styles from "./CreatePage.module.scss";

const CreatePage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className={styles.page}>
      <div className={styles.panel}>
        <h1 className={styles.title}>Создайте предложение</h1>
        <p className={styles.description}>
          Расскажите, чему готовы научить. Предложение появится в каталоге и сохранится в вашем браузере.
        </p>
        <Button onClick={() => setIsFormOpen(true)}>Добавить навык</Button>
      </div>
      <EditTeachSkillModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={{ title: "", description: "", categoryId: "", subcategoryId: "", imageUrls: [] }}
      />
    </section>
  );
};
export default CreatePage;
