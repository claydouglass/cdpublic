export const detectFlowering = (lightHours) => {
    return lightHours <= 13;
  };
  
  export const updateBatchPhase = (batch, currentDate, lightHours) => {
    if (detectFlowering(lightHours) && !batch.flowerStartDate) {
      batch.flowerStartDate = currentDate;
    }
  };