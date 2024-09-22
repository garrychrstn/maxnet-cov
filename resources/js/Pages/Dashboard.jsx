import Nav from "./Components/Nav";

const Dashboard = ({ packet, user }) => {
    return (  
        <>
            <Nav user={user}/>
            <h1>this is dashboard</h1>
        </>
    );
}
 
export default Dashboard;