import styles from "./ListMembers.module.css";

const ListMembers = ({isShared= false}) => {
  return <div className={styles.members}>{isShared? 'Shared' : "Only u"}</div>;
};

export default ListMembers;
