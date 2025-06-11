import ResourceTileGrid from "@/components/ResourceTileGrid"

export default function resources() {
    return (
        <div>
            <h2> Resources </h2>
            <div className="resource-suggestion-flag">
                {/* resource page recommendation block component */}
            </div>

            <div className="resource-image">
                {/* Picture-slideshow component */}
            </div>

            <h2>All Resources</h2> {/* Changes if there are filters present. Otherwise, shows "all filters" */}
            {/* Search bar component */}
            {/* filter drop downs */}
            <ResourceTileGrid />
            {/* Load more button */}

        </div>
    )
}