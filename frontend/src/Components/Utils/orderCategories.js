function compare(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
export const orderCategories = (categoriesFiltered) => {
  return categoriesFiltered.sort(compare)

}

export const orderCategoriesForUpdate = (categoriesFiltered, movement) => {
  // Order categories by name
  categoriesFiltered.sort(compare);
  // put the selected category first in the array
  let selectedCategory = categoriesFiltered.find(category => category.name === movement.Category.name)
  let index = categoriesFiltered.indexOf(selectedCategory)
  categoriesFiltered.splice(index, 1)
  categoriesFiltered.unshift(selectedCategory)
  return categoriesFiltered

}
