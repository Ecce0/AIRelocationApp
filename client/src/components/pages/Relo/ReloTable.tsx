interface ReloTableProps {
  monthlySalary: string
  monthlyTrans: string
  monthlyUtilities: string
  oneBRApt: string
  mortgIntRate: string
}

const ReloTable = ({ monthlySalary, monthlyTrans, monthlyUtilities, oneBRApt, mortgIntRate }: ReloTableProps) => {
  return (
    <div className="">
      <div className="overflow-x-auto rounded-sm bg-base-200">
        <table className="table">
          <tbody>
            <tr>
              <th className="w-1/5">Monthly Salary After Tax</th>
              <th>Monthly Basic Utilities</th>
              <th>Monthly Transportation Pass</th>
               <th>1-BR Apartment</th>
               <th>Mortgage Interest Rate</th>
            </tr>
            <tr>
              <td className="w-1/4">{monthlySalary}</td>
              <td>{monthlyUtilities}</td>
              <td>{monthlyTrans}</td>
              <td>{oneBRApt}</td>
              <td>{mortgIntRate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReloTable
