import { Rowdies } from 'next/font/google';
import './inventory.css';
import InventoryEntry from './inventoryentry';

function Inventory() {
    return (
        <div className='overallPage'>
            <div className = "search-wrapper">
                <div className="search">
                    {/* <input>Search</input> */}
                </div>
                <div> 
                    
                </div>
            </div>
            <div className="inventory-wrapper">
                <table className="">
                    <thead>
                        <tr>
                            <th className="inv-col-head">Donor</th>
                            <th className="inv-col-head">Items Donated</th>
                            <th className="inv-col-head">Item Type</th>
                            <th className="inv-col-head">Amount</th>
                            <th className="inv-col-head">Date Donated</th>
                            <th className="inv-col-head">Thanked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tb></tb> */}
                         <InventoryEntry donor = "surbhisaadhvilakshminarayannanakila" item_donated = "crocs" item_type = "shoes" amount = "5" date = "march 4adsfajdflasdflajdslfkjadklfjasdkfjadlskfjaldjfadlksjfa" />
                    </tbody>
                    
                </table>
            </div>
        </div>
    )
}

export default Inventory;