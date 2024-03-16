import './inventory.css';

function Inventory () {
    return (
        <div className='overallPage'>
            <div className="in-kind-header-box">
                <div className="in-kind-text">
                    <p className="title">In-Kind Donation</p>
                </div>
                <div className="tabs">
                    <button className="inventory"></button>
                    <button className="donation-log"></button>
                </div>
            </div>
            <div className="search-box">
                <div className="search"></div>
                    <input id="search-bar">search</input>
                <div className="filter"></div>
                    <button>fitler</button>
                <div className="sort"></div>
                    <button>sort</button>
                <div className="create">
                    <button>create</button>
                </div>
            </div>
            <table className=""></table>
        </div>
    )
}