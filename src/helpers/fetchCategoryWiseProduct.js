import summaryApi from "../common";

const fetchCategoryWiseProduct = async(category) => {
    try {
        const response = await fetch(summaryApi.categoryWiseProduct.url,{
            method : summaryApi.categoryWiseProduct.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                category : category
            })
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const dataResponse = await response.json();
        return dataResponse;
    } catch (error) {
        console.error("Error fetching category products:", error);
        return {
            success: false,
            message: error.message || "Failed to fetch products",
            data: [],
            error: true
        };
    }
}

export default fetchCategoryWiseProduct;