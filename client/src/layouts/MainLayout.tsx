import Navbar from "../components/main/Navbar"

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
        <Navbar />
        <main>{children}</main>
    </>
  )
}

export default MainLayout