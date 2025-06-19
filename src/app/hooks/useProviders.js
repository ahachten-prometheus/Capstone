'use client';
import { useState, useEffect } from 'react';
import { APIClient } from "@/lib/apiClient";

const ProvidersAPI = new APIClient('providers'); //specific instance to fetch from /api/providers endpoint

export function useProviders(query = {}) {
  const [providers, setProviders] = useState([]);
  const [offset, setOffset] = useState(null); //to track pagination offset
  const [hasMore, setHasMore] = useState(true); //if false, reached end of providers data
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const buildQueryParams = (query, offset) => {
    const params = new URLSearchParams();
    if (query?.state) params.append('state', query.state);
    if (query?.virtualOnly) params.append('virtualOnly', query.virtualOnly);
    if (query?.name) params.append('name', query.name);
    if (offset) params.append('offset', offset);
    params.append('pageSize', 12);
    return params.toString();
  }

  const fetchProviders = async (query, isNewSearch = false) => {
    if (!hasMore && !isNewSearch) return;
    setLoading(true), setError('');

    const queryOffset = isNewSearch ? null : offset;
    const queryParams = `?${buildQueryParams(query, queryOffset)}`;
    console.info('[PROVIDERS/INFO] fetchProviders() called with params:', queryParams); //remove after debugging

    const [providersObj, error] = await ProvidersAPI.get(queryParams);
    if (error) return setError(error), setLoading(false);

    const providerRecords = providersObj.records ?? [];
    const nextToken = providersObj.nextToken ?? null;

    console.info(`[PROVIDERS/INFO] Retrieved ${providerRecords.length} records`, providerRecords); //remove after debugging

    setProviders(prev => isNewSearch ? providerRecords : [...prev, ...providerRecords]); //appends any new fetches to existing providers list state
    setOffset(nextToken); //update offset for next fetch
    setHasMore(!!nextToken); //if null, no more data to fetch
    setLoading(false);
  };

  useEffect(() => { //automatically happens on first mount for the first page load
    setProviders([]);
    setOffset(null);
    setHasMore(true);

    fetchProviders(query, true); // tells fetchProviders to start fresh
  }, [query]); //refetch when query changes, resetting state of providers, offset, and hasMore to ensure records fetched are filtered based on the new query

  return {
    providers,
    error,
    loading,
    hasMore,
    fetchProviders,
  };
};
