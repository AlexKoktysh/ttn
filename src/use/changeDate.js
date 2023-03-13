export const changeDate_custom = (itemsMap, label, value, setFunction) => {
    const res = itemsMap.find((el) => el.label === label);
    res.value = value;
    setFunction((prev) => {
        const result = prev.map((i) => {
            if (i.label === label) {
                return res;
            }
            return i;
        });
        return result;
    });
};