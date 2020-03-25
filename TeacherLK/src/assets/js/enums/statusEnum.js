const Statuses = {
    PLANNED: {
        value: 0,
        text: "Запланировано",
        color: "success"
    },
    DONE: {
        value: 1,
        text: "Проведено",
        color: "primary",
        disabled: true
    },
    CANCELED: {
        value: 2,
        text: "Отменено",
        color: "error"
    }
};

Object.freeze(Statuses);

export default Statuses;
