const URL = '/api/products';

export const fetchProducts = async (productName: string) => {
  try {
    const response = await fetch(productName ? `${URL}?query=${productName}` : URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('error: ', error);
    return undefined;
  }
}