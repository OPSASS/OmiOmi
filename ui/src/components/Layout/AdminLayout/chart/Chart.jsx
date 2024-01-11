import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import './chart.scss'

export default function Chart({ title, data, dataKey, grid }) {
  return (
    <div>
      <p className='featuredTitle'>{title}</p>
      <ResponsiveContainer width='100%' aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey='name' stroke='var(--secondary)' />
          <Line type='monotone' dataKey={dataKey} stroke='var(--secondary)' />
          <Tooltip />
          {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray='5 5' />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
