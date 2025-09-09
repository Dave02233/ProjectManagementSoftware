import styles from '../../Styles/SingleItems/LoginButton.module.css';

export const LoginButton = (props) => {


    return (
        <div className={styles.niceButton} onClick={props.onClick}>
          <div className={styles.glowingBorder} />
          <div className={styles.transparentLayer} />
          <div className={styles.outerButton} />
          <div className={styles.innerButton} />
          <div className={styles.text}>Login</div>
        </div>
    )
}