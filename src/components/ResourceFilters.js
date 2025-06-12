'use client'
import {useRouter} from 'next/router'
import { useEffect } from 'react'
import React from "react";

export default function ResourceFilters() {
    const router = useRouter()

    const handleUpdate = async () => {
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
        <>
            <div className="filter-form-block">
                <form id="filter-form">
                    <select id="category-filter">
                        Category
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>

                    <select id="type-filter">
                        Resource Type
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>

                    <select id="subject-filter" multiple>
                        Subject

                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>

                </form>
            </div> 
        </>
    )
}

async function fetchFilteredResources({ pageSize = 8, offset, filters}) {

    try {
        const params = new URLSearchParams()
        params.append('pageSize', pageSize.toString())
        if (offset) params.append('offset', offset.toString())
        if (filters.category) params.append('filters', ['Category', filters.category]) // 'field,value'
        if (filters.resource_type) params.append('filters', ['Resource Type', filters.resource_type])

        Array.from(filters.subject).forEach(subj => {
            params.append("filters", ['Subject', subj]);
        })
          
  
        const response = await fetch(`/api/resources?${params.toString()}`);
        const data = await response.json();
  
        if (!response.ok) return data.err
        return [data, null]
  
    } catch (err) {
        console.error("unable to fetch filtered resources", err)
        return [null, err]
    }
  }