import { Link } from "react-router-dom";

Link
const HabitsPage = () => {
    return (
        <>
            <nav>
                <h1>Habbits</h1>
                <Link to="/"><h2>Översikt</h2></Link>
            </nav>
        </>
        
        
    )
}

export default HabitsPage;