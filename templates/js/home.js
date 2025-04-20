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
            const response = await fetch('https://n8n.dunosis.com/webhook-test/02324205-f857-4c82-b3df-66071632016e', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requestType: 'generateRecipes'
                })
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            if (Array.isArray(data) && data.length > 0 && data[0].markdown) {
                results.innerHTML = marked.parse(data[0].markdown);
            } else {
                throw new Error('Invalid response format from server');
            }
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
