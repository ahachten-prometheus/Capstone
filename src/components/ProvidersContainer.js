import ProvidersDisplayCard from '@/components/ProvidersDisplayCard';
import { useProviders } from '@/app/hooks/useProviders';

export default function ProvidersContainer() {
  const { providers, error, loading, fetchProviders, hasMore } = useProviders();

  return (
    <div className="w-full">
      <div className="providers-container">
        {error && <p className="error-text">{error}</p>}
        {loading && <p>Loading providers...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
          {providers.length > 0 ? (
            providers.map((provider, idx) => (
              <div key={provider.id ?? idx}>
                <ProvidersDisplayCard provider={provider} />
              </div>
            ))
          ) : (
            !loading && <p>No providers found.</p>
          )}

          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                id="more-providers"
                className="bg-[#B36078] hover:bg-[#C96C86B0] text-white font-bold py-2 px-4 rounded-full m-6"
                onClick={fetchProviders}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
