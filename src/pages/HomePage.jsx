const HomePage = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <section>
                <h2>Senaste ärenden</h2>
                {/* Här visas de senaste todos du har arbetat med. */}
            </section>
            <section>
                <h2>Viktigaste rutiner</h2>
                {/* De tre rutiner med högst antal repetitioner visas här. */}
            </section>
            <section>
                <h2>Kommande händelser</h2>
                {/* De tre nästkommande händelserna visas här. */}
            </section>
        </div>

    )
}

export default HomePage