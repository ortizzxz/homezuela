import { useState } from "react";
import { Search, X, Bed, Home, DollarSign } from "lucide-react";

interface Filters {
    beds: string;
    price: string;
    location: string;
    types: string[]; // Changed to array for multi-select
}

interface Props {
    onSearch: (filters: Filters) => void;
}

export default function SearchFilters({ onSearch }: Props) {
    const MAX_PRICE = 1_000_000;

    const [filters, setFilters] = useState<Filters>({
        beds: "",
        price: "",
        location: "",
        types: [],
    });

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [priceError, setPriceError] = useState("");

    const handleChange = (key: keyof Omit<Filters, 'types'>, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const toggleType = (type: string) => {
        setFilters((prev) => ({
            ...prev,
            types: prev.types.includes(type)
                ? prev.types.filter(t => t !== type)
                : [...prev.types, type]
        }));
    };

    const handleRemoveFilter = (key: keyof Omit<Filters, 'types'>) => {
        if (key === "price") {
            setMinPrice("");
            setMaxPrice("");
            setPriceError("");
        }
        setFilters((prev) => ({ ...prev, [key]: "" }));
    };

    const clearAllTypes = () => {
        setFilters((prev) => ({ ...prev, types: [] }));
    };

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const sanitizeDecimal = (value: string) => {
        return value
            .replace(/[^0-9.]/g, "")
            .replace(/(\..*)\./g, "$1");
    };

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = sanitizeDecimal(e.target.value);
        setMinPrice(raw);
        if (raw && maxPrice && Number(maxPrice) < Number(raw)) {
            setPriceError("Max price cannot be lower than Min price");
        } else {
            setPriceError("");
        }
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = sanitizeDecimal(e.target.value);
        setMaxPrice(raw);
        if (minPrice && raw && Number(raw) < Number(minPrice)) {
            setPriceError("Max price cannot be lower than Min price");
        } else {
            setPriceError("");
        }
    };

    const handleSearchClick = () => {
        let min = Number(minPrice) || 0;
        let max = Number(maxPrice) || MAX_PRICE;
        if (max < min) max = min;
        onSearch({
            ...filters,
            price: `${min}-${Math.min(max, MAX_PRICE)}`,
        });
    };

    const bedOptions = ["", "1", "2", "3+"];
    const typeOptions = ["house", "flat", "land/terrain", "other"];

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
            {/* First Line: Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-2">
                {/* Location Search */}
                <div className="relative flex-shrink-0 min-w-[240px]">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                        placeholder="City, neighborhood..."
                        value={filters.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                    />
                </div>

                {/* Beds */}
                <div className="flex items-center gap-1 text-sm font-medium text-gray-700 flex-shrink-0">
                    <Bed className="w-4 h-4 text-gray-500" />
                    {bedOptions.map((b) => (
                        <button
                            key={b}
                            onClick={() => handleChange("beds", b)}
                            className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap ${filters.beds === b
                                ? "bg-gray-900 text-white shadow-sm"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {b || "Any"}
                        </button>
                    ))}
                </div>

                {/* Type - Multi-select */}
                <div className="flex items-center gap-1 text-sm font-medium text-gray-700 flex-shrink-0 ">
                    <Home className="w-4 h-4 text-gray-500" />
                    <div className="flex flex-wrap gap-1 p-1 bg-gray-50 border border-gray-200 rounded-lg max-w-full">
                        {typeOptions.map((t) => (
                            <button
                                key={t}
                                onClick={() => toggleType(t)}
                                className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap text-sm ${filters.types.includes(t)
                                        ? "bg-gray-900 text-white shadow-sm"
                                        : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
                                    }`}
                            >
                                {capitalize(t)}
                            </button>
                        ))}
                        {filters.types.length > 0 && (
                            <button
                                onClick={clearAllTypes}
                                className="px-2 py-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-200 ml-1 text-sm"
                                title="Clear all types"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-1 text-sm font-medium text-gray-700 flex-shrink-0">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <div className="flex bg-gray-100 border border-gray-200 rounded-lg p-1.5">
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="Min"
                            className={`w-20 px-2 py-1.5 text-sm border-0 bg-transparent focus:outline-none ${priceError ? "text-red-600" : "text-gray-900"
                                }`}
                            value={minPrice}
                            onChange={handleMinChange}
                        />
                        <span className="px-1.5 text-gray-500 font-medium">–</span>
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="Max"
                            className={`w-20 px-2 py-1.5 text-sm border-0 bg-transparent focus:outline-none ${priceError ? "text-red-600" : "text-gray-900"
                                }`}
                            value={maxPrice}
                            onChange={handleMaxChange}
                        />
                    </div>
                </div>

                {/* Spacer + Search Button */}
                <div className="flex-1 min-w-0"></div>
                <button
                    onClick={handleSearchClick}
                    className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all text-sm flex items-center gap-2 flex-shrink-0"
                >
                    Search
                    <Search className="w-4 h-4" />
                </button>
            </div>

            {/* Second Line: Active Filters ONLY */}
            <div className="flex flex-wrap gap-2">
                {filters.location && (
                    <span
                        className="bg-gray-200 text-gray-800 border border-gray-300 px-3 py-2 rounded-full text-sm flex items-center gap-1 hover:bg-gray-200 transition-colors cursor-pointer"
                        onClick={() => handleRemoveFilter("location")}
                    >
                        <Search className="w-4 h-4" />
                        <span className="max-w-20 truncate">{filters.location.length > 12 ? `${filters.location.slice(0, 12)}...` : filters.location}</span>
                        <X className="w-4 h-4" />
                    </span>
                )}
                {filters.beds && (
                    <span
                        className="bg-gray-100 text-gray-800 border border-gray-300 px-3 py-2 rounded-full text-sm flex items-center gap-1 hover:bg-gray-200 transition-colors cursor-pointer"
                        onClick={() => handleRemoveFilter("beds")}
                    >
                        <Bed className="w-4 h-4" />
                        {filters.beds === "3+" ? "3+ Beds" : `${filters.beds} Bed${filters.beds === "1" ? "" : "s"}`}
                        <X className="w-4 h-4" />
                    </span>
                )}
                {filters.types.length > 0 && (
                    <span
                        className="bg-gray-100 text-gray-800 border border-gray-300 px-3 py-2 rounded-full text-sm flex items-center gap-1 hover:bg-gray-200 transition-colors cursor-pointer max-w-xs"
                        onClick={clearAllTypes}
                    >
                        <Home className="w-4 h-4" />
                        <span className="truncate">
                            {filters.types.map(capitalize).join(", ")}
                            {filters.types.length > 2 && " + more"}
                        </span>
                        <X className="w-4 h-4" />
                    </span>
                )}
                {(minPrice || maxPrice) && (
                    <span
                        className="bg-gray-100 text-gray-800  border border-gray-300 px-3 py-2 rounded-full text-sm flex items-center gap-1 hover:bg-gray-200 transition-colors cursor-pointer"
                        onClick={() => handleRemoveFilter("price")}
                    >
                        <DollarSign className="w-4 h-4" />
                        ${minPrice || "Any"}–${maxPrice || "1M"}
                        <X className="w-4 h-4" />
                    </span>
                )}
            </div>

           
        </div>
    );
}
