'use client'

import CountUp from "react-countup"

const AnimatedCounter = ({amount}: {amount: number}) => {
  return (
    <div>
        <CountUp 
        end={amount} 
        prefix="$"
        decimal="."
        duration={2.75}
        decimals={2}
        className="w-full"
        />
    </div>
  )
}

export default AnimatedCounter