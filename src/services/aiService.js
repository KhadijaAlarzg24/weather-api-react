export const getClothingAdvice = async (city, temp, description) => {
  try {
    let advice = "";
    let icon = "👕"; 
    const desc = description.toLowerCase();

    if (temp > 30) {
      icon = "☀️🕶️";
      advice = `It's quite hot in ${city} (${temp}°C). Opt for lightweight, breathable fabrics, sunglasses, and sunscreen.`;
    } else if (temp >= 20 && temp <= 30) {
      icon = "👕✨";
      advice = `The weather in ${city} is pleasant at ${temp}°C. A comfortable t-shirt and light trousers or a casual dress will do great.`;
    } else if (temp >= 10 && temp < 20) {
      icon = "🧥🧣";
      advice = `It's mild to cool in ${city} (${temp}°C). Consider wearing a light jacket, cardigan, or a long-sleeve shirt.`;
    } else {
      icon = "🧥🧤";
      advice = `It's cold in ${city} (${temp}°C). Bundle up with a warm heavy coat, scarf, and layers.`;
    }

    if (desc.includes("rain") || desc.includes("drizzle")) {
      icon += " ☔";
      advice += " Don't forget to carry an umbrella as rain is expected!";
    } else if (desc.includes("wind")) {
      advice += " It might be a bit windy, so a windbreaker is recommended.";
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    
    return { text: advice, icon: icon };
  } catch (error) {
    console.error("Advice Generation Error:", error);
    return { 
      text: "Wear comfortable clothing suitable for today's weather conditions.", 
      icon: "👕" 
    };
  }
};