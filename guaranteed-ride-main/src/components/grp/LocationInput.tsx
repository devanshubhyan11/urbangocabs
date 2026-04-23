import { useState } from 'react';
import { MapPin, Navigation, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Location } from '@/types/grp';

interface LocationInputProps {
  label: string;
  placeholder: string;
  value: Location | null;
  onChange: (location: Location) => void;
  className?: string;
  variant?: 'pickup' | 'destination';
}

// Simulated locations for demo
const DEMO_LOCATIONS: Location[] = [
  { lat: 28.6139, lng: 77.2090, address: 'India Gate, New Delhi' },
  { lat: 28.6129, lng: 77.2295, address: 'Connaught Place, New Delhi' },
  { lat: 28.5562, lng: 77.1000, address: 'Indira Gandhi Airport, Delhi' },
  { lat: 28.6304, lng: 77.2177, address: 'Red Fort, Delhi' },
  { lat: 28.5245, lng: 77.1855, address: 'Qutub Minar, Delhi' },
  { lat: 28.6127, lng: 77.2773, address: 'Akshardham Temple, Delhi' },
  { lat: 28.5535, lng: 77.2588, address: 'Lotus Temple, Delhi' },
  { lat: 28.6562, lng: 77.2410, address: 'ISBT Kashmere Gate, Delhi' },
];

export function LocationInput({ 
  label, 
  placeholder, 
  value, 
  onChange,
  className,
  variant = 'destination'
}: LocationInputProps) {
  const [searchText, setSearchText] = useState(value?.address || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.length > 1) {
      const filtered = DEMO_LOCATIONS.filter(loc => 
        loc.address?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (location: Location) => {
    setSearchText(location.address || '');
    onChange(location);
    setShowSuggestions(false);
  };

  const handleCurrentLocation = () => {
    // Simulate current location
    const currentLoc: Location = {
      lat: 28.6139 + (Math.random() - 0.5) * 0.01,
      lng: 77.2090 + (Math.random() - 0.5) * 0.01,
      address: 'Current Location'
    };
    setSearchText('Current Location');
    onChange(currentLoc);
  };

  return (
    <div className={cn('relative', className)}>
      <label className="block text-sm font-medium text-muted-foreground mb-2">
        {label}
      </label>
      <div className="relative">
        <div className={cn(
          'absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full',
          variant === 'pickup' ? 'bg-success' : 'bg-grp'
        )} />
        <Input
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-12"
          onFocus={() => searchText.length > 1 && setShowSuggestions(true)}
        />
        <button
          onClick={handleCurrentLocation}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-accent transition-colors"
        >
          <Navigation className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && filteredLocations.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-card overflow-hidden animate-slide-up">
          {filteredLocations.map((location, index) => (
            <button
              key={index}
              onClick={() => handleSelect(location)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left"
            >
              <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <span className="text-sm">{location.address}</span>
            </button>
          ))}
        </div>
      )}

      {/* Quick suggestions when empty */}
      {showSuggestions && filteredLocations.length === 0 && searchText.length > 1 && (
        <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-card p-4">
          <p className="text-sm text-muted-foreground text-center">No locations found</p>
        </div>
      )}
    </div>
  );
}
