'use client';
import { useState, useEffect, useCallback } from 'react';
import { APIClient } from "@/lib/apiClient";

const ProvidersAPI = new APIClient('providers');

export function useProviders(query = {}) {
  const [providers, setProviders] = useState([]);
  const [offset, setOffset] = useState(null); //to track pagination offset
  const [hasMore, setHasMore] = useState(true); //if false, reached end of providers data
  const [firstLoad, setFirstLoad] = useState(true); //to avoid automatic refreshes useEffect unless first page load
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProviders = useCallback(async () => {
    console.log('fetchProviders() INVOKED @useProviders.js'); //remove after debugging
    if (!hasMore) return;

    setLoading(true), setError('');

    const params = new URLSearchParams();
    if (query) params.append('query', encodeURIComponent(query));
    if (offset) params.append('offset', offset);
    params.append('pageSize', 12);
    if (query.state) params.append('state', `${query.state}`)
    if (query.virtualOnly) params.append('virtualOnly', `${query.virtualOnly}`)
    if (query.name) params.append('name', `${query.name}`)

    const [providersObj, error] = await ProvidersAPI.get(`?${params.toString()}`);
    if (error) return setError(error.msg), setLoading(false);

    console.log('AFTER @fetchProviders():', providersObj); //remove after debugging
    const providerRecords = providersObj.records ?? [];
    const nextToken = providersObj.nextToken ?? null;

    setProviders(prev => [...prev, ...providerRecords]); //appends any new fetches to existing providers list state
    setOffset(nextToken); //update offset for next fetch
    setHasMore(!!nextToken); //if null, no more data to fetch
    setLoading(false);
  }, [query, offset, hasMore]); //dependency arr to keep track of state changes

  useEffect(() => { //happens automatically on first render
    if (firstLoad) {
      fetchProviders();
      setFirstLoad(false); //set to false after the first fetch
    }
  }, [firstLoad, fetchProviders]);

  return {
    providers,
    error,
    loading,
    hasMore,
    fetchProviders,
  };
};
