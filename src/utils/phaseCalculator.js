export function calculateCurrentPhase(batch, currentDate = new Date()) {
    if (!batch || !batch.vegStartDate) {
      return 'Not Started';
    }
    
    const daysSinceVegStart = Math.floor((currentDate - new Date(batch.vegStartDate)) / (1000 * 60 * 60 * 24));
    
    if (!batch.flowerStartDate) {
      if (daysSinceVegStart < 14) return 'Veg Week 1-2';
      return 'Veg Week 3+';
    }
    
    const daysSinceFlowerStart = Math.floor((currentDate - new Date(batch.flowerStartDate)) / (1000 * 60 * 60 * 24));
    
    if (daysSinceFlowerStart < 21) return 'Flower Week 1-3';
    if (daysSinceFlowerStart < 45) return 'Flower Week 4-6.5';
    if (daysSinceFlowerStart < 59) return 'Flower Week 6.5-8.5';
    return 'Flower Week 8.5+ Harvest';
  }