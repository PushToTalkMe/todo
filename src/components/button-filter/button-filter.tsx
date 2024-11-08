import { ButtonFilterProps } from "./button-filter.interface";
import styles from "./button-filter.module.css";
import cn from "classnames";

export const ButtonFilter = ({
  filter,
  filterState,
  setFilter,
  children,
}: ButtonFilterProps) => {
  return (
    <button
      type="button"
      data-testid={filter}
      className={cn(styles.button, {
        [styles.active]: filter === filterState,
      })}
      onClick={() => setFilter(filter)}
    >
      {children}
    </button>
  );
};
