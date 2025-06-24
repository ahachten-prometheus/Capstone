"use client";
import React from "react";

export default function ResourceSearch(){

  return(
    <div>
      <form action="/search" method="GET">
  <input
    type="text"
    name="query"
    placeholder="Search..."
  />
  <button type="submit">Search</button>
</form>
    </div>
  )
}