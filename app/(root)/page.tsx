import HeaderBox from "@/components/custom/HeaderBox"
import TotalBalanceBox from "@/components/custom/TotalBalanceBox"


const Home = () => {
const loggedIn = {firstName: "Sophia"}

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn.firstName || 'Guest'}
            subtext="Access and manage your accounts and transactions effeciently"
          />
          <TotalBalanceBox 
          accounts={[]}
          totalBanks={4}
          totalCurrentBalance={2340.65}
          />
        </header>
      </div>
    </section>
  )
}

export default Home