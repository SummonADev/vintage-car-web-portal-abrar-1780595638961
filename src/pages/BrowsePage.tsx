import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { MAKES, BODY_STYLES, CONDITIONS, TRANSMISSIONS, DRIVETRAINS, FUEL_TYPES, EXTERIOR_COLORS } from '@/data/constants';
import VCCPLogo from '@/components/VCCPLogo';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function BrowsePage() {
  const { listings } = useData();
  const [search, setSearch] = useState<string>('');
  const [makeFilter, setMakeFilter] = useState<string>('');
  const [bodyFilter, setBodyFilter] = useState<string>('');
  const [conditionFilter, setConditionFilter] = useState<string>('');
  const [transmissionFilter, setTransmissionFilter] = useState<string>('');
  const [drivetrainFilter, setDrivetrainFilter] = useState<string>('');
  const [fuelFilter, setFuelFilter] = useState<string>('');
  const [colorFilter, setColorFilter] = useState<string>('');
  const [yearMin, setYearMin] = useState<string>('');
  const [yearMax, setYearMax] = useState<string>('');
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const filtered = useMemo(() => {
    let results = listings.filter((car) => {
      if (car.status !== 'active') return false;
      if (search) {
        const s = search.toLowerCase();
        if (!car.title.toLowerCase().includes(s) && !car.make.toLowerCase().includes(s) && !car.model.toLowerCase().includes(s) && !car.description.toLowerCase().includes(s)) return false;
      }
      if (makeFilter && car.make !== makeFilter) return false;
      if (bodyFilter && car.body_style !== bodyFilter) return false;
      if (conditionFilter && car.condition !== conditionFilter) return false;
      if (transmissionFilter && car.transmission !== transmissionFilter) return false;
      if (drivetrainFilter && car.drivetrain !== drivetrainFilter) return false;
      if (fuelFilter && car.fuel_type !== fuelFilter) return false;
      if (colorFilter && car.exterior_color !== colorFilter) return false;
      if (yearMin && car.year < parseInt(yearMin)) return false;
      if (yearMax && car.year > parseInt(yearMax)) return false;
      if (priceMin && car.price < parseFloat(priceMin)) return false;
      if (priceMax && car.price > parseFloat(priceMax)) return false;
      return true;
    });

    switch (sortBy) {
      case 'price_low': results.sort((a, b) => a.price - b.price); break;
      case 'price_high': results.sort((a, b) => b.price - a.price); break;
      case 'year_new': results.sort((a, b) => b.year - a.year); break;
      case 'year_old': results.sort((a, b) => a.year - b.year); break;
      case 'newest':
      default: results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return results;
  }, [listings, search, makeFilter, bodyFilter, conditionFilter, transmissionFilter, drivetrainFilter, fuelFilter, colorFilter, yearMin, yearMax, priceMin, priceMax, sortBy]);

  const clearFilters = () => {
    setSearch(''); setMakeFilter(''); setBodyFilter(''); setConditionFilter('');
    setTransmissionFilter(''); setDrivetrainFilter(''); setFuelFilter(''); setColorFilter('');
    setYearMin(''); setYearMax(''); setPriceMin(''); setPriceMax('');
  };

  const selectClass = 'border border-gray-300 rounded px-3 py-2 w-full text-sm bg-white';
  const inputClass = 'border border-gray-300 rounded px-3 py-2 w-full text-sm';

  return (
    <div className="max-w-7xl mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold mb-6">Browse Vintage Cars</h1>

      {/* Search + primary filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex gap-3 items-center mb-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by make, model, keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 pl-9 w-full"
            />
          </div>
          <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
            <SlidersHorizontal size={16} /> {showAdvanced ? 'Less' : 'More'} Filters
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <select value={makeFilter} onChange={(e) => setMakeFilter(e.target.value)} className={selectClass}>
            <option value="">All Makes</option>
            {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={bodyFilter} onChange={(e) => setBodyFilter(e.target.value)} className={selectClass}>
            <option value="">All Body Styles</option>
            {BODY_STYLES.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <select value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)} className={selectClass}>
            <option value="">All Conditions</option>
            {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={selectClass}>
            <option value="newest">Newest First</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="year_new">Year: Newest</option>
            <option value="year_old">Year: Oldest</option>
          </select>
        </div>

        {showAdvanced && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 pt-3 border-t border-gray-200">
            <select value={transmissionFilter} onChange={(e) => setTransmissionFilter(e.target.value)} className={selectClass}>
              <option value="">All Transmissions</option>
              {TRANSMISSIONS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={drivetrainFilter} onChange={(e) => setDrivetrainFilter(e.target.value)} className={selectClass}>
              <option value="">All Drivetrains</option>
              {DRIVETRAINS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={fuelFilter} onChange={(e) => setFuelFilter(e.target.value)} className={selectClass}>
              <option value="">All Fuel Types</option>
              {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
            <select value={colorFilter} onChange={(e) => setColorFilter(e.target.value)} className={selectClass}>
              <option value="">All Colors</option>
              {EXTERIOR_COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="number" placeholder="Year Min" value={yearMin} onChange={(e) => setYearMin(e.target.value)} className={inputClass} />
            <input type="number" placeholder="Year Max" value={yearMax} onChange={(e) => setYearMax(e.target.value)} className={inputClass} />
            <input type="number" placeholder="Price Min" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} className={inputClass} />
            <input type="number" placeholder="Price Max" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className={inputClass} />
            <button onClick={clearFilters} className="col-span-2 md:col-span-4 text-sm text-gold hover:underline">Clear All Filters</button>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-4">{filtered.length} {filtered.length === 1 ? 'result' : 'results'}</p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <VCCPLogo size={64} className="mx-auto mb-4 opacity-30" />
          <p className="text-gray-500 text-lg">No listings found matching your criteria.</p>
          <button onClick={clearFilters} className="mt-4 text-gold font-bold hover:underline">Clear Filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((car) => (
            <Link key={car.id} to={`/car/${car.id}`} className="no-underline text-inherit">
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {car.images?.[0] ? (
                    <img src={car.images[0]} alt={car.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <VCCPLogo size={48} />
                      <span className="text-xs mt-1">No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{car.year} {car.make} {car.model}</h3>
                  <p className="text-gold font-bold text-xl">${car.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{car.condition} · {car.mileage.toLocaleString()} miles</p>
                  <p className="text-sm text-gray-500">{car.location_city}, {car.location_state}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
