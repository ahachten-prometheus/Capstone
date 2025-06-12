export default function ResourceFilters() {
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