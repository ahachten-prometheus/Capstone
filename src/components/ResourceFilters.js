'use client'
import {useRouter} from 'next/compat/router'
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
                    <select id="category-filter" name="Category" >
                        <option value="" selected disabled> Categories</option>
                        <option>Getting the Help You Need</option>
                        <option>Outreach & Advocacy Organizations</option>
                        <option>Professional, Black-Centered Organizations</option>
                        <option>Other Helpful Resources</option>

                    </select>

                    <select id="type-filter" name="Resource Type">
                        <option value="" selected disabled>Types</option>
                        <option>Crisis Call Lines</option>
                        <option>Find A Mental Health Professional</option>
                        <option>Specialized Disorder Support</option>
                        <option>Outreach & Activism Organizations</option>
                        <option>National Government & Advocacy Organizations</option>
                        <option>Black-Focused Mental Health Organizations</option>
                        <option>Professional Associations</option>
                        <option>For Black Girls</option>
                        <option>Staying Informed</option>
                        <option>Other</option>

                    </select>

                    <select id="subject-filter" name="Subject" multiple >
                        <option value="" selected disabled>Subjects</option>
                        <option>ADD & ADHD</option>
                        <option>Anxiety & Depression</option>
                        <option>Bipolar Disorder</option>
                        <option>Drugs & Addiction</option>
                        <option>Eating Disorder</option>
                        <option>OCD</option>
                        <option>Other</option>
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