import { useNavigate } from 'react-router-dom';

export const MovementsHomeTable = ({ data }) => {
  const navigate = useNavigate()
  let movements = data.data.body.movements
  let sortedMovementsByDate = movements.sort((a, b) => new Date(b.date) - new Date(a.date));
  sortedMovementsByDate.forEach(movement => {
    movement.date = movement.date.split('T')[0].split('-').reverse().join('/')
  })

  const movementsLastTen = movements.slice(0, 10)

  const movementDetail = (id) => {
    navigate(`/movements/${id}`)
  }
  return (
    <>

      <table className="w-10/12 mt-10 mb-0 mx-auto">
        <thead>
          <tr>
            <th>Concept</th>
            <th>Category</th>
            <th className="hidden">Type</th>
            <th>Amount</th>
            <th className="">Date</th>
          </tr>
        </thead>
        <tbody>
          {movementsLastTen.map(movement => (
            <tr key={movement.id} className='text-center' onClick={() => movementDetail(movement.id)}>
              <td>{movement.concept}</td>
              <td>{movement.Category.name}</td>
              <td className="hidden">{movement.Type.name}</td>
              <td>{movement.amount}</td>
              <td className="">{movement.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
