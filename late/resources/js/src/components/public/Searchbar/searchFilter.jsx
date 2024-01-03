export const searchFilter = (
    searchValue,
    products,
    searchBy = "designation"
) => {
    let filteredList = searchValue
        ? products.filter((x) =>
              x[searchBy].toLowerCase().includes(searchValue.toLowerCase())
          )
        : products;
    return filteredList;
};
