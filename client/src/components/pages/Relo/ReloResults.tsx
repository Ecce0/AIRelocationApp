import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'

interface ReloResultsProps {
  noData?: boolean
  percentage: number
  city: string
  position: string
  salary?: number
  increaseAmount: boolean
}

const formatPercent = (value: number) =>
  Number.isFinite(value) ? `${value.toFixed(2)}%` : '--'

const formatCurrency = (value?: number) =>
  Number.isFinite(value ?? NaN)
    ? `$${(value as number).toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })}`
    : '--'

const ReloResults = ({
  noData,
  percentage,
  city,
  position,
  salary,
  increaseAmount,
}: ReloResultsProps) => {
  if (noData) {
    return (
      <div className="">
        <div className="stats shadow bg-base-200 rounded-lg">
          <div className="stat p-4 text-center flex flex-col items-center gap-3">
            <FaExclamationCircle className="text-error text-3xl" />
            <p className="text-secondary text-sm leading-relaxed max-w-md">
              As I continue to release updates for The Relo Calculation App, I'm continuing to add more
              cities and salary data. For right now, this data is unavailable, but continue to check back
              for updates!
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="">
      <div className="stats shadow bg-base-200 rounded-lg">
        <div className="stat p-2">
          <div className="flex items-center gap-3">
            {increaseAmount ? (
              <FaCheckCircle className="text-success text-2xl" />
            ) : (
              <FaExclamationCircle className="text-error text-2xl" />
            )}
            <div className="stat-value">{formatPercent(percentage)}</div>
            <p className="text-xs text-accent">
              (The monthly salary vs the `city`’s avg monthly salary expressed in percentage)
            </p>
          </div>
          <div className="stat-desc mt-2 text-secondary">
            {city}&apos;s avg. salary for {position}:{' '}
            <span className={increaseAmount ? 'text-success' : 'text-error'}>
              {formatCurrency(salary)}
            </span>
          </div>
          <div className="stat-title mt-1 text-secondary">
            {increaseAmount ? (
              <span className="text-success">
                Based on your current salary, you can root yourself in {city}!
              </span>
            ) : (
              <span className="text-error">
                You will need an increase in salary of {formatPercent(percentage)} to live comfortably in{' '}
                {city}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReloResults
