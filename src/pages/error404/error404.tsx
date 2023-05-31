import styles from "./error404.module.css";

interface Error404Props {}

export const Error404: React.FunctionComponent<Error404Props> = (props) => {
  return <div className={styles.error404}>
    404</div>;
};