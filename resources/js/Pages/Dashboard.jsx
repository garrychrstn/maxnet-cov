import Nav from "./Components/Nav";

const Dashboard = ({ packet, user }) => {
    return (  
        <>
            <Nav user={user}/>
            <div className="container w3/4 m-auto">
                <h1 className="text-2xl ">NEW REQUEST</h1>
                {/*  FOR NEW REQUEST */}
                <table>

                </table>
                <h1>
                    <h1>ACTIVE PLAN AND USER</h1>
                </h1>
            </div>
        </>
    );
}
 
export default Dashboard;