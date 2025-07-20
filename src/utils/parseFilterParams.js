const parseType = (type) => {
    const isString = typeof type === "string";
    if (!isString) return;

    const isType = (type) => ["work", "home", "personal"].includes(type);
    if (isType(type)) return type;
};

const parseIsFavourite = (isFavourite) => {
    return typeof isFavourite === "boolean" ? isFavourite : undefined;
};

export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;

    const parsedType = parseType(type);
    const parsedIsFavourite = parseIsFavourite(isFavourite);

    return {
        contactType: parsedType,
        isFavourite: parsedIsFavourite,
    };
};