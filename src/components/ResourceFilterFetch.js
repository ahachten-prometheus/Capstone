'use client'
import {useRouter} from 'next/router'

async function fetchFilteredResources({ pageSize = 8, offset,  } = { }) {
  const router = useRouter()

  try {
      const params = new URLSearchParams()
      params.append('pageSize', pageSize.toString())
      if (offset) params.append('offset', offset.toString())

      const response = await fetch(`/api/resources?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) return data.err
      return [data, null]

  } catch (err) {
      console.error("unable to fetch filtered resources", err)
      return [null, err]
  }
}