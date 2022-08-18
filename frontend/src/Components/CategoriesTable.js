import { useNavigate } from 'react-router-dom';

export const CategoriesTable = ({ data, type }) => {
  const navigate = useNavigate()
  const categories = data.data.body.categories

  const typeOfCategory = categories.filter(movement => {
    if (type === 'income') {
      return movement.Type.name === 'income'
    }
    if (type === 'expenses') {
      return movement.Type.name === 'expenses'
    }
    return true
  }
  )

  return (
    <table >
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {typeOfCategory.map(category => (
          <tr key={category.id} onClick={() => {
            navigate(`/categories/${category.id}`)

          }}>
            <td>{category.name}</td>
            <td>{category.Type.name}</td>
          </tr>
        ))}
      </tbody>
    </table >
  )
}