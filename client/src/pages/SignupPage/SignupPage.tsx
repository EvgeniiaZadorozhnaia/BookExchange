import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './SignupPage.module.css';

export default function SignupPage() {
  return (
    <div className={styles.wrapper}>
      <AuthForm title='Зарегистрироваться' type='signup' />
    </div>
  );
}
