export async function loadHeroContent() {
  try {
    const response = await fetch('/content/hero.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading hero content:', error);
    return null;
  }
}

export async function loadProductsContent() {
  try {
    const response = await fetch('/content/products.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading products content:', error);
    return null;
  }
}

export async function loadStoryContent() {
  try {
    const response = await fetch('/content/story.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading story content:', error);
    return null;
  }
}

export async function loadPartnershipContent() {
  try {
    const response = await fetch('/content/partnership.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading partnership content:', error);
    return null;
  }
}

export async function loadWhereToBuyContent() {
  try {
    const response = await fetch('/content/where-to-buy.json');
    return await response.json();
  } catch (error) {
    console.error('Error loading where to buy content:', error);
    return null;
  }
}
