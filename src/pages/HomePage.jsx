import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <section>
                    <h2> Senaste ärenden {/* De tre senaste ärendena visas här. */}
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <br />
                        <Link to="/todos">Gå till alla ärenden</Link>
                    </h2>
                </section>  
                
                <section>
                    <h2> Viktigaste rutiner {/* De tre rutiner med högst antal repetitioner visas här. */}
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <br />
                        <Link to="/habits">Gå till alla rutiner</Link>
                    </h2>
                </section>  

                <section>
                    <h2> Kommande händelser {/* De tre nästkommande händelserna visas här. */}
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <br />
                        <Link to="/events">Gå till alla händelser</Link>
                    </h2>
                </section>  
            </nav>
        </div>

    )
}

export default HomePage