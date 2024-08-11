import HeaderBox from "@/components/custom/HeaderBox"
import RecentTransactions from "@/components/custom/RecentTransactions"
import RightSidebar from "@/components/custom/RightSidebar"
import TotalBalanceBox from "@/components/custom/TotalBalanceBox"
import { getAccount, getAccounts } from "@/lib/actions/bank.actions"
import { getLoggedInUser } from "@/lib/actions/user.actions"


const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {

const currentPage = Number(page as string) || 1;

const user = await getLoggedInUser()

const accounts = await getAccounts({
  userId: user.$id
})

const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId


const account = await getAccount({ appwriteItemId })

console.log(account)

if(!accounts) return;

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={user.firstName|| 'Guest'}
            subtext="Access and manage your accounts and transactions effeciently"
          />
          <TotalBalanceBox 
            accounts={accounts.data}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions 
          accounts={accounts.data}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar 
        user={user}
        transactions={accounts?.transactions}
        banks={accounts.data?.slice(0, 2)}
      />
    </section>
  )
}

export default Home