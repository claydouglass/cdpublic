export const RECIPE_PHASES = {
    FLOWER_WEEK_1_3: 'Flower Week 1-3',
    FLOWER_WEEK_4_6_5: 'Flower Week 4-6.5',
    FLOWER_WEEK_6_5_8_5: 'Flower Week 6.5-8.5',
    FLOWER_WEEK_8_5_PLUS: 'Flower Week 8.5+ Harvest'
  };
  
  export const getCurrentPhase = (dayOfFlowering) => {
    if (dayOfFlowering <= 21) {
      return RECIPE_PHASES.FLOWER_WEEK_1_3;
    } else if (dayOfFlowering <= 45) {
      return RECIPE_PHASES.FLOWER_WEEK_4_6_5;
    } else if (dayOfFlowering <= 60) {
      return RECIPE_PHASES.FLOWER_WEEK_6_5_8_5;
    } else {
      return RECIPE_PHASES.FLOWER_WEEK_8_5_PLUS;
    }
  };