"use client";
import ResourceTileGrid from "@/components/ResourceTileGrid"
import ResourceFilters from "@/components/ResourceFilters";
import { useState, useEffect } from "react"
import React from "react";

export default function Resources() {
    const [resources, setResources] = useState([])
    const [offset, setOffset] = useState(null)
    const [highlightedResources, setHighlighted] = useState([])
    const [highlightedOffset, setHighOffset] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const [data, error] = await fetchResources()

                if (data) {
                    setResources(data.records);
                    setOffset(data.offset)
                    console.log(offset)
                }

            } catch (err) {
                setError(err.message)
            }
        }

        fetchData()
    }, [])

    //button function to render more resourceess
    const handleLoadMoreClick = async (event) => {
        // event.preventDefault() //don't refresh the page pls 
        try {
            const [data, error] = await fetchResources({ offset })
            if (data) {
                setResources([...resources, ...data.records]);
                setOffset(data.offset)
                console.log(offset)
            }
        } catch (err) {
            setError(err.message)
        } 

    }

    return (
        <div>

            <h2> Resources </h2>
            <div className="highlighted-resource-block">
                {/* resource page recommendation block component */}
            </div>

            <div className="resource-image">
                {/* Picture-slideshow component */}
            </div>

            <div className="all-resources">
                <h2>All Resources</h2> {/* Changes if there are filters present. Otherwise, shows "all filters" */}
                {/* Search bar component */}
                {/* filter drop downs */}
                <ResourceFilters />
                <ResourceTileGrid resources={resources} />
                {/* Load more button */}
                <button onClick={() => handleLoadMoreClick(offset)} className="bg-[#C96C86] hover:bg-[#8F5E72] cursor-pointer px-4 py-2 ">load more</button>

            </div>

        </div>
    )
}

async function fetchResources({ pageSize = 8, offset } = { pageSize: 8 }) {

    console.log("fetching resources...")

    try {
        const params = new URLSearchParams()
        params.append('pageSize', pageSize.toString())
        if (offset) params.append('offset', offset.toString())

        const response = await fetch(`/api/resources?${params.toString()}`);
        const data = await response.json();

        if (!response.ok) return data.err
        return [data, null]

    } catch (err) {
        console.error("unable to fetch resources", err)
        return [null, err]
    }
}

async function fetchHighlightedResources({ pageSize = 1, offset } = { pageSize: 1 }) {

    try {
        const params = new URLSearchParams()
        params.append('pageSize', pageSize.toString())
        if (offset) params.append('offset', offset.toString())

        const response = await fetch(`/api/resources/highlighted?${params.toString()}`);
        const data = await response.json();

        if (!response.ok) return data.err
        return [data, null]

    } catch (err) {
        console.error("unable to fetch highlighted resources", err)
        return [null, err]
    }
}

