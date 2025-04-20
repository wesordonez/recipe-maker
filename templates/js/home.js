/**
 * Contains code for home page
 */

// Recipe Generator functionality
const generateButton = document.getElementById('generateRecipes');
if (generateButton) {
    const loading = document.getElementById('loading');
    const results = document.getElementById('recipeResults');
    
    generateButton.addEventListener('click', async () => {
        loading.classList.remove('hidden');
        results.innerHTML = '';
        
        try {
            const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            // Assuming the response contains markdown text
            results.innerHTML = marked.parse(data.markdown);
        } catch (error) {
            results.innerHTML = `<div class="text-red-600">Error: ${error.message}</div>`;
        } finally {
            loading.classList.add('hidden');
        }
    });
}

const reviewContainer = document.querySelector(".review-container")
const reviewSlideShow = new SlideShow(reviewContainer, true, 10000)

const reviewModal = new Modal(document.querySelector("#modal"))
