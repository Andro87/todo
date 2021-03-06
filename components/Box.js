import styles from "./Box.module.scss";
import { useState } from "react";
export default function Box(props) {
    const { item, onComplete } = props;
    const [done, setDone] = useState(false);
    const [show, setShow] = useState(false);
    return (
        <div className={`${styles.activitie} ${show ? styles.show : null}`}>
            <div className={styles.button_wrap}>
                <button
                    type="button"
                    name="button"
                    title="button"
                    className={`${styles.button_circle} ${
                        done ? styles.done : null
                    }`}
                    onClick={() => {
                        onComplete(item), setDone(!done);
                    }}
                >
                    {done ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="9"
                        >
                            <path
                                fill="none"
                                stroke="#FFF"
                                stroke-width="2"
                                d="M1 4.304L3.696 7l6-6"
                            />
                        </svg>
                    ) : null}
                </button>
            </div>

            <p className={done ? styles.cut : null}>{item.content}</p>

            {done ? (
                <button
                    type="button"
                    name="button"
                    title="button"
                    className={styles.cross_button}
                    onClick={() => setShow(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                    >
                        <path
                            fill="#494C6B"
                            fill-rule="evenodd"
                            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                        />
                    </svg>
                </button>
            ) : null}
        </div>
    );
}
