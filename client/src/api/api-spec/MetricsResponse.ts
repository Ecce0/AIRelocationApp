export interface CostOfLiving {
  avg_monthly_net_salary: string
  monthly_transport_pass: string
  basic_utilities: string
}

export interface MetricsResponse {
  city: string
  job: string
  salary: string
  costOfLiving: CostOfLiving
  affordability: number
}
