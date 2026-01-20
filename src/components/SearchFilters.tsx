import { useState } from "react";
import { Search, X, Bed, Home, DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Filters {
    beds: string;
    price: string;
    location: string;
    types: string[];
}

interface Props {
    onSearch: (filters: Filters) => void;
}

const isRentPage = window.location.pathname.startsWith("/rent");

export default function SearchFilters({ onSearch }: Props) {
    const MAX_PRICE = 1_000_000;

    const {t} = useTranslation();

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
        <div className="w-full bg-white overflow-hidden rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-8">
            {/* Desktop: Exact horizontal layout you want */}
            <div className="hidden md:flex flex-wrap items-center gap-4 mb-2">

                {/* Location Search */}
                <div className="flex flex-col gap-1.5 flex-shrink-0 min-w-[240px]">
                    <div className="flex justify-between items-end px-1">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">{t('search_card.location')}</span>
                        <span className="text-[10px] text-gray-400 font-medium italic">{t('search_card.global_search')}</span>
                    </div>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
                            placeholder={t('search_card.search_bar_placeholder')}
                            value={filters.location}
                            onChange={(e) => handleChange("location", e.target.value)}
                        />
                    </div>
                </div>

                {/* Beds */}
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <div className="flex justify-between items-end px-1">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">{t('search_card.bedrooms')}</span>
                        {filters.beds && (
                            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                                {filters.beds === "4+" ? "Large Family" : t('search_card.selected')}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 p-1 border border-gray-200 rounded-xl">
                        <Bed className="w-3.5 h-3.5 text-gray-400 ml-1.5" />
                        {bedOptions.map((b) => (
                            <button
                                key={b}
                                onClick={() => handleChange("beds", b)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${filters.beds === b
                                    ? "bg-gray-900 text-white shadow-sm"
                                    : "text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {b || t('search_card.any')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Property Type */}
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <div className="flex justify-between items-end px-1">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">{t('search_card.property_type')}</span>
                        <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                            {filters.types.length} {t('search_card.selected')}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl p-1">
                        <Home className="w-3.5 h-3.5 text-gray-400 ml-1.5" />
                        <div className="flex gap-1">
                            {typeOptions.slice(0, 3).map((t) => ( // Sliced to keep bar clean
                                <button
                                    key={t}
                                    onClick={() => toggleType(t)}
                                    className={`px-3 py-1.5 rounded-lg transition-all text-xs font-medium ${filters.types.includes(t)
                                        ? "bg-gray-900 text-white shadow-sm"
                                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
                                        }`}
                                >
                                    {capitalize(t)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Price (Your existing logic, slightly tightened) */}
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <div className="flex justify-between items-end px-1">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">{t('search_card.price_range')}</span>
                        {isRentPage && (
                            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">{t('search_card.monthly')}</span>
                        )}
                    </div>
                    <div className={`flex items-center bg-gray-100 border transition-colors rounded-xl p-1 ${priceError ? "border-red-300 ring-1 ring-red-100" : "border-gray-200"}`}>
                        <DollarSign className="w-3.5 h-3.5 text-gray-400 ml-2" />
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="Min"
                            className="w-16 px-2 py-1.5 text-sm bg-transparent focus:outline-none font-medium"
                            value={minPrice}
                            onChange={handleMinChange}
                        />
                        <span className="text-gray-300 font-light">|</span>
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="Max"
                            className="w-16 px-2 py-1.5 text-sm bg-transparent focus:outline-none font-medium"
                            value={maxPrice}
                            onChange={handleMaxChange}
                        />
                    </div>
                </div>

                {/* Search Button (Self-aligning) */}
                <div className="flex-1 flex justify-end items-end h-full self-end pb-0.5">
                    <button
                        onClick={handleSearchClick}
                        className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all text-sm flex items-center gap-2"
                    >
                        {t('search_card.search')}
                        <Search className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Mobile: Stacked layout */}
            <div className="md:hidden space-y-4 mb-4">
                {/* Location Search */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-end px-1">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">{t('search_card.location')}</span>
                        <span className="text-[10px] text-gray-400 font-medium italic">{t('search_card.global_search')}</span>
                    </div>
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder={t('search_card.search_bar_placeholder')}
                            value={filters.location}
                            onChange={(e) => handleChange("location", e.target.value)}
                        />
                    </div>
                </div>

                {/* Beds */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-end px-1">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">{t('search_card.bedrooms')}</span>
                        {filters.beds && (
                            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">{t('search_card.selected')}</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-100 border border-gray-200 rounded-xl">
                        <Bed className="w-4 h-4 text-gray-400 ml-1" />
                        <div className="flex gap-1 overflow-x-auto no-scrollbar py-0.5">
                            {bedOptions.map((b) => (
                                <button
                                    key={b}
                                    onClick={() => handleChange("beds", b)}
                                    className={`px-4 py-2 rounded-lg transition-all text-sm font-medium min-w-[60px] ${filters.beds === b
                                            ? "bg-gray-900 text-white shadow-sm"
                                            : "bg-white text-gray-700 border border-gray-200 shadow-sm"
                                        }`}
                                >
                                    {b || t('search_card.any')}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Type - Multi-select */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-end px-1">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">{t('search_card.property_type')}</span>
                        <div className="flex gap-2">
                            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">{filters.types.length} {t('search_card.selected')}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded-xl">
                        <Home className="w-4 h-4 text-gray-400 ml-1" />
                        <div className="flex gap-1 overflow-x-auto no-scrollbar py-0.5">
                            {typeOptions.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => toggleType(t)}
                                    className={`px-4 py-2 rounded-lg transition-all text-sm font-medium whitespace-nowrap ${filters.types.includes(t)
                                            ? "bg-gray-900 text-white shadow-sm"
                                            : "bg-white text-gray-700 border border-gray-200 shadow-sm"
                                        }`}
                                >
                                    {capitalize(t)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Price Range */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-end px-1">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">{t('search_card.price_range')}</span>
                        {isRentPage && (
                            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">{t('search_card.monthly')}</span>
                        )}
                    </div>
                    <div className={`flex items-center bg-gray-100 border transition-colors rounded-xl p-1.5 ${priceError ? "border-red-300 ring-1 ring-red-100" : "border-gray-200"}`}>
                        <DollarSign className="w-4 h-4 text-gray-400 ml-2" />
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="Min"
                            className="flex-1 px-3 py-2 text-sm bg-transparent focus:outline-none font-medium text-gray-900"
                            value={minPrice}
                            onChange={handleMinChange}
                        />
                        <span className="text-gray-300 font-light mx-1">|</span>
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="Max"
                            className="flex-1 px-3 py-2 text-sm bg-transparent focus:outline-none font-medium text-gray-900"
                            value={maxPrice}
                            onChange={handleMaxChange}
                        />
                    </div>
                </div>

                {/* Mobile Search Button */}
                <button
                    onClick={handleSearchClick}
                    className="w-full bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-3 text-base active:scale-[0.98]"
                >
                    {t('search_card.find_properties')}
                    <Search className="w-5 h-5" />
                </button>
            </div>

            {/* Active Filters - Same for both */}
            <div className="flex flex-wrap gap-2 pt-1">
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
                        className="bg-gray-100 text-gray-800 border border-gray-300 px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1 hover:bg-gray-200 transition-colors cursor-pointer"
                        onClick={() => handleRemoveFilter("price")}
                    >
                        <DollarSign className="w-4 h-4" />
                        ${minPrice || 0}–${maxPrice || 1000000}
                        <X className="w-4 h-4" />
                    </span>
                )}
            </div>
        </div>
    );
}
