export default function ResourceFilters() {
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