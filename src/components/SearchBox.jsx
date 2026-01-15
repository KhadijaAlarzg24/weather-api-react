import { useState } from "react";
import { Search } from "lucide-react"; 

// استقبال الدالة onSearch كخاصية
const SearchBox = ({ onSearch }) => { 
    const [city, setCity] = useState("");
    
    const handleSearch = () => {
        if (city.trim() === "") return;
        onSearch(city); 
        setCity("");
    };

    return(
        // 🛑 التعديل هنا: نستخدم max-w-sm لتقييد عرضه وجعله متناسقًا
        <div 
            className="
            
                flex items-center w-full max-w-sm p-1 
                bg-white/30
                backdrop-blur-none
                rounded-full 
                shadow-2xl 
                border-2 border-blue-400/50 
                overflow-hidden
            "
        > 
            <input 
                type="text" 
                placeholder="Enter city name..." 
                value={city} 
                className="
                    
                   flex items-center w-full max-w-sm p-1 
                   
                    text-white 
                    bg-white/30
                    backdrop-blur-none
                     rounded-full 
                    shadow-2xl
                    overflow-hidden 
                    text-lg
                
                   
    
                "
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
            <button 
                onClick={handleSearch} 
                className="
                    bg-blue-500 
                    text-white 
                    w-12 h-12 
                    flex-shrink-0 
                    flex items-center justify-center 
                    rounded-full 
                    hover:bg-blue-600 
                    cursor-pointer 
                    transition-colors 
                    shadow-lg
                "
            >
                <Search className="w-6 h-6" /> 
            </button>
        </div>
    )
}
export default SearchBox;