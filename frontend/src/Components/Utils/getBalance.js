export const getBalance = (data) => {
  return data.data.body.movements.reduce((acc, curr) => {
    if (curr.Type.name === 'income') {
      return acc + curr.amount
    } else {
      return acc - curr.amount
    }
  }, 0)
}