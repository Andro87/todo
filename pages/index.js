import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { useState, useEffect, useRef } from "react";
import Box from "../components/Box";
import { generateId } from "../utilities/generateId";

const getData = (visible, items) => {
    if (visible === "complete") {
        return items.filter(item => item.complete);
    }
    if (visible === "incomplete") {
        return items.filter(item => !item.complete);
    }
    return items;
};

export default function Home() {
    const [items, setItems] = useState([
        {
            content: "Complete online JavaScript course",
            complete: false,
            id: generateId()
        },
        {
            content: "Jog around the park 3x",
            complete: false,
            id: generateId()
        },
        {
            content: "10 minutes meditation",
            complete: false,
            id: generateId()
        },
        {
            content: "Read for 1 hour",
            complete: false,
            id: generateId()
        },
        {
            content: "Pick up groceries",
            complete: false,
            id: generateId()
        },
        {
            content: "Complete Todo App on Frontend Mentor",
            complete: false,
            id: generateId()
        }
    ]);

    const [dark, setDark] = useState(false);
    const todo = useRef();
    const [visible, setVisible] = useState();
    useEffect(() => {
        if (dark) {
            document.documentElement.dataset.theme = "dark";
        } else {
            delete document.documentElement.dataset.theme;
        }
    }, [dark]);
    const data = getData(visible, items);
    return (
        <div className={styles.main_wrap}>
            <Head>
                <title>Frontend Mentor | Todo app</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.container}>
                <div className={styles.header_wrap}>
                    <h1>TODO</h1>

                    <button
                        type="button"
                        name="button"
                        title="button"
                        className={styles.switch}
                        onClick={() => setDark(dark => !dark)}
                    >
                        {!dark ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                            >
                                <path
                                    fill="#FFF"
                                    fill-rule="evenodd"
                                    d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                            >
                                <path
                                    fill="#FFF"
                                    fill-rule="evenodd"
                                    d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
                                />
                            </svg>
                        )}
                    </button>
                </div>
                <form
                    className={styles.new_todo}
                    onSubmit={e => {
                        e.preventDefault();
                        setItems(items => [
                            ...items,
                            {
                                content: todo.current.value,
                                complete: false,
                                id: generateId()
                            }
                        ]);
                    }}
                >
                    <button
                        type="submit"
                        name="submit"
                        title="button"
                        className={styles.button_circle}
                    ></button>
                    <input
                        type="text"
                        placeholder="Create a new todo..."
                        title="text"
                        className={styles.input}
                        ref={todo}
                    />
                </form>
                <div className={styles.box_wrap}>
                    {data.map(item => (
                        <Box
                            item={item}
                            onComplete={i => {
                                const newValues = items.map(v => {
                                    if (v.id === i.id) {
                                        return { ...v, complete: true };
                                    }
                                    return v;
                                });
                                setItems(newValues);
                            }}
                        />
                    ))}
                </div>
                <div className={styles.details}>
                    <p>
                        {data.filter(item => !item.complete).length}
                        {""} items left
                    </p>
                    <div className={styles.button_desktop}>
                        <button
                            type="button"
                            name="button"
                            className={`${styles.button_details} ${styles.blu}`}
                            onClick={() => setVisible("undefined")}
                        >
                            All
                        </button>
                        <button
                            type="button"
                            name="button"
                            className={styles.button_details}
                            onClick={() => setVisible("incomplete")}
                        >
                            Active
                        </button>
                        <button
                            type="button"
                            name="button"
                            className={styles.button_details}
                            onClick={() => setVisible("complete")}
                        >
                            Completed
                        </button>
                    </div>
                    <button
                        type="button"
                        name="button"
                        className={`${styles.button_details} ${styles.completed}`}
                        onClick={() => setVisible("incomplete")}
                    >
                        Clear Completed
                    </button>
                </div>
                <div className={styles.button_mobile}>
                    <button
                        type="button"
                        name="button"
                        className={styles.button_details}
                        onClick={() => setVisible("undefined")}
                    >
                        All
                    </button>
                    <button
                        type="button"
                        name="button"
                        className={styles.button_details}
                        onClick={() => setVisible("incomplete")}
                    >
                        Active
                    </button>
                    <button
                        type="button"
                        name="button"
                        className={styles.button_details}
                        onClick={() => setVisible("complete")}
                    >
                        Completed
                    </button>
                </div>
            </div>
            <p className={styles.drop}>Drag and drop to reorder list</p>
        </div>
    );
}
