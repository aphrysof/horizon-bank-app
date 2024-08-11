import HeaderBox from "@/components/custom/HeaderBox"
import RightSidebar from "@/components/custom/RightSidebar"
import TotalBalanceBox from "@/components/custom/TotalBalanceBox"
import { getLoggedInUser } from "@/lib/actions/user.actions"


const Home = async () => {

const user = await getLoggedInUser()

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={user.name|| 'Guest'}
            subtext="Access and manage your accounts and transactions effeciently"
          />
          <TotalBalanceBox 
          accounts={[]}
          totalBanks={4}
          totalCurrentBalance={2340.65}
          />
        </header>

        RECENT TRANSACTIONS
      </div>

      <RightSidebar user={user} transaction={[]} banks={[{currentBalance: 123.56}, {currentBalance: 345.66}]} />
    </section>
  )
}

export default Home