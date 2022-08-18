import { useNavigate } from 'react-router-dom';

export const MovementsTable = ({ data, filter }) => {
  const navigate = useNavigate()
  const movements = data.data.body.movements

  const filteredMovements = movements.filter(movement => {
    if (filter === 'income') {
      return movement.Type.name === 'income'
    }
    if (filter === 'expenses') {
      return movement.Type.name === 'expenses'
    }
    return true
  }
  )
  const movementDetail = (id) => {

    navigate(`/movements/${id}`)
  }
  return (
    <table className="w-10/12 mt-10 mb-0 mx-auto">
      <thead>
        <tr>
          <th>Concept</th>
          <th>Category</th>
          <th className="hidden sm:block">Type</th>
          <th>Amount</th>
          <th className="hidden">Date</th>
        </tr>
      </thead>
      <tbody>
        {filteredMovements.map(movement => (
          <tr key={movement.id} className='text-center' onClick={() => movementDetail(movement.id)}>
            <td>{movement.concept}</td>
            <td>{movement.Category.name}</td>
            <td className="hidden">{movement.Type.name}</td>
            <td>{movement.amount}</td>
            <td className="hidden">{movement.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
