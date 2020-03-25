const Marks = {
    FIVE: {
        value: 5,
        text: "Отлично",
        color: "success",
        icon: "mdi-numeric-5-box"
    },
    FOUR: {
        value: 4,
        text: "Хорошо",
        color: "info",
        icon: "mdi-numeric-4-box"
    },
    THREE: {
        value: 3,
        text: "Удовл-о",
        color: "primary",
        icon: "mdi-numeric-3-box"
    },
    TWO: {
        value: 2,
        text: "Плохо",
        color: "error",
        icon: "mdi-numeric-2-box"
    }
};

Object.freeze(Marks);

export default Marks;
