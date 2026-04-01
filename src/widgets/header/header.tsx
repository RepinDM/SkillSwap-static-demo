import styles from './header.module.scss'
import { Logo } from '../../shared/ui/Logo/Logo';
import { Button } from '../../shared/ui/Button/Button';
import { Avatar } from '../../shared/ui/Avatar/Avatar';

export const Header = () => {
  const isLoggedIn = true;

  return (
    <header className={styles.header}>
      <Logo></Logo>
      <nav></nav>
      <input></input>
      <div className={styles.rightBlock}>
        {isLoggedIn ? (
          <div className={styles.userActions}>
            <button className={styles.iconBtn}><img/></button>
            <button className={styles.iconBtn}><img/></button>
            <button className={styles.iconBtn}><img/></button>
            <Avatar/>
          </div>
        ) : (
          <div className={styles.authButtons}>
            <Button variant="secondary">Войти</Button>
            <Button variant="primary">Регистрация</Button>
          </div>
        )}
      </div>
    </header>
  )
}