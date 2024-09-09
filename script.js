document.addEventListener("DOMContentLoaded", () => {
    const totalPages = 500; // Total number of pages (example)
    const maxVisibleButtons = 5; // Maximum number of visible page buttons
    let currentPage = 1; // Initialize current page

    // Select elements using querySelector
    const firstPageButton = document.querySelector("#startBtn");
    const prevPageButton = document.querySelector("#prev");
    const nextPageButton = document.querySelector("#next");
    const lastPageButton = document.querySelector("#endBtn");
    const pageButtonsContainer = document.querySelector("#links");

    // Function to clamp a value between a minimum and maximum
    const clamp = (value, min, max) => {
        if (value < min) return min; // Return min if value is less than min
        if (value > max) return max; // Return max if value is more than max
        return value; // Return the value if it's within the range
    };

    // Create a page button
    const createButton = (pageNumber) => {
        const button = document.createElement("div");
        button.classList.add("link");
        button.textContent = pageNumber;
        button.addEventListener("click", () => goToPage(pageNumber)); // Add click event to navigate to the page
        if (pageNumber === currentPage) {
            button.classList.add("active"); // Highlight the current page button
        }
        return button;
    };

    // Update the state of navigation buttons (first, previous, next, last)
    const updateNavigationButtons = () => {
        firstPageButton.disabled = currentPage === 1; // Disable the first page button if on the first page
        prevPageButton.disabled = currentPage === 1; // Disable the previous page button if on the first page
        nextPageButton.disabled = currentPage === totalPages; // Disable the next page button if on the last page
        lastPageButton.disabled = currentPage === totalPages; // Disable the last page button if on the last page
    };

    // Calculate the visible page buttons range
    const calculateVisibleButtons = () => {
        const halfVisibleButtons = Math.floor(maxVisibleButtons / 2); // Calculate half of the visible buttons
        let firstVisiblePage = currentPage - halfVisibleButtons; // Calculate the first visible page
        let lastVisiblePage = firstVisiblePage + maxVisibleButtons - 1; // Calculate the last visible page

        // Ensure the visible buttons are within the valid range
        if (firstVisiblePage < 1) {
            firstVisiblePage = 1; // Set the first page to 1 if it's less than 1
            lastVisiblePage = maxVisibleButtons; // Adjust the last visible page accordingly
        }

        if (lastVisiblePage > totalPages) {
            lastVisiblePage = totalPages; // Set the last page to totalPages if it's more than totalPages
            firstVisiblePage = totalPages - maxVisibleButtons + 1; // Adjust the first visible page accordingly
        }

        return { firstVisiblePage, lastVisiblePage };
    };

    // Create page buttons based on the calculated range
    const createPageButtons = () => {
        pageButtonsContainer.innerHTML = ""; // Clear previous page buttons
        const { firstVisiblePage, lastVisiblePage } = calculateVisibleButtons(); // Get the visible buttons range

        // Create and append buttons for the visible pages
        for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
            const button = createButton(i);
            pageButtonsContainer.appendChild(button);
        }

        updateNavigationButtons(); // Update the navigation buttons state
    };

    // Navigate to a specific page
    const goToPage = (page) => {
        currentPage = clamp(page, 1, totalPages); // Clamp the page number to be within the range
        createPageButtons(); // Update the page buttons
    };

    // Add event listeners for the navigation buttons
    firstPageButton.addEventListener("click", () => goToPage(1)); // Go to the first page
    prevPageButton.addEventListener("click", () => goToPage(currentPage - 1)); // Go to the previous page
    nextPageButton.addEventListener("click", () => goToPage(currentPage + 1)); // Go to the next page
    lastPageButton.addEventListener("click", () => goToPage(totalPages)); // Go to the last page

    // Initialize the page buttons on page load
    createPageButtons();
});
