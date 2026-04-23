import { useState, useCallback, useRef, useEffect } from 'react';
import { DemoDriver, Ride, Location } from '@/types/grp';
import { supabase } from '@/integrations/supabase/client';
import { useGRP } from '@/contexts/GRPContext';

interface MatchingState {
  isSearching: boolean;
  currentDriver: DemoDriver | null;
  searchRadius: number;
  attemptCount: number;
  failedDrivers: string[];
  matchedDriver: DemoDriver | null;
  error: string | null;
}

// Haversine formula to calculate distance between two points
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function useDriverMatching() {
  const { demoDrivers, demoMode } = useGRP();
  const [state, setState] = useState<MatchingState>({
    isSearching: false,
    currentDriver: null,
    searchRadius: 1.0,
    attemptCount: 0,
    failedDrivers: [],
    matchedDriver: null,
    error: null
  });
  
  const abortRef = useRef(false);

  const sortDriversByDistance = useCallback((pickup: Location, drivers: DemoDriver[], excludeIds: string[] = []) => {
    return drivers
      .filter(d => d.is_available && !excludeIds.includes(d.id))
      .map(driver => ({
        ...driver,
        distance: calculateDistance(pickup.lat, pickup.lng, driver.lat, driver.lng)
      }))
      .sort((a, b) => a.distance - b.distance);
  }, []);

  const applyPenalty = useCallback(async (driverId: string, rideId: string, reason: string) => {
    // Update demo driver's GRP score
    const driver = demoDrivers.find(d => d.id === driverId);
    if (driver) {
      await supabase
        .from('demo_drivers')
        .update({ 
          grp_score: Math.max(0, driver.grp_score - 10),
          is_available: driver.grp_score > 20 // Disable if score too low
        })
        .eq('id', driverId);
    }
  }, [demoDrivers]);

  const findDriver = useCallback(async (
    ride: Ride,
    pickup: Location,
    onDriverFound: (driver: DemoDriver) => void,
    onCountdownStart: () => void,
    onMatchComplete: (driver: DemoDriver) => void,
    onMatchFailed: () => void,
    getCountdownSeconds: () => number
  ) => {
    abortRef.current = false;
    
    setState(prev => ({
      ...prev,
      isSearching: true,
      matchedDriver: null,
      error: null,
      failedDrivers: [],
      attemptCount: 0,
      searchRadius: 1.0
    }));

    let currentRadius = 1.0;
    let failedIds: string[] = [];
    let attempts = 0;
    const maxAttempts = 5;
    const maxRadiusExpansions = 3;
    let radiusExpansions = 0;

    while (attempts < maxAttempts && !abortRef.current) {
      // Get sorted drivers by distance
      const sortedDrivers = sortDriversByDistance(pickup, demoDrivers, failedIds);
      
      // Filter by current search radius
      const driversInRadius = sortedDrivers.filter(d => d.distance <= currentRadius);

      if (driversInRadius.length === 0) {
        // Expand radius
        if (radiusExpansions < maxRadiusExpansions) {
          currentRadius += 1.0;
          radiusExpansions++;
          setState(prev => ({ ...prev, searchRadius: currentRadius }));
          continue;
        } else {
          // No more drivers available
          setState(prev => ({
            ...prev,
            isSearching: false,
            error: 'No drivers available in your area'
          }));
          onMatchFailed();
          return;
        }
      }

      // Try the nearest driver
      const candidateDriver = driversInRadius[0];
      attempts++;
      
      setState(prev => ({
        ...prev,
        currentDriver: candidateDriver,
        attemptCount: attempts,
        searchRadius: currentRadius
      }));

      onDriverFound(candidateDriver);
      onCountdownStart();

      // Wait for driver response (simulated)
      await new Promise<void>((resolve) => {
        const delay = candidateDriver.response_delay_ms || 3000;
        
        setTimeout(() => {
          if (abortRef.current) {
            resolve();
            return;
          }

          if (candidateDriver.will_accept) {
            // Driver accepts
            setState(prev => ({
              ...prev,
              isSearching: false,
              matchedDriver: candidateDriver,
              currentDriver: null
            }));
            onMatchComplete(candidateDriver);
          } else {
            // Driver rejects or times out
            failedIds.push(candidateDriver.id);
            setState(prev => ({
              ...prev,
              failedDrivers: [...prev.failedDrivers, candidateDriver.id],
              currentDriver: null
            }));
            
            // Apply penalty
            applyPenalty(candidateDriver.id, ride.id, 'rejected_grp_request');
          }
          resolve();
        }, Math.min(delay, getCountdownSeconds() * 1000));
      });

      // If matched, exit loop
      if (state.matchedDriver || abortRef.current) {
        break;
      }

      // After 3 failed attempts, expand radius
      if (attempts % 3 === 0 && radiusExpansions < maxRadiusExpansions) {
        currentRadius += 1.0;
        radiusExpansions++;
        setState(prev => ({ ...prev, searchRadius: currentRadius }));
      }
    }

    if (!state.matchedDriver && !abortRef.current) {
      setState(prev => ({
        ...prev,
        isSearching: false,
        error: 'Unable to find a driver. Please try again.'
      }));
      onMatchFailed();
    }
  }, [demoDrivers, sortDriversByDistance, applyPenalty, state.matchedDriver]);

  const cancelSearch = useCallback(() => {
    abortRef.current = true;
    setState(prev => ({
      ...prev,
      isSearching: false,
      currentDriver: null,
      error: null
    }));
  }, []);

  const reset = useCallback(() => {
    abortRef.current = true;
    setState({
      isSearching: false,
      currentDriver: null,
      searchRadius: 1.0,
      attemptCount: 0,
      failedDrivers: [],
      matchedDriver: null,
      error: null
    });
  }, []);

  return {
    ...state,
    findDriver,
    cancelSearch,
    reset
  };
}
